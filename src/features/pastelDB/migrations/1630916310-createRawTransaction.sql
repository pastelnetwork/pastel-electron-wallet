CREATE TABLE IF NOT EXISTS rawTransaction (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hex VARCHAR(255),
  txid VARCHAR(255),
  overwintered boolean,
  version int,
  versiongroupid VARCHAR(255),
  locktime int,
  expiryheight int,
  vin text,
  vout text,
  vjoinsplit text,
  blockhash VARCHAR(255),
  confirmations int,
  time int,
  blocktime int,
  createdAt int
)
