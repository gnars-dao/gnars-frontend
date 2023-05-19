export const formatConciseDurationInDays = (seconds: number) => {
  let duration = ""
  const daysLeft = Math.floor(seconds / 86400)
  if (daysLeft > 0) {
    duration = `${daysLeft}d `
  }
  const hoursLeft = Math.floor((seconds % 86400) / 3600)
  if (duration !== "" || hoursLeft > 0) {
    duration += `${hoursLeft}h `
  }

  const minutesLeft = Math.floor((seconds % 3600) / 60)
  if (duration !== "" || minutesLeft > 0) {
    duration += `${minutesLeft}m `
  }

  const secondsLeft = Math.floor(seconds % 60)
  duration += `${secondsLeft}s`

  return duration
}
