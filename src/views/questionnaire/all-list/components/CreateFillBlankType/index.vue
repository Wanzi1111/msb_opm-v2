<!--
 * @Descripttion: 新增填空题弹框
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-28 16:53:07
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-10 14:10:47
-->
<template>
  <el-dialog :title="title" :visible.sync="visible" class="create-dialog" :show-close="false">
    <basics-form ref="form" :loading="loadings._operation_announcement_addAnnouncement" :forms="forms" :actions="actions" @submitForm="submitForm">
      <template slot="formRoute" slot-scope="scope">
        <el-form-item label="选项跳转" class="slot-item">
          <!-- <el-col :span="5"> -->
          <el-select v-model="scope.form.redirectType" :disabled="!survey" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-if="scope.form.redirectType===1 && !!survey" v-model="scope.form.redirectId" placeholder="请选择">
            <el-option
              v-for="item in optionsQues"
              :key="item.id"
              :label="item.questionTitle"
              :value="item.id"
            />
          </el-select>

          <!-- <el-input v-model="scope.form.width" placeholder="长度" /> -->
          <!-- </el-col> -->
          <!-- <el-col :span="5"> -->
          <!-- <el-input v-model="scope.form.height" placeholder="宽度" /> -->
          <!-- </el-col> -->
        </el-form-item>
      </template>
    </basics-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import BasicsForm from '@/components/BasicsForm'
import forms, { actions } from './forms'
import { backend } from '@/api/questionnaire/index'

export default {
  components: {
    BasicsForm
  },
  props: {
    survey: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      forms,
      options: [
        {
          label: '结束作答',
          value: 2
        },
        {
          label: '顺序填写下一题',
          value: 0
        },
        {
          label: '跳至对应题目',
          value: 1
        }
      ],
      optionsQues: [],
      actions: actions({ submit: this.submit, cancel: this.cancel })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    title() {
      return this.survey ? '编辑简答题' : '添加简答题'
    }
  },
  watch: {
    // 编辑回显
    visible(val) {
      // debugger
      if (!val || !this.survey) return
      this.backend()
      console.log(this.survey)
      const obj = {
        ...this.survey,
        required: this.survey.required === 1,
        show: !!this.survey.show
      }
      setTimeout(() => {
        console.log(this.$refs.form, 'this.$refs.form')
        this.$refs.form && this.$refs.form.recoveryForm(obj)
      }, 500)
    }
  },

  methods: {
    cancel() {
      this.visible = false
      this.$refs.form.resetFields()
    },
    backend(val) {
      console.log('this.survey: ', this.survey)
      let num = this.survey && this.survey.order
      if (!this.$route.query.surveyId) {
        return
      }
      if (val) {
        num = val
      }
      backend({ surveyId: this.$route.query.surveyId, order: num }).then(res => {
        this.optionsQues = res.data
      })
    },
    submitForm(val) {
      console.log(val, 'submitForm')
      if (!val) return
      const { textMaxWords, textMinWords, required } = val
      if (textMinWords > textMaxWords) {
        this.$message.error('请正确设置字数范围')
        return
      }
      const item = {
        type: 'surveyFillBlank',
        ...val,
        required: required ? 1 : 0
      }
      if (this.survey) {
        item.id = this.survey.id
        item.show = item.show ? 1 : 0
        item.surveyQuestionId = this.survey.surveyQuestionId
      }
      // debugger
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
  .slot-item {
    padding-left: 19px;
    .el-select--medium {
      margin-left: 9px !important
    }
  }
}
</style>

