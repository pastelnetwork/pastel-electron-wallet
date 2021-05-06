import fs from 'fs'

import masternodes from '../masternodes'
import { updateDefaultPastelConfig } from '../pastelConf'

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
    await updateDefaultPastelConfig('somePath')

    expect(readFileSpy).toBeCalledTimes(1)
  })

  test('can write pastel.conf', async () => {
    let mResponse = 'erver=1\n'
    masternodes.map(m => {
      mResponse += `${m.label}=${m.value}\n`
    })
    jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce(mResponse)

    await updateDefaultPastelConfig('somePath')
    expect(fs.promises.writeFile).toBeCalledWith('somePath', mResponse)
  })

  test('pastel.conf has been updated', async () => {
    let mResponse = 'erver=1\n'
    masternodes.map(m => {
      mResponse += `${m.label}=${m.value}\n`
    })
    jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce(mResponse)

    const result = await updateDefaultPastelConfig('somePath')
    expect(fs.promises.writeFile).toBeCalledWith('somePath', mResponse)

    expect(result).toBe(1)
  })
})
