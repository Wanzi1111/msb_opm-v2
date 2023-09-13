<!--
 * @Descripttion: table-item
 * @version: 1.0.0
 * @Author:  zhangjianwen
 * @Date: 2020-11-25 18:12:53
 * @LastEditors: zhangjianwen
 * @LastEditTime: 2020-12-10 15:52:22
-->
<template>
  <div class="q-item">
    <el-table :data="tabledata" border show-summary style="width: 100%">
      <el-table-column type="index" label="序号" width="180" />
      <el-table-column prop="optionName" label="选项">
        <template slot-scope="scope">
          {{ scope.row.optionName || scope.row.scoreOption }}
        </template>
      </el-table-column>
      <el-table-column
        prop="answerCount"
        sortable
        label="总计"
      ><template slot-scope="scope">
        {{ scope.row.answerCount || scope.row.scoreCount }}
      </template>
      </el-table-column>
      <!-- <el-table-column prop="amount2" sortable label="有效">
          </el-table-column> -->
      <el-table-column prop="amount3" sortable label="比例">
        <template slot-scope="scope">
          <el-progress
            :percentage="
              scope.row.answerCount
                ? +((scope.row.answerCount / total) * 100).toFixed(2)
                : scope.row.scoreCount
                  ? +((scope.row.scoreCount / total) * 100).toFixed(2)
                  : 0
            "
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tabledata: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {}
  },
  computed: {},
  created() {
    console.log(this.tabledata, this.total)
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
