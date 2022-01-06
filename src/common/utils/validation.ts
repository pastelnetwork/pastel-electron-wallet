export const validURL = (url: string): boolean => {
  try {
    new URL(url)
  } catch (e) {
    return false
  }
  return true
}
