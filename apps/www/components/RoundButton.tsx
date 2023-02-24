import clsx from "clsx"
import { Button, ButtonProps } from "@chakra-ui/react"
import { FC } from "react"

export const RoundButton: FC<ButtonProps> = (props) => {
  return <Button borderRadius={"full"} {...props} />
}
