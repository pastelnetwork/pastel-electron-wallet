import React, { useCallback, useState } from 'react'
// Components
import { Modal } from '../../../common/components/Modal'
import MultiSelect, {
  TOptionType,
} from '../../../common/components/MultiSelect/MultiSelect'
import { CircleAddButton, Button } from '../../../common/components/Buttons'
import Dropdown from '../../../common/components/Dropdown'
import CreateTag from '../../../common/components/CreateTag'
import { translate } from 'features/app/translations'

export type TReassignTagModal = {
  isOpen: boolean
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
  placeholder?: string
}

function ReassignTagModal({
  title,
  placeholder = translate('noTagChosen'),
  isOpen,
  handleClose,
}: TReassignTagModal): JSX.Element {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [tags, setTags] = useState<Array<TOptionType>>([])
  const [selectedTags, setSelectedTags] = useState<
    readonly TOptionType[] | null
  >(null)

  const handleCreateOpen = useCallback(
    () => setIsCreateOpen(isCreateOpen => !isCreateOpen),
    [isCreateOpen],
  )

  const handleTagAdd = useCallback(
    (tag: string) => setTags(tags => [...tags, { label: tag, value: tag }]),
    [tags],
  )

  const handleSelect = useCallback(
    (option: readonly TOptionType[]): void => setSelectedTags(option),
    [selectedTags],
  )

  const handleDropdownClose = useCallback(() => {
    setIsCreateOpen(false)
  }, [isCreateOpen])

  const renderCreateTag = () => (
    <Dropdown
      isOpen={isCreateOpen}
      handleClose={handleDropdownClose}
      button={<CircleAddButton onClick={handleCreateOpen} />}
      placement='right-start'
      noStyles
    >
      <CreateTag onSave={handleTagAdd} />
    </Dropdown>
  )

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-xl'>
      <h2 className='mb-6'>
        {translate('changeTagOf')} “{title}”
      </h2>
      <div className='flex items-center mb-6'>
        <MultiSelect
          value={selectedTags}
          options={tags}
          onChange={handleSelect}
          placeholder={placeholder}
          className='mr-4'
        />
        {renderCreateTag()}
      </div>
      <Button
        variant='default'
        disabled={!selectedTags || selectedTags?.length === 0}
        onClick={handleClose}
        className='w-full'
      >
        {translate('submit')}
      </Button>
    </Modal>
  )
}

export default ReassignTagModal
