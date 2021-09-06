CREATE TABLE IF NOT EXISTS miningInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  blocks int,
  currentblocksize int,
  currentblocktx int,
  difficulty float,
  errors text,
  genproclimit int,
  localsolps int,
  networksolps int,
  networkhashps int,
  pooledtx int,
  testnet int,
  chain text,
  generate boolean,
  createdAt int
)
