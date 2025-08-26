import { format, isValid, parseISO } from 'date-fns'

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
  if (!dateString) return null

  const date = parseISO(dateString)
  if (!isValid(date)) return null

  const formattedDate = format(date, dateFormat)

  return (
    <time dateTime={dateString} className={className}>
      {formattedDate}
    </time>
  )
}
