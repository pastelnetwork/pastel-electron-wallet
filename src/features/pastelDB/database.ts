import { Database } from 'sql.js'

import { createDatabase } from './pastelDBLib'

class PastelDB {
  private static database: Database | null
  private static isValid = false
  private static onValidCallbacks: (() => void)[] = []
  private static getDatabasePromise: Promise<Database> | void
  public static init(): void {
    this.getDatabaseInstance()
  }
  public static getDatabaseInstance(): Promise<Database> {
    if (!this.getDatabasePromise) {
      this.getDatabasePromise = this.setDatabase()
    }
    return this.getDatabasePromise
  }
  public static setValid(isValid: boolean): void {
    PastelDB.setIsValid(isValid)
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
  private static async setDatabase() {
    if (!this.database) {
      this.database = await createDatabase()
      this.setIsValid(true)
    }
    return this.database
  }
  private static setIsValid(isValid: boolean) {
    this.isValid = isValid
    if (isValid) {
      this.onValidCallbacks.forEach(cb => cb())
      this.onValidCallbacks.length = 0
    }
  }
}

export default PastelDB
