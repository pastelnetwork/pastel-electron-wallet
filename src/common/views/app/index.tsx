import React from 'react'
import Button from '../../components/button'
import BidsAuctionModal from '../../../features/nft/bids-action-modal'
import BidsBuyModal from '../../../features/nft/bids-buy-modal'
import BidsOfferModal from '../../../features/nft/bids-offer-modal'
import ChangeStatusModal from '../../../features/nft/change-status-modal'
import DealApprovedModal from '../../../features/nft/deal-approved-modal'
import InReviewModal from '../../../features/nft/in-review-modal'

const App: React.FC = () => {
  const [showChangeStatus, setChangeStatus] = React.useState(false)
  const [showDealApproved, setDealApproved] = React.useState(false)
  const [showInReview, setInReview] = React.useState(false)
  const [showBidsAuction, setBidsAuction] = React.useState(false)
  const [showBidsOffer, setBidsOffer] = React.useState(false)
  const [showBidsBuy, setBidsBuy] = React.useState(false)

  return (
    <div>
      <div className='flex flex-wrap justify-center space-x-4'>
        <Button variant='primary' onClick={() => setChangeStatus(true)}>
          Change status
        </Button>
        <Button variant='primary' onClick={() => setDealApproved(true)}>
          Deal approved
        </Button>
        <Button variant='primary' onClick={() => setInReview(true)}>
          In Review
        </Button>
        <Button variant='primary' onClick={() => setBidsAuction(true)}>
          Bids Auction
        </Button>
        <Button variant='primary' onClick={() => setBidsOffer(true)}>
          Bids Offer
        </Button>
        <Button variant='primary' onClick={() => setBidsBuy(true)}>
          Bids Buy
        </Button>
      </div>
      <ChangeStatusModal
        isOpen={showChangeStatus}
        handleClose={() => setChangeStatus(false)}
      />
      <DealApprovedModal
        isOpen={showDealApproved}
        handleClose={() => setDealApproved(false)}
      />
      <InReviewModal
        isOpen={showInReview}
        handleClose={() => setInReview(false)}
      />
      <BidsAuctionModal
        isOpen={showBidsAuction}
        handleClose={() => setBidsAuction(false)}
      />
      <BidsOfferModal
        isOpen={showBidsOffer}
        handleClose={() => setBidsOffer(false)}
      />
      <BidsBuyModal
        isOpen={showBidsBuy}
        handleClose={() => setBidsBuy(false)}
      />
    </div>
  )
}

export default App
