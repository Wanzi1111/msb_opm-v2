<template>
  <div>
    <div class="title-container">
      <basics-title :title="!pageType ? '新增商品' : '修改商品'" line />
    </div>
    <div class="editWrap app-container">
      <div class="titMes">基本信息</div>
      <div>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="productName">
            <el-input v-model="ruleForm.productName" maxlength="50" />
          </el-form-item>
          <el-form-item
            class="avatarWrap"
            label="商品列表图"
            prop="listImage"
            :rules="[{ required: true }]"
          >
            <custom-Upload
              :edit-img="ruleForm.listImage"
              :is-desc="'listImgs'"
              @uploadImg="handleUpload1"
            />
          </el-form-item>
          <el-form-item
            class="imgBorder"
            label="轮播图"
            prop="slideShowImage"
            :rules="[{ required: true }]"
          >
            <img-load
              :edit-img="ruleForm.slideShowImage"
              :is-desc="'logoImgs'"
              :logo-arr="logoArr"
              @uploadImg="handleUpload2"
              @uploadImg1="handleUpload3"
            /></el-form-item>
        </el-form>
      </div>
      <div class="titMes">销售信息</div>
      <div v-loading="loadings._ums_meixiu_api_im_g_v1_admin_query_thirdProductCode" class="maiLine">
        <span>售卖信息</span>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <span v-if="!pageType" class="relation" @click="relationDiagle">➕绑定第三方商品</span>
          <span v-else style="margin: 0 20px; cursor: not-allowed">➕绑定第三方商品</span>
          <!-- <span>可售库存 {{ showNum }}</span> -->
          <el-tag v-if="ruleForm.thirdCompanyName">{{ ruleForm.thirdCompanyName }}</el-tag>
          <el-tag v-else type="danger">还未选择商品</el-tag>
          <el-form-item style="margin-bottom: 0" prop="marketPrice" label="售价" :rules="[{ required: true, message: '请输入价格' }]">
            <el-input v-model.number="ruleForm.marketPrice" v-only-number="{max:Number.POSITIVE_INFINITY,min:0,precision:2}">
              <span slot="prepend">￥</span>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0" prop="costPrice" label="成本价">
            <el-input v-model.number="ruleForm.costPrice" v-only-number="{max:Number.POSITIVE_INFINITY,min:0,precision:2}">
              <span slot="prepend">￥</span>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="titMes">商品详情</div>
      <div class="TinymceWrap">
        <span>图文详情</span>
        <Tinymce
          v-model="ruleForm.imageText"
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
      <el-dialog width="80%" title="添加商品" :visible.sync="dialogFormVisible">
        <basics-table
          ref="table"
          :attr="{stripe: true}"
          :loading="loadings._ums_meixiu_api_im_g_v1_third_hongyuan_findProductList"
          :columns="columns"
          :list="list"
          :get-list="getList"
          :total="total"
          :list-query="paginationQuery"
          :action-function="actions"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Tinymce from '../../../Tinymce/index'
import customUpload from './Upload'
import imgLoad from './Upload/img.vue'
import { upload } from '@/api/common'
import { mapGetters } from 'vuex'
import columns, { actions } from './columns/list.js'

export default {
  components: {
    Tinymce,
    customUpload,
    imgLoad
  },
  data() {
    return {
      columns,
      actions: actions({ status: this.handelStart }),
      total: 0,
      codes: [],

      type: 'CARD_CODE',
      logoArr: [],
      toolbar: [
        'bold italic underline strikethrough,alignleft aligncenter alignright outdent indent | link'
      ],
      toolbar2: [
        'undo redo | formatselect fontselect fontsizeselect',
        'bold italic underline strikethrough | alignleft aligncenter alignright outdent indent | link | bullist numlist indent2em lineheight ,imagetools image'
      ],
      modifys: true,
      ruleForm: {
        goodsCouponStatus: 'ENABLE',
        thirdCompanyCode: 'HY',
        goodsSupplier: 'THIRD_HONGYUNA',
        listImage: '',
        slideShowImage: ''
      },
      // 表单
      dialogFormVisible: false,
      rules: {
        productName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      list: [],
      showNum: '0',
      pageType: 0, // 页面类型，0新增 1修改
      loading: null,
      listImgs: 'listImgs',
      paginationQuery: { page: 1, limit: 10 }, // 分页查询query
      logoImgs: 'logoImgs'
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  created() {
    const { proType, listData } = this.$route.query
    this.pageType = Number(proType) || 0 // 页面类型，0新增 1修改
    if (listData) {
      this.ruleForm = { ...JSON.parse(listData) }
      this.logoArr = this.ruleForm.slideShowImage.split(',')
    }
  },
  mounted() {},
  methods: {
    uploadApi: upload,
    // 选择第三方商品
    handelStart(dat, row) {
      const { productCode: thirdProductCode, productName: thirdCompanyName, imageText } = row
      this.ruleForm = {
        ...this.ruleForm,
        thirdProductCode,
        thirdCompanyName,
        imageText
      }
      this.dialogFormVisible = false
    },
    // 点击保存
    saveSubmit(val) {
      // 1、CENTERSUPPLIER:中台供应商；2 THIRDSUPPLIER:三方供应商
      const { ruleForm, logoArr } = this
      if (!ruleForm.thirdProductCode) return this.$message.error('请添加商品')
      this.ruleForm = { ...ruleForm, productCode: '', slideShowImage: logoArr.join() }
      this.handleInfoData('submit')
    },
    handleUpload1(v) {
      this.ruleForm.listImage = v
    },
    handleUpload2(v) {
      this.ruleForm.slideShowImage = v
      this.logoArr.push(v)
    },
    handleUpload3(v) {
      this.logoArr.splice(v, 1)
      this.ruleForm.slideShowImage = this.logoArr.length === 0 ? null : this.ruleForm.slideShowImage
    },
    handleInfoData(thisType) {
      this.$api
        .thirdGoods(this.ruleForm)
        .then(res => { // type 0虚拟 1实物
          this.$router.push({ name: 'cardProducts', query: { type: '1' }})
          this.$message.success('保存成功')
        })
        .catch(e => {})
    },
    relationDiagle() {
      this.$api.thirdProductCode({ thirdCompanyCode: 'HY' }).then((res) => {
        const { code, payload } = res
        if (code === 0) {
          this.codes = payload
          this.getList()
          this.dialogFormVisible = true
        }
      })
    },
    getList() {
      this.loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const params = { ...this.paginationQuery }
      this.$api
        .findProductList(params)
        .then(res => {
          const { content, totalElements } = res.payload
          const productList = content.map(r => {
            r.butStatus = this.codes.some(s => r.productCode === s)
            return r
          })
          this.list = productList
          this.total = Number(totalElements)
          this.loading.close()
        })
        .catch(e => {
          this.loading.close()
        })
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
  .maiLine {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
  }
}
</style>
