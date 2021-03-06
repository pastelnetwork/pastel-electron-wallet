import React, { useCallback, useState } from 'react'
import { Caret } from 'common/components/Icons'
import {
  useDisplayAdvancedFeatures,
  useNSFWHentaiProbability,
  useNSFWPornProbability,
} from 'features/NSFW/NSFW.service'
import Toggle from 'common/components/Toggle'
import cn from 'classnames'
import Slider from 'common/components/Slider'
import { translate } from 'features/app/translations'

export default function NSFWControls(): JSX.Element {
  const [displayAdvanced, toggleAdvanced] = useDisplayAdvancedFeatures()
  const [displayNSFW, toggleNSFW] = useState<boolean>(true)
  const [
    NSFWHentaiProbability,
    setNSFWHentaiProbability,
  ] = useNSFWHentaiProbability()
  const [NSFWPornProbability, setNSFWPornProbability] = useNSFWPornProbability()

  const formatValue = useCallback((value: number) => `${Math.round(value)}%`, [
    NSFWPornProbability,
    NSFWHentaiProbability,
  ])

  const onPornProbabilityChange = useCallback(
    (value: number) => {
      setNSFWPornProbability(Math.round(value))
    },
    [NSFWPornProbability],
  )

  const onHentaiProbabilityChange = useCallback(
    (value: number) => {
      setNSFWHentaiProbability(Math.round(value))
    },
    [NSFWHentaiProbability],
  )

  const renderNFTControl = () => (
    <div className='flex pt-3'>
      <div className='text-gray-71 mr-4'>
        {translate('hideNotSafeForWorkNFTs')}
      </div>
      <div className='flex flex-grow font-medium text-gray-4a whitespace-pre flex-wrap'>
        <Toggle selected={!displayNSFW} toggleHandler={toggleNSFW} />
      </div>
      <div className='text-gray-71 mr-4'>
        {translate('showAdvancedFeatures')}
      </div>
      <div
        className='flex flex-grow font-medium text-gray-4a whitespace-pre flex-wrap cursor-pointer'
        onClick={toggleAdvanced}
        role='button'
        tabIndex={0}
        aria-hidden='true'
      >
        <Caret to={displayAdvanced ? 'bottom' : 'top'} size={15} />
      </div>
    </div>
  )

  const renderHentaiProbability = () => (
    <div className='flex items-center pt-10 pb-7'>
      <div className='text-gray-71 mr-3 w-[180px]'>
        {translate('hentaiProbability')} {NSFWHentaiProbability}%
      </div>
      <Slider
        className='relative z-10'
        min={0}
        max={100}
        onChange={onHentaiProbabilityChange}
        value={NSFWHentaiProbability}
        step={1}
        formatValue={formatValue}
        width={349}
      />
    </div>
  )

  const renderPornProbability = () => (
    <div className='flex items-center pt-3 pb-7'>
      <div className='text-gray-71 mr-3 w-[180px]'>
        {translate('pornProbability')} {NSFWPornProbability}%
      </div>
      <Slider
        className='relative z-10'
        min={0}
        max={100}
        onChange={onPornProbabilityChange}
        value={NSFWPornProbability}
        step={1}
        formatValue={formatValue}
        width={349}
      />
    </div>
  )

  return (
    <div className='w-full mt-20 mb-50px'>
      {renderNFTControl()}
      <div
        className={cn(
          'transition-all duration-300 overflow-hidden',
          displayAdvanced ? 'opacity-0 h-0' : 'opacity-100 h-[156px]',
        )}
      >
        {renderHentaiProbability()}
        {renderPornProbability()}
      </div>
    </div>
  )
}
