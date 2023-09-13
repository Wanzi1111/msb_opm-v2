<!--
 * @Descripttion: 复制问卷 && 编辑问卷标题 弹框
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-12-04 14:57:44
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-04 16:41:44
-->
<template>
  <el-dialog :title="title" :visible.sync="visible" :show-close="false">
    <p>{{ desc }}</p>
    <basics-form ref="formCopy" :loading="loadings._operation_announcement_addAnnouncement" :forms="forms" :actions="actions" @submitForm="submitForm" />
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import BasicsForm from '@/components/BasicsForm'
import forms, { actions } from '../forms/copySurvey'
import { copySurvey, updateSurveyTitle } from '@/api/questionnaire/index'
export default {
  components: {
    BasicsForm
  },
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
    // copy-复制问卷， edit - 编辑问卷标题
    // type: {
    //   type: String,
    //   default: 'copy'
    // }
  },
  data() {
    return {
      visible: false,
      formLabelWidth: '100px',
      forms,
      actions: actions({ cancel: this.cancel }),
      // copy-复制问卷， editTitle - 编辑问卷标题
      type: 'copy'
    }
  },
  computed: {
    ...mapGetters(['loadings', 'bizLine']),
    title() {
      return this.type === 'copy' ? '复制问卷' : '编辑问卷标题'
    },
    desc() {
      return this.type === 'copy' ? '请选择问卷类型及名称，复制一份新的问卷！' : '请选择问卷类型及名称，更新当前问卷信息！'
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.init()
      }
    }
  },
  methods: {
    init() {
      const { surveyTypeList = [] } = this.bizLine
      const surveyTypeOptions = surveyTypeList || []
      setTimeout(() => {
        this.$refs.formCopy && this.$refs.formCopy.set({
          type: 'options',
          data: {
            surveyTypeCode: surveyTypeOptions
          }
        })
        if (this.survey) {
          const { surveyType, surveyTitle } = this.survey
          this.$refs.formCopy.recoveryForm({
            surveyTypeCode: surveyType + '',
            surveyTitle
          })
        }
      }, 200)
    },
    submitForm(val) {
      if (!val) return
      const { cid, id } = this.survey
      const { surveyTypeCode, surveyTitle } = val
      const params = {
        cid,
        surveyId: id,
        surveyTitle,
        surveyTypeCode: +surveyTypeCode
      }
      if (this.type === 'copy') {
        copySurvey(params).then(res => {
          if (res && res.status === 0) {
            this.$message.success('复制成功')
            this.$emit('result')
            this.cancel()
          }
        })
        return
      }
      if (this.type === 'editTitle') {
        updateSurveyTitle(params).then(res => {
          if (res && res.status === 0) {
            this.$message.success('编辑成功')
            this.$emit('result')
            this.cancel()
          }
        })
      }
    },

    cancel() {
      this.visible = false
      this.$refs.formCopy.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  p{
    margin: 0 0 30px 10px;
  }
}
</style>
