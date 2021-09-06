CREATE TABLE IF NOT EXISTS rawMemPoolInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transactionid int NOT NULL,
  size int,
  fee int,
  time int,
  height int,
  startingpriority int,
  currentpriority int,
  depends text,
  createdAt int
)