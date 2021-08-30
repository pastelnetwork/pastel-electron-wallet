import { removeAllBreakChar, truncateMiddle } from '../utils/string'

describe('feature/common/utils', () => {
  test('Remove whitespace of a string in utils/removeAllBreakChar', async () => {
    const result = removeAllBreakChar(' p-secret-extended-key ')

    expect(result).toEqual('p-secret-extended-key')
  })

  test('Truncate middle of a string in utils/truncateMiddle', async () => {
    const result = truncateMiddle(
      'ps1j6mps3f4e8h7ydeplekqm4zpcyuqkcw8vyka3vyq36wa4ghxd',
      8,
      4,
      '...',
    )

    expect(result).toEqual('ps1j6mps...ghxd')
  })
})
