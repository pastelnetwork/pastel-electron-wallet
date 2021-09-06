export const selectAllQuery = 'SELECT * FROM '

export const selectIDQuery = 'SELECT id FROM '

export const whereTransactionIDMatchingQuery =
  ' WHERE transactionid=$tid AND time=$time'

export const orderByIDQuery = ' ORDER BY id DESC LIMIT 1'

export const averageFilterByDailyPeriodQuery =
  "SELECT strftime('%m/%d/%Y', datetime(createdAt / 1000, 'unixepoch')) AS date, AVG(size) AS averageSize FROM blockInfo"

export const averageFilterByMonthlyPeriodQuery =
  "SELECT strftime('%m/%Y', datetime(createdAt / 1000, 'unixepoch')) AS date, AVG(size) AS averageSize FROM blockInfo"

export const averageFilterByYearlyPeriodQuery =
  "SELECT strftime('%Y', datetime(createdAt / 1000, 'unixepoch')) AS date, AVG(size) AS averageSize FROM blockInfo"

export const groupbyDaily =
  "GROUP BY strftime('%Y-%m-%d', datetime(createdAt / 1000, 'unixepoch'))"

export const groupByMonthly =
  "GROUP BY strftime('%Y-%m', datetime(createdAt / 1000, 'unixepoch'))"

export const groupByYearly =
  "GROUP BY strftime('%Y', datetime(createdAt / 1000, 'unixepoch'))"

export const transactionFeeDailyQuery =
  "SELECT strftime('%Y', datetime(createdAt / 1000, 'unixepoch')) AS year, SUM(fee) AS sumFee FROM "

export const countIdByDailyPeriodQuery =
  "SELECT strftime('%m/%d/%Y', datetime(createdAt / 1000, 'unixepoch')) AS date, COUNT(id) AS count from "
