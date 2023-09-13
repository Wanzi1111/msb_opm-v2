// const req = require.context('../../icons/svg', false, /\.svg$/)
const req = import.meta.globEager('../../icons/svg/*.svg')
// const req = import.meta.glob('../../icons/svg/*.svg', { eager: true })
const requireAll = requireContext => Object.keys(requireContext)

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map(i => {
  console.log('i', i)
  return i.match(re)[1]
})

export default svgIcons
