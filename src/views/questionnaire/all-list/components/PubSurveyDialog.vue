<!--
 * @Descripttion:  发布问卷 确认框
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-12-03 16:58:54
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-03 21:02:18
-->
<template>
  <el-dialog
    title="确定发布问卷"
    :visible.sync="visible"
    :show-close="false"
    class="pub-dialog"
  >
    <p class="tips">发布后需要通过以下链接进行问卷填写，数据将自动汇总至本系统中！</p>
    <el-form ref="pubForm" :model="pubForm">
      <el-form-item label="问卷地址" prop="url" label-width="100px">
        <div class="d-flex">
          <el-input v-model="pubForm.url" disabled />
          <el-button size="small" style="width: 80px; margin-left: 20px;" @click="handleClip(pubForm.url, $event)">复制</el-button>
          <el-button size="small" style="width: 80px;" @click="handlePreview">预览</el-button>
        </div>
      </el-form-item>
      <el-form-item label="收集时间" prop="startDate" label-width="100px">
        <p>选择后则按规定时间开始收集数据，不选择则无时间限制</p>
        开始时间：
        <el-date-picker
          v-model="pubForm.startDate"
          type="datetime"
          placeholder="选择开始时间"
        />
      </el-form-item>
      <el-form-item label="" prop="endDate" label-width="100px">
        结束时间：
        <el-date-picker
          v-model="pubForm.endDate"
          type="datetime"
          placeholder="选择结束时间"
          default-time="23:59:59"
          :picker-options="pickerOptions"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <!-- 进行中的可以再次编辑时间 -->
      <el-button type="primary" :disabled="survey.surveyStatus > 1" @click="handlePubSurvey">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
import moment from 'moment'
import { openBrowserTab } from '@/utils/index'
import clipboard from '@/utils/clipboard'
import { pubOrDelSurvey } from '@/api/questionnaire/index'
export default {
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false,
      pubForm: {
        url: '',
        startDate: '',
        endDate: ''
      },
      pickerOptions: {
        disabledDate: (date) => {
          const { startDate } = this.pubForm
          return startDate && new Date(date) < new Date(startDate)
        }
      }
    }
  },
  watch: {
    survey(val) {
      const { id, startTime, endTime } = val
      const startDate = startTime && moment(startTime * 1000).format() || ''
      const endDate = endTime && moment(endTime * 1000).format() || ''
      console.log(startDate, endDate)
      // TODO: 区分环境
      let h5Url = 'https://test121.meishubao.com/'
      const opmPath = location.hostname
      // 预发环境
      if (opmPath.includes('fe-pre-opm')) {
        h5Url = 'https://vip121.meishubao.com/'
      }
      // 线上环境
      if (opmPath.includes('opm.meishubao.com')) {
        h5Url = 'https://vip.meishubao.com/'
      }

      const url = `${h5Url}1v1h5pages/activity/questionnaire?surveyId=${id}`
      Object.assign(this.pubForm, { url, startDate, endDate })
    }
  },
  methods: {
    handleClip(text, event) {
      clipboard(text, event)
    },

    handlePreview() {
      const path = `${this.pubForm.url}&type=preview`
      openBrowserTab(path)
    },

    /**
     * 发布问卷
     */
    handlePubSurvey() {
      const { id, cid } = this.survey
      const { startDate, endDate } = this.pubForm
      const data = {
        cid,
        surveyId: id,
        type: '1',
        startDate,
        endDate
      }
      console.log(data)
      pubOrDelSurvey(data).then(res => {
        console.log(res)
        if (res && res.status === 0) {
          this.$message.success('发布成功')
          this.$emit('result')
          this.handleCancel()
        }
      })
    },

    handleCancel() {
      this.$refs.pubForm.resetFields()
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.pub-dialog{
  ::v-deep {
    p{
      margin: 0;
    }
    .tips{
      margin-bottom: 30px;
      padding-left: 30px;
    }
  }
}
</style>
