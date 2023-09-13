<template>
  <div v-loading="detailWrapLoading" class="app-container">
    <basics-block :title="`${$route.query.type === 'edit' ? '编辑' : '新增'}转介绍海报`">
      <basics-form
        ref="form"
        :loading="formLoading"
        :forms="forms"
        :actions="actions"
        @changeForm="changeForm"
        @submitForm="submitForm"
      />
    </basics-block>
    <el-dialog
      v-loading="
        loadings._k8s_api_poster_api_v1_recommend_poster_testPosterListNew
      "
      :visible.sync="dialogVsib"
      title="海报预览"
    >
      <div>
        <h2><i class="el-icon-picture-outline">标准海报</i></h2>
        <span><el-image :src="posterUrl" /></span>
      </div>
      <div v-if="Number(individualization)">
        <h2><i class="el-icon-picture">个性化海报</i></h2>
        <span><el-image :src="originalIndividualizationUrl" /></span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="() => (dialogVsib = false)">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPosterConfigure,
  getPosterAll,
  addPosterListNew,
  testPosterListNew,
  modifyPosterListNew,
  getPosterList
} from '@/api/operate/poster-controller'
import forms, { actions } from './forms/posterDetail'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'PosterDetail',
  data() {
    return {
      forms,
      drawer: false,
      // 转介绍海报 新增字段
      line: '1',
      sub_line: '10',
      poster_id: '',
      actions: actions({ preview: this.previewArticle, back: this.back }),
      dialogVsib: false,
      posterUrl: '',
      originalIndividualizationUrl: '',
      individualization: 0
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    formLoading() {
      const { loadings } = this
      return (
        loadings._k8s_api_poster_api_v1_recommend_poster_addPosterListNew ||
        loadings._k8s_api_poster_api_v1_recommend_poster_testPosterListNew ||
        loadings._k8s_api_poster_api_v1_recommend_poster_modifyPosterListNew
      )
    },
    detailWrapLoading() {
      const { loadings } = this
      return (
        loadings._k8s_api_poster_api_v1_recommend_poster_getPosterAll ||
        loadings._k8s_api_poster_api_v1_recommend_poster_testPosterListNew
      )
    },
    ifAddPoster() {
      const { type } = this.$route.query
      return type === 'add'
    }
  },
  mounted() {
    this.getPoster()
    this.lineList()
    if (!this.ifAddPoster) {
      this.getPosterList()
    }
  },
  methods: {
    // 编辑||复制 值回显
    getPosterList() {
      const { id } = this.$route.query
      if (!id) return
      getPosterList({ id })
        .then((result) => {
          const {
            copywriting,
            line,
            subLine,
            posterId,
            posterName,
            individualizationUrl,
            posterUrl
          } = result.payload
          const res = {
            ...result.payload,
            line: line + '',
            sub_line: subLine + '',
            poster_id: posterId + '',
            poster_name: posterName,
            poster_url: posterUrl,
            individualization_url: individualizationUrl
          }
          res.copywriting = copywriting.split('<>')[0]
          res.copywriting2 = copywriting.split('<>')[1]
          res.copywriting3 = copywriting.split('<>')[2]
          this.line = res.line
          this.sub_line = res.subLine
          this.$refs.form.recoveryForm(res)
        })
        .catch((err) => {})
    },
    getPoster() {
      getPosterConfigure()
        .then((result) => {
          const type = result?.payload?.map((item) => {
            item.label = item.name
            item.value = item.type
            return item
          })
          this.$nextTick(() => {
            this.$refs.form.set({
              type: 'options',
              data: { type }
            })
          })
        })
        .catch((err) => {})
    },
    // 转介绍海报位置 搜索栏字典枚举
    lineList: _.debounce(async function () {
      const { line, sub_line } = this
      const parmas = {
        line,
        sub_line,
        del: 0
      }
      await getPosterAll(parmas)
        .then((result) => {
          const lineList = result?.payload?.lineList || []
          const content = result?.payload?.poster?.content || []
          const shbline = result?.payload?.subLineList || {}
          content.forEach((element) => {
            element.label = element.position
            element.value = element.id
            return element
          })
          const lineArr = []
          Object.keys(lineList).map((item) => {
            lineArr.push({
              label: lineList[item],
              value: item
            })
          })
          // 接口返回格式 两层对象 处理成数组类型健值对
          if (this.ifAddPoster) {
            const subArr = []
            Object.keys(shbline).map((item) => {
              if (item === line) {
                Object.keys(shbline[line]).map((i) => {
                  subArr.push({ label: shbline[line][i], value: i })
                })
              }
            })
            this.$nextTick(() => {
              this.$refs.form &&
                this.$refs.form.set({
                  type: 'options',
                  data: { poster_id: content, sub_line: subArr, line: lineArr }
                })
            })
          } else {
            this.$refs.form &&
              this.$refs.form.set({
                type: 'options',
                data: { poster_id: content, line: lineArr }
              })
          }
        })
        .catch((err) => {
          this.$message(err)
        })
    }, 200),
    // 监听 forms变化
    changeForm(val, oldVal) {
      const { line, sub_line, poster_id, individualization } = val
      this.individualization = individualization
      this.poster_id = poster_id
      if (line && line !== oldVal.line) {
        // 业务线变化清空用户类型与海报位置
        this.line = val.line
        if (!this.ifAddPoster) {
          switch (line) {
            case '3':
              this.$refs.form.set({
                type: 'options',
                data: { sub_line: [{ label: '书画院', value: '30' }] }
              })
              break
            case '2':
              this.$refs.form.set({
                type: 'options',
                data: { sub_line: [{ label: '小熊艺术', value: '20' }] }
              })
              break
            case '1':
            default:
              this.$refs.form.set({
                type: 'options',
                data: {
                  sub_line: [
                    { label: '1对1', value: '10' },
                    { label: '小班课', value: '11' }
                  ]
                }
              })
              break
          }
        }
        // 如果业务线为小熊艺术line（2）则业务体系sub_line只能为小熊艺术（20）
        this.sub_line =
          line === '1'
            ? '10'
            : line === '2'
              ? '20'
              : line === '3'
                ? '30'
                : '10'
        if (!this.ifAddPoster) {
          this.$refs.form.recoveryForm({
            sub_line: this.sub_line
          })
        } else {
          this.$refs.form.recoveryForm({
            sub_line: this.sub_line,
            poster_id: ''
          })
        }
      }
      if (sub_line && sub_line !== oldVal.sub_line) {
        // 用户类型变化清空海报位置
        this.sub_line = val.sub_line
        if (this.ifAddPoster) {
          this.$refs.form &&
            this.$refs.form.recoveryForm({
              poster_id: ''
            })
        }
        this.lineList()
      }
      if (individualization !== oldVal.individualization) {
        switch (individualization) {
          case '0':
            this.$refs.form.set({
              type: 'visible',
              data: { poster_url: true, individualization_url: false }
            })
            break
          default:
          case '1':
            this.$refs.form.set({
              type: 'visible',
              data: { poster_url: true, individualization_url: true }
            })
            break
        }
      }
    },
    // 保存
    submitForm(val) {
      const { id, type } = this.$route.query
      const writingArr = ['copywriting', 'copywriting2', 'copywriting3']
      const { line, sub_line, poster_id } = this
      const data = {
        ...val
      }
      const strArr = []
      writingArr.map((item) => {
        if (val[item]) {
          strArr.push(val[item])
        }
      })
      data.copywriting = strArr.join('<>')
      delete data.copywriting2
      delete data.copywriting3
      if (type === 'edit') {
        modifyPosterListNew({ ...data, id }).then(() => {
          this.$message.success('保存成功')
          this.$router.push({
            name: 'Poster',
            query: { line, sub_line, poster_id }
          })
        })
      } else {
        addPosterListNew(data).then(() => {
          this.$message.success('添加成功')
          this.$router.push({
            name: 'Poster',
            query: { line, sub_line, poster_id }
          })
        })
      }
    },
    previewArticle(val) {
      // 预览
      const { copywriting, copywriting2, copywriting3 } = val
      const data = {
        ...val
      }
      data.copywriting = `${copywriting}<>${copywriting2}<>${copywriting3}`
      delete data.copywriting2
      delete data.copywriting3
      testPosterListNew(data)
        .then((result) => {
          const { originalIndividualizationUrl, posterUrl } = result.payload
          this.posterUrl = posterUrl
          this.originalIndividualizationUrl = originalIndividualizationUrl
          this.dialogVsib = true
        })
        .catch((err) => {})
    },
    back() {
      const { line, sub_line, poster_id } = this
      this.$router.push({
        name: 'Poster',
        query: { line, sub_line, poster_id }
      })
    }
  }
}
</script>
