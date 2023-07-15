import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { CustomIssue } from '@/type'
import { queryIssueByLabel } from '@utils/service'
import { formatPage } from '@/utils/format'
import { useLoading } from '@/utils/hook'
import Loading from '@components/Loading'
import Comment from '@/components/Comment'
import styles from './index.module.css'

type FriendProps = {}

const Friend: React.FC<FriendProps> = () => {
  const loading = useLoading()
  const [list, setList] = useState<CustomIssue[]>([])

  const handleQuery = () => {
    queryIssueByLabel('Friend')
      .then(async (data) => {
        await loading()
        const list = formatPage(data[0])
        setList(list)
      })
      .catch(console.error)
  }

  useEffect(() => {
    handleQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="page">
      {list.length ? (
        <div className="fade lg:mt-4">
          <div className={clsx(styles.info, 'mx-4 mb-4')}>
            <p>不如来我这儿喝杯茶？嘿~</p>
            <p>★ Bio：蝉時雨</p>
            <p>★ Motto：蝉鸣如雨，花宵道中</p>
            <p>★ URL：https://chanshiyu.com</p>
            <p>
              ★ Avatar：
              <a
                className="link"
                href="https://cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/iavatar.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                点击获取
              </a>
            </p>
            <p>※ 以下友链按博主互访频率排序，并根据个人对博客内容喜好加权，博主将不定期更新排序并过滤阵亡名单。</p>
          </div>
          <ul className={clsx(styles.friends, 'm-0 grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5')}>
            {list.map((item) => {
              return (
                <li
                  key={item.name}
                  className="relative inline-block m-2 text-center overflow-hidden transform duration-300 hover:-translate-y-1"
                >
                  <a href={item.link} className="block py-4 w-full h-full" target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                  <img
                    className="absolute top-0 right-0 h-full rounded-full transform duration-300"
                    src={item.avatar}
                    alt={item.name}
                  />
                </li>
              )
            })}
          </ul>
          <Comment title="友链" />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Friend
