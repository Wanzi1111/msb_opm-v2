<template>
  <div class="app-container">
    <basics-block title="创建问题" back>
      <basics-form
        ref="form"
        :loading="loadings._operation_announcement_addAnnouncement"
        :forms="forms"
        :actions="actions"
        @changeForm="changeForm"
        @submitForm="submitForm"
      />
      <article-preview
        :preview="preview"
        :visible="drawer"
        :close-dr="closeDr"
      />
    </basics-block>
  </div>
</template>

<script>
import {
  addHelpIssue,
  updateHelpIssue,
  getClassConstant
} from '@/api/help/index'
import BasicsForm from '@/components/BasicsForm'
import BasicsBlock from '@/components/BasicsBlock'
import ArticlePreview from './components/ArticlePreview/index'
import forms, { actions } from './forms/create'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: 'HelpCreate',
  components: { BasicsForm, BasicsBlock, ArticlePreview },
  data() {
    return {
      forms: forms,
      actions: actions({ preview: this.previewArticle, back: this.back }),
      preview: {},
      drawer: false,
      queryData: null,
      classData: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  created() {
    if (this.$route.params.id) {
      this.getClassConstant(this.$route.params.id)
    } else {
      this.queryData = JSON.parse(this.$route.query.routeParams)
      this.getClassConstant(this.queryData.bizLineId)
    }
  },
  mounted() {
    if (!this.$route.params.id) {
      const data = JSON.parse(JSON.stringify(this.queryData))
      data.issueType = String(data.issueType)
      if (this.queryData.issueType === 2) {
        data.addr = data.issueContent
        data.issueContent = ''
      }
      this.$refs.form.recoveryForm(data)
    }
  },
  methods: {
    // 获取当前业务线下的分类
    getClassConstant(val) {
      getClassConstant({ bizLineId: val }).then(res => {
        this.classData = res.data
        // 正则转化
        const dataOption = JSON.stringify(this.classData)
          .replace(/name/g, 'label')
          .replace(/id/g, 'value')
        this.$refs.form.set({
          type: 'options',
          data: {
            classifyId: JSON.parse(dataOption)
          }
        })
      })
    },
    // 切换显示类型
    changeForm(val, oldVal) {
      if (val.issueType !== oldVal.issueType) {
        if (val.issueType === '1') {
          this.$refs.form.set({
            type: 'visible',
            data: { content: true, addr: false, issueContent: true }
          })
          this.$refs.form.setAction({
            type: 'visible',
            data: { preview: true }
          })
        } else {
          this.$refs.form.set({
            type: 'visible',
            data: { content: false, addr: true, issueContent: false }
          })
          this.$refs.form.setAction({
            type: 'visible',
            data: { preview: false }
          })
        }
      }
    },
    // // 预览
    // previewArticle(val) {
    //   this.drawer = true
    //   this.preview = {
    //     announcementName: val.announcementName,
    //     id: 'create',
    //     showType: val.showType,
    //     content: val.content
    //   }
    // },
    // 保存
    submitForm(val) {
      const data = {
        ...val,
        issueContent: val.issueType === '2' ? val.addr : val.issueContent,
        issueType: Number(val.issueType),
        bizLineId: this.$route.params.id,
        cid: Cookies.get('userId')
      }
      delete data.addr
      if (this.$route.params.id) {
        addHelpIssue(data).then(() => {
          this.$message.success('添加问题成功')
          this.$router.push({ name: 'helpCenter' })
        })
      } else {
        data.bizLineId = this.queryData.bizLineId
        data.id = this.queryData.id
        updateHelpIssue(data).then(() => {
          this.$message.success('更新问题成功')
          this.$router.push({ name: 'helpCenter' })
        })
      }
    },
    // 预览 - 关闭
    closeDr() {
      this.drawer = false
      this.preview = {}
    },
    // 返回
    back() {
      this.$router.push({ name: 'helpCenter' })
    }
  }
}
</script>
