<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span>{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>
            <span style="display:block;" @click="modifyPwd">修改密码</span>
          </el-dropdown-item> -->
          <!-- <el-dropdown-item divided /> -->
          <el-dropdown-item>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-if="env" style="float: right; margin-right: 5px;">
        <el-tag>{{ env }}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { modPwd } from '@/api/login'

const ENV = import.meta.env.VITE_APP_ENV
const envTextMap = {
  'dev': '开发',
  'test': '测试',
  'staging': '预发'
}

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      env: ENV !== 'product' ? envTextMap[ENV] || '' : ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'sidebar',
      'avatar',
      'device',
      'userId'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    modifyPwd() {
      this.$prompt('请输入新密码', '修改密码', {
        inputPattern: /^[\w]{6,20}$/,
        inputPlaceholder: '请输入6-20位密码，支持数字与字母与下划线',
        inputErrorMessage: '密码格式不正确'
      })
        .then(({ value }) => {
          this.$prompt('请确认新密码', '修改密码', {
            inputPattern: /^[\w]{6,20}$/,
            inputPlaceholder: '请输入6-20位密码，支持数字与字母与下划线',
            inputErrorMessage: '密码格式不正确'
          })
            .then(({ value: value2 }) => {
              if (!this.userId) {
                this.$message.error('员工id为空，请重新登录后重试！')
                return false
              }
              if (value !== value2) {
                this.$message.error('两次密码输入不一致！')
                return false
              }
              modPwd({ id: this.userId, password: value })
                .then(() => {
                  this.$message.success('修改密码成功～')
                })
            })
        })
    },
    logout() {
      this.$confirm('请确认，是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        localStorage.setItem('loginType', 'logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
