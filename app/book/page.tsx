import Comment from '@/components/Comment'
import data from './index.json'

export default function FriendLayout() {
  return (
    <div className="page book">
      <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {data.map((item) => {
          return (
            <li key={item.name} className="transform p-3 duration-300 hover:-translate-y-1">
              <div className="flex">
                <div className="cover relative mb-4 mr-3">
                  <img src={item.cover} alt={item.name} />
                </div>
                <div className="info">
                  <h3 className="mb-1 line-clamp-1 transform text-lg duration-300">
                    <a href={item.link} target="_blank" rel="noreferrer noopener">
                      {item.name}
                    </a>
                  </h3>
                  <p>作者：{item.author}</p>
                  <p>出版时间：{item.published}</p>
                  <p>阅读进度：{item.progress}</p>
                  <p>
                    读书笔记：
                    {item.postLink ? (
                      <a href={item.postLink} target="_blank" rel="noopener noreferrer">
                        {item.postTitle}
                      </a>
                    ) : (
                      <>暂无</>
                    )}
                  </p>
                </div>
              </div>
              <p className="text-justify">{item.description}</p>
            </li>
          )
        })}
      </ul>
      <Comment term="书斋" />
    </div>
  )
}
