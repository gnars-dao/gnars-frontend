import { useEffect, useState } from "react"
import { intervalToDuration, isPast } from "date-fns"

export default function useAuctionTimeLeft(endTimestamp?: number) {
  const [auctionTimeLeft, setAuctionTimeLeft] = useState<string | null>()

  useEffect(() => {
    if (!endTimestamp) {
      return setAuctionTimeLeft(null)
    }
    const interval = setInterval(() => {
      const now = Date.now()
      const endDate = new Date(endTimestamp * 1000)

      if (isPast(endDate)) {
        return setAuctionTimeLeft(null)
      }
      const duration = intervalToDuration({ start: now, end: endDate })

      let newAuctionTimeLeft = ""
      if (duration.hours > 0) {
        newAuctionTimeLeft = `${duration.hours}h `
      }
      if (duration.hours > 0 || duration.minutes > 0) {
        newAuctionTimeLeft = `${duration.minutes}m `
      }
      newAuctionTimeLeft += `${duration.seconds}s`
      setAuctionTimeLeft(newAuctionTimeLeft)
    }, 1000)

    return () => clearInterval(interval)
  }, [endTimestamp])

  return auctionTimeLeft
}
