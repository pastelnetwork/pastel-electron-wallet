CREATE TABLE IF NOT EXISTS transactionTbl (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount int,
  blockhash VARCHAR(255),
  blockindex int,
  blocktime int,
  confirmations int,
  details text,
  expiryheight int,
  hex VARCHAR(255),
  time int,
  timereceived int,
  txid VARCHAR(255),
  vjoinsplit text,
  walletconflicts text,
  createdAt int
)