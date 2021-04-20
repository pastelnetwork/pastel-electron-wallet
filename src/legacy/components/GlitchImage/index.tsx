import glitch from 'glitch-canvas'
import React, { createRef,useEffect } from 'react'

import imagePath from '../../assets/img/lincoln.jpg'
import ScrollPane from '../ScrollPane'
import styles from './styles.module.css'

const GlitchImage = () => {
  const imgContainerEl = createRef<HTMLDivElement>()
  const canvasContainerEl = createRef<HTMLDivElement>()

  useEffect(() => {
    const params = {
      amount: 35,
      iterations: 20,
      quality: 30,
      seed: 25,
    }
    loadImage(imagePath, function (img: any) {
      // eslint-disable-next-line no-else-return
      glitch(params)
        .fromImage(img)
        .toDataURL()
        .then(function (dataURL: string) {
          const imageEl = new Image()
          imageEl.src = dataURL
          if (imgContainerEl && imgContainerEl.current) {
            imgContainerEl.current.appendChild(imageEl)
          }
        })
        .catch((err: any) => console.log(err))

      glitch(params)
        .fromImage(img)
        .toImageData()
        .then(function (imageData: any) {
          const canvasEl = document.createElement('canvas')
          canvasEl.width = imageData.width
          canvasEl.height = imageData.height
          canvasEl.style.width = `${imageData.width}px`
          const ctx = canvasEl.getContext('2d')

          if (canvasContainerEl && canvasContainerEl.current) {
            canvasContainerEl.current.appendChild(canvasEl)
          }
          if (ctx) {
            ctx.putImageData(imageData, 0, 0)
          }
        })
        .catch((err: any) => console.log(err))
    })
  }, [])

  function loadImage(src: string, callback: any) {
    const imageEl = new Image()

    imageEl.onload = function () {
      callback(imageEl)
    }

    imageEl.src = src
  }

  return (
    <div className={styles.container}>
      <ScrollPane offsetHeight={0}>
        <div className={styles.imgcontainer} ref={imgContainerEl} />
      </ScrollPane>
    </div>
  )
}

export default GlitchImage
