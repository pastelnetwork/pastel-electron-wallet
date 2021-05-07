import { Database } from 'sql.js'

import { createDatabase } from './pastelDBLib'

class PastelDB {
  private static database: Database | null
  private static isValid: boolean
  public static async getDatabaseInstance(): Promise<Database> {
    if (!PastelDB.database) {
      PastelDB.database = await createDatabase()
      PastelDB.isValid = true
    }
    return PastelDB.database
  }
  public static isValidDB(): boolean {
    return PastelDB.isValid
  }
}

export default PastelDB
