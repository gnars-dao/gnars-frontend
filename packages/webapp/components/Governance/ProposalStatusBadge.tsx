import { Badge, BadgeProps } from "@chakra-ui/react";
import { FC } from "react";
import { EffectiveProposalStatus, isFinalized } from "@utils/governanceUtils";
import { ShredIcon } from "../Icons";

export interface ProposalStatusBadgeProps extends BadgeProps {
  status: EffectiveProposalStatus | string;
}

export const ProposalStatusBadge: FC<ProposalStatusBadgeProps> = ({ status, ...props }) => {
  const finalized = isFinalized(status);
  return (
    <Badge
      variant={status !== "VETOED" && finalized ? "subtle" : "solid"}
      position={"relative"}
      fontWeight="bold"
      textAlign={"center"}
      {...getProposalStyle(status)}
      {...props}
    >
      {status}
      {["QUEUED", "EXECUTED", "SUCCEEDED", "EXECUTABLE", "PREVIEW"].includes(status) && (
        <ShredIcon position={"absolute"} right={1} bottom={1} />
      )}
    </Badge>
  );
};

const getProposalStyle = (status: EffectiveProposalStatus | string): Partial<BadgeProps> => {
  switch (status) {
    case "PENDING":
      return {
        colorScheme: "orange",
        variant: "subtle"
      };
    case "ACTIVE":
      return { colorScheme: "purple" };
    case "CANCELLED":
    case "UNDETERMINED":
      return { colorScheme: "gray", color: "gray.300" };
    case "EXECUTED":
    case "QUEUED":
    case "SUCCEEDED":
      return {
        colorScheme: "green"
      };
    case "VETOED":
      return { colorScheme: "red" };
    case "DEFEATED":
      return { colorScheme: "red" };
    case "PREVIEW":
      return { colorScheme: "pink" };
    // case "EXPIRED":
    default:
      return {};
  }
};
