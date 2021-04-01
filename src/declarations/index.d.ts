// allow import of .css files
declare module '*.css' {
  const content: Record<string, string>
  export = content
}
declare module '*.png' {
  const url: string
  export = url
}
