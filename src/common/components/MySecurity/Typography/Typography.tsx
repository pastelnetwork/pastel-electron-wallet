import React from 'react'

import * as Styles from './Typography.style'

interface TextProps {
  children: string
}

export const Title: React.FC<TextProps> = ({ children }) => {
  return <Styles.Title>{children}</Styles.Title>
}

export const Description: React.FC<TextProps> = ({ children }) => {
  return <Styles.Description>{children}</Styles.Description>
}

export const Hint: React.FC<TextProps> = ({ children }) => {
  return <Styles.Hint>{children}</Styles.Hint>
}
