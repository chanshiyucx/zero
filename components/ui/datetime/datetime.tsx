import { format, parseISO } from 'date-fns'

interface DateTimeProps {
  dateString: string
  dateFormat?: string
  className?: string
}

export function DateTime({
  dateString,
  dateFormat = 'LLL dd', // LLL dd, yyyy
  className,
}: DateTimeProps) {
  const date = format(parseISO(dateString), dateFormat)
  return (
    <time dateTime={dateString} className={className}>
      {date}
    </time>
  )
}
