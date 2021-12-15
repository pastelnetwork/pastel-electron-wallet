import fs from 'fs'
import path from 'path'
import log from 'electron-log'

export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer)
    }
    reader.onerror = () => {
      reject(reader.error || new Error('Can not read file'))
    }
    reader.readAsArrayBuffer(file)
  })
}

const KB = 1024
const MB = KB * 1024
const GB = MB * 1024
export const Size = {
  KB,
  MB,
  GB,
}

export const getFileName = async (
  dir: string,
  file: string,
): Promise<string | null> => {
  if (!dir) {
    throw new Error(`Can't get path of ${file} store`)
  }

  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir)
  }

  const fileName = path.join(dir, file)
  if (!fs.existsSync(fileName)) {
    fs.createWriteStream(fileName)
  }

  return fileName
}

export const readFileName = async (
  dir: string,
  file: string,
): Promise<string> => {
  const fileName = await getFileName(dir, file)

  try {
    if (fileName) {
      const data = await fs.promises.readFile(fileName, {
        encoding: 'binary',
      })

      if (data) {
        return data.toString()
      }
    }

    return ''
  } catch (err) {
    const msg: string = err?.message || ''
    log.error(`common/utils/file readFileName error: ${msg}`, err)
    return ''
  }
}

export const writeFileContent = async (
  content: string,
  dir: string,
  file: string,
): Promise<void> => {
  const fileName = await getFileName(dir, file)

  if (fileName) {
    await fs.promises.writeFile(fileName, content, {
      encoding: 'binary',
    })
  }
}
