import { FC } from "react";
import { UpdateDelegateModal } from "@components/Governance/Delegation/UpdateDelegateModal";
import { Button, ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useDelegationInfo } from "@hooks/useDelegationInfo";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";

export interface DelegateButtonProps extends ButtonProps {}

const InnerDelegateButton: FC<DelegateButtonProps> = ({ ...props }) => {
  const { address } = useAccount();
  const { data: delegation } = useDelegationInfo(address);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!address || !delegation || !delegation?.delegate || !delegation?.account) return <></>;

  return (
    <>
      <Button onClick={onOpen} {...props}>
        Delegate
      </Button>
      <UpdateDelegateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const DelegateButton = dynamic(() => Promise.resolve(InnerDelegateButton), {
  ssr: false
});
