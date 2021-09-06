CREATE TABLE IF NOT EXISTS listReceivedByAddress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  address VARCHAR(255),
  account VARCHAR(255),
  amount int,
  confirmations int,
  txids text,
  createdAt int
)
