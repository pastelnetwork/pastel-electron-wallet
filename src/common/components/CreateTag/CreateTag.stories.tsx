import React, { useCallback } from 'react'
import { Story, Meta } from '@storybook/react'
import CreateTag, { TCreateTag } from './CreateTag'

export const CreateTagDefault: Story<TCreateTag> = () => {
  const [tags, setTags] = React.useState<Array<string>>([])

  const handleTags = useCallback(
    (tag: string) => {
      setTags(tags => [...tags, tag])
    },
    [tags],
  )

  return (
    <div>
      <CreateTag onSave={handleTags} />
      {tags.map(tag => (
        <span key={tag}>{tag}, </span>
      ))}
    </div>
  )
}

export default {
  component: CreateTag,
  title: 'Create Tag',
} as Meta
