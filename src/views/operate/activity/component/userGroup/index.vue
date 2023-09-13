<template>
  <div>
    <div v-loading="userGroupLoading">
      <div class="user-search">
        <basics-search
          ref="searchs"
          :searchs="searchs"
          @submitSearch="submitSearch"
        />
      </div>

      <div class="group-bar">
        <span class="user-label" style="width: 130px">已选中的分群：</span>
        <el-tag v-for="v in userSelected" :key="v" closable type="info" style="margin-right: 5px" @close="handleUserGroupAction('uncheck', v)">{{ v }}</el-tag>
      </div>

      <basics-table
        class="userGroupClass"
        :list="userGroupList"
        :columns="userGroupColumns"
        :action-function="userGroupAction"
        :attr="{'max-height': 400}"
      >
        <template slot="groupCode" slot-scope="scope">
          <el-link :href="`/intelligent-marketing/user-group?bizId=${scope.row.bizId}&groupCode=${scope.row.groupCode}&type=linkSearch`" target="_blank">{{ scope.row.groupCode }}</el-link>
        </template>
      </basics-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getGroupTreeByRootId, getGroupList } from '@/api/intelligentMarketing'
import { transferData } from '@/views/intelligent-marketing/user-group/utils'
import BasicsTable from '@/components/BasicsTable'
import BasicsSearch from '@/components/BasicsSearch'
import { userGroupColumns, userGroupAction } from './columns'
import searchs from './search'

// 选择用户分群的组件
export default {
  name: 'UserGroupCom',
  components: { BasicsTable, BasicsSearch },
  props: {
    rootId: {
      type: String,
      default: ''
    },
    userGroupSelected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      userGroupList: [],
      userGroupColumns,
      searchs,
      userGroupTreeData: [], // 分群分类 用作筛选
      searchQuery: {},
      userSelected: [], // 选择的分群
      userGroupAction: userGroupAction({ handleUserGroupAction: this.handleUserGroupAction }),
      searchLoading: false
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    userGroupLoading() {
      const { loadings } = this
      return loadings._big_data_client_profile_group_getGroupTreeByRootId_1 ||
        loadings._big_data_client_profile_group_getGroupTreeByRootId_2 ||
        loadings._big_data_client_profile_group_getGroupTreeByRootId_3 ||
        loadings._big_data_client_profile_group_page
    }
  },
  watch: {
    userGroupSelected: {
      handler(vals) {
        this.userSelected = [...vals]
        this.handleTransferUserGroup(true)
      },
      immediate: true
    }
  },
  mounted() {
    this.handleUserGroupTree()
    this.getList(true)
  },
  methods: {
    handleUserGroupAction(type, id) {
      if (type === 'check') {
        this.userSelected.push(id)
      } else {
        this.userSelected = this.userSelected.filter(v => v !== id)
      }
      this.handleTransferUserGroup()
    },
    // 根据不同业务线 处理对应的人群分类筛选
    handleUserGroupTree() {
      const { rootId } = this
      getGroupTreeByRootId({ rootId })
        .then(({ result }) => {
          this.$refs.searchs.set({
            type: 'options',
            data: {
              groupTreeId: transferData(result)
            }
          })
          this.userGroupTreeData = transferData(result)
        })
    },
    submitSearch(value) {
      if (!value.groupTreeId?.length) delete value.groupTreeId
      this.searchQuery = { ...value }
      this.getList()
    },
    getList(sortFlag) {
      const { searchQuery, rootId } = this
      const payload = { bizId: +rootId, pageNo: 1, pageSize: 9999, hasStop: 0, ...searchQuery }

      getGroupList(payload)
        .then(res => {
          const { result: { list, total }} = res
          this.userGroupList = list
          this.userGroupTotal = total
          this.handleTransferUserGroup(sortFlag)
        }).catch(() => {
          this.userGroupList = []
          this.userGroupTotal = 0
        })
    },
    handleTransferUserGroup(sortFlag) {
      if (this.userGroupList.length) {
        this.userGroupList = this.userGroupList.map(v => {
          v.checked = !!this.userSelected.includes(v.id)
          return v
        })
        // 编辑时选中的在前展示
        if (sortFlag && this.userSelected.length) {
          const checked = []
          const unchecked = []
          this.userGroupList.forEach(v => {
            if (v.checked) {
              checked.push(v)
            } else {
              unchecked.push(v)
            }
          })
          this.userGroupList = [...checked, ...unchecked]
        }
        // this.tableKey += 1
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.user-search {
  ::v-deep .el-select, ::v-deep .el-input {
      width: 120px !important;
    }
}
  .group-bar {
    display: flex;
    // justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    .user-label {
      display: inline-block;
      width: 100px;
      padding: 0 12px 0 0;
      color: #606266;
      text-align: right;
      font-size: 14px;
      font-weight: 700;
    }
    .userGroupClass {
      margin-top: 16px;
      ::v-deep .el-select {
        width: 100px;
      }
    }
  }
</style>
