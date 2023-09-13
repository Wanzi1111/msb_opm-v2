<!--
 * @Descripttion: 新增单选题 & 多选题 弹框
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-28 16:53:07
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-10 14:17:49
-->
<template>
  <el-dialog :title="typeTitle" :visible.sync="visible" class="create-dialog" :show-close="false">
    <el-form ref="createForm" :inline="true" :model="form">
      <el-form-item label="" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-radio-group v-model="form.column">
        <el-radio-button label="1">单列</el-radio-button>
        <el-radio-button label="2">2列</el-radio-button>
        <el-radio-button label="3">3列</el-radio-button>
      </el-radio-group>
      <el-form-item prop="required">
        <el-checkbox v-model="form.required">必答</el-checkbox>
      </el-form-item>
      <!-- <el-form-item prop="required">
        <el-checkbox v-model="form.isRouter">按选项跳转</el-checkbox>
      </el-form-item> -->
      <el-form-item prop="required">
        <el-checkbox v-model="form.show">是否展示</el-checkbox>
      </el-form-item>
      <el-form-item v-if="surveyType !== 'surveyRadio'" prop="required" label="默认答题上限">
        <el-input-number v-model="form.max" :min="0" />
        <!-- <el-input v-model="form.max" type="number" /></el-form-item> -->
      </el-form-item></el-form>
    <el-table
      :data="itemList"
      style="width: 100%"
    >
      <el-table-column
        label="选项"
        min-width="180"
      >
        <template slot-scope="scope">
          <el-input
            :key="scope.row.key"
            v-model="scope.row.item"
            placeholder="请输入"
            style="width: 80%"
          />
          <i class="el-icon-delete" @click="handleDelete(scope.$index)" />
        </template>
      </el-table-column>
      <el-table-column
        label="允许填空"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.fill" />
        </template>
      </el-table-column>
      <el-table-column
        label="是否展示"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.show" />
        </template>
      </el-table-column>
      <!-- <el-table-column
        v-if="surveyType === 'surveyCheckbox' && $route.query.surveyId"
        label="默认"
        width="100"
      >
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.empty" />
        </template>
      </el-table-column> -->
      <el-table-column
        label="排序"
        width="120"
      >
        <template slot-scope="scope">
          <i class="el-icon-top" @click="handleSort(scope, 'up')" />
          <i class="el-icon-bottom" @click="handleSort(scope, 'down')" />
        </template>
      </el-table-column>
      <el-table-column
        label="是否随机"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.random" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="surveyType === 'surveyRadio'"
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
        v-if="surveyType === 'surveyRadio' && $route.query.surveyId"
        label="选项"
        min-width="200"
      >
        <template v-if="scope.row.redirectType===1" slot-scope="scope">
          <el-select v-model="scope.row.redirectId" placeholder="请选择">
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
    <div class="add-item">
      <p @click="handleAddItem">
        <i class="el-icon-plus" /> 添加单选项
      </p>
    </div>
    <div slot="footer" class="d-flex justify-end">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { backend } from '@/api/questionnaire/index'

export default {
  components: {},
  props: {
    // 类型：surveyRadio， surveyCheckbox
    surveyType: {
      type: String,
      default: 'surveyRadio'
    },
    // 编辑时回显的内容
    survey: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      visible: false,
      optionsQues: [],
      form: {
        title: '',
        required: true,
        isRouter: true,
        show: true,
        column: 1,
        max: 4
      },
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
          item: '',
          empty: false,
          fill: false,
          show: true,
          order: 0,
          random: 0,
          redirectType: 0,
          redirectId: 0
        },
        {
          item: '',
          empty: false,
          fill: false,
          show: true,
          order: 1,
          random: 0,
          redirectType: 0,
          redirectId: 0
        },
        {
          item: '',
          empty: false,
          fill: false,
          show: true,
          order: 2,
          random: 0,
          redirectType: 0,
          redirectId: 0
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    typeTitle() {
      return this.surveyType === 'surveyRadio' ? (this.survey ? '编辑单选题' : '添加单选题') : (this.survey ? '编辑多选题' : '添加多选题')
    }
  },
  watch: {
    // 编辑回显 数据
    visible(val) {
      console.log('this.$parent: ', this.$parent.currentHandleIndex)
      if (!val || !this.survey) {
        const num = this.$parent.currentHandleIndex === null ? this.$parent.list.length : this.$parent.currentHandleIndex
        this.backend(num)
        return
      }
      const { title, type, required, option = [], column, max, show } = this.survey
      if (type === 'surveyRadio') {
        this.backend()
        this.form = { title, required: required === 1, column, max, show: !!show }
        // debugger
        this.itemList = option.map(opt => {
          return { item: opt.name, random: !!opt.isRandom, redirectId: opt.redirectId ? opt.redirectId : '', show: !!opt.show, fill: !!opt.fill, redirectType: opt.redirectType, id: opt.id }
        })
      }
      // { "title":"第一个多选", "required":0, "order":2, "option":[ "问题1#0", "问21#1" ] }
      if (type === 'surveyCheckbox') {
        // debugger
        this.form = { title, required: required === 1, column, max, show: !!show }
        this.itemList = option.map(opt => {
          // const flag = opt.split('#')
          // const item = flag && flag[0]
          const item = opt.name
          // const empty = !(flag && flag[1] === '0')
          const empty = opt.required
          const fill = !!opt.fill
          const show = !!opt.show
          return { item, empty, fill, show, random: !!opt.isRandom, id: opt.id }
        })
      }
    }
  },
  created() {
    this.backend()
  },
  methods: {
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
    handleAddItem() {
      // debugger
      this.itemList.push({
        item: '',
        empty: false,
        fill: false,
        show: true,
        order: this.itemList.length,
        redirectType: 0,
        redirectId: 0
      })
    },

    // sort 排序
    handleSort(scope, type = 'up') {
      const { $index, row } = scope
      let newIndex
      if (type === 'up') {
        if ($index === 0) return
        newIndex = $index - 1
      }
      if (type === 'down') {
        if ($index === this.itemList.length - 1) return
        newIndex = $index + 1
      }
      this.itemList.splice($index, 1)
      this.itemList.splice(newIndex, 0, row)
      this.itemList.forEach((item, index) => {
        item.order = index
      })
    },

    handleDelete(index) {
      if (this.survey) {
        this.$message.warning('编辑问卷不能删除')
        return
      }
      this.itemList.splice(index, 1)
    },

    reset() {
      console.log(this.$refs)

      this.$refs.createForm.resetFields()
      this.form.required = true
      this.form = {
        title: '',
        required: true,
        isRouter: true,
        show: true,
        column: 1,
        max: 4
      }
      // this.itemList = [
      //   {
      //     item: '',
      //     empty: false
      //   },
      //   {
      //     item: '',
      //     empty: false
      //   },
      //   {
      //     item: '',
      //     empty: false
      //   }
      // ]
      this.itemList = [
        {
          item: '',
          empty: false,
          fill: false,
          show: true,
          order: 0,
          redirectType: 0,
          redirectId: 0,
          random: 0
        },
        {
          item: '',
          empty: false,
          fill: false,
          show: true,
          order: 1,
          redirectType: 0,
          redirectId: 0,
          random: 0
        },
        {
          item: '',
          empty: false,
          fill: false,
          show: true,
          order: 2,
          redirectType: 0,
          redirectId: 0,
          random: 0
        }
      ]
      this.visible = false
    },

    cancel() {
      console.log('cancel')
      this.reset()
    },
    submitForm() {
      console.log(this.itemList)
      if (!this.form.title) {
        this.$message.error('请输入标题')
        return
      }
      if (this.itemList.length === 0) {
        this.$message.error('请添加选项')
        return
      }
      let isEmpty = false
      let emptyIndex = 0
      const option = []
      // debugger
      for (let index = 0; index < this.itemList.length; index++) {
        const { item, fill, show, order, id, redirectType, redirectId, random } = this.itemList[index]
        if (!item) {
          isEmpty = true
          emptyIndex = index
          break
        }
        const isRandom = random
        if (this.surveyType === 'surveyRadio') {
          // 单选
          // option.push(item)
          option.push({
            name: item,
            fill, show, order, redirectType,
            redirectId, random, isRandom
          })
          // debugger
          if (this.survey) {
            option[index].id = id
          }
        } else {
          // 多选  "option":[ "问题1#0", "问21#1" ]

          option.push({
            name: item,
            fill, show, order, random, isRandom
          })
          // debugger
          if (this.survey) {
            option[index].id = id
          }
          // option.push(`${item}#${empty ? 1 : 0}`)
        }
      }
      if (isEmpty) {
        this.$message.error(`请输入选项: 第${emptyIndex + 1}项`)
        return
      }
      const { title, required, column, show, max } = this.form
      const surveyItem = Object.assign({ type: this.surveyType }, { title, column, show: show ? 1 : 0, required: required ? 1 : 0, max }, { option })
      if (this.survey) {
        surveyItem.surveyQuestionId = this.survey.surveyQuestionId
      }
      this.$emit('surveyRadio', surveyItem || {})
      console.log(surveyItem)
      this.reset()
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
  ::v-deep .el-form-item {
    margin-bottom: 10px;
  }
  ::v-deep .el-button {
      width: 80px;
  }
  ::v-deep .el-table{
  .el-icon-top, .el-icon-bottom{
    display: inline-block;
    margin: 0 5px;
    line-height: 24px;
    width: 24px;
    height: 24px;
    border-radius: 24px;
    border: 1px solid #ddd;
    text-align: center;
    cursor: pointer;
  }
}

  .add-item{
    color: #1890ff;
    cursor: pointer;
    p{
      float: left;
    }
  }
}
</style>

