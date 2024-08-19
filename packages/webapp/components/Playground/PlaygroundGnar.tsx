import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  DarkMode,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
  SimpleGrid,
  SimpleGridProps,
  StackProps,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { FaInfo } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { FC, useRef } from "react";
import { FaSquareFull } from "react-icons/fa";
import { Gnartwork } from "utils";
import { GnarImage } from "components/GnarImage";
import { GnarToolbar } from "components/GnarToolbar";

interface PlaygroundGnarProps extends StackProps {
  playgroundGnarId: number;
  gnartwork: Gnartwork;
}

const PlaygroundGnar: FC<PlaygroundGnarProps> = ({ playgroundGnarId, gnartwork, ...props }) => {
  const gnarImageRef = useRef<HTMLImageElement>(null);

  return (
    <VStack {...props}>
      <GnarImage isOg={false} gnartwork={gnartwork} ref={gnarImageRef} />

      <GnarToolbar
        size={"xs"}
        isOg={false}
        downloadFilename={`playground-gnar-${playgroundGnarId}`}
        gnarImageRef={gnarImageRef}
        gnartwork={gnartwork}
      />
    </VStack>
  );
};
export default PlaygroundGnar;
