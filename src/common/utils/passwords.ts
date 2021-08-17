import randomize from 'secure-random-password'

/**
 * Calc parrword scrength score
 * @param pass
 * @returns Password strength score: 0 for empty password, 1-4 for not empty password
 */
export function calcPasswordStrength(pass: string): number {
  if (!pass) {
    return 0
  }

  let score = 0

  // award every unique letter until 5 repetitions
  const letters: Record<string, number> = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations: Record<string, boolean> = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  }

  let variationCount = 0
  for (const check in variations) {
    variationCount += variations[check] == true ? 1 : 0
  }
  score += (variationCount - 1) * 10

  const res = 1 + Math.round(score / 25)

  // optional, check min pwd len & digits count. Just to match password hint text in new design
  if (res > 2 && (pass.length < 8 || pass.replace(/[^0-9]/g, '').length < 2)) {
    return 2
  }

  return res
}

export function randomPassword(length?: number): string {
  const randomNumbers = Math.floor(Math.random() * 4) + 2

  return randomize.randomPassword({
    length: length || 12,
    characters: [
      { characters: randomize.digits, exactly: randomNumbers },
      randomize.lower,
      randomize.upper,
    ],
  })
}
