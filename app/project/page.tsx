import { ExternalLink } from 'lucide-react'
import Comment from '@/components/Comment'
import data from './index.json'

export default function FriendLayout() {
  return (
    <div className="page project">
      <ul>
        {data.map((item) => {
          return (
            <li key={item.name} className="mb-10 leading-relaxed">
              <a className="link text-xl" href={item.code} target="_blank" rel="noopener noreferrer">
                {item.name}
                <ExternalLink className="inline-block h-5 w-5 -translate-y-0.5 transform" />
              </a>
              <p>{item.description}</p>
            </li>
          )
        })}
      </ul>
      <Comment term="项目" />
    </div>
  )
}
