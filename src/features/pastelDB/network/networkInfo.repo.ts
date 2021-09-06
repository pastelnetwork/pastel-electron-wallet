import { Database } from 'better-sqlite3'
import { TLocalAddress, TNetwork } from '../../../types/rpc'

export type TDbNetworkInfo = {
  id: number
  version: number
  subversion: string
  protocolversion: number
  localservices: string
  timeoffset: number
  connections: number
  networks: string
  relayfee: number
  localaddresses: string
  warnings: string
  createdAt: number
}

export const insertNetworkInfo = (
  db: Database,
  values: Omit<
    TDbNetworkInfo,
    'id' | 'createdAt' | 'networks' | 'localaddresses'
  > & {
    networks: string | TNetwork[]
    localaddresses: string | TLocalAddress[]
  },
): void => {
  db.prepare(
    `INSERT INTO networkInfo(
    version,
    subversion,
    protocolversion,
    localservices,
    timeoffset,
    connections,
    networks,
    relayfee,
    localaddresses,
    warnings,
    createdAt
  ) VALUES (
    $version,
    $subversion,
    $protocolversion,
    $localservices,
    $timeoffset,
    $connections,
    $networks,
    $relayfee,
    $localaddresses,
    $warnings,
    $createdAt
  )`,
  ).run({
    createdAt: Date.now(),
    ...values,
    networks: Array.isArray(values.networks)
      ? JSON.stringify(values.networks)
      : values.networks,
    localaddresses: Array.isArray(values.localaddresses)
      ? JSON.stringify(values.localaddresses)
      : values.localaddresses,
  })
}
