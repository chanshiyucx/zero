import { Signature, SignatureWriting } from '@/components/icons'
import { cn } from '@/lib/utils/style'

const signatureClassName = 'h-auto w-40'

/** The signature writes itself over a muted copy of its own strokes */
export function Logo() {
  return (
    <div className="relative">
      <Signature
        fill="var(--color-muted)"
        className={cn('absolute top-0 left-0', signatureClassName)}
      />
      {/* Positioned so it paints above the absolute muted copy */}
      <SignatureWriting
        className={cn('logo-signature relative', signatureClassName)}
      />
    </div>
  )
}
