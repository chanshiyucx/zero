import React, { useEffect } from 'react'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'
import './index.css'
import config from '@/config'

type CommentProps = {
  title: string
}

const Comment: React.FC<CommentProps> = ({ title }) => {
  useEffect(() => {
    const id = window.location.hash.replace(/#/, "")
    const gitalk = new Gitalk({ ...config.gitalk, title, id })
    gitalk.render('gitalk')
  }, [title])

  return <div id="gitalk" className="comment"></div>
}

export default Comment
