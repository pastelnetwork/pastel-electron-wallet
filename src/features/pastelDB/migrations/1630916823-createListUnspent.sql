CREATE TABLE IF NOT EXISTS listUnspent (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  txid VARCHAR(255),
  vout int,
  generated boolean,
  address VARCHAR(255),
  account VARCHAR(255),
  scriptPubKey VARCHAR(255),
  amount int,
  confirmations int,
  spendable int,
  createdAt int
)
