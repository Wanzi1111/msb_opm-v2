<template>
  <div class="app-container">
    <!-- 一级tab -->
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="i in baseData.screenshot_approval_tab_list" :key="i.key" :label="i.label" :name="i.key" />
    </el-tabs>
    <!--动态组件-->
    <div>
      <component :is="activeName" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OneByOne from './oneByone'
import Arts from './arts'

export default {
  name: 'NascentTaskApproval',
  components: {
    OneByOne,
    Arts
  },
  data() {
    return {
      activeName: 'OneByOne'
    }
  },
  computed: {
    ...mapGetters(['baseData'])
  }
}

</script>
