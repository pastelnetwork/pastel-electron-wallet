import fs from 'fs'

import { updateDefaultPastelConfig } from '../pastelConf'

const pastelConfPath = __dirname + '\\pastel.conf'

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue(true),
    readFile: jest.fn().mockResolvedValue(true),
  },
}))

describe('pastelConf/updateDefaultPastelConfig', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })

  test('pastel.conf is existing', async () => {
    const result = await updateDefaultPastelConfig('')
    expect(result).toBe(2)
  })

  test('can read pastel.conf', async () => {
    const readFileSpy = jest.spyOn(fs.promises, 'readFile')
    await updateDefaultPastelConfig(pastelConfPath)

    expect(readFileSpy).toBeCalledTimes(1)
  })

  test('can write pastel.conf', async () => {
    const writeFileSpy = jest.spyOn(fs.promises, 'writeFile')
    await updateDefaultPastelConfig(pastelConfPath)

    expect(writeFileSpy).toBeCalledTimes(1)
  })

  test('pastel.conf has been updated', async () => {
    const result = await updateDefaultPastelConfig(pastelConfPath)

    expect(result).toBe(1)
  })
})
