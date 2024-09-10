import { FC, RefObject, useEffect } from "react";
import { AccessoryIcon, BodyIcon, HeadIcon, NogglesIcon } from "./Icons";
import {
  Button,
  ButtonProps,
  DarkMode,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  StackProps,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Gnartwork } from "@utils";
import { FaInfo, FaSquareFull } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { useHover } from "usehooks-ts";

export interface GnarToolbarProps extends StackProps {
  isOg: boolean;
  gnarImageRef: RefObject<HTMLImageElement>;
  downloadFilename: string;
  gnartwork: Gnartwork;
  size?: ButtonProps["size"];
}

export const GnarToolbar: FC<GnarToolbarProps> = ({
  isOg,
  gnarImageRef,
  downloadFilename,
  gnartwork,
  size = "md",
  ...props
}) => {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();

  const imageIsHovered = useHover(gnarImageRef);
  useEffect(() => {
    imageIsHovered ? onOpen() : onClose();
  }, [imageIsHovered, onOpen, onClose]);

  return (
    <DarkMode>
      <HStack color={"chakra-body-text"} {...props}>
        {!isOg && (
          <Popover
            isOpen={isOpen}
            onClose={onClose}
            placement={"bottom"}
            closeOnBlur
            autoFocus={false}
            returnFocusOnClose={false}
          >
            <PopoverTrigger>
              <IconButton
                size={size}
                isActive={isOpen}
                variant={"outline"}
                borderRadius={"full"}
                onClick={onToggle}
                aria-label={"Traits info"}
                icon={<FaInfo />}
              />
            </PopoverTrigger>

            <PopoverContent w={"fit-content"} maxW={"xl"}>
              <PopoverArrow />
              <PopoverBody p={1}>
                <SimpleGrid
                  p={2}
                  textStyle={"h2"}
                  fontSize={{ base: "2xl", lg: "3xl" }}
                  templateColumns={"30px 1fr"}
                  columns={2}
                  spacing={1}
                  alignItems={"center"}
                >
                  <NogglesIcon />
                  <Text>{gnartwork.parts.noggles.trait}</Text>
                  <HeadIcon />
                  <Text>{gnartwork.parts.head.trait}</Text>
                  <AccessoryIcon />
                  <Text>{gnartwork.parts.accessory.trait}</Text>
                  <BodyIcon />
                  <Text>{gnartwork.parts.body.trait}</Text>
                  {gnartwork.parts.background && (
                    <>
                      <FaSquareFull
                        style={{
                          display: "inline-block",
                          padding: "4px",
                          width: "24px",
                          height: "24px"
                        }}
                      />
                      <Text>{gnartwork.parts.background.trait}</Text>
                    </>
                  )}
                </SimpleGrid>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
        <Button
          size={size}
          variant={"outline"}
          borderRadius={"full"}
          leftIcon={<MdFileDownload />}
          onClick={() => {
            const canvas = document.createElement("canvas");
            canvas.width = 512;
            canvas.height = 512;
            canvas.getContext("2d")?.drawImage(gnarImageRef.current!, 0, 0, 512, 512);
            const link = document.createElement("a");
            link.href = canvas.toDataURL();
            link.download = `${downloadFilename}.png`;
            link.click();
            canvas.remove();
            link.remove();
          }}
        >
          PNG
        </Button>
      </HStack>
    </DarkMode>
  );
};
