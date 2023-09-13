<template>
  <el-dialog
    :title="title"
    :visible.sync="state"
    width="800px"
    :before-close="() => closeDl()"
  >
    <basics-form
      :key="state"
      ref="viewDraw"
      :forms="viewForms"
      :actions="viewActions"
    />
  </el-dialog>
</template>

<script>
import {
  showQueryAuthor,
  showUpdate,
  showExamine,
  worksShowStatusCause,
  adjust
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
      actions: actions({ closeDl: this.closeDl, setTurn: this.setTurn }),
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
      if (type !== 'view') {
        this.forms = forms({ remoteMethod: this.remoteMethod, isEdit: type === 'edit' })
        const res = await worksShowStatusCause()
        const data = res.data?.rejectedReasonList.map(item => {
          item.value = item.reasonId
          item.label = item.reason
          return item
        })
        this.$nextTick(() => {
          this.$refs.examineDraw.set({
            type: 'options',
            data: {
              authorId: [
                {
                  label: `${row.authorId || ''} ${row.username || ''}`,
                  value: row.authorId
                }
              ],
              refuseCause: data
            }
          })
          this.$nextTick(() => {
            this.$refs.examineDraw.set({
              type: 'defaultVal',
              data: {
                ctime: moment(row.ctime * 1000).format('YYYY-MM-DD HH:mm:ss'),
                authorId: row.authorId,
                coverUrl: row.coverUrl,
                videoUrl: {
                  url: row.convertUrl || row.videoUrl,
                  poster: row.coverUrl,
                  duration: row.videoTime
                },
                status: (row.status === 0 || row.status === 2) ? row.status : '',
                refuseCause: row.refuseCause,
                isRecommend: !!row.isRecommend
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
              ctime: moment(row.ctime * 1000).format('YYYY-MM-DD HH:mm:ss'),
              authorId: `${row.authorId} / ${row.username}`,
              coverUrl: row.coverUrl,
              videoUrl: {
                url: row.convertUrl || row.videoUrl,
                poster: row.coverUrl,
                duration: row.videoTime
              },
              status: row.status === 0 ? '已驳回' : '审核通过',
              ptime: (row.status === 0) ? moment(row.mtime * 1000).format('YYYY-MM-DD HH:mm:ss') : moment(row.ptime * 1000).format('YYYY-MM-DD HH:mm:ss')
            }
          })
          if (row.status === 0) {
            this.$refs.viewDraw && this.$refs.viewDraw.set({
              type: 'visible',
              data: {
                refuseCauseText: true
              }
            })
            this.$refs.viewDraw && this.$refs.viewDraw.set({
              type: 'defaultVal',
              data: {
                refuseCauseText: this.statusCause[row.refuseCause]
              }
            })
          } else {
            this.$refs.viewDraw && this.$refs.viewDraw.set({
              type: 'visible',
              data: {
                refuseCauseText: false
              }
            })
            this.$refs.viewDraw && this.$refs.viewDraw.set({
              type: 'defaultVal',
              data: {
                refuseCauseText: undefined
              }
            })
          }
        })
      }
    },
    remoteMethod(e) {
      showQueryAuthor({ authorName: e }).then(res => {
        const authorId = []
        const data = res.data || []
        data.map(item => {
          authorId.push({
            label: `${item.authorId || ''} ${item.username || ''}`,
            value: item.authorId
          })
        })
        this.$refs.examineDraw.set({
          type: 'options',
          data: {
            authorId: authorId
          }
        })
      })
    },
    closeDl(sta = 0) {
      this.$emit('closeDl', sta)
    },
    changeForm(val, oldVal) {
      if (val.status !== oldVal.status) {
        // status = 2 代表审核通过
        if (val.status === 0) {
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
        if (val.status === 2) {
          this.$refs.examineDraw.set({
            type: 'visible',
            data: {
              isRecommend: true
            }
          })
        } else {
          this.$refs.examineDraw.set({
            type: 'visible',
            data: {
              isRecommend: false
            }
          })
        }
      }
      // if (val.videoUrl.url) {
      //   if (val.videoUrl.poster !== oldVal.videoUrl.poster) {
      //     this.$refs.examineDraw.set({
      //       type: 'defaultVal',
      //       data: {
      //         coverUrl: val.videoUrl.poster
      //       }
      //     })
      //   }
      // }
      // if (val.coverUrl !== oldVal.coverUrl) {
      //   this.$refs.examineDraw.set({
      //     type: 'defaultVal',
      //     data: {
      //       videoUrl: {
      //         ...val.videoUrl,
      //         poster: val.coverUrl
      //       }
      //     }
      //   })
      // }
    },
    submitForm(val) {
      const { row, type } = this
      let data = {}
      if (type === 'edit') {
        data = {
          id: row.id,
          authorId: val.authorId,
          videoUrl: val.videoUrl.url,
          coverUrl: val.coverUrl,
          videoTime: val.videoUrl.duration ? parseInt(val.videoUrl.duration) : 0,
          status: val.status,
          refuseCause: val.refuseCause,
          mid: getToken('userId'),
          opUserId: getToken('userId'),
          opUserName: getToken('cname')
        }
        showUpdate(data).then(() => {
          this.$message.success('修改成功')
          this.closeDl(1)
        })
      } else {
        data = {
          id: row.id,
          status: val.status,
          mid: getToken('userId'),
          opUserId: getToken('userId'),
          opUserName: getToken('cname')
        }
        if (!val.status) {
          data.refuseCause = val.refuseCause
          data.isRecommend = '0'
        } else {
          data.isRecommend = val.isRecommend ? '1' : '0'
        }
        showExamine(data).then(() => {
          this.$message.success('审核提交成功')
          this.closeDl(1)
        })
      }
    },
    changeTurn(deg, type) {
      // imgRotate
      // rotateAngle
      this[type] = `${type === 'rotateAngle' ? '-' : ''}${deg % 720}`
    },
    setTurn() {
      const { row, rotateAngle, imgRotate } = this
      const rotate = ['-0', '+0', '0']
      // if (rotate.includes(rotateAngle) && rotate.includes(imgRotate)) {
      //   this.$message.info('图片或视频无需提交旋转任务！')
      //   return false
      // }
      if (!rotate.includes(rotateAngle) && row.videoUrl.includes('.m3u8')) {
        this.$message.info('m3u8格式不支持旋转！')
        return false
      }
      const loading = this.$loading({
        lock: true,
        text: '旋转转码中，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      adjust({
        worksShowId: row.id,
        rotateAngle: rotateAngle,
        imgRotate: imgRotate
      }).then(res => {
        loading.close()
        const data = res.data || {}
        const { imgUrl, videoUrl } = data
        const { row } = this
        this.$refs.examineDraw && this.$refs.examineDraw.set({
          type: 'defaultVal',
          data: {
            coverUrl: imgUrl || row.coverUrl,
            videoUrl: {
              url: videoUrl || row.convertUrl || row.videoUrl,
              poster: row.coverUrl,
              duration: row.videoTime
            }
          }
        })
        this.imgRotate = 0
        this.$emit('getList')
        this.$message.success('旋转完成！')
      }).catch(() => {
        loading.close()
        this.$message.error('旋转失败！')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .note {
    display: none !important;
  }
</style>
