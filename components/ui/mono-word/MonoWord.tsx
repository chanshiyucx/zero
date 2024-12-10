import clsx from 'clsx'

interface MonoWordProps {
  label: string
  mode: 'word' | 'letter'
  className?: string
}

export function MonoWord({ label, mode = 'letter', className }: MonoWordProps) {
  const divide = mode === 'letter' ? '' : ' '
  const list = label.split(divide)
  return (
    <span className={clsx('inline-flex justify-between', className)}>
      {list.map((char, index) => (
        <span key={`${char}${index}`}>{char}</span>
      ))}
    </span>
  )
}
