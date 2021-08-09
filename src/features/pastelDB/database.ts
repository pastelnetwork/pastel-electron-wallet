import { Database } from 'sql.js'

import { createDatabase } from './pastelDBLib'

class PastelDB {
  private static database: Database | null
  private static isValid: boolean
  private static onValidCallbacks: (() => void)[] = []
  public static async getDatabaseInstance(): Promise<Database> {
    if (!PastelDB.database) {
      PastelDB.database = await createDatabase()
      PastelDB.isValid = true
    }
    return PastelDB.database
  }
  public static setValid(isValid: boolean): void {
    PastelDB.isValid = isValid
    if (isValid) {
      this.onValidCallbacks.forEach(cb => cb())
      this.onValidCallbacks.length = 0
    }
  }
  public static isValidDB(): boolean {
    return PastelDB.isValid
  }
  public static waitTillValid(): Promise<void> {
    if (this.isValid) {
      return Promise.resolve()
    }

    return new Promise(resolve => this.onValidCallbacks.push(resolve))
  }
}

export default PastelDB
