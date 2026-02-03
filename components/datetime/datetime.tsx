interface DateTimeProps {
  dateString: string
  dateFormat?: 'MMM DD, YYYY' | 'MMM DD'
  className?: string
}

const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
  'MMM DD, YYYY': { month: 'short', day: '2-digit', year: 'numeric' },
  'MMM DD': { month: 'short', day: '2-digit' },
}

export function DateTime({
  dateString,
  dateFormat = 'MMM DD, YYYY',
  className,
}: DateTimeProps) {
  if (!dateString) return null

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return null

  const options = formatOptions[dateFormat]
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)

  return (
    <time dateTime={dateString} className={className}>
      {formattedDate}
    </time>
  )
}
