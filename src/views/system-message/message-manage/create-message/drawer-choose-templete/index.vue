<template>
  <div>
    <el-drawer
      title="选择场景/模板ID"
      :visible.sync="visiable"
      :before-close="onDrawerClose"
      :size="700"
    >
      <div
        v-loading="loadings._ums_meixiu_api_sms_api_v2_push_selectScenarioConfigurationList
          || loadings._ums_meixiu_api_sms_api_v2_push_selectMessageTemplateList"
        style="padding: 20px"
      >
        <basics-search
          ref="searchs"
          :loading="loadings._ums_api_uc_api_platform_user_list"
          :searchs="searchs"
          @submitSearch="submitSearch"
        />

        <div class="tag-bar">
          <span class="tag-label">已选中的场景/模板：</span>
          <div>
            <el-tag v-for="v in selected" :key="v.id" closable type="info" style="margin-right: 5px" @close="handleCheck('uncheck', v)">{{ v.id }}-{{ v.scenarioName || v.templateName }}</el-tag>
          </div>
        </div>

        <basics-table
          :key="tableKey"
          ref="multipleTable"
          :list="list"
          :columns="tempColumns"
          :attr="{'max-height': 680}"
          :action-function="tableAction"
        />

        <div style="margin-top: 15px">
          <el-button type="primary" style="float: right" @click="save">保存</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectMessageTemplateList, selectScenarioConfigurationList } from '@/api/system-message'
import searchs from './searchs'
import { tempColumns, tableAction } from './columns'

// const messageTypeMap = {
//   '1': 'TONGZHI',
//   '2': 'YINGXIAO'
// }

const applyEnumsMap = {
  '0': 'ONE_TO_ONE',
  '1': 'BEAR_ART',
  '3': 'BEAR_MUSIC'
}

const businessTypeMap = {
  '0': 'ONE_TO_ONE',
  '1': 'XX_ART',
  '3': 'ART_EXAMINATION'
}

export default {
  name: 'DrawerChooseTemp',
  props: {
    handleDrawerVis: {
      type: Function,
      default: () => {}
    },
    drawerData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tableKey: 1,
      visiable: true,
      tempColumns,
      searchs,
      total: 0,
      searchQuery: {},
      list: [],
      selected: [],
      tableAction: tableAction({ handleCheck: this.handleCheck })
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.searchs?.search()
      // this.getList()
    })
  },
  methods: {
    save() {
      this.$emit('handleDrawerVis', '', { ...this.drawerData, selected: this.selected.map(v => ({ sceneId: v.id, sceneName: v.scenarioName || v.templateTitle, sceneType: v.messageType === 2 ? 0 : 1 })) })
    },
    onDrawerClose() {
      this.$emit('handleDrawerVis', '', { ...this.drawerData })
    },
    getList() {
      const { searchQuery: { messageType, messageId, messageTitle }, $route: { query: { data }}} = this
      const app = JSON.parse(data).app
      const reqList = [selectScenarioConfigurationList({ messageType: 'TONGZHI', businessType: businessTypeMap[app] }), selectMessageTemplateList({ messageType: 'YINGXIAO', applyEnums: applyEnumsMap[app] })]
      if (messageType === 'TONGZHI') {
        reqList.splice(1)
      } else if (messageType === 'YINNGXIAO') {
        reqList.splice(0, 1)
      }
      Promise.all(reqList)
        .then(res => {
          const { drawerData: { selected: selectedProp }} = this
          this.list = [...res[0].payload, ...(res[1]?.payload || [])]
            .map(v => {
              // 合并id为唯一标识
              v.id = v.scenarioId || v.templateId
              return v
            })
            // 前端过滤数据
            .filter(v => {
              if (messageId && messageTitle) {
                return v.id.includes(messageId || '') || v.scenarioName?.includes(messageTitle || '') || v.templateTitle?.includes(messageTitle || '')
              } else if (messageId) {
                return v.id.includes(messageId || '')
              } else if (messageTitle) {
                return v.scenarioName?.includes(messageTitle || '') || v.templateTitle?.includes(messageTitle || '')
              }
              return v
            })

          this.$nextTick(() => {
            // 仅在第一次获取列表的时候处理selectedProp
            if (selectedProp?.length && !this.selected.length) {
              const selectedIds = selectedProp.map(v => v.sceneId)
              const newSelected = this.list.filter(v => selectedIds.includes(v.id))
              this.handleCheck('check', newSelected)
            } else if (this.selected.length) {
              this.handleCheck('inspect')
            }
          })
        })
    },
    submitSearch(values) {
      this.searchQuery = { ...values }
      this.getList()
    },
    // 选中时row为rowList，取消选中时row为单个row
    handleCheck(type, row) {
      // 选中
      if (type === 'check') {
        if (this.selected.length === 10) {
          this.$message.error('最多选中10条！')
          return
        }
        this.selected = this.selected.concat(row)
        const checkedIds = this.selected.map(v => v.id)
        this.list.forEach(v => {
          v.checked = checkedIds.includes(v.id)
        })
        this.tableKey++
      // 取消选中
      } else if (type === 'uncheck') {
        this.selected = this.selected.filter(v => v.id !== row.id)
        this.list.forEach(v => {
          if (v.id === row.id) {
            v.checked = false
          }
        })
        this.tableKey++
      // 检查 回显选中
      } else {
        const checkedIds = this.selected.map(v => v.id)
        this.list.forEach(v => {
          v.checked = checkedIds.includes(v.id)
        })
        this.tableKey++
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-bar {
  display: flex;
  align-items: center;
  margin: 14px;
  .tag-label {
    font-size: 14px;
    color: rgb(81, 79, 79);
  }
}
</style>
