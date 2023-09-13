<template>
  <div class="app-container">
    <el-tabs v-model="activeId">
      <el-tab-pane
        v-for="item in darpList"
        :key="item.desc"
        :label="item.desc"
        :name="item.name"
      />
    </el-tabs>
    <basics-search
      ref="searchs"
      :loading="loadings._api_pc_operate_list"
      :searchs="searchs"
      @submitSearch="submitSearch"
      @changeSearch="changeSearch"
    />
    <div class="btn-all">
      <el-button type="primary" @click="creatHelpIssue">添加问题</el-button>
      <el-button type="primary" @click="classManage">分类管理</el-button>
      <el-button type="primary" @click="showUrl">查看链接</el-button>
    </div>

    <div class="questTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- <draggable
              v-model="props.row.helpIssueContentList"
              group="people"
              class="drag-lists"
              @start="drag = true"
              @end="moveData(props.row.helpIssueContentList)"
            > -->
            <el-form
              v-for="item in props.row.helpIssueContentList"
              :key="item.id"
              label-position="center"
              class="demo-table-expand"
            >
              <div class="demo-table-expand">
                <p style="width:10%">
                  <span />
                </p>
                <p>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="item.iconUrl"
                  />
                </p>
                <p>
                  <span>{{ item.issueTitle }}</span>
                </p>
                <p>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.issueType === 2 ? item.issueContent : item.issueUrl"
                    placement="top"
                  >
                    <span>{{ item.issueType === 2 ? item.issueContent : item.issueUrl }}</span>
                  </el-tooltip>
                  <!-- <span>{{ item.issueContent }}</span> -->
                </p>
                <p>
                  <span>{{ item.pvCount }}</span>
                </p>
                <p>
                  <span>{{ item.uvCount }}</span>
                </p>
                <p>
                  <el-button>
                    <i class="el-icon-top" @click="goMove(-1, item)" />
                  </el-button>
                  <el-button style="margin-right:20px">
                    <i class="el-icon-bottom" @click="goMove(1, item)" />
                  </el-button>
                  <el-dropdown>
                    <el-button>
                      <i class="el-icon-arrow-down el-icon--right" />
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <span @click="editIssue(item)"> 编辑</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="deltIssue(item)"> 删除</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </p>
              </div>
            </el-form>
            <!-- </draggable> -->
          </template>
        </el-table-column>
        <el-table-column label="问题分类" prop="label">
          <template slot-scope="props">
            <span>
              {{ handleData(props.row.classifyIssueId) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="图标" />
        <el-table-column label="问题标题" />
        <el-table-column label="url链接地址" />
        <el-table-column label="pv" />
        <el-table-column label="uv" />
        <el-table-column label="操作" />
      </el-table>
    </div>
    <el-dialog
      title="查看链接"
      :visible.sync="urlVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-input
          ref="inputDom"
          v-model="inputUrl"
          placeholder="请输入内容"
          :disabled="true"
        />
        <div class="urlBot">
          <el-button type="primary" @click="copyUrl">复制</el-button>
          <el-popover
            placement="top-start"
            title="图片预览"
            width="200"
            trigger="hover"
          >
            <div class="demo-image">
              <el-image style="width: 100px; height: 100px" :src="inputUrl" />
            </div>
            <!-- <el-button slot="reference">预览 </el-button> -->
          </el-popover>
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="urlVisible = false">取 消</el-button>
        <el-button type="primary" @click="urlVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      title="分类管理"
      :visible.sync="classVisible"
      width="30%"
      :before-close="classClose"
    >
      <div>
        <el-button
          type="primary"
          @click="handleClass('', 3)"
        >新增分类</el-button>
        <p v-for="item in classData" :key="item.id">
          <span v-show="!item.enabled">
            <span class="tree-span"> {{ item.name }}</span>
            <el-button
              class="top-btn"
              type="primary"
              circle
              icon="el-icon-edit"
              @click="handleClass(item, 1)"
            />
            <el-button
              class="top-btn"
              type="primary"
              circle
              icon="el-icon-delete"
              @click="handleClass(item, 2)"
            />
          </span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="classVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="classVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import {
  getConstant,
  getlistIssue,
  getClassConstant,
  addHelpClassify,
  updateClassify,
  removeHelpClassify,
  deleteHelpIssue,
  sortHelpIssue
} from '@/api/help/index'

import BasicsSearch from '@/components/BasicsSearch'
import searchs from './searchs/searchs'
import forms, { actions } from './forms/create'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
// import { string } from 'jszip/lib/support'

export default {
  name: 'HelpCenter',
  components: { BasicsSearch },
  data() {
    return {
      activeId: '0',
      forms: forms,
      searchs: searchs,
      actions: actions({ preview: this.previewArticle, back: this.back }),
      preview: {},
      darpList: [],
      drawer: false,
      urlVisible: false, // 查看链接
      classVisible: false, // 分类管理
      startTime: moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      inputUrl: '',
      classData: [],
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    activeId: function(val) {
      if (val === 0) return
      this.getClassConstant()
    }
  },
  created() {
    this.getConstant()
  },
  methods: {
    // 搜索
    submitSearch(val) {
      console.log(val)
      // this.listQuery = {
      //   page: 1,
      //   limit: 20
      // };
      // this.query = val;
      // this.getList();
      this.startTime = val.classTime[0]
      this.endTime = val.classTime[1]
      this.getlistIssue()
    },
    // 获取业务线
    getConstant() {
      getConstant().then(res => {
        // 处理值类型
        let dataHandle = []
        res.data.map((item, idx, arr) => {
          arr[idx].name = String(item.id)
          return (dataHandle = arr)
        })
        this.darpList = dataHandle
        console.log(this.darpList)
        this.activeId = this.darpList[0].name
        // this.getClassConstant();
      })
    },
    // 获取帮助列表
    getlistIssue() {
      const query = {
        bizLineId: this.activeId,
        startTime: this.startTime,
        endTime: this.endTime
      }
      getlistIssue(query).then(res => {
        this.tableData = res.data
        this.inputUrl = res.data[0].issueCenterUrl
      })
    },
    // 处理函数
    handleData(val) {
      if (!val) return
      let name = ''
      this.classData.map((item, idx) => {
        if (+item.id === val) {
          name = item.name
        }
      })
      return name
    },

    // 创建问题
    creatHelpIssue() {
      this.$router.push({ name: 'helpCreate', params: { id: this.activeId }})
    },
    // 分类管理
    async classManage() {
      this.classVisible = true
    },
    // 获取当前业务线下的分类
    getClassConstant() {
      const query = {
        bizLineId: this.activeId
      }
      getClassConstant(query).then(res => {
        this.classData = res.data
        this.getlistIssue()
      })
    },
    // 分类操作
    handleClass(item, key) {
      if (key === 1) {
        this.$prompt('请输入新名字', '编辑分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.name
        })
          .then(({ value }) => {
            if (!value) {
              return this.$message({
                type: 'warning',
                message: '名字不能为空'
              })
            }
            const query = {
              bizLineId: this.activeId,
              classifyName: value,
              id: item.id,
              cid: Cookies.get('userId')
            }

            updateClassify(query).then(() => {
              this.getClassConstant()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      } else if (key === 2) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const query = {
              classifyId: item.id
            }
            removeHelpClassify(query).then(() => {
              this.getClassConstant()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$prompt('请输入新名字', '新增分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(({ value }) => {
            if (!value) {
              return this.$message({
                type: 'warning',
                message: '名字不能为空'
              })
            }
            const query = {
              bizLineId: this.activeId,
              classifyName: value,
              cid: Cookies.get('userId')
            }

            addHelpClassify(query).then(() => {
              this.getClassConstant()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      }
    },
    goMove(key, val) {
      console.log(val)
      const query = {
        issueId: val.id,
        sort: key,
        uid: Cookies.get('userId')
      }
      sortHelpIssue(query).then(() => {
        this.$message({
          type: 'success',
          message: '排序成功'
        })
        this.getlistIssue()
      })
    },
    // 展示链接
    showUrl() {
      this.urlVisible = true
    },
    handleClose() {
      this.urlVisible = false
    },
    classClose() {
      this.classVisible = false
    },

    // 复制链接
    copyUrl() {
      const oInput = document.createElement('input')
      oInput.value = this.inputUrl
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      oInput.remove()
    },
    // 展示图片
    showImg() {},
    //
    changeSearch(val) {
      this.query = val
    },
    // 排序
    moveData(data) {
      // drag = false
      console.log(data)
      const query = []
      data.map((item, idx) => {
        const listItem = {}
        listItem.key = `${item.id}`
        listItem.value = `${idx}`
        query.push(listItem)
      })
      sortHelpIssue(query).then(res => {
        this.$message.success('排序自动保存')
      })
    },
    // 编辑帮助
    editIssue(item) {
      console.log(item)
      this.$router.push({
        // path: "/creat",
        name: 'helpCreate',
        query: {
          routeParams: JSON.stringify(item)
        }
      })
    },
    // 删除帮助
    deltIssue(item) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const query = {
            issueId: item.id,
            uid: Cookies.get('userId')
          }
          deleteHelpIssue(query).then(() => {
            // this.$message({
            //   type: "success",
            //   message: "删除成功"
            // });
            this.getlistIssue()
          })
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
.demo-table-expand {
  display: flex;
  justify-content: space-between;
  width: 100%;
  p {
    width: 15%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.tree-span {
  width: 80px;
  display: inline-block;
}
.btn-all {
  margin: 10px 10px;
}
.urlBot {
  margin-top: 20px;
  .el-button {
    margin-right: 20px;
  }
}
</style>
