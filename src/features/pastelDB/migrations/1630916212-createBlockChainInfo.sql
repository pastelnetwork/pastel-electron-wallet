CREATE TABLE IF NOT EXISTS blockChainInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bestblockhash VARCHAR(255),
  blocks int,
  chain VARCHAR(255),
  chainwork VARCHAR(255),
  commitments int,
  consensus text,
  difficulty float,
  headers int,
  pruned boolean,
  softforks text,
  upgrades text,
  valuePools text,
  verificationprogress int,
  createdAt int
)