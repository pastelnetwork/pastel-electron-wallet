import { removeAllWhiteSpaces } from '../ImportPrivKeyModal'

describe('feature/ImportPrivKeyModal', () => {
  test('Remove all whitespace for ImportPrivKeyModal content', async () => {
    const result = removeAllWhiteSpaces(
      ' p-secret-extended-key-main1qwjyesupqyqqpq zxpgs8quwne2p0s4mmlmu65qjxxayy40unl78ysuxlf3q6vq4zlqlasnqjwslm2 ycvqrs60vem ',
    )

    expect(result).toEqual(
      'p-secret-extended-key-main1qwjyesupqyqqpqzxpgs8quwne2p0s4mmlmu65qjxxayy40unl78ysuxlf3q6vq4zlqlasnqjwslm2ycvqrs60vem',
    )
  })
})
