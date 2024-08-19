import { FC } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

export const RoundButton: FC<ButtonProps> = (props) => {
  return <Button variant={"outline"} borderRadius={"full"} {...props} />;
};
