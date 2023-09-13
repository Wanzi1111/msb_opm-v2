<template>
  <div>
    <div v-loading="loadings._ums_meixiu_api_im_g_v2_collectactivity_addAndUpdate" class="app-container">
      <basics-form ref="form" :forms="forms" :actions="actions" @submitForm="submitForm">

        <template slot="good" slot-scope="scope" class="form-item">
          <span style="color: #ff4949;margin-right: 4px;font-size: 18px;position: relative;bottom: -33px;">*</span>
          <el-form-item :label="scope.item.label" style="margin-left: 18px;">
            <el-button size="mini" style="margin-left: 8px" type="primary" @click="selectGoods">选择商品</el-button>
            <div v-if="selectData.goodsName" style="margin-left: 75px;">
              已选：<span style="color:#1790ff;font-size:13px">{{ selectData.goodsName }}</span> &nbsp;&nbsp;
              现有库存：<span style="color:#1790ff;font-size:13px">{{ selectData.orderStockNum || selectData.surplus }}</span>件
            </div>
          </el-form-item>
        </template>
        <template slot="configTotalNumber" slot-scope="scope" class="form-item">
          <el-form-item label="参与人数" style="margin-left: 18px;">
            <div class="configItem" style="margin-bottom: 10px">
              <el-input v-model="scope.form.activityUserTotalNum" placeholder="请填写参与人数" style="width:300px; margin: 0px 10px" type="number" @input="countCoins" />
            </div>
          </el-form-item>
        </template>
        <template slot="configGood" slot-scope="scope" class="form-item">
          <span style="color: #ff4949;margin-right: 4px;font-size: 18px;position: relative;bottom: -33px;">*</span>
          <el-form-item label="夺宝配置" style="margin-left: 18px;">
            <div style="margin-left: 70px">
              <div class="configItem" style="margin-bottom: 10px">
                <el-checkbox v-model="scope.form.configGoods.oneExchangePriceChecked">美术宝1V1</el-checkbox>
                <el-input v-model="scope.form.configGoods.joinOneCoin" placeholder="请输入内容" style="width:200px; margin: 0px 20px" />
                <div>金币</div>
              </div>
              <div class="configItem" style="margin-bottom: 10px">
                售价（￥{{ selectData.price || 0 }} * 汇率{{ rate }}）：{{ (selectData.price || 0) * rate }}金币
              </div>
              <div class="configItem">
                <el-checkbox v-model="scope.form.configGoods.bearExchangePriceChecked">小熊艺术&nbsp;&nbsp;</el-checkbox>
                <el-input v-model="scope.form.configGoods.joinBearCoin" placeholder="请输入内容" style="width:200px; margin: 0px 20px" />
                <div>金币</div>
              </div>
              <div class="configItem" style="margin-bottom: 10px">
                售价（￥{{ selectData.price || 0 }} * 汇率{{ rate2 }}）：{{ (selectData.price || 0) * rate2 }}金币
              </div>
            </div>
          </el-form-item>
        </template>
      </basics-form>
    </div>
    <el-dialog
      title="添加商品"
      :visible.sync="goodsVisible"
      width="950px"
    >
      <GoodsList :select="selectId" @selectRow="selectRow" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { omit } from 'lodash'
import { addMarketingPlay, getMarketingDetail } from '@/api/points-mall/marketing-play'
import { rate } from '@/api/points-mall/mall-admin'
import forms, { actions } from './forms/create'
import GoodsList from './component/GoodsList/index.vue'

export default {
  name: 'CreateMarketingPlay',
  components: { GoodsList },
  data() {
    return {
      forms: forms,
      actions: actions,
      form: {},
      goodsVisible: false,
      selectData: {},
      selectId: '',
      rate: '',
      rate2: ''
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  async mounted() {
    const { type, id } = this.$route.query
    this.typeTitle = type
    await this.getRate()
    switch (type) {
      case '新增':
        this.$nextTick(() => {
          this.$refs.form.set({
            type: 'defaultVal',
            data: {
              configGoods: {
                joinOneCoin: '',
                oneExchangePriceChecked: '',
                joinBearCoin: '',
                bearExchangePriceChecked: ''
              },
              activityUserTotalNum: ''
            }
          })
        })
        break
      case '编辑':
        this.getMarketingDetail({ id: parseInt(id) })
        this.detailId = id
        break
      case '复制':
        this.getMarketingDetail({ id: parseInt(id) })
        break
    }
  },
  methods: {
    // 获取活动详情
    async getMarketingDetail(data) {
      const res = await getMarketingDetail(data)
      const { joinOneCoin, joinBearCoin, activityCtime, goodsEpc, activityImg, activityCodeNo, price, goodsCouponInfoId, activityDesc } = res.payload
      const val = {
        ...res.payload,
        dateTimePicker: [],
        rate: 1,
        goodsEpc: goodsEpc || goodsCouponInfoId,
        activityImg: activityImg?.split(',')[0],
        homePageImg: activityImg?.split(',')[1] || '',
        activityCtime: moment(parseInt(activityCtime)).format('YYYY/MM/DD hh:mm:ss'),
        lootFrequency: activityCodeNo,
        configGoods: {
          joinOneCoin,
          oneExchangePriceChecked: !!joinOneCoin,
          joinBearCoin,
          bearExchangePriceChecked: !!joinBearCoin
        }
      }
      this.selectId = goodsEpc
      this.selectData = { price, goodsEpc, isInkind: goodsEpc ? 1 : 0, id: goodsCouponInfoId }
      this.$nextTick(() => {
        this.$refs.form.recoveryForm(val)
        // 强制回显
        this.$refs.form.set({
          type: 'defaultVal',
          data: { activityDesc }
        })
      })
    },
    // 选择商品
    selectGoods() {
      this.goodsVisible = true
    },
    getRate() {
      const _this = this
      rate({ businessType: 'ONETOONE' }).then(res => {
        res.payload.forEach(item => {
          if (item.paymentType === 'COIN') {
            _this.rate = item.fixedRate
          }
        })
      })
      rate({ businessType: 'BEAR' }).then(res => {
        res.payload.forEach(item => {
          if (item.paymentType === 'COIN') {
            _this.rate2 = item.fixedRate
          }
        })
      })
    },
    // 计算金币
    countCoins() {
      const number = Math.ceil((this.selectData.price) * this.rate / this.$refs.form.form.activityUserTotalNum)
      const number2 = Math.ceil((this.selectData.price) * this.rate2 / this.$refs.form.form.activityUserTotalNum)
      this.$refs.form.set({
        type: 'defaultVal',
        data: {
          configGoods: {
            joinOneCoin: number > 0 && number !== Infinity ? number : '',
            joinBearCoin: number2 > 0 && number2 !== Infinity ? number2 : ''
          }
        }
      })
    },
    // 提交投放表单
    async submitForm(values) {
      // isInkind 1实物 0卡密
      const { isInkind, id } = this.selectData
      let val = {
        ...values,
        activityCtime: moment(values.activityCtime).valueOf(),
        activityUserTotalNum: parseFloat(values.activityUserTotalNum),
        joinOneCoin: values.configGoods.joinOneCoin && values.configGoods.oneExchangePriceChecked ? parseFloat(values.configGoods.joinOneCoin) : 0,
        joinBearCoin: values.configGoods.joinBearCoin && values.configGoods.bearExchangePriceChecked ? parseFloat(values.configGoods.joinBearCoin) : 0,
        activityImg: `${values.activityImg},${values.homePageImg}`,
        activityType: 'JF_DUOBAO',
        isInkind,
        limitBusinessTypes: ''
      }
      // 卡密商品传goodsCouponInfoId，实物传goodsEpc
      if (!isInkind) {
        val.goodsCouponInfoId = +id
        delete val.goodsEpc
      }
      if (this.detailId) {
        val.parentId = this.detailId
      }
      val = omit(val, ['configGoods', 'time', 'homePageImg'])
      try {
        await addMarketingPlay(val)
        this.$message({
          message: `${this.typeTitle}活动成功。`,
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({ path: '/points-mall/marketing-play', query: { id: '1' }})
        }, 200)
      } catch (error) {
        console.log(error.errors)
      }
    },
    // 选择行
    selectRow(row) {
      this.selectData = row
      this.goodsVisible = false
      //  设置选择id
      this.$refs.form.set({
        type: 'defaultVal',
        data: {
          // 区分实物 || 卡密
          goodsEpc: +row.isInkind ? row.productCode : row.id
        }
      })
      // 计算金币
      this.countCoins()
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-form-item__error {
    position: static !important;
  }
  .configItem{
    display: flex;
    margin-left: 8px;
  }
  .ad-container {
    padding: 20px;
  }
  .materiel-list {
    margin: 0 -10px 30px 0;
    padding: 0;
    max-height: 330px;
    overflow: auto;

    &:after {
      content: '';
      display: block;
      clear: both;
    }
    li {
      list-style: none;
      float: left;
      width: 225px;
      height: 150px;
      margin-right: 15px;
      margin-bottom: 15px;
      border: 1px dashed #ddd;
      box-sizing: border-box;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      &:hover {
        border: 1px dashed #89c3f9;
        img, video {
          transform: scale(1.1);
        }
        .materiel-info-item__content {
          top: 50px;
        }
      }
      img, video {
        float: left;
        width: 225px;
        transition: all .35s;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
      .materiel-check {
        z-index: 10;
        width: 100%;
        height: 100%;
        display: flex;
        text-align: center;
        justify-content: center;
        position: absolute;
        align-items: center;
        background-color: rgba(255,255,255,.5);
        border: 1px solid #89c3f9;
        box-sizing: border-box;
        i {
          font-size: 50px;
          color: #1890ff;
          cursor: pointer;
        }
      }
    }
    .img-check {
      border-color: #FFF;
      &:hover {
        border-color: #FFF;
      }
    }
    .materiel-info-item__content {

      z-index: 0;
      position: absolute;
      width: 100%;
      height: 100px;
      background-color: rgba(0,0,0,.3);
      color: #FFFFFF;
      padding-left: 15px;
      padding-top: 10px;
      left: 0;
      top: 150px;
      transition: all .35s;
      p {
        margin: 4px 0;
      }
    }
  }
  .materiel-action {
    display: flex;
    justify-content: center;
    vertical-align: middle;
    >div {
      margin: 0 5px;
    }
  }
  .put-success {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #4CAF50;
    margin-bottom: 30px;
    i {
      font-size: 32px;
    }
  }
  .put-select {
    margin-bottom: 30px;
    padding-left: 30px;
  }

  .put-select-group {
    ::v-deep .el-checkbox {
      margin-bottom: 10px;
    }
  }
  .put-action {
    text-align: center;
  }

  .form-item {
    display: flex;
    ::v-deep .el-form-item__content {
      display: flex;
      align-items: center;
      vertical-align: middle;
      // width: 300px;
    }
    ::v-deep .el-form-item__label {
      display: flex;
      width: 86px !important;
      margin-right: 10px;
      align-items: center;
      justify-content: flex-end;
      align-self: flex-start;
      line-height: 1.3;
      min-height: 36px;
      vertical-align: middle;
      flex-shrink: 0;
    }
  }
  .form-item-element {
    flex: 1;
    .materiel-info-item__content {
      p {
        margin: 4px 0;
        line-height: 18px;
        color: #333333;
      }
    }
  }

  .media-item {
    overflow: hidden;
    border: 1px solid #f6f6f6;
    width: 300px;
    height: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img,
    video {
      position: absolute;
      z-index: 1;
      width: 300px;
      height: 200px;
      cursor: pointer;
      outline: none;
    }
    svg {
      font-size: 50px;
      z-index: 2;
      color: #1890ff;
      cursor: pointer;
    }
  }
  .media-upload-update {
    cursor: pointer;
    width: 100%;
    height: 36px;
    position: absolute;
    top: 0;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.3);
    color: #1790ff;
    z-index: 10;
    transition: all 0.35s;
    &:hover {
      background-color: #1790ff;
      color: #fff;
    }
  }
  .media-upload {
    cursor: pointer;
    border: 1px dashed #ddd;
    width: 225px;
    height: 150px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    transition: all 0.35s;
    i {
      font-size: 20px;
      z-index: 2;
    }
    &:hover {
      border: 1px dashed #1890ff;
      color: #1890ff;
    }
  }

</style>
