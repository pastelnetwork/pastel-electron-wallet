import cx from 'classnames'
import { ipcRenderer } from 'electron'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { TChooseImageResponse } from '../../../ipcMain/listeners/chooseImage'
import { TIpcListenerResponse } from '../../../ipcMain/listeners/response'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { Button, ButtonGroup, FormControl } from '../../common'
import cstyles from '../../common/Common.module.css'
import { IArtRegFormData, setFormData, setStep } from '..'
import styles from './ArtRegForm.module.css'

export function ImageSelectionStep(): JSX.Element {
  const { filePath } = useAppSelector(state => state.artRegForm)

  const dispatch = useAppDispatch()
  const { register, setValue, handleSubmit } = useForm()
  const [imageData, setImageData] = useState('')
  const [error, setError] = useState(false)

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
          setError(true)
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
  }

  ipcRenderer.on(
    'chooseImageDone',
    (event, resp: TIpcListenerResponse<TChooseImageResponse>) => {
      if (resp.status === 'Failure') {
        setError(true)
        // TODO log errors to a central logger so we can address them later.
        console.warn(`artReg ImageSelectionStep error: ${resp.error}`)
      }

      if (!resp.payload) {
        return
      }

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
    },
  )

  return (
    <form
      data-testid='imageSelectionStepForm'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={cx(styles.imageSelectionWrapper, cstyles.marginbottomlarge)}
      >
        <div className={styles.imageWrapper}>
          {imageData !== '' ? (
            <img
              data-testid='imageSelected'
              className={styles.imageSelected}
              src={imageData}
            />
          ) : (
            <div
              data-testid='imagePlaceholder'
              className={styles.imagePlaceholder}
            />
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
          {error && (
            <p data-testid='error' className={cstyles.red}>
              An error occured. Please try selecting an image again.
            </p>
          )}
        </div>
      </div>
      <ButtonGroup>
        <Button data-testid='submit' text='Go to optimization' type='submit' />
        <Button data-testid='back' text='Go back' onClick={onGoBack} />
      </ButtonGroup>
    </form>
  )
}
