import { EffectiveProposalStatus } from "../../utils/governanceUtils"
import { Badge, BadgeProps } from "@chakra-ui/react"
import { isFinalized } from "../../utils/governanceUtils"
import { FC } from "react"
import { ShredIcon } from "../Icons"

export interface ProposalStatusBadgeProps extends BadgeProps {
  status: EffectiveProposalStatus
}

export const ProposalStatusBadge: FC<ProposalStatusBadgeProps> = ({
  status,
  ...props
}) => {
  const finalized = isFinalized(status)
  return (
    <Badge
      variant={finalized ? "subtle" : "solid"}
      position={"relative"}
      fontWeight="bold"
      textAlign={"center"}
      {...getProposalStyle(status)}
      {...props}
    >
      {status}
      {["QUEUED", "EXECUTED", "SUCCEEDED"].includes(status) && (
        <ShredIcon position={"absolute"} right={1} bottom={1} />
      )}
    </Badge>
  )
}

const getProposalStyle = (
  status: EffectiveProposalStatus
): Partial<BadgeProps> => {
  switch (status) {
    case "PENDING":
      return {
        colorScheme: "orange",
        variant: "subtle",
      }
    //   return {
    //     opacity: 0.7,
    //     fontWeight: "bold",
    //     bgColor: "transparent",
    //     // boxShadow: "blue 0px 0px 0px 1px inset",
    //     color: "blue",
    //   }
    case "ACTIVE":
      return { colorScheme: "purple" }
    case "CANCELLED":
      return { colorScheme: "gray" }
    case "EXECUTED":
    case "QUEUED":
      return {
        colorScheme: "green",
      }
    case "VETOED":
      return { color: "red", bgColor: "transparent" }
    case "UNDETERMINED":
    case "DEFEATED":
      return { colorScheme: "red" }
    // case "EXPIRED":
    // case "SUCCEEDED":
    default:
      return {}
  }
}
