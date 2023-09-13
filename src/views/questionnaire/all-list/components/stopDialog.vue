<!--
 * @Descripttion: 删除问卷 确认框
 * @version: 1.0.0
 * @Author: pengtaoqi
 * @Date: 2020-01-08 18:56:34
 * @LastEditors: YangJiyong
 * @LastEditTime: 2021-01-08 20:50:14
-->
<template>
  <el-dialog
    title="确定暂停问卷"
    :visible.sync="visible"
    :show-close="false"
    width="30%"
    class="pub-dialog"
  >
    <p><i class="el-icon-info" />问卷暂停后不再回复问卷数据，请谨慎操作！</p>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setSurveyTag } from '@/api/questionnaire/index'
export default {
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      visible: false
    }
  },

  methods: {
    handleCancel() {
      this.visible = false
    },
    handleSubmit() {
      const { id, cid } = this.survey
      // const { id, cid, surveyStatus, answerNum } = this.survey
      // // 已发布或有数据的，不能删除
      // if (answerNum > 0) {
      //   this.$message.error('问卷已存在数据无法删除')
      //   this.handleCancel()
      //   return
      // }
      // if (surveyStatus > 0) {
      //   this.$message.error('问卷已发布无法删除')
      //   this.handleCancel()
      //   return
      // }
      const data = {
        cid,
        surveyId: id,
        tag: this.survey.surveyTag === 2 ? 1 : 2
      }
      setSurveyTag(data).then(res => {
        if (res && res.status === 0) {
          this.$message.success('操作成功')
          this.$emit('result')
          this.handleCancel()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pub-dialog{
  ::v-deep i{
    margin-right: 6px;
    font-size: 16px;
    color: red;
  }
}
</style>
