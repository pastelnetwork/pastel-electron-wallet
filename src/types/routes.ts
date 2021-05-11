export type RouteType = {
  id: string
  path: string
  component: React.FunctionComponent<any> | React.ComponentClass<any> | null
  layout: React.FunctionComponent<any> | React.ComponentClass<any> | null
}
