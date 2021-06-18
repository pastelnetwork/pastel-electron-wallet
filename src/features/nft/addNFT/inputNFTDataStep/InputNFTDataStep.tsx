import React, { useRef, useState } from 'react'
import * as yup from 'yup'
import style from '../AddNFT.module.css'
import PercentCircle from 'common/components/PercentCircle'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'common/components/Form/Input'
import { Button } from 'common/components/Buttons'
import CategoryAndCollection from './CategoryAndCollection'
import CopiesAndCompensation from './CopiesAndCompensation'
import DescriptionAndGreen from './DescriptionAndGreen'
import AddCollectionModal from './AddCollectionModal'
import { useClickAway, useToggle } from 'react-use'
import { NFTData, TAddNFTState } from '../AddNFT.state'
import { TOption } from 'common/components/Select/Select'

export const categories = [
  'Motion graphics',
  'Illustration',
  'Games',
  'Music',
  'Film',
  'Sports',
].map(value => ({ value, label: value }))

const initialCollections = ['Collection 1', 'Collection 2'].map(value => ({
  value,
  label: value,
}))

export const compensations = ['royalty', 'other'].map(value => ({
  value,
  label: value,
}))

const titleMinLength = 10

export const copiesMin = 1
export const copiesMax = 10000

export const compensationPercentMin = 1
export const compensationPercentMax = 50

export const descriptionMaxLength = 200

const schema = yup.object().shape({
  title: yup.string().label('Title').min(titleMinLength).required(),
  categories: yup
    .array()
    .min(1, 'Please select at least 1 category')
    .label('Category')
    .of(yup.object({ value: yup.string().required() }))
    .required(),
  collection: yup.object().label('Collection').required(),
  copies: yup.number().min(copiesMin).label('Copies').max(copiesMax).required(),
  compensation: yup
    .object({ value: yup.string().required() })
    .label('Compensation')
    .required(),
  compensationPercent: yup
    .number()
    .typeError('Please specify a number')
    .label('Compensation percent')
    .min(compensationPercentMin)
    .max(compensationPercentMax)
    .required(),
  externalProfile: yup.string().label('External profile').url(),
  green: yup.boolean().label('Green').required(),
  description: yup.string().label('Description').max(descriptionMaxLength),
})

type TInputNFTDataStep = {
  state: TAddNFTState
}

export default function InputNFTDataStep({
  state: { nftData, setNftData, goToNextStep },
}: TInputNFTDataStep): JSX.Element {
  const form = useForm<
    Omit<NFTData, 'categories' | 'collection' | 'compensation'> & {
      categories: TOption[]
      collection: TOption
      compensation: TOption
    }
  >({
    resolver: yupResolver(schema),
    defaultValues: {
      ...nftData,
      categories:
        nftData?.categories.map(value => ({ value, label: value })) || [],
      collection: nftData
        ? { value: nftData.collection, label: nftData.collection }
        : undefined,
      copies: nftData?.copies || 100,
      compensation: nftData
        ? { value: nftData.compensation, label: nftData.compensation }
        : undefined,
      compensationPercent: 12,
      green: nftData?.green || false,
    },
  })

  const submit = () => {
    const values = form.getValues()
    setNftData({
      ...values,
      categories: values.categories.map(option => option.value),
      collection: values.collection.value,
      compensation: values.compensation.value || '',
    })
    goToNextStep()
  }

  const [collections, setCollections] = useState(initialCollections)
  const addCollection = (value: string) => {
    setCollections([...collections, { value, label: value }])
    toggleAddCollection()
  }

  const addCollectionModalRef = useRef<HTMLFormElement>(null)
  const [showAddCollection, toggleAddCollection] = useToggle(false)

  useClickAway(addCollectionModalRef, () => {
    if (showAddCollection) {
      toggleAddCollection()
    }
  })

  const addCollectionButtonRef = (button: HTMLButtonElement | null) => {
    const addCollectionModal = addCollectionModalRef.current

    if (!button || !addCollectionModal) {
      return
    }

    addCollectionModal.style.top = `${button.offsetTop + button.offsetHeight}px`
  }

  return (
    <>
      <AddCollectionModal
        ref={addCollectionModalRef}
        show={showAddCollection}
        onSubmit={addCollection}
      />

      <form
        className='paper p-10'
        style={{ width: '690px' }}
        onSubmit={form.handleSubmit(submit)}
      >
        <div className={`flex-between ${style.leftColumn}`}>
          <div>
            <div className='text-gray-800 text-2xl font-extrabold mb-3'>
              Input NFT Data
            </div>
            <div className='font-medium text-sm text-gray-33 opacity-50'>
              Description
            </div>
          </div>
          <PercentCircle color='text-green-6d' percent={25}>
            <div className='font-extrabold text-gray-11 text-lg mt-1'>1/4</div>
          </PercentCircle>
        </div>
        <div className='mt-26px mb-22px space-y-6'>
          <Input
            form={form}
            name='title'
            label='Title'
            placeholder={`At least ${titleMinLength} characters`}
          />
          <CategoryAndCollection
            form={form}
            addCollectionButtonRef={addCollectionButtonRef}
            onAddCollectionClick={toggleAddCollection}
            collections={collections}
          />
          <CopiesAndCompensation form={form} />
          <Input
            form={form}
            name='externalProfile'
            label='External Profile'
            placeholder='website or social profile link'
          />
          <DescriptionAndGreen form={form} />
        </div>
        <Button className='w-full font-extrabold'>Go to preview</Button>
      </form>
    </>
  )
}
