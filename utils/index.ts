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
 * 加载图片
 */
export const loadImage = (src: string) =>
  new Promise<boolean>((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve(true)
    }
    img.onerror = () => {
      resolve(false)
    }
    img.src = src
  })

/**
 * 写入缓存
 */
export const localSave = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

/**
 * 读取缓存
 */
export const localRead = (key: string, defaultValue = ''): string => {
  return localStorage.getItem(key) ?? defaultValue
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
