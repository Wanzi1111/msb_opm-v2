<template>
  <div class="app-container">
    <basics-block :title="title">
      <basics-form
        ref="form"
        :forms="forms"
        :actions="actions"
        :attr="attrs"
        @changeForm="changeForm"
        @submitForm="submitForm"
      />
    </basics-block>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { saveWeeklyCoinConfig, getWeeklyCoinConfig } from '@/api/operate/manage'
import _ from 'lodash'
import moment from 'moment'
import * as forms from './forms/create'

// 目前使用到必填的常量
const kindTaskTypeMap = {
  week: '8', // 周周有礼的type
  course: '16' // 赠课活动
}
// disabled集合
const disableds = ['task_time', 'activeprice', 'successlimit', 'successtime']

export default {
  name: 'ActivityCreate',
  data() {
    return {
      // forms: forms,
      actions: forms.actions({ back: this.back }),
      kind: 'week',
      title: '新建配置',
      type: '',
      attrs: {
        disabled: false
      },
      resetId: ''
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    // form 需要根据传递捡来的id 区分时哪种类型的活动
    forms() {
      return forms[this.kind]
    }
  },
  watch: {
    // $route(route) {
    //   // if you go to the redirect page, do not update the breadcrumbs
    // },
    title: {
      handler: function (val) {
        if (val === '查看详情') {
          this.attrs.disabled = true
          for (let i = 0; i < forms.week.length; i++) {
            if (forms.week[i].type === 'upload-media') {
              this.$refs.form.set({
                type: 'attr',
                data: {
                  [forms.week[i].prop]: {
                    disabled: true
                  }
                }
              })
            }
          }
        } else if (val === '修改配置') {
          this.$nextTick(() => {
            forms.group.forEach(e => {
              if (disableds.some(s => s === e.prop)) {
                this.$refs.form.set({
                  type: 'attr',
                  data: {
                    [e.prop]: {
                      disabled: true
                    }
                  }
                })
              }
            })
          })
        } else {
          this.attrs.disabled = false
          this.$nextTick(() => {
            this.$refs.form.set({
              type: 'attr',
              data: {
                task_time: {
                  disabled: false
                }
              }
            })
          })
        }
      },
      immediate: true
    }
  },
  created() {
    const { query } = this.$route
    this.kind = query.kind
    this.title = query.title ? query.title : '新建配置'
    this.id = query.id ? query.id : ''
    this.status = query.status ? query.status : '' // 标记修改状态
    this.type = query.type ? query.type : '' // 标记复用
    if (this.kind === 'group') this.getGroupDetail(query.row)
    else this.getDetail() // 修改，复用，查看详情
  },
  mounted() {
    const { query } = this.$route
    // 赠课活动默认任务时间
    if (!query.id && this.kind === 'course') {
      this.$nextTick(() => {
        this.$refs.form.set({
          type: 'defaultVal',
          data: {
            task_time: this.getCourseTime()
          }
        })
      })
    }
  },
  methods: {
    getCourseTime() {
      let time = []
      if (moment().date() <= 15) {
        time = [moment(moment().date(16)).format('YYYY-MM-DD HH:mm:ss'), moment(moment().endOf('month')).format('YYYY-MM-DD HH:mm:ss')]
      } else {
        time = [moment(moment().add(1, 'month').date(1)).format('YYYY-MM-DD HH:mm:ss'), moment(moment().add(1, 'month').date(15)).format('YYYY-MM-DD HH:mm:ss')]
      }
      return time
    },
    // 监听 forms变化
    changeForm(val, oldVal) {
      // console.log('val.task_time', val.task_time)
      const { config_way, price_bite } = val
      this.config_way = config_way
      // this.price_bite = price_bite

      if (config_way !== oldVal.config_way) {
        // 判断一下当前kind
        if (this.kind === 'listen') {
          this.showCurrentForm(config_way, 'config_type')
          this.showCurrentForm(price_bite, 'price')
        } else if (this.kind === 'course') {
          this.showCurrentForm(config_way, 'config_type')
        } else { // 目前只配置周周有礼活动
          console.log(config_way, 'config_type')
        }
      }
    },
    // 显示隐藏辅助函数(暂时没用)
    showCurrentForm(origin, target) {
      switch (origin) {
        case '0':
          this.$refs.form.set({
            type: 'visible',
            data: { [target]: false }
          })
          break
        default:
        case '1':
          this.$refs.form.set({
            type: 'visible',
            data: { [target]: true }
          })
          break
      }
    },
    // 表单提交
    async submitForm(val) {
      const { id, kind, type, resetId } = this
      const params = {
        startTime: moment(val.task_time[0]).startOf('days').valueOf(),
        endTime: moment(val.task_time[1]).add(1, 'days').startOf('days').valueOf(),
        taskType: kindTaskTypeMap[kind],
        ...val
      }
      if (id && resetId && type !== 'reuse') { // 修改
        params.id = Number(resetId)
        params.task_list_id = Number(id)
      }
      delete params.task_time
      const d = this.paramsHandel(val)
      let res
      if (kind === 'group') res = await this.$api.assembleActive(d)
      else res = await saveWeeklyCoinConfig(params)
      if (res.code === 0 || res.status === 0) {
        this.$message.success('创建成功')
        this.$router.push({ name: 'TransferManage', query: { kind }})
      }
    },

    // 处理拼团的参数
    paramsHandel(params) {
      const { popup, question_inner, team_inner, transfer_inner, question_out, team_out, transfer_out, head, share, infoHead, infoMember, appletImg, appletText, classAppletImg, classAppletText, classHead, classInfoHead, classInfoMember, classShare, task_time: [starttime, endtime] } = params
      const t = this.type === 'reuse'
      let d = {
        ...params,
        id: t ? null : Number(this.id),
        starttime,
        endtime,
        other: JSON.stringify([{ popup, question_inner, team_inner, transfer_inner }]),
        one: JSON.stringify([{ head, share, infoHead, infoMember, appletImg, appletText }]),
        many: JSON.stringify([{ classAppletImg, classAppletText, classHead, classInfoHead, classInfoMember, classShare }]),
        other_hw: JSON.stringify([{ question_out, team_out, transfer_out }]),
        one_hw: JSON.stringify([{ }]),
        many_hw: JSON.stringify([{ }])
      }
      d = _.omit(d, ['popup', 'question_inner', 'team_inner', 'transfer_inner', 'question_out', 'team_out', 'transfer_out', 'head', 'share', 'infoHead', 'infoMember', 'appletImg', 'appletText', 'classAppletImg', 'classAppletText', 'classHead', 'classInfoHead', 'classInfoMember', 'classShare', 'task_time'])
      return d
    },

    // 获取拼团详情
    getGroupDetail(row) {
      // starttime, endtime,
      const { other, one, many, other_hw, one_hw, many_hw, title, activeprice, starttime, endtime, successlimit, successtime } = JSON.parse(row)
      const task_time = [moment(starttime).format(), moment(endtime).format()]
      const r = Object.assign({}, ...other, ...one, ...other_hw, ...one_hw, ...many_hw, ...many, { title }, { task_time }, { activeprice }, { successlimit }, { successtime })
      console.log('task_time', task_time)
      this.$nextTick(() => {
        this.$refs.form.recoveryForm({ ...r })
      })
    },

    // 获取详情
    async getDetail() {
      const { id: taskListId, type, kind } = this
      if (!taskListId) return
      const res = await getWeeklyCoinConfig({ taskListId })
      if (res.code === 0) {
        const details = { ...res.payload }
        this.resetId = res.payload?.id
        // res.data.price_bite = Number(res.data.price_bite)
        if (type && type === 'reuse') { // 标记复用
          details.name = ''
          details.time = ''
        }
        // 回显时间,时间戳转成日期对象
        details.task_time = [new Date(Number(details.startTime)), new Date(Number(details.endTime))]
        delete details.startTime
        delete details.endTime
        if (type === 'reuse' && kind === 'course') {
          details.task_time = this.getCourseTime()
        }
        this.$nextTick(() => {
          this.$refs.form.recoveryForm(details)
        })
      }
    },
    back() {
      const { kind } = this
      this.$router.push({ name: 'TransferManage', query: { kind }})
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep .el-form-item__label {
    width: 130px !important
  }
}
</style>
