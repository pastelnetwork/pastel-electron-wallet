import React from 'react'
import Toggle from 'common/components/Form/Toggle'
import { Info } from 'common/components/Icons'
import TextArea from 'common/components/Form/TextArea'
import { descriptionMaxLength, TForm } from './InputNFTDataStep'

export default function DescriptionAndGreen({
  form,
}: {
  form: TForm
}): JSX.Element {
  return (
    <div>
      <div className='font-medium text-gray-71 mb-2 flex-between'>
        Description
        <div className='flex'>
          <Toggle form={form} name='green' />
          <div className='text-gray-71 font-medium mx-3'>Green</div>
          <Info size={18} />
        </div>
      </div>
      <TextArea
        form={form}
        name='description'
        maxLength={descriptionMaxLength}
      />
    </div>
  )
}
