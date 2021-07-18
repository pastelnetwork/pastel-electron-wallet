import React from 'react'
import { NavLink, Link, useLocation, useHistory } from 'react-router-dom'
import SearchBar from '../SearchBar'

import routes from '../../../common/constants/routes.json'
import Logo from '../../../common/assets/icons/ico-logo.svg'
import addBtn from '../../../common/assets/icons/ico-add-btn.svg'
import QuestionTag from '../../../common/assets/icons/ico-question.svg'
import BellIcon from '../../../common/assets/icons/ico-bell.svg'
import MessageIcon from '../../../common/assets/icons/ico-msg.svg'
import SettingIcon from '../../../common/assets/icons/ico-setting.svg'
import UserIcon from '../../../common/assets/icons/ico-user.svg'
import cn from 'classnames'
import { useToggle } from 'react-use'
import AddNFT from 'features/nft/addNFT'

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
        'font-medium text-navigation h-full flex items-center relative',
        classes,
      )}
      activeClassName='font-extrabold text-gray-33'
    >
      {children}
      {location.pathname === to && (
        <div className='absolute -bottom-1.5px w-full h-3px bg-gray-33 rounded-full' />
      )}
    </NavLink>
  )
}

type TIconProps = {
  src: string
  background?: boolean
  notification?: boolean
  classes?: string
  path?: string
}

const Icon = ({ src, background, notification, classes, path }: TIconProps) => {
  const history = useHistory()

  return (
    <div
      className={cn(
        'flex-center',
        background ? 'bg-gray-f8 w-10 h-10 rounded-full' : '',
        classes,
      )}
    >
      <div className='relative'>
        <img
          className='cursor-pointer'
          src={src}
          onClick={() => (path ? history.push(path) : {})}
        />
        {notification && (
          <div className='absolute -top-px -right-px w-2 h-2 rounded-full bg-orange-63 border border-white' />
        )}
      </div>
    </div>
  )
}

export default function Header(): JSX.Element | null {
  const [openAddNFT, toggleAddNFT] = useToggle(false)

  const location = useLocation()
  if (location.pathname === routes.CHAT) {
    return null
  }

  return (
    <div className='h-66px'>
      <div className='fixed w-full z-50'>
        <AddNFT open={openAddNFT} onClose={toggleAddNFT} />
        <div className='page-container flex items-center h-66px bg-white justify-between md:text-h6 lg:text-15 xl:text-h5 border-b border-gray-ed text-gray-71'>
          <div className='flex items-center h-full'>
            <Link to={routes.DASHBOARD} className='w-9 h-9'>
              <img src={Logo} alt='logo' />
            </Link>
            <MenuItem
              classes='ml-4 1200px:ml-8 xl:ml-9 lg:w-20'
              exact
              to={routes.DASHBOARD}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              classes='ml-4 1200px:ml-7 xl:ml-9 xl:w-37px'
              to={routes.NFTS}
            >
              NFTs
            </MenuItem>
            <MenuItem
              classes='ml-4 1200px:ml-7 xl:ml-37px xl:w-69px'
              to={routes.MEMBERS}
            >
              Members
            </MenuItem>
            <MenuItem
              classes='ml-4 1200px:ml-7 xl:ml-37px xl:w-69px'
              to={routes.WALLET}
            >
              Wallet
            </MenuItem>
            <MenuItem
              classes='ml-4 1200px:ml-7 xl:ml-35px xl:w-63px'
              to={routes.PORTFOLIO}
            >
              Portfolio
            </MenuItem>
            <button
              className='flex items-center ml-4 1200px:ml-8 xl:ml-50px xl:w-95px'
              onClick={toggleAddNFT}
            >
              <img src={addBtn} className='w-5 h-5 mr-2' alt='add button' />
              <span className='text-blue-3f whitespace-nowrap font-extrabold'>
                new NFT
              </span>
            </button>
            <SearchBar />
          </div>
          <div className='flex items-center h-full'>
            <Icon src={QuestionTag} />
            <Link to={routes.DASHBOARD}>
              <Icon classes='ml-6 lg:ml-27px w-4' src={BellIcon} notification />
            </Link>
            <Link to={routes.CHAT}>
              <Icon classes='ml-6 lg:ml-18px w-4' src={MessageIcon} />
            </Link>
            <Icon classes='ml-6 lg:ml-27px w-18px' src={SettingIcon} />
            <Icon
              classes='ml-6 lg:ml-22px'
              src={UserIcon}
              background
              path={routes.MY_PROFILE}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
