<!--
 * @Descripttion: 创建评分题
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-12-05 13:28:54
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-10 14:17:28
-->
<template>
  <el-dialog :title="title" :visible.sync="visible" class="create-dialog" :show-close="false">
    <basics-form ref="form" :loading="loadings._operation_announcement_addAnnouncement" :forms="forms" :actions="actions" @submitForm="submitForm" />
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import BasicsForm from '@/components/BasicsForm'
import forms, { actions } from './forms'
export default {
  components: {
    BasicsForm
  },
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      visible: false,
      forms,
      actions: actions({ submit: this.submit, cancel: this.cancel })
    }
  },

  computed: {
    ...mapGetters(['loadings']),
    title() {
      return this.survey ? '编辑评分题' : '添加评分题'
    }
  },

  watch: {
    // 编辑回显
    visible(val) {
      if (!val || !this.survey) {
        return
      }
      // format data
      // debugger
      const { required, scoreShow, scoreNote = [], show } = this.survey
      const item = {
        ...this.survey,
        required: +required === 1,
        scoreShow: +scoreShow === 1,
        scoreNoteLow: scoreNote[0] || '',
        scoreNoteHigh: scoreNote[1] || '',
        show: !!show
      }
      // this.$refs.form && this.$refs.form.recoveryForm(item)
      setTimeout(() => {
        this.$refs.form && this.$refs.form.recoveryForm(item)
      }, 500)
    }
  },

  methods: {
    cancel() {
      this.visible = false
      this.$refs.form.resetFields()
    },
    submitForm(val) {
      if (!val) return
      const { required, scoreShow, scoreNoteLow, scoreNoteHigh } = val
      const item = {
        type: 'surveyScore',
        ...val,
        required: required ? 1 : 0,
        scoreShow: scoreShow ? 1 : 0,
        scoreNote: [scoreNoteLow, scoreNoteHigh]
      }
      // debugger
      if (this.survey) {
        item.id = this.survey.id
        item.surveyQuestionId = this.survey.surveyQuestionId
      }
      this.$emit('result', item)
      this.cancel()
    }
  }
}
</script>

<style lang="scss" scoped>
.create-dialog{
  ::v-deep .form-action {
      display: flex;
      justify-content: flex-end;
  }
  ::v-deep .el-button {
      width: 80px;
  }
}
</style>
