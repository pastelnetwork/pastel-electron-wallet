-- listtransactions rpc call has inconsistent pagination, we need to mix it with listsinceblock
DROP TABLE listTransactions;

-- containts results from listtransactions and listsinceblock
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account text,
  address text,
  category text,
  amount real,
  vout int,
  fee real,
  confirmations int,
  blockhash text,
  blockindex int,
  blocktime int,
  expiryheight int,
  txid text,
  walletconflicts text,
  time int,
  timereceived int,
  vjoinsplit text,
  size int,
  createdAt int
);

-- txid and vout combination should be unique
CREATE UNIQUE INDEX idx_transactions_txid_and_vout ON transactions(txid, vout);

-- index address for faster last activity time query
CREATE UNIQUE INDEX idx_transactions_address ON transactions(address);
