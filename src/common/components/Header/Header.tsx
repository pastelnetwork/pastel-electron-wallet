import React, { useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import routes from '../../../common/constants/routes.json'
import Logo from '../../../common/assets/icons/ico-logo.svg'
import addBtn from '../../../common/assets/icons/ico-addbtn.png'
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
}: {
  to: string
  exact?: boolean
  children: React.ReactNode
}) => {
  return (
    <NavLink
      to={to}
      exact={exact}
      className='font-medium text-navigation'
      activeClassName='font-extrabold text-navigation-selected'
    >
      {children}
    </NavLink>
  )
}

const SearchBar = () => {
  return (
    <div className='flex-center md:flex-grow md:max-w-sm xl:max-w-lg'>
      <div className='relative'>
        <img
          src={searchIcon}
          className='w-4 absolute top-3 left-5 hidden md:block'
        />
        <input
          className='placeholder-gray-b0 h-41px bg-gray-f2 rounded-full px-3 w-180px md:pl-46px md:pr-5 md:w-300px lg:w-300px xl:w-352px'
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
}

const Icon = ({ src, background, notification }: TIconProps) => {
  return (
    <div className={cn('w-6 h-6 flex-center', background && 'bg-gray-f8')}>
      <div className='relative'>
        <img src={src} />
        {notification && (
          <div className='absolute -top-px -right-px w-2 h-2 rounded-full bg-orange-63' />
        )}
      </div>
    </div>
  )
}

const checkUrlForHide = (url: string) => {
  return [routes.CHAT].includes(url)
}

export default function Header(): JSX.Element {
  const location = useLocation()
  let isHidden = checkUrlForHide(location.pathname)

  useEffect(() => {
    isHidden = checkUrlForHide(location.pathname)
  }, [location])

  return (
    <div
      className={cn(
        'page-container flex-shrink-0 flex items-center h-66px bg-white justify-between md:text-h6 lg:text-15 xl:text-h5 font-display border-b border-gray-ed',
        isHidden ? 'hidden' : '',
      )}
    >
      <Link to={routes.DASHBOARD} className='w-36px h-36px'>
        <img src={Logo} alt='logo' />
      </Link>
      <MenuItem exact to={routes.DASHBOARD}>
        Dashboard
      </MenuItem>
      <MenuItem to={routes.MARKET}>Market</MenuItem>
      <MenuItem to={routes.RECEIVE}>Members</MenuItem>
      <MenuItem to={routes.TRANSACTIONS}>Wallet</MenuItem>
      <MenuItem to={routes.ADDRESSBOOK}>Portfolio</MenuItem>
      <Link to='#' className='flex items-center'>
        <img src={addBtn} className='w-5 h-5 mr-2' alt='add button' />
        <span className='text-blue-3f whitespace-nowrap'>new NFT</span>
      </Link>
      <SearchBar />
      <Icon src={QuestionTag} />
      <Icon src={BellIcon} />
      <Link to={routes.CHAT}>
        <Icon src={MessageIcon} />
      </Link>
      <Icon src={SettingIcon} />
      <Icon src={UserIcon} background />
    </div>
  )
}
