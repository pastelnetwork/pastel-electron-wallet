/* eslint-disable */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class ScrollPane extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      height: 0,
    }
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }
  /**
   * Calculate & Update state of height, needed for the scrolling
   */

  updateDimensions = () => {
    const updateHeight = window.innerHeight - this.props.offsetHeight
    this.setState({
      height: updateHeight,
    })
  }

  render() {
    const { children } = this.props
    const { height } = this.state
    return (
      <div
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          height,
        }}
      >
        {children}
      </div>
    )
  }
}
