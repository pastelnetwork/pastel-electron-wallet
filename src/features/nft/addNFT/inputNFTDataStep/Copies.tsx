import React from 'react'
import { TForm } from './InputNFTDataStep'
import Tooltip from 'common/components/Tooltip'
import { Info } from 'common/components/Icons'
import StepSlider from './StepSlider'
import { useWatch } from 'react-hook-form'
import { copiesAmountToShowWarning } from '../AddNft.constants'
import { translate } from 'features/app/translations'

function Warning({ form }: { form: TForm }) {
  const copies = useWatch({
    control: form.control,
    name: 'copies',
  })

  if (copies < copiesAmountToShowWarning) {
    return null
  }

  return (
    <div className='text-red-fe text-xs font-italic font-medium w-[190px] mt-2'>
      {translate('copiesWarning')}
    </div>
  )
}

export default function Copies({ form }: { form: TForm }): JSX.Element {
  const renderCopiesTooltip = () => (
    <Tooltip type='top' content={translate('copiesTooltip')} width={50}>
      <Info className='text-gray-8e cursor-pointer' size={18} />
    </Tooltip>
  )

  const renderCopies = () => (
    <div className='text-gray-4a font-medium text-base flex items-center mb-2'>
      {translate('copies')}
      <div className='ml-[9px]'>{renderCopiesTooltip()}</div>
    </div>
  )

  return (
    <div className='bg-gray-f8 rounded-lg pl-6 pr-[18px] flex justify-between min-h-[117px]'>
      <div className='py-6'>
        {renderCopies()}
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
