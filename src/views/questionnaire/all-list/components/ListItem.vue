<!--
 * @Descripttion: 问卷列表项
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-25 18:12:53
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-09 18:02:43
-->
<template>
  <div class="q-item">
    <div class="q-item-header flex a-center justify-b">
      <h3 class="flex-1">
        {{ survey.surveyTypeText }} |
        {{ survey.surveyTitle }}
      </h3>
      <ul class="flex">
        <li>ID: {{ survey.surveyNo }}</li>
        <li><i :class="statusClass" />{{ survey.surveyStatusText }}</li>
        <li>
          答卷: <span class="c-blue">{{ survey.answerNum }}</span>
        </li>
        <li>{{ survey.createTime }}</li>
      </ul>
    </div>
    <div class="q-item-footer flex a-center justify-b">
      <ul class="handle flex">
        <li @click="handleEdit">
          <svg class="svg-class" aria-hidden="true">
            <use xlink:href="#icon-edit" /></svg>编辑问卷
        </li>
        <li @click="handlePubSurvey">
          <svg class="svg-class" aria-hidden="true">
            <use xlink:href="#icon-send" /></svg>问卷发布
        </li>
        <li @click="goStatistics(survey)">
          <svg class="svg-class" aria-hidden="true">
            <use xlink:href="#icon-statistics" /></svg>统计分析
        </li>
      </ul>
      <ul class="flex">
        <li @click="handlePreview">
          <svg class="svg-class" aria-hidden="true">
            <use xlink:href="#icon-eye2" /></svg>预览
        </li>
        <li>
          <el-dropdown @command="handleCommand">
            <span>
              <svg class="svg-class" aria-hidden="true">
                <use xlink:href="#icon-setting" /></svg>设置
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="editTitle">编辑标题</el-dropdown-item>
              <el-dropdown-item command="copy">复制问卷</el-dropdown-item>
              <el-dropdown-item command="delete">删除问卷</el-dropdown-item>
              <el-dropdown-item v-show="survey.surveyStatus===1" v-if="survey.surveyTag === 1" command="stop">暂停问卷</el-dropdown-item>
              <el-dropdown-item v-show="survey.surveyStatus===1" v-else command="stop">取消暂停问卷</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { openBrowserTab } from '@/utils/index'
export default {
  props: {
    survey: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      handleType: '',
      url: `https://test121.meishubao.com/1v1h5pages/activity/questionnaire`
    }
  },
  computed: {
    statusClass() {
      let c = ''
      const { surveyStatus } = this.survey
      if (surveyStatus === 1) {
        c = 'going'
      }
      if (surveyStatus === 0) {
        c = 'unpublished'
      }
      return c
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
      if (command === 'delete') {
        const { surveyStatus, answerNum } = this.survey
        // 已发布或有数据的，不能删除
        if (answerNum > 0) {
          this.$message.error('问卷已存在数据无法删除')
          this.handleCancel()
          return
        }
        if (surveyStatus > 0) {
          this.$message.error('问卷已发布无法删除')
          this.handleCancel()
          return
        }
      }
      if (command === 'editTitle') {
        if (+this.survey.surveyStatus !== 0) {
          this.$message.error('只有未发布问卷可编辑标题')
          return
        }
      }
      if (command === 'stop') {
        // if (+this.survey.surveyStatus !== 0) {
        //   this.$message.error('444')
        //   return
        // }
      }
      this.$emit('handle', { type: command, survey: this.survey })
    },

    /**
     * 发布问卷
     */
    handlePubSurvey() {
      // if (+this.survey.surveyStatus === 2) {
      //   this.$message.error('问卷已结束，不能发布')
      //   return
      // }
      this.$emit('handle', { type: 'pub', survey: this.survey })
    },
    // 跳转统计分析页面
    goStatistics(val) {
      console.log(val)
      this.$router.push({ name: 'StatQuestionnaire', params: { id: val.id }})
    },
    // 预览
    handlePreview() {
      // TODO:区分环境
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
      const path = `${h5Url}1v1h5pages/activity/questionnaire?surveyId=${this.survey.id}&type=preview`
      openBrowserTab(path)
    },

    // 编辑
    handleEdit() {
      // 只未发布的可编辑
      if (+this.survey.surveyStatus !== 0 && +this.survey.surveyStatus !== 1) {
        this.$message.error('只有未发布和进行中问卷可编辑')
        return
      }
      if (+this.survey.surveyTag !== 2 && +this.survey.surveyStatus === 1) {
        this.$message.error('问卷进行中如需编辑，请先暂停问卷')
        return
      }
      this.$router.push({
        name: 'CreateQuestionnaire',
        query: { surveyId: this.survey.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$red: #c26a3e;
$blue: #1890ff;
$gray: #ddd;
.q-item {
  margin-top: 10px;
  padding: 15px 20px;
  border-radius: 6px;
  background-color: #fff;
  color: #999;
  &-header {
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    li {
      margin: 0 0 0 30px;
    }
  }
  &-footer {
    padding-top: 15px;
    li {
      display: flex;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: $blue;
        .svg-class {
          fill: $blue;
        }
      }
    }
    .svg-class {
      width: 20px;
      height: 14px;
      fill: #999;
    }
    ::v-deep {
      .el-dropdown {
        span {
          color: #999;
          &:hover {
            color: $blue;
          }
          .svg-class {
            position: relative;
            top: 2px;
          }
        }
      }
    }
  }
  h3,
  ul {
    margin: 0;
    padding: 0;
  }
  h3 {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    color: #444;
  }
  ul {
    list-style: none;
    li {
      &:last-child {
        margin-right: 0;
      }
      font-size: 14px;
      i {
        margin-right: 3px;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        overflow: hidden;
        background-color: $gray;
        &.going {
          background-color: $blue;
        }
        &.unpublished {
          background-color: $red;
        }
      }
    }
  }
  .flex {
    display: flex;
    &.a-center {
      align-items: center;
    }
    &.justify-b {
      justify-content: space-between;
    }
    .flex-1 {
      flex: 1;
    }
  }
  .c-red {
    color: $red;
  }
  .c-blue {
    color: $blue;
  }
  .c-gray {
    color: $gray;
  }
}
</style>
