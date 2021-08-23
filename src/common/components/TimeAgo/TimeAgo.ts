export default function timeAgo(date: number): string {
  const now = new Date().getTime()
  const distance = now - date
  const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 30 * 365))
  const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30))
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

  if (months > 12) {
    return `${years}year(s) ago`
  }

  if (days > 30) {
    return `${months}month(s) ago`
  }

  return `${days}d ${hours}h ${minutes}m ago`
}
