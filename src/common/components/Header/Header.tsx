import React, { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useToggle } from 'react-use'

import SearchBar from '../SearchBar'
import * as ROUTES from 'common/utils/constants/routes'
import AvatarImage from 'common/assets/images/profile-avatar.png'
import cn from 'classnames'
import AddNFT from 'features/nft/addNFT'
import NotificationModal from 'features/dashboard/dashboardModals/notificationModal'
import notificationData from 'features/dashboard/dashboardModals/notificationModal.data'

import {
  QuestionLogo,
  AddNFTIcon,
  CircleQuestion,
  BellIcon,
  MessageIcon,
  SettingIcon,
} from '../Icons'

const MenuItem = ({
  to,
  exact,
  children,
  classes,
}: {
  to: string
  exact?: boolean
  children: React.ReactNode
  classes?: string
}) => {
  const location = useLocation()
  return (
    <NavLink
      to={to}
      exact={exact}
      className={cn(
        'text-navigation h-full flex items-center relative',
        classes,
      )}
    >
      {location.pathname === to ? (
        <div className='font-extrabold text-gray-33'>{children}</div>
      ) : (
        <div className='font-medium text-gray-71'>{children}</div>
      )}
    </NavLink>
  )
}

const Header = (): JSX.Element | null => {
  const [openNotificationModal, setOpenNotificationModal] = useState(false)
  const [openAddNFT, toggleAddNFT] = useToggle(false)

  const location = useLocation()
  if (location.pathname === ROUTES.CHAT) {
    return null
  }

  return (
    <div className='h-66px'>
      <div className='fixed w-full z-50'>
        <AddNFT open={openAddNFT} onClose={toggleAddNFT} />
        <div className='page-container flex items-center h-66px bg-white justify-between md:text-h6 lg:text-h5 border-b border-gray-ed text-gray-71'>
          <div className='flex items-center h-full'>
            <Link to={ROUTES.DASHBOARD} className='w-9 h-9'>
              <QuestionLogo />
            </Link>
            <MenuItem
              classes='ml-4 1200px:ml-8 xl:ml-9 lg:w-[74px]'
              exact
              to={ROUTES.DASHBOARD}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              classes='ml-4 1200px:ml-7 xl:ml-9 xl:w-[32px]'
              to={ROUTES.MARKET}
            >
              NFTs
            </MenuItem>
            <MenuItem
              classes='ml-4 1200px:ml-7 xl:ml-37px xl:w-[62px]'
              to={ROUTES.MEMBERS}
            >
              Members
            </MenuItem>
            <MenuItem
              classes='ml-4 1200px:ml-7 xl:ml-37px xl:w-[42px]'
              to={ROUTES.WALLET}
            >
              Wallet
            </MenuItem>
            <MenuItem
              classes='ml-4 1200px:ml-7 xl:ml-35px xl:w-[58px]'
              to={ROUTES.PORTFOLIO}
            >
              Portfolio
            </MenuItem>
            <button
              className='flex items-center ml-4 1200px:ml-8 xl:ml-50px xl:w-95px'
              onClick={toggleAddNFT}
            >
              <AddNFTIcon size={21} className='mr-2' />
              <span className='text-blue-3f whitespace-nowrap font-extrabold'>
                new NFT
              </span>
            </button>
            <SearchBar />
          </div>
          <div className='flex items-center h-full'>
            <CircleQuestion size={18} className='text-gray-33' />
            <Link to={ROUTES.DASHBOARD}>
              <BellIcon
                size={16}
                hasNotification={true}
                className='text-gray-33 ml-6 lg:ml-27px w-4'
              />
            </Link>
            <Link to={ROUTES.CHAT}>
              <MessageIcon
                size={18}
                hasNotification={true}
                className='text-gray-33 ml-6 lg:ml-30px w-4'
              />
            </Link>
            <Link to={ROUTES.SETTINGS}>
              <SettingIcon size={18} className='ml-6 lg:ml-27px w-18px' />
            </Link>
            <Link to={ROUTES.MY_PROFILE}>
              <img
                src={AvatarImage}
                className='w-9 h-9 ml-6 lg:ml-22px cursor-pointer'
                alt='Profile Avatar'
              />
            </Link>
          </div>
        </div>
      </div>
      <NotificationModal
        isOpen={openNotificationModal}
        notifications={notificationData}
        handleClose={() => setOpenNotificationModal(false)}
      />
    </div>
  )
}

export default Header
