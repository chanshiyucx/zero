import { Space } from '@/components/icons'

export default function NotFound() {
  return (
    <div className="page flex flex-col items-center justify-center space-y-2">
      <Space width="20rem" height="20rem" />
      <p>404 | This page could not be found.</p>
    </div>
  )
}
