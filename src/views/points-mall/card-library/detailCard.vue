<template>
  <div class="libraryDetailWarp">
    <div class="title">卡密详情</div>
    <div class="libraryCon">
      <div class="cardmi">
        <span>
          {{ couponName }}
        </span>
        <span> 有效期：{{ showTime1.start }} 至 {{ showTime1.end }} </span>
        <div>
          <el-button type="primary" @click="addCarmi">导入卡密</el-button>
          <el-button type="warning" @click="handleEmpty">清空卡密</el-button>
          <el-button @click="removeCarmi">导出卡密</el-button>
        </div>
      </div>
      <div>
        <el-form
          ref="form"
          :model="sizeForm"
          label-width="80px"
          size="mini"
          class="detailFrom"
        >
          <el-form-item label="发放状态">
            <el-select v-model="sizeForm.region" placeholder="全部">
              <el-option label="全部" value="0" />
              <el-option label="已发放" value="1" />
              <el-option label="未发放" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="卡号：">
            <el-input v-model="sizeForm.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="couponNum" label="卡号" width="180" />
        <el-table-column label="密码" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip class="item" placement="top">
              <div slot="content">{{ scope.row.couponPwd }}</div>
              <el-button class="elButtonPassword">******</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="发放状态">
          <template slot-scope="scope">
            {{ scope.row.status === "UNISSUED" ? "未发放" : "发放" }}
          </template>
        </el-table-column>
        <el-table-column prop="uid" label="领取用户ID">
          <template slot-scope="scope">
            {{ Number(scope.row.uid) === 0 ? "-" : scope.row.uid }}
          </template>
        </el-table-column>
        <el-table-column label="领取时间">
          <template slot-scope="scope">
            {{
              Number(scope.row.getTime) === 0
                ? "-"
                : `${new Date(Number(scope.row.getTime))
                  .toLocaleDateString()
                  .split("/")
                  .join("-")} ${new Date(Number(scope.row.getTime))
                  .toTimeString()
                  .substr(0, 8)}`
            }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleDel(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page-sizes="listQuery.pageSizes"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
    <el-dialog title="导入卡密" :visible.sync="dialogFormVisible">
      <el-form :model="formFile" class="fileFrom">
        <el-form-item label="选择文件" :rules="[{ required: true }]">
          <uploadFile :is-file-name="isFileName" @upFiles="upFiles" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="removeCarmiDialog">导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import uploadFile from './domesticGoods/components/uploadFile.vue'
export default {
  components: { Pagination, uploadFile },
  data() {
    return {
      sizeForm: {
        name: '',
        region: ''
      },
      tableData: [
        {
          couponNum: 'ZA954ZZB296SCVZ',
          password: '卡密',
          status: '12',
          uid: '123',
          getTime: ''
        }
      ],
      formFile: {},
      dialogFormVisible: false,
      total: 10,
      listQuery: {
        page: 1,
        limit: 10,
        pageSizes: [10, 20, 30, 50]
      },
      couponId: '',
      couponName: '',
      startTime: '',
      endTime: '',
      loading: null,
      upFile: null,
      showTime1: { start: '', end: '' },
      isFileName: ''
    }
  },
  created() {
    const { id, couponName, startTime, endTime } = this.$route.query
    this.couponId = id

    this.showTime1.start =
      startTime &&
      new Date(Number(startTime))
        .toLocaleDateString()
        .split('/')
        .join('-')
    this.showTime1.end =
      endTime &&
      new Date(Number(endTime))
        .toLocaleDateString()
        .split('/')
        .join('-')
    this.startTime = startTime || ''
    this.endTime = endTime || ''
    this.couponName = couponName || 'wu'
    const param = { couponId: id, page: 1, pageSize: 10 }
    this.initInfoDta(param)
  },
  mounted() {},
  methods: {
    upFiles(v) {
      console.error('v', v)
      if (v[0]) {
        this.upFile = v
        this.isFileName = (this.upFile[0] && this.upFile[0].name) || '无'
      }
    },
    initInfoDta(param) {
      this.loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$api
        .couponinfoDetailApi(param)
        .then(res => {
          const { code, payload, status } = res
          if (code !== 0) {
            this.$message.error(status)
            return
          }
          this.tableData = payload.content
          this.total = Number(payload.totalElements)
          this.loading.close()
        })
        .catch(e => {
          this.loading.close()
        })
    },
    onSubmit() {
      const param = {
        couponId: this.couponId,
        couponNum: this.sizeForm.name,
        status:
          Number(this.sizeForm.region) === 1
            ? 'ISSUED'
            : Number(this.sizeForm.region) === 0
              ? ''
              : 'UNISSUED',
        page: 1,
        pageSize: 10
      }
      console.log('this.sizeForm.region', param)
      this.initInfoDta(param)
    },
    getList(v) {
      console.log('v', v, this.sizeForm.region)
      const { page, limit } = v
      this.listQuery.page = page
      this.listQuery.limit = limit
      const param = { couponId: this.couponId, page, pageSize: limit }
      if (this.sizeForm.name) {
        param['couponNum'] = this.sizeForm.name
      }
      if (this.sizeForm.region) {
        param['status'] =
          Number(this.sizeForm.region) === 1
            ? 'ISSUED'
            : Number(this.sizeForm.region) === 0
              ? ''
              : 'UNISSUED'
      }
      this.initInfoDta(param)
    },
    handleEmpty() {
      this.$confirm('选中的未发放的卡密将全部删除', '确定要清空卡券吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          const param = { couponId: this.couponId }
          this.$api
            .couponinfoDelAllApi(param)
            .then(res => {
              const param = { couponId: this.couponId, page: 1, pageSize: 10 }
              this.initInfoDta(param)
            })
            .catch(() => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 导入卡密
    addCarmi() {
      if (this.isFileName) {
        this.isFileName = ''
      }
      console.log('11111', this.isFileName)
      this.dialogFormVisible = true
    },
    // 导出卡密
    removeCarmi() {
      this.dialogFormVisible = false
      const param = { couponId: this.couponId, couponName: this.couponName }
      this.$api
        .downloadCouponApi(param)
        .then(res => {
          this.funDownload(res)
          console.error(res)
        })
        .catch(() => {})
    },
    funDownload(content) {
      const blob = new Blob([content], {
        type: 'text/csv,charset=utf-8'
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = this.couponName
      link.href = url
      link.click()
    },
    removeCarmiDialog() {
      this.loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      if (!this.upFile) {
        this.$message.error('请选择csv文件或者 txt')
        return
      }
      if (
        this.upFile[0].type !== 'text/csv' &&
        this.upFile[0].type !== 'text/plain'
      ) {
        this.$message.error('请选择csv文件或者 txt')
        return
      }
      const params = {
        couponId: this.couponId,
        file: this.upFile[0]
      }
      this.$api
        .addCouponIdApi(params)
        .then(() => {
          this.dialogFormVisible = false
          this.loading.close()
          const param = { couponId: this.couponId, page: 1, pageSize: 10 }
          this.initInfoDta(param)
        })
        .catch(e => {
          this.dialogFormVisible = false
          this.loading.close()
        })
    },
    handleDel(row) {
      this.$confirm(
        `确认删除卡密：${row.couponNum}`,
        '确定要删除这个卡券吗？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      )
        .then(() => {
          const param = { couponId: this.couponId, id: row.id }
          this.$api
            .couponinfoDelApi(param)
            .then(res => {
              const param = { couponId: this.couponId, page: 1, pageSize: 10 }
              this.initInfoDta(param)
            })
            .catch(() => {})
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.libraryDetailWarp {
  .title {
    background: #fff;
    font-size: 24px;
    padding: 20px;
  }
  .elButtonPassword {
    border: none;
  }
  .elButtonPassword:focus {
    background: #fff;
  }
  .elButtonPassword:active {
    color: #666;
    background: #fff;
  }
  .libraryCon {
    background: #fff;
    padding: 0 0 30px;
    margin: 40px 20px;
    border-radius: 10px;
  }
  .cardmi {
    font-size: 20px;
    color: #333;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .detailFrom {
    padding: 10px 20px 0 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .fileFrom {
    ::v-deep .el-form-item__content {
      width: 350px;
      margin-left: 94px;
    }
  }
  ::v-deep .el-dialog {
    width: 520px;
  }
}
</style>
