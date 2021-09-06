CREATE TABLE IF NOT EXISTS memPoolInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  size int,
  bytes int,
  usage int,
  createdAt int
)