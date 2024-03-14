import { FC } from 'react'
import Poetry from '@/components/Poetry'

const Site: FC = () => (
  <div className="flex flex-1 flex-col justify-end pb-3 pl-3">
    <div className="pb-12 tracking-wider">
      <h3 className="text-6xl">蝉時雨</h3>
      <span className="inline-block pl-1 pt-2 text-xl">蝉鸣如雨 花宵道中</span>
    </div>
    <Poetry />
  </div>
)

export default Site
