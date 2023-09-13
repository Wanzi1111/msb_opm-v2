<template>
  <div v-loading="loadings._k8s_api_activity_api_activity_config_createConfigNew || loadings._k8s_api_activity_api_activity_config_activitySortByFlag" class="app-container">
    <basics-block :title="title">
      <basics-form
        ref="form"
        :forms="forms"
        :actions="actions"
        @changeForm="changeForm"
        @submitForm="submitForm"
      />
    </basics-block>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createConfigNew, queryActivityDetail } from '@/api/operate/manage'
import { teamForm, actions } from '../../forms/create'
import { lineMap } from './index'
import { getFileType } from '@/utils/index'

export default {
  name: 'CreateZeroTeam',
  data() {
    return {
      forms: teamForm,
      actions: actions({ back: this.back }),
      kind: 'team',
      title: '新建配置'
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  mounted() {
    const { line, activityId } = this.$route.query
    this.$nextTick(() => {
      // line 2：小熊 | 1：1对1
      if (line === '2') {
        this.$refs.form.set({
          type: 'visible',
          data: {
            oneNatureChannel: false,
            oneTransferChannel: false,
            xbkNatureChannel: false,
            xbkTransferChannel: false,
            natureChannel: false,
            oneNatureChannel_xx: true,
            oneTransferChannel_xx: true
          }
        })
      } else {
        this.$refs.form.set({
          type: 'visible',
          data: {
            oneNatureChannel: true,
            oneTransferChannel: true,
            natureChannel: true,
            xbkNatureChannel: true,
            xbkTransferChannel: true,
            oneNatureChannel_xx: false,
            oneTransferChannel_xx: false
          }
        })
      }
    })
    if (activityId) {
      this.title = '编辑配置'
      this.queryActivityDetail(activityId, line)
    }
  },
  methods: {
    queryActivityDetail(activityId, line) {
      queryActivityDetail({ activityId })
        .then(({ payload }) => {
          // 参数回显整合
          const { activityTitle, img, oneTransferChannel, natureChannel, oneNatureChannel, xbkTransferChannel, xbkNatureChannel, headPic, contentPic, buttomUnlockPic, buttomHelpPic, buttomHelpSuccessPic, posterBackgroundPic, shareSquarePic, helpSuccessText, helpText, helpCoursePic } = payload
          const HEAD_PIC = getFileType(headPic) === 'img' ? '2' : '1'
          let formData = {
            activityTitle,
            HEAD_PIC,
            LIST_PIC: img,
            // CONTENT_PIC: contentPic,
            BUTTOM_UNLOCK_PIC: buttomUnlockPic,
            BUTTOM_HELP_PIC: buttomHelpPic,
            BUTTOM_HELP_SUCCESS_PIC: buttomHelpSuccessPic,
            POSTER_BACKGROUND_PIC: posterBackgroundPic,
            SHARE_SQUARE_PIC: shareSquarePic,
            HELP_COURSE_PIC: helpCoursePic,
            helpText,
            helpSuccessText
          }
          formData.CONTENT_PIC = contentPic.map(v => ({ url: v, uid: Math.floor(Math.random() * 1000000) }))
          // 头图 视频/图片 处理
          if (HEAD_PIC === '1') {
            formData.headVideo = headPic
          } else {
            formData.headImg = headPic
          }
          // 一对一/小熊 参数处理
          if (line === '1') {
            formData = {
              ...formData,
              oneTransferChannel,
              oneNatureChannel,
              natureChannel,
              xbkTransferChannel,
              xbkNatureChannel
            }
          } else {
            formData = {
              ...formData,
              oneTransferChannel_xx: oneTransferChannel,
              oneNatureChannel_xx: oneNatureChannel
            }
          }
          this.$refs.form.recoveryForm(formData)
        })
    },
    changeForm(newVal, oldVal) {
      // 头图联动
      if (newVal.HEAD_PIC !== oldVal.HEAD_PIC && newVal.HEAD_PIC) {
        const data = newVal.HEAD_PIC === '1' ? { headVideo: true, headImg: false } : { headVideo: false, headImg: true }
        this.$refs.form.set({
          type: 'visible',
          data
        })
      }
    },
    submitForm(vals) {
      console.log('vals', vals)
      const { line, activityId } = this.$route.query
      // 整合参数
      const { activityTitle, LIST_PIC, HEAD_PIC, headVideo, headImg, CONTENT_PIC, BUTTOM_UNLOCK_PIC, BUTTOM_HELP_PIC, BUTTOM_HELP_SUCCESS_PIC, POSTER_BACKGROUND_PIC, SHARE_SQUARE_PIC, HELP_COURSE_PIC, helpText, helpSuccessText, oneNatureChannel, oneTransferChannel, natureChannel, xbkNatureChannel, xbkTransferChannel, oneNatureChannel_xx, oneTransferChannel_xx } = vals
      const imgModeObj = { LIST_PIC, HEAD_PIC, BUTTOM_UNLOCK_PIC, BUTTOM_HELP_PIC, BUTTOM_HELP_SUCCESS_PIC, POSTER_BACKGROUND_PIC, SHARE_SQUARE_PIC, HELP_COURSE_PIC }
      const activityAttrModel = { activityTitle, helpText, helpSuccessText, oneNatureChannel, oneTransferChannel, natureChannel, xbkNatureChannel, xbkTransferChannel }
      let imgModeList = Object.keys(imgModeObj).map((v) => {
        if (v === 'HEAD_PIC') {
          const url = headVideo || headImg
          return {
            imgType: 'HEAD_PIC',
            sort: 1,
            url
          }
        }
        return {
          imgType: `${v}`,
          sort: 1,
          url: imgModeObj[v]
        }
      })

      // 多图处理
      const CONTENT_PIC_list = CONTENT_PIC.map((v, i) => ({
        imgType: 'CONTENT_PIC',
        sort: i + 1,
        url: v.url
      }))
      imgModeList = imgModeList.concat(CONTENT_PIC_list)

      // 小熊参数处理
      if (line === '2') {
        activityAttrModel.oneNatureChannel = oneNatureChannel_xx
        activityAttrModel.oneTransferChannel = oneTransferChannel_xx
        delete activityAttrModel.xbkNatureChannel
        delete activityAttrModel.xbkTransferChannel
      }

      // 参数体
      const payload = {
        activityType: lineMap[line],
        activityImgModel: {
          imgModeList
        },
        activityAttrModel
      }

      // 编辑参数处理
      if (activityId) {
        payload.activityId = activityId
        payload.activityImgModel.activityId = activityId
        payload.activityAttrModel.activityId = activityId
      }

      createConfigNew(payload)
        .then(() => {
          this.$message.success(`${activityId ? '编辑' : '创建'}成功～`)
          this.$router.push({ name: 'TransferManage', query: { kind: 'team' }})
        })
    },
    back() {
      const { kind } = this
      this.$router.push({ name: 'TransferManage', query: { kind }})
    }
  }
}
</script>
