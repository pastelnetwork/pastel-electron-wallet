import React, { useState } from 'react'
// Components
import { Modal } from '../../../common/components/Modal'
import MultiSelect, {
  TOptionType,
} from '../../../common/components/MultiSelect/MultiSelect'
import { CircleAddButton, Button } from '../../../common/components/Buttons'
import Dropdown from '../../../common/components/Dropdown'
import CreateTag from '../../../common/components/CreateTag'

export type TReassignTagModal = {
  isOpen: boolean
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
  placeholder?: string
}

const ReassignTagModal = ({
  title,
  placeholder = 'No tag chosen',
  isOpen,
  handleClose,
}: TReassignTagModal): JSX.Element => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [tags, setTags] = useState<Array<TOptionType>>([])
  const [selectedTags, setSelectedTags] = useState<
    readonly TOptionType[] | null
  >(null)

  const handleCreateOpen = () => setIsCreateOpen(isCreateOpen => !isCreateOpen)

  const handleTagAdd = (tag: string) =>
    setTags(tags => [...tags, { label: tag, value: tag }])

  const handleSelect = (option: readonly TOptionType[]): void =>
    setSelectedTags(option)

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-xl'>
      <h2 className='mb-6'>Change tag of “{title}”</h2>
      <div className='flex items-center mb-6'>
        <MultiSelect
          value={selectedTags}
          options={tags}
          onChange={handleSelect}
          placeholder={placeholder}
          className='mr-4'
        />
        <Dropdown
          isOpen={isCreateOpen}
          handleClose={() => setIsCreateOpen(false)}
          button={<CircleAddButton onClick={handleCreateOpen} />}
          placement='right-start'
          noStyles
        >
          <CreateTag onSave={handleTagAdd} />
        </Dropdown>
      </div>
      <Button
        variant='default'
        disabled={!selectedTags || selectedTags?.length === 0}
        onClick={handleClose}
        className='w-full'
      >
        Submit
      </Button>
    </Modal>
  )
}

export default ReassignTagModal
