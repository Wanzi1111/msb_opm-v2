<!--
 * @Descripttion: 问卷描述
 * @version: 1.0.0
 * @Author: YangJiyong
 * @Date: 2020-11-30 15:46:07
 * @LastEditors: YangJiyong
 * @LastEditTime: 2020-11-30 20:39:59
-->
<template>
  <el-dialog title="问卷描述" :visible.sync="visible" class="create-dialog" @close="cancel">
    <h3>{{ title }}</h3>
    <basics-form ref="formDesc" :loading="loadings._operation_announcement_addAnnouncement" :forms="forms" :actions="actions" @submitForm="submitForm" />
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import BasicsForm from '@/components/BasicsForm'
import forms, { actions } from '../forms/createDesc'

export default {
  components: {
    BasicsForm
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      forms,
      actions: actions({ cancel: this.cancel })
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },

  methods: {
    cancel() {
      console.log('cancel')
      this.visible = false
    },
    submitForm(res) {
      console.log(res)
      if (!res) return
      this.$emit('desc', res || {})
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
h3{
  margin: 0 0 20px 0;
}
.create-dialog{
  ::v-deep .form-item .el-form-item__content {
    width: 100%;
  }
  ::v-deep .form-action {
    .el-form-item__content{
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
