<template>
  <div class="basics-statics-wrap">
    <div v-if="type === 'text'">
      <span>{{ text }}</span>
    </div>
    <div v-if="type === 'slot'">
      <template>
        <slot />
      </template>
    </div>
    <div v-if="actions">
      <basics-action :actions="actions" />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'BasicsStatics',
  // components: {},
  props: {
    type: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    actions: {
      type: Array,
      default: () => ([])
    }
  }
  // data() {
  //   return {

  //   }
  // },
  // computed: {
  //   ...mapGetters(['loadings'])
  // },
  // watch: {},
  // mounted() {},
  // methods: {}
}
</script>

<style lang='scss' scoped>
.basics-statics-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  // line-height: 36px;
  font-size: 13px;
  border-left: 3px solid #97a8be;
  padding-left: 10px;
  margin: 5px 0;
}
</style>
