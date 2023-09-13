<template>
  <el-dialog
    :title="title"
    :visible.sync="state"
    width="800px"
    :before-close="() => closeDl()"
  >
    <basics-form
      v-if="type === 'view'"
      :key="state"
      ref="viewDraw"
      :forms="viewForms"
      :actions="viewActions"
    />
    <basics-form
      v-else
      :key="state"
      ref="examineDraw"
      :loading="drawLoading"
      :forms="forms"
      :actions="actions"
      @submitForm="submitForm"
      @changeForm="changeForm"
      @changeTurn="changeTurn"
    />
  </el-dialog>
</template>

<script>
import {
  singleExaminePanda,
  getSelectOptions
} from '@/api/operate/draw-show'
import BasicsForm from '@/components/BasicsForm'
import forms, { actions } from './forms/index'
import vForms, { actions as vActions } from './forms/view'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import moment from 'moment'
export default {
  name: 'Examine',
  components: { BasicsForm },
  props: {
    state: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: ''
    },
    statusCause: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      viewForms: vForms,
      viewActions: vActions({ closeDl: this.closeDl }),
      forms: [],
      actions: actions({ closeDl: this.closeDl }),
      rotateAngle: '-0',
      imgRotate: '0'
    }
  },
  computed: {
    title() {
      const { type } = this
      let txt = ''
      switch (type) {
        case 'view':
          txt = '查看视频'
          break
        case 'edit':
          txt = '编辑视频'
          break
        default: // examine
          txt = '审核视频'
          break
      }
      return txt
    },
    ...mapGetters(['loadings']),
    drawLoading() {
      return this.loadings._msb_api_workShow_examine || this.loadings._msb_api_workShow_update
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const { type, row } = this
      let ref
      this.statusCause?.rejectedReasonList?.forEach(element => {
        if (element.reasonId === row.refuseCause) {
          ref = element.reason || '无理由'
        }
      })
      if (type !== 'view') {
        this.forms = forms({ isEdit: type === 'edit' })
        const res = await getSelectOptions()
        const data = res.payload?.rejectedReasonList.map(item => {
          const ele = {}
          ele.value = item.code
          ele.label = item.value
          return ele
        })
        this.$nextTick(() => {
          this.$refs.examineDraw.set({
            type: 'options',
            data: {
              originUserId: [
                {
                  label: `${row.originUserId || ''} ${row.opUserName || ''}`,
                  value: row.originUserId
                }
              ],
              refuseCause: data
            }
          })
          this.$nextTick(() => {
            console.log('row.status', row.status)
            this.$refs.examineDraw.set({
              type: 'defaultVal',
              data: {
                ctime: moment(Number(row.uploadTime)).format('YYYY-MM-DD HH:mm:ss'),
                originUserId: row.originUserId,
                coverUrl: row.coverUrl,
                videoUrl: {
                  url: row.convertUrl || row.videoUrl,
                  poster: row.coverUrl,
                  duration: row.videoTime
                },
                status: row.status,
                refuseCause: row.refuseCause ? row.refuseCause : undefined
              },
              validateField: false
            })
          })
        })
      } else {
        this.$nextTick(() => {
          this.$refs.viewDraw && this.$refs.viewDraw.set({
            type: 'defaultVal',
            data: {
              ctime: moment(Number(row.uploadTime)).format('YYYY-MM-DD HH:mm:ss'),
              originUserId: row.originUserId || '-',
              coverUrl: row.coverUrl,
              videoUrl: {
                url: row.convertUrl || row.videoUrl,
                poster: row.coverUrl,
                duration: row.videoTime
              },
              status: ['待审核', '待审核', '已通过', '已驳回', '通过并推荐'][+row.status]
            }
          })
          if (row.status === 0 || row.status === 1 || row.status === 2) {
            this.$refs.viewDraw && this.$refs.viewDraw.set({
              type: 'visible',
              data: {
                refuseCause: false
              }
            })
            this.$refs.viewDraw && this.$refs.viewDraw.set({
              type: 'defaultVal',
              data: {
                refuseCause: undefined
              }
            })
          } else {
            this.$refs.viewDraw && this.$refs.viewDraw.set({
              type: 'visible',
              data: {
                refuseCause: true
              }
            })
            this.$refs.viewDraw && this.$refs.viewDraw.set({
              type: 'defaultVal',
              data: {
                refuseCause: ref
              }
            })
          }
        })
      }
    },
    closeDl(sta = 0) {
      this.$emit('closeDl', sta)
    },
    changeForm(val, oldVal) {
      if (val.status !== oldVal.status) {
        if (val.status === 3) {
          this.$refs.examineDraw.set({
            type: 'visible',
            data: {
              refuseCause: true
            }
          })
        } else {
          // 审核通过
          this.$refs.examineDraw.set({
            type: 'visible',
            data: {
              refuseCause: false
            }
          })
        }
      }
    },
    submitForm(val) {
      const { row } = this
      let data = {}
      data = {
        id: row.id,
        status: val.status,
        refuseCause: val.refuseCause,
        mid: getToken('userId'),
        opUserId: getToken('userId'),
        opUserName: getToken('cname')
      }
      singleExaminePanda(data).then(() => {
        this.$message.success('审核提交成功')
        this.closeDl(1)
      })
    },
    changeTurn(deg, type) {
      // imgRotate
      // rotateAngle
      this[type] = `${type === 'rotateAngle' ? '-' : ''}${deg % 720}`
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .note {
    display: none !important;
  }
</style>
