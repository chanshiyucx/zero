import React, { useState, useEffect } from 'react'
import { CustomIssue } from '@/type'
import { queryIssueByLabel } from '@utils/service'
import { formatPage } from '@/utils/format'
import { useLoading } from '@/utils/hook'
import Loading from '@components/Loading'
import Comment from '@/components/Comment'
import { External } from '@components/Icons'

type ProjectProps = {}

const Project: React.FC<ProjectProps> = () => {
  const loading = useLoading()
  const [list, setList] = useState<CustomIssue[]>([])

  const handleQuery = () => {
    queryIssueByLabel('Project')
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
          <div>
            {list.map((item) => {
              return (
                <div key={item.name} className="mb-10 leading-7">
                  <a className="link text-xl" href={item.code} target="_blank" rel="noopener noreferrer">
                    {item.name}
                    <External className="inline-block w-5 h-5 transform -translate-y-0.5" />
                  </a>
                  <p>{item.description}</p>
                </div>
              )
            })}
          </div>
          <Comment title="项目" />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Project
