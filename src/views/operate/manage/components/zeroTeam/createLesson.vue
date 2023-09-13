<template>
  <div v-loading="loadings._k8s_api_activity_api_activity_config_getActivityList || loadings._k8s_api_activity_api_activity_config_createActivityCourse" class="app-container">
    <basics-block :title="title">
      <basics-form
        ref="form"
        :forms="forms"
        :actions="actions"
        @submitForm="submitForm"
      />
    </basics-block>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { getZeroActivityList, createActivityCourse } from '@/api/operate/manage'
import { createLessonForm, actions } from './form'
import { lineMap } from './index.vue'

export default {
  name: 'CreateZeroTeamLesson',
  data() {
    return {
      forms: createLessonForm,
      actions: actions({ back: this.back }),
      kind: 'team',
      title: '新建配置'
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    const { id } = this.$route.query
    this.getZeroActivityList()
    if (id) {
      this.handleEdit()
    }
  },
  methods: {
    handleEdit() {
      const { img, url, name } = this.$route.query
      this.$refs.form.set({
        type: 'defaultVal',
        data: { img, url, name }
      })
    },
    getZeroActivityList() {
      const { line, activityId } = this.$route.query
      getZeroActivityList({ activityType: lineMap[line], del: 0 })
        .then(({ payload }) => {
          payload.forEach(v => {
            v.label = v.activityTitle
            v.value = v.activityId
          })
          this.$refs.form.set({
            type: 'defaultVal',
            data: { activityId, line }
          })
          this.$refs.form.set({
            type: 'options',
            data: { activityId: payload }
          })
        })
    },
    submitForm(vals) {
      const payload = cloneDeep(vals)
      const { id } = this.$route.query
      if (id) payload.id = id
      delete payload.line
      createActivityCourse(payload)
        .then(() => {
          this.$message.success('配置成功～')
          this.$router.go(-1)
        })
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
