import React, { useState, useEffect } from 'react'
import { Issue } from '@/type'
import { queryIssueByLabel } from '@utils/service'
import { useLoading } from '@/utils/hook'
import Loading from '@components/Loading'
import Markdown from '@/components/Markdown'
import Comment from '@/components/Comment'

type AboutProps = {}

const About: React.FC<AboutProps> = () => {
  const loading = useLoading()
  const [issue, setIssue] = useState<Issue>()

  const handleQuery = () => {
    queryIssueByLabel('About')
      .then(async (data) => {
        await loading()
        setIssue(data[0])
      })
      .catch(console.error)
  }

  useEffect(() => {
    handleQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="page">
      {issue ? (
        <div className="fade">
          <Markdown content={issue!.body} />
          <Comment title="关于" />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default About
