import {
  Box, Button, Flex, Text, Popover, Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import React, { Fragment, memo, useEffect, useState } from 'react'
// import useSWR, { useSWRConfig } from 'swr'
import { formatEther, parseEther } from 'viem'
import { Address, useAccount, useBalance, useContractReads, useNetwork } from 'wagmi'
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions'

// TODO: Pull in contract btn from nouns-base
import { ContractButton } from 'components/ContractButton'

// import { Icon } from 'src/components/Icon/Icon'
// import AnimatedModal from 'src/components/Modal/AnimatedModal'

import { PUBLIC_IS_TESTNET } from '@constants/defaultChains'
import USE_QUERY_KEYS from 'constants/swrKeys'
import { auctionAbi } from 'data/contract/abis/Auction'
import { averageWinningBid } from '@queries/base/requests/averageWinningBid'
import { getBids } from '@queries/base/requests/getBids'
import { useDaoStore } from 'components/modules/dao'
import { AddressType, Chain } from '@constants/types'
import { unpackOptionalArray } from 'utils/helpers'
import { formatCryptoVal } from 'utils/numbers'

import { useMinBidIncrement } from '../../hooks'
import { auctionActionButtonVariants, bidForm, bidInput } from '../Auction.css'
import { WarningModal } from './WarningModal'
import { useQuery, useQueryClient } from '@tanstack/react-query'

interface PlaceBidProps {
  chain: Chain
  tokenId: string
  daoName: string
  referral?: AddressType
  highestBid?: bigint
}

export const PlaceBid = ({
  chain,
  highestBid,
  referral,
  tokenId,
  daoName,
}: PlaceBidProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount()
  const { chain: wagmiChain } = useNetwork()
  const { data: balance } = useBalance({ address: address, chainId: chain.id })

  // TODO: Use @tanstack/react-query equivalent of useSWRConfig()
  // const { mutate } = useSWRConfig()
  const { addresses } = useDaoStore()

  const [creatingBid, setCreatingBid] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [bidAmount, setBidAmount] = React.useState<string | undefined>(undefined)

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction as AddressType,
    chainId: chain.id,
  }
  const { data } = useContractReads({
    allowFailure: false,
    contracts: [
      { ...auctionContractParams, functionName: 'reservePrice' },
      { ...auctionContractParams, functionName: 'minBidIncrement' },
    ] as const,
  })
  const [auctionReservePrice, minBidIncrement] = unpackOptionalArray(data, 2)

  const { minBidAmount } = useMinBidIncrement({
    highestBid,
    reservePrice: auctionReservePrice,
    minBidIncrement,
  })

  const { data: averageBid } = useQuery({
    queryKey: (addresses.token
      ? [USE_QUERY_KEYS.AVERAGE_WINNING_BID, chain.id, addresses.token]
      : undefined),
    queryFn: () => averageWinningBid(chain.id, addresses.token as Address)
  })

  const isMinBid = Number(bidAmount) >= minBidAmount
  const formattedMinBid = formatCryptoVal(minBidAmount)
  const minBidAmountInWei = parseEther(formattedMinBid)

  // Warn users if they are bidding more than 5x the average winning bid or min bid amount
  const valueToCalculateWarning = averageBid || minBidAmountInWei
  const minAmountForWarning = valueToCalculateWarning * 5n

  const handleCreateBid = async () => {
    if (!isMinBid || !bidAmount || creatingBid) return

    const amountInWei = parseEther(bidAmount)

    if (amountInWei && minAmountForWarning && amountInWei > minAmountForWarning) {
      setShowWarning(true)
      return
    }

    await createBidTransaction()
  }

  const createBidTransaction = async () => {
    if (!isMinBid || !bidAmount) return

    try {
      setCreatingBid(true)

      let config
      if (referral) {
        config = await prepareWriteContract({
          abi: auctionAbi,
          address: addresses.auction as Address,
          functionName: 'createBidWithReferral',
          args: [BigInt(tokenId), referral],
          value: parseEther(bidAmount),
        })
      } else {
        config = await prepareWriteContract({
          abi: auctionAbi,
          address: addresses.auction as Address,
          functionName: 'createBid',
          args: [BigInt(tokenId)],
          value: parseEther(bidAmount),
        })
      }

      const tx = await writeContract(config)
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })

      // TODO: replace with @tanstack/react-query mutate
      // await mutate([USE_QUERY_KEYS.AUCTION_BIDS, chain.id, addresses.token, tokenId], () =>
      //   getBids(chain.id, addresses.token!, tokenId)
      // )

      // TODO: replace with @tanstack/react-query mutate
      // await mutate([USE_QUERY_KEYS.AVERAGE_WINNING_BID, chain.id, addresses.token], () =>
      //   averageWinningBid(chain.id, addresses.token as Address)
      // )
    } catch (error) {
      console.error(error)
    } finally {
      setCreatingBid(false)
      setShowWarning(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = !!showWarning ? 'hidden' : 'unset'
  }, [showWarning])

  const isValidBid = bidAmount && isMinBid
  const isValidChain = wagmiChain?.id === chain.id
  const [showTooltip, setShowTooltip] = useState(false)
  const [copied, setCopied] = useState(false)

  return (
    <Flex
      width="100%"
      direction={{ '@initial': 'column', '@768': 'row' }}
      justify={'flex-start'}
    >
      {bidAmount && valueToCalculateWarning ? (
        <Modal size={'small'} isOpen={showWarning} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/** TODO: Test Warning Modal, convert to @chakra/react modal if needed */}
              <WarningModal
                daoName={daoName}
                currentBid={bidAmount}
                isCreatingBid={creatingBid}
                isAverage={!!averageBid}
                maxReccomendedBid={formatEther(valueToCalculateWarning)}
                onCancel={() => setShowWarning(false)}
                onConfirm={() => createBidTransaction()}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="warning">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>

        </Modal>
      ) : null}

      {!creatingBid ? (
        <Flex wrap="wrap">
          <form className={bidForm}>
            <Box position="relative" mr={{ '@initial': 'x0', '@768': 'x2' }}>
              <input
                placeholder={`${formattedMinBid} ETH or more`}
                type={'number'}
                className={bidInput}
                min={formattedMinBid}
                max={balance?.formatted}
                onChange={(event) => setBidAmount(event.target.value)}
              />
              <Box position="absolute" style={{ top: 0, right: 0, bottom: 0 }}>
                <Flex align={'center'} height={'100%'} pr={'x4'} fontWeight={'display'}>
                  ETH
                </Flex>
              </Box>
            </Box>
          </form>
          <Flex w="100%" wrap="wrap" mt="x2">
            <ContractButton
              className={auctionActionButtonVariants['bid']}
              handleClick={handleCreateBid}
              disabled={address && isValidChain ? !isValidBid : false}
              mt={{ '@initial': 'x2', '@768': 'x0' }}
            >
              Place bid
            </ContractButton>
            {chain.id !== 1 ? (
              <Fragment>
                <Box
                  cursor="pointer"
                  style={{ zIndex: 102 }}
                  onMouseOver={() => setShowTooltip(true)}
                  onMouseLeave={() => {
                    setShowTooltip(false)
                    setTimeout(() => {
                      setCopied(false)
                    }, 500)
                  }}
                >
                  <ContractButton
                    className={auctionActionButtonVariants['bid']}
                    ml="x2"
                    mt={{ '@initial': 'x2', '@768': 'x0' }}
                    handleClick={async () => {
                      const network = PUBLIC_IS_TESTNET
                        ? 'https://testnet.nouns.build'
                        : 'https://nouns.build'
                      const baseUrl = `${network}/dao/${chain.name.toLowerCase()}/${addresses.token
                        }`
                      if (address === undefined) {
                        await navigator.clipboard.writeText(baseUrl)
                        return
                      }
                      const params = new URLSearchParams({
                        referral: address.toString(),
                      })
                      const fullUrl = `${baseUrl}?${params}`

                      await navigator.clipboard.writeText(fullUrl)
                      setCopied(true)
                    }}
                  >
                    {/** TODO: Make into share Icon */}
                    <Icon id="share" />
                  </ContractButton>
                </Box>
                <Popover trigger='hover' placement="top">
                  <Text align="center">{copied ? 'Copied' : 'Copy Referral Link'}</Text>
                </Popover>
              </Fragment>
            ) : null}
          </Flex>
        </Flex>
      ) : (
        <Button className={auctionActionButtonVariants['bidding']} disabled>
          placing {bidAmount} ETH bid
        </Button>
      )}
    </Flex>
  )
}

export const MemoizedPlaceBid = memo(PlaceBid)