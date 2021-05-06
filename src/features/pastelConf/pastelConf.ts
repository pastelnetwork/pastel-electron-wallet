import fs from 'fs'

import masternodes from './masternodes'

export const updateDefaultPastelConfig = async (
  pastelConfPath: string,
): Promise<number> => {
  if (!pastelConfPath) {
    return 2 // pastelConfPath empty
  }
  try {
    let confValues
    let confContent = ''
    const masterNodesExist: string[] = []
    confValues = await fs.promises.readFile(pastelConfPath, {
      encoding: 'utf-8',
    })

    confValues = confValues.split('\n')
    confValues.map(item => {
      if (item) {
        confContent += `${item}\n`
        if (item.includes('addnode')) {
          masterNodesExist.push(item)
        }
      }
    })

    if (masternodes) {
      masternodes.map(m => {
        const value = `${m.label}=${m.value}`
        if (masterNodesExist.indexOf(value) === -1) {
          confContent += `${value}\n`
        }
      })
    }

    await fs.promises.writeFile(pastelConfPath, confContent)
    return 1 // success
  } catch (err) {
    return 3
  }
}
