import React, { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closePasteldModal } from './index'
import { translate } from 'features/app/translations'

export default function PasteldModal(): JSX.Element | null {
  const dispatch = useAppDispatch()
  const { pasteldModalIsOpen } = useAppSelector(state => state.utilities)
  const { info } = useAppSelector(state => state.appInfo)

  const onCloseModal = useCallback(() => {
    dispatch(closePasteldModal())
  }, [])

  if (!pasteldModalIsOpen) {
    return null
  }

  let height: string = info.latestBlock?.toString() || '0'
  if (info.verificationProgress < 0.99) {
    const progress: string = (info.verificationProgress * 100).toFixed(1)
    height = `${height} (${progress}%)`
  }

  const solps: string = info.solps?.toString() || ''

  return (
    <TitleModal
      isOpen={pasteldModalIsOpen}
      handleClose={onCloseModal}
      classNames='max-w-[700px]'
      title={translate('pasteldInfo')}
    >
      {!info || !info.version ? (
        <div className='pr-8 text-center'>
          <div>
            <i className='fas fa-times-circle text-8xl text-red-600' />
          </div>
          <div className='mt-9 text-2xl'>{translate('notConnected')}</div>
        </div>
      ) : (
        <div className='pr-8'>
          <div className='mt-2 flex justify-between'>
            <div>{translate('version')}:</div>
            <div>{info.version}</div>
          </div>
          <div className='flex justify-between'>
            <div>{translate('network')}:</div>
            <div>{info.testnet ? 'Testnet' : 'Mainnet'}</div>
          </div>
          <div className='flex justify-between'>
            <div>{translate('blockHeight')}:</div>
            <div>{height}</div>
          </div>
          <div className='flex justify-between'>
            <div>{translate('connections')}:</div>
            <div>{info.connections}</div>
          </div>
          <div className='flex justify-between'>
            <div>{translate('networkSolutionRate')}:</div>
            <div>{`${solps} Sol/s`}</div>
          </div>
        </div>
      )}
    </TitleModal>
  )
}
