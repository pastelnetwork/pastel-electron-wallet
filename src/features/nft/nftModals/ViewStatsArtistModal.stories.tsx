import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ViewsStatsArtistModal, {
  TViewsStatsArtistModal,
} from './ViewStatsArtistModal'

const Template: Story<TViewsStatsArtistModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ViewsStatsArtistModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></ViewsStatsArtistModal>
    </>
  )
}

export const ViewsStatsArtistModalDefault = Template.bind({})
ViewsStatsArtistModalDefault.args = {}

export default {
  component: ViewsStatsArtistModal,
  title: 'BidModals/ViewsStatsArtistModal',
} as Meta
