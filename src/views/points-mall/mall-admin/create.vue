<template>
  <div>
    <div class="title-container">
      <basics-title :title="!row ? '新增商品' : '编辑商品'" line />
    </div>
    <div class="create-good app-container">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <div class="base-form first">
          <p>商品类型</p>
          <el-radio-group v-model="form.type">
            <el-radio-button
              :disabled="!!row"
              label="INKIND"
            >实物</el-radio-button>
            <el-radio-button
              :disabled="!!row"
              label="CARD_CODE"
            >卡密</el-radio-button>
            <el-radio-button
              :disabled="
                !!row ||
                  form.businessType !== 'ONETOONE' ||
                  form.businessType === 'CALLIGRAPHY'
              "
              label="CLASS"
            >课时</el-radio-button>
            <el-radio-button
              :disabled="
                !!row ||
                  form.businessType === 'ONETOONE' ||
                  form.businessType === 'BEARMUSIC' ||
                  form.businessType === 'CALLIGRAPHY'
              "
              label="CASH"
            >现金</el-radio-button>
            <el-radio-button
              :disabled="
                !!row ||
                  form.businessType === 'WRITE' ||
                  form.businessType === 'BEARMUSIC' ||
                  form.businessType === 'CALLIGRAPHY'
              "
              label="THIRD_COURSE"
            >轻课</el-radio-button>
          </el-radio-group>
        </div>
        <div class="base-form">
          <p>基本信息</p>
          <el-form-item label="商品归属" prop="businessType">
            <el-select
              v-model="form.businessType"
              :disabled="!!row"
              placeholder="请选择"
              @change="relaMove"
            >
              <el-option
                v-for="item in newType"
                :key="item.id"
                :label="item.name"
                :value="item.businessType"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="form.type == 'INKIND'"
            label="所属平台"
            prop="title"
          >
            <el-select
              v-model="form.goodsSupplier"
              :disabled="!!row"
              placeholder="请选择"
            >
              <el-option :key="0" label="美术宝" value="CENTERSUPPLIER" />
              <el-option :key="1" label="经发鸿源" value="THIRD_HONGYUNA" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="form.type === 'CARD_CODE'"
            label="商品分类"
            prop="businessType"
          >
            <el-select
              v-model="form.countryType"
              placeholder="请选择"
              @change="relaMove"
            >
              <el-option
                v-for="item in classificationList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品选择" prop="type">
            <!-- <el-button type="primary" icon="el-icon-plus" @click="openDl">选择商品</el-button>
          <div class="select-good">
            <div>已选：</div>
            <div class="good">
              <span>商品1</span>
            </div>
          </div> -->
            <el-button
              v-if="!(goods && Object.keys(goods).length)"
              style="margin-left: 5px"
              type="primary"
              size="mini"
              @click="openDl"
            >选择商品</el-button>
            <template v-else>
              <span style="color: #333333; font-size: 16px">{{
                goods.goodsName
              }}</span>
              <el-button
                v-if="goods && Object.keys(goods).length"
                style="margin-left: 5px"
                size="mini"
                :disabled="!!row"
                @click="openDl"
              >重新选择</el-button>
            </template>
          </el-form-item>
          <el-form-item
            v-if="form.type == 'INKIND'"
            label="商品标题"
            prop="title"
          >
            <el-input v-model="form.title" style="width: 195px" />
          </el-form-item>
          <el-form-item label="商品分类">
            <div class="item-class">
              <el-cascader
                :key="cascaderKey"
                v-model="form.categoryId"
                :options="options"
                :props="props"
                collapse-tags
                clearable
                :loading="
                  loadings[
                    '_ums_meixiu_api_im_g_v1_admin_category_getCategorys'
                  ]
                "
              />
              <div class="text">
                <span @click="toClassified">分类管理</span> ｜
                <span @click="refresh">刷新</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-show="form.type === 'CARD_CODE'" label="商品地区">
            <el-select v-model="form.goodsRegion">
              <el-option label="无需收集" value="NONEED" />
              <el-option label="需要收集" value="NEED" />
            </el-select>
            <el-select
              v-if="
                form.goodsRegion === 'NEED' && form.countryType === 'OVERSEAS'
              "
              v-model="form.goodsRegionIds"
              multiple
              collapse-tags
              placeholder="请选择国家"
            >
              <el-option
                v-for="v in countries"
                :key="v.number + v.name"
                :label="v.name"
                :value="v.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="
              form.type === 'CARD_CODE' && form.countryType === 'DOMESTIC'
            "
            label="自动核销"
          >
            <el-radio-group v-model="form.automaticUsed">
              <el-radio label="NOUSED">无需自动核销</el-radio>
              <el-radio label="USED">需要核销</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="base-form">
          <p>销售信息</p>
          <el-form-item
            v-show="form.type !== 'CLASS'"
            label-width="100px"
            prop="inventory"
            label="售卖信息 库存"
          >
            <!-- <el-input-number v-model="form.inventory" controls-position="right" :min="0" /> -->
            <template v-if="form.type == 'INKIND'">
              <!-- <span class="text-span">可分配库存:{{ goods.surplusNum }}</span> -->
              <span
                v-if="!(!!row && stockNumList.productState === 3)"
                class="text-span"
              >总库存:{{ goods.orderStockNum || goods.stockNum || 0 }}</span>
              <span class="text-span">市场价格（划线价）:¥ {{ goods.marketPrice }}</span>
              <span class="text-span">标准价（售价）:¥ {{ goods.stdPrice }}</span>
            </template>
            <template v-else>
              <!-- <span class="text-span">可分配库存:{{ goods.surplus }}</span> -->
              <span class="text-span">总库存:{{ goods.total || goods.surplus }}</span>
              <span class="text-span">售价:¥{{ goods.price }}</span>
              <span class="text-span">面值:¥{{ goods.parValue }}</span>
            </template>
          </el-form-item>
          <el-form-item
            v-show="form.type === 'CLASS'"
            label-width="100px"
            prop="inventory"
            label="售卖信息"
          >
            <span class="text-span">课时: {{ goods.classNum }}</span>
            <span class="text-span">售价:¥{{ goods.price }}</span>
          </el-form-item>
          <el-form-item
            label-width="100px"
            prop="specialRules"
            :rules="isRequired ? rules.specialRules : [{ required: false }]"
            label="特殊规则"
          >
            <el-select
              v-model="form.specialRules"
              placeholder="请选择"
              class="sel-rule"
            >
              <el-option label="无" value="NON" />
              <el-option
                v-show="
                  form.type !== 'INKIND' &&
                    form.businessType === 'ONETOONE' &&
                    form.type !== 'CASH'
                "
                label="1对1-写字课"
                value="EXIST"
              />
              <el-option
                v-for="(item, index) in typeEunm"
                :key="index"
                :label="item.ruleName"
                :value="item.eunm"
              />
            </el-select>
          </el-form-item>

          <el-form-item label-width="100px" label="商品兑换">
            <el-checkbox
              v-model="form.coin.exhibitionStatus"
              :disabled="
                form.class.exhibitionStatus ||
                  form.cash.exhibitionStatus ||
                  form.coinAndCash.exhibitionStatus
              "
              style="margin-right: 10px"
            />
            <el-select
              v-model="form.coin.paymentType"
              class="sel-rule"
              @change="getRate(form.coin.paymentType)"
            >
              <el-option label="金币" value="COIN" />
              <el-option label="暂不设置" value="NO" />
            </el-select>
            <span
              v-if="form.coin.exhibitionStatus"
              style="color: #027db4; margin-left: 20px"
            >已设置为商品展示价格</span>
          </el-form-item>
          <el-form-item
            label-width="100px"
            prop="rate"
            style="position: relative; margin-left: 30px"
          >
            <el-checkbox-group
              v-model="form.coin.exchangePriceType"
              size="small"
            >
              <div class="checkbox-div">
                <el-checkbox
                  label="USP"
                  :disabled="
                    form.coin.exchangePriceType.includes('UDP') ||
                      form.coin.paymentType === 'NO'
                  "
                >售价 * 汇率</el-checkbox>
              </div>
              <div class="checkbox-div">
                <el-checkbox
                  label="UDP"
                  :disabled="
                    form.coin.exchangePriceType.includes('USP') ||
                      form.coin.paymentType === 'NO'
                  "
                >自定义</el-checkbox>
              </div>
            </el-checkbox-group>
            <div v-if="form.coin.paymentType === 'COIN'" class="text-sell">
              <span class="text-span">自动计算:{{ uspCoinPrice }}金币</span>
              <span class="text-span">（当前汇率1元={{ rate }}金币）</span>
              <span class="text-span go-set" @click="setRate">去设置</span>
            </div>
            <div v-if="form.coin.paymentType === 'COIN'" class="diy">
              <el-input v-model="udpCoinPrice" placeholder="请输入内容">
                <template slot="append">金币</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item
            v-if="form.businessType === 'ONETOONE'"
            label-width="100px"
            label=""
          >
            <el-checkbox
              v-model="form.class.exhibitionStatus"
              :disabled="
                form.coin.exhibitionStatus ||
                  form.cash.exhibitionStatus ||
                  form.coinAndCash.exhibitionStatus
              "
              style="margin-right: 10px"
            />
            <el-select
              v-model="form.class.paymentType"
              class="sel-rule"
              @change="getRate(form.class.paymentType)"
            >
              <el-option label="课时" value="CLASS" />
              <el-option label="暂不设置" value="NO" />
            </el-select>
            <label style="margin: 0 10px; color: #606266">课时类型</label>
            <el-select v-model="form.class.classPay" class="sel-rule">
              <el-option label="不限制" value="DEFAULT" />
              <el-option label="付费" value="PAY" />
              <el-option label="不付费" value="FREE" />
            </el-select>
            <span
              v-if="form.class.exhibitionStatus"
              style="color: #027db4; margin-left: 20px"
            >已设置为商品展示价格</span>
          </el-form-item>
          <el-form-item
            v-if="form.businessType === 'ONETOONE'"
            label-width="100px"
            prop="rate"
            style="position: relative; margin-left: 30px"
          >
            <el-checkbox-group
              v-model="form.class.exchangePriceType"
              size="small"
            >
              <div class="checkbox-div">
                <el-checkbox
                  label="USP"
                  :disabled="
                    form.class.exchangePriceType.includes('UDP') ||
                      form.class.paymentType === 'NO'
                  "
                >售价 * 汇率</el-checkbox>
              </div>
              <div class="checkbox-div">
                <el-checkbox
                  label="UDP"
                  :disabled="
                    form.class.exchangePriceType.includes('USP') ||
                      form.class.paymentType === 'NO'
                  "
                >自定义</el-checkbox>
              </div>
            </el-checkbox-group>
            <div v-if="form.class.paymentType === 'CLASS'" class="text-sell">
              <span class="text-span">自动计算:</span>
              <span class="text-span">1v1:{{ oneClassTime }}课时</span>
              <span class="text-span">（当前汇率1元={{ rateOneClass }}课时）</span>
              <span class="text-span">小班课:{{ smallClassTime }}课时</span>
              <span class="text-span">（当前汇率1元={{ rateSmallClass }}课时）</span>
              <span class="text-span go-set" @click="setRates">去设置</span>
            </div>
            <div v-if="form.class.paymentType === 'CLASS'" class="diy">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-input
                    v-model="oneClassExchangePrice"
                    placeholder="请输入内容"
                    type="number"
                    :step="parseInt(oneClassExchangePrice, 10) ? '1' : '0.1'"
                    @input="
                      (e) => {
                        ruelsClass(e, true)
                      }
                    "
                  >
                    <template slot="append">1v1课时</template>
                  </el-input>
                </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="smallClassExchangePrice"
                    placeholder="请输入内容"
                    type="number"
                    :step="parseInt(smallClassExchangePrice, 10) ? '1' : '0.1'"
                    @input="
                      (e) => {
                        ruelsClass(e, false)
                      }
                    "
                  >
                    <template slot="append">小班课</template>
                  </el-input>
                </el-col>
              </el-row>
            </div>
          </el-form-item>

          <el-form-item label-width="100px" label="">
            <div class="cash-price">
              <el-checkbox
                v-model="form.cash.exhibitionStatus"
                :disabled="
                  form.coin.exhibitionStatus ||
                    form.class.exhibitionStatus ||
                    form.coinAndCash.exhibitionStatus
                "
                style="margin-right: 10px"
              />
              <el-select
                v-model="form.cash.paymentType"
                class="sel-rule"
                @change="getRate(form.cash.paymentType)"
              >
                <el-option label="现金" value="CASH" />
                <el-option label="暂不设置" value="NO" />
              </el-select>
              <div v-if="form.cash.paymentType === 'CASH'" class="diyprice">
                <el-input
                  v-model="form.cash.cashPrice"
                  placeholder="请输入内容"
                >
                  <template slot="append">元</template>
                </el-input>
              </div>
              <span
                v-if="form.cash.exhibitionStatus"
                style="color: #027db4; margin-left: 20px"
              >已设置为商品展示价格</span>
            </div>
          </el-form-item>

          <el-form-item label-width="100px" label="">
            <div class="cash-price">
              <el-checkbox
                v-model="form.coinAndCash.exhibitionStatus"
                :disabled="
                  form.coin.exhibitionStatus ||
                    form.class.exhibitionStatus ||
                    form.cash.exhibitionStatus
                "
                style="margin-right: 10px"
              />
              <el-select
                v-model="form.coinAndCash.paymentType"
                class="sel-rule"
                @change="getRate(form.coinAndCash.paymentType)"
              >
                <el-option label="组合支付" value="COINANDCASH" />
                <el-option label="暂不设置" value="NO" />
              </el-select>
              <div
                v-if="form.coinAndCash.paymentType === 'COINANDCASH'"
                class="diyprice"
              >
                <el-input
                  v-model="form.coinAndCash.coinPrice"
                  placeholder="请输入内容"
                >
                  <template slot="append">金币</template>
                </el-input>
              </div>
              <div
                v-if="form.coinAndCash.paymentType === 'COINANDCASH'"
                class="diyprice"
              >
                <el-input
                  v-model="form.coinAndCash.cashPrice"
                  placeholder="请输入内容"
                >
                  <template slot="append">元</template>
                </el-input>
              </div>
              <span
                v-if="form.coinAndCash.exhibitionStatus"
                style="color: #027db4; margin-left: 20px"
              >已设置为商品展示价格</span>
            </div>
          </el-form-item>

          <el-form-item
            v-if="form.businessType === 'BEAR'"
            label-width="100px"
            prop="targetUser"
            label="用户定向"
          >
            <el-checkbox-group
              v-model="form.targetUser"
              @change="changeTargetUser"
            >
              <el-checkbox
                v-for="(item, index) in bearorienteering"
                :key="index"
                :label="item.value"
                :disabled="
                  form.targetUser.includes('default') &&
                    item.value !== 'default'
                "
              >{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label-width="100px" prop="limit" label="限购">
            <el-input
              v-model="form.limit"
              placeholder="请输入限购次数"
              class="input-with-select"
            >
              <el-select
                slot="prepend"
                v-model="form.limitType"
                placeholder="请选择"
                style="width: 110px"
              >
                <el-option label="永久限购" value="FOREEVER" />
                <el-option label="天" value="DAYS" />
              </el-select>
              <el-button slot="append">次</el-button>
            </el-input>
            <el-input
              v-if="form.limitType === 'DAYS'"
              v-model="form.days"
              placeholder="请输入限购周期"
              style="width: 170px"
            >
              <el-button slot="append">天</el-button>
            </el-input>
          </el-form-item>
          <el-form-item
            v-if="
              form.businessType === 'ONETOONE' || form.businessType === 'BEAR'
            "
            label-width="100px"
            prop="showUserType"
            label="用户定向"
          >
            <group
              :key="form.businessType"
              :row="row"
              :business-type="form.businessType"
              @groupChange="groupChange"
            />
          </el-form-item>
          <el-form-item label-width="100px" prop="status" label="上架设置">
            <el-radio-group v-model="form.status" size="small">
              <el-row>
                <el-radio label="PUTAWAY">上架</el-radio>
                <el-date-picker
                  v-if="form.status === 'PUTAWAY'"
                  v-model="form.timingTime"
                  type="datetime"
                  placeholder="选择日期时间"
                />
                <el-button
                  v-if="form.status === 'PUTAWAY'"
                  style="border: none; cursor: none"
                >不选时间默认立即上架</el-button>
              </el-row>
              <el-radio label="REMOVE">下架</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loadings['_ums_meixiu_goods_add_goods']"
            @click="submitForm"
          >{{ !row ? '立即创建' : '保存' }}</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        title="选择商品"
        :visible.sync="goodsState"
        width="80%"
        :before-close="() => closeDl()"
      >
        <choice-goods
          v-if="goodsState"
          ref="choice"
          :country-type="form.countryType"
          :type="form.type"
          :business-type="form.businessType"
          :list-query="listQuery"
          :goods-supplier="form.goodsSupplier"
          @choice="choice"
        />
      </el-dialog>
    </div>
    <set-rate
      :exchange-boolean="exchange"
      :dialog-visible="dialogVisible"
      :business-type="form.businessType"
      @close="close"
      @setRate="submitRate"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import setRate from './components/setRate'
import {
  getCategorysMapBusiness,
  rate,
  addGoods,
  singleCoupon,
  queryAllProductsFore,
  assignednum,
  transTypeEunm,
  getCountries
} from '@/api/points-mall/mall-admin'
import ChoiceGoods from './components/ChoiceGoods/index'
import Group from './components/group'

const classificationList = [
  { label: '海外商品', value: 'OVERSEAS' },
  { label: '国内商品', value: 'DOMESTIC' }
]

export default {
  name: 'MallGoodsCreate',
  components: { ChoiceGoods, setRate, Group },
  // inject: ['reload'],
  data() {
    const isvalidGood = (rule, value, cb) => {
      if (!Object.keys(this.goods).length) {
        cb(new Error('请选择商品'))
      }
      cb()
    }
    // const isvalidNum = (rule, value, cb) => {
    //   if (this.form.type === 'INKIND') {
    //     if (this.form.inventory > (this.surplusNum)) {
    //       cb(new Error('库存不能>其他业务线分配的库存数量'))
    //     }
    //   } else {
    //     if (this.form.inventory > (this.surplus)) {
    //       cb(new Error('库存不能>其他业务线分配的库存数量'))
    //     }
    //   }
    //   cb()
    // }
    return {
      props: {
        multiple: true,
        value: 'id',
        label: 'categoryName',
        children: 'childs'
      },
      cascaderKey: 0,
      classificationList: classificationList,
      exchange: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      activeState: '0',
      form: {
        goodsSupplier: 'CENTERSUPPLIER',
        goodsRegion: 'NONEED',
        countryType: 'DOMESTIC',
        type: 'INKIND',
        businessType: 'ONETOONE',
        automaticUsed: '',
        // inventory: '',
        categoryId: [],
        price: 0,
        specialRules: '', // 特殊规则
        goodsPaymentModelList: [],
        coin: {
          exhibitionStatus: null,
          paymentType: 'NO',
          // paymentType: 'COIN',
          exchangePriceType: []
        },
        class: {
          exhibitionStatus: null,
          paymentType: 'NO',
          // paymentType: 'CLASS',
          classPay: 'PAY',
          exchangePriceType: []
        },
        cash: {
          exhibitionStatus: null,
          paymentType: 'NO',
          // paymentType: 'CASH',
          cashPrice: ''
        },
        coinAndCash: {
          exhibitionStatus: null,
          paymentType: 'NO',
          // paymentType: 'COINANDCASH',
          coinPrice: '',
          cashPrice: ''
        },
        limit: '',
        parValue: 0,
        title: '',
        stockNumList: [],
        exchangePrice: '',
        status: 'PUTAWAY',
        rate: 1,
        epc: '',
        img: '',
        epcPriId: '',
        epcReferName: '',
        limitType: 'FOREEVER',
        showUserType: 'DEFAULT',
        timingTime: '',
        goodsRegionIds: [],
        classPay: 'PAY', // 是否是付费课时
        targetUser: [] // 小熊美术用户定向
      },
      oneClassExchangePrice: 0,
      smallClassExchangePrice: 0,
      uspCoinPrice: 0,
      udpCoinPrice: 0,
      rateOneClass: 0,
      rateSmallClass: 0,
      oneClassTime: 0,
      smallClassTime: 0,
      categoryIdPre: [],
      goods: {},
      id: '',
      options: [],
      dialogVisible: false,
      rules: {
        title: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
        type: [{ required: true, validator: isvalidGood, trigger: 'blur' }],
        businessType: [
          { required: true, message: '请选择商品归属', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        specialRules: [
          { required: true, message: '请选择特殊规则', trigger: 'blur' }
        ]
      },
      row: '',
      totalNum: 50,
      assignment: 10,
      goodsState: false,
      rate: '',
      stockNumList: [],
      typeEunm: [],
      isRequired: false,
      countries: []
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    lisen() {
      const { businessType, type, goodsSupplier } = { ...this.form }
      return { businessType, type, goodsSupplier }
    }
  },
  watch: {
    lisen: {
      handler: function (newV, oldV) {
        if (newV.type === 'CASH' && newV.type !== oldV.type) {
          this.isRequired = true
        } else {
          this.isRequired = false
        }
        switch (newV) {
          case 'CLASS':
            this.newType = [
              ...this.$store.getters.mallConfig.businessType
            ].filter((item) => item.id === '1')
            break
          default:
            this.newType = this.$store.getters.mallConfig.businessType
            break
        }
        if (JSON.stringify(newV) !== JSON.stringify(oldV)) {
          // 修复watch监控bug问题，当监听对象无变化时也会触
          if (!this.row) this.form.specialRules = ''
          this.goods = {}
          this.getTransTypeEunm()
        }
      }
    }
  },
  created() {
    this.row = this.$route.query?.rows && JSON.parse(this.$route.query?.rows)
    this.activeState = this.$route.query.activeState
    this.form.businessType = this.$route.query.businessType
    if (this?.row) {
      // debugger
      let form = {}
      const {
        title,
        limit = '',
        type,
        status,
        countryType,
        goodsRegion,
        goodsRegionIds,
        exchangePrice,
        specialRules,
        showUserType = '',
        paymentType,
        businessLineId,
        epcReferName,
        goodsCategorie,
        price,
        parValue,
        marketPrice,
        epcPriId,
        epc,
        slideshow,
        description,
        automaticUsed,
        goodsSupplier,
        imageText,
        classPay,
        targetUser,
        limitType,
        categoryOfUpdate,
        imGoodsPaymentList,
        groupIds,
        days
      } = this.row
      const categoryIds = []

      goodsCategorie &&
        goodsCategorie.forEach((item) => {
          categoryIds.push(+item.id)
        })
      // console.log(imGoodsPaymentList, 'imGoodsPaymentList')
      for (let index = 0; index < imGoodsPaymentList.length; index++) {
        const i = imGoodsPaymentList[index]
        i.exhibitionStatus = !!(
          !i?.exhibitionStatus || i?.exhibitionStatus === 'SHOW'
        )
        i.exchangePriceType = ['COIN', 'CLASS'].includes(i.paymentType)
          ? [i.exchangePriceType]
          : null
        // 课时数据映射赋值
        if (i.paymentType === 'CLASS' && i?.exchangePriceType[0] === 'UDP') {
          // 自定义
          this.oneClassExchangePrice = i.oneClassExchangePrice
          this.smallClassExchangePrice = i.smallClassExchangePrice
        } else if (
          i.paymentType === 'CLASS' &&
          i?.exchangePriceType[0] === 'USP'
        ) {
          // 汇兑
          this.oneClassTime = i.oneClassExchangePrice
          this.smallClassTime = i.smallClassExchangePrice
        }
        // 金币数据映射赋值
        if (i.paymentType === 'COIN' && i?.exchangePriceType[0] === 'UDP') {
          // 自定义
          this.udpCoinPrice = i.coinPrice
        } else if (
          i.paymentType === 'COIN' &&
          i?.exchangePriceType[0] === 'USP'
        ) {
          // 汇兑
          this.uspCoinPrice = i.coinPrice
        }
      }
      form = {
        title,
        limit,
        type,
        status,
        countryType,
        goodsRegion,
        exchangePrice,
        specialRules,
        showUserType,
        paymentType,
        businessType: businessLineId,
        automaticUsed,
        categoryIdPre: [],
        goodsSupplier,
        goodsRegionIds: goodsRegionIds?.length ? goodsRegionIds.split(',') : [],
        classPay,
        targetUser: targetUser?.length ? targetUser.split(',') : ['default'],
        limitType,
        categoryOfUpdate,
        coin:
          imGoodsPaymentList?.find((val) => val.paymentType === 'COIN') ||
          this.form.coin,
        class:
          imGoodsPaymentList?.find((val) => val.paymentType === 'CLASS') ||
          this.form.class,
        cash:
          imGoodsPaymentList?.find((val) => val.paymentType === 'CASH') ||
          this.form.cash,
        coinAndCash:
          imGoodsPaymentList?.find(
            (val) => val.paymentType === 'COINANDCASH'
          ) || this.form.coinAndCash,
        groupIds,
        days
      }
      console.log(imGoodsPaymentList)
      if (categoryIds.length) {
        form = {
          ...form,
          categoryId: categoryOfUpdate,
          categoryIdPre: categoryIds
        }
      }

      this.form = form

      this.goods.goodsName = epcReferName
      this.goods.productName = epcReferName
      if (type === 'INKIND') {
        this.goods = {
          ...this.goods,
          stdPrice: price,
          marketPrice: parValue,
          parValue: marketPrice,
          id: epcPriId,
          productCode: epc,
          slideshow,
          description,
          imageText
        }
      } else {
        this.goods = {
          ...this.goods,
          price,
          epc,
          id: epcPriId,
          parValue
        }
      }
      this.getStockNum()
      this.choice({ ...this.goods })
      this.getRate('', true)
    }
    this.getTransTypeEunm()
    this.getRate()
    this.newStateList()
    this.getCountries()
  },

  mounted() {
    this.getCategorysMapBusiness()
  },

  methods: {
    // 子组件动态传递字段 需要新增直接在子组件新增即可，不需要改动此处
    groupChange(val) {
      Object.keys(val).forEach((e) => {
        this.form[e] = val[e]
      })
    },
    // 获取国家列表
    getCountries() {
      getCountries().then((res) => {
        this.countries = res.payload
      })
    },
    setRate() {
      this.exchange = false
      this.dialogVisible = true
    },
    setRates() {
      this.exchange = true
      this.dialogVisible = true
    },
    getTransTypeEunm() {
      const { businessType, type } = this.form
      const data = {
        businessType,
        type
      }
      transTypeEunm(data)
        .then((res) => {
          this.typeEunm = res.payload || []
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    newStateList() {
      this.newType = this.$store.getters.mallConfig.businessType
    },
    relaMove() {
      this.getCategorysMapBusiness()
      this.getRate()
      this.form.categoryId = []
    },
    // 获取经发鸿源商品
    getRealList() {
      const { page, limit: pageSize } = this.listQuery
      this.$api
        .queryThirdGoods({
          page,
          pageSize,
          epcReferName: this.row.epc,
          goodsCouponStatus: 'ENABLE'
        })
        .then((res) => {
          const {
            code,
            status,
            payload: {
              content: [first]
            }
          } = res
          if (code !== 0) {
            this.$message.error(status)
            return
          }
          this.$set(this.goods, 'stockNum', first.stockNum)
        })
    },
    getStockNum() {
      // const { listQuery } = this
      const data = {
        id: this.row.epcPriId,
        businessType: this.form.businessType
      }
      if (this.row.type !== 'INKIND') {
        singleCoupon(data).then((res) => {
          const data = res.payload || {}
          this.$set(this.goods, 'surplus', data.surplus)
          this.$set(this.goods, 'total', data.total)
          this.$set(this.goods, 'classNum', data.classNum)
          // this.goods.surplus = data.surplus
          // this.goods.total = data.total
        })
      } else {
        if (this.form.goodsSupplier === 'THIRD_HONGYUNA') {
          return this.getRealList()
        } // 编辑时回显商品详情
        queryAllProductsFore({
          productCode: this.row.epc,
          page: 1,
          pageSize: 20
        }).then((res) => {
          if (res.data.rows[0]) {
            this.$set(
              this.goods,
              'ableStockNum',
              res.data.rows[0].orderStockNum
            )
            this.stockNumList = res.data.rows[0]
            this.assignednum()
          }
          // this.goods.surplusNum = res.data.rows[0] && res.data.rows[0].surplusNum
        })
      }
    },
    getRate(paymentType, flag) {
      const { businessType } = this.form
      if (paymentType === 'NO') return
      rate({ businessType, paymentType }).then((res) => {
        const _this = this
        res.payload.forEach((item) => {
          if (item.paymentType === 'COIN') {
            _this.rate = item.otherFixedRate
          } else if (item.paymentType === 'CLASS') {
            switch (item.classType) {
              case 'ONECLASS':
                _this.rateOneClass = item.otherFixedRate
                break
              case 'SMALLCLASS':
                _this.rateSmallClass = item.otherFixedRate
                break
            }
          }
        })
        // this.rate = res.payload[0].fixedRate
        // this.rateOneClass = res.payload[1].fixedRate
        // this.rateSmallClass = res.payload[2].fixedRate
        if (flag) {
          this.priceAuto()
        }
      })
    },
    refresh() {
      this.getCategorysMapBusiness()
      this.$message.success('刷新成功')
    },
    getCategorysMapBusiness() {
      // debugger
      const businessType = this.form.businessType
      getCategorysMapBusiness({ businessType }).then((res) => {
        this.$nextTick(() => {
          this.options = res.payload[businessType]
          this.cascaderKey++
        })
      })
    },
    // 保存
    submitForm(val) {
      const regular = /^[0-9]([0-9]+)?$/
      if (
        this.row &&
        this.row.goodsCouponStatus === 'UNABLE' &&
        this.form.status === 'PUTAWAY'
      ) {
        this.$message.error('已停用的商品不能上架')
        return
      }
      if (
        this.form.goodsRegion === 'NEED' &&
        this.form.countryType === 'OVERSEAS'
      ) {
        if (!this.form.goodsRegionIds?.length) {
          this.$message.error('请选择海外国家')
          return
        }
      } else {
        this.form.goodsRegionIds = []
      }
      this.form.goodsPaymentModelList = []
      if (
        ['UDP', 'USP'].includes(this.form.coin.exchangePriceType[0]) &&
        this.form.coin.paymentType !== 'NO'
      ) {
        this.form.goodsPaymentModelList.push({
          ...this.form.coin,
          exchangePriceType: this.form.coin.exchangePriceType[0],
          exhibitionStatus: this.form.coin.exhibitionStatus ? 'SHOW' : 'HIDE'
        })
      }
      if (
        ['UDP', 'USP'].includes(this.form.class.exchangePriceType[0]) &&
        this.form.class.paymentType !== 'NO'
      ) {
        this.form.goodsPaymentModelList.push({
          ...this.form.class,
          exchangePriceType: this.form.class.exchangePriceType[0],
          exhibitionStatus: this.form.class.exhibitionStatus ? 'SHOW' : 'HIDE'
        })
      }
      // 现金不为空push数组
      if (this.form.cash.cashPrice && this.form.cash.paymentType !== 'NO') {
        this.form.goodsPaymentModelList.push({
          ...this.form.cash,
          exhibitionStatus: this.form.cash.exhibitionStatus ? 'SHOW' : 'HIDE'
        })
      }
      // 组合支付不为空push数组
      if (
        (this.form.coinAndCash.coinPrice || this.form.coinAndCash.cashPrice) &&
        this.form.coinAndCash.paymentType !== 'NO'
      ) {
        this.form.goodsPaymentModelList.push({
          ...this.form.coinAndCash,
          exhibitionStatus: this.form.coinAndCash.exhibitionStatus
            ? 'SHOW'
            : 'HIDE'
        })
      }
      for (
        let index = 0;
        index < this.form.goodsPaymentModelList.length;
        index++
      ) {
        const i = this.form.goodsPaymentModelList[index]
        // 金币自定义数据校验
        if (i.paymentType === 'COIN' && i?.exchangePriceType === 'UDP') {
          if (!regular.test(this.udpCoinPrice)) {
            return this.$message.error('请填写金币数量,且为正整数')
          }
          i.coinPrice = this.udpCoinPrice
        } else if (i.paymentType === 'COIN' && i?.exchangePriceType === 'USP') {
          i.coinPrice = this.uspCoinPrice
        }
        // 课时自定义数据校验
        if (i.paymentType === 'CLASS' && i?.exchangePriceType === 'UDP') {
          if (
            !Number(this.oneClassExchangePrice) ||
            !Number(this.smallClassExchangePrice)
          ) {
            return this.$message.error(
              '请设置所有类型的课时价格，缺一不可保存，不可为0课时~'
            )
          }
          i.oneClassExchangePrice = this.oneClassExchangePrice
          i.smallClassExchangePrice = this.smallClassExchangePrice
        } else if (
          i.paymentType === 'CLASS' &&
          i?.exchangePriceType === 'USP'
        ) {
          i.oneClassExchangePrice = this.oneClassTime
          i.smallClassExchangePrice = this.smallClassTime
        }
      }
      // 不勾选商品展示价格校验
      if (
        this.form.goodsPaymentModelList.every(
          (i) => i.exhibitionStatus === 'HIDE'
        )
      ) {
        return this.$message.error('请设置商品默认展示价格！')
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          const arr = []
          this.form.categoryId &&
            Array.isArray(this.form.categoryId) &&
            this.form.categoryId.forEach((e) => {
              const [, i] = e
              arr.push(i)
            })
          this.form.categoryId = arr
          if (
            Array.isArray(this.form.categoryId) &&
            this.form.categoryId.length > 0
          ) {
            // debugger
            this.form.categoryId = Array.from(
              new Set([].concat(...this.form.categoryId))
            ).join()
          } else {
            this.form.categoryId = ''
          }
          if (
            Array.isArray(this.form.categoryIdPre) &&
            this.form.categoryIdPre.length > 0
          ) {
            const arrId = []
            this.form.categoryIdPre.forEach((item1) => {
              if (item1 !== null && item1 !== '') {
                arrId.push(item1)
              }
            })
            this.form.categoryIdPre = arrId.join()
          } else {
            this.form.categoryIdPre = ''
          }
          // this.form.categoryIdPre = this.form.categoryIdPre ? this.form.categoryIdPre.join() : ''
          if (this.row) {
            this.form.id = this.row.id
            // this.form.categoryIdPre = this.form.id
          } else {
            this.form.categoryIdPre = ''
          }
          if (this.form.timingTime) {
            // 定时上架
            this.form.timingTime = Date.parse(this.form.timingTime)
            this.form.status = 'REMOVE'
          }
          this.form.currencyType = 'GOLDCOIN'
          this.form.targetUser = this.form.targetUser.toString()
          const form = Object.keys(this.form)
            .filter(
              (res) =>
                this.form[res] !== '' &&
                this.form[res] !== null &&
                this.form[res] !== undefined
            )
            .reduce((acc, key) => ({ ...acc, [key]: this.form[key] }), {})
          delete form.coin
          delete form.class
          delete form.cash
          delete form.coinAndCash

          console.log(form, 'form')
          addGoods(form).then((res) => {
            if (res.status === 'OK') {
              this.$message.success(`${this.row ? '编辑成功' : '新增成功'}`)
              this.$router.push({ path: '/points-mall/mall-admin' })
            }
          })
        } else {
          return false
        }
      })
    },
    ruelsClass(item, type) {
      if (Number(item) < 0) {
        if (type) {
          this.oneClassExchangePrice = 0
        } else {
          this.smallClassExchangePrice = 0
        }
      } else if (item.toString().split('.')[1]?.length > 2) {
        if (type) {
          this.oneClassExchangePrice = Number(item).toFixed(2)
        } else {
          this.smallClassExchangePrice = Number(item).toFixed(2)
        }
      }
    },
    close() {
      this.dialogVisible = false
    },
    submitRate() {
      this.$message.success('汇率设置成功')
      if (this.exchange) {
        this.getRate('CLASS', true)
      } else {
        this.getRate('COIN', true)
      }
      this.close()
    },
    openDl() {
      this.goodsState = true
    },
    closeDl() {
      this.goodsState = false
      this.listQuery = {
        page: 1,
        limit: 10
      }
    },
    choice(row) {
      // // debugger
      this.$nextTick(() => {
        this.closeDl()
        this.goods = row
        this.goods.goodsName =
          this.form.type === 'CARD_CODE' && this.form.countryType !== 'DOMESTIC'
            ? row.goodsName
            : row.productName
        if (this.form.type === 'INKIND') {
          this.form.price = row.stdPrice
          this.form.parValue = row.marketPrice
          this.form.epc = row.productCode
          this.form.epcReferName =
            this.form.type === 'CARD_CODE' &&
            this.form.countryType !== 'DOMESTIC'
              ? row.goodsName
              : row.productName
          this.form.epcPriId = row.id
          this.form.img = row.imageIconOssUrl
          this.form.slideshow = row.slideshow
          this.form.description = row.description
          this.form.imageText = row.imageText
          this.assignednum()
          if (row.imageText) {
            this.getImageTxt(row.imageText)
          }
        } else {
          this.form.price = row.price
          this.form.epcReferName = row.goodsName
          this.form.epc = row.epc
          this.form.epcPriId = row.id
          this.form.img = row.img
          this.form.parValue = row.parValue
        }

        this.priceAuto()
      })
    },
    getImageTxt(url) {
      axios.get(url).then((res) => {
        this.form.imageText = res.data
      })
    },
    assignednum() {
      // if (!this.row || (this.row && this.row.type === 'INKIND')) {
      assignednum({
        businessType: this.form.businessType,
        epc: this.goods.productCode
      }).then((res) => {
        this.$set(this.goods, 'ableStockNum', this.goods.orderStockNum)
        // this.goods.surplusNum = this.goods.totalStockNum - res.payload.assignednum
        // this.goods.surplusNum = this.goods.surplusNum ? this.goods.surplusNum : 0
      })
      // }
    },
    priceAuto() {
      // debugger
      const price = this.form.type === 'INKIND' ? 'stdPrice' : 'price'
      this.uspCoinPrice = Math.ceil(this.goods[price] * this.rate) || 0
      this.oneClassTime =
        Math.ceil(this.goods[price] * this.rateOneClass * 100) / 100 || 0
      this.smallClassTime =
        Math.ceil(this.goods[price] * this.rateSmallClass * 100) / 100 || 0
    },
    toClassified() {
      const routeData = this.$router.resolve({
        path: '/points-mall/classified-admin'
      })
      window.open(routeData.href, '_blank')
    },
    cancel() {
      this.$router.push({ path: '/points-mall/mall-admin' })
    }
  }
}
</script>
<style lang="scss" scoped>
.create-good {
  .base-form {
    margin-top: 20px;
    p {
      padding: 20px 0;
      border-bottom: 1px solid #efefef;
    }
    .select-good {
      display: flex;
      .good {
        span {
          color: #1890ff;
        }
      }
    }
    .item-class {
      display: flex;
    }
    .classification {
      border: 1px solid #dcdfe6;
      border-radius: 3px;
      width: 400px;
      overflow: scroll;
      box-sizing: border-box;
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      span {
        display: inline-block;
        background: rgba(247, 247, 247, 1);
        border-radius: 3px;
        height: 28px;
        margin: 3px;
        line-height: 28px;
        text-align: center;
        margin-left: 10px;
        padding: 0 20px;
        cursor: pointer;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.647058823529412);
        i {
          position: relative;
          left: 10px;
        }
      }
    }
    .text {
      margin-left: 20px;
      color: #027db4;
      cursor: pointer;
    }
    .diy {
      position: absolute;
      left: 89px;
      bottom: 3px;
    }
    .cash-price {
      display: flex;
    }
    .diyprice {
      margin-left: 10px;
    }
    .text-sell {
      position: absolute;
      top: -1px;
      left: 80px;
    }
    .text-span {
      color: #999;
      margin-left: 20px;
    }
    .go-set {
      color: #027db4;
      cursor: pointer;
    }
  }
  .first {
    margin: 0;
    padding: 0;
    p {
      margin-top: 0;
      padding-top: 0;
    }
  }
  .radio-div {
    margin-top: 10px;
    .el-radio {
      margin-top: 20px;
    }
  }
  .radio-div:nth-child(1) {
    margin: 0px;
    .el-radio {
      margin-top: 10px;
    }
  }
}
.input-with-select {
  width: 350px;
}
</style>
