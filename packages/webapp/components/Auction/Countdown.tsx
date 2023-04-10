import { FC, useEffect, useState } from "react"
import { intervalToDuration, isPast } from "date-fns"
import { is } from "date-fns/locale"
import { Text } from "@chakra-ui/react"

export type CountdownProps = {
  timestamp: number
}

export const Countdown: FC<CountdownProps> = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    const endDate = new Date(timestamp * 1000)
    if (isPast(endDate)) {
      return
    }

    setTimeLeft(getCountdown(endDate))
    const interval = setInterval(() => setTimeLeft(getCountdown(endDate)), 1000)

    return () => clearInterval(interval)
  }, [timestamp])

  return <Text>{timeLeft}</Text>
}

const getCountdown = (endDate: Date) => {
  const duration = intervalToDuration({ start: Date.now(), end: endDate })

  let timeLeft = ""
  if (duration?.hours && duration.hours > 0) {
    timeLeft = `${duration.hours}h `
  }
  if (
    (duration?.hours && duration.hours > 0) ||
    (duration?.minutes && duration?.minutes > 0)
  ) {
    timeLeft = `${duration.minutes}m `
  }
  timeLeft += `${duration.seconds}s`
  return timeLeft
}
