<!--
 * @Descripttion: 问卷标题
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-28 16:53:07
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-05 19:36:06
-->
<template>
  <el-dialog title="问卷标题" :visible.sync="visible" @close="cancel">
    <basics-form ref="formTitle" :loading="loadings._operation_announcement_addAnnouncement" :forms="forms" :actions="actions" @changeForm="changeForm" @submitForm="submitForm" />
  </el-dialog>
</template>

<script>
// import { createTitle } from '@/api/questionnaire/index'
import BasicsForm from '@/components/BasicsForm'
import forms, { actions } from '../forms/createTitle'
import { mapGetters } from 'vuex'

export default {
  name: 'CreateQuestionTitle',
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
      formLabelWidth: '100px',
      forms,
      actions: actions({ submit: this.submit, cancel: this.cancel })
    }
  },
  computed: {
    ...mapGetters(['loadings', 'bizLine'])
  },
  watch: {
    visible(val) {
      if (val) {
        this.init()
      }
    }
  },
  // mounted() {
  //   this.init()
  // },
  methods: {
    init() {
      const { bizLineList = [], surveyTypeList = [] } = this.bizLine
      const bizLineOptions = bizLineList || []
      const surveyTypeOptions = surveyTypeList || []

      console.log(bizLineOptions)
      console.log(this.$refs)
      setTimeout(() => {
        console.log(this.$refs)
        this.$refs.formTitle && this.$refs.formTitle.set({
          type: 'options',
          data: {
            surveyTypeCode: surveyTypeOptions,
            surveyBizLineCode: bizLineOptions
          }
        })
        if (this.survey) {
          const { surveyTypeCode, surveyBizLineCode, surveyTitle } = this.survey
          this.$refs.formTitle.recoveryForm({
            surveyTypeCode: surveyTypeCode + '',
            surveyBizLineCode: surveyBizLineCode + '',
            surveyTitle
          })
        }
      }, 200)
    },

    cancel() {
      this.visible = false
      this.$refs.formTitle.resetFields()
    },

    changeForm(val, oldVal) {
      // console.log(val, 'changeForm')
    },
    submitForm(val) {
      console.log(val, 'submitForm')
      if (!val) return
      this.$emit('title', val)
      this.visible = false
      // this.cancel()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
