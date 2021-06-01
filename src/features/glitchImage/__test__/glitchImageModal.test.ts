import {
  closeGlitchImageModal,
  openGlitchImageModal,
  glitchImageModalReducer,
} from '../GlitchImageModalSlice'

describe('feature/GlitchImageModal reducer', () => {
  test('Returns correct default state for GlitchImageModal reducer', () => {
    // Act
    const s = glitchImageModalReducer(undefined, { type: 'test' })

    // Assert
    expect(s).toEqual({
      modalIsOpen: false,
    })
  })

  test('Open state correctly for GlitchImageModal reducer', () => {
    // Act
    const s = glitchImageModalReducer(undefined, openGlitchImageModal())

    // Assert
    expect(s).toEqual({
      modalIsOpen: true,
    })
  })

  test('Close state correctly for GlitchImageModal reducer', () => {
    // Act
    const s = glitchImageModalReducer(undefined, closeGlitchImageModal())

    // Assert
    expect(s).toEqual({
      modalIsOpen: false,
    })
  })
})
