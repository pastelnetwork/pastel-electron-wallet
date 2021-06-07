import * as React from 'react'

export default class App extends React.Component {
  render(): React.ReactElement {
    const { children } = this.props
    return <>{children}</>
  }
}
