/**
 * 资源文件
 * 把模型和图片分开进行加载
 */
const filePath = './static/images/'
const fileSuffix = [
  'gradient',
  'aperture',
  'redCircle',
  "label",
  'glow',
  'light_column',
  'aircraft'
]

const textures = fileSuffix.map(item => {
  return {
    name: item,
    url: filePath + item + '.png'
  }
})

textures.push({
  name: 'earth',
  url: filePath + 'earth.jpeg'
})

const resources = {
  textures
}


export {
  resources
}