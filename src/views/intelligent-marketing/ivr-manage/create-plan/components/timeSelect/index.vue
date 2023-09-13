<template>
  <div>
    <el-col :span="6">
      <el-select
        ref="slotFormSelect"
        v-model="type"
        clearable
        style="width: 100px"
      >
        <el-option value="0" label="每天" />
      </el-select>
    </el-col>
    <el-col :span="7">
      <el-time-select
        v-model="time"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '23:30'
        }"
        placeholder="选择时间"
      />
    </el-col>
    <el-col :span="1">至</el-col>
    <el-col :span="6">
      <el-time-select
        v-model="timeTo"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '23:30'
        }"
        placeholder="选择时间"
      />
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'TimeSelect',
  props: {
    // time  0: 任务时间, 1: 不可导入时间
    timeType: {
      type: Number,
      default: 0
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      type: '0',
      time: '',
      timeTo: ''
    }
  },
  computed: {},
  watch: {
    type(val) {
      this.$emit('update:scheduleType', val)
    },
    time(val) {
      this.$emit(`update:${!this.timeType ? 'scheduleTime' : 'haltTimeFrom'}`, val)
    },
    timeTo(val) {
      this.$emit(`update:${!this.timeType ? 'scheduleTimeTo' : 'haltTimeTo'}`, val)
    },
    form(val) {
      if (!this.timeType) {
        this.time = val.scheduleTime
        this.timeTo = val.scheduleTimeTo
      } else {
        this.time = val.haltTimeFrom
        this.timeTo = val.haltTimeTo
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
