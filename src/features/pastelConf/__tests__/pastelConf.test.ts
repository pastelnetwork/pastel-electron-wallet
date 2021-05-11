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

  test('can read pastel.conf', async () => {
    const mResponse = 'erver=1\n'
    const readFileSpy = jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValueOnce(mResponse)

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

    await updateDefaultPastelConfig('somePath')
    expect(fs.promises.writeFile).toBeCalledWith('somePath', mResponse)
  })

  test('catches an error if pastel.conf is undefined', async () => {
    expect.hasAssertions()

    jest.spyOn(fs.promises, 'readFile')

    try {
      await updateDefaultPastelConfig('somePath')
    } catch (err) {
      expect(err.message).toEqual(
        "pastelConf updateDefaultPastelConfig error: Cannot read property 'split' of undefined",
      )
    }
  })
})
