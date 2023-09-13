<template>
  <div>
    <div class="title-container">
      <basics-title title="查看数据统计" line />
    </div>
    <div class="app-container">
      <div class="item-content">
        <div class="data-box">
          <div class="data-content">
            <div class="data-title">直播名称</div>
            <div class="data-num">{{ item.complaintTotal }}</div>
          </div>
        </div>
        <el-divider direction="vertical" />
        <div v-for="(child, index) in item.childList" :key="index" class="data-box">
          <div class="data-content">
            <el-badge :value="child.rate" class="item">
              <div class="data-title">{{ child.name }}</div>
            </el-badge>
            <div class="data-num">{{ child.key === 'openTime' || child.key === 'closeTime' ? transformation(child.count) : child.count }}</div>
          </div>
        </div>
      </div>
      <basics-table
        :loading="loadings._ums_meixiu_api_play_v1_live_statisticsActivity"
        :columns="columns"
        :list="list"
        :get-list="getList"
        :total="total"
        :list-query="listQuery"
      />
    </div>
  </div>
</template>

<script>
import { statisticsActivity } from '@/api/live-broadcast/manage'
import { mapGetters } from 'vuex'
import columns from './columns/statistics-list'
import { parseTime } from '@/utils/index'
export default {
  name: 'Version',

  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      list: [],
      total: 0,
      columns: columns,
      liveActivityId: '',
      item: {
        complaintTotal: '美术报直播',
        childList: [
          {
            key: 'openTime',
            name: '开播时间',
            count: '2021-03-30 09:40:00'
          },
          {
            key: 'closeTime',
            name: '结束时间',
            count: '2021-03-30 09:40:00'
          },
          // {
          //   key: 'goodsClickNum',
          //   name: '商品点击总量',
          //   count: '35，098'
          // },
          {
            key: 'ordersNum',
            name: '订单总量',
            count: '3，509'
          },
          {
            key: 'dealTotal',
            name: '成交总额',
            count: '29%'
          },
          {
            key: 'activityCoverNum',
            name: 'APP参与总人数',
            count: '35，093'
          }
          // {
          //   name: '小程序参与总人数',
          //   count: '35，093'
          // }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  created() {
    const dat = JSON.parse(localStorage.getItem('CreateLiveData'))
    Object.assign(this._data, dat)
    this.getList()
  },

  mounted() {
  },
  methods: {
    transformation(val) {
      return parseTime(val)
    },
    getList() {
      statisticsActivity({ liveActivityId: this.liveActivityId }).then((result) => {
        this.list = result.payload.goodsInfo
        this.item.complaintTotal = result.payload.liveName
        this.item.childList = this.item.childList.map(item => {
          item.count = result.payload[item.key]
          return item
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-content {
  display: flex;
  align-items: center;
  ::v-deep .el-divider--vertical {
    height: 4em;
  }
  .data-box {
    flex: 1;
    text-align: center;
    padding:30px 20px;
    cursor: pointer;
    .data-content {
      display: inline-block;
      text-align: center;
      .data-title {
        font-size: 14px;
        color: #999;
        margin-bottom: 5px;
        // padding-left: 3px;
      }
      .data-num {
        font-size: 20px;
      }
      ::v-deep .el-badge__content {
            right: 0px;
            top: -5px;
            background-color: #F2F2F2;
            color: #AAAAAA;
        }
      }
  }
}
</style>
