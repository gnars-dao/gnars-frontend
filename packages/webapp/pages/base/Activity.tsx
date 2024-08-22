//
// import { useConnectModal } from '@rainbow-me/rainbowkit'
// import { Button, Flex, Text } from '@zoralabs/zord'
import React from "react";
import { VStack } from "@chakra-ui/react";
import { PUBLIC_MANAGER_ADDRESS, contracts } from "@constants/baseAddresses";
// import { ContractButton } from 'src/components/ContractButton'
// import { Countdown } from 'src/components/Countdown'
// import AnimatedModal from 'src/components/Modal/AnimatedModal'
// import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
// import Pagination from 'src/components/Pagination'
import QUERY_KEYS from "@constants/queryKeys";
// import { useVotes } from 'src/hooks'
// import { useDelayedGovernance } from 'src/hooks/useDelayedGovernance'
// import { usePagination } from 'src/hooks/usePagination'
// import { Upgrade, useProposalStore } from 'src/modules/create-proposal'
// import { ProposalCard } from 'src/modules/proposal'
// import { useLayoutStore } from 'src/stores'
// import { useChainStore } from 'src/stores/useChainStore'
// import {
//   delegateBtn,
//   selectDelegateBtn,
//   submitProposalBtn,
// } from 'src/styles/Proposals.css'
// import { sectionWrapperStyle } from 'src/styles/dao.css'
import { AddressType, CHAIN_IDS } from "@constants/types";
import { ProposalsResponse, getProposals } from "@queries/base/requests/proposalsQuery";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { walletSnippet } from "@utils/helpers";
import { useRouter } from "next/router";
// import useSWR from 'swr'
import { useAccount } from "wagmi";
import { usePublicClient } from "wagmi";
// import { useDelegate } from '../../hooks'
// import { useDaoStore } from '../../stores'
// import { CurrentDelegate } from './CurrentDelegate'
// import { DelegateForm } from './DelegateForm'
// import { MobileMenu } from './MobileMenu'
// import { Treasury } from './Treasury'
import { GetContractResult } from "wagmi/actions";

export const Activity: React.FC = () => {
  // const addresses = useDaoStore((state) => state.addresses)
  //const { createProposal } = useProposalStore()
  const { address } = useAccount();
  const { query, isReady, push } = useRouter();
  // const { isMobile } = useLayoutStore()
  // const { openConnectModal } = useConnectModal()
  const chain = PUBLIC_MANAGER_ADDRESS[8453]; //  useChainStore((x) => x.chain)
  const LIMIT = 20;

  const { token } = contracts[PUBLIC_MANAGER_ADDRESS[8453]].addresses;

  const { data, error } = useQuery({
    queryKey: isReady ? [QUERY_KEYS.PROPOSALS, CHAIN_IDS.HARDHAT, query.token, query.page] : null,
    queryFn: (_, chainId, token, page) => getProposals(chainId, token, LIMIT, Number(page))
  });

  // const { handlePageBack, handlePageForward } = // usePagination(data?.pageInfo?.hasNextPage)

  const { isOwner, isDelegating, hasThreshold, proposalVotesRequired } = useVotes({
    chainId: chain.id,
    governorAddress: addresses?.governor,
    signerAddress: address,
    collectionAddress: query?.token as AddressType
  });

  const { isGovernanceDelayed, delayedUntilTimestamp } = useDelayedGovernance({
    tokenAddress: addresses?.token,
    governorAddress: addresses?.governor,
    chainId: chain.id
  });

  /*const [
    { viewCurrentDelegate, viewDelegateForm, viewSuccessfulDelegate, newDelegate },
    { view, edit, update, close },
  ] = useDelegate({
    viewCurrentDelegate: false,
    viewDelegateForm: false,
    viewSuccessfulDelegate: false,
  })

  const handleProposalCreation = () => {
    createProposal({
      title: undefined,
      summary: undefined,
      disabled: false,
      transactions: [],
    })
    push(`/dao/${query.network}/${query.token}/proposal/create`)
  }*/

  if (!data && !error) {
    return null;
  }

  return (
    <>
      <VStack></VStack>
    </>
  );
  /**
  return (
    <>
      <Flex direction={'column'} className={sectionWrapperStyle['proposals']} mx={'auto'}>
        <Treasury />

        <Flex width={'100%'} justify={'space-between'} align={'center'}>
          <Text variant="heading-sm" style={{ fontWeight: 800 }}>
            Proposals
          </Text>

          <Flex justify={'center'} align={'center'}>
            {address && !isDelegating && !isOwner && !isMobile && (
              <Flex mr={'x4'} color={'tertiary'}>
                You have no votes.
              </Flex>
            )}
            {isDelegating && !isMobile && (
              <Flex mr={'x4'} color={'tertiary'}>
                Your votes are delegated.
              </Flex>
            )}
            {isOwner && !hasThreshold && !isMobile && (
              <Flex mr={'x4'} color={'tertiary'}>
                {Number(proposalVotesRequired)} votes required to propose.
              </Flex>
            )}
            {isOwner || isDelegating ? (
              <>
                {!isMobile ? (
                  <ContractButton
                    className={delegateBtn}
                    color="ghost"
                    borderColor="border"
                    borderStyle="solid"
                    borderWidth="normal"
                    handleClick={view}
                    mr="x2"
                  >
                    Delegate
                  </ContractButton>
                ) : (
                  <MobileMenu>
                    <ContractButton
                      className={selectDelegateBtn}
                      style={{ backgroundColor: '#FFF', color: '#000' }}
                      handleClick={view}
                    >
                      Delegate
                    </ContractButton>
                  </MobileMenu>
                )}
              </>
            ) : null}
            {!address ? (
              <Button
                className={submitProposalBtn}
                onClick={openConnectModal}
                color={'tertiary'}
              >
                Submit {!isMobile ? 'proposal' : null}
              </Button>
            ) : (
              <Button
                className={submitProposalBtn}
                onClick={address ? handleProposalCreation : openConnectModal}
                disabled={isGovernanceDelayed ? true : address ? !hasThreshold : false}
                color={'tertiary'}
              >
                Submit {!isMobile ? 'proposal' : null}
              </Button>
            )}
          </Flex>
        </Flex>
        {addresses && (
          <Upgrade
            collection={query.token as string}
            hasThreshold={hasThreshold}
            addresses={addresses}
          />
        )}
        <Flex direction={'column'} mt={'x6'}>
          {isGovernanceDelayed ? (
            <Flex
              width={'100%'}
              mt={'x4'}
              p={'x4'}
              justify={'center'}
              align={'center'}
              borderColor={'border'}
              borderStyle={'solid'}
              borderRadius={'curved'}
              borderWidth={'normal'}
            >
              <Flex textAlign={'center'} align={'center'}>
                <Text
                  color={'text3'}
                  variant={'paragraph-md'}
                  ml={{ '@initial': 'x0', '@768': 'x3' }}
                >
                  Time remaining before proposals can be submitted:
                </Text>
              </Flex>
              <Flex
                w={{ '@initial': '100%', '@768': 'auto' }}
                justify={'center'}
                align={'center'}
                px={'x2'}
                py={'x4'}
              >
                <Text
                  fontWeight={'display'}
                  ml="x1"
                  style={{
                    fontVariantNumeric: 'tabular-nums',
                    fontFeatureSettings: 'tnum',
                  }}
                >
                  <Countdown
                    end={Number(delayedUntilTimestamp)}
                    onEnd={() => { }}
                    style={{ fontWeight: 'bold' }}
                  />
                </Text>
              </Flex>
            </Flex>
          ) : data?.proposals?.length ? (
            data?.proposals?.map((proposal, index: number) => (
              <ProposalCard
                key={index}
                collection={token}
                proposalId={proposal.proposalId}
                proposalNumber={proposal.proposalNumber}
                title={proposal.title || ''}
                state={proposal.state}
                timeCreated={proposal.timeCreated}
                voteEnd={proposal.voteEnd}
                voteStart={proposal.voteStart}
                expiresAt={proposal.expiresAt}
              />
            ))
          ) : (
            <Flex
              width={'100%'}
              mt={'x4'}
              p={'x4'}
              justify={'center'}
              borderColor={'border'}
              borderStyle={'solid'}
              borderRadius={'curved'}
              borderWidth={'normal'}
            >
              <Text>No proposals yet.</Text>
            </Flex>
          )}

          <Pagination
            onNext={handlePageForward}
            onPrev={handlePageBack}
            isLast={!data?.pageInfo?.hasNextPage}
            isFirst={!query.page}
          />
        </Flex>
      </Flex>

      <AnimatedModal open={viewCurrentDelegate} size={'auto'} close={close}>
        <CurrentDelegate toggleIsEditing={edit} />
      </AnimatedModal>

      <AnimatedModal open={viewDelegateForm} size={'auto'} close={close}>
        <DelegateForm handleBack={view} handleUpdate={update} />
      </AnimatedModal>

      <AnimatedModal open={viewSuccessfulDelegate} close={close}>
        <SuccessModalContent
          success
          title="Delegate updated"
          subtitle="Your votes have been successfully delegated to"
          content={walletSnippet(newDelegate)}
        />
      </AnimatedModal>
    </>
  ) */
};
