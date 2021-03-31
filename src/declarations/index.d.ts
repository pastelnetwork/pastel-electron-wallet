// allow import of .css files
declare module '*.css' {
  const content: Record<string, string>
  export default content
}
