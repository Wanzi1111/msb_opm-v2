<template>
  <div class="sortButton">
    <el-button v-loading="loadings._k8s_api_poster_api_v1_recommend_poster_setPosterSort" icon="el-icon-arrow-up" type="primary" plain @click="handlerUp" />
    <el-button v-loading="loadings._k8s_api_poster_api_v1_recommend_poster_setPosterSort" icon="el-icon-arrow-down" type="success" plain @click="handlerDown" />
  </div>
</template>
<script>
import { setPosterSort } from '@/api/operate/poster-controller'
import { mapGetters } from 'vuex'
export default {
  name: 'SortButton',
  props: {
    row: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      // 转介绍海报 新增字段
      line: '1',
      paylodBusin: [
        { name: 'onebyone', label: '美术宝1对1' },
        { name: 'art', label: '小熊艺术' }
      ],

      poster_id: '',
      paylodPos: [
        { name: '1', label: '海报中心' },
        { name: '2', label: '周周有礼' },
        { name: '3', label: '试听活动' }
      ],
      sub_line: '10',
      linePayload: {}
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  methods: {
    async handlerUp() {
      const { posterId: poster_id, id } = this.row
      const params = {
        poster_id,
        id,
        type: 'up',
        num: 1
      }
      const result = await setPosterSort(params)
      if (result.code === 0) {
        this.$nextTick(() => {
          this.$bus.$emit('busGetList', poster_id)
        })
      }
    },
    async handlerDown() {
      const { posterId: poster_id, id } = this.row
      const params = {
        poster_id,
        id,
        type: 'down',
        num: 1
      }
      const result = await setPosterSort(params)
      if (result.code === 0) {
        this.$nextTick(() => {
          this.$bus.$emit('busGetList', poster_id)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
