import React from 'react'
import { TForm } from './InputNFTDataStep'
import Tooltip from 'common/components/Tooltip'
import { CrownInHexagon, Info } from 'common/components/Icons'
import StepSlider from './StepSlider'
import ErrorMessage from '../../../../common/components/Form/ErrorMessage'

export default function Copies({ form }: { form: TForm }): JSX.Element {
  const roundValue = (value: number) => Math.round(value * 10) / 10

  return (
    <div className='bg-gray-fc rounded-lg h-28 px-6 flex justify-between'>
      <div className='pt-6'>
        <div className='text-gray-4a font-medium flex items-center mb-2'>
          <CrownInHexagon size={16} className='mr-1.5 text-yellow-c3' />
          Perpetual Royalty
          <div className='ml-2'>
            <Tooltip type='top' content='info' width={50}>
              <Info className='text-gray-8e' size={18} />
            </Tooltip>
          </div>
        </div>
        <ErrorMessage
          form={form}
          name='royalty'
          className='text-red-fe text-xs font-italic mt-2.5'
        />
      </div>
      <StepSlider
        form={form}
        name='royalty'
        steps={[0, 1, 2, 5, 7.5, 10, 15, 20]}
        defaultValue={0}
        roundValue={roundValue}
        formatValue={value => `${value}%`}
        formatTooltipValue={value => `${roundValue(value)}%`}
      />
    </div>
  )
}
