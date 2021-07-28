import React from 'react'
import { Link } from 'react-router-dom'
import routes from 'legacy/constants/routes.json'
import styles from './PrevButton.module.css'

type TPrevButton = {
  color: string
}

const PrevButton = ({ color }: TPrevButton): JSX.Element => {
  return (
    <Link to={routes.STATISTICS} className={styles.backButtonLink}>
      <i
        className={'fas fa-arrow-circle-left fa-2x'}
        style={{ color: `${color}` }}
      />
    </Link>
  )
}

export default PrevButton
