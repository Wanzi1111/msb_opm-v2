<template>
  <el-button v-if="iconLayout" :class="label ? '' : 'empty'" v-bind="attr" :loading="loadings[attr.loading]" @click="click">{{ label }}</el-button>
  <el-button v-else :class="label ? '' : 'empty'" v-bind="attr" :loading="loadings[attr.loading]" icon="" @click="click">{{ label }}<i v-if="attr.icon" :class="`${attr.icon} icon-mar`" /></el-button>
</template>

<script>
export default {
  name: 'BasicsButton',
  props: {
    label: {
      type: String,
      default: ''
    },
    click: {
      type: Function,
      default: () => {}
    },
    attr: {
      type: Object,
      default: () => ({})
    },
    loadings: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    iconLayout() {
      const { attr } = this
      console.log('iconLayout-====button compenonte', 'iconLayout' in attr && attr.iconLayout !== 'right')
      return 'iconLayout' in attr && attr.iconLayout !== 'right'
    }
  }
}
</script>

<style lang="scss" scoped>
	.empty {
		::v-deep span {
			margin: 0;
		}
	}
	.icon-mar {
		margin-left: 5px;
	}
</style>
