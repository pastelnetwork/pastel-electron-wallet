import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

// add methods .to, .from, .fromNow, to get output like "10 days ago"
dayjs.extend(relativeTime)
dayjs.extend(utc)

export default dayjs
