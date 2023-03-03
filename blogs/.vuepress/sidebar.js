const fs = require('fs')
const path = require('path')

console.log('USE NODE_ENV:', process.env.NODE_ENV)

// let gistsDir = path.join(__dirname, '../gists')
// let awesomeDir = path.join(__dirname, '../awesome')
// let secretsDir = path.join(__dirname, '../secrets')
// let mapsDir = path.join(__dirname, '../maps')

let gistsDir = 'E:\\桌面\\存储仓库\\GITEE\\yooch\\blogs\\gists'
let awesomeDir = 'E:\\桌面\\存储仓库\\GITEE\\yooch\\blogs\\awesome'
let secretsDir = 'E:\\桌面\\存储仓库\\GITEE\\yooch\\blogs\\secrets'
let mapsDir = 'E:\\桌面\\存储仓库\\GITEE\\yooch\\blogs\\maps'

/**
 * 获取目录下所有 Markdown 文件
 * @param {String} src 路径字符串
 * @param {String} prefix 给返回值添加前缀
 * @todo 按照时间排序
 */
const getSRCs = (src, prefix = '') => {
  const filenames = []
  const fileTypes = /\.md$/
  const mainFiles = ['index.md', 'README.md']
  try {
    fs.readdirSync(src).forEach(file => {
      if (fileTypes.test(file) > 0) {
        if (!mainFiles.includes(file)) {
          filenames.push(file.replace('.md', ''))
        }
      }
    })
  } catch (err) {
    // 在 Build 时会碰到这个莫名奇妙的错误，
    // 和 __dirname node 执行路径有关，
    // 可以不用管
    // console.error('Error in getSRCs : ', err)
  }
  filenames.sort()
  return filenames.map(x => prefix + x)
}

const sidebars = [
  {
    title: '像素王国 / PXIEL',
    label: '项目公告',
    collapsable: false,
    open: true,
    path: '/pixel/',
    children: [
      'pixel/red',
      'pixel/orange',
      'pixel/yellow',
      // 'pixel/green',
      // 'pixel/blue',
      // 'pixel/purple',
      // 'pixel/brown',
      // 'pixel/black',
      // 'pixel/white',
    ],
  },
  {
    title: '技术博客 / Coder',
    label: '技术',
    collapsable: false,
    open: true,
    path: '/articles/',
    children: [
      'articles/use-scrollbars',
      'articles/crack-the-slider',
      'articles/css-light-travel',
      'articles/js-100',
      'articles/css-poaa',
      'articles/css-judge-direction',
      'articles/css-interesting',
      'articles/zfold',
    ],
  },
  {
    title: '心流思绪 / Heart Flows',
    label: '心流思绪',
    collapsable: false,
    open: true,
    path: '/flows/',
    children: [
      // 'flows/brain-history',
      
    ],
  },
  {
    title: '知识骨架',
    collapsable: true,
    open: false,
    path: '/maps/',
    children: getSRCs(mapsDir, 'maps/'),
  }
]

module.exports = {
  getSidebar() {
    return sidebars
  },
  getRecommends() {
    return {
      心流: {
        url: '/flows/long-night-dream.html',
        label: '长夜梦',
      },
      技术: {
        url: '/articles/use-scrollbars.html',
        label: '怎样定制复杂组件的自定义滚动条',
      },
    }
  }
}