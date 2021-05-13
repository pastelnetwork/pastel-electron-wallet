import {
  closePastelPaperWalletModal,
  openPastelPaperWalletModal,
  pastelPaperWalletModalReducer,
} from '../PastelPaperWalletModalSlice'

describe('PastelPaperWalletModal reducer', () => {
  test('returns correct default state', () => {
    // Act
    const s = pastelPaperWalletModalReducer(undefined, { type: 'test' })

    // Assert
    expect(s).toEqual({
      modalIsOpen: false,
      privateKey: '',
      address: '',
    })
  })

  test('open state correctly', () => {
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

  test('close state correctly', () => {
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
