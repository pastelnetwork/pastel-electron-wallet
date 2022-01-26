import React from 'react'
import * as yup from 'yup'
import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'

import Input from 'common/components/Form/Input'
import { TAddNFTState, TNFTData } from '../AddNFT.state'
import { TOption } from 'common/components/Select/Select'
import Toggle from 'common/components/Form/Toggle'
import { Info } from 'common/components/Icons'
import Tooltip from 'common/components/Tooltip'
import SelectMultiple from 'common/components/SelectMultiple/SelectMultiple'
import Copies from './Copies'
import Royalty from './Royalty'
import WebsiteAndVideo from './WebsiteAndVideo'
import TextArea from 'common/components/Form/TextArea'
import CircleSteper from 'common/components/CircleSteper'
import TimesIcon from 'common/assets/icons/ico-times.svg'
import { validURL } from 'common/utils/validation'
import {
  copiesMax,
  copiesMin,
  royaltyMax,
  royaltyMin,
  titleMinLength,
} from '../AddNft.constants'
import { translate } from 'features/app/translations'

type TFormData = Omit<TNFTData, 'hashtags'> & {
  hashtags: TOption[]
  showSiteInput: boolean
  showVideoInput: boolean
}

export type TForm = UseFormReturn<TFormData>

export const hashtags = [
  '#motiongraphics',
  '#modern',
  '#spaceart',
  '#paintworks',
  '#paintworks_art',
].map(value => ({ value, label: value }))

type TInputNFTDataStepProps = {
  state: TAddNFTState
}

export default function InputNFTDataStep({
  state: { nftData, setNftData, goToNextStep },
}: TInputNFTDataStepProps): JSX.Element {
  const schema = yup.object().shape({
    title: yup
      .string()
      .label(translate('title'))
      .min(titleMinLength)
      .required(),
    hashtags: yup
      .array()
      .label(translate('keywordHashtags'))
      .of(yup.object({ value: yup.string().required() }))
      .required(),
    series: yup.string().label(translate('seriesName')),
    copies: yup
      .number()
      .label(translate('copies'))
      .min(copiesMin)
      .max(copiesMax)
      .required(),
    royalty: yup
      .number()
      .label(translate('royalty'))
      .min(royaltyMin, translate('noRoyaltyApplied'))
      .max(royaltyMax)
      .required(),
    externalProfile: yup.string().label(translate('externalProfile')).url(),
    green: yup.boolean().label(translate('green')).required(),
    description: yup.string().label(translate('description')),
  })

  const getTooltip = (description: string) => (
    <div className='px-2 py-6px'>
      <p className='text-xs text-left leading-4 text-gray-a6 whitespace-normal'>
        {description}
      </p>
    </div>
  )
  const form = useForm<TFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...nftData,
      hashtags: nftData?.hashtags.map(value => ({ value, label: value })) || [],
      series: nftData?.series,
      copies: nftData?.copies || 1,
      royalty: nftData?.royalty || 0,
      green: nftData?.green || false,
      showSiteInput: Boolean(nftData?.website?.length),
      showVideoInput: Boolean(nftData?.video?.length),
    },
  })

  const submit = () => {
    const values = form.getValues()
    let isValid = true
    if (values.website && !validURL(values.website)) {
      form.setError('website', {
        type: 'required',
        message: translate('notAValidURLFormat'),
      })
      isValid = false
    }
    if (values.video && !validURL(values.video)) {
      form.setError('video', {
        type: 'required',
        message: translate('notAValidURLFormat'),
      })
      isValid = false
    }
    if (!isValid) {
      return
    }
    setNftData({
      ...values,
      hashtags: values.hashtags.map(option => option.value),
      series: values.series,
    })
    goToNextStep()
  }

  const renderGreenNFT = () => (
    <div className='flex-center h-10 mt-30px'>
      <Toggle form={form} name='green' />
      <div className='text-gray-71 font-medium mx-3'>
        {translate('greenNFT')}
      </div>
      <Tooltip
        type='top'
        content={getTooltip(translate('greenNFTToolTipContent'))}
        width={285}
      >
        <Info size={18} className='cursor-pointer' />
      </Tooltip>
    </div>
  )

  const renderTitleField = () => (
    <div className='relative w-full'>
      <Input
        form={form}
        labelClass='text-gray-71 font-medium text-base mb-1.5'
        name='title'
        label={translate('title')}
        placeholder={translate('placeholderTitleField', { titleMinLength })}
        className='w-full text-sm'
        inputClassName={cn(
          'input pr-[40px]',
          form.formState.errors.title?.message && 'border border-red-fe',
        )}
      />
      {form.formState.errors.title?.message ? (
        <img
          src={TimesIcon}
          className='w-3 absolute top-[45px] right-3'
          alt='Times Icon'
        />
      ) : null}
    </div>
  )

  const renderNFTForm = () => (
    <div className='mt-2.5 mb-22px space-y-6'>
      <div className='flex items-start space-x-5'>
        {renderTitleField()}
        {renderGreenNFT()}
      </div>
      <div className='flex space-x-8'>
        <SelectMultiple
          form={form}
          label={translate('keywordHashtags')}
          labelClass='text-gray-71 font-medium text-base mb-1.5'
          name='hashtags'
          options={hashtags}
          className='w-1/2 text-sm'
          placeholder={translate('placeholderKeywordHashtagsField')}
          canCustomInput
        />
        <Input
          form={form}
          name='series'
          labelClass='text-gray-71 font-medium text-base mb-1.5'
          label={translate('seriesName')}
          placeholder={translate('placeholderSeriesNameField')}
          className='w-1/2 text-sm'
        />
      </div>
      <Copies form={form} />
      <Royalty form={form} />
      <WebsiteAndVideo form={form} />
      <TextArea
        form={form}
        name='description'
        label={translate('description')}
        labelClass='text-gray-71 text-base font-medium mb-1.5'
        textAreaClassName='input text-sm resize-none py-2 overflow-hidden h-[60px]'
        placeholder={translate('placeholderDescriptionField')}
      />
    </div>
  )

  const renderHeader = () => (
    <div className='flex'>
      <div className='mr-7'>
        <div className='text-gray-800 text-2xl font-extrabold mb-0.5'>
          {translate('inputNFTData')}
        </div>
        <div className='font-medium text-sm text-gray-33 opacity-50'>
          {translate('theMetadataFieldsForYourNFT')}
        </div>
      </div>
      <CircleSteper
        size={65}
        totalStep={4}
        spaceAngle={10}
        currentStep={1}
        stopColor1='#6FCF97'
        stopColor2='#6FCF97'
      />
    </div>
  )

  return (
    <form className='paper p-10 w-[690px]' onSubmit={form.handleSubmit(submit)}>
      {renderHeader()}
      {renderNFTForm()}
      <button className='btn btn-primary w-full' type='submit'>
        {translate('goToPreviewButton')}
      </button>
    </form>
  )
}
