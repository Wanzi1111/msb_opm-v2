/**
* @author: Liwei
* @description: 公共基础操作条
* @date: 2020/1/11
*/
<template>
  <div class="action-container">
    <template v-for="(item, index) in actionsForm">
      <!-- 下拉菜单操作渲染 -->
      <el-dropdown v-if="item.dropdown" :key="index" :class="actionItemStyle(item)" v-bind="item.dropdownConfig.attr" @click="dropdownCilck(item)" @command="e => dropdownCommand(e, item)">
        <template v-if="!isSplitButton(item)">
          <!--按钮-->
          <el-button v-if="item.type === 'button'" v-bind="item.attr" @click="item.click">{{ item.label }}</el-button>
          <!--a标签按钮-->
          <a v-if="item.type === 'a'" href="javascript:;" v-bind="item.attr" @click="item.click">{{ item.label }}</a>
          <!--a标签链接-->
          <a v-if="item.type === 'link'" v-bind="item.attr">{{ item.label }}</a>
          <!--span标签文本-->
          <span v-if="item.type === 'span'" v-bind="item.attr">{{ item.label }}</span>
          <!--提示信息-->
          <el-alert v-if="item.type === 'alert'" :title="item.label" v-bind="item.attr" />
        </template>
        <template v-else>{{ item.label }}</template>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(dropdownItem, dropdownIndex) in item.dropdownConfig.item" :key="dropdownIndex" v-bind="dropdownItem.attr">{{ dropdownItem.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- render 函数渲染 -->
      <template v-else-if="item.render">
        <custom-render :key="index" :render="(e) => item.render(e, item, index)" />
      </template>

      <!-- slot 插槽 -->
      <slot v-else-if="item.slot" :name="item.slot" :item="item" :$index="index" />

      <!-- 普通操作渲染 -->
      <div v-else :key="index" :class="actionItemStyle(item)">
        <!--按钮-->
        <el-button v-if="item.type === 'button'" v-bind="item.attr" @click="item.click">{{ item.label }}</el-button>
        <!--a标签按钮-->
        <a v-if="item.type === 'a'" href="javascript:;" v-bind="item.attr" @click="item.click">{{ item.label }}</a>
        <!--a标签链接-->
        <a v-if="item.type === 'link'" v-bind="item.attr">{{ item.label }}</a>
        <!--span标签文本-->
        <span v-if="item.type === 'span'" v-bind="item.attr">{{ item.label }}</span>
        <!--提示信息-->
        <el-alert v-if="item.type === 'alert'" :title="item.label" v-bind="item.attr" />
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'BasicsAction',
  components: {
    CustomRender: {
      functional: true,
      render: (createElement, context) => {
        const h = context.props.render(createElement)
        const VNode = createElement('span').constructor
        if (h instanceof VNode) {
          return h
        } else {
          return createElement('span', h)
        }
      }
    }
  },
  props: {
    actions: {
      default: () => [],
      type: Array
    },
    loadings: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      form: {},
      globalHide: false
    }
  },
  created() {
    this.actionsForm = this.actions
  },
  methods: {
    set({ type = '', data = {}}) {
      const { actionsForm } = this
      const sets = name => {
        for (let i = 0; i < actionsForm.length; i++) {
          const item = actionsForm[i]
          if (item.prop in data) {
            if (name === 'label') {
              actionsForm[i].label = data[item.prop]
            } else {
              actionsForm[i][name] = { ...actionsForm[i][name], ...data[item.prop] }
            }
          }
        }
      }
      sets(type)
      // switch (type) {
      //   case 'label':
      //     sets('label')
      //     break
      // }
    },
    actionItemStyle(dat) {
      const style = {
        button: 'action-item',
        a: 'action-item action-item__line',
        link: 'action-item action-item__line',
        span: 'action-item action-item__line',
        alert: 'action-item action-item__line'
      }
      const align = {
        left: 'action-item__left',
        right: 'action-item__right'
      }
      if ('align' in dat && dat.align) {
        return `${style[dat.type]} ${align[dat.align]}`
      }
      return style[dat.type]
    },
    isSplitButton(dat) {
      try {
        return dat.dropdownConfig.attr.splitButton
      } catch (e) {
        return false
      }
    },
    dropdownCilck(dat) {
      try {
        return dat.dropdownConfig.click()
      } catch (e) {
        return () => {
          console.log('not find dropdown click Function!')
        }
      }
    },
    dropdownCommand(e, dat) {
      try {
        return dat.dropdownConfig.command(e)
      } catch (e) {
        return () => {
          console.log('not find dropdown command Function!')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .action-container {
    margin-right: -10px;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .action-item {
    margin-bottom: 10px;
    margin-right: 10px;
    float: left;
    ::v-deep .el-alert {
      min-height: 36px;
      padding: 0 16px 0 8px;
      .el-alert__closebtn {
        top: 14px;
        right: 8px;
      }
      .el-alert__content {
        padding: 2px 8px 0;
        line-height: 0;
      }
    }
    ::v-deep .el-alert--success {
      border: 1px solid #13ce66;;
    }
    ::v-deep .el-alert--info {
      border: 1px solid #909399;;
    }
    ::v-deep .el-alert--warning {
      border: 1px solid #FFBA00;;
    }
    ::v-deep .el-alert--error {
      border: 1px solid #ff4949;;
    }
  }
  .action-item__line {
    min-height: 36px;
    line-height: 36px;
  }
  .action-item__left {
    float: left;
  }
  .action-item__right {
    float: right;
  }
  .el-alert--primary {
    background-color: rgba(23, 144, 255, 0.15);
    color: #1790ff;
    border: 1px solid #1790ff;
    min-height: 36px;
    ::v-deep .el-alert__icon {
      color: #1790ff;
      &:before {
        content: "\e731";
      }
    }
  }
</style>
