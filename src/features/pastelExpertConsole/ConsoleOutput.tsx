import cx from 'classnames'
import { OutputType } from 'javascript-terminal'
import React from 'react'

import styles from './TerminalConsole.module.css'

type TOutputProps = {
  type: string
  textContent: string
}

const ConsoleOutput = (props: TOutputProps): JSX.Element => {
  const { type, textContent } = props
  return (
    <div
      className={cx({
        [styles.textOutput]: type === OutputType.TEXT_OUTPUT_TYPE,
        [styles.errorOutput]: type === OutputType.TEXT_ERROR_OUTPUT_TYPE,
        [styles.headOutput]: type === OutputType.HEADER_OUTPUT_TYPE,
      })}
    >
      <pre>{textContent}</pre>
    </div>
  )
}

export default ConsoleOutput
