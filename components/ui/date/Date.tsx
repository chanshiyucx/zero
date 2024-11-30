import { format, parseISO } from 'date-fns'

interface DateProps {
  dateString: string
  dateFormat?: string
}

export function Date({ dateString, dateFormat = 'LLL d, yyyy' }: DateProps) {
  const date = format(parseISO(dateString), dateFormat)
  return <time dateTime={dateString}>{date}</time>
}
