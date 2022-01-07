export const validURL = (url: string): boolean => {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/
  const pattern = new RegExp(regex)
  return pattern.test(url)
}
