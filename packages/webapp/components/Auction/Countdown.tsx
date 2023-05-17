import { FC, useEffect, useState } from "react"
import { intervalToDuration, isPast } from "date-fns"
import { is } from "date-fns/locale"
import { Text } from "@chakra-ui/react"

export type CountdownProps = {
  timestamp: number
}

export const Countdown: FC<CountdownProps> = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState<string>(
    getCountdown(new Date(timestamp * 1000))
  )

  useEffect(() => {
    const endDate = new Date(timestamp * 1000)
    setTimeLeft(getCountdown(endDate))

    if (isPast(endDate)) {
      return
    }

    const interval = setInterval(() => {
      setTimeLeft(getCountdown(endDate))
      if (isPast(endDate)) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timestamp])

  return <Text>{timeLeft}</Text>
}

const getCountdown = (endDate: Date) => {
  const duration = intervalToDuration({ start: Date.now(), end: endDate })

  if (isPast(endDate)) {
    return "next block"
  }

  let timeLeft = ""
  if (duration?.days && duration.days > 0) {
    timeLeft = `${duration.days}d `
  }
  if (timeLeft !== "" || (duration?.hours && duration.hours > 0)) {
    timeLeft += `${duration.hours}h `
  }
  if (timeLeft !== "" || (duration?.minutes && duration?.minutes > 0)) {
    timeLeft += `${duration.minutes}m `
  }
  timeLeft += `${duration.seconds}s`

  return timeLeft
}
