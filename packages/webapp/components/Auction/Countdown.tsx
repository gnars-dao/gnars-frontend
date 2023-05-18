import { Text } from "@chakra-ui/react"
import { useSecondsUntil } from "hooks/useSecondsUntil"
import { FC } from "react"

export type CountdownProps = {
  timestamp: number
}

export const Countdown: FC<CountdownProps> = ({ timestamp }) => {
  const secondsUntil = useSecondsUntil(timestamp)

  if (secondsUntil === null) {
    return <Text>ended</Text>
  }

  let timeLeft = ""
  const daysLeft = Math.floor(secondsUntil / 86400)
  if (daysLeft > 0) {
    timeLeft = `${daysLeft}d `
  }
  const hoursLeft = Math.floor((secondsUntil % 86400) / 3600)
  if (timeLeft !== "" || hoursLeft > 0) {
    timeLeft += `${hoursLeft}h `
  }

  const minutesLeft = Math.floor((secondsUntil % 3600) / 60)
  if (timeLeft !== "" || minutesLeft > 0) {
    timeLeft += `${minutesLeft}m `
  }

  const secondsLeft = Math.floor(secondsUntil % 60)
  timeLeft += `${secondsLeft}s`

  return <Text>{timeLeft}</Text>
}
