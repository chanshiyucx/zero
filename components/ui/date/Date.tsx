import { format, parseISO } from 'date-fns'

interface DateProps {
  dateString: string
  dateFormat?: string
  className?: string
}

export function Date({
  dateString,
  dateFormat = 'LLL dd', // LLL dd, yyyy
  className,
}: DateProps) {
  const date = format(parseISO(dateString), dateFormat)
  return (
    <time dateTime={dateString} className={className}>
      {date}
    </time>
  )
}
