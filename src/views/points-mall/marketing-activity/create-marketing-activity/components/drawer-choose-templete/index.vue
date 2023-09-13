<template>
  <div>
    <el-drawer
      title="新增商品"
      :visible.sync="visiable"
      destroy-on-close
      :size="720"
      :close-on-press-escape="false"
      :wrapper-closable="false"
      @closed="onDrawerClose"
    >
      <div v-loading="(loadings._ums_meixiu_api_mc_manage_save || loadings._ums_meixiu_api_im_g_v2_marketingactivity_getPaymentByEpcAndBusinessType)" class="app-container form-box">
        <basics-form
          ref="formRef"
          :forms="forms"
          :actions="formActions"
          @submitForm="onFormSubmit"
          @changeForm="onFormChange"
        >
          <template slot="choiceGoods">
            <el-form-item label="选择商品" class="form-item" :rules="[{ required: true, message: '请选择！' }]">
              <div style="font-size: 12px; color: #333; padding-left: 120px;">
                <template v-if="!selectedGoodsData">
                  <el-button @click="handleDialogVis('addGood')">添加商品</el-button>
                </template>
                <template v-else>
                  <el-button style="display: block" @click="handleDialogVis('addGood')">重新选择商品</el-button>
                  <el-image :src="selectedGoodsData.img" style="width: 120px; height: 120px; margin-top: 10px" :preview-src-list="[selectedGoodsData.img]" />
                </template>
              </div>
            </el-form-item>
          </template>
          <!-- 1对1商品兑换 -->
          <template slot="oneGoodsPrice">
            <!-- 兑换方式 -->
            <el-form-item label="1对1兑换方式" label-width="120px" :rules="[{ required: true, message: '请选择！' }]">
              <el-select v-model="slotForm.oneGoodsPrice.paymentType">
                <el-option v-for="v in onePaymentTypeOptions" :key="v.value" v-bind="v" />
              </el-select>
            </el-form-item>
            <!-- 金币 -->
            <el-form-item v-if="slotForm.oneGoodsPrice.paymentType === 'COIN'" label-width="120px" label="">
              <el-input v-model="slotForm.oneGoodsPrice.coinPrice" placeholder="请输入内容" style="width: 200px;">
                <template slot="append">金币</template>
              </el-input>
              <div style="inline-block">
                <span>商品原价：{{ oneToOneCoinPrice }}</span>
              </div>
            </el-form-item>
            <!-- 课时 -->
            <el-form-item v-else-if="slotForm.oneGoodsPrice.paymentType === 'CLASS'" label-width="120px" label="">
              <el-input
                v-model="slotForm.oneGoodsPrice.classPrice.classPriceOne"
                placeholder="请输入内容"
                type="number"
                style="width: 200px;"
              >
                <template slot="append">1v1课时</template>
              </el-input>
              <el-input
                v-model="slotForm.oneGoodsPrice.classPrice.classPriceSmall"
                placeholder="请输入内容"
                type="number"
                style="width: 200px;"
              >
                <template slot="append">小班课</template>
              </el-input>
              <el-select v-model="classPricePayType" style="width: 100px" :disabled="true" name="classPricePayType">
                <el-option key="PAY" value="PAY" label="付费" />
                <el-option key="FREE" value="FREE" label="不付费" />
              </el-select>
            </el-form-item>
            <!-- 现金 -->
            <el-form-item v-else-if="slotForm.oneGoodsPrice.paymentType === 'CASH'" label-width="120px" label="">
              <el-input v-model="slotForm.oneGoodsPrice.cashPrice" placeholder="请输入内容" style="width: 200px;">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <!-- 组合支付 -->
            <el-form-item v-else-if="slotForm.oneGoodsPrice.paymentType === 'COINANDCASH'" label-width="120px" label="">
              <el-input v-model="slotForm.oneGoodsPrice.coinAndCashPrice.coinPrice" placeholder="请输入内容" style="width: 200px;">
                <template slot="append">金币</template>
              </el-input>
              <el-input v-model="slotForm.oneGoodsPrice.coinAndCashPrice.cashPrice" placeholder="请输入内容" style="width: 200px">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </template>

          <template slot="bearGoodsPrice">
            <!-- 兑换方式 -->
            <el-form-item label="小熊兑换方式" label-width="120px" :rules="[{ required: true, message: '请选择！' }]">
              <el-select v-model="slotForm.bearGoodsPrice.paymentType">
                <el-option v-for="v in bearPaymentTypeOptions" :key="v.value" v-bind="v" />
              </el-select>
            </el-form-item>
            <!-- 金币 -->
            <el-form-item v-if="slotForm.bearGoodsPrice.paymentType === 'COIN'" label-width="120px" label="">
              <el-input v-model="slotForm.bearGoodsPrice.coinPrice" placeholder="请输入内容" style="width: 200px;">
                <template slot="append">金币</template>
              </el-input>
              <div style="inline-block">
                <span>商品原价：{{ bearCoinPrice }}金币 </span>
              </div>
            </el-form-item>
            <!-- 现金 -->
            <el-form-item v-else-if="slotForm.bearGoodsPrice.paymentType === 'CASH'" label-width="120px" label="">
              <el-input v-model="slotForm.bearGoodsPrice.cashPrice" placeholder="请输入内容" style="width: 200px;">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <!-- 组合支付 -->
            <el-form-item v-else-if="slotForm.bearGoodsPrice.paymentType === 'COINANDCASH'" label-width="120px" label="">
              <el-input v-model="slotForm.bearGoodsPrice.coinAndCashPrice.coinPrice" placeholder="请输入内容" style="width: 200px;">
                <template slot="append">金币</template>
              </el-input>
              <el-input v-model="slotForm.bearGoodsPrice.coinAndCashPrice.cashPrice" placeholder="请输入内容" style="width: 200px">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </template>

        </basics-form>

        <dialog-choose-goods
          v-if="dialogType"
          :dialog-data="{ type: formData.goodsType, line: drawerData.line, goodsEpcs: drawerData.goodsEpcs }"
          @handleDialogVis="handleDialogVis"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import { getPaymentByEpcAndBusinessType } from '@/api/points-mall/marketing-activity'
import DialogChooseGoods from '../dialog-choose-goods'
import forms, { formActions, goodsExchangeOptions } from './form'
// import { rate } from '@/api/points-mall/mall-admin'

const lineMap = {
  '1': 'ONETOONE',
  '2': 'BEAR'
}

const init_oneGoodsPrice = {
  paymentType: '',
  cashPrice: '',
  coinPrice: '',
  // 组合 支付
  coinAndCashPrice: {
    coinPrice: 0,
    cashPrice: 0
  },
  classPrice: {
    classPriceOne: 0,
    classPriceSmall: 0
  }
}

const init_bearGoodsPrice = {
  paymentType: '',
  cashPrice: '',
  coinPrice: '',
  // 组合 支付
  coinAndCashPrice: {
    coinPrice: 0,
    cashPrice: 0
  }
}

const priceTypeMap = {
  CLASS: 'classPrice',
  COIN: 'coinPrice',
  CASH: 'cashPrice',
  COINANDCASH: 'coinAndCashPrice'
}

export default {
  name: 'CreateMarketingActivityGoods',
  components: { DialogChooseGoods },
  props: {
    handleDrawerVis: {
      type: Function,
      default: () => {}
    },
    drawerData: {
      type: Object,
      default: () => ({ line: ['1'] })
    }
  },
  data() {
    return {
      visiable: true,
      dialogType: '',
      selectedGoodsData: '', // 选择的商品
      list: [],
      forms,
      slotForm: {
        oneGoodsPrice: { ...init_oneGoodsPrice },
        bearGoodsPrice: { ...init_bearGoodsPrice }
      },
      onePaymentTypeOptions: [], // 1对1商品兑换方式下拉
      bearPaymentTypeOptions: [], // 小熊商品兑换方式下拉
      paymentTypeData: { }, // 该商品支持的兑换方式
      classPricePayType: '', // 课时付费方式
      oneToOneCoinPrice: 0, // 原价：1v1商品所消耗金币
      bearCoinPrice: 0, // 原价：小熊商品所消耗金币
      formActions: formActions(),
      initFlag: false // 是否需要重置兑换信息
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    formData() {
      console.log('this.$refs.formRef?.form', this.$refs.formRef?.form)
      return this.$refs.formRef?.form || {}
    }
  },
  watch: {
    async selectedGoodsData(vals) {
      if (vals) {
        const { surplus, limitNum, goodsEpc, goodsName } = vals
        const { drawerData: { line, type }, initFlag } = this
        const { payload: paymentTypeData } = await getPaymentByEpcAndBusinessType({ epc: goodsEpc, businessTypeList: line.map(v => lineMap[v]) })
        const goodsPriceVis = { oneGoodsPrice: false, bearGoodsPrice: false }

        // 获取当前支持业务线 <=> 选中的商品 所对应的兑换方式
        const onePaymentTypeOptions = [] // 1v1
        const bearPaymentTypeOptions = [] // 小熊
        const { ONETOONE, BEAR } = paymentTypeData
        if (ONETOONE) {
          goodsPriceVis.oneGoodsPrice = true
          // 1v1兑换方式
          const priceTypeKeys = Object.keys(ONETOONE)
          goodsExchangeOptions.forEach(v => {
            if (priceTypeKeys.includes(v.value)) {
              onePaymentTypeOptions.push(v)
            }
          })
          if (ONETOONE.CLASS) {
            this.classPricePayType = ONETOONE.CLASS.classPay // 课时付费方式
          }
          if (ONETOONE.COIN) {
            this.oneToOneCoinPrice = ONETOONE.COIN.coinPrice // 金币原价
          }
        }
        if (BEAR) {
          goodsPriceVis.bearGoodsPrice = true
          // 小熊兑换方式
          const priceTypeKeys = Object.keys(BEAR)
          goodsExchangeOptions.forEach(v => {
            if (priceTypeKeys.includes(v.value)) {
              bearPaymentTypeOptions.push(v)
            }
          })
          if (BEAR.COIN) {
            this.bearCoinPrice = BEAR.COIN.coinPrice // 金币原价
          }
        }

        this.onePaymentTypeOptions = onePaymentTypeOptions
        this.bearPaymentTypeOptions = bearPaymentTypeOptions
        this.paymentTypeData = paymentTypeData

        this.$refs.formRef.set({
          type: 'defaultVal',
          data: {
            limitNum: +surplus || limitNum, // 默认库存
            goodsName
          }
        })
        this.$refs.formRef.set({
          type: 'attr',
          data: { limitNum: { max: +surplus || 999 }} // 库存最大值
        })
        this.$refs.formRef.set({
          type: 'visible',
          data: goodsPriceVis // 库存最大值
        })

        // 编辑、初次回显时不能重置兑换信息
        if (type === 'editGoods' && !initFlag) {
          this.initFlag = true
        } else {
          this.slotForm.oneGoodsPrice = { ...init_oneGoodsPrice }
          this.slotForm.bearGoodsPrice = { ...init_bearGoodsPrice }
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.drawerData.type === 'editGoods') {
        this.handleEdit()
      }
    })
  },
  methods: {
    handleEdit() {
      const rowData = this.drawerData.row
      const { goodsType, goodsName, limitNum, oneGoodsPrice, bearGoodsPrice } = rowData
      const recoveryFormData = { goodsType, goodsName, limitNum }
      const slotForm = {}

      this.selectedGoodsData = rowData

      if (oneGoodsPrice) {
        const { paymentType, coinPrice, cashPrice, classPriceOne, classPriceSmall } = oneGoodsPrice
        slotForm.oneGoodsPrice = { paymentType, coinPrice, cashPrice, classPrice: { classPriceOne, classPriceSmall }, coinAndCashPrice: { coinPrice, cashPrice }}
      }
      if (bearGoodsPrice) {
        const { paymentType, coinPrice, cashPrice } = bearGoodsPrice
        slotForm.bearGoodsPrice = { paymentType, coinPrice, cashPrice, coinAndCashPrice: { coinPrice, cashPrice }}
      }
      this.$refs.formRef.recoveryForm(recoveryFormData)
      this.slotForm = slotForm
    },
    onDrawerClose() {
      this.$emit('handleDrawerVis', '')
    },
    onFormSubmit(values) {
      const {
        selectedGoodsData: { img, goodsEpc },
        drawerData: { line, type, row },
        paymentTypeData,
        slotForm: { oneGoodsPrice, bearGoodsPrice }
      } = this
      let payload = { ...cloneDeep(values), img, goodsEpc, businessType: line.toString(), leftCount: values.limitNum }

      // 1v1商品兑换
      if (paymentTypeData.ONETOONE) {
        const paymentType = oneGoodsPrice.paymentType // 兑换方式
        const priceData = oneGoodsPrice[priceTypeMap[paymentType]] // 兑换的值，课时、组合为对象
        let oneGoodsPriceData = { paymentType } // 支付包id
        if (typeof priceData === 'object') {
          oneGoodsPriceData = { ...oneGoodsPriceData, ...priceData }
        } else {
          oneGoodsPriceData[priceTypeMap[paymentType]] = priceData
        }
        payload = {
          ...payload,
          paymentIdOne: paymentTypeData.ONETOONE[paymentType].id,
          oneGoodsPrice: oneGoodsPriceData,
          oneToOneCoinPrice: paymentTypeData.ONETOONE[paymentType].coinPrice // 原价
        }
      }

      if (paymentTypeData.BEAR) {
        const paymentType = bearGoodsPrice.paymentType
        const priceData = bearGoodsPrice[priceTypeMap[paymentType]]
        let bearGoodsPriceData = { paymentType } // 支付包id
        if (typeof priceData === 'object') {
          bearGoodsPriceData = { ...bearGoodsPriceData, ...priceData }
        } else {
          bearGoodsPriceData[priceTypeMap[paymentType]] = priceData
        }
        payload = {
          ...payload,
          paymentIdBear: paymentTypeData.BEAR[paymentType].id,
          bearGoodsPrice: bearGoodsPriceData,
          bearCoinPrice: paymentTypeData.BEAR[paymentType].coinPrice
        }
      }

      delete payload.choiceGoods

      if (type === 'editGoods') {
        payload = {
          ...row,
          ...payload
        }
      }
      console.log('payload', payload)
      // return
      this.$emit('handleDrawerVis', '', payload)
    },
    onFormChange(newVals, oldVals) {
      // 兑换方式
      if (newVals.paymentType && newVals.paymentType !== oldVals.paymentType) {
        const visObj = { classPrice: false, coinPrice: false, cashPrice: false, coinAndCashPrice: false }

        visObj[priceTypeMap[newVals.paymentType]] = true
        this.$refs.formRef.set({
          type: 'visible',
          data: { ...visObj }
        })

        const paymentTypeData = this.selectedGoodsData?.paymentTypeData
        if (paymentTypeData) {
          // 商品金币兑换价格
          if (paymentTypeData.ONETOONE) {
            const { coinPrice } = paymentTypeData.ONETOONE[newVals.paymentType]
            this.oneToOneCoinPrice = coinPrice
          }
          if (paymentTypeData.BEAR) {
            const { coinPrice } = paymentTypeData.BEAR[newVals.paymentType]
            this.bearCoinPrice = coinPrice
          }
        }
      }
    },
    handleDialogVis(type, data) {
      if (type && !this.$refs.formRef.form.goodsType) {
        this.$message.error('请先选择商品类型！')
        return
      }
      this.dialogType = type || ''
      this.selectedGoodsData = data || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  ::v-deep .el-form-item__label {
    width: 110px !important
  }
}
</style>
