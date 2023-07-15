/**
 *  延时函数
 */
export const delay = <T>(time: number): Promise<T> => new Promise((r) => setTimeout(r, time))

/**
 * 生成范围内随机整数
 */
export const random = (a: number, b: number) => Math.floor(Math.random() * (b - a) + a)

/**
 * 洗牌算法
 */
export const shuffle = <T>(arr: T[]): T[] => {
  let i = arr.length
  let j
  while (i) {
    j = Math.floor(Math.random() * i--)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * 日期转换
 */
export const parseTime = (time: string, format = '{y}年{m}月{d}日') => {
  const date = new Date(time)
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value: string | number = formatObj[key as keyof typeof formatObj]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return `${value}` || '0'
  })
  return time_str
}

/**
 * url 转换
 */
export const getLocation = (href: string) => {
  const a = document.createElement('a')
  a.href = href
  return a
}

/**
 * 图片 cdn 加速【時雨自用】
 */
const isMe = window.location.host.includes('chanshiyu.com')
const GithubHost = 'raw.githubusercontent.com'
const FileRepo = 'https://chanshiyu.com/blog/IMAGES/'
export const fileCDN = (src: string) => {
  if (isMe && src.includes(GithubHost)) {
    const filePath = src.split('/master/')[1].replace(/^IMAGES\//, '')
    return `${FileRepo}${filePath}`
  }
  return src
}

/**
 * Nya
 */
export const Nya = () => {
  const labelStyle = 'line-height:22px;color:#FFF;background:#DB493C;border-radius:3px;'
  const site = 'https://chanshiyu.com'
  const themeRepo = 'https://github.com/chanshiyucx/zero'
  console.info(`%c 蝉時雨 %c`, labelStyle, '', site)
  console.info('%c 主题 %c', labelStyle, '', themeRepo)
  console.info('~❀~ 发现控制台报错请务必联系博主 ~❀~')
}
