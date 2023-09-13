<template>

  <div>
    <el-row class="search-container">
      <el-col
        v-for="(item, index) in dataSelects"
        :key="index"
        class="search-col"
      >
        <span class="select-title">{{ item.label }}:</span>
        <template v-for="(el) in item.list">
          <el-button :key="el.id" style="width: 120px;margin-bottom: 10px;" :type="item.value == el.value? 'primary': 'plain'" v-bind="item.attr" @click="selectFn(item,el.value)">{{ el.label }}</el-button>
        </template>
      </el-col>

    </el-row>
  </div>

</template>

<script>
export default {
  name: 'BasicsSelect',
  props: {
    // 按钮配置
    selects: {
      default: () => [],
      type: Array
    },
    // 操作按钮配置
    actions: {
      default: () => ({}),
      type: Object
    },
    attr: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      btnList: [],
      dataSelects: []
    }
  },
  watch: {
    selects: 'handleSelectOption'
  },
  created() {
    this.handleSelectOption()
  },
  methods: {
    handleSelectOption() {
      const initSelect = [...this.selects]
      initSelect.forEach(async(item, index) => {
        if (item.getListAsync) {
          const list = await item.getListAsync()
          this.$set(initSelect[index], 'list', list)
        }
        // 如果没有匹配的value默认第一个
        const list = initSelect[index].list
        if (list.findIndex((i) => i === item.value) === -1) {
          this.$set(initSelect[index], 'value', list[0].value)
        }
        //  请使用 defaultVal 设置默认值，之前设置的value不能生效
        const { defaultVal } = initSelect[index]
        if (defaultVal) {
          this.$set(initSelect[index], 'value', list[defaultVal].value)
        }
      })
      this.dataSelects = initSelect
    },
    selectFn(item, value) {
      item.value = value
      this.$set(item, 'value', value)
      // this.$set(this.dataSelects[index], 'list', list)
      item.selectAct(item, value)
    }
  }

}

</script>

<style lang="scss" scoped>
  .search-container {
    margin-right: -10px;

    ::v-deep .el-input__inner {
      line-height: 1;
    }

  }

  .select-title {
    /*display: block;*/
    width: 69px;
    /*height: 36px;*/
    text-align: right;
    margin-right: 16px;
    font-size: 14px;
    color: #606266;
  }

  .search-col {
    /*height: 36px;*/
    margin-bottom: 10px;
  }

</style>
