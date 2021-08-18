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
