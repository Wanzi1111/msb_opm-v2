<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-30 18:24:28
 * @LastEditTime: 2022-04-14 18:51:24
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="basics-description-box">
    <el-descriptions :title="title" :column="column || 3" v-bind="attr">
      <template v-for="v in config">
        <template v-if="v.slot">
          <el-descriptions-item :key="v.key" :label="v.label" :span="v.span || 1">
            <slot :name="v.name" :item="v" />
          </el-descriptions-item>
        </template>
        <template v-else-if="v.render">
          <el-descriptions-item :key="v.key" :label="v.label" :span="v.span || 1">
            <!-- <custom-render :key="index" :render="(e) => v.render(v.value, e)" /> -->
            {{ v.render(v.value, v) }}
          </el-descriptions-item>
        </template>
        <el-descriptions-item v-else :key="v.key" :label="v.label" :span="v.span || 1">{{ v.value }}</el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script>

export default {
  name: 'BasicsDescriptions',
  // components: {
  //   CustomRender: {
  //     functional: true,
  //     render: (context, createElement) => {
  //       const h = context.props.render(createElement)
  //       const VNode = createElement('span').constructor
  //       if (h instanceof VNode) {
  //         return h
  //       } else {
  //         return createElement('span', h)
  //       }
  //     }
  //   }
  // },
  props: {
    title: {
      type: String,
      default: ''
    },
    config: {
      type: Array,
      default: () => ([])
    },
    dataSourse: {
      type: Object,
      default: () => ({})
    },
    column: {
      type: Number,
      default: 3
    },
    size: {
      type: String,
      default: 'medium'
    },
    attr: {
      type: Object,
      default: () => ({
        size: 'small'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.basics-description-box {
  ::v-deep .el-descriptions-item__label {
    font-weight: 500;
  }
}
</style>
