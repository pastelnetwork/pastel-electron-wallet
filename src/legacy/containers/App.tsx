import * as React from 'react'

type Props = {
  children: JSX.Element
}

export default class App extends React.Component<Props> {
  render(): React.ReactElement {
    const { children } = this.props
    return <>{children}</>
  }
}
