CREATE TABLE IF NOT EXISTS txOutSetInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  height int,
  bestblock VARCHAR(255),
  transactions int,
  txouts int,
  bytes_serialized int,
  hash_serialized VARCHAR(255),
  total_amount float,
  createdAt int
)
