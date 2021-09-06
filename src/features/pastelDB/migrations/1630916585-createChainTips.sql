CREATE TABLE IF NOT EXISTS chainTips (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  height int,
  hash VARCHAR(255),
  branchlen int,
  status VARCHAR(255),
  createdAt int
)
