<template>
  <div>
    <div class="title-container">
      <basics-title title="视频审核" line />
    </div>
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="v in businessTabList" :key="v.value" :label="v.label" />
      </el-tabs>
      <div>
        <fine-art v-if="activeName === '0' " />
        <art v-else />
      </div>
    </div>
  </div>

</template>

<script>
import FineArt from './1v1'
import Art from './xiaoXiong'
import BasicsTitle from '@/components/BasicsTitle'

const businessTabList = [
  {
    label: '1v1美术',
    value: '0'
  },
  {
    label: '小熊美术',
    value: '1'
  }
]
export default {
  components: {
    FineArt,
    Art,
    BasicsTitle
  },
  data() {
    return {
      businessTabList,
      activeName: ''
    }
  }
}
</script>

<style>

</style>
