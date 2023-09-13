<!--
 * @Descripttion: 创建问题操作区
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-12-01 20:55:56
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-12-02 15:14:25
-->
<template>
  <!-- 操作 -->
  <div class="handle-section">
    <el-button size="small" icon="el-icon-plus" @click="handleCreate()">添加单选题</el-button>
    <el-button size="small" icon="el-icon-plus" @click="handleCreate('surveyCheckbox')">添加多选题</el-button>
    <el-button size="small" icon="el-icon-plus" @click="handleCreate('surveyFillBlank')">添加简答题</el-button>
    <el-button size="small" icon="el-icon-plus" @click="handleCreate('surveyScore')">添加评分题</el-button>
    <el-button size="small" icon="el-icon-plus" @click="handleCreate('surveyNps')">添加NPS</el-button>
    <!-- 有题目时显示删除 -->
    <!-- <el-button v-if="list.length > 0" size="small" icon="el-icon-delete" @click="handelDelete">删除</el-button> -->
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    /**
     * 创建问题
     * @type: surveyRadio, surveyCheckbox, surveyFillBlank, surveyScore, surveyNps
     */
    handleCreate(type = 'surveyRadio') {
      if (!type) return
      this.$emit('type', type)
    },

    // 删除
    handelDelete() {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss" scoped>
.handle-section{
    margin-top: -5px;
    margin-bottom: 10px;
}
</style>
