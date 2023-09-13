export default [
  {
    prop: 'content',
    label: '图文详情',
    type: 'tinymce', // 富文本,
    attr: {
      width: '600px',
      toolbar: [
        'code undo redo | formatselect fontselect fontsizeselect',
        'bold italic underline strikethrough | alignleft aligncenter alignright outdent indent | bullist numlist indent2em lineheight | formatpainter fullscreen',
        'blockquote hr image'
      ],
      menubar: ''
    }
  }
]
export const actions = ({ preview, back }) => {
  return {
    back: {
      hide: true
    },
    submit: {
      hide: true
    },
    preview: {
      hide: true
    },
    uback: {
      hide: true
    }
  }
}
