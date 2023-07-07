import type { Theme } from '@/type'
import Ayaka from '@/assets/images/ayaka.jpg'
import Beelzebul from '@/assets/images/beelzebul.jpg'
import Ganyu from '@/assets/images/ganyu.jpg'
import Hutao from '@/assets/images/hutao.jpg'
import Keqing from '@/assets/images/keqing.jpg'
import Kokomi from '@/assets/images/kokomi.jpg'
import Nahida from '@/assets/images/nahida.jpg'
import Yoimiya from '@/assets/images/yoimiya.jpg'

const themeList: Theme[] = [
  {
    type: 'Hutao',
    name: '雪霁梅香',
    description: '幽蝶留芳之处',
    color: {
      primary: '#E06458',
      background: '#FCFAF2',
    },
    image: Hutao,
    url: 'https://www.bilibili.com/video/av591337987/',
  },
  {
    type: 'Keqing',
    name: '霆霓快雨',
    description: '千帆齐聚之城',
    color: {
      primary: '#8D83A3',
      background: '#8D83A3',
    },
    image: Keqing,
    url: 'https://www.bilibili.com/video/BV14K4y1Q7PH/',
  },
  {
    type: 'Ganyu',
    name: '循循守月',
    description: '仙泽麟行之迹',
    color: {
      primary: '#5260A6',
      background: '#5260A6',
    },
    image: Ganyu,
    url: 'https://www.bilibili.com/video/BV1ZL4y147cB/',
  },
  {
    type: 'Beelzebul',
    name: '一心净土',
    description: '天光澄寂之景',
    color: {
      primary: '#9F87C2',
      background: '#9F87C2',
    },
    image: Beelzebul,
    url: 'https://www.bilibili.com/video/BV1UY411g7RU/',
  },
  {
    type: 'Ayaka',
    name: '白鹭霜华',
    description: '白鹭儃伫之思',
    color: {
      primary: '#7A8FB7',
      background: '#7A8FB7',
    },
    image: Ayaka,
    url: 'https://www.bilibili.com/video/BV1nY4y1a76M/',
  },
  {
    type: 'Yoimiya',
    name: '琉焰华舞',
    description: '硝彩盛放之光',
    color: {
      primary: '#BC5039',
      background: '#BC5039',
    },
    image: Yoimiya,
    url: 'https://www.bilibili.com/video/BV1Zd4y1K76h/',
  },
  {
    type: 'Kokomi',
    name: '真珠之智',
    description: '浮岳映虹之波',
    color: {
      primary: '#BF9997',
      background: '#BF9997',
    },
    image: Kokomi,
    url: 'https://www.bilibili.com/video/BV1ML411N7hm/',
  },
  {
    type: 'Nahida',
    name: '白草净华',
    description: '如风如露之思',
    color: {
      primary: '#9DBB92',
      background: '#9DBB92',
    },
    image: Nahida,
    url: 'https://www.bilibili.com/video/BV1wm4y1m7DC/',
  },
]

export default themeList
