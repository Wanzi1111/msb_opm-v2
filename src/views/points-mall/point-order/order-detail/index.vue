<template>
  <div>
    <div v-loading="loadings._ums_meixiu_api_im_g_v2_order_orderDetail">
      <div class="app-container">
        <basics-descriptions title="订单信息" :config="orderInfo" />
      </div>
      <div class="app-container">
        <basics-descriptions title="用户信息" :config="userInfo" />
      </div>
      <div class="app-container">
        <basics-descriptions title="商品详情" :config="goodDetail">
          <template slot="goodsHeadImg" slot-scope="scope">
            <el-image style="width: 60px; height: 60px" :src="scope.item.value" :preview-src-list="[scope.item.value]" />
          </template>
        </basics-descriptions>
      </div>
      <div class="app-container">
        <basics-descriptions title="支付信息" :config="payInfo" />
      </div>
      <div v-if="$route.query.type === '实物'" class="app-container">
        <basics-descriptions title="物流信息" :config="logisInfo" />
      </div>
      <div class="app-container">
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 18px">协议内容</div>
        <basics-table
          :list="agreementRecordList"
          :columns="agreementRecordColumns"
        >
          <template slot="contractVersionPdfUrl" slot-scope="scope">
            <el-link :href="scope.row.contractVersionPdfUrl" target="_blank" type="primary">查看</el-link>
          </template>
        </basics-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { orderInfo, payInfo, logisInfo, userInfo, goodDetail, agreementRecordColumns, paymentTypeMap, paymentMethodMap } from './config'
import { getOrderDetail, getLogisticsDetail } from '@/api/point-order/point-order'
import { desensitizationAddress } from '@/utils'
import { transferPrice } from '../columns'

export default {
  name: 'OrderDetail',
  components: {},
  data() {
    return {
      orderInfo, payInfo, logisInfo, userInfo, goodDetail, paymentTypeMap, paymentMethodMap,
      agreementRecordColumns,
      agreementRecordList: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {},
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      const { id, type } = this.$route.query
      const { orderInfo, payInfo, logisInfo, userInfo, goodDetail, paymentTypeMap, paymentMethodMap } = this
      getOrderDetail({ orderId: id })
        .then(({ payload: { order, orderInfo: orderInfoData, imOrderPaymentPay, contractVersionPdfUrl, contractVersionTime }}) => {
          const { status: orderStatus } = order
          const { transactionId, paymentMethod } = imOrderPaymentPay
          const dataMap = { ...order, ...orderInfoData, orderStatus, transactionId, paymentMethod, contractVersionPdfUrl, contractVersionTime }

          let coinAmount = ''
          let paymentMethodType = ''
          if (dataMap['paymentType'] === 'COIN') {
            coinAmount = dataMap['coinAmount'] + '金币'
          } else if (dataMap['paymentType'] === 'CLASS') {
            coinAmount = dataMap['classAmount'] + '课时'
          } else if (dataMap['paymentType'] === 'CASH') {
            coinAmount = dataMap['rmbAmount'] + '元'
            paymentMethodType = paymentMethodMap[dataMap['paymentMethod']]
          } else if (dataMap['paymentType'] === 'COINANDCASH') {
            coinAmount = `${dataMap['coinAmount']}金币 + ${dataMap['rmbAmount']}元`
            paymentMethodType = `金币 + ${paymentMethodMap[dataMap['paymentMethod']]}`
          }

          [orderInfo, payInfo, userInfo, goodDetail].forEach(item => {
            item.forEach(v => {
              if (!v.static) {
                if (['goodsPrice'].includes(v.key)) {
                  v.value = coinAmount || ''
                } else if (['goodsCostPrice'].includes(v.key)) {
                  v.value = coinAmount || ''
                } else if (['payable'].includes(v.key)) {
                  v.value = transferPrice('payable', order)
                } else if (v.key === 'discount') {
                  v.value = transferPrice('discount', order)
                } else if (v.key === 'discountType') {
                  v.value = ['无促销', '秒杀促销', '生日月促销'][dataMap['discountType']]
                } else if (['outTradeNo'].includes(v.key)) {
                  v.value = ['CASH', 'COINANDCASH'].includes(dataMap['paymentType']) ? transactionId : dataMap['outTradeNo']
                } else if (['paymentType'].includes(v.key)) {
                  v.value = ['CASH', 'COINANDCASH'].includes(dataMap['paymentType']) ? paymentMethodType : paymentTypeMap[dataMap['paymentType']]
                } else {
                  v.value = dataMap[v.key] || ''
                }
              }
            })
          })

          this.agreementRecordList = [{ id: '1', name: '积分商城兑换协议', goodsName: dataMap.goodsName, ctime: dataMap.ctime, buyTime: dataMap.buyTime, contractVersionTime, contractVersionPdfUrl }]
        })

      if (type === '实物') {
        getLogisticsDetail({ orderId: id })
          .then(({ payload }) => {
            const { status: expressStatus } = payload
            const dataMap = { ...payload, expressStatus }
            logisInfo.forEach(v => {
              // 地址脱敏
              if (['addressDetail'].includes(v.key)) {
                const { province, city, area, addressDetail } = dataMap
                if (!addressDetail) {
                  v.value = ''
                  return
                }
                v.value = desensitizationAddress(addressDetail, `${province}${city}${area}`.length + 3)
              } else {
                v.value = dataMap[v.key] || ''
              }
            })
          })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.agreement-box {
  b, div {
    font-size: 14px;
  }
}
</style>
