import { buildCounterName } from "./utils"
import {
  internalDiscordWebhook,
  incrementCounter,
  publicDiscordWebhook,
  twitter,
} from "./clients"
import { getLastAuction } from "./subgraph"
import {
  getAuctionCache,
  getAuctionEndingSoonCache,
  getBidCache,
  getProposalCache,
  hasWarnedOfExpiry,
  setProposalExpiryWarningSent,
  updateAuctionCache,
  updateAuctionEndingSoonCache,
  updateBidCache,
  updateProposalCache,
} from "./cache"
import { IAuctionLifecycleHandler } from "./types"
import { config } from "./config"
import { TwitterAuctionLifecycleHandler } from "./handlers/twitter"
import { DiscordAuctionLifecycleHandler } from "./handlers/discord"
import { DebugAuctionLifecycleHandler } from "./handlers/debug"
import { extractNewVotes, isAtRiskOfExpiry } from "./utils/proposals"
import R from "ramda"

/**
 * Create configured `IAuctionLifecycleHandler`s
 */
const auctionLifecycleHandlers: IAuctionLifecycleHandler[] = []
if (config.twitterEnabled) {
  console.log("Registering Twitter Handler")
  auctionLifecycleHandlers.push(new TwitterAuctionLifecycleHandler(twitter()))
}
if (config.discordEnabled) {
  console.log("Registering Discord Handler")
  auctionLifecycleHandlers.push(
    new DiscordAuctionLifecycleHandler([
      internalDiscordWebhook,
      // publicDiscordWebhook,
    ])
  )
}

if (config.debugEnabled) {
  console.log("Registering Debug Handler")
  auctionLifecycleHandlers.push(new DebugAuctionLifecycleHandler())
}

/**
 * Seed cache the current auction id
 */
async function setupAuction() {
  // check if cache is already seeded
  if ((await getAuctionCache()) > 0) return
  const lastAuction = await getLastAuction()
  const lastAuctionId = lastAuction.id - 1
  await updateAuctionCache(lastAuctionId)
}

/**
 * Process the last auction, update cache and push socials if new auction or respective bid is discovered
 */
async function processAuctionTick() {
  const cachedAuctionId = await getAuctionCache()
  const cachedBidId = await getBidCache()
  const cachedAuctionEndingSoon = await getAuctionEndingSoonCache()
  const lastAuction = await getLastAuction().catch((r) => {
    console.error("Couldn't fetch latest auction", r)
  })
  if (!lastAuction) {
    return
  }
  const lastAuctionId = lastAuction.id
  process.stdout.write(".")

  // check if new auction discovered
  if (cachedAuctionId < lastAuctionId) {
    console.log(`\nDiscovered new auction ${lastAuctionId}`)
    await incrementCounter(buildCounterName(`auctions_discovered`))
    await updateAuctionCache(lastAuctionId)
    await Promise.all(
      auctionLifecycleHandlers.map((h) => h.handleNewAuction(lastAuctionId))
    )
    await incrementCounter(buildCounterName("auction_cache_updates"))
  }

  // check if new bid discovered
  if (
    lastAuction.bids.length > 0 &&
    cachedBidId != lastAuction.bids[lastAuction.bids.length - 1].id
  ) {
    const bid = lastAuction.bids[lastAuction.bids.length - 1]
    await updateBidCache(bid.id)
    await Promise.all(
      auctionLifecycleHandlers.map((h) => h.handleNewBid(lastAuctionId, bid))
    )
  }

  // check if auction ending soon (within 5 min)
  const currentTimestamp = ~~(Date.now() / 1000) // second timestamp utc
  const endTime = lastAuction.endTime
  const secondsUntilAuctionEnds = endTime - currentTimestamp
  if (
    secondsUntilAuctionEnds < 5 * 60 &&
    cachedAuctionEndingSoon < lastAuctionId
  ) {
    await updateAuctionEndingSoonCache(lastAuctionId)
    await Promise.all(
      auctionLifecycleHandlers.map((h) =>
        h.handleAuctionEndingSoon?.(lastAuctionId)
      )
    )
  }
}

// /**
//  * Seed cache with current proposals
//  */
// async function setupGovernance() {
//   const proposals = await getAllProposals();
//   await Promise.all(proposals.map((p) => updateProposalCache(p)));
// }
//
// async function processGovernanceTick() {
//   const proposals = await getAllProposals();
//   console.log(
//     `processGovernanceTick: all proposal ids(${proposals
//       .map((p) => p.id)
//       .join(",")})`
//   );
//   R.map(async (proposal) => {
//     const cachedProposal = await getProposalCache(proposal.id);
//
//     if (cachedProposal === null) {
//       // New proposal
//       await Promise.all(
//         auctionLifecycleHandlers.map((h) => h.handleNewProposal?.(proposal))
//       );
//     } else {
//       // Proposal has changed status
//       if (cachedProposal.status !== proposal.status) {
//         await Promise.all(
//           auctionLifecycleHandlers.map((h) =>
//             h.handleUpdatedProposalStatus?.(proposal)
//           )
//         );
//       }
//       const newVotes = extractNewVotes(cachedProposal, proposal);
//       R.map(async (newVote) => {
//         // New proposal votes
//         await Promise.all(
//           auctionLifecycleHandlers.map((h) =>
//             h.handleGovernanceVote?.(proposal, newVote)
//           )
//         );
//       }, newVotes);
//
//       // Proposal is at-risk of expiry
//       if (
//         isAtRiskOfExpiry(proposal) &&
//         !(await hasWarnedOfExpiry(proposal.id))
//       ) {
//         await Promise.all(
//           auctionLifecycleHandlers.map((h) =>
//             h.handleProposalAtRiskOfExpiry?.(proposal)
//           )
//         );
//         await setProposalExpiryWarningSent(proposal.id);
//       }
//     }
//     await updateProposalCache(proposal);
//   }, proposals);
// }

processAuctionTick()
setInterval(async () => processAuctionTick(), 30000)
// setInterval(async () => processGovernanceTick(), 60000);
setupAuction().then(() => console.log("setupAuction done"))
// setupGovernance().then(() => console.log("setupGovernance done"));
