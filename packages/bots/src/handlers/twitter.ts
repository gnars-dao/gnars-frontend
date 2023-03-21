import { getAuctionReplyTweetId, updateAuctionReplyTweetId } from "../cache"
import { IAuctionLifecycleHandler, Bid } from "../types"
import { twitter } from "../clients"
import {
  getAuctionEndingSoonTweetText,
  formatAuctionStartedTweetText,
  formatBidMessageText,
  getGnarPngBuffer,
} from "../utils"
import Discord from "discord.js"
import TwitterApi from "twitter-api-v2"

export class TwitterAuctionLifecycleHandler
  implements IAuctionLifecycleHandler
{
  constructor(private readonly twitterClient: TwitterApi) {
    this.twitterClient = twitterClient
  }
  /**
   * Tweet an image of the current Gnar alerting users
   * to the new auction and update the tweet reply id cache
   * @param auctionId The current auction ID
   */
  async handleNewAuction(auctionId: number) {
    const png = await getGnarPngBuffer(auctionId.toString())
    if (png) {
      console.log(
        `Twitter handler: handleNewAuction tweeting discovered auction id ${auctionId}`
      )
      const mediaId = await this.twitterClient.v1
        .uploadMedia(png, {
          mimeType: "image/png",
        })
        .catch((e) => console.error(JSON.stringify(e, null, 2)))
      if (!mediaId) {
        return
      }
      const tweet = await this.twitterClient.v1
        .tweet(formatAuctionStartedTweetText(auctionId), {
          media_ids: mediaId,
        })
        .catch((e) => console.error(JSON.stringify(e, null, 2)))
      if (!tweet) {
        return
      }
      await updateAuctionReplyTweetId(tweet.id_str)
    }
    console.log(`Twitter handler: processed twitter new auction ${auctionId}`)
  }

  /**
   * Tweet a reply with new bid information to the reply id cache
   * We intentionally update the bid cache before safety checks to ensure we do not double tweet a bid
   * @param auctionId The current auction id
   * @param bid The current bid
   */
  async handleNewBid(auctionId: number, bid: Bid) {
    const tweetReplyId = await getAuctionReplyTweetId()
    if (!tweetReplyId) {
      console.error(
        `Twitter handler: handleNewBid no reply tweet id exists: auction(${auctionId}) bid(${bid.id})`
      )
      return
    }
    const tweetId = await this.twitterClient.v1
      .reply(await formatBidMessageText(auctionId, bid), tweetReplyId)
      .catch((e) => console.error(JSON.stringify(e, null, 2)))
      .then((tweet) => tweet!.id_str)

    if (!tweetId) {
      return
    }

    await updateAuctionReplyTweetId(tweetId)
    console.log(
      `Twitter handler: processed twitter new bid ${bid.id}:${auctionId}`
    )
  }

  /**
   * Tweet a reply informing observers that the auction is ending soon
   * @param auctionId The current auction id
   */
  async handleAuctionEndingSoon(auctionId: number) {
    const tweetReplyId = await getAuctionReplyTweetId()
    if (!tweetReplyId) {
      console.error(
        `Twitter handler: handleAuctionEndingSoon no reply tweet id exists for auction ${auctionId}`
      )
      return
    }
    const tweetId = await this.twitterClient.v1
      .reply(getAuctionEndingSoonTweetText(), tweetReplyId)
      .catch(console.error)
      .then((tweet) => tweet!.id_str)
    await updateAuctionReplyTweetId(tweetId)
    console.log(
      `Twitter handler: processed twitter auction ending soon update for auction ${auctionId}`
    )
  }
}
