import dotenv from "dotenv"

dotenv.config()

export const config = {
  redisPort: Number(process.env.REDISPORT ?? 6379),
  redisHost: process.env.REDISHOST ?? "localhost",
  redisDb: Number(process.env.REDIS_DB ?? 0),
  redisPassword: process.env.REDISPASSWORD ?? "",
  debugEnabled: process.env.DEBUG_ENABLED === "true",
  twitterEnabled: process.env.TWITTER_ENABLED === "true",
  twitterAppKey: process.env.TWITTER_APP_KEY ?? "",
  twitterAppSecret: process.env.TWITTER_APP_SECRET ?? "",
  twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN ?? "",
  twitterAccessSecret: process.env.TWITTER_ACCESS_SECRET ?? "",
  jsonRpcUrl: process.env.JSON_RPC_URL ?? "",
  discordEnabled: process.env.DISCORD_ENABLED === "true",
  discordWebhookToken: process.env.DISCORD_WEBHOOK_TOKEN ?? "",
  discordWebhookId: process.env.DISCORD_WEBHOOK_ID ?? "",
  discordPublicWebhookToken: process.env.DISCORD_PUBLIC_WEBHOOK_TOKEN ?? "",
  discordPublicWebhookId: process.env.DISCORD_PUBLIC_WEBHOOK_ID ?? "",
  gnarsTokenAddress: process.env.GNARS_TOKEN_ADDRESS ?? "",
}
