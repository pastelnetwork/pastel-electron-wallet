import React from 'react'
import {
  useDisplayNSWF,
  useNSFWHentaiProbability,
  useNSFWPornProbability,
} from 'features/NSFW/NSFW.service'
import Toggle from 'common/components/Toggle'
import cn from 'classnames'
import Slider from 'common/components/Slider'

export default function NSFWControls(): JSX.Element {
  const [displayNSFW, toggleNSFW] = useDisplayNSWF()
  const [
    NSFWHentaiProbability,
    setNSFWHentaiProbability,
  ] = useNSFWHentaiProbability()
  const [NSFWPornProbability, setNSFWPornProbability] = useNSFWPornProbability()

  const formatValue = (value: number) => `${Math.round(value)}%`

  return (
    <div className='w-full mt-20 mb-50px'>
      <div className='flex pt-3'>
        <div className='text-gray-71 mr-4'>Hide Not Safe For Work NFTs</div>
        <div className='flex flex-grow font-medium text-gray-4a whitespace-pre flex-wrap'>
          <Toggle selected={!displayNSFW} toggleHandler={toggleNSFW} />
        </div>
      </div>
      <div
        className={cn(
          'transition-all duration-300 overflow-hidden',
          displayNSFW ? 'opacity-0 h-0' : 'opacity-100 h-[156px]',
        )}
      >
        <div className='flex items-center pt-10 pb-7'>
          <div className='text-gray-71 mr-3 w-[180px]'>
            Hentai probability {NSFWHentaiProbability}%
          </div>
          <Slider
            className='relative z-10'
            min={0}
            max={100}
            onChange={(value: number) =>
              setNSFWHentaiProbability(Math.round(value))
            }
            value={NSFWHentaiProbability}
            step={1}
            formatValue={formatValue}
            width={349}
          />
        </div>
        <div className='flex items-center pt-3 pb-7'>
          <div className='text-gray-71 mr-3 w-[180px]'>
            Porn probability {NSFWPornProbability}%
          </div>
          <Slider
            className='relative z-10'
            min={0}
            max={100}
            onChange={(value: number) =>
              setNSFWPornProbability(Math.round(value))
            }
            value={NSFWPornProbability}
            step={1}
            formatValue={formatValue}
            width={349}
          />
        </div>
      </div>
    </div>
  )
}
