import { createLink } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { AnchorHTMLAttributes, Ref } from 'react'
import { cn } from '@/lib/utils'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  ref?: Ref<HTMLAnchorElement>
}

/**
 * Styled router links. `createLink` keeps TanStack Router's type safety:
 * `<LinkCard to="/anagrafica/$section" params={{ section: 'notai' }}>`.
 */

function TextLinkAnchor({ className, ...props }: AnchorProps) {
  return (
    <a
      className={cn(
        'text-link underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  )
}
export const TextLink = createLink(TextLinkAnchor)

/** "Title →" link, used as a card heading. */
function ArrowLinkAnchor({ className, children, ...props }: AnchorProps) {
  return (
    <a
      className={cn(
        'group inline-flex items-center gap-2 text-sm font-semibold text-link focus-visible:outline-none',
        className,
      )}
      {...props}
    >
      <span className="underline-offset-4 group-hover:underline group-focus-visible:underline">
        {children}
      </span>
      <ArrowRight
        aria-hidden
        className="size-3.5 transition-transform group-hover:translate-x-0.5"
      />
    </a>
  )
}
export const ArrowLink = createLink(ArrowLinkAnchor)

/** Whole-card link with a title and arrow ("Notai →"). */
function LinkCardAnchor({ className, children, ...props }: AnchorProps) {
  return (
    <a
      className={cn(
        'group flex items-center gap-2 rounded-lg border bg-card px-4 py-4 text-sm font-semibold text-link transition-colors hover:border-link/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-3.5 transition-transform group-hover:translate-x-0.5"
      />
    </a>
  )
}
export const LinkCard = createLink(LinkCardAnchor)
