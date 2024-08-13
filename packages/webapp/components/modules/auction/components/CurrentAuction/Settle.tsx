import { Button, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

import { ContractButton } from 'components/ContractButton'
import { auctionAbi } from '@data/contract/abis/Auction'
import { useDaoStore } from '@components/modules/dao'
import { useChainStore } from 'stores/useChainStore'
import { AddressType } from '@constants/types'

// import { auctionActionButtonVariants } from '../Auction.css'

interface SettleProps {
  isEnding: boolean
  collectionAddress?: string
  owner?: string | undefined
  externalAuctionAddress?: AddressType
  compact?: boolean
}

export const Settle = ({
  isEnding,
  owner,
  externalAuctionAddress,
  compact = false,
}: SettleProps) => {
  const chain = useChainStore((x) => x.chain)
  const addresses = useDaoStore?.((state) => state.addresses) || {}

  const { address } = useAccount()
  const isWinner = owner != undefined && address == owner

  const auctionAddress = externalAuctionAddress || addresses?.auction

  const { data: paused } = useContractRead({
    enabled: !!auctionAddress,
    address: auctionAddress,
    chainId: chain.id,
    abi: auctionAbi,
    functionName: 'paused',
  })

  const { config, error } = usePrepareContractWrite({
    enabled: !!auctionAddress,
    address: auctionAddress,
    abi: auctionAbi,
    functionName: paused ? 'settleAuction' : 'settleCurrentAndCreateNewAuction',
  })

  const { writeAsync } = useContractWrite(config)

  const [settling, setSettling] = useState(false)

  const handleSettle = async () => {
    if (!!error) return

    setSettling(true)
    try {
      const tx = await writeAsync?.()
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setSettling(false)
    } catch (error) {
      setSettling(false)
    }
  }

  if (isEnding && !settling) {
    return (
      <Stack direction="column" align="center" width={'100%'}>
        <Button disabled className={'settling'}>
          Auction ending
        </Button>
      </Stack>
    )
  }

  if (settling) {
    return (
      <Stack direction="column" align="center" width={'100%'}>
        <Button
          disabled
          className={
            compact
              ? auctionActionButtonVariants['dashSettle']
              : auctionActionButtonVariants['settling']
          }
          variant={compact ? 'outline' : 'primary'}
        >
          Settling
        </Button>
      </Stack>
    )
  }

  return (
    <Stack direction="column" align="center" width={'100%'}>
      <ContractButton
        handleClick={handleSettle}
        className={
          compact
            ? auctionActionButtonVariants['dashSettle']
            : auctionActionButtonVariants['settle']
        }
        variant={compact ? 'outline' : 'primary'}
      >
        {isWinner ? 'Claim NFT' : 'Start next auction'}
      </ContractButton>
    </Stack>
  )
}
