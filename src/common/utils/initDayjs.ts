import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// add methods .to, .from, .fromNow, to get output like "10 days ago"
dayjs.extend(relativeTime)

export default dayjs
