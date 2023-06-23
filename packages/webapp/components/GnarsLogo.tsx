import { Image, ImageProps } from "@chakra-ui/react"

export interface GnarsLogoProps extends ImageProps {}

export const GnarsLogo: React.FC<GnarsLogoProps> = ({ ...props }) => (
  <Image alt="Gnars logo" h={"40px"} src="/images/logo.png" {...props} />
)
