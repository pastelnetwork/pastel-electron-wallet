import { RouteComponentProps } from 'react-router'

export type RouteType = {
  id: string
  path: string
  component:
    | React.FunctionComponent<RouteComponentProps>
    | React.ComponentClass<RouteComponentProps>
    | null
  layout:
    | React.FunctionComponent<unknown>
    | React.ComponentClass<unknown>
    | null
}
