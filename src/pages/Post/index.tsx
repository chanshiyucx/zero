import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Issue } from '@/type'
import { queryIssue, increaseHot } from '@utils/service'
import { formatIssue } from '@utils/format'
import { useLoading } from '@/utils/hook'
import Loading from '@components/Loading'
import Markdown from '@/components/Markdown'
import Comment from '@/components/Comment'
import { Calendar, Bookmark, Tag, Eye } from '@components/Icons'

type PostParams = {
  num: string
}

type PostProps = {}

const Post: React.FC<PostProps> = () => {
  const loadingRef = useLoading()
  const { num = '' } = useParams<PostParams>()
  const [loading, setLoading] = useState(false)
  const [issue, setIssue] = useState<Issue>()
  const [hot, setHot] = useState(0)

  const handleQuery = () => {
    setLoading(true)
    queryIssue(num)
      .then(async (data) => {
        await loadingRef()
        data = formatIssue(data)
        setIssue(data)

        increaseHot(data.id, data.title).then((h) => {
          setHot(h)
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num])

  return (
    <div className="page">
      {loading ? (
        <Loading />
      ) : (
        <div className="fade">
          <div className="mt-4 mb-8">
            <h3 className="mb-3 text-2xl lg:text-4xl italic">{issue?.title}</h3>
            <div className="flex justify-start mt-2 break-keep">
              <Calendar className="mr-0.5" />
              {issue?.created_at}
              <Eye className="ml-1 sm:ml-4 mr-0.5" />
              {hot || 0}℃
              <Bookmark className="ml-1 sm:ml-4 mr-0.5" />
              {issue?.milestone ? issue?.milestone.title : '未分类'}
              <Tag className="ml-1 sm:ml-4 mr-0.5" />
              {issue?.labels.map((label) => (
                <span className="mr-1 sm:ml-2" key={label.id}>
                  {label.name}
                </span>
              ))}
            </div>
          </div>
          <Markdown content={issue?.body ?? ''} />
          <Comment title={issue?.title as string} />
        </div>
      )}
    </div>
  )
}

export default Post
