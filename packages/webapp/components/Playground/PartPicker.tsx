import { FC, useMemo } from "react";
import {
  Button,
  Center,
  CenterProps,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
  useDisclosure
} from "@chakra-ui/react";
import gnarDataV2 from "@data/image-data-V2.json";
import { usePlaygroundState } from "@hooks/usePlaygroundState";
import { GnarPart, PartKind } from "@utils/";
import buildSvg from "@utils/buildSvg";
import { memoize, some } from "lodash";
import { FaRandom } from "react-icons/fa";

export type PartPickerProps = {
  part: string;
  partKind: PartKind;
  icon: JSX.Element;
  size: CenterProps["width"];
} & StackProps;
export const PartPicker: FC<PartPickerProps> = ({ part, partKind, icon, size, ...props }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    selectedParts: { [partKind]: selectedParts },
    parts: { [partKind]: parts },
    select,
    clearSelection
  } = usePlaygroundState();
  const chosenPartImage = useMemo(() => {
    if (!selectedParts || selectedParts.length === 0) {
      return <FaRandom size={"32px"} />;
    }

    const imageUrl = buildSvg([selectedParts[0]], gnarDataV2.palette);
    return <Image src={imageUrl} alt={""} />;
  }, [selectedParts]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"} size={"4xl"}>
        <ModalOverlay />
        <ModalContent mx={2} pb={4} color={"chakra-body-text"} bgColor={"chakra-body-bg"}>
          <ModalHeader textStyle={"h2"} textAlign={"center"}>
            {part} picker
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid templateColumns={"repeat(auto-fit, 96px)"} columnGap={2} rowGap={4}>
              <VStack h={"132px"} alignItems={"center"} justifyContent={"end"} spacing={0}>
                <Text fontSize={"xs"} textAlign={"center"} whiteSpace={"normal"}>
                  Random
                </Text>
                <Button
                  p={0}
                  h={"96px"}
                  w={"full"}
                  variant={"outline"}
                  isActive={!selectedParts}
                  onClick={() => {
                    clearSelection(partKind);
                    onClose();
                  }}
                >
                  <Center boxSize={"96px"}>
                    <FaRandom size={"32px"} />
                  </Center>
                </Button>
              </VStack>
              {parts.map((part, index) => {
                const imageUrl = buildPart(part);
                return (
                  <VStack h={"132px"} key={`part-${index}`} alignItems={"center"} justifyContent={"end"} spacing={0}>
                    <Text fontSize={"xs"} textAlign={"center"} whiteSpace={"normal"}>
                      {part.trait}
                    </Text>
                    <Button
                      key={part.trait}
                      p={0}
                      h={"fit-content"}
                      w={"fit-content"}
                      variant={"outline"}
                      isActive={some(selectedParts, (selectedPart) => selectedPart.trait === part.trait)}
                      onClick={() => {
                        select(partKind, part);
                        onClose();
                      }}
                    >
                      <Image src={imageUrl} alt={""} />
                    </Button>
                  </VStack>
                );
              })}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>

      <VStack spacing={0} alignItems={"start"} {...props}>
        <Text>
          {icon} {part}
        </Text>
        <Button variant={"ghost"} p={0} onClick={onOpen} w={"fit-content"} h={"fit-content"}>
          <Center w={size} h={size} borderWidth={1} borderRadius={"md"}>
            {chosenPartImage}
          </Center>
        </Button>
      </VStack>
    </>
  );
};
const buildPart = memoize(
  (part: GnarPart) => buildSvg([part], gnarDataV2.palette),
  (part) => part.data
);
