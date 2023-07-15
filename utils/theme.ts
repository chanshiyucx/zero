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
      primary: '#827595',
      background: '#E6E3F6',
    },
    image: Keqing,
    url: 'https://www.bilibili.com/video/BV14K4y1Q7PH/',
  },
  {
    type: 'Nahida',
    name: '白草净华',
    description: '如风如露之思',
    color: {
      primary: '#7EA08A',
      background: '#F3F7F2',
    },
    image: Nahida,
    url: 'https://www.bilibili.com/video/BV1wm4y1m7DC/',
  },
  {
    type: 'Ganyu',
    name: '循循守月',
    description: '仙泽麟行之迹',
    color: {
      primary: '#5260A6',
      background: '#E2E5F5',
    },
    image: Ganyu,
    url: 'https://www.bilibili.com/video/BV1ZL4y147cB/',
  },
  {
    type: 'Kokomi',
    name: '真珠之智',
    description: '浮岳映虹之波',
    color: {
      primary: '#BF9997',
      background: '#F2DFD9',
    },
    image: Kokomi,
    url: 'https://www.bilibili.com/video/BV1ML411N7hm/',
  },

  {
    type: 'Ayaka',
    name: '白鹭霜华',
    description: '白鹭儃伫之思',
    color: {
      primary: '#8996B2',
      background: '#D8E2EC',
    },
    image: Ayaka,
    url: 'https://www.bilibili.com/video/BV1nY4y1a76M/',
  },
  {
    type: 'Yoimiya',
    name: '琉焰华舞',
    description: '硝彩盛放之光',
    color: {
      primary: '#C15C42',
      background: '#F3E8DB',
    },
    image: Yoimiya,
    url: 'https://www.bilibili.com/video/BV1Zd4y1K76h/',
  },
  {
    type: 'Beelzebul',
    name: '一心净土',
    description: '天光澄寂之景',
    color: {
      primary: '#8C78B0',
      background: '#E3DBED',
    },
    image: Beelzebul,
    url: 'https://www.bilibili.com/video/BV1UY411g7RU/',
  },
]

export default themeList
