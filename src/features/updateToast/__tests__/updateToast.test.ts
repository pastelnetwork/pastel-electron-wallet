import {
  closeUpdateToast,
  openUpdateToast,
  updateToastReducer,
} from '../UpdateToastSlice'

jest.mock('electron', () => ({
  ipcRenderer: {
    send: jest.fn(),
  },
  shell: {
    openExternal: jest.fn(),
  },
}))

describe('updateToast reducer', () => {
  test('returns correct default state', () => {
    const s = updateToastReducer(undefined, { type: 'test' })

    expect(s).toEqual({
      opened: false,
    })
  })

  test('should open UploadToast modal', () => {
    const s = updateToastReducer(undefined, openUpdateToast())

    expect(s).toEqual({
      opened: true,
    })
  })

  test('should close UploadToast modal', () => {
    const s = updateToastReducer(undefined, closeUpdateToast())

    expect(s).toEqual({
      opened: false,
    })
  })
})
