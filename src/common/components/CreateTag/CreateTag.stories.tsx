import React from 'react'
import { Story, Meta } from '@storybook/react'
import CreateTag, { TCreateTag } from './CreateTag'

export const CreateTagDefault: Story<TCreateTag> = () => {
  const [tags, setTags] = React.useState<Array<string>>([])

  const handleTags = (tag: string) => {
    setTags(tags => [...tags, tag])
  }

  return (
    <div>
      <CreateTag onSave={handleTags} />
      {tags.map((tag, idx) => (
        <span key={idx}>{tag}, </span>
      ))}
    </div>
  )
}

export default {
  component: CreateTag,
  title: 'Create Tag',
} as Meta
