import React from 'react'
import styles from './Card.module.css'

type CardProps = {
  backgroundImage?: string
  title?: string
  subTitle?: string
}

export function Card(props: CardProps): JSX.Element {
  const { subTitle, backgroundImage } = props
  const vBackgroundImage: string = backgroundImage || ''
  return (
    <div className={styles.cardWrap}>
      <div
        className={styles.cardContainer}
        style={{
          backgroundImage: `url(${vBackgroundImage})`,
        }}
      ></div>
      <div className={styles.cardTitle}>{subTitle}</div>
    </div>
  )
}

Card.defaultProps = {
  backgroundImage: '',
  title: '',
  subTitle: '',
}
