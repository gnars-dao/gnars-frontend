import { useCallback, useEffect, useState } from "react"
import { intervalToDuration, isPast } from "date-fns"

export default function useAuctionTimeLeft(endTimestamp?: number) {
  const [auctionTimeLeft, setAuctionTimeLeft] = useState<string | null>()
  const [isInPast, setIsInPast] = useState(
    isPast(new Date(endTimestamp * 1000))
  )

  const updateCountdown = useCallback(() => {
    const now = Date.now()
    const endDate = new Date(endTimestamp * 1000)

    setIsInPast(isPast(new Date(endTimestamp * 1000)))

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
  }, [])

  useEffect(() => {
    if (!endTimestamp || isInPast) {
      return
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [endTimestamp, isInPast])

  return isInPast || !endTimestamp ? null : auctionTimeLeft
}
