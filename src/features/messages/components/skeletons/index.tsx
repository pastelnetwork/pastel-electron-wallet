import React from 'react'
import './styles.css'

interface ISkeleton {
  type: string
}
function SkeletonElement(props: ISkeleton): JSX.Element {
  const { type } = props
  const classes = `skeleton ${type}`
  return <div className={classes} />
}
export default SkeletonElement
