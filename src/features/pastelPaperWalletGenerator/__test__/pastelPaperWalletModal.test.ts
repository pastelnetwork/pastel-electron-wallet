import {
  closePastelPaperWalletModal,
  openPastelPaperWalletModal,
  pastelPaperWalletModalReducer,
} from '../PastelPaperWalletModalSlice'

describe('PastelPaperWalletModal reducer', () => {
  test('Returns correct default state for PastelPaperWalletModal reducer', () => {
    // Act
    const s = pastelPaperWalletModalReducer(undefined, { type: 'test' })

    // Assert
    expect(s).toEqual({
      modalIsOpen: false,
      privateKey: '',
      address: '',
    })
  })

  test('Open state correctly for PastelPaperWalletModal reducer', () => {
    const address = 'PtmHPHFpBz9ALNDs5AUUu6nyx7W5bonSjhv',
      privateKey = 'PtmHPHFpBz9ALNDs5AUUu6nyx7W5bonSjhv'
    // Act
    const s = pastelPaperWalletModalReducer(
      undefined,
      openPastelPaperWalletModal({
        address,
        privateKey,
      }),
    )

    // Assert
    expect(s).toEqual({
      address,
      privateKey,
      modalIsOpen: true,
    })
  })

  test('Close state correctly for PastelPaperWalletModal reducer', () => {
    // Act
    const s = pastelPaperWalletModalReducer(
      undefined,
      closePastelPaperWalletModal(),
    )

    // Assert
    expect(s).toEqual({
      address: '',
      privateKey: '',
      modalIsOpen: false,
    })
  })
})
