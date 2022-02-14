import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useToggle } from 'react-use'

import SearchBar from '../SearchBar'
import ButtonTag from '../Link'
import * as ROUTES from 'common/utils/constants/routes'
import img_avatar_empty from 'common/assets/images/avatar-placeholder.svg'
import cn from 'classnames'
import AddNFT from 'features/nft/addNFT'
import { getUserData } from 'api/walletNode/userData'
import { getCurrentAccount } from 'common/utils/User'
import { translate } from 'features/app/translations'
import { setUserProfile } from 'features/profile/ProfileSlice'
import store from '../../../redux/store'
import { useAppSelector } from '../../../redux/hooks'

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

function MenuItem({
  to,
  exact,
  children,
  classes,
}: {
  to: string
  exact?: boolean
  children: React.ReactNode
  classes?: string
}) {
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

function Header(): JSX.Element | null {
  const [openNotificationModal, setOpenNotificationModal] = useState(false)
  const [openAddNFT, toggleAddNFT] = useToggle(false)
  const [avatar, setAvatar] = useState('')
  const { user } = useAppSelector(state => state.user)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = getCurrentAccount()
      if (currentUser) {
        const userDetail = await getUserData({ pastelId: currentUser.pastelId })
        if (userDetail) {
          store.dispatch(setUserProfile({ user: userDetail }))
        }
        if (userDetail && userDetail.avatar_image?.content) {
          setAvatar(userDetail.avatar_image.content)
        }
      }
    }

    fetchUser()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
  }, [])

  useEffect(() => {
    if (user && user.avatar_image?.content) {
      setAvatar(user.avatar_image.content)
    }
  }, [user])

  const handleOpenNotificationModal = useCallback(() => {
    setOpenNotificationModal(true)
  }, [])

  const handleCloseNotificationModal = useCallback(() => {
    setOpenNotificationModal(false)
  }, [])

  const location = useLocation()
  if (location.pathname === ROUTES.CHAT) {
    return null
  }

  const renderLinkIcons = () => (
    <div className='flex items-center h-full'>
      <CircleQuestion size={18} className='text-gray-33' />
      <ButtonTag onClick={handleOpenNotificationModal}>
        <BellIcon
          size={16}
          hasNotification
          className='text-gray-33 ml-4 md:ml-6 lg:ml-27px w-4'
        />
      </ButtonTag>
      <Link to={ROUTES.CHAT}>
        <MessageIcon
          size={18}
          hasNotification
          className='text-gray-33 ml-4 md:ml-6 lg:ml-30px w-4'
        />
      </Link>
      <Link to={ROUTES.MY_PROFILE}>
        <SettingIcon size={18} className='ml-4 md:ml-6 lg:ml-27px w-18px' />
      </Link>
      <Link to={ROUTES.MY_PROFILE}>
        {!avatar ? (
          <div className='rounded-full border-4 border-white bg-gray-e6 w-9 h-9 shadow-avatar flex flex-col items-center justify-center overflow-hidden relative ml-4 md:ml-6 lg:ml-22px'>
            <img
              src={img_avatar_empty}
              className='w-full'
              alt='Profile avatar'
            />
          </div>
        ) : (
          <img
            src={avatar}
            className='w-9 h-9 ml-4 md:ml-6 lg:ml-22px cursor-pointer'
            alt='Profile Avatar'
          />
        )}
      </Link>
    </div>
  )

  const renderLinks = () => (
    <div className='flex items-center h-full w-[80%]'>
      <Link to={ROUTES.DASHBOARD} className='w-9 h-9'>
        <QuestionLogo />
      </Link>
      <MenuItem
        classes='ml-4 1200px:ml-8 xl:ml-9 lg:w-[74px]'
        exact
        to={ROUTES.DASHBOARD}
      >
        {translate('dashboard')}
      </MenuItem>
      <MenuItem
        classes='ml-4 1200px:ml-7 xl:ml-9 xl:w-[32px]'
        to={ROUTES.MARKET}
      >
        {translate('NFTs')}
      </MenuItem>
      <MenuItem
        classes='ml-4 1200px:ml-7 xl:ml-37px xl:w-[62px]'
        to={ROUTES.MEMBERS}
      >
        {translate('members')}
      </MenuItem>
      <MenuItem
        classes='ml-4 1200px:ml-7 xl:ml-37px xl:w-[42px]'
        to={ROUTES.WALLET}
      >
        {translate('wallet')}
      </MenuItem>
      <MenuItem
        classes='ml-4 1200px:ml-7 xl:ml-35px xl:w-[58px]'
        to={ROUTES.PORTFOLIO}
      >
        {translate('portfolio')}
      </MenuItem>
      <button
        className='flex items-center ml-4 1200px:ml-8 xl:ml-50px xl:w-95px'
        onClick={toggleAddNFT}
        type='button'
      >
        <AddNFTIcon size={21} className='mr-2' />
        <span className='text-blue-3f whitespace-nowrap font-extrabold'>
          {translate('newNFT')}
        </span>
      </button>
      <SearchBar />
    </div>
  )

  return (
    <div className='h-66px z-100'>
      <div className='fixed w-full z-100'>
        <AddNFT open={openAddNFT} onClose={toggleAddNFT} />
        <div className='page-container flex items-center h-66px bg-white justify-between text-h6 md:text-h5 border-b border-gray-ed text-gray-71'>
          {renderLinks()}
          {renderLinkIcons()}
        </div>
      </div>
      <NotificationModal
        isOpen={openNotificationModal}
        notifications={notificationData}
        handleClose={handleCloseNotificationModal}
      />
    </div>
  )
}

export default Header

MenuItem.defaultProps = {
  classes: '',
  exact: false,
}
