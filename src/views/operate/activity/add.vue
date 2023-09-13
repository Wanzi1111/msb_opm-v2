<template>
  <div v-loading="appLoading" class="put-wrap">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <!-- 通用规则 -->
      <div class="app-container">
        <div>
          <span class="put-label">通用规则</span>
        </div>
        <div class="put-item">
          <el-form-item label="业务线" prop="businessType">
            <el-select v-model="form.businessType" clearable>
              <el-option
                v-for="item in businessTypeLabels"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="activityTypeId">
            <el-select v-model="form.activityTypeId" clearable>
              <el-option
                v-for="item in activityTypeIdLabels"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            prop="activityName"
            label="活动标题"
          >
            <el-input v-model="form.activityName" placeholder="请输入" />
          </el-form-item>
          <el-form-item
            prop="activityCoverUrl"
            label="上传图标"
          >
            <upload-media
              v-model="form.activityCoverUrl"
              :item="uploadItem"
              v-on="$listeners"
              @upload="uploadApi"
            />
            <div class="note">
              <i class="el-icon-info" />
              <span>支持GIF、PNG、JPG和JPEG格式，请上传1M以下图片</span>
            </div>
          </el-form-item>
          <el-form-item
            prop="jumpUrl"
            label="跳转页面"
          >
            <el-input v-model="form.jumpUrl" placeholder="请输入" />
          </el-form-item>

        </div>
      </div>

      <!-- 用户定向 -->
      <div class="app-container">
        <div>
          <span class="put-label">用户定向</span>
          <el-radio-group v-model="form.directType">
            <el-radio label="0">标签定向</el-radio>
            <el-radio label="1">分群定向</el-radio>
          </el-radio-group>
        </div>
        <div v-show="form.directType === '0'" class="put-item">
          <!-- 小熊艺术-学生端App -->
          <div>
            <el-form-item label="用户状态及购课状态" prop="subjectStatus">
              <div v-for="(item, key) in form.subjectStatus" :key="key" style="margin-bottom: 15px;">
                <el-cascader
                  v-model="form.subjectStatus[key]"
                  :options="statusChannelList"
                  :props="{ multiple: true, emitPath: false }"
                  :show-all-levels="false"
                  collapse-tags
                  clearable
                />
                <el-button type="primary" icon="el-icon-plus" circle size="mini" style="margin-left:20px;font-size: 15px;" @click="addStatus(key)" />
                <el-button v-if="form.subjectStatus.length > 1" type="danger" icon="el-icon-delete" circle size="mini" style="font-size: 15px;" @click="deleteStatus(key)" />
              </div>
            </el-form-item>
          </div>

        </div>
        <div v-show="form.directType === '1'" class="app-container">
          <user-group-com ref="userGroupCom" :root-id="rootId" :user-group-selected="userGroupSelected" />
        </div>
      </div>
      <div class="app-container submit-bar">
        <el-form-item class="put-submit">
          <el-button type="primary" @click="onSubmit">{{ parentId && editType === 'edit' ? '立即修改' : '立即创建' }}</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>

<script>
import { advertDin } from '@/api/ad-center/ad-input'

import UserGroupCom from './component/userGroup'
import UploadMedia from '@/components/BasicsForm/components/UploadMedia/index.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { rules } from './enum'
import { upload } from '@/api/common'
import { rActivityBusinessList, saveActivity, updateActivity, rActivityId } from '@/api/operate/activity-api'
import { rActivityList } from '@/api/operate/activity-api.js'

const userGroupLineMap = {
  '美术宝1对1': '1',
  '小熊艺术': '2',
  'Artworld': '3'
}

export default {
  name: 'ActivityAdd',
  // components: { BasicsAction, Classification, BasicsForm, Pagination },
  components: { UserGroupCom, UploadMedia },
  data() {
    return {
      rootId: userGroupLineMap[this.$route.query.businessType],
      statusChannelList: [],
      parentId: this.$route.query.parentId, // 编辑时的id
      editType: this.$route.query.editType, // 编辑和新增的状态值
      form: {
        directType: '0', // 用户定向规则
        businessType: '', // 业务线
        activityTypeId: '', // 分类
        activityName: '', // 活动标题
        activityCoverUrl: '', // 上传图标
        jumpUrl: '', // 跳转链接
        subjectStatus: [['0']] // 用户状态购课状态
      },
      rules,
      businessTypeLabels: [], // 选择的业务线
      activityTypeIdLabels: [], // 选择的分类
      userGroupSelected: [], // 选择的分群
      uploadItem: {
        prop: 'activityCoverUrl',
        mediaRules: {
          size: 1,
          media: 'img',
          type: 'GIF,PNG,JPG,JPEG',
          multiple: false
        },
        note: true
      },
      query: {
        time: [`${moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss')}`, `${moment().format('YYYY-MM-DD HH:mm:ss')}`]
      }
    }
  },
  computed: {
    ...mapGetters(['loadings']),
    appLoading() {
      const { loadings } = this
      return loadings._ums_meixiu_api_a_r_v1_rActivityType_select ||
        loadings._ums_meixiu_api_a_r_v1_rActivityBusiness_select
    }
  },
  async created() {
    if (this.parentId && this.editType === 'edit') {
      await this.getPublish()
    }
    this.advertDin()
    this.changeActivityForm()
    this.changeBusinessType()
  },
  async mounted() {

  },
  methods: {
    uploadApi: upload,
    // 删除注册渠道
    deleteStatus(key) {
      this.form.subjectStatus.splice(key, 1)
    },
    // 新增注册渠道
    addStatus(key) {
      this.form.subjectStatus.push(['0'])
    },
    // 获取用户状态及购课状态字典接口
    async advertDin() {
      const res = await advertDin()
      const { putTargetList, subjectStatusList } = res.data
      const subjectStatusListMap = new Map()
      subjectStatusList.forEach(item => {
        subjectStatusListMap.set(item.code, putTargetList[putTargetList.findIndex((one) => item.parentCode === one.code)].code)
      })
      this.subjectStatusListMap = subjectStatusListMap
      const _arr = []
      putTargetList.map(item => {
        const oneLabel = {
          value: item.code,
          label: item.desc,
          children: subjectStatusList.filter(one => one.parentCode === item.code).map(child => { return { value: child.code, label: child.desc } })
        }
        if (item.desc !== '舞蹈' && item.desc !== '音乐') {
          _arr.push(oneLabel)
        }
      })
      this.statusChannelList = _arr
    },
    // 查询数据通过ID
    async getPublish() {
      try {
        const res = await rActivityId({ 'activityId': this.parentId })
        const _data = res.payload
        this.form = {
          ...this.form,
          businessType: _data.businessType || '1', // 业务线
          activityTypeId: _data.activityTypeId, // 分类
          activityName: _data.activityName, // 活动标题
          activityCoverUrl: _data.activityCoverUrl, // 上传图标
          jumpUrl: _data.jumpUrl, // 跳转链接
          directType: _data.directType + '', // 用户定向规则
          subjectStatus: _data.subjectStatus ? _data.subjectStatus.split(',').map(item => { return item.split('') }) : [[]] // 用户状态购课状态
        }

        this.userGroupSelected = _data.userClusterId.split(',').map(item => { return item * 1 }) || []
      } catch (error) {
        this.$message.error('获取活动失败。')
      }
    },
    // 新增/修改活动
    async submitForm(val) {
      try {
        if (this.parentId) {
          await updateActivity({ ...val, id: this.parentId })
        } else {
          await saveActivity(val)
        }
        this.$message({
          message: this.parentId ? '修改活动成功。' : '新增活动成功。',
          type: 'success'
        })
        this.$router.replace({ name: 'Activity' })
      } catch (error) {
        this.$message.error(this.parentId ? '修改活动失败。' : '新增活动失败。')
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid, values) => {
        if (valid) {
          const data = { ...this.form }
          // 用户定向之 分群规则
          if (this.form.directType === '1') {
            const userSelected = this.$refs.userGroupCom.userSelected
            if (userSelected?.length === 0) {
              this.$message.error('请选择用户定向-分群规则！')
              return
            }
            delete data.subjectStatus
            data.userClusterId = userSelected.join(',')
          }
          // 用户定向之标签规则
          if (this.form.directType === '0') {
            delete data.userClusterId
            data.subjectStatus = data.subjectStatus && data.subjectStatus.length > 0 ? data.subjectStatus.filter(item => item.length > 0).reduce((pre, item) => { return pre ? `${pre},${item.join('')}` : item.join('') }, '') : ''
            if (data.subjectStatus) {
              const list = data.subjectStatus.split(',').reduce((content, item) => { return [...content, ...item.split('')] }, [])
              const str = []
              list.forEach((item, index) => {
                if (!str.includes(this.subjectStatusListMap.get(item))) {
                  str.push(this.subjectStatusListMap.get(item))
                }
              })
              data.putTarget = str.toString()
            }
          }
          this.submitForm(data)
        } else {
          return false
        }
      })
    },
    back() {
      this.$router.replace({ name: 'Activity' })
    },
    // // 获取活动
    async changeBusinessType(val, isSort) {
      const time = this.query.time || []
      const data = {
        activityTypeId: 2,
        startTime: moment(new Date(time[0])).valueOf(),
        endTime: moment(new Date(time[1])).valueOf()
      }
      const res = await rActivityBusinessList(data)
      this.businessTypeLabels = res.payload.content.map(item => { return { label: item.businessName, value: item.id } })
    },
    async changeActivityForm(val, oldVal) {
      const res = await rActivityList({ page: 1, size: 20, activityBusinessId: 1 })
      this.activityTypeIdLabels = res.payload.content.map(item => { return { label: item.typeName, value: item.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.ad-container {
  padding: 20px;
}
 .submit-bar {
    ::v-deep .el-form-item--small {
      margin-bottom: 0;
    }
  }

.put-wrap {
  ::v-deep .el-select,
  ::v-deep .el-input {
    width: 300px;
  }
  .put-label {
    display: inline-block;
    width: 100px;
    padding: 0 12px 0 0;
    color: #606266;
    text-align: right;
    font-size: 14px;
    font-weight: 700;
    &::before {
      content: '*';
      color: #ff4949;
      margin-right: 4px;
    }
  }

  .sub-label {
    display: inline-block;
    padding: 0;
    color: #606266;
    font-size: 14px;
    font-weight: 700;
  }
  .put-item {
    padding: 20px 10px 10px 30px;
    &-tips {
      padding-left: 10px;
      color: #999;
    }
    ::v-deep .el-table__header {
      th {
        background-color: #f4f4f5;
      }
    }
  }
  .put-submit {
    text-align: right;
  }
  .submit-bar {
    ::v-deep .el-form-item--small {
      margin-bottom: 0;
    }
  }
  .item-action {
    width: 50px;
    height: 50px;
    position: relative;
    margin: 0 auto;
    border: 1px dashed #ccc;
    border-radius: 4px;
    &-img {
      width: 100%;
      height: 100%;
    }
    &-edit {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(120%, -50%);
      cursor: pointer;
      color: #1890ff;
    }
    &.empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .ad-num {
    color: #1890ff;
  }
  .to-overview {
    cursor: pointer;
    color: #1890ff;
    font-size: 18px;
  }
  .ad-overview {
    text-align: center;
    img {
      width: 80%;
    }
  }
  .material-tip {
    padding: 16px;
    font-size: 14px;
    font-weight: 700;
    color: #606266;
    span {
      color: red;
    }
  }
}
</style>
