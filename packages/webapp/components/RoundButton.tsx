import { Button, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

export const RoundButton: FC<ButtonProps> = (props) => {
  return <Button variant={"outline"} borderRadius={"full"} {...props} />;
};
