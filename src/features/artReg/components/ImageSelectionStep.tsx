import cx from 'classnames'
import { app, ipcRenderer } from 'electron'
import fs from 'fs'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { Button, ButtonGroup, FormControl, Input } from '../../common'
import cstyles from '../../common/Common.module.css'
import { IArtRegFormData, setFormData, setStep } from '..'
import styles from './ArtRegForm.module.css'

export function ImageSelectionStep(): JSX.Element {
  const { filePath } = useAppSelector(state => state.artRegForm)

  const dispatch = useAppDispatch()
  const { register, setValue, handleSubmit } = useForm()
  const [imageData, setImageData] = useState('')

  useEffect(() => {
    register('filePath', { required: true })

    if (filePath !== '') {
      ipcRenderer
        .invoke('readFileBase64', filePath)
        .then((resp: string) => {
          const src = `data:image/jpg;base64,${resp}`
          setImageData(src)
        })
        .catch(error => {
          // TODO log errors to a central logger so we can address them later.
          console.warn(`artReg ImageSelectionStep error: ${error.message}`)
        })
    }
  }, [])

  function onSubmit(data: IArtRegFormData) {
    dispatch(setFormData(data))
    dispatch(setStep('Optimization'))
  }

  function onGoBack() {
    dispatch(setStep('GeneralInfo'))
  }

  function onSelectImage(): void {
    ipcRenderer.send('chooseImage')

    ipcRenderer.on('chooseImageDone', (event, resp) => {
      console.log(resp)
      const base64 = resp.payload.base64
      const src = `data:image/jpg;base64,${base64}`

      setValue('filePath', resp.payload.path)
      setImageData(src)

      dispatch(
        setFormData({
          filePath: resp.payload.path,
          fileSize: resp.payload.size,
        }),
      )
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cx(styles.imageSelectionWrapper, cstyles.marginbottomlarge)}
      >
        <div className={styles.imageWrapper}>
          {imageData !== '' ? (
            <img className={styles.imageSelected} src={imageData} />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>
        <div className={styles.imageUpload}>
          <div className={cstyles.marginbottomlarge}>
            <FormControl title='Upload image file'>
              <div className={cstyles.margintopmed}>
                <Button onClick={onSelectImage} text='Select Image' />
              </div>
            </FormControl>
          </div>
          <p>
            Please take into account that image file size affects the
            registration fee.
          </p>
          <p>For example, 0.5mb costs 1,000 PSL, 5mb - 10,000 PSL</p>
        </div>
      </div>
      <ButtonGroup>
        <Button text='Go to optimization' type='submit' />
        <Button text='Go back' onClick={onGoBack} />
      </ButtonGroup>
    </form>
  )
}
