import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Spinner,
  Tag,
  Text,
  useBreakpointValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAccount, useContractWrite } from "wagmi"
import { mainnet } from "wagmi/chains"
import { useWalletOgGnars } from "../hooks/useWalletOgGnars"
import { getGnartwork } from "../utils"
import { usePrepareGnarsV2AuctionHouseClaimGnars } from "../utils/sdk"
import { ContractActionButton } from "./ContractActionButton"
import { GnarImage } from "./GnarImage"

export const Claiming = () => {
  const gnarSize = useBreakpointValue({ base: "96px", lg: "128px" })
  const { isDisconnected, address } = useAccount()
  const [selectedOgGnars, setSelectedOgGnars] = useState<string[]>([])
  useEffect(() => {
    setSelectedOgGnars([])
  }, [address])

  const selectOg = (id: string) => setSelectedOgGnars([...selectedOgGnars, id])
  const deselectOg = (id: string) =>
    setSelectedOgGnars(selectedOgGnars.filter((s) => s !== id))

  const { isLoading, data: ogGnars } = useWalletOgGnars(address)

  const { config } = usePrepareGnarsV2AuctionHouseClaimGnars({
    args: [selectedOgGnars.map((id) => BigInt(id))],
    enabled: selectedOgGnars.length > 0,
    chainId: mainnet.id,
  })
  const { write: claimGnars, isLoading: isClaiming } = useContractWrite(config)

  if (isDisconnected) {
    return <Center flexGrow={1}>Connect to claim</Center>
  }

  if (isLoading || !ogGnars) {
    return (
      <Center flexGrow={1}>
        <Spinner size={"xl"} />
      </Center>
    )
  }

  if (ogGnars.length === 0) {
    return <Center flexGrow={1}>You hold no OG Gnars</Center>
  }

  const amountClaimableOgGnars = ogGnars.filter((og) => !og.wasClaimed).length

  return (
    <VStack
      flexGrow={1}
      w={"full"}
      spacing={20}
      alignItems={"center"}
      py={{ base: 4, lg: 20 }}
      px={{ base: 4, lg: 20 }}
    >
      {amountClaimableOgGnars === 0 ? (
        <Text>You have already claimed all your OG Gnars</Text>
      ) : (
        <Wrap justify={"center"}>
          <WrapItem>
            <Button
              variant={"outline"}
              isDisabled={ogGnars.length === selectedOgGnars.length}
              onClick={() =>
                setSelectedOgGnars(
                  ogGnars.filter((og) => !og.wasClaimed).map((og) => og.id)
                )
              }
            >
              Select All
            </Button>
          </WrapItem>
          <WrapItem>
            <Button
              isDisabled={selectedOgGnars.length === 0}
              variant={"outline"}
              onClick={() => setSelectedOgGnars([])}
            >
              Clear selection
            </Button>
          </WrapItem>
          <WrapItem>
            <ContractActionButton
              variant={"outline"}
              rightIcon={
                <Tag size={"sm"} variant={"subtle"} borderRadius={"full"}>
                  {selectedOgGnars.length}
                </Tag>
              }
              isDisabled={!claimGnars}
              isLoading={isClaiming}
              onClick={() => claimGnars?.()}
            >
              Claim selected
            </ContractActionButton>
          </WrapItem>
        </Wrap>
      )}
      <Box minW={{ base: "full", lg: "4xl" }} maxW={"full"}>
        <SimpleGrid
          justifyContent={"center"}
          p={[2, 6]}
          borderRadius={"md"}
          gridTemplateColumns={`repeat(auto-fit, ${gnarSize})`}
          spacing={4}
          overflow={"visible"}
        >
          {ogGnars.map((ogGnar) => {
            const isSelected = selectedOgGnars.includes(ogGnar.id)
            const { accessory, background, body, glasses, head } = ogGnar
            const gnartWork = getGnartwork(true, {
              accessory,
              background,
              body,
              glasses,
              head,
            })
            return (
              <Button
                key={`select-og-gnar-${ogGnar.id}`}
                p={1}
                h={"fit-content"}
                w={"fit-content"}
                variant={"ghost"}
                isDisabled={ogGnar.wasClaimed}
                isActive={isSelected}
                onClick={
                  ogGnar.wasClaimed
                    ? undefined
                    : isSelected
                    ? () => deselectOg(ogGnar.id)
                    : () => selectOg(ogGnar.id)
                }
              >
                <VStack alignItems={"start"} spacing={1}>
                  <Text textStyle={"h2"} fontSize={"md"}>
                    OG Gnar {ogGnar.id}
                  </Text>
                  <SimpleGrid>
                    <GnarImage
                      gridArea={"1/1"}
                      isOg={true}
                      gnartwork={gnartWork}
                      boxSize={gnarSize}
                    />
                    {ogGnar.wasClaimed && (
                      <Box
                        zIndex={999}
                        bgColor={"blackAlpha.700"}
                        gridArea={"1/1"}
                      >
                        <Text
                          w={"full"}
                          textStyle={"h2"}
                          position={"absolute"}
                          bottom={2}
                        >
                          CLAIMED
                        </Text>
                      </Box>
                    )}
                  </SimpleGrid>
                </VStack>
              </Button>
            )
          })}
        </SimpleGrid>
      </Box>
    </VStack>
  )
}
