import { spawn } from 'child_process'
import readline from 'readline'

export const spawnProcess = (
  binPath: string,
  args: string[],
  { onStdoutLine }: { onStdoutLine?(line: string): void } = {},
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const process = spawn(binPath, args)

    if (onStdoutLine) {
      const lineReader = readline.createInterface({
        input: process.stdout,
        crlfDelay: Infinity,
      })

      lineReader.on('line', (line: string) => {
        onStdoutLine(line)
        if (line.includes('Y/N')) {
          process.stdin.write('Y')
          process.stdin.end()
        }
      })
    }

    const errorChunks: Buffer[] = []
    process.stderr.on('data', data => {
      errorChunks.push(data)
    })

    process.on('close', () => {
      if (errorChunks.length === 0) {
        resolve()
      } else {
        reject(new Error(Buffer.concat(errorChunks).toString()))
      }
    })
  })
}
