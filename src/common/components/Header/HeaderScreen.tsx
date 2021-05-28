import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './HeaderScreen.module.css'
import routes from '../../constants/routes.json'
import Logo from '../../assets/icons/ico-logo.svg'
import addBtn from '../../assets/icons/ico-addbtn.png'
import searchIcon from '../../assets/icons/ico-search.svg'
import QuestionTag from '../../assets/icons/ico-question.svg'
import BellIcon from '../../assets/icons/ico-bell.svg'
import MessageIcon from '../../assets/icons/ico-msg.svg'
import SettingIcon from '../../assets/icons/ico-setting.svg'
import UserIcon from '../../assets/icons/ico-user.svg'

import Icon from '../Icon/Icon'

interface IMenuType {
  name: string
  routeName: string
  currentRoute: string
  style: string | undefined
}

const SidebarMenuItem = ({
  name,
  routeName,
  currentRoute,
  style,
}: IMenuType) => {
  let isActive = false

  if (currentRoute.endsWith('app.html') || currentRoute === routeName) {
    isActive = true
  }

  let activeColorClass = ''

  if (isActive) {
    activeColorClass = styles.headermainactive
  }

  return (
    <div
      className={[
        styles.headermenuitem,
        activeColorClass,
        'mr-8 md:mr-13 lg:mr-28',
        style,
      ].join(' ')}
    >
      <Link to={routeName}>
        <span className={activeColorClass}>{name}</span>
      </Link>
    </div>
  )
}

const SearhBar = () => {
  const placeholder = 'Search creator or NFT'
  return (
    <div className='flex relative'>
      <img width='16' className={styles.searchIconPosition} src={searchIcon} />
      <input
        className='h-41 bg-gray-110 rounded-full pl-46 md:w-300 lg:w-300 xl:w-352'
        placeholder={`${placeholder}`}
      />
    </div>
  )
}

interface Location {
  pathname: string
}

interface PropsType {
  location: Location
}

const Header = (props: PropsType) => {
  const { location } = props
  const icons = [
    {
      src: QuestionTag,
      variant: 'default',
    },
    {
      src: BellIcon,
      variant: 'noti',
    },
    {
      src: MessageIcon,
      variant: 'noti',
    },
    {
      src: SettingIcon,
      variant: 'default',
    },
    {
      src: UserIcon,
      variant: 'background',
    },
    {
      src: UserIcon,
      variant: 'background',
    },
  ]

  const sidebar_items = [
    {
      name: 'Dashboard',
      routeName: routes.DASHBOARD,
      currentRoute: location.pathname,
      style: 'xl:mr-35',
    },
    {
      name: 'NFTs',
      routeName: routes.SEND,
      currentRoute: location.pathname,
      style: 'xl:mr-37',
    },
    {
      name: 'Members',
      routeName: routes.RECEIVE,
      currentRoute: location.pathname,
      style: 'xl:mr-28',
    },
    {
      name: 'Wallet',
      routeName: routes.TRANSACTIONS,
      currentRoute: location.pathname,
      style: 'xl:mr-35',
    },
    {
      name: 'Portfolio',
      routeName: routes.ADDRESSBOOK,
      currentRoute: location.pathname,
    },
    {
      name: 'Profile',
      routeName: routes.PROFILE,
      currentRoute: location.pathname,
    },
  ]
  return (
    <div className='flex items-center h-66 bg-white justify-between md:text-14 lg:text-15 xl:text-16 font-display'>
      <div className='flex items-center'>
        <div className='ml-20 md:ml-30 lg:ml-50 xl:ml-60 mr-13 md:mr-20 lg:mr-30 xl:mr-40 w-30 md:w-36 h-30 md:h-36'>
          <img src={Logo} alt='logo' />
        </div>
        <div className='flex'>
          {sidebar_items.map((item, index) => (
            <SidebarMenuItem
              key={index}
              name={item.name}
              routeName={item.routeName}
              currentRoute={item.currentRoute}
              style={item.style}
            />
          ))}
          <div className='md:ml-13 lg:ml-40 xl:ml-50'>
            <Link to='#' className='flex items-center'>
              <img
                src={addBtn}
                className='w-20 h-20 mr-2 md:mr-8'
                alt='add button'
              ></img>
              <span className='text-blue-450 whitespace-nowrap'>new NFT</span>
            </Link>
          </div>
        </div>
        <div className='ml-20 md:ml-40 lg:ml-50 xl:ml-68 md:mr-8 lg:mr-8 xl:mr-8'>
          <SearhBar />
        </div>
      </div>
      <div className='flex items-center mr-33'>
        {icons.map((icon, index) => (
          <div className='mr-20 md:mr-26' key={index}>
            <Icon src={icon.src} variant={icon.variant} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default withRouter(Header)
