import { Bid, IAuctionLifecycleHandler, Proposal, Vote } from "../types"

export class DebugAuctionLifecycleHandler implements IAuctionLifecycleHandler {
  /**
   * Tweet an image of the current Gnar alerting users
   * to the new auction and update the tweet reply id cache
   * @param auctionId The current auction ID
   */
  async handleNewAuction(auctionId: number) {
    console.log(`Debug handler: Handled new auction with Id ${auctionId}`)
  }

  /**
   * Tweet a reply with new bid information to the reply id cache
   * We intentionally update the bid cache before safety checks to ensure we do not double tweet a bid
   * @param auctionId The current auction id
   * @param bid The current bid
   */
  async handleNewBid(auctionId: number, bid: Bid) {
    console.log(
      `Debug handler: Handled new bid ${bid.id} on auction ${auctionId}`
    )
  }

  /**
   * Tweet a reply informing observers that the auction is ending soon
   * @param auctionId The current auction id
   */
  async handleAuctionEndingSoon(auctionId: number) {
    console.log(
      `Debug handler: handled auction ending soon update for auction ${auctionId}`
    )
  }

  async handleNewProposal(proposal: Proposal) {
    console.log(`Debug handler: handled new proposal ${proposal.id}`)
  }

  async handleUpdatedProposalStatus(proposal: Proposal) {
    console.log(`Debug handler: handled proposal update ${proposal.id}`)
  }

  async handleProposalAtRiskOfExpiry(proposal: Proposal) {
    console.log(`Debug handler: handled proposal expiry warning ${proposal.id}`)
  }

  async handleGovernanceVote(proposal: Proposal, vote: Vote) {
    console.log(
      `Debug handler: handled new vote ${vote.id} for proposal ${proposal.id}`
    )
  }
}
