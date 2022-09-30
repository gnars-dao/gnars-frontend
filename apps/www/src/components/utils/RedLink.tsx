import { FC } from "react"
import styled from "styled-components"

const StyledRedLink = styled.a`
  color: #d63c5e;
  text-decoration: underline;

  &:hover {
    color: #d63c5e;
    text-decoration: underline;
  }
`

interface IRedLinkProps {
  href: string
  children: React.ReactNode
}

export const RedLink: FC<IRedLinkProps> = ({ children, href }) => {
  return (
    <StyledRedLink href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledRedLink>
  )
}
