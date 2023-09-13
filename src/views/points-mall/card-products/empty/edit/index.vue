<template>
  <div>
    <div class="title-container">
      <basics-title title="新增商品" line />
    </div>
    <div class="editWrap app-container">
      <p class="head">商品类型</p>
      <!-- <p class="btnTit">卡密</p> -->
      <el-radio-group v-model="type" style="margin-bottom:20px;">
        <el-radio-button label="CARD_CODE">卡密</el-radio-button>
        <el-radio-button label="ACTIVITY">活动</el-radio-button>
        <el-radio-button :disabled="proType==='add'" label="CASH">现金</el-radio-button>
        <el-radio-button label="CLASS">课时</el-radio-button>
        <el-radio-button label="THIRD_COURSE">轻课</el-radio-button>
      </el-radio-group>
      <div class="titMes">基本信息</div>
      <div>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item v-if="type==='CARD_CODE'" label="商品分类" prop="countryType">
            <el-select v-model="ruleForm.countryType" :disabled="!!row" placeholder="请选择" style="width:400px">
              <el-option v-for="item in classificationList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name" maxlength="50" />
          </el-form-item>
          <el-form-item label="卖点描述">
            <el-input v-model="ruleForm.describe" maxlength="50" />
          </el-form-item>
          <el-form-item
            class="avatarWrap"
            label="商品列表图"
            prop="listImg"
            :rules="[{ required: true }]"
          >
            <custom-Upload
              :edit-img="ruleForm.listImg"
              :is-desc="'listImgs'"
              @uploadImg="handleUpload1"
            />
          </el-form-item>
          <el-form-item
            v-if="type!=='ACTIVITY'"
            class="imgBorder"
            label="轮播图"
            prop="logoImg"
            :rules="[{ required: true }]"
          >
            <img-load
              :edit-img="ruleForm.logoImg"
              :is-desc="'logoImgs'"
              :logo-arr="logoArr"
              @uploadImg="handleUpload2"
              @uploadImg1="handleUpload3"
            /></el-form-item>
        </el-form>
      </div>
      <div class="titMes">销售信息</div>
      <div class="maiLine">
        <span>售卖信息</span>
        <el-form
          ref="dynamicValidateForm"
          :model="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <el-form-item
            v-if="type==='CLASS'"
            prop="classtime"
            label="课时"
            :rules="[{ required: true }]"
          >
            <el-select v-model="dynamicValidateForm.goodsType">
              <el-option label="1对1课时" value="ONE_CLASS" />
              <el-option label="小班课课时" value="SMALL_CLASS" />
              <el-option label="美育课半年类型" value="MEIYU_HALF_CLASS" />
              <el-option label="美育课一年类型" value="MEIYU_ONE_CLASS" />
            </el-select>

            <el-select v-model="dynamicValidateForm.classtime">
              <el-option v-for="item in 5" :key="item" :label="item" :value="item+''" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="type==='THIRD_COURSE'"
            prop="courseId"
            label="课程"
            :rules="[{ required: true }]"
          >
            <el-select v-model="dynamicValidateForm.supplier">
              <el-option v-for="item in supplierData" :key="item.label" :label="item.label" :value="item.value" />
            </el-select>

            <el-select v-model="dynamicValidateForm.courseId">
              <el-option v-for="item in courseData[dynamicValidateForm.supplier]" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="type==='CARD_CODE' && ruleForm.countryType === 'DOMESTIC'"
            prop="cardPass"
            label="关联卡密"
            :rules="[{ required: true }]"
          />

          <span v-if="type==='CARD_CODE' && ruleForm.countryType === 'DOMESTIC'" class="relation" @click="relationDiagle">{{ textMI }}</span>

          <span v-if="type==='CARD_CODE' && ruleForm.countryType === 'DOMESTIC'">可售库存 {{ showNum }}</span>
          <el-form-item prop="price" label="售价" :rules="[{ required: true }]">
            <span class="moneyIcon">￥</span><el-input v-model="dynamicValidateForm.price" v-only-number="{max:Number.POSITIVE_INFINITY,min:0,precision:2}" />
          </el-form-item>

          <el-form-item v-if="type==='CLASS'" prop="price" label="可售库存" :rules="[{ required: true }]">
            <span class="moneyIcon">次</span><el-input v-model="dynamicValidateForm.salesNum" placeholder="每自然月" />
          </el-form-item>

          <el-form-item v-if="type==='CARD_CODE' && ruleForm.countryType === 'DOMESTIC'" prop="faceValue" label="面值">
            <span class="moneyIcon">￥</span>
            <el-input v-model="dynamicValidateForm.faceValue" />
          </el-form-item>
          <el-form-item v-if="type==='CARD_CODE' || type==='THIRD_COURSE'" style="margin-bottom: 0" prop="costPrice" label="成本价" :rules="[{ required: true }]">
            <span class="moneyIcon">￥</span><el-input v-model="dynamicValidateForm.costPrice" v-only-number="{max:Number.POSITIVE_INFINITY,min:0,precision:2}" />
          </el-form-item>
        </el-form>
      </div>
      <div v-if="type ==='ACTIVITY'" class="maiLine">
        <span>活动信息</span>
        <el-form
          ref="dynamicValidateForm1"
          :model="dynamicValidateForm1"
          label-width="100px"
          class="demo-dynamic"
        ><el-form-item prop="price" label="活动链接" :rules="[{ required: true }]">
          <el-input v-model="dynamicValidateForm1.imageText" style="width:219px" />
        </el-form-item></el-form>
      </div>
      <div v-if="type!=='ACTIVITY'" class="titMes">商品详情</div>
      <div v-if="type!=='ACTIVITY'" class="TinymceWrap">
        <span>使用规则</span>
        <Tinymce
          v-model="formContent"
          :place="'请输入使用规则'"
          class="form-item-element"
          :width="600"
          :toolbar="toolbar"
          :modify.sync="modifys"
        />
      </div>
      <div v-if="type!=='ACTIVITY'" class="TinymceWrap">
        <span>图文详情</span>
        <Tinymce
          v-model="formContent2"
          :place="'此商品的介绍文案以及使用说明文案'"
          class="form-item-element"
          :width="600"
          :toolbar="toolbar2"
          :modify.sync="modifys"
          @upload="uploadApi"
        />
      </div>

      <div>
        <el-button plain @click="back">取消</el-button>
        <el-button type="primary" plain @click="saveSubmit">保存</el-button>
      </div>
      <el-dialog title="选择卡密" :visible.sync="dialogFormVisible">
        <div class="dialogLine">
          <div>
            <el-button
              type="primary"
              @click="handleMessage"
            >管理卡密</el-button>
            <span class="Refresh" @click="handleRefresh">刷新</span>
          </div>
          <el-form :model="formDialog" class="saleMes">
            <el-form-item :label-width="formLabelWidth">
              <el-input
                v-model="formDialog.name"
                placeholder="请输入卡密"
                autocomplete="off"
              />
            </el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-form>
        </div>

        <el-table :data="gridData">
          <el-table-column property="label">
            <template slot-scope="scope">
              <el-radio
                v-model="radio"
                :label="scope.row.label"
                @change="changeCheck(scope.row)"
              />
            </template>
          </el-table-column>

          <el-table-column property="couponName" label="卡密" width="150" />
          <el-table-column label="发放数/总数量" width="200">
            <template slot-scope="scope">
              {{ scope.row.issue }} / {{ scope.row.total }}
            </template>
          </el-table-column>
          <el-table-column property="ctime" label="创建时间" />
        </el-table>
        <el-pagination
          :current-page="currentPage1"
          layout="total, prev, pager, next"
          :page-size="5"
          :total="dialogTotal"
          @current-change="handleCurrentChange"
        />
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitToSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Tinymce from '../../../Tinymce/index'
import customUpload from './Upload'
import imgLoad from './Upload/img.vue'
import { upload, getCourseListOfVender } from '@/api/common'
import moment from 'moment'
const classificationList = [
  { label: '海外商品', value: 'OVERSEAS' },
  { label: '国内商品', value: 'DOMESTIC' }
]

export default {
  components: {
    Tinymce,
    customUpload,
    imgLoad
  },
  data() {
    return {
      classificationList: classificationList,
      imageUrl: '',
      textMI: '关联卡密',
      type: 'CARD_CODE',
      ruleForm: {
        name: '',
        describe: '',
        listImg: '',
        logoImg: '',
        countryType: 'DOMESTIC'
      },
      logoArr: [],
      formContent: '',
      formContent2: '',
      toolbar: [
        'bold italic underline strikethrough,alignleft aligncenter alignright outdent indent | link'
      ],
      toolbar2: [
        'undo redo | formatselect fontselect fontsizeselect',
        'bold italic underline strikethrough | alignleft aligncenter alignright outdent indent | link | bullist numlist indent2em lineheight ,imagetools image'
      ],
      formTinymce: '',
      modifys: true,
      dynamicValidateForm: { cardPass: '', price: '', faceValue: '', classtime: '', goodsType: 'ONE_CLASS', costPrice: '', salesNum: '', supplier: '', courseId: '' },
      dynamicValidateForm1: { cardPass: '', price: '', faceValue: '', imageText: '' },
      // 表单
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      formDialog: {
        name: ''
      },
      radio: -1,
      gridData: [],
      showNum: '0',
      formLabelWidth: '120px',
      // 传进来的是新增 add的页面还是编辑
      proType: 'add',
      proId: '',
      ruleTinymce: '',
      imgTinymce: '',
      currentPage1: 1,
      dialogTotal: 0,
      loading: null,
      listImgs: 'listImgs',
      logoImgs: 'logoImgs',
      chooseMi: {},
      supplierData: [],
      courseData: {}
    }
  },
  computed: {},
  watch: {
    formContent(val) {
      console.log('val', val)
      this.ruleTinymce = val
    },
    formContent2(val) {
      console.log('val---', val)
      this.imgTinymce = val
    },
    'dynamicValidateForm.supplier': function (val, oldVal) {
      if (oldVal && val !== oldVal) {
        this.dynamicValidateForm.courseId = ''
      }
    }
  },
  created() {
    const { proType, id } = this.$route.query
    this.proType = proType || 'add'
    if (proType === 'edit') {
      this.proId = id
      this.initEdit(id)
    }
    this.getCourseListOfVender()
  },
  mounted() {},
  methods: {
    // 轻课的课程信息
    getCourseListOfVender() {
      getCourseListOfVender().then(res => {
        const { code, payload } = res
        if (code === 0) {
          for (const key in payload) {
            this.supplierData = [...this.supplierData, {
              label: key,
              value: key
            }]
            this.courseData = payload
          }
        }
      })
    },
    uploadApi: upload,
    initEdit(id) {
      const param = { goodsCouponInfoId: id }
      this.loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .getGoodsCouponInfoDetail(param)
        .then(res => {
          const { payload } = res
          this.ruleForm.name = payload.goodsName || ''
          this.ruleForm.describe = payload.description || ''
          this.ruleForm.listImg = payload.img || ''
          this.ruleForm.logoImg = payload.logo || ''
          this.ruleForm.countryType = payload.countryType
          this.logoArr = payload.logo.split(',') || []
          this.dynamicValidateForm.price = payload.price || ''
          this.dynamicValidateForm.salesNum = payload.salesNum || ''
          this.dynamicValidateForm.classtime = payload.classNum || ''
          this.showNum = payload.unissued || 0
          this.dynamicValidateForm.faceValue = payload.parValue || ''
          this.dynamicValidateForm.cardPass = payload.couponId || ''
          this.dynamicValidateForm.goodsType = payload.goodsType || ''
          this.dynamicValidateForm.costPrice = payload.costPrice || ''
          this.dynamicValidateForm.courseId = payload.courseId || ''
          this.dynamicValidateForm.supplier = payload.vender || ''
          this.payloadWrap = payload
          this.dynamicValidateForm1.imageText = payload.imageText
          this.type = payload.type
          this.formContent = payload.rule || ''
          this.formContent2 = payload.imageText || ''
          this.textMI = payload.couponName || '关联卡密'
          this.loading.close()
        })
        .catch(e => {
          this.loading.close()
        })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.radio = -1
      this.handleQueryCoupon('', val)
    },
    handleUpload1(v) {
      console.log('handleUpload1', v)
      this.ruleForm.listImg = v
    },
    handleUpload2(v) {
      console.log('handleUpload2', v)
      this.ruleForm.logoImg = v
      this.logoArr.push(v)
    },
    handleUpload3(v) {
      console.log('handleUpload3', v)
      this.logoArr.splice(v, 1)
      this.ruleForm.logoImg = this.logoArr.length === 0 ? null : this.ruleForm.logoImg
    },

    callback(value) {
      console.log('value', value)
    },
    handleInfoData(thisType) {
      if (!this.ruleForm.name) {
        this.$message.error('请输入活动名称')
        return
      }
      if (!this.ruleForm.listImg) {
        this.$message.error('请上传商品列表图')
        return
      }
      if (!this.ruleForm.logoImg && this.type !== 'ACTIVITY') {
        this.$message.error('请上传轮播图')
        return
      }
      if (!this.dynamicValidateForm1.imageText && this.type === 'ACTIVITY') {
        this.$message.error('请输入活动链接')
        return
      }
      if (!this.dynamicValidateForm.price) {
        this.$message.error('请输入售价')
        return
      }
      if (!this.dynamicValidateForm.cardPass && this.type === 'CARD_CODE' && this.ruleForm.countryType === 'DOMESTIC') {
        this.$message.error('请关联卡密')
        return
      }
      if (!this.dynamicValidateForm.classtime && this.type === 'CLASS') {
        this.$message.error('请选择课时')
        return
      }
      const params = {
        goodsName: this.ruleForm.name,
        // goodsType: this.dynamicValidateForm.goodsType,
        img: this.ruleForm.listImg,
        logo: this.logoArr.join(),
        price: this.dynamicValidateForm.price < 0 ? parseFloat(-(this.dynamicValidateForm.price)) : parseFloat(this.dynamicValidateForm.price),
        salesNum: this.dynamicValidateForm.salesNum,
        parValue: this.dynamicValidateForm.faceValue ? this.dynamicValidateForm.faceValue : 0,
        type: this.type,
        countryType: this.ruleForm.countryType,
        couponId: 0,
        goodsType: 'DEFAULT',
        courseId: this.dynamicValidateForm.courseId
      }
      if (this.type === 'ACTIVITY') {
        params.imageText = this.dynamicValidateForm1.imageText
      }
      if (this.proType !== 'add') {
        params['id'] = this.proId
      }
      if (this.type === 'CARD_CODE' || this.type === 'THIRD_COURSE') {
        params['costPrice'] = +this.dynamicValidateForm.costPrice
      }
      if (this.type === 'CARD_CODE' && this.ruleForm.countryType === 'DOMESTIC') {
        params['couponId'] = this.dynamicValidateForm.cardPass
      }
      if (this.ruleForm.describe) {
        params['description'] = this.ruleForm.describe
      }
      if (this.type === 'CLASS') {
        params['classNum'] = this.dynamicValidateForm.classtime
        params['goodsType'] = this.dynamicValidateForm.goodsType
      }
      if (this.ruleTinymce) {
        params['rule'] = this.ruleTinymce
      }
      if (this.imgTinymce && this.type !== 'ACTIVITY') {
        params['imageText'] = this.imgTinymce
      }
      // description
      this.$api
        .goodscouponEditApi(params)
        .then(res => {
          this.$router.push({ name: 'cardProducts' })
        })
        .catch(e => {})
    },
    // 点击保存
    saveSubmit() {
      this.handleInfoData('submit')
    },
    handleSearch() {
      this.handleQueryCoupon(this.formDialog.name)
    },
    relationDiagle() {
      console.log('relationDiagle!')
      this.handleQueryCoupon()
      this.dialogFormVisible = true
    },
    handleQueryCoupon(name, page = 1) {
      this.loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const params = { page, pageSize: 5 }
      if (name) {
        params['couponName'] = name
      }
      this.$api
        .queryCouponApiv1(params)
        .then(res => {
          const { payload } = res
          this.dialogTotal = Number(payload.totalElements)

          payload.content &&
            payload.content.forEach((element, index) => {
              element['label'] = index
              console.log(moment(1622281251166).format('YYYY-MM-DD HH:mm:ss'))
              element.ctime = element.ctime ? moment(Number(element.ctime)).format('YYYY-MM-DD HH:mm:ss') : ''
            })
          this.gridData = payload.content
          console.log('res', res)
          this.loading.close()
        })
        .catch(e => {
          this.loading.close()
        })
    },
    handleMessage() {
      this.$router.push({
        name: 'cardLibrary'
      })
    },
    handleRefresh() {
      this.handleQueryCoupon()
    },
    changeCheck(val) {
      console.log('changeCheck!', val)
      this.dynamicValidateForm.cardPass = val.id
      this.chooseMi = val
      this.showNum = val.unissued || 0
    },
    // 选择图片
    submitToSave() {
      this.dialogFormVisible = false
      this.textMI = this.chooseMi.couponName
        ? this.chooseMi.couponName
        : '关联卡密'
      // this.handleInfoData("submit");
    },
    back() {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.btnTit {
  width: 130px;
  padding: 13px 20px;
  color: #fff;
  text-align: center;
  background: #2390ff;
}
.Refresh {
  margin-left: 15px;
  color: #2390ff;
}
.editWrap {
  .demo-dynamic {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .head {
    font-weight: bold;
    font-size: 16px;
  }
  .demo-ruleForm {
    width: 500px;
    ::v-deep .el-form-item {
      margin-bottom: 20px;
    }
    ::v-deep .el-form-item__content {
      overflow: initial;
    }
  }
  .titMes {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .relation {
    margin: 0 20px;
    color: blue;
    cursor: pointer;
  }
  .TinymceWrap {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    span {
      margin-right: 20px;
      font-size: 14px;
    }
  }
  .inputWrap {
    position: relative;
    input {
      position: absolute;
    }
  }
  .avatarWrap {
    ::v-deep .el-form-item__content {
      border: none;
    }
  }
  .imgBorder {
    ::v-deep .el-form-item__content {
      border: none;
    }
  }
  .saleMes {
    display: flex;
    flex-direction: row;
    align-items: center;
    ::v-deep .el-form-item__content {
      margin-right: 15px;
    }
  }
  ::v-deep .el-input__inner {
    border: none;
  }
  ::v-deep .el-form-item {
    margin-bottom: 0;
  }
  ::v-deep .el-form-item__content {
    display: flex;
    flex-direction: row;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  ::v-deep .el-radio__label {
    display: none;
  }
  .maiLine {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
  }
  .moneyIcon {
    background: #ddd;
    width: 40px;
    text-align: center;
  }
  .dialogLine {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
}
</style>
