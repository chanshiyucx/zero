import data from './index.json'

export default function FriendLayout() {
  return (
    <div className="page friend flex-col items-start py-16">
      <div className="mx-4 mb-4 block leading-7 tracking-wide">
        <p>不如来我这儿喝杯茶？嘿~</p>
        <p>★ Bio：蝉時雨</p>
        <p>★ Motto：蝉鸣如雨，花宵道中</p>
        <p>★ Blog：https://chanshiyu.com</p>
        <p>
          ★ Avatar：
          <a className="avatar" href="/avatar.jpg" target="_blank" rel="noopener noreferrer">
            点击获取
          </a>
        </p>
        <p>※ 以下友链按博主互访频率排序，并根据个人对博客内容喜好加权，博主将不定期更新排序并过滤阵亡名单。</p>
      </div>
      <ul className="grid w-full grid-cols-3 sm:grid-cols-4 xl:grid-cols-5">
        {data.map((item) => {
          return (
            <li
              key={item.name}
              className="relative m-2 inline-block transform overflow-hidden text-center duration-300 hover:-translate-y-1"
            >
              <a href={item.link} className="block h-full w-full py-4" target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
              <img
                className="absolute right-0 top-0 h-full transform rounded-full duration-300"
                src={item.avatar}
                alt={item.name}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
