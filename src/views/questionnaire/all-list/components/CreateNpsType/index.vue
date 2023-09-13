<!--
 * @Descripttion: 创建NPS题
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-12-05 13:28:54
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-10 14:11:11
-->
<template>
  <el-dialog :title="title" :visible.sync="visible" class="create-dialog" :show-close="false">
    <basics-form ref="form" :loading="loadings._operation_announcement_addAnnouncement" :forms="forms" :actions="actions" @submitForm="submitForm">
      <nps-item slot="nps" />
    </basics-form>
    <el-table
      :data="itemList"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        label="选项"
      />
      <el-table-column
        label="分值提示"
        min-width="180"
      >
        <template slot-scope="scope">
          <el-input
            :key="scope.row.key"
            v-model="scope.row.alert"
            placeholder="请输入"
            style="width: 80%"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="跳转到"
        min-width="200"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.redirectType" :disabled="!$route.query.surveyId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        v-if="$route.query.surveyId"
        label="选项"
        min-width="200"
      >
        <template slot-scope="scope">
          <el-select v-show="scope.row.redirectType===1" v-model="scope.row.redirectId" placeholder="请选择">
            <el-option
              v-for="item in optionsQues"
              :key="item.id"
              :label="item.questionTitle"
              :value="item.id"
            />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import forms, { actions } from './forms'
import BasicsForm from '@/components/BasicsForm'
import NpsItem from '../NpsItem'
import { backend } from '@/api/questionnaire/index'

export default {
  components: {
    BasicsForm,
    NpsItem
  },
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      optionsQues: [],
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
      itemList: [
        {
          score: 1,
          alert: '',
          order: 0,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 2,
          alert: '',
          order: 1,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 3,
          alert: '',
          order: 2,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 4,
          alert: '',
          order: 3,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 5,
          alert: '',
          order: 4,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 6,
          alert: '',
          order: 5,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 7,
          alert: '',
          order: 6,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 8,
          alert: '',
          order: 7,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 9,
          alert: '',
          order: 8,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 10,
          alert: '',
          order: 9,
          redirectType: 0,
          redirectId: 0
        }],
      actions: actions({ cancel: this.cancel })
    }
  },

  computed: {
    ...mapGetters(['loadings']),
    title() {
      return this.survey ? '编辑NPS' : '添加NPS'
    }
  },

  watch: {
    // 编辑回显
    visible(val) {
      // debugger

      if (!val || !this.survey) {
        const num = this.$parent.currentHandleIndex === null ? this.$parent.list.length : this.$parent.currentHandleIndex
        this.backend(num)
        return
      }
      // format data
      // debugger
      const { required } = this.survey
      const item = {
        ...this.survey,
        show: !!this.survey.show,
        required: +required === 1
      }
      // this.$set(this.itemList, 0, this.survey.nps_notes)
      this.itemList = this.survey.nps_notes || this.survey.nps_note
      // this.itemList.forEach(item => {
      //   item.redirectId = 0
      // })
      // console.log('this.itemList', this.itemList)
      this.backend()
      // this.$refs.form && this.$refs.form.recoveryForm(item)
      setTimeout(() => {
        console.log(this.$refs.form, 'this.$refs.form')
        this.$refs.form && this.$refs.form.recoveryForm(item)
      }, 500)
    }
  },

  methods: {
    cancel() {
      this.visible = false
      this.itemList = [
        {
          score: 1,
          alert: '',
          order: 0,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 2,
          alert: '',
          order: 1,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 3,
          alert: '',
          order: 2,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 4,
          alert: '',
          order: 3,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 5,
          alert: '',
          order: 4,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 6,
          alert: '',
          order: 5,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 7,
          alert: '',
          order: 6,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 8,
          alert: '',
          order: 7,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 9,
          alert: '',
          order: 8,
          redirectType: 0,
          redirectId: 0
        },
        {
          score: 10,
          alert: '',
          order: 9,
          redirectType: 0,
          redirectId: 0
        }]
      this.$refs.form.resetFields()
    },
    backend(val) {
      console.log('this.survey: ', this.survey)
      if (!this.$route.query.surveyId) {
        return
      }
      let num = this.survey && this.survey.order

      if (val) {
        num = val
      }
      backend({ surveyId: this.$route.query.surveyId, order: num }).then(res => {
        this.optionsQues = res.data
      })
    },
    submitForm(val) {
      if (!val) return
      const { required } = val
      const item = {
        type: 'surveyNps',
        ...val,
        required: required ? 1 : 0
      }
      let flag = true
      // debugger
      this.itemList.forEach(noteval => {
        if (noteval.redirectType === 1 && !noteval.redirectId) {
          flag = false
        }
      })
      if (!flag) {
        this.$message.error('请选择跳转到哪个题目')
        return
      }
      item.nps_note = this.itemList
      if (this.survey) {
        item.surveyQuestionId = this.survey.surveyQuestionId
        item.id = this.survey.id
        item.order = this.survey.order
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
