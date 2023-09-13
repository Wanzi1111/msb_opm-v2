<template>
  <div class="app-container">
    <basics-block
      v-loading="loadings._ums_meixiu_api_im_g_v1_marketing_update_imActivity"
      :title="title"
    >
      <basics-form
        ref="form"
        :forms="forms"
        :actions="actions"
        @submitForm="submitForm"
      >
        <!-- 参与规则 -->
        <template slot="amount" slot-scope="scope" class="form-item">
          <p>参与规则</p>
          <el-form-item
            label="抽奖门槛"
            style="margin-left: 18px"
            :rules="[{ required: true, message: '请输入抽奖门槛' }]"
          >
            <div class="configItem" style="margin-bottom: 10px">
              <el-tooltip
                placement="top"
                class="item"
                effect="dark"
                content="仅支持设置9、19、39、59、69、99门槛，选择其他门槛需线下手动增加随机金币包"
              >
                <el-input
                  v-model="scope.form.amount"
                  placeholder="请输入正整数，不可输入负数~"
                  style="width: 300px; margin: 0px 10px"
                  type="number"
                />
                金币
              </el-tooltip>
            </div>
          </el-form-item>
        </template>
      </basics-form>
    </basics-block>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { omit } from "lodash";
import forms, { actions } from "./forms/create";

export default {
  name: "LuckDraw",
  data() {
    return {
      id: null,
      title: "新增活动",
      forms: forms,
      actions: actions,
      form: {},
    };
  },
  computed: {
    ...mapGetters(["loadings"]),
  },
  created() {
    const { type, row } = this.$route.query;
    this.title = `${type}活动`;
    switch (type) {
      case "新增":
        this.$nextTick(() => {
          this.$refs.form &&
            this.$refs.form.recoveryForm({
              code: "",
              name: "",
              time: "",
              headImg: "",
            });
          this.$refs.form &&
            this.$refs.form.set({
              type: "visible",
              data: { authRange: true },
            });
        });
        break;
      case "编辑":
        this.$nextTick(() => {
          const {
            id,
            name,
            code,
            startTimeInfo,
            endTimeInfo,
            headImg,
            amount,
          } = JSON.parse(row);
          this.id = id;
          this.$refs.form &&
            this.$refs.form.recoveryForm({
              code,
              name,
              time: [startTimeInfo, endTimeInfo],
              headImg,
              amount,
            });
          this.$refs.form &&
            this.$refs.form.set({
              type: "visible",
              data: { authRange: false },
            });
        });
        break;
    }
  },
  methods: {
    // 提交表单
    async submitForm(values) {
      const [startTime, endTime] = values.time || [];
      let payload = {
        ...values,
        // authRange: "ONETOONE,BEAR",
        startTime,
        endTime,
      };
      payload = omit(payload, ["time"]);
      const api = this.id
        ? this.$api.rvactivityUpdateActivity
        : this.$api.rvactivityAddActivity;
      if (this.id) payload.id = this.id;
      try {
        await api(payload);
        this.$message({
          message: `${this.$route.query.type}活动成功`,
          type: "success",
        });
        setTimeout(() => {
          this.bool = true;
          this.$router.push({
            path: "/points-mall/marketing-play",
            query: { id: "2" },
          });
        }, 200);
      } catch (error) {
        console.log(error.errors);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__error {
  position: static !important;
}
.configItem {
  display: flex;
  margin-left: 8px;
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
</style>
