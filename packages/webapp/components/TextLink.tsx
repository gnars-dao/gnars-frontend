import Link, { LinkProps } from "next/link"
import { PropsWithChildren } from "react"

export default function TextLink(props: PropsWithChildren<LinkProps>) {
  const { href, children } = props
  return (
    <Link href={href} passHref legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-hoverRed underline"
      >
        {children}
      </a>
    </Link>
  )
}
