<template>
  <div>
    <div
      v-loading="loadings._ums_meixiu_api_im_g_v2_marketingactivity_getMarketingDetailById
        || loadings._ums_meixiu_api_im_g_v2_marketingactivity_addAndUpdate"
      class="app-container form-box"
    >
      <basics-form
        ref="formRef"
        :forms="forms"
        :actions="formActions"
        @submitForm="onFormSubmit"
        @changeForm="onFormChange"
      >
        <template slot="goodConfig">
          <el-form-item label="活动商品配置" class="form-item" :rules="[{ required: true, message: '请选择！' }]">
            <basics-table
              style="display: flex;"
              :loading="loadings._ums_api_uc_api_platform_user_list"
              :list="goodsList"
              :columns="columns"
              :action-function="actionFunction"
            >
              <template slot="sortId" slot-scope="scope">
                <el-button icon="el-icon-bottom" :disabled="scope.$index === goodsList.length - 1" @click="handleSort('down', scope)" />
                <el-button icon="el-icon-top" :disabled="scope.$index === 0" @click="handleSort('up', scope)" />
              </template>
            </basics-table>
            <div>
              <el-button style="float: right;margin-top: 10px;" @click="handleDrawerVis('addGood')">添加商品</el-button>
            </div>
          </el-form-item>
        </template>
        <template slot="temp-divider">
          <el-divider content-position="left">绑定场景值</el-divider>
        </template>
      </basics-form>

    </div>
    <template v-if="drawerType">
      <drawer-choose-templete v-if="drawerType" :drawer-data="{ ...drawerData, goodsEpcs }" @handleDrawerVis="handleDrawerVis" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep, omit } from 'lodash'
import moment from 'moment'
import { marketingActivityAddAndUpdate, getMarketingActivityDetailById } from '@/api/points-mall/marketing-activity'
import { getToken } from '@/utils/auth'
import DrawerChooseTemplete from './components/drawer-choose-templete'
import forms, { formActions } from './form'
import columns, { tableActions } from './columns'

const userId = getToken('userId')

export default {
  name: 'CreateMarketingActivity',
  components: { DrawerChooseTemplete },
  props: {
    handleDialogVis: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      visiable: true,
      drawerType: '',
      drawerData: {},
      columns,
      goodsList: [],
      allGoodsList: [], // 包含了删除的商品
      actionFunction: tableActions({ handleTableAction: this.handleTableAction }),
      forms,
      formActions: formActions(),
      activity: {} // 编辑活动数据
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    goodsEpcs() {
      return this.goodsList.map(v => v.goodsEpc)
    }
  },
  mounted() {
    this.$nextTick(() => {
      const { $route: { query: { id }}} = this
      if (id) {
        this.handleEdit(id)
      }
    })
  },
  methods: {
    handleEdit(id) {
      // 编辑回显
      getMarketingActivityDetailById({ id })
        .then(({ payload: { activity, goodsList }}) => {
          const { activityCtime, activityEtime, activityTag, activityTitle, limitBusinessTypes, userLimit } = activity
          // 构造回显表单
          const recoveryFormData = {
            time: [+activityCtime, +activityEtime],
            line: limitBusinessTypes.split(','),
            mid: userId,
            activityTag,
            activityTitle,
            userLimit
          }

          this.$refs.formRef.recoveryForm(recoveryFormData)
          this.activity = activity
          // 商品列表数据处理成自己的格式
          const newGoodsList = goodsList.map((v, i) => {
            const { businessTypeImGoodsPaymentMap: { ONETOONE, BEAR }} = v
            if (ONETOONE) {
              v.oneToOneCoinPrice = ONETOONE.coinPrice
            }
            if (BEAR) {
              v.bearCoinPrice = BEAR.coinPrice
            }
            v.priceType = ONETOONE?.paymentType || BEAR?.paymentType
            v.sortId = i + 1
            return v
          })
          this.goodsList = [...newGoodsList]
          this.allGoodsList = [...newGoodsList]
        })
    },
    handleSort(type, { $index }) {
      if (type === 'up') {
        this.goodsList = [...this.goodsList.slice(0, $index - 1), this.goodsList[$index], this.goodsList[$index - 1], ...this.goodsList.slice($index + 1)]
      } else {
        this.goodsList = [...this.goodsList.slice(0, $index), this.goodsList[$index + 1], this.goodsList[$index], ...this.goodsList.slice($index + 2)]
      }
      this.$message.success('排序成功~')
    },
    handleTableAction(type, row) {
      console.log('row', row)
      const { goodsEpc } = row
      // 删除
      switch (type) {
        case 'del': {
          this.$confirm('确定删除该商品么？', '提示', { type: 'warning' })
            .then(() => {
              this.allGoodsList.forEach(v => {
                if (v.goodsEpc === goodsEpc) {
                  v.del = 1
                }
              })
              this.goodsList = this.goodsList.filter(v => v.goodsEpc !== goodsEpc)
            })
          break
        }
        case 'edit': {
          this.handleDrawerVis('editGoods', row)
          break
        }
      }
    },
    onFormSubmit(values) {
      const { goodsList, $route: { query: { type }}} = this
      // 参数处理
      let activity = {
        ...this.activity,
        ...cloneDeep(values),
        utime: new Date().getTime(),
        limitBusinessTypes: values.line.toString(),
        activityCtime: moment(values.time[0]).valueOf(),
        activityEtime: moment(values.time[1]).valueOf()
      }
      activity = omit(activity, ['time', 'line', 'undefined'])

      // 参数校验
      if (!goodsList.length) {
        this.$message.error('请添加商品！')
        return
      }

      if (type === 'copy') {
        delete activity.id
        goodsList.forEach(v => {
          delete v.id
          delete v.ids
        })
      }
      console.log('payload', { activity, goodsList })
      const newGoodsList = goodsList
        .concat(this.allGoodsList.filter(v => +v?.del === 1))
        .map((v, i) => {
          v = omit(v, ['businessType'])
          v.sortId = i + 1
          return v
        })
      // return
      marketingActivityAddAndUpdate({ activity, goodsList: newGoodsList })
        .then(() => {
          this.$message.success('保存成功~')
          setTimeout(() => {
            this.$router.go(-1)
          }, 200)
        })
    },
    onFormChange(newVals, oldVals) {
      // 是否支持二级消息组
      if (newVals.subSupport && newVals.subSupport !== oldVals.subSupport) {
        this.$refs.formRef.set({
          type: 'visible',
          data: { twoNums: newVals.subSupport === '1' }
        })
      }
    },
    handleDrawerVis(type, data) {
      const { line } = this.$refs.formRef.form
      if (type === 'addGood') {
        if (!line?.length) {
          this.$message.error('请先选择支持的业务线！')
          return
        }
      } else if (!type && data) {
        // 编辑商品
        if (this.drawerType === 'editGoods') {
          this.goodsList = this.goodsList.map(v => {
            if (v.id === data.id) {
              v = { ...v, ...data }
            }
            return v
          })
        } else {
        // 添加一条商品
          this.goodsList.push(data)
        }
        this.drawerType = type || ''
        this.drawerData = ''
        return
      }
      this.drawerType = type || ''
      this.drawerData = { line, type, row: data } || {}
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  ::v-deep .el-form-item__label {
    width: 150px !important
  }
}
</style>
