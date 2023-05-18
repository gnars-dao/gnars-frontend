import { useEffect, useState } from "react"

export const useSecondsUntil = (timestamp: number) => {
  const [secondsUntil, setSecondsUntil] = useState(getSecondsUntil(timestamp))

  useEffect(() => {
    setSecondsUntil(getSecondsUntil(timestamp))

    const interval = setInterval(() => {
      const secondsUntil = getSecondsUntil(timestamp)
      if (secondsUntil === null) {
        clearInterval(interval)
      }
      setSecondsUntil(secondsUntil)
    }, 1000)

    return () => clearInterval(interval)
  }, [timestamp])

  return secondsUntil
}

export const getSecondsUntil = (timestamp: number) => {
  const secondsUntil = timestamp - Math.round(Date.now() / 1000)
  return secondsUntil < 0 ? null : secondsUntil
}
