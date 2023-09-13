<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <textarea
      :id="tinymceId"
      class="tinymce-textarea"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
// 当前版本：Version: 5.2.0 (2020-02-13)
// 现将CDN放在美术宝的OSS上，可以在下面tinymce中文网找更多插件
// http://tinymce.ax-z.cn/more-plugins/bdmap.php
// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
const tinymceCDN =
  'https://cdnvip.meishubao.com/vipboss/static/tinymce/tinymce.min.js'

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function() {
        return (
          'vue-tinymce-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    place: {
      type: String,
      default: '详情'
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    modify: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      placeholder: '请输入',
      languageTypeList: {
        en: 'en',
        zh: 'zh_CN',
        es: 'es_MX',
        ja: 'ja'
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.placeholder = this.place

        if (!this.hasChange && this.hasInit) {
          this.$nextTick(() =>
            window.tinymce.get(this.tinymceId).setContent(val || '')
          )
        }
        this.hasChange = false
        if (this.modify) {
          this.$emit('update:modify', false)
        }
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, err => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        // skin:'oxide-dark',
        language: 'zh_CN',
        plugins: plugins,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        height: 650, // 编辑器高度
        min_height: 400,
        end_container_on_empty_block: true,

        /* content_css: [ //可设置编辑区内容展示的css，谨慎使用
        '/static/reset.css',
        '/static/ax.css',
        '/static/css.css',
    ],*/
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        menubar: '',
        body_class: 'panel-body ',
        object_resizing: false,
        powerpaste_word_import: 'clean',
        // paste_webkit_styles: 'all', // 粘贴保留样式
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        importcss_append: true,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            _this.hasChange = editor.getContent() !== ''
            _this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', e => {
            _this.fullscreen = e.state
          })
        },
        images_upload_handler(blobInfo, success, failure, progress) {
          progress(0)
          console.log('res----', blobInfo, success, failure)
          _this.$emit('upload', { file: blobInfo.blob() }, res => {
            progress(100)

            if (res) {
              console.log('res----', res)
              success(res)
            } else {
              // failure('出现未知问题，刷新页面，或者联系程序员')
            }
          })
        }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container {
  ::v-deep  .mce-fullscreen {
  z-index: 10000;
}
}
.tinymce-container {
  ::v-deep .tox-tinymce {
    z-index: 0;
  }
}

.tinymce-container {
  ::v-deep .tox-statusbar__branding {
    display: none !important;
  }
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
</style>
