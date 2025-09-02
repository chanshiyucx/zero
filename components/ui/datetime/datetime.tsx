import dayjs from 'dayjs'

interface DateTimeProps {
  dateString: string
  dateFormat?: string
  className?: string
}

export function DateTime({
  dateString,
  dateFormat = 'MMM DD, YYYY',
  className,
}: DateTimeProps) {
  if (!dateString) return null

  const date = dayjs(dateString)
  if (!date.isValid()) return null
  const formattedDate = date.format(dateFormat)

  return (
    <time dateTime={dateString} className={className}>
      {formattedDate}
    </time>
  )
}
