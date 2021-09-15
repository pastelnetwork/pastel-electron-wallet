import React from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { TitleModal } from 'common/components/Modal'
import { closeImportANIPrivKeyModal } from './index'

export default function ImportANIPrivKeyModal(): JSX.Element | null {
  const { importANIPrivKeyModalIsOpen } = useAppSelector(
    state => state.utilities,
  )
  const dispatch = useAppDispatch()

  if (!importANIPrivKeyModalIsOpen) {
    return null
  }

  return (
    <TitleModal
      isOpen={importANIPrivKeyModalIsOpen}
      handleClose={() => dispatch(closeImportANIPrivKeyModal())}
      classNames='max-w-[700px]'
    >
      ImportANIPrivKeyModal
    </TitleModal>
  )
}
