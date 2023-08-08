import {
  Alert,
  AlertIcon,
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
import { useQueryClient } from "@tanstack/react-query"
import { useWalletHDGnars, walletHDGnarsQueryKey } from "hooks/useWalletHDGnars"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { waitForTransaction } from "wagmi/actions"
import { useGnarsHdAssertOwnership } from "../utils/sdk"
import { ContractActionButton } from "./ContractActionButton"
import { GnarHDImage } from "./GnarHDImage"
import { WalletButton } from "./WalletButton"

export const HDClaiming = () => {
  const gnarSize = useBreakpointValue({ base: "96px", lg: "128px" })
  const { invalidateQueries } = useQueryClient()
  const { isDisconnected, address } = useAccount()
  const [isClaiming, setIsClaiming] = useState(false)
  const [selectedHDGnars, setSelectedHDGnars] = useState<string[]>([])
  useEffect(() => {
    setSelectedHDGnars([])
  }, [address])

  const selectHD = (id: string) => setSelectedHDGnars([...selectedHDGnars, id])
  const deselectHD = (id: string) => setSelectedHDGnars(selectedHDGnars.filter((s) => s !== id))

  const { isLoading, data: hdGnars } = useWalletHDGnars(address)

  const { writeAsync: claimGnars } = useGnarsHdAssertOwnership({
    args: [selectedHDGnars.map((id) => BigInt(id))],
  })

  if (isDisconnected) {
    return <WalletButton alignSelf={"center"} />
  }

  if (isLoading || !hdGnars) {
    return (
      <Center flexGrow={1}>
        <Spinner size={"xl"} />
      </Center>
    )
  }

  if (hdGnars.length === 0) {
    return (
      <Alert alignSelf={"center"} w={"fit-content"} status="error">
        <AlertIcon />
        You hold no Gnars 🥲
      </Alert>
    )
  }

  const amountClaimableHdGnars = hdGnars.filter((hd) => !hd.wasClaimed).length

  return (
    <VStack
      flexGrow={1}
      w={"full"}
      spacing={20}
      alignItems={"center"}
      py={{ base: 4, lg: 20 }}
      px={{ base: 4, lg: 20 }}
    >
      {amountClaimableHdGnars === 0 ? (
        <Text>You have already claimed all your HD Gnars</Text>
      ) : (
        <Wrap justify={"center"}>
          <WrapItem>
            <Button
              variant={"outline"}
              isDisabled={hdGnars.length === selectedHDGnars.length}
              onClick={() => setSelectedHDGnars(hdGnars.filter((hd) => !hd.wasClaimed).map((hd) => hd.id))}
            >
              Select All
            </Button>
          </WrapItem>
          <WrapItem>
            <Button
              isDisabled={selectedHDGnars.length === 0}
              variant={"outline"}
              onClick={() => setSelectedHDGnars([])}
            >
              Clear selection
            </Button>
          </WrapItem>
          <WrapItem>
            <ContractActionButton
              variant={"outline"}
              rightIcon={
                <Tag size={"sm"} variant={"subtle"} borderRadius={"full"}>
                  {selectedHDGnars.length}
                </Tag>
              }
              isDisabled={selectedHDGnars.length === 0}
              isLoading={isClaiming}
              loadingText={"Claiming"}
              onClick={() => {
                setIsClaiming(true)
                claimGnars().then((tx) =>
                  waitForTransaction({ hash: tx.hash })
                    .catch(console.error)
                    .then(() => invalidateQueries(walletHDGnarsQueryKey))
                    .finally(() => {
                      setIsClaiming(false)
                    })
                )
              }}
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
          {hdGnars.map((hdGnar) => {
            const isSelected = selectedHDGnars.includes(hdGnar.id)

            return (
              <Button
                key={`select-hd-gnar-${hdGnar.id}`}
                p={1}
                h={"fit-content"}
                w={"fit-content"}
                variant={"ghost"}
                isDisabled={hdGnar.wasClaimed}
                isActive={isSelected}
                onClick={
                  hdGnar.wasClaimed ? undefined : isSelected ? () => deselectHD(hdGnar.id) : () => selectHD(hdGnar.id)
                }
              >
                <VStack alignItems={"start"} spacing={1}>
                  <Text textStyle={"h2"} fontSize={"md"}>
                    Gnar HD {hdGnar.id}
                  </Text>
                  <SimpleGrid>
                    <GnarHDImage gnarId={hdGnar.id} seed={hdGnar.seed!} gridArea={"1/1"} boxSize={gnarSize} />
                    {hdGnar.wasClaimed && (
                      <Box zIndex={999} bgColor={"blackAlpha.700"} gridArea={"1/1"}>
                        <Text w={"full"} textStyle={"h2"} position={"absolute"} bottom={2}>
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
