<template>
  <!-- 分群 与 用户定向 -->
  <div>

    <div>
      <el-radio-group v-model="form.directType">
        <el-radio :disabled="form.businessType === 'ONETOONE'" label="0">标签规则</el-radio>
        <el-radio label="1">分群规则</el-radio>
      </el-radio-group>
    </div>

    <div class="put-item">
      <div v-show="form.directType === '0'">
        <!-- <el-radio-group v-if="form.businessType === 'ONETOONE'" v-model="form.showUserType">
          <el-radio-button label="DEFAULT">不限</el-radio-button>
          <el-radio-button label="ONE_CLASS">1对1</el-radio-button>
          <el-radio-button label="SMALL_CLASS">小班课</el-radio-button>
        </el-radio-group> -->

        <el-checkbox-group v-if="form.businessType === 'BEAR'" v-model="form.targetUser" @change="changeTargetUser">
          <el-checkbox v-for="item in bearorienteering" :key="item.value" :label="item.value" :disabled="form.targetUser && form.targetUser.includes('default') && item.value !== 'default'">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div v-show="form.directType === '1'" v-loading="loadings._ums_meixiu_api_im_g_v2_h5_usergroup_getAllGroups">
        <div v-if="userGroupSelected.length" class="group-bar">
          <!-- <span class="user-label">用户群分类</span>
          <el-cascader v-model="userGroupTreeId" clearable :options="userGroupTreeData" :props="{emitPath: false}" @change="userGroupGetList" /> -->
          <span class="user-label" style="width: 130px">已选中的分群：</span>
          <div>
            <el-tag v-for="v in userGroupSelected" :key="v" closable type="info" style="margin-right: 5px" @close="handleUserGroupAction('uncheck', v)">{{ v }}</el-tag>
          </div>
        </div>

        <basics-table
          :key="tableKey"
          class="userGroupClass"
          :list="userGroupList"
          :get-list="userGroupGetList"
          :columns="userGroupColumns"
          :total="userGroupTotal"
          :list-query="userGroupListQuery"
          :action-function="userGroupAction"
          :attr="{'max-height': 400}"
        />

      </div>
    </div>
  </div>
</template>
<script>
import { getGroupTreeByRootId, getAllGroups } from '@/api/intelligentMarketing'
import { mapGetters } from 'vuex'
import forms, { actions as formAct } from '../../forms/setRate'
import { transferData } from '@/views/intelligent-marketing/user-group/utils'
import { userGroupColumns, userGroupAction } from './columns'

const init_pagination = { page: 1, limit: 20 }
const userGroupLineMap = {
  'ONETOONE': '1',
  'BEAR': '2'
}

export default {
  components: { },
  props: {
    row: {
      default: () => {
        return {}
      },
      type: Object
    },
    businessType: {
      default: () => {
        return ''
      },
      type: String
    }
  },
  data() {
    return {
      tableKey: 1,
      showSelect: true,
      forms: forms,
      userGroupTreeData: [], // 分群分类 用作筛选
      userGroupTreeId: '', // 选中的分群分类id
      formActions: formAct({ quit: this.quit }),
      userGroupListQuery: { ...init_pagination },
      userGroupSelected: [], // 选择的分群
      userGroupTotal: 0,
      userGroupList: [],
      userGroupColumns,
      userGroupAction: userGroupAction({ handleUserGroupAction: this.handleUserGroupAction }),
      form: {
        showUserType: 'DEFAULT',
        directType: '1', // 用户定向规则
        targetUser: [] // 小熊美术用户定向
      },
      bearorienteering: [
        {
          label: '不限',
          value: 'default'
        },
        {
          label: 'S1基础系统课用户',
          value: 'artSystem_S4'
        },
        {
          label: 'S1进阶系统课用户',
          value: 'artSystem_S1'
        },
        {
          label: 'S2基础系统课用户',
          value: 'artSystem_S2'
        },
        {
          label: 'S2进阶系统课用户',
          value: 'artSystem_S5'
        },
        {
          label: 'S3系统课用户',
          value: 'artSystem_S3'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    form: {
      handler: function(form) {
        // 当表单发生变化调用
        // if (form.showUserType) {
        //   this.$emit('groupChange', { showUserType: form.showUserType })
        // }
        if (Array.isArray(form.targetUser)) {
          this.$emit('groupChange', { targetUser: form.targetUser })
        }
      },
      deep: true
    }
  },
  created() {
    this.userGroupGetList()
    this.echo()
    this.handleUserGroupTree()
  },
  methods: {
    // 回显函数
    echo() {
      const { row: { groupIds, targetUser }, businessType } = this
      this.form = {
        // showUserType: showUserType || 'DEFAULT',
        directType: businessType === 'ONETOONE' || groupIds ? '1' : '0',
        businessType,
        targetUser: targetUser && targetUser.split(',') || []
      }
      if (groupIds) { this.userGroupSelected = groupIds.split(',') }
    },

    // 选择用户分群
    handleUserGroupAction(type, id) {
      // 统一id为字符串，数字也行。但是必须统一格式，下文中有includes判断
      const sId = id + ''
      if (type === 'check') {
        this.userGroupSelected.push(sId)
      } else {
        this.userGroupSelected = this.userGroupSelected.filter(v => v !== sId)
      }
      const groupIds = this.userGroupSelected.join()
      this.$emit('groupChange', { groupIds })
      this.handleTransferUserGroup()
    },

    // 根据不同业务线 处理对应的人群分类筛选
    handleUserGroupTree() {
      const rootId = userGroupLineMap[this.businessType]
      getGroupTreeByRootId({ rootId })
        .then(({ result }) => {
          this.userGroupTreeData = transferData(result)
        })
    },

    // 获取分群列表
    userGroupGetList() {
      const line = {
        ONETOONE: 'ZB',
        BEAR: 'XXYS'
        // 3: 'ART'
      }
      getAllGroups({ bizSimpleEname: line[this.businessType] || 'ZB' })
        .then(res => {
          const { payload } = res
          this.userGroupList = payload
          this.userGroupTotal = payload.length
          this.handleTransferUserGroup()
        }).catch(() => {
          this.userGroupList = []
          this.userGroupTotal = 0
        })
    },

    handleTransferUserGroup() {
      this.userGroupList.forEach(v => {
        v.checked = !!this.userGroupSelected.includes(v.id + '')
      })
      this.tableKey += 1
    },

    changeTargetUser(val) {
      if (Array.isArray(val) && val.includes('default')) {
        this.form.targetUser = ['default']
      } else {
        this.form.targetUser = val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.userGroupClass {
    margin-top: 16px;
    ::v-deep .el-select {
      width: 100px;
    }
  }

  .put-item {
    padding: 20px 0;
  }

  .group-bar {
    display: flex;
    align-items: center;
  }

  .user-label {
    display: inline-block;
    width: 100px;
    padding: 0 12px 0 0;
    color: #606266;
    text-align: right;
    font-size: 14px;
    font-weight: 700;
  }
</style>
