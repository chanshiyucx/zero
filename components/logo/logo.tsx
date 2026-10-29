import { Signature } from '@/components/icons'
import { cn } from '@/lib/utils/style'

const signatureClassName = 'h-auto w-46 drop-shadow-lg max-md:w-36'

/** The signature writes itself over a muted copy of its own strokes */
export function Logo() {
  return (
    <div className="relative">
      <Signature
        fill="var(--color-muted)"
        className={cn('absolute top-0 left-0', signatureClassName)}
      />
      <Signature className={cn('logo-signature', signatureClassName)} />
    </div>
  )
}
