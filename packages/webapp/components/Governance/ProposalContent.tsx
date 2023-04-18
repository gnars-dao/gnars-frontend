import React, { FC, Fragment } from "react"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import { ProposalQuery, ProposalsQuery } from "../../.graphclient"
import {
  Box,
  Code,
  Divider,
  Heading,
  HStack,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from "@chakra-ui/react"
import { zip } from "lodash"
import { Transaction } from "./Transaction"
import { AvatarWallet } from "../AvatarWallet"

export interface ProposalContentProps {
  proposal: NonNullable<ProposalQuery["proposal"]>
}

export const ProposalContent: FC<ProposalContentProps> = ({ proposal }) => {
  const transactions = zip(
    proposal.targets,
    proposal.signatures,
    proposal.values,
    proposal.calldatas
  )
  return (
    <>
      <VStack p={8} alignSelf={"start"} alignItems={"start"}>
        <Text fontWeight={"bold"}>Proposed by</Text>
        <AvatarWallet withLink address={proposal.proposer.id} />
      </VStack>
      <VStack
        maxW={"full"}
        p={8}
        alignItems={"start"}
        spacing={8}
        sx={{
          ".markdown p": { py: 4 },
          ".markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5":
            { fontWeight: "bold", py: 4 },
        }}
      >
        <ReactMarkdown
          className={"markdown"}
          children={proposal.description.replace(`# ${proposal.title}`, "")}
          remarkPlugins={[remarkBreaks]}
        />
        <Heading as={"h2"} textStyle={"h2"} fontSize="4xl">
          Proposed Transactions
        </Heading>
        <OrderedList spacing={8} listStylePosition={"inside"}>
          {transactions.map(([target, signature, value, calldata]) => (
            <ListItem maxW="xl">
              <Transaction
                target={target}
                signature={signature}
                value={value}
                calldata={calldata}
              />
            </ListItem>
          ))}
        </OrderedList>
      </VStack>
    </>
  )
}

//
// export const linkIfAddress = (content: string) => {
//   if (utils.isAddress(content)) {
//     return (
//       <a href={buildEtherscanAddressLink(content)} target="_blank" rel="noreferrer">
//         <EnsOrLongAddress address={content} />
//       </a>
//     );
//   }
//   return <span>{content}</span>;
// };
//
// export const transactionLink = (content: string) => {
//   return (
//     <a href={buildEtherscanTxLink(content)} target="_blank" rel="noreferrer">
//       {content.substring(0, 7)}
//     </a>
//   );
// };
//
// const ProposalContent: React.FC<ProposalContentProps> = props => {
//   const { proposal } = props;
//
//   return (
//     <>
//       <Row>
//         <Col className={classes.section}>
//           <h5>
//             <Trans>Description</Trans>
//           </h5>
//           {proposal?.description && (
//             <ReactMarkdown
//               className={classes.markdown}
//               children={processProposalDescriptionText(proposal.description, proposal.title)}
//               remarkPlugins={[remarkBreaks]}
//             />
//           )}
//         </Col>
//       </Row>
//       <Row>
//         <Col className={classes.section}>
//           <h5>
//             <Trans>Proposed Transactions</Trans>
//           </h5>
//           <ol>
//             {proposal?.details?.map((d, i) => {
//               return (
//                 <li key={i} className="m-0">
//                   {linkIfAddress(d.target)}.{d.functionSig}
//                   {d.value}(
//                   <br />
//                   {d.callData.split(',').map((content, i) => {
//                     return (
//                       <Fragment key={i}>
//                         <span key={i}>
//                           &emsp;
//                           {linkIfAddress(content)}
//                           {d.callData.split(',').length - 1 === i ? '' : ','}
//                         </span>
//                         <br />
//                       </Fragment>
//                     );
//                   })}
//                   )
//                   {d.target.toLowerCase() === config.addresses.tokenBuyer?.toLowerCase() && (
//                     <div className={classes.txnInfoText}>
//                       <div className={classes.txnInfoIconWrapper}>
//                         <InformationCircleIcon className={classes.txnInfoIcon} />
//                       </div>
//                       <div>
//                         <Trans>
//                           This transaction was automatically added to refill the TokenBuyer.
//                           Proposers do not receive this ETH.
//                         </Trans>
//                       </div>
//                     </div>
//                   )}
//                   {d.target.toLowerCase() === config.addresses.payerContract?.toLowerCase() && (
//                     <div className={classes.txnInfoText}>
//                       <div className={classes.txnInfoIconWrapper}>
//                         <InformationCircleIcon className={classes.txnInfoIcon} />
//                       </div>
//                       <div>
//                         <Trans>
//                           This transaction sends{' '}
//                           {Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(
//                             Number(utils.formatUnits(d.callData.split(',')[1], 6)),
//                           )}{' '}
//                           USDC to <ShortAddress address={d.callData.split(',')[0]} /> via the DAO's
//                           PayerContract.
//                         </Trans>
//                       </div>
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ol>
//         </Col>
//       </Row>
//     </>
//   );
// };

export default ProposalContent
