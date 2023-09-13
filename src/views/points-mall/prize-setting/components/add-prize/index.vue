<template>
  <div>
    <el-dialog
      title="新建商品"
      :visible.sync="vsibled"
      width="600px"
      @close="onDialogClose"
    >
      <basics-form
        ref="form"
        :forms="forms"
        :actions="actions"
        @changeForm="changeForm"
        @submitForm="submitForm"
      >
        <template slot="goodsId" slot-scope="scope">
          <el-form-item
            style="margin-left: 8px"
            label="商品选择"
            prop="goodsId"
            :rules="[{ required: true }]"
          >
            <el-button
              v-if="!scope.form.goodsId"
              style="margin-left: 5px"
              type="primary"
              size="mini"
              @click="openDl"
            >选择商品</el-button>
            <template v-else>
              <span style="color: #333333; font-size: 16px">{{
                scope.form.goodsName
              }}</span>
              <el-button
                v-if="scope.form.goodsId"
                style="margin-left: 5px"
                size="mini"
                @click="openDl"
              >重新选择</el-button>
            </template>
          </el-form-item>
        </template>
      </basics-form>
    </el-dialog>
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
        :type="$refs.form.form.goodsType"
        :business-type="form.businessType"
        :list-query="listQuery"
        :goods-supplier="form.goodsSupplier"
        @choice="choice"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { confirmConfig } from './config'
import forms, { actions } from './forms/create'
import ChoiceGoods from './ChoiceGoods'

export default {
  name: 'AddPrize',
  components: { ChoiceGoods },
  props: {
    vsibledPrize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        goodsSupplier: 'CENTERSUPPLIER',
        countryType: 'DOMESTIC',
        businessType: 'BEAR'
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      goodsType: null,
      confirmConfig,
      forms, // 深拷贝一下，防止数据被影响
      goodsState: false,
      actions: actions({ quit: this.onDialogClose })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    vsibled: {
      get() {
        return this.vsibledPrize
      },
      set() {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const { authRange } = vm.$route.query
      vm.form.businessType = authRange
    })
  },
  watch: {
    'form.businessType': function (val) {}
  },
  created() {
    const { authRange } = this.$route.query
    this.form.businessType = authRange
  },
  methods: {
    choice(row) {
      const { id, img, title } = row
      this.$nextTick(() => {
        this.$refs.form.recoveryForm({
          goodsId: id,
          goodsImg: img,
          goodsName: title
        })
      })
      this.closeDl()
    },
    changeForm(val) {
      this.goodsType = val.goodsType
      this.forms = null
      if (val.goodsType === 'CASH') {
        forms.splice(2, 1, {
          prop: 'coinNum',
          label: '金币数量',
          type: 'inputNumber',
          attr: { placeholder: '请输入金币数量' },
          rules: [{ required: true, message: '请输入金币数量' }]
        })
        this.forms = forms
      } else {
        forms.splice(2, 1, {
          prop: 'goodsId',
          label: '商品ID',
          slot: 'goodsId'
        })
      }
      this.forms = forms
    },
    submitForm(val) {
      const { activityId } = this.$route.query
      let Interface
      if (val.goodsType === 'CASH') {
        Interface = this.$api.addActivityCoinGoods
      } else {
        Interface = this.$api.addActivityGoods
      }
      Interface({
        ...val,
        activityId
      })
        .then(() => {
          this.$message.success('操作成功！')
          this.onDialogClose()
        })
        .catch((err) => {})
    },
    closeDl() {
      this.goodsState = false
      this.listQuery = {
        page: 1,
        limit: 10
      }
    },
    openDl() {
      if (!this.goodsType) return this.$message.info('请选择奖品类型')
      this.goodsState = true
    },
    onDialogClose() {
      this.$emit('update:vsibledPrize', false)
      this.$emit('getList')
      this.$nextTick(() => {
        this.$refs.form.recoveryForm({
          goodsType: null,
          goodsName: null,
          goodsId: null,
          goodsImg: null,
          prizeProbability: null
        })
      })
    }
  }
}
</script>
