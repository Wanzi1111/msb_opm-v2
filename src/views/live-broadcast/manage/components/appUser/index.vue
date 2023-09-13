/** 该页面需求自由度较高 */
<template>
  <div
    v-loading="loadings._ai_api_api_cs_v2_live_find_dynamicQueryOptions"
    class="user"
  >
    <div class="user-not-purchased" style="padding: 20px 0; height: auto">
      <el-checkbox v-model="formData.allUser">全量用户</el-checkbox>
    </div>
    <div class="user-not-purchased">
      <p>未购课用户</p>
      <el-checkbox v-model="formData.visitor">游客</el-checkbox>
      <el-checkbox v-model="formData.registerNotBuy">已注册未购课</el-checkbox>
    </div>
    <div class="user-purchased">
      <div class="user-purchased-scheduling">
        <p>排期开课-购课用户</p>
        <span class="demonstration">选项：</span>
        <el-cascader
          v-model="listData.termOptions"
          :options="options.termCascadeOptions"
          :props="pro"
          collapse-tags
          clearable
        />
      </div>
      <div class="user-purchased-scheduling">
        <p>即时开课-购课用户</p>
        <span class="demonstration">选项：</span>
        <el-select v-model="listData.noTermOptions" placeholder="请选择" clearable multiple collapse-tags>
          <el-option
            v-for="item in options.noTermCascadeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="user-purchased-public">
        <p>公用属性</p>
        <div class="user-purchased-public-left">
          <span class="demonstration">课程级别：</span>
          <el-select v-model="listData.sups" placeholder="请选择" clearable multiple collapse-tags>
            <el-option
              v-for="item in options.supOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="user-purchased-public-right">
          <span class="demonstration">学习情况：</span>
          <el-select v-model="listData.teamStates" placeholder="请选择" clearable multiple collapse-tags>
            <el-option
              v-for="item in options.teamStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="mt20 user-table-border">
        <basics-action :actions="act" />
        <basics-table
          ref="table"
          :attr="attr"
          :loading="loadings._ai_api_api_cs_v2_live_find_listStudentTeamQuery"
          :columns="columns"
          :list="list"
          :get-list="getList"
          :total="total"
          :list-query="listQuery"
          @selection-change="handleSelectionChange"
        />
      </div>
      <div>
        <p>用户身份</p>
        <span class="demonstration">转化情况：</span>
        <el-select v-model="formData.userStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in options.transformOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="formData.hasTransforms" placeholder="请选择" multiple collapse-tags :disabled="formData.userStatus === 0" clearable>
          <el-option
            v-for="item in transformOptionsData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="user-purchased-appoint">
        <p>指定用户</p>
        <div>
          <el-checkbox v-model="formData.assignUser">指定用户</el-checkbox>
        </div>
        <template v-if="formData.assignUser">
          <div class="mt20">
            <el-select v-model="formData.type" style="width: 90px">
              <el-option key="1" label="学员id" value="1" />
              <el-option key="2" label="手机号" value="0" />
            </el-select>
            <el-select
              v-model="formData.assignUserIds"
              style="width: 240px"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loadings._ums_meixiu_api_play_v1_live_selectLive"
              @change="assignChange"
            >
              <el-option
                v-for="item in options.assignUserIds"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div v-loading="loadings._ai_api_api_cs_v2_live_find_assignUserQueryOptions" class="user-purchased-appoint-model mt20">
            <template v-if="formData.assignUserIds.length > 0">
              <el-tag
                v-for="item in formData.assignUserIds"
                :key="item"
                closable
                @close="handleClose(tag)"
              >
                {{ item }}
              </el-tag>
            </template>
            <div v-else class="user-purchased-appoint-model-not">
              <span>暂无数据</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <el-popover
      v-if="!formData.selectTeamIds || formData.selectTeamIds.length<1"
      v-model="visible"
      placement="top"
      width="160"
    >
      <p>如果没按班级筛选用户，系统就按以上筛选条件进行，而且筛选的人数量变多，请谨慎使用哦！</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="submit">确定</el-button>
      </div>
      <el-button slot="reference" class="mt20 mb20" type="primary">
        确认保存
      </el-button>
    </el-popover>
    <el-button v-else class="mt20 mb20" type="primary" @click="submit">
      确认保存
    </el-button>
  </div>
</template>

<script>
import columns from './list'
import { mapGetters } from 'vuex'
import { BUSINESS_TYPE } from '@/utils/enum'
import actions from './actions'
import _ from 'lodash'

const subjects = { // 将中台业务线id转换称独立业务线需求id
  104: 1,
  105: 3,
  103: 0
}
export default {
  name: 'AppUser',
  props: {
    businessId: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      visible: false,
      act: actions,
      formData: { // 表单提交内容
        allUser: false,
        type: '1',
        registerNotBuy: false,
        visitor: false,
        assignUserIds: []
      },
      listData: {}, // 列表检索
      pro: {
        multiple: true
      },
      options: {},
      supOptions: [],
      attr: {
        stripe: true
      },
      columns: columns(),
      total: 0,
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      },
      addState: false,
      examineState: false,
      actType: '',
      activeState: '105',
      newStateList: BUSINESS_TYPE,
      sign: false, // 接口查询最大数据量标记，超过则更改状态
      transformOptionsData: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    listData: {
      handler: 'getList',
      deep: true
    },
    // 监听转化的值，控制转化子集
    'formData.userStatus': function (val, oldVal) {
      if (val === 1) {
        this.transformOptionsData = this.options.transformOptions[1]?.children
      } else {
        this.transformOptionsData = []
        this.formData.hasTransforms = []
      }
    }
  },
  created() {
    console.log('this.$route', this.$route)
    this.getList()
    this.fixedQuery()
  },
  methods: {
    fixedQuery() {
      this.$api.dynamicQueryOptions({ subject: subjects[this.businessId] }).then((result) => {
        this.options = { ...result.payload }
      }).catch((err) => {
        console.log(err)
      })
    },

    submit() {
      if (this.sign) return this.$message.error('筛选条件太多，请减少条件后再保存')

      const filter = this.listData
      const ifArr = []
      let ao = { ...this.formData, filter }

      Object.keys(filter).forEach(e => filter[e].length < 1 ? ifArr.push(e) : ifArr)
      if (ifArr.length === Object.keys(filter).length) ao = _.omit(ao, ['filter'])
      this.visible = false
      this.$message.success('已保存')
      console.log('ao', ao)
      // return
      this.$emit('userChange', ao)
    },

    handleSelectionChange(val) {
      this.$set(this.formData, 'selectTeamIds', val.map(e => { return e.id }))
    },

    getList: _.debounce(function() {
      const params = { ...this.listData, ...this.listQuery, pageSize: this.listQuery.limit, subject: subjects[this.businessId] }
      this.$api.listStudentTeamQuery(params).then((res) => {
        const data = res.payload || {}
        this.list = data.content || []
        this.total = Number(data.totalElements) || 0
        this.sign = false
      }).catch(() => {
        this.sign = true
      })
    }, 1000),

    remoteMethod(query) { // 搜索下拉
      if (query !== '') {
        this.assignUserQuery(this.formData.type, query)
      } else {
        this.options.assignUserIds = []
      }
    },

    assignUserQuery: _.debounce(function (type, keyword) {
      const payload = {
        subject: subjects[this.businessId],
        type,
        keyword
      }
      this.$api.assignUserQueryOptions(payload).then((result) => {
        this.$set(this.options, 'assignUserIds', result?.payload?.options || [])
      }).catch((err) => {
        console.log(err)
      })
    }, 500),

    handleClose(tag) {
      this.formData.assignUserIds.splice(this.formData.assignUserIds.indexOf(tag), 1)
    },

    assignChange(val) {
      this.formData.assignUserIds = [...val]
    }
  }
}
</script>
<style lang="scss" scoped>
 .el-tag {
    margin: 5px 5px 0 5px;
  }
.mt20 {
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
.user {
  width: 90%;
  margin: 0 auto;
  p {
    font-size: 14px;
    color: rgb(158, 158, 158);
  }
  .demonstration {
    font-size: 14px;
  }
  .user-not-purchased {
    font-size: 14px;
    height: 70px;
    border-bottom: 1px solid #ddd;
  }
  .user-purchased {
    .user-purchased-public {
      .user-purchased-public-left {
        float: left;
        width: 300px;
      }
    }
    .user-purchased-appoint {
      .user-purchased-appoint-model {
        height: 100px;
        border: 1px solid #ddd;
        .user-purchased-appoint-model-not {
          text-align: center;
          line-height: 100px;
          font-size: 14px;
          color: #606266;
        }
      }
    }
  }
  .user-table-border{
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
}
</style>
