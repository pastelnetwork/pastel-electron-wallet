import React from 'react'
import { useHistory } from 'react-router-dom'

import bg1 from '../../assets/images/bg1.png'
import bg2 from '../../assets/images/bg2.png'
import bg3 from '../../assets/images/bg3.png'
import bg4 from '../../assets/images/bg4.png'
import bg5 from '../../assets/images/bg5.png'
import bg6 from '../../assets/images/bg6.png'
import bg7 from '../../assets/images/bg7.png'
import bg8 from '../../assets/images/bg8.png'
import bg9 from '../../assets/images/bg9.png'
import styles from './Card.module.css'

type CardProps = {
  cardIndex: number
  title?: string
  subTitle?: string
  routeUrl?: string
}

const backgroundImages = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9]

export const Card = (props: CardProps): JSX.Element => {
  const history = useHistory()
  const { subTitle, routeUrl, cardIndex } = props

  const handleCardClick = (routeUrl?: string) => {
    if (routeUrl) {
      history.push(routeUrl)
    }
  }

  return (
    <div className={styles.cardWrap}>
      <div
        className={styles.cardContainer}
        style={{
          backgroundImage: `url(${backgroundImages[cardIndex]})`,
        }}
        onClick={() => handleCardClick(routeUrl)}
      ></div>
      <div className={styles.cardTitle}>{subTitle}</div>
    </div>
  )
}
