import Link from "next/link"

export default function TextLink(props) {
  const { href, children } = props
  return (
    <Link href={href} passHref>
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
