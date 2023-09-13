<template>
  <div class="position-manage">
    <el-dialog
      title="位置管理"
      :visible.sync="visible"
      :before-close="beforeClose"
    >
      <el-dialog
        width="30%"
        :title="`${addORedit ? '新增' : '修改'}位置`"
        :visible.sync="innerVisible"
        append-to-body
      >
        <basics-form
          ref="form"
          :loading="
            loadings._k8s_api_poster_api_v1_recommend_poster_getPosterAll
          "
          :forms="formCreat"
          :actions="action"
          @changeForm="changeForm"
          @submitForm="submitForm"
        />
      </el-dialog>
      <basics-search
        ref="searchs"
        :searchs="search"
        :loading="loadings._k8s_api_poster_api_v1_recommend_poster_getPosterAll"
        @submitSearch="submitSearch"
        @changeSearch="changeSearch"
      />
      <basics-action :actions="act" />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._k8s_api_poster_api_v1_recommend_poster_getPosterAll"
        :list="list"
        :get-list="lineList"
        :columns="columns"
        :total="total"
        :list-query="listQuery"
        :action-function="actions"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('clearPm', false)">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  getPosterAll,
  addPoster,
  modifyPoster,
  modifyPosterDel
} from '@/api/operate/poster-controller'
import formCreat, { actions } from './forms/create'
import columns, { actions as acti } from './columns/list'
import search from './forms/search'
import act from './actions/list'
export default {
  name: 'PositionManage',
  props: {
    outerVisible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      search: search,
      table: { stripe: true },
      formCreat: formCreat,
      innerVisible: false,
      columns: columns(),
      action: actions({ back: this.back }),
      actions: acti({ edit: this.posterEdit, startOrEnd: this.startOrEnd }),
      act: act({ add: this.addPositionBut }),
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        pageSize: 10
      },
      sub_line: '10',
      line: '1',
      addORedit: true,
      id: '',
      visible: false
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    outerVisible: {
      handler: function (val) {
        this.visible = val
      }
    }
  },
  methods: {
    // 停用，启用海报位置
    startOrEnd(del, row) {
      const { id } = row
      modifyPosterDel({ id, del })
        .then((res) => {
          if (res.code === 0) {
            this.lineList()
          }
        })
        .catch((err) => {})
    },
    addPositionBut() {
      this.addORedit = true
      this.innerVisible = true
    },
    beforeClose(done) {
      this.$emit('clearPm', false)
      return done
    },
    submitSearch(val) {
      const { line, sub_line } = val
      this.listQuery = {
        page: 1,
        limit: 10
      }
      this.line = line
      this.sub_line = sub_line
      this.lineList()
    },
    // 转介绍海报 搜索栏字典枚举
    async lineList() {
      const { page, limit: size } = this.listQuery
      const { line, sub_line } = this
      const parmas = {
        line,
        sub_line,
        page,
        size
      }
      await getPosterAll(parmas)
        .then((result) => {
          const shbline = result?.payload?.subLineList || {}
          const lineList = result?.payload?.lineList || []
          this.list = result?.payload?.poster?.content || []
          this.total = Number(result?.payload?.poster?.totalElements) || 0
          // 接口返回格式 两层对象 处理成数组类型健值对
          const subArr = []
          Object.keys(shbline).map((item) => {
            if (item === line) {
              Object.keys(shbline[line]).map((i) => {
                subArr.push({ label: shbline[line][i], value: i })
              })
            }
          })
          const lineArr = []
          Object.keys(lineList).map((item) => {
            lineArr.push({
              label: lineList[item],
              value: item
            })
          })
          this.$nextTick(() => {
            this.$refs.searchs &&
              this.$refs.searchs.set({
                type: 'options',
                data: { sub_line: subArr, line: lineArr }
              })
          })
        })
        .catch((err) => {
          this.$message(err)
        })
    },
    changeSearch(val, oldVal) {
      const { line, sub_line } = val
      if (line && line !== oldVal.line) {
        this.line = line
        this.sub_line = ''
        // this.lineList()
        if (this.sub_line === '') {
          // 如果业务线为小熊艺术line（2）则业务体系sub_line只能为小熊艺术（20）
          this.sub_line =
            line === '1'
              ? '10'
              : line === '2'
                ? '20'
                : line === '3'
                  ? '30'
                  : line === '4'
                    ? '40'
                    : '10'
          this.$refs.searchs.set({
            type: 'defaultVal',
            data: { sub_line: this.sub_line }
          })
        }
      }
      if (sub_line && sub_line !== oldVal.sub_line) {
        this.sub_line = sub_line
        this.lineList()
      }
    },
    posterEdit(dat, row) {
      this.addORedit = false
      this.innerVisible = true
      this.id = row.id
      const { line, subLine } = row
      this.$nextTick(() => {
        switch (line) {
          case '4':
            this.$refs.form.set({
              type: 'options',
              data: { sub_line: [{ label: '1v1', value: '40' }] }
            })
            break
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
      })
      row.sub_line = subLine.toString()
      row.line = line.toString()
      this.$nextTick(() => {
        this.$refs.form &&
          this.$refs.form.set({
            type: 'defaultVal',
            data: row
          })
      })
    },
    changeForm(val, oldVal) {
      const { line } = val
      if (line && line !== oldVal.line) {
        // 业务线变化清空用户类型与海报位置
        // this.line = val.line
        switch (line) {
          case '4':
            this.$refs.form.set({
              type: 'options',
              data: { sub_line: [{ label: '1v1', value: '40' }] }
            })
            break
          case '3':
            this.$refs.form.set({
              type: 'options',
              data: { sub_line: [{ label: '书画院', value: '30' }] }
            })
            break
          case '2':
            this.$refs.form.set({
              type: 'options',
              data: {
                sub_line: [
                  { label: '小熊美术', value: '20' },
                  { label: '小熊书法', value: '21' },
                  { label: '自分销', value: '22' },
                  { label: '小熊音乐', value: '23' },
                  { label: '小熊中文海外版', value: '24' }
                ]
              }
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
        // this.sub_line = ''
        return
      }
      // if (sub_line && sub_line !== oldVal.sub_line) { // 用户类型变化清空海报位置
      //   this.sub_line = val.sub_line
      //   return
      // }
    },
    submitForm(val) {
      const { id, addORedit } = this
      if (addORedit) {
        addPoster(val)
          .then((result) => {
            this.$message.success('新增成功')
            this.innerVisible = false
            this.$refs.form.resetFields()
          })
          .catch((err) => {})
      } else {
        modifyPoster({ ...val, id })
          .then((result) => {
            this.$message.success('修改成功')
            this.innerVisible = false
            this.$refs.form.resetFields()
          })
          .catch((err) => {})
      }
      setTimeout(() => {
        this.lineList()
      }, 500)
    },
    addPosition() {},
    back() {
      this.innerVisible = false
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.headers {
  margin-bottom: 20px;
}
</style>
