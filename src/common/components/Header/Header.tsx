import React from 'react'
import { NavLink, Link, useLocation, useHistory } from 'react-router-dom'
import routes from '../../../common/constants/routes.json'
import Logo from '../../../common/assets/icons/ico-logo.svg'
import addBtn from '../../../common/assets/icons/ico-add-btn.svg'
import searchIcon from '../../../common/assets/icons/ico-search.svg'
import QuestionTag from '../../../common/assets/icons/ico-question.svg'
import BellIcon from '../../../common/assets/icons/ico-bell.svg'
import MessageIcon from '../../../common/assets/icons/ico-msg.svg'
import SettingIcon from '../../../common/assets/icons/ico-setting.svg'
import UserIcon from '../../../common/assets/icons/ico-user.svg'
import cn from 'classnames'

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
        <div className='absolute -bottom-1.5px w-full h-3px bg-gray-33 rounded-full'></div>
      )}
    </NavLink>
  )
}

const SearchBar = () => {
  return (
    <div className='flex-center md:flex-grow md:max-w-sm xl:max-w-lg ml-6 1200px:ml-10 xl:ml-68px'>
      <div className='relative'>
        <img
          src={searchIcon}
          className='w-4 absolute top-3 left-5 hidden md:block'
        />
        <input
          className='placeholder-gray-b0 h-41px bg-gray-f2 bg-opacity-50 rounded-full px-3 w-180px md:pl-46px md:pr-5 md:w-300px lg:w-300px xl:w-352px'
          placeholder='Search creator or NFT'
        />
      </div>
    </div>
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

export default function Header(): JSX.Element {
  return (
    <div className='page-container flex items-center h-66px bg-white justify-between md:text-h6 lg:text-15 xl:text-h5 font-display border-b border-gray-ed text-gray-71'>
      <div className='flex items-center h-full'>
        <Link to={routes.DASHBOARD} className='w-9 h-9'>
          <img src={Logo} alt='logo' />
        </Link>
        <MenuItem
          classes='ml-4 1200px:ml-8 xl:ml-10 lg:w-82px'
          exact
          to={routes.DASHBOARD}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          classes='ml-4 1200px:ml-7 xl:ml-35px xl:w-37px'
          to={routes.MARKET}
        >
          Market
        </MenuItem>
        <MenuItem
          classes='ml-4 1200px:ml-7 xl:ml-37px xl:w-69px'
          to={routes.MEMBERS}
        >
          Members
        </MenuItem>
        <MenuItem
          classes='ml-4 1200px:ml-7 xl:ml-7 xl:w-46px'
          to={routes.WALLET}
        >
          Wallet
        </MenuItem>
        <MenuItem
          classes='ml-4 1200px:ml-7 xl:ml-35px xl:w-63px'
          to={routes.PORTFOLIO_DETAIL}
        >
          Portfolio
        </MenuItem>
        <Link
          to='#'
          className='flex items-center ml-4 1200px:ml-8 xl:ml-50px xl:w-95px'
        >
          <img src={addBtn} className='w-5 h-5 mr-2' alt='add button' />
          <span className='text-blue-3f whitespace-nowrap font-extrabold'>
            new NFT
          </span>
        </Link>
        <SearchBar />
      </div>
      <div className='flex items-center h-full'>
        <Icon src={QuestionTag} />
        <Icon classes='ml-6 lg:ml-27px w-4' src={BellIcon} notification />
        <Icon classes='ml-6 lg:ml-26px w-18px' src={MessageIcon} notification />
        <Icon classes='ml-6 lg:ml-27px w-18px' src={SettingIcon} />
        <Icon
          classes='ml-6 lg:ml-22px'
          src={UserIcon}
          background
          path={routes.MY_PROFILE}
        />
      </div>
    </div>
  )
}
