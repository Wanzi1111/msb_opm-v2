<template>
  <div class="position-manage">
    <el-dialog title="位置管理" :visible.sync="outerVisible" :before-close="beforeClose">
      <el-dialog
        width="30%"
        :title="`${addORedit?'新增':'修改'}位置`"
        :visible.sync="innerVisible"
        append-to-body
      >
        <basics-form
          ref="form"
          :loading="loadings._ums_meixiu_api_im_g_v1_recommend_add_recommendationTag || loadings._ums_meixiu_api_im_g_v1_recommend_update_recommendationTag"
          :forms="formCreat"
          :actions="action"
          @submitForm="submitForm"
        />
      </el-dialog>
      <basics-search
        ref="searchs"
        :searchs="search"
        :loading="loadings._ums_meixiu_api_im_g_v1_recommend_query_recommendationTag"
        @submitSearch="submitSearch"
      />
      <basics-action :actions="act" />
      <basics-table
        ref="table"
        :table="table"
        :loading="loadings._ums_meixiu_api_im_g_v1_recommend_query_recommendationTag"
        :list="list"
        :get-list="lineList"
        :columns="columns"
        :action-function="actions"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('clearPm',false)">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { addRecommendationTag, recommendationTag, updateRecommendationTag } from '@/api/points-mall/recommend'
import formCreat, { actions } from './forms/create'
import columns, { actions as acti } from './columns/list'
import search from './forms/search'
import act from './actions/list'
import _ from 'lodash'
import { business } from '../../enum/index'

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
      actions: acti({ edit: this.posterEdit }),
      act: act({ add: this.addPositionBut }),
      list: [],
      businessType: '',
      addORedit: true,
      id: '',
      newStateList: business
    }
  },
  computed: {
    ...mapGetters(['loadings'])
    // newStateList() {
    //   return this.$store.getters.mallConfig?.businessType?.filter(item => item.id !== '3' && item.id !== '4')
    // }
  },
  created() {
    this.$nextTick(() => {
      const businessType = this.newStateList.map(item => {
        item.value = item.businessType
        item.label = item.name
        return item
      })
      this.$refs.form && this.$refs.form.set({
        type: 'options',
        data: { businessType }
      })
    })
    this.lineList()
  },
  methods: {
    addPositionBut() {
      this.addORedit = true
      this.innerVisible = true
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.set({
          type: 'attr',
          data: { businessType: { disabled: false }}
        })
      })
    },
    beforeClose(done) {
      this.$emit('clearPm', false)
      return done
    },
    submitSearch(val) {
      const { businessType } = val
      this.businessType = businessType
      this.lineList()
    },
    // 转介绍海报 搜索栏字典枚举
    lineList: _.debounce(async function() {
      const { businessType } = this
      await recommendationTag({ businessType }).then((result) => {
        this.list = result?.payload || []
      }).catch((err) => {
        this.$message(err)
      })
    }, 200),
    posterEdit(dat, row) {
      this.addORedit = false
      this.innerVisible = true
      this.id = row.id
      const { businessType, recommendationTag } = row
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.recoveryForm({ businessType, recommendationTag })
        this.$refs.form && this.$refs.form.set({
          type: 'attr',
          data: { businessType: { disabled: true }}
        })
      })
    },
    async submitForm(val) {
      const { id, addORedit } = this
      if (addORedit) {
        await addRecommendationTag(val).then((result) => {
          this.$message.success('新增成功')
          this.innerVisible = false
          this.$refs.form.resetFields()
        }).catch((err) => {
          console.log(err)
        })
      } else {
        await updateRecommendationTag({ ...val, id }).then((result) => {
          this.$message.success('修改成功')
          this.innerVisible = false
          this.$refs.form.resetFields()
        }).catch((err) => {
          console.log(err)
        })
      }
      await this.lineList()
    },
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
