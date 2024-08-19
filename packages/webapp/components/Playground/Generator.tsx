import { FC } from "react";
import { AccessoryIcon, BodyIcon, HeadIcon, NogglesIcon } from "../Icons";
import { PartPicker } from "./PartPicker";
import { Button, CenterProps, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { usePlaygroundState } from "@hooks/usePlaygroundState";
import { FaSquareFull } from "react-icons/fa";

export type GeneratorProps = {
  buttonSize: CenterProps["width"];
};

export const Generator: FC<GeneratorProps> = ({ buttonSize }) => {
  const { generate } = usePlaygroundState();

  return (
    <VStack alignItems={"center"} alignContent={"center"}>
      <Wrap justify={"center"} w={"fit-content"} textStyle={"h2"} fontSize={{ base: 14, lg: 18 }} flexShrink={0}>
        <WrapItem>
          <PartPicker part={"Head"} partKind={"heads"} icon={<HeadIcon boxSize={"24px"} />} size={buttonSize} />
        </WrapItem>
        <WrapItem>
          <PartPicker part={"Noggles"} partKind={"glasses"} icon={<NogglesIcon boxSize={"24px"} />} size={buttonSize} />
        </WrapItem>
        <WrapItem>
          <PartPicker part={"Body"} partKind={"bodies"} icon={<BodyIcon boxSize={"24px"} />} size={buttonSize} />
        </WrapItem>
        <WrapItem>
          <PartPicker
            part={"Accessory"}
            partKind={"accessories"}
            icon={<AccessoryIcon boxSize={"24px"} />}
            size={buttonSize}
          />
        </WrapItem>
        <WrapItem>
          <PartPicker
            part={"Background"}
            partKind={"backgrounds"}
            icon={
              <FaSquareFull
                style={{
                  display: "inline-block",
                  padding: "4px",
                  width: "24px",
                  height: "24px"
                }}
              />
            }
            size={buttonSize}
          />
        </WrapItem>
      </Wrap>
      <Button onClick={generate} flexShrink={0} size={"lg"} w={"full"}>
        Generate Gnars
      </Button>
    </VStack>
  );
};
