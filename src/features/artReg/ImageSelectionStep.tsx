import cx from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Button, ButtonGroup, FormControl, Input } from '../common'
import cstyles from '../common/Common.module.css'
import { IArtRegFormData, setFormData, setStep } from '.'
import styles from './ArtRegForm.module.css'

export function ImageSelectionStep(): JSX.Element {
  const { file } = useAppSelector(state => state.artRegForm)

  const dispatch = useAppDispatch()

  const onSubmit = (data: IArtRegFormData) => {
    dispatch(setFormData(data))
    dispatch(setStep('Optimization'))
  }

  const { register, handleSubmit } = useForm()

  function onGoBack() {
    dispatch(setStep('GeneralInfo'))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={cx(styles.imageSelectionWrapper, cstyles.marginbottomlarge)}
      >
        <div className={styles.imageWrapper}>
          {file !== '' ? (
            <img src={file} />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>
        <div className={styles.imageUpload}>
          <div className={cstyles.marginbottomlarge}>
            <FormControl title='Upload image file'>
              <Input {...register('file')} defaultValue={file} type='file' />
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
