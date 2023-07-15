import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { CustomIssue } from '@/type'
import { queryIssueByLabel } from '@utils/service'
import { formatPage } from '@/utils/format'
import { useLoading } from '@/utils/hook'
import Loading from '@components/Loading'
import Comment from '@/components/Comment'
import styles from './index.module.css'

type BookProps = {}

const Book: React.FC<BookProps> = () => {
  const loading = useLoading()
  const [list, setList] = useState<CustomIssue[]>([])

  const handleQuery = () => {
    queryIssueByLabel('Book')
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
          <div className="grid grid-cols-1 xl:grid-cols-2">
            {list.map((item) => {
              return (
                <div
                  key={item.name}
                  className={clsx(styles.book, 'm-2 p-3 transform duration-300 hover:-translate-y-1')}
                >
                  <div className="flex">
                    <div className={clsx(styles.cover, 'relative mr-3 mb-4')}>
                      <img src={item.cover} alt={item.name} />
                    </div>
                    <div className={styles.info}>
                      <h3 className="text-lg mb-1 transform duration-300">
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
                </div>
              )
            })}
          </div>
          <Comment title="书单" />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Book
