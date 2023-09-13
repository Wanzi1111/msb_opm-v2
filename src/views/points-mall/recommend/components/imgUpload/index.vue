<template>
  <el-dialog
    title="上传图片"
    :visible.sync="visible"
    width="500px"
    :before-close="() => closeDl()"
  >
    <basics-form
      :key="visible"
      ref="addShow"
      :loading="loadings._msb_api_workShow_add"
      :forms="forms"
      :actions="actions"
      @submitForm="submitForm"
    />
  </el-dialog>
</template>

<script>
import BasicsForm from '@/components/BasicsForm'
import forms, { actions } from './forms/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Create',
  components: { BasicsForm },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    listId: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      forms: forms,
      actions: actions({ closeDl: this.closeDl })
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  methods: {
    submitForm(val) {
      const { goodsThumbnail } = val
      this.$api.updateRecommendGoods({ goodsThumbnail, id: this.listId }).then((res) => {
        this.$message.success('上传成功')
        this.closeDl()
        this.$emit('getList')
      })
    },
    closeDl() {
      this.$emit('closeDl')
    }
  }
}
</script>
