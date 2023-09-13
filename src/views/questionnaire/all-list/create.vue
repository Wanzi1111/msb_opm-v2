<!--
 * @Descripttion: 创建问卷
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-27 11:43:06
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-10 14:03:09
-->
<template>
  <div class="app-container create">
    <div class="header d-flex justify-b a-center">
      <p><i class="back el-icon-back" @click="onBack" />{{ surveyTypeText }} | {{ survey.surveyTitle || '这里添加标题' }}</p>
      <basics-action :actions="act" />
    </div>

    <div class="container">
      <!-- 标题 -->
      <h3 @click="handleCreateTitle">{{ survey.surveyTitle || '这里添加标题' }}</h3>

      <!-- 描述 -->
      <div class="desc" @click="handleCreateDesc">
        {{ survey.surveyDesc || '添加问卷描述（选填）' }}
      </div>

      <!-- 问题列表 -->
      <div class="list">
        <draggable
          v-model="list"
          @start="drag = true"
          @end="handleDrag(list)"
        >
          <div v-for="(item, index) in list" :key="index" style="position:relative" @click.stop.prevent="handleShowSection(item, index)" @dblclick.prevent="handleEdit(item, index)">
            <!-- radio -->
            <div v-if="item.type === 'surveyRadio'">
              <div class="item">
                <h4>{{ index + 1 }}. {{ item.title }}</h4>
                <div class="item-content">
                  <el-radio v-for="(opt, idx) in item.option" :key="idx" :label="opt.name" />
                </div>
              </div>
              <el-button v-if="list.length > 0" class="but-del" size="small" icon="el-icon-delete" @click="handelDelete(item, index)">删除</el-button>
              <handle-create-section v-if="currentHandleIndex === index" :list="list" @type="handleCreate" />
            </div>
            <!-- checkbox -->
            <div v-if="item.type === 'surveyCheckbox'">
              <div class="item">
                <h4>{{ index + 1 }}. {{ item.title }}</h4>
                <div class="item-content">
                  <ol>
                    <li v-for="(opt, idx) in item.option" :key="idx">
                      <el-checkbox :label="opt.name" />
                      <!-- <el-checkbox :label="opt && opt.split('#')[0]" /> -->
                    </li>
                  </ol>
                </div>
              </div>
              <el-button v-if="list.length > 0" class="but-del" size="small" icon="el-icon-delete" @click="handelDelete(item, index)">删除</el-button>
              <handle-create-section v-if="currentHandleIndex === index" :list="list" @type="handleCreate" />
            </div>
            <!-- 简答题 -->
            <div v-if="item.type === 'surveyFillBlank'">
              <div class="item">
                <h4>{{ index + 1 }}. {{ item.title }}</h4>
                <div class="item-content">
                  <div class="textarea">
                    <el-input type="textarea" show-word-limit :minlength="item.textMinWords" :maxlength="item.textMaxWords" :rows="item.textRowHeight" :placeholder="item.textDefaultNote || '请输入'" />
                  </div>
                </div>
              </div>
              <el-button v-if="list.length > 0" class="but-del" size="small" icon="el-icon-delete" @click="handelDelete(item, index)">删除</el-button>
              <handle-create-section v-if="currentHandleIndex === index" :list="list" @type="handleCreate" />
            </div>
            <!-- score 评分 -->
            <div v-if="item.type === 'surveyScore'">
              <div class="item">
                <h4>{{ index + 1 }}. {{ item.title }}</h4>
                <div class="item-content">
                  <!-- 星星样式 star -->
                  <div v-if="item.scoreStyle === 0" class="rate star d-flex a-center">
                    <span v-if="item.scoreShow" style="margin-right: 10px">{{ item.scoreNote && item.scoreNote[0] }}</span>
                    <el-rate :value="3" />
                    <span v-if="item.scoreShow">{{ item.scoreNote && item.scoreNote[1] }}</span>
                  </div>
                  <!-- 分数样式 -->
                  <div v-else class="rate d-flex a-center">
                    <span v-if="item.scoreShow">{{ item.scoreNote && item.scoreNote[0] }}</span>
                    <el-radio-group size="small" style="margin:0 10px">
                      <el-radio-button label="1分" />
                      <el-radio-button label="2分" />
                      <el-radio-button label="3分" />
                      <el-radio-button label="4分" />
                      <el-radio-button label="5分" />
                    </el-radio-group>
                    <span v-if="item.scoreShow">{{ item.scoreNote && item.scoreNote[1] }}</span>
                  </div>
                </div>
              </div>
              <el-button v-if="list.length > 0" class="but-del" size="small" icon="el-icon-delete" @click="handelDelete(item, index)">删除</el-button>
              <handle-create-section v-if="currentHandleIndex === index" :list="list" @type="handleCreate" />
            </div>
            <!-- NPS -->
            <div v-if="item.type === 'surveyNps'">
              <div class="item">
                <h4>{{ index + 1 }}. {{ item.title }}</h4>
                <div class="item-content">
                  <nps-item />
                </div>
              </div>
              <el-button v-if="list.length > 0" class="but-del" size="small" icon="el-icon-delete" @click="handelDelete(item, index)">删除</el-button>
              <handle-create-section v-if="currentHandleIndex === index" :list="list" @type="handleCreate" />
            </div>
          </div>
        </draggable>

        <!-- 操作 -->
        <handle-create-section v-if="list.length === 0 || currentHandleIndex === null" :list="list" @type="handleCreate" />

      </div>
    </div>

    <create-title ref="createTitle" :survey="survey" @title="handleGgetTitle" />
    <create-desc ref="createDesc" :title="survey && survey.surveyTitle" @desc="handleGetDesc" />
    <!-- 添加单选题 -->
    <create-radio-type ref="surveyRadio" :survey="currentHandleEditItem" @surveyRadio="getSurveyAdd" />
    <!-- 添加多选题 -->
    <create-radio-type ref="surveyCheckbox" survey-type="surveyCheckbox" :survey="currentHandleEditItem" @surveyRadio="getSurveyAdd" />
    <!-- 简答题 -->
    <create-fill-blank-type ref="surveyFillBlank" survey-type="surveyFillBlank" :survey="currentHandleEditItem" @result="getSurveyAdd" />
    <!-- 评分题 -->
    <create-score-type ref="surveyScore" survey-type="surveyScore" :survey="currentHandleEditItem" @result="getSurveyAdd" />
    <!-- NPS -->
    <create-nps-type ref="surveyNps" survey-type="surveyNps" :survey="currentHandleEditItem" @result="getSurveyAdd" />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import { createSurvey, getSurveyDetail, updateSurvey } from '@/api/questionnaire'
import { getToken } from '@/utils/auth'
import CreateTitle from './components/CreateTitle'
import CreateDesc from './components/CreateDesc'
import CreateRadioType from './components/CreateRadioType/index'
import CreateFillBlankType from './components/CreateFillBlankType/index'
import CreateScoreType from './components/CreateScoreType/index'
import CreateNpsType from './components/CreateNpsType/index'
import HandleCreateSection from './components/HandleCreateSection'
import NpsItem from './components/NpsItem'
import { default as act } from './actions/create'
export default {
  name: 'CreateQuestionnaire',
  components: {
    draggable,
    CreateTitle,
    CreateDesc,
    CreateRadioType,
    CreateFillBlankType,
    CreateScoreType,
    CreateNpsType,
    HandleCreateSection,
    NpsItem
  },
  data() {
    return {
      act: act({ add: this.handleSave }),
      survey: {
        surveyBizLineCode: '',
        surveyTypeCode: '',
        surveyTitle: '',
        surveyDesc: ''
      },
      npsOrder: 1,
      list: [],
      currentHandleItem: null,
      currentHandleIndex: null,
      currentHandleEditItem: null,
      currentHandleEditIndex: null,
      listCopy: [],
      timer: null,
      quesStatus: '',
      delSurveyQuestionIds: [],
      // 编辑问卷
      surveyId: '',
      surveyTypeMap: {
        1: 'surveyRadio',
        2: 'surveyCheckbox',
        3: 'surveyFillBlank',
        4: 'surveyScore',
        5: 'surveyNps'
      }
    }
  },
  computed: {
    ...mapGetters(['bizLine']),
    // surveyTypeCode() {
    //   return this.bizLine.surveyType || {}
    // },
    surveyTypeText() {
      if (this.bizLine && this.bizLine.surveyType && this.survey.surveyTypeCode) {
        return this.bizLine.surveyType[this.survey.surveyTypeCode]
      }
      return '普通问卷'
    }
  },
  created() {
    this.getBizLineConfig()
    const { surveyId } = this.$route.query
    // 编辑，获取问卷信息
    if (surveyId) {
      this.surveyId = surveyId
      this.getSurveyDetail()
    }
  },
  methods: {
    ...mapActions('app', ['getBizLineConfig']),
    handleCreateTitle() {
      this.$refs.createTitle.visible = true
    },
    handleGgetTitle(res = {}) {
      console.log(res, 'get title')
      Object.assign(this.survey, res || {})
    },
    handleCreateDesc() {
      if (!this.survey.surveyTitle) {
        this.$message.error('请先添加标题')
        return
      }
      this.$refs.createDesc.visible = true
    },
    handleGetDesc(res) {
      Object.assign(this.survey, res || {})
    },

    /**
     * 创建问题
     * @type: surveyRadio, surveyCheckbox, surveyFillBlank, surveyScore, surveyNps
     */
    handleCreate(type = 'surveyRadio') {
      if (!type) return
      this.surveyType = type
      this.$refs[type].visible = true
      this.currentHandleEditItem = null
      this.currentHandleEditIndex = null
    },

    // 删除问题
    handelDelete(item, indexDel) {
      // 如果没有选项删除一项，默认最后一项
      this.$alert('确定删除吗？，删除成功后需要重新配置跳转逻辑', '删除', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'cancel') {
            return
          }
          this.currentHandleItem = item
          this.currentHandleIndex = indexDel
          const { currentHandleIndex } = this
          const index = currentHandleIndex === null ? this.list.length - 1 : currentHandleIndex
          if (+this.quesStatus.surveyStatus === 1 && !this.list[index].isSurvey) {
            this.$message.error('进行中问卷不能删除')
            return
          }
          if (+this.quesStatus.surveyStatus === 0) {
            this.delSurveyQuestionIds.push(this.list[index].surveyQuestionId)
          }

          this.list.splice(index, 1)
          this.currentHandleIndex = null
          this.currentHandleItem = null
        }
      })
    },

    // 确定新增 回调
    getSurveyAdd(res) {
      console.log(res, 'add survey')
      if (!res) return
      // 如果是编辑
      // debugger
      if (this.currentHandleEditItem) {
        this.list.splice(this.currentHandleEditIndex, 1, res)
        return
      }

      // 如果是在指定位置（选中项）新增，插入到后面
      if (this.currentHandleIndex !== null && this.currentHandleIndex < this.list.length - 1) {
        res.isSurvey = true
        this.list.splice(this.currentHandleEditIndex - 1 || 0, 0, res)
        this.currentHandleIndex = null
        return
      }
      // 新增
      // res.order = this.npsOrder++
      // res.order = this.npsOrder++
      res.order = this.currentHandleIndex
      this.list.push(res)
    },

    // 显示操作项 - 单击
    handleShowSection(item, index) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        if (this.currentHandleIndex === index) return
        console.log(item, 'handleShowSection')
        this.currentHandleItem = item
        this.currentHandleIndex = index
      }, 300)
    },

    // 编辑 - 双击
    handleEdit(item, index = null) {
      console.log(item, 'edit')
      this.currentHandleEditItem = item
      this.currentHandleEditIndex = index
      // this.handleCreate(item.type)
      const { type } = item
      this.surveyType = type
      this.$refs[type].visible = true
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },

    // 拖动排序
    handleDrag(data) {
      console.log(data, 'handleDrag')
      console.log(this.quesStatus, 'handleDrag22')

      data.forEach(item => {
        // this.listCopy.forEach(val => {
        // eslint-disable-next-line no-empty
        // if (item.surveyQuestionId === val.surveyQuestionId) {
        if (item.type === 'surveyNps') {
          // debugger
          const nps = item.nps_note || item.nps_notes || []
          nps.forEach(val => {
            // if (val.redirectId !== 0 || val.redirectType) {
            //   // debugger
            val.redirectId = 0
            val.redirectType = 0
            // }
          })
        }

        // if (item.type === 'surveyRadio') {
        //   item.option = val.option
        // }
        // }
        // })
      })
      this.list = data
    },

    // 保存问卷
    handleSave() {
      console.log('save')
      const cid = getToken('userId')
      console.log(cid, 'cid')
      const { surveyTitle, surveyTypeCode, surveyBizLineCode, surveyDesc } = this.survey
      const { list = [] } = this
      if (!surveyTitle) {
        this.$message.error('请先添加标题')
        return
      }
      if (list.length === 0) {
        this.$message.error('请添加问题')
        return
      }
      // 组装数据
      const params = {
        surveyTitle,
        surveyTypeCode: Number(surveyTypeCode),
        surveyBizLineCode: Number(surveyBizLineCode),
        surveyDesc,
        cid: Number(cid)
      }
      // 问题
      const req = {}
      list.forEach((item, index) => {
        const { type } = item
        Object.assign(item, { order: index })
        if (Object.keys(req).includes(type)) {
          req[type].push(item)
        } else {
          req[type] = [item]
        }
        // delete item.type
      })
      Object.assign(params, { ...req })
      console.log(params)
      params.delSurveyQuestionIds = this.delSurveyQuestionIds
      // 编辑问卷
      if (this.surveyId) {
        Object.assign(params, { surveyId: this.surveyId })
        updateSurvey(params).then(res => {
          if (res && res.status === 0) {
            this.$message.success('编辑成功！')
            setTimeout(() => {
              this.$router.push({ name: 'QuestionnaireList' })
            }, 1000)
          }
        })
        return
      }
      // 创建问卷
      createSurvey(params).then(res => {
        if (res && res.status === 0) {
          this.$message.success('问卷创建成功！')
          setTimeout(() => {
            this.$router.push({ name: 'QuestionnaireList' })
          }, 1000)
        }
      })
    },

    /**
     * 编辑问卷
     */
    getSurveyDetail() {
      if (this.surveyId) {
        const { surveyId } = this
        getSurveyDetail({ surveyId }).then(res => {
          console.log(res, 'detail')
          this.quesStatus = res.data
          // 组装数据
          if (res && res.status === 0 && res.data) {
            const {
              bizLine,
              surveyType,
              surveyTitle = '',
              surveyDesc = '',
              surveyQuestionList = []
            } = res.data

            Object.assign(this.survey, {
              surveyBizLineCode: bizLine,
              surveyTypeCode: surveyType,
              surveyTitle,
              surveyDesc
            })
            // 组合数据并按 order 排序

            const list = surveyQuestionList.map(item => {
              const obj = {}
              const { surveyTypeMap } = this
              const {
                questionType,
                questionTitle,
                questionOrder,
                questionRequired,
                questionCheckboxList,
                questionFillBlankList,
                questionNpsList,
                questionRadioList,
                questionScoreList,
                id,
                questionMaxAnswer,
                questionColumn,
                questionShow
              } = item
              Object.assign(obj, {
                type: surveyTypeMap[questionType] || '',
                title: questionTitle,
                order: questionOrder,
                required: questionRequired || 0,
                surveyQuestionId: id || '',
                column: questionColumn,
                max: questionMaxAnswer,
                show: questionShow
              })
              if (+questionType === 1) {
                // debugger
                // const option = questionRadioList.map(opt => opt.optionName)
                const option = questionRadioList.map(opt => {
                  return {
                    name: opt.optionName,
                    order: opt.radioOrder,
                    show: opt.optionShow,
                    fill: opt.allowFill,
                    id: opt.id,
                    redirectId: opt.redirectId,
                    redirectType: opt.redirectType,
                    isRandom: opt.isRandom
                  }
                })
                //  option.push({
                //     name: opt.optionName,
                //     order: opt.radioOrder,
                //     show: opt.optionShow,
                //     fill: opt.allowFill
                //   })
                Object.assign(obj, { option })
              }
              if (+questionType === 2) {
                // const option = questionCheckboxList.map(opt => `${opt.optionName}#${opt.checkboxRequired}`)
                const option = questionCheckboxList.map(opt => {
                  return {
                    name: opt.optionName,
                    order: opt.checkboxOrder,
                    show: opt.optionShow,
                    fill: opt.allowFill,
                    id: opt.id,
                    isRandom: opt.isRandom
                  }
                })
                Object.assign(obj, { option })
              }
              if (+questionType === 3) {
                const fillBlank = questionFillBlankList[0]
                Object.assign(obj, { ...fillBlank, show: questionShow })
              }
              if (+questionType === 4) {
                const score = questionScoreList[0]
                Object.assign(obj, { ...score, scoreNote: JSON.parse(score.scoreNote), show: questionShow })
              }
              if (+questionType === 5) {
                // const option = questionNpsList.map(val => {
                //   return {

                //   }
                // })
                Object.assign(obj, { nps_notes: JSON.parse(questionNpsList[0].npsNote), id: questionNpsList[0].id, surveyQuestionId: questionNpsList[0].surveyQuestionId })
              }
              // if (+questionType === 5) {
              //   const score = questionScoreList[0]
              //   Object.assign(obj, { order:  })
              // }
              // debugger
              console.log(obj)
              return obj
            })
            // TODO: 根据 order 对数组 list 排序
            this.list = list
            this.listCopy = JSON.parse(JSON.stringify(this.list))
          }
        })
      }
    },

    onBack() {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .create{
    p, h4{
      margin: 0;
    }
    .header{
      margin-top: -10px;
      border-bottom: 1px solid #eee;
      .back {
        padding-right: 10px;
        cursor: pointer;
        font-size: 22px;
        color: #333333;
        vertical-align: middle;
        &:hover {
          color: #1890ff;
        }
      }
    }
    .container{
      h3{
        text-align: center;
        font-size: 24px;
      }
      .desc{
        padding: 10px 20px;
        border-bottom: 1px solid #eee;
      }
      .list{
        margin: 15px -20px -20px;
        padding: 15px 0;
        background-color: #f2f2f2;
      }
      .but-del {
        position: absolute;
        top: 3px;
        right: 3px;
      }
      .item{
        margin-bottom: 15px;
        padding: 20px;
        border-radius: 6px;
        background-color: #fff;
        // box-shadow: 0 4px 6px 2px rgba($color: #000000, $alpha: .1);
        &-content{
          padding-left: 20px;
        }
        h4{
          margin-bottom: 15px;
        }
        ul, ol{
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li{
          line-height: 26px;
        }
        .textarea{
          max-width: 70%;
        }
        .rate{
          span{
            font-size: 14px;
            color: #606266;
          }
          ::v-deep {
            .el-rate__icon{
              font-size: 22px;
            }
          }
        }
      }
    }
  }
</style>
