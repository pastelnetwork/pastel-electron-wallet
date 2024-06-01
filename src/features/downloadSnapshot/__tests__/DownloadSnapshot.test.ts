import {
  closeDownloadSnapshot,
  openDownloadSnapshot,
  downloadSnapshotReducer,
} from '../DownloadSnapshotSlice'

jest.mock('electron', () => ({
  ipcRenderer: {
    send: jest.fn(),
  },
  shell: {
    openExternal: jest.fn(),
  },
}))

describe('Download Snapshot reducer', () => {
  test('returns correct default state', () => {
    const s = downloadSnapshotReducer(undefined, { type: 'test' })

    expect(s).toEqual({
      opened: false,
    })
  })

  test('should open Download Snapshot modal', () => {
    const s = downloadSnapshotReducer(undefined, openDownloadSnapshot())

    expect(s).toEqual({
      opened: true,
    })
  })

  test('should close Download Snapshot modal', () => {
    const s = downloadSnapshotReducer(undefined, closeDownloadSnapshot())

    expect(s).toEqual({
      opened: false,
    })
  })
})
