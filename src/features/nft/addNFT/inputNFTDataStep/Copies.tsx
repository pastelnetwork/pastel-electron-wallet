import React from 'react'
import { TForm } from './InputNFTDataStep'
import Tooltip from 'common/components/Tooltip'
import { Info } from 'common/components/Icons'
import StepSlider from './StepSlider'
import { useWatch } from 'react-hook-form'
import { copiesAmountToShowWarning } from '../AddNft.constants'

export default function Copies({ form }: { form: TForm }): JSX.Element {
  return (
    <div className='bg-gray-f8 rounded-lg pl-6 pr-[18px] flex justify-between min-h-[117px]'>
      <div className='py-6'>
        <div className='text-gray-4a font-medium text-base flex items-center mb-2'>
          Copies
          <div className='ml-[9px]'>
            <Tooltip type='top' content='info' width={50}>
              <Info className='text-gray-8e' size={18} />
            </Tooltip>
          </div>
        </div>
        <Warning form={form} />
      </div>
      <div className='mt-3'>
        <StepSlider
          form={form}
          name='copies'
          steps={[1, 5, 10, 25, 50, 100, 250, 500, 1000]}
          defaultValue={1}
          roundValue={Math.round}
          formatTooltipValue={Math.round}
        />
      </div>
    </div>
  )
}

const Warning = ({ form }: { form: TForm }) => {
  const copies = useWatch({
    control: form.control,
    name: 'copies',
  })

  if (copies < copiesAmountToShowWarning) {
    return null
  }

  return (
    <div className='text-red-fe text-xs font-italic font-medium w-[190px] mt-2'>
      Warning: the higher the number of copies you create, the less valuable
      each copy is likely to be!
    </div>
  )
}
