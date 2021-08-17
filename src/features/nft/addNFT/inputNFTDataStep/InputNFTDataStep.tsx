import React from 'react'
import * as yup from 'yup'
import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
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
import {
  copiesMax,
  copiesMin,
  royaltyMax,
  royaltyMin,
  titleMinLength,
} from '../AddNft.constants'

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
].map(value => ({ value, label: value }))

const schema = yup.object().shape({
  title: yup.string().label('Title').min(titleMinLength).required(),
  hashtags: yup
    .array()
    .label('Keyword Hashtags')
    .of(yup.object({ value: yup.string().required() }))
    .required(),
  series: yup.string().label('Series Name'),
  copies: yup.number().label('Copies').min(copiesMin).max(copiesMax).required(),
  royalty: yup
    .number()
    .label('Royalty')
    .min(royaltyMin, 'No Royalty Applied')
    .max(royaltyMax)
    .required(),
  externalProfile: yup.string().label('External profile').url(),
  green: yup.boolean().label('Green').required(),
  description: yup.string().label('Description'),
})

type TInputNFTDataStepProps = {
  state: TAddNFTState
}

export default function InputNFTDataStep({
  state: { nftData, setNftData, goToNextStep },
}: TInputNFTDataStepProps): JSX.Element {
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
    setNftData({
      ...values,
      hashtags: values.hashtags.map(option => option.value),
      series: values.series,
    })
    goToNextStep()
  }

  return (
    <>
      <form
        className='paper p-10 w-[690px]'
        onSubmit={form.handleSubmit(submit)}
      >
        <div className='flex'>
          <div className='mr-7'>
            <div className='text-gray-800 text-2xl font-extrabold mb-0.5'>
              Input NFT Data
            </div>
            <div className='font-medium text-sm text-gray-33 opacity-50'>
              The Metadata Fields for your NFT
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
        <div className='mt-2.5 mb-22px space-y-6'>
          <div className='flex items-end space-x-5'>
            <Input
              form={form}
              labelClass='text-gray-71 font-medium text-base mb-1.5'
              name='title'
              label='Title'
              placeholder={`The name of your NFT. Must be at least ${titleMinLength} characters long.`}
              className='w-full text-sm'
            />
            <div className='flex-center h-10'>
              <Toggle form={form} name='green' />
              <div className='text-gray-71 font-medium mx-3'>GreenNFT</div>
              <Tooltip
                type='top'
                content={getTooltip(
                  'This NFT is a Pastel GreenNFT, which means that each time a copy is sold, 2% of the sale price will be donated to a non-profit organization that will send the proceeds to TeamTrees, which will plant a tree for every $1.00 received.',
                )}
                width={285}
              >
                <Info size={18} />
              </Tooltip>
            </div>
          </div>
          <div className='flex space-x-8'>
            <SelectMultiple
              form={form}
              label='Keyword Hashtags'
              labelClass='text-gray-71 font-medium text-base mb-1.5'
              name='hashtags'
              options={hashtags}
              className='w-1/2 text-sm'
              placeholder='#MotionGraphics, #Abstract'
            />
            <Input
              form={form}
              name='series'
              labelClass='text-gray-71 font-medium text-base mb-1.5'
              label='Series Name'
              placeholder='(if the NFT is part of a series)'
              className='w-1/2 text-sm'
            />
          </div>
          <Copies form={form} />
          <Royalty form={form} />
          <WebsiteAndVideo form={form} />
          <TextArea
            form={form}
            name='description'
            label='Description'
            labelClass='text-gray-71 text-base font-medium mb-1.5'
            textAreaClassName='input text-sm resize-none py-2 overflow-hidden h-[60px]'
            placeholder='Description of the NFT or artist’s statement.'
          />
        </div>
        <button className='btn btn-primary w-full'>Go to preview</button>
      </form>
    </>
  )
}
