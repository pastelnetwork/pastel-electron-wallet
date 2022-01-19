export const validURL = (url: string): boolean => {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/
  const pattern = new RegExp(regex)
  return pattern.test(url)
}

export const validFacebookUrl = (url: string): boolean => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\\-]*\/)*([\w\-\\.]+)(?:\/)?/i
  const pattern = new RegExp(regex)
  return pattern.test(url)
}

export const validTwitterUrl = (url: string): boolean => {
  const regex = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
  const pattern = new RegExp(regex)
  return pattern.test(url)
}
