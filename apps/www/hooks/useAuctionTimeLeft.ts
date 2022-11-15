import { useEffect, useState } from "react"

export default function useAuctionTimeLeft(endTimestamp: string) {
  const [auctionTimeLeft, setAuctionTimeLeft] = useState<string>()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const endDate = new Date(endTimestamp).getTime()
      let difference = endDate - now

      if (difference > 0) {
        const hours = difference / (60 * 60)
        difference -= hours * (60 * 60)
        const minutes = difference / 60
        const seconds = difference - minutes * 60
        let newAuctionTimeLeft = ""
        if (hours > 0) {
          newAuctionTimeLeft = `${hours}h `
        }
        if (hours > 0 || minutes > 0) {
          newAuctionTimeLeft = `${minutes}m `
        }
        newAuctionTimeLeft += `${seconds}s`
        setAuctionTimeLeft(newAuctionTimeLeft)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTimestamp])

  return auctionTimeLeft
}
