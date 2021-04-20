/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import TuiImageEditor from 'tui-image-editor'

interface IProps {
  [key: string]: any
}

export default class ImageEditor extends React.Component<IProps> {
  rootEl: any = React.createRef()
  imageEditorInst: any = null

  componentDidMount() {
    const { children, ...rest } = this.props
    this.imageEditorInst = new TuiImageEditor(this.rootEl.current, rest)

    this.bindEventHandlers(this.props)
  }

  componentWillUnmount() {
    this.unbindEventHandlers()

    this.imageEditorInst.destroy()

    this.imageEditorInst = null
  }

  shouldComponentUpdate(nextProps: IProps) {
    this.bindEventHandlers(this.props, nextProps)

    return false
  }

  getInstance = () => {
    return this.imageEditorInst
  }

  getRootElement = () => {
    return this.rootEl.current
  }

  bindEventHandlers = (props: IProps, prevProps?: IProps) => {
    Object.keys(props)
      .filter(this.isEventHandlerKeys)
      .forEach(key => {
        const eventName = key[2].toLowerCase() + key.slice(3)
        if (prevProps && prevProps[key] !== props[key]) {
          this.imageEditorInst.off(eventName)
        }
        this.imageEditorInst.on(eventName, props[key])
      })
  }

  unbindEventHandlers = () => {
    Object.keys(this.props)
      .filter(this.isEventHandlerKeys)
      .forEach(key => {
        const eventName = key[2].toLowerCase() + key.slice(3)
        this.imageEditorInst.off(eventName)
      })
  }

  isEventHandlerKeys = (key: string) => {
    return /on[A-Z][a-zA-Z]+/.test(key)
  }

  render() {
    return <div ref={this.rootEl} />
  }
}
