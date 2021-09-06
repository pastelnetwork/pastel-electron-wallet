CREATE TABLE IF NOT EXISTS networkInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version int,
  subversion VARCHAR(255),
  protocolversion int,
  localservices VARCHAR(255),
  timeoffset int,
  connections int,
  networks text,
  relayfee float,
  localaddresses text,
  warnings VARCHAR(255),
  createdAt int
)
