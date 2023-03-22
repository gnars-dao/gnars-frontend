import Discord from "discord.js"
import {
  formatBidMessageText,
  formatNewGovernanceProposalText,
  formatNewGovernanceVoteText,
  formatProposalAtRiskOfExpiryText,
  formatUpdatedGovernanceProposalStatusText,
  getGnarPngBuffer,
  getAuctionEndingSoonTweetText,
} from "../utils"
import { Bid, IAuctionLifecycleHandler, Proposal, Vote } from "../types"
import { getAuctionReplyTweetId, updateAuctionReplyTweetId } from "../cache"

export class DiscordAuctionLifecycleHandler
  implements IAuctionLifecycleHandler
{
  constructor(public readonly discordClients: Discord.WebhookClient[]) {}

  /**
   * Send Discord message with an image of the current Gnar alerting users
   * @param auctionId The current auction ID
   */
  async handleNewAuction(auctionId: number) {
    const png = await getGnarPngBuffer(auctionId.toString())
    if (png) {
      const attachmentName = `Auction-${auctionId}.png`
      const attachment = new Discord.MessageAttachment(png, attachmentName)
      const embed = new Discord.MessageEmbed()
        .setTitle(`New Auction Discovered`)
        .setDescription(`An auction has started for Gnar #${auctionId}`)
        .setURL("https://gnars.wtf")
        .addField("Gnar ID", auctionId, true)
        .attachFiles([attachment])
        .setImage(`attachment://${attachmentName}`)
        .setTimestamp()
      await Promise.all(
        this.discordClients.map((c) => c.send("<@&1022347902573625484>"))
      )
      await Promise.all(this.discordClients.map((c) => c.send(embed)))
    }
    console.log(`Discord handler: processed discord new auction ${auctionId}`)
  }

  /**
   * Send Discord message with an image of the current Gnar alerting users that the auction is ending soon
   * @param auctionId The current auction id
   */
  async handleAuctionEndingSoon(auctionId: number) {
    const png = await getGnarPngBuffer(auctionId.toString())
    if (png) {
      const attachmentName = `Auction-${auctionId}.png`
      const attachment = new Discord.MessageAttachment(png, attachmentName)
      const embed = new Discord.MessageEmbed()
        .setTitle(`Auction Ending Soon`)
        .setDescription(
          `The auction for Gnar #${auctionId} is about to end, get your bids in!`
        )
        .setURL("https://gnars.wtf")
        .addField("Gnar ID", auctionId, true)
        .attachFiles([attachment])
        .setImage(`attachment://${attachmentName}`)
        .setTimestamp()
      await Promise.all(
        this.discordClients.map((c) => c.send("<@&958234550209773619>"))
      )
      await Promise.all(this.discordClients.map((c) => c.send(embed)))
    }
    console.log(
      `Discord handler: processed discord auction ending soon update for auction ${auctionId}`
    )
  }

  /**
   * Send Discord message with new bid event data
   * @param auctionId Gnar auction number
   * @param bid Bid amount and ID
   */
  async handleNewBid(auctionId: number, bid: Bid) {
    const message = new Discord.MessageEmbed()
      .setTitle(`New Bid Placed`)
      .setURL("https://gnars.wtf")
      .setDescription(await formatBidMessageText(auctionId, bid))
      .setTimestamp()
    await Promise.all(this.discordClients.map((c) => c.send(message)))
    console.log(
      `Discord handler: processed discord new bid ${auctionId}:${bid.id}`
    )
  }

  async handleNewProposal(proposal: Proposal) {
    const message = new Discord.MessageEmbed()
      .setTitle(`New Governance Proposal`)
      .setURL(`https://gnars.wtf/vote/${proposal.id}`)
      .setDescription(formatNewGovernanceProposalText(proposal))
      .setTimestamp()
    await Promise.all(this.discordClients.map((c) => c.send(message)))
    console.log(
      `Discord handler: processed discord new proposal ${proposal.id}`
    )
  }

  async handleUpdatedProposalStatus(proposal: Proposal) {
    const message = new Discord.MessageEmbed()
      .setTitle(`Proposal Status Update`)
      .setURL(`https://gnars.wtf/vote/${proposal.id}`)
      .setDescription(formatUpdatedGovernanceProposalStatusText(proposal))
      .setTimestamp()
    await Promise.all(this.discordClients.map((c) => c.send(message)))
    console.log(
      `Discord handler: processed discord proposal update ${proposal.id}`
    )
  }

  async handleProposalAtRiskOfExpiry(proposal: Proposal) {
    const message = new Discord.MessageEmbed()
      .setTitle(`Proposal At-Risk of Expiry`)
      .setURL(`https://gnars.wtf/vote/${proposal.id}`)
      .setDescription(formatProposalAtRiskOfExpiryText(proposal))
      .setTimestamp()
    await Promise.all(this.discordClients.map((c) => c.send(message)))
    console.log(
      `Discord handler: processed discord proposal expiry warning ${proposal.id}`
    )
  }

  async handleGovernanceVote(proposal: Proposal, vote: Vote) {
    const message = new Discord.MessageEmbed()
      .setTitle(`New Proposal Vote`)
      .setURL(`https://gnars.wtf/vote/${proposal.id}`)
      .setDescription(await formatNewGovernanceVoteText(proposal, vote))
      .setTimestamp()
    await Promise.all(this.discordClients.map((c) => c.send(message)))
    console.log(
      `Discord handler: processed discord new vote for proposal ${proposal.id};${vote.id}`
    )
  }
}
