import React from 'react'
import { TForm } from './InputNFTDataStep'
import Tooltip from 'common/components/Tooltip'
import { CrownInHexagon, Info } from 'common/components/Icons'
import StepSlider from './StepSlider'
import ErrorMessage from 'common/components/Form/ErrorMessage'

export default function Royalty({ form }: { form: TForm }): JSX.Element {
  const roundValue = (value: number) => Math.round(value * 10) / 10

  return (
    <div className='bg-gray-f8 rounded-lg h-28 pl-6 pr-[18px] flex justify-between min-h-[117px]'>
      <div className='pt-6'>
        <div className='text-gray-4a font-medium text-base mb-2'>
          <CrownInHexagon size={16} className='mr-1.5 text-yellow-c3' />
          <div className='flex items-center mt-1.5'>
            <span>Perpetual Royalty</span>
            <div className='ml-2'>
              <Tooltip type='top' content='info' width={50}>
                <Info className='text-gray-8e' size={18} />
              </Tooltip>
            </div>
          </div>
        </div>
        <ErrorMessage
          form={form}
          name='royalty'
          className='text-red-fe text-xs font-italic mt-2.5'
        />
      </div>
      <div className='mt-3'>
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
    </div>
  )
}
