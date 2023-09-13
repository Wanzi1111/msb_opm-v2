<!--
 * @Author: ZhangYeLei
 * @Date: 2022-05-05 17:27:23
 * @LastEditTime: 2022-05-27 17:50:50
 * @LastEditors: ZhangYeLei
-->
<template>
  <div v-loading="appLoading">
    <el-dialog
      title="分类管理"
      :visible="true"
      :close-on-click-modal="false"
      @close="onDialogClose"
    >
      <div class="item-bar">
        <div class="title">产品线：</div>
        <el-select v-model="rootId" @change="getGroupTreeByRootId">
          <el-option v-for="v in intelligentMarketing.rootList" :key="v.value" :label="v.label" :value="v.value" />
        </el-select>
        <el-button
          class="add-btn"
          type="text"
          size="mini"
          @click="() => append({id: rootId, rootId})"
        >
          新增一级分类
        </el-button>
      </div>
      <div class="item-bar">
        <div class="title">分&nbsp;&nbsp;&nbsp;类：</div>
        <el-tree
          node-key="id"
          :expand-on-click-node="false"
          :data="treeData"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => rename(data)"
              >
                重新命名
              </el-button>
              <el-button
                v-if="node.level < 3"
                type="text"
                size="mini"
                @click="() => append(data)"
              >
                新增
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import {
  getGroupTreeByRootId,
  editClassifyDir,
  delClassifyDir,
  addClassifyDir
  // dragClassifyDir
} from '@/api/intelligentMarketing'
import { getToken } from '@/utils/auth'
import { transferData } from '../../utils'

const userId = getToken('userId')

export default {
  name: 'DialogUserGroupClassify',
  components: {},
  data() {
    return {
      rootId: '1',
      treeData: []
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    ...mapState(['intelligentMarketing']),
    appLoading() {
      const { loadings } = this
      return loadings._big_data_client_profile_group_getGroupTreeByRootId_1 ||
        loadings._big_data_client_profile_group_getGroupTreeByRootId_2
    }
  },
  watch: {},
  mounted() {
    this.getGroupTreeByRootId()
  },
  methods: {
    getGroupTreeByRootId() {
      getGroupTreeByRootId({ rootId: this.rootId })
        .then(res => {
          this.treeData = transferData(res.result)
        })
    },
    rename(data) {
      this.$prompt('请输入新名称')
        .then(({ value }) => {
          const { id } = data
          editClassifyDir({ id, userId, name: value })
            .then(() => {
              this.$message.success('重新命名成功～')
              this.getGroupTreeByRootId()
            })
        })
    },
    remove(data) {
      this.$confirm('确认删除么？', '', { type: 'warning' })
        .then(() => {
          const { id } = data
          delClassifyDir({ id, userId })
            .then(() => {
              this.$message.success('删除成功～')
              this.getGroupTreeByRootId()
            })
        })
    },
    append(data) {
      this.$prompt('请输入名称')
        .then(({ value }) => {
          const { id, rootId } = data
          addClassifyDir({ pid: id, rootId, userId, name: value })
            .then(() => {
              this.$message.success('新增成功～')
              this.getGroupTreeByRootId()
            })
        })
    },
    onDialogClose() {
      this.$emit('handleDialogVis', '')
    }
    // handleDrop(before, after, inner, enent) {
    //   console.table({ before, after, inner, enent })
    //   const { data: { id, pid }} = before
    //   const { data: { pid: afterPid }} = after
    //   const targetNodeIds = []
    //   const targerNode = this.treeData
    //   console.log('', );
    //   children.forEach(val => {
    //     targetNodeIds.push(val.id)
    //     if (val.children?.length) {
    //       val.children.forEach(v => {
    //         targetNodeIds.push(v.id)
    //       })
    //     }
    //   })
    //   dragClassifyDir({ id, pid, targetNodeIds })
    //     .then(() => {
    //       this.$message.success('排序成功～')
    //       this.getGroupTreeByRootId()
    //     })
    // }
  }
}
</script>

<style lang='scss' scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  ::v-deep button {
    margin: 0;
  }
}
.item-bar {
  display: flex;
  align-items: baseline;
  position: relative;
  margin-bottom: 10px;
  max-height: 500px;
  overflow: scroll;
  .title {
    width: 70px
  }
  .add-btn {
    position: absolute;
    right: 8px;
    top: 4px
  }
  ::v-deep .el-tree {
    flex: 1;
  }
}
</style>
