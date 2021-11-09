import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import dayOfYear from 'dayjs/plugin/dayOfYear'

// add methods .to, .from, .fromNow, to get output like "10 days ago"
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(dayOfYear)

export { Dayjs }

export default dayjs
