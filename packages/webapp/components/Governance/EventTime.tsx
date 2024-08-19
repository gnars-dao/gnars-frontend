import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text
} from "@chakra-ui/react";
import { FC } from "react";
import { RiTimeFill } from "react-icons/ri";

export interface EventTimeProps {
  timestamp: number;
}

export const EventTime: FC<EventTimeProps> = ({ timestamp }) => {
  const date = new Date(timestamp * 1000);
  const relativeTime = formatRelativeTime(timestamp);

  return (
    <Popover
      isLazy
      placement={"bottom-end"}
      trigger={"hover"}
      arrowShadowColor={"rgba(255, 255, 255, 0.35)"} //FIXME move style to the theme
    >
      <PopoverTrigger>
        <Button size={"xs"} variant={"link"} color={"whiteAlpha.400"}>
          <HStack spacing={1} whiteSpace={"nowrap"}>
            <Text>{relativeTime}</Text>
            <RiTimeFill />
          </HStack>
        </Button>
      </PopoverTrigger>
      <PopoverContent w={"fit-content"} _focus={{ boxShadow: "none" }}>
        <PopoverArrow />
        <PopoverBody>{date.toLocaleString()}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const formatRelativeTime = (timestamp: number) => {
  const now = Math.floor(Date.now() / 1000);
  const seconds = now - timestamp;

  if (seconds < 60) {
    return `just now`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.floor(seconds / 3600);

  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);

  return `${days}d ago`;
};
