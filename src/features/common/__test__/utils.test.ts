import PastelUtils from '../utils'

describe('feature/common/utils', () => {
  test('Remove whitespace of a string in utils/removeAllBreakChar', async () => {
    const result = PastelUtils.removeAllBreakChar(' p-secret-extended-key ')

    expect(result).toEqual('p-secret-extended-key')
  })
})
