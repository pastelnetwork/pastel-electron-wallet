import React, { useEffect } from 'react'
import { setValue, useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { FormControl, Input, Textarea } from '../../common'
import { Button } from '../../common/Button'
import cstyles from '../../common/Common.module.css'
import { IArtRegFormData, setFormData, setStep } from '../artRegSlice'

export function GeneralInfoStep(): JSX.Element {
  const {
    title,
    copies,
    category,
    externalProfile,
    description,
    compensation,
  } = useAppSelector(state => state.artRegForm)

  const dispatch = useAppDispatch()

  const onSubmit = (data: IArtRegFormData) => {
    dispatch(setFormData(data))
    dispatch(setStep('ImageSelection'))
  }

  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cstyles.marginbottomlarge}>
        <FormControl title='Title'>
          <Input
            {...register('title')}
            placeholder='The Starry Night'
            defaultValue={title}
            onChange={e => null}
          />
        </FormControl>
      </div>

      <div className={cstyles.marginbottomlarge}>
        <FormControl title='Category'>
          <Input
            {...register('category')}
            placeholder='Landscape painting'
            defaultValue={category}
          />
        </FormControl>
      </div>

      <div className={cstyles.marginbottomlarge}>
        <FormControl title='Copies'>
          <Input
            {...register('copies')}
            type='number'
            min={0}
            defaultValue={copies}
          />
        </FormControl>
      </div>

      <div className={cstyles.marginbottomlarge}>
        <FormControl title='Compensation'>
          <Input
            {...register('compensation')}
            type='number'
            min={0}
            defaultValue={compensation}
          />
        </FormControl>
      </div>

      <div className={cstyles.marginbottomlarge}>
        <FormControl title='Extenral Profile'>
          <Input
            {...register('externalProfile')}
            placeholder='https://behance.com/'
            defaultValue={externalProfile}
          />
        </FormControl>
      </div>

      <div className={cstyles.marginbottomlarge}>
        <FormControl title='Description'>
          <Textarea
            {...register('description')}
            defaultValue={description}
            placeholder='Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village'
          />
        </FormControl>
      </div>

      <Button text='Next' type='submit' />
    </form>
  )
}
