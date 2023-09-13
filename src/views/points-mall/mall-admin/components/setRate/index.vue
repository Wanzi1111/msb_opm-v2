<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="350px"
    :before-close="quit"
  >
    <template slot="title">
      <span>设置汇率</span>
      <span v-if="exchangeBoolean" style="color: #333333; font-size: 13px">所输入的课时数量=1元</span>
    </template>
    <basics-form v-if="!exchangeBoolean" :key="dialogVisible" ref="addVersion" :loading="loadings['_ums_meixiu_goods_update_goods_price']" :forms="forms[0]" :actions="formActions" @submitForm="submitForm">
      <template slot="rate" slot-scope="scope">
        <el-form-item v-bind="scope.item" class="form-item">
          <el-input v-model="scope.form.rate" style="width: 300px" placeholder="请输入市场价" maxlength="9">
            <template slot="append">金币=1元</template>
          </el-input>
        </el-form-item>
      </template>
    </basics-form>
    <basics-form v-if="exchangeBoolean" :key="dialogVisible" ref="addVersion" :loading="loadings['_ums_meixiu_goods_update_goods_price']" :forms="forms[1]" :actions="formActions" @submitForm="submitForm">
      <template slot="oneClassExchangePrice" slot-scope="scope">
        <el-form-item v-bind="scope.item" class="form-item">
          <el-row>
            <el-col :span="8">1V1课时：</el-col>
            <el-col :span="16"><el-input v-model="scope.form.oneClassExchangePrice" placeholder="请输入课时数量" maxlength="9" /></el-col>
          </el-row>
        </el-form-item>
      </template>
      <template slot="smallClassExchangePrice" slot-scope="scope">
        <el-form-item v-bind="scope.item" class="form-item">
          <el-row>
            <el-col :span="8">小班课课时：</el-col>
            <el-col :span="16"><el-input v-model="scope.form.smallClassExchangePrice" placeholder="请输入课时数量" maxlength="9" /></el-col>
          </el-row>
        </el-form-item>
      </template>
    </basics-form>
  </el-dialog>
</template>
<script>
import BasicsForm from '@/components/BasicsForm'
import { updateRate } from '@/api/points-mall/mall-admin'
import { mapGetters } from 'vuex'
import forms, { actions as formAct } from '../../forms/setRate'
export default {
  components: { BasicsForm },
  props: {
    exchangeBoolean: {
      default: () => {
        return false
      },
      type: Boolean
    },
    dialogVisible: {
      default: () => {
        return false
      },
      type: Boolean
    },
    businessType: {
      default: () => {
        return ''
      },
      type: String
    }
  },
  data() {
    return {
      forms: forms,
      formActions: formAct({ quit: this.quit })
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    newStateList() {
      return this.$store.getters.mallConfig.businessType
    }
  },
  methods: {
    submitForm(item) {
      const businessType = this.newStateList[this.businessType] && this.newStateList[this.businessType].businessType || this.businessType
      const fixedRate = item.rate
      const oneFixedRate = item.oneClassExchangePrice
      const smallfixedRate = item.smallClassExchangePrice
      if (!this.exchangeBoolean) {
        updateRate({ businessType, fixedRate, paymentType: 'COIN' }).then(res => {
          this.$emit('setRate')
        })
      } else {
        updateRate({ businessType, paymentType: 'CLASS', oneclassType: 'ONECLASS', smallclassType: 'SMALLCLASS', oneFixedRate, smallfixedRate }).then(res => {
          this.$emit('setRate')
        })
      }
    },
    quit() {
      this.$emit('close')
    }
  }
}
</script>
