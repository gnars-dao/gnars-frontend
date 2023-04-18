import { FC } from "react"
import { HStack, Spinner, Text, Tooltip } from "@chakra-ui/react"
import { EffectiveProposalStatus } from "../../utils/governanceUtils"
import { RiTimeFill } from "react-icons/all"
import { ProposalsQuery } from "../../.graphclient"
import { useBlock } from "../../hooks/useBlock"
import locale from "date-fns/locale/en-US"
import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  formatRFC7231,
  intlFormat,
  secondsInDay,
} from "date-fns"

export interface ProposalCountdownProps {
  effectiveStatus: EffectiveProposalStatus
  proposal: ProposalsQuery["proposals"][0]
}

export const ProposalCountdown: FC<ProposalCountdownProps> = ({
  effectiveStatus,
  proposal,
}) => {
  const block = useBlock()
  if (
    effectiveStatus !== "QUEUED" &&
    effectiveStatus !== "PENDING" &&
    effectiveStatus !== "ACTIVE" &&
    effectiveStatus !== "EXECUTABLE"
  ) {
    return <></>
  }

  if (!block) {
    return (
      <HStack
        color={"whiteAlpha.300"}
        fontSize={"xs"}
        fontWeight={"bold"}
        px={2}
      >
        <Spinner />
        <RiTimeFill />
      </HStack>
    )
  }

  const estimatedDate = new Date(
    {
      QUEUED: proposal.executionETA,
      PENDING: block.timestamp + 12 * (proposal.startBlock - block.number),
      ACTIVE: block.timestamp + 12 * (proposal.endBlock - block.number),
      EXECUTABLE: proposal.executionETA + 14 * secondsInDay,
    }[effectiveStatus] * 1000
  )

  const estimatedTimeRemaining = formatDistanceToNowStrict(estimatedDate, {
    roundingMethod: "floor",
    locale: {
      formatDistance,
    },
  })

  return (
    <Tooltip hasArrow label={estimatedDate.toLocaleString()}>
      <HStack
        color={"whiteAlpha.300"}
        fontSize={"xs"}
        fontWeight={"semibold"}
        px={2}
      >
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

const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "<1s",
    other: "<{{count}}s",
  },

  xSeconds: {
    one: "1s",
    other: "{{count}}s",
  },

  halfAMinute: "30s",

  lessThanXMinutes: {
    one: "<1m",
    other: "<{{count}}m",
  },

  xMinutes: {
    one: "1m",
    other: "{{count}}m",
  },

  aboutXHours: {
    one: "~1h",
    other: "~{{count}}h",
  },

  xHours: {
    one: "1h",
    other: "{{count}}h",
  },

  xDays: {
    one: "1d",
    other: "{{count}}d",
  },

  aboutXWeeks: {
    one: "~1w",
    other: "~{{count}}w",
  },

  xWeeks: {
    one: "1w",
    other: "{{count}}w",
  },

  aboutXMonths: {
    one: "~1mth",
    other: "~{{count}}mth",
  },

  xMonths: {
    one: "1mth",
    other: "{{count}}mth",
  },

  aboutXYears: {
    one: "~1y",
    other: "~{{count}}y",
  },

  xYears: {
    one: "1y",
    other: "{{count}}y",
  },

  overXYears: {
    one: ">1y",
    other: ">{{count}}y",
  },

  almostXYears: {
    one: "~1y",
    other: "~{{count}}y",
  },
}

const formatDistance: typeof locale.formatDistance = (
  token,
  count,
  options
) => {
  let result

  // @ts-ignore
  const tokenValue = formatDistanceLocale[token]
  if (typeof tokenValue === "string") {
    result = tokenValue
  } else if (count === 1) {
    result = tokenValue.one
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString())
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result
    } else {
      return result + " ago"
    }
  }

  return result
}
