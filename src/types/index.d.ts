import { SaveDialogReturnValue } from 'electron'

type TFilters = {
  name: string
  extensions: string[]
}

declare global {
  interface Window {
    pastelWallet: {
      showSaveDialog: (
        title: string,
        defaultPath: string,
        filters: TFilters[],
        properties: string[],
      ) => Promise<SaveDialogReturnValue>
    }
  }
}
export {}
