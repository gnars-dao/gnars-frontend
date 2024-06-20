import { AuctionBids } from "./types"
// import { parseProposalSubgraphResponse } from "./utils/proposals"
import { LatestAuctionDocument, execute } from "../.graphclient"

/**
 * Query the subgraph and return the last auction id and bid created.
 * @returns The last auction id and bid from the subgraph.
 */
export const getLastAuction = (): Promise<AuctionBids> =>
  execute(LatestAuctionDocument, {}).then((r: { errors: string | any[]; data: { [x: string]: any[] } }) => {
    if (r.errors && r.errors.length > 0) throw r.errors
    return r.data["auctions"][0]
  })

// /**
//  * Query the subgraph and return all proposals and votes
//  * @returns All proposals and votes from the subgraph
//  */
// export async function getAllProposals(): Promise<Proposal[]> {
//   const res = await request<ProposalSubgraphResponse>(
//     config.gnarsSubgraph,
//     gql`
//       {
//         proposals {
//           id
//           proposer {
//             id
//           }
//           description
//           status
//           quorumVotes
//           proposalThreshold
//           startBlock
//           endBlock
//           executionETA
//           votes {
//             id
//             voter {
//               id
//             }
//             votes
//             supportDetailed
//             reason
//           }
//         }
//       }
//     `
//   )
//   return parseProposalSubgraphResponse(res)
// }
