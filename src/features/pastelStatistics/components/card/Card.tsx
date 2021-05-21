import React from 'react'
import styles from './Card.module.css'

type CardProps = {
  backgroundImage?: string
  title?: string
  subTitle?: string
}

export const Card = (props: CardProps): JSX.Element => {
  const { subTitle, backgroundImage } = props

  return (
    <div className={styles.cardWrap}>
      <div
        className={styles.cardContainer}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className={styles.cardTitle}>{subTitle}</div>
    </div>
  )
}
