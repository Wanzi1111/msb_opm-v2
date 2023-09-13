<template>
  <div>
    <div style="display: inline-block;">
      <div class="form-item-bar">
        <div class="form-item-box">
          <!-- 时间区间 -->
          <el-date-picker
            v-if="form.triggerTimeType === 'RANGE'"
            v-model="form.dateTimeRangeValue"
            type="daterange"
            :picker-options="{ disabledDate: dateTimeRangeDisabledDate }"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <el-input
            v-else-if="form.triggerTimeType === 'LIMIT'"
            v-model="form.dateTimeRangeValue"
            placeholder="请输入"
            style="width: 170px"
          >
            <template slot="append">
              <el-select v-model="form.triggerTimeLimitType" placeholder="请选择" style="width: 80px">
                <el-option v-for="(e, index) in trigger_time_limit_type" :key="index" :label="e.label" :value="e.value" />
              </el-select>
            </template>
          </el-input>

          <!-- 行为属性规则 目前仅为做过｜未做作-->
          <el-select v-model="form.actionType" style="width: 100px" v-bind="{ ...comAttrConfig.actionType || {} }">
            <el-option v-for="option in behavior_attr_rules" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <!-- 行为属性下拉列表 -->
          <el-cascader
            v-model="form.id"
            placeholder="请选择(支持搜索)"
            style="width: 200px"
            filterable
            clearable
            :show-all-levels="false"
            :props="{emitPath: false, leaf: 'isLeaf', children: 'childList'}"
            :options="eventData"
            @change="(val) => handleBehaviorAttrChange(val.split('-')[1])"
          />
          <!-- 添加筛选 -->
          <el-button icon="el-icon-plus" size="mini" type="text" @click="handleAddBehaviorScreen(true)">添加筛选</el-button>
        </div>
      </div>
      <!-- 所添加的筛选，且支持多个 -->
      <div v-if="form.props.length" class="form-item-box extra-screen-box behavior-form-item-bar">
        <div class="extra-screen-left">并且满足</div>
        <div class="extra-screen-content">
          <div v-if="form.props.length > 1" class="extra-screen-content-left">
            <el-button disabled size="mini">且</el-button>
          </div>
          <div class="extra-screen-content-right">
            <div v-for="(value, index) in form.props" :key="index" class="extra-screen-content-item-bar">
              <!-- 筛选属性列表 -->
              <el-select v-model="value.id" @change="(val) => handleBehaviorScreenChange(val, index)">
                <el-option v-for="option in form.rules" :key="option.value" :label="option.label" :value="option.value" :disabled="!option.status" />
              </el-select>
              <!-- 规则 -->
              <el-select v-model="value.opCode" style="width: 100px">
                <el-option v-for="option in value.ops" :key="option.value" :label="option.label" :value="option.value" />
              </el-select>
              <!-- 属性的值 -->
              <!-- 时间类型，有单个时间及时间区间的 -->
              <div v-if="value.dataType === 'DATETIME'">
                <el-date-picker
                  v-if="value.opCode === 'DATETIME_RANGE'"
                  v-model="value.value"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
                <div v-else>
                  <el-input-number v-model="value.value" controls-position="right" step-strictly :min="1" />
                  <span>天</span>
                </div>
              </div>
              <!-- 布尔类型，通常是是和否的单选 -->
              <div v-else-if="value.dataType === 'BOOL'">
                <el-select v-model="value.value" style="width: 100px">
                  <el-option v-for="option in value.dictList" :key="option.code" :label="option.label" :value="option.value" />
                </el-select>
              </div>
              <!-- 字符串和列表类型，一般为下拉多选 -->
              <div v-else-if="value.dataType === 'STRING' || value.dataType === 'LIST'">
                <el-select v-model="value.value" multiple filterable reserve-keyword remote :remote-method="(query) => handleBehaviorDictListSearch(query, value.id, index)" placeholder="请选择(支持搜索)" :loading="loadings._big_data_client_profile_group_listDictOfEventProps">
                  <el-option v-for="option in value.dictList" :key="option.code" :label="option.label" :value="option.value" />
                </el-select>
              </div>
              <!-- 数字类型，有单个输入和区间输入 -->
              <div v-else-if="value.dataType === 'NUMBER'">
                <div v-if="value.opCode === 'NUM_RANGE'">
                  <el-input-number v-model="value.value" controls-position="right" step-strictly :min="1" />
                  <span> - </span>
                  <el-input-number v-model="value.value2" controls-position="right" step-strictly :min="1" />
                </div>
                <el-input-number v-else v-model="value.value" controls-position="right" step-strictly :min="1" />
              </div>

              <!-- 删除此筛选项 -->
              <el-button icon="el-icon-close" size="mini" type="text" @click="handleAddBehaviorScreen(false, index)" />
            </div>
          </div>
        </div>
      </div>
      <!-- 只有当某些行为 做过 才会出现总次数等 -->
      <div v-if="form.actionType === 'do'" class="form-item-box behavior-form-item-bar">
        <el-select v-model="form.eventCountop" style="width: 100px">
          <el-option v-for="option in behavior_times_list" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
        <el-select v-model="form.eventCountopCode" style="width: 100px">
          <el-option v-for="option in behavior_times_rules" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
        <el-input-number v-model="form.eventCountopValue" controls-position="right" step-strictly :min="1" />
        <span>次</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep, debounce } from 'lodash'
import moment from 'moment'
import {
  listEventPropsDropdown,
  listDictOfEventProps
} from '@/api/intelligentMarketing'
import { transferData2, transferData4 } from '@/views/intelligent-marketing/user-group/utils'
import {
  init_behavior_form,
  init_behavior_screen_form,
  behavior_attr_rules,
  behavior_times_rules,
  behavior_times_list,
  trigger_time_limit_type
} from './config'

const dateTimeRangeDisabledDate = (time) => time.getTime() <= moment().subtract(1, 'day').valueOf() || moment(time).subtract(7, 'month').endOf('month').valueOf() >= moment().valueOf()
const allIsLeafItems = [] // 扁平化eventData

export default {
  name: 'UserGroupBehavior',
  components: {},
  props: {
    editData: {
      type: Object,
      default: () => ({})
    },
    defaultConfig: {
      type: Object,
      default: () => ({})
    },
    groupId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dateTimeRangeDisabledDate,
      behavior_attr_rules,
      behavior_times_rules,
      behavior_times_list,
      trigger_time_limit_type,
      eventData: [],
      form: cloneDeep(init_behavior_form),
      comAttrConfig: {}
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    defaultConfig: {
      handler: function(config) {
        // console.log('defaultConfig', config)
        if (config && Object.values(config).length > 0) {
          if (config.defaultVal) {
            this.form = { ...this.form, ...config.defaultVal }
          }
          if (config.comAttrConfig) {
            this.comAttrConfig = { ...config.comAttrConfig }
          }
        }
      },
      immediate: true
    }
  },
  async mounted() {
    await this.getPropsData()
    if (JSON.stringify(this.editData) !== '{}') {
      this.handleEdit()
    }
  },
  methods: {
    // 获取行为属性 树形列表
    getPropsData() {
      return new Promise((resolve) => {
        this.$store.dispatch('intelligentMarketing/getEventData')
          .then(res => {
            this.eventData = cloneDeep(res)
            resolve()
          })
      })
    },
    async handleEdit() {
      try {
        const events = cloneDeep(this.editData)

        listEventPropsDropdown({ eventId: events.id })
          .then(res => {
            // 过滤禁用属性
            const allRules = transferData2(res.result)
            const rules = allRules.filter(v => v.status === 1)
            const form = this.handleAssembleEditBehaviorForm(events, { allRules, rules })

            this.form = form
          })
      } catch (e) {
        this.$message.error(`表单错误：${e}，请检查后重试！`)
        console.error('e', e)
        return null
      }
    },
    // 组装编辑行为数据
    handleAssembleEditBehaviorForm(value, rules) {
      const { id, props, triggerTimeType, windowUnit, windowPeriod, dateTimeRangeValue, eventCountProp: { opCode: eventCountopCode, value: eventCountopValue }} = value
      const { type } = this.handleFindOps(~~id, this.eventData)
      if (props?.length) {
        value.props = props.map(v => {
          const { value, id, dataType, opCode } = v
          const currentItem = rules.allRules.filter(val => val.id === +id)[0]
          const { ops, dictList, status } = currentItem
          const newValue = this.handleEditCommonForm({ value, dataType, opCode })
          // 已选中禁用的数据需要回显
          if (status === 0) {
            rules.rules.push(currentItem)
          }
          return { ...v, ...newValue, id: id + '', ops, dictList }
        })
      } else {
        value.props = []
      }
      if (triggerTimeType === 'RANGE') {
        value.dateTimeRangeValue = [moment(dateTimeRangeValue.beginTime), moment(dateTimeRangeValue.endTime)]
      } else if (triggerTimeType === 'LIMIT') {
        value.dateTimeRangeValue = windowPeriod
        value.triggerTimeLimitType = windowUnit
      }
      return { ...value, id: `${type}-${id}`, eventCountopCode, eventCountopValue, eventCountop: 'totals', rules: rules.rules }
    },
    // 与handleCommonForm类似的处理，编辑时反向操作一波
    handleEditCommonForm(values) {
      const { dataType, value, opCode } = values
      const newValue = { value: '' }
      if (dataType === 'STRING' || dataType === 'LIST') {
        newValue.value = value.keys
      } else if (dataType === 'BOOL') {
        newValue.value = value.key
      } else if (dataType === 'NUMBER') {
        if (opCode === 'NUM_RANGE') { // 区间为两个值
          newValue.value = value.beginNum
          newValue.value2 = value.endNum
        } else {
          newValue.value = value.val
        }
      } else if (dataType === 'DATETIME') {
        if (opCode === 'DATETIME_RANGE') {
          newValue.value = [moment(value.beginTime), moment(value.endTime)]
        } else {
          newValue.value = value.days
        }
      }
      return newValue
    },
    /**
     * @description 行为属性 添加筛选
     * @param {Boolean} flag true 添加筛选 false删除筛选
     * @param {Number} index 额外筛选规则下标
     */
    handleAddBehaviorScreen(flag, index) {
      const { form } = this
      if (flag) {
        const { rules } = form
        let initVals = {}
        if (rules.length) {
          const { value, dictList, ops, dataType } = rules[0]
          initVals = {
            ops,
            dictList,
            dataType,
            id: value,
            value: dictList?.[0]?.value || '',
            opCode: ops?.[0]?.value || ''
          }
        }
        this.form.props = form.props.concat({ ...cloneDeep(init_behavior_screen_form), ...initVals })
      } else {
        this.form.props.splice(index, 1)
      }
    },
    /**
     * @description 行为属性 筛选所选的属性后要动态改变相应的规则等
     * @param {number} val 当前属性值
     * @param {number} index 筛选规则下标
     */
    handleBehaviorScreenChange(val, index) {
      const { form: { rules, props }} = this
      const selectItem = rules.filter(v => v.value === val)[0]
      const { dataType, ops, dictList } = selectItem
      this.$set(this.form.props, index, { ...props[index], dataType, ops, dictList, opCode: ops?.[0]?.value || '', value: null })
    },
    /**
     * @description 行为属性 选中某个行为后要获取当前行为下的筛选属性规则
     * @param {string} val  搜索关键字
     */
    async handleBehaviorAttrChange(val) {
      if (!val) return
      const { form } = this
      const res = await listEventPropsDropdown({ eventId: val })
      const allRules = transferData2(res.result)
      // 过滤禁用
      const rules = allRules.filter(v => v.status === 1)
      this.form = { ...form, rules, props: [] }
    },
    /**
     * @description 行为属性筛选规则的事件筛选
     * @param {string} query 搜索关键字
     * @param {string} id 对应的行为属性id
     * @param {number} index 当前行为属性筛选规则的下标
     */
    handleBehaviorDictListSearch: debounce(async function(query, id, index) {
      if (query === '') return
      const { result } = await listDictOfEventProps({ propId: id, val: query, limit: 150 })
      const allDictList = transferData4(result)
      this.$set(this.form.props, index, { ...this.form.props[index], dictList: allDictList })
    }, 300),
    // 从基础属性活行为属性的树形数据中 获取与id对应的叶节点：即属性结点的那条数据
    handleFindOps(id, list) {
      if (!allIsLeafItems.length) {
        const handleIsLeafItem = (list) => {
          list.forEach(v => {
            if (v.isLeaf) {
              allIsLeafItems.push(v)
            }
            if (v.childList?.length) {
              handleIsLeafItem(v.childList)
            }
          })
        }
        handleIsLeafItem(list)
      }
      return allIsLeafItems.filter(v => (v.value === id || v.id === id))?.[0]
    },
    // 组装行为属性数据
    getBehaviorForm() {
      try {
        const { triggerTimeType, dateTimeRangeValue, triggerTimeLimitType, actionType, id, rules, eventCountopCode, eventCountopValue, props } = this.form
        const { name, ename } = this.handleFindOps(id, this.eventData)
        const obj = { triggerTimeType, actionType, id: id.split('-')[1], eventName: name, eventEname: ename, reOp: 'and', eventCountProp: { opCode: eventCountopCode, value: eventCountopValue }}
        if (triggerTimeType === 'RANGE') {
          obj.dateTimeRangeValue = {
            beginTime: moment(dateTimeRangeValue[0]).startOf('days').format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(dateTimeRangeValue[1]).endOf('days').format('YYYY-MM-DD HH:mm:ss')
          }
        } else if (triggerTimeType === 'LIMIT') { // 自己加的类型。。。这个类型的服务端接口结构变了。。
          obj.windowPeriod = dateTimeRangeValue
          obj.windowUnit = triggerTimeLimitType
        }
        if (props.length) {
          // obj.opCode = 'and'
          obj.props = props.map(values => {
            const { id, dataType, dictList, opCode, value, value2 } = values
            const { propsName, propsEname, propsType } = rules.filter(v => v.value === id)[0]
            const objValue = { id, propsName, propsEname, propsType, dataType, opCode }
            const resetValue = this.handleCommonForm({ dataType, dictList, opCode, value, value2 })
            return { ...objValue, value: resetValue }
          })
        }
        return { events: { reOp: 'and', events: [obj] }}
      } catch (e) {
        this.$message.error(`表单错误：${e}，请检查后重试！`)
        console.error('e', e)
        return null
      }
    },
    // 基础属性规则与行为属性的筛选规则一致，可共用对value值的处理
    handleCommonForm(values) {
      const { dataType, dictList, opCode, value, value2 } = values
      let valueObj = { }
      if (dataType === 'STRING' || dataType === 'LIST') {
        const valueObjTemp = { val: [], keys: [], dictCode: '' }
        value.forEach(v => {
          const val = dictList.filter(val => val.value === v)[0]
          valueObjTemp.val.push(val.val)
          valueObjTemp.keys.push(val.key)
          valueObjTemp.dictCode = valueObjTemp.dictCode || val.dictCode
        })
        valueObj = valueObjTemp
      } else if (dataType === 'BOOL') {
        valueObj.key = value
        valueObj.val = value === '0' ? '否' : '是'
      } else if (dataType === 'NUMBER') {
        if (opCode === 'NUM_RANGE') { // 区间为两个值
          valueObj.beginNum = value + ''
          valueObj.endNum = value2 + ''
        } else {
          valueObj.val = value + ''
        }
      } else if (dataType === 'DATETIME') {
        if (opCode === 'DATETIME_RANGE') {
          valueObj.beginTime = moment(value[0]).startOf('days').format('YYYY-MM-DD HH:mm:ss')
          valueObj.endTime = moment(value[1]).endOf('days').format('YYYY-MM-DD HH:mm:ss')
        } else {
          valueObj.days = value + ''
        }
      }
      return valueObj
    }
  }
}
</script>

<style lang='scss' scoped>
.form-item-bar {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  .form-item-box {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    flex-wrap: wrap;
    >div {
      margin-right: 5px;
    }
  }
  .form-item-action-box {
    text-align: right;
    width: 120px;
    ::v-deep .el-button {
      margin-left: 0px;
    }
  }
}
.behavior-form-item-bar {
  margin-bottom: 5px;
}
.extra-screen-box {
  display: flex;
  justify-content: flex-start;
  .extra-screen-left {
    width: 150px;
    margin-right: 10px;
    padding-right: 8px;
    text-align: right;
  }
  .extra-screen-content {
    display: flex;
    justify-content: flex-start;
    border-left: 2px solid #a3d3ff;
    padding-left: 20px;
    &-left {
      width: 30px;
      border: 1px solid #d3dce6 ;
      border-right: none;
      position: relative;
      margin-top: 20px;
      margin-bottom: 20px;
      >button {
        position: absolute;
        left: 0;
        top: 50%;
        margin-left: -15px;
        margin-top: -15px;
      }
    }
    &-item-bar {
      margin: 5px 0;
      display: flex;
      >div {
        margin-right: 5px;
      }
    }
  }
}
</style>
