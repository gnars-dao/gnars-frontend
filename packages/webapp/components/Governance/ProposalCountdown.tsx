import { HStack, Spinner, Text, Tooltip } from "@chakra-ui/react"
import { FC } from "react"
import { RiTimeFill } from "react-icons/ri"
import { useBlock } from "../../hooks/useBlock"
import { EffectiveProposalStatus } from "../../utils/governanceUtils"

export interface ProposalCountdownProps {
  effectiveStatus: EffectiveProposalStatus
  executionETA?: number
  startBlock: number
  endBlock: number
}

export const ProposalCountdown: FC<ProposalCountdownProps> = ({
  effectiveStatus,
  executionETA,
  startBlock,
  endBlock,
}) => {
  const block = useBlock()
  if (effectiveStatus === "SUCCEEDED") {
    return (
      <Text color={"whiteAlpha.300"} fontSize={"xs"} fontWeight={"semibold"} px={2}>
        QUEUEABLE NOW
      </Text>
    )
  }
  if (
    effectiveStatus !== "QUEUED" &&
    effectiveStatus !== "PENDING" &&
    effectiveStatus !== "ACTIVE" &&
    effectiveStatus !== "EXECUTABLE"
  ) {
    return <></>
  }

  if ((effectiveStatus === "QUEUED" || effectiveStatus === "EXECUTABLE") && !executionETA) {
    return <></>
  }

  if (!block || !block.number) {
    return (
      <HStack color={"whiteAlpha.300"} fontSize={"xs"} fontWeight={"bold"} px={2}>
        <Spinner />
        <RiTimeFill />
      </HStack>
    )
  }

  const secondsInDay = 86400n

  const estimatedDate = new Date(
    Number(
      {
        PENDING: block.timestamp + 12n * (BigInt(startBlock) - block.number),
        ACTIVE: block.timestamp + 12n * (BigInt(endBlock) - block.number),
        QUEUED: executionETA!,
        EXECUTABLE: BigInt(executionETA!) + 14n * secondsInDay,
      }[effectiveStatus]
    ) * 1000
  )

  const estimatedTimeRemaining = formatTimeRemaining(estimatedDate)

  return (
    <Tooltip hasArrow label={estimatedDate.toLocaleString()}>
      <HStack color={"whiteAlpha.300"} fontSize={"xs"} fontWeight={"semibold"} px={2}>
        <Text>
          {
            {
              QUEUED: `EXECUTABLE IN ${estimatedTimeRemaining}`,
              PENDING: `STARTS IN ${estimatedTimeRemaining}`,
              ACTIVE: `ENDS IN ${estimatedTimeRemaining}`,
              EXECUTABLE: `EXECUTABLE FOR ${estimatedTimeRemaining}`,
            }[effectiveStatus]
          }
        </Text>
        <RiTimeFill />
      </HStack>
    </Tooltip>
  )
}

const formatTimeRemaining = (date: Date) => {
  const seconds = Math.floor((date.getTime() - Date.now()) / 1000)
  const hours = Math.floor(seconds / 3600)

  if (hours < 1) {
    return `<1h`
  }

  if (hours < 24) {
    return `${hours}h`
  }

  const days = Math.floor(hours / 24)

  return `${days}d ${hours % 24}h`
}
