import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './HeaderScreen.module.css'
import routes from '../../common/constants/routes.json'
import Logo from '../../common/assets/icons/ico-logo.svg'
import addBtn from '../../common/assets/icons/ico-addbtn.png'
import searchIcon from '../../common/assets/icons/ico-search.svg'
import QuestionTag from '../../common/assets/icons/ico-question.svg'
import BellIcon from '../../common/assets/icons/ico-bell.svg'
import MessageIcon from '../../common/assets/icons/ico-msg.svg'
import SettingIcon from '../../common/assets/icons/ico-setting.svg'
import UserIcon from '../../common/assets/icons/ico-user.svg'

import Icon from '../../common/components/Icon/Icon'

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

  console.log(typeof routes)
  if (currentRoute.endsWith('app.html') || currentRoute === routeName) {
    isActive = true
  }

  let activeColorClass = ''

  if (isActive) {
    activeColorClass = styles.headermainactive
  }

  return (
    <div
      className={[styles.headermenuitem, activeColorClass, 'mr-15', style].join(
        ' ',
      )}
    >
      <Link to={routeName}>
        <span className={activeColorClass}>{name}</span>
      </Link>
    </div>
  )
}

const SearhBar = () => {
  return (
    <div className='flex relative'>
      <img width='16' className={styles.searchIconPosition} src={searchIcon} />
      <input
        className='h-41 bg-gray-110 rounded-full pl-46 w-380 2xl:w-352'
        placeholder='Search creator or NFT'
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
  console.log(props)
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
  ]

  const sidebar_items = [
    {
      name: 'Dashboard',
      routeName: routes.DASHBOARD,
      currentRoute: location.pathname,
      style: '2xl:mr-35',
    },
    {
      name: 'NFTs',
      routeName: routes.SEND,
      currentRoute: location.pathname,
      style: '2xl:mr-37',
    },
    {
      name: 'Members',
      routeName: routes.RECEIVE,
      currentRoute: location.pathname,
      style: '2xl:mr-28',
    },
    {
      name: 'Wallet',
      routeName: routes.TRANSACTIONS,
      currentRoute: location.pathname,
      style: '2xl:mr-35',
    },
    {
      name: 'Portfolio',
      routeName: routes.ADDRESSBOOK,
      currentRoute: location.pathname,
    },
  ]
  return (
    <div className='flex items-center h-66 bg-white justify-between text-14 2xl:text-16 font-display'>
      <div className='flex items-center'>
        <div className='ml-20 2xl:ml-60 mr-20 2xl:mr-40'>
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
          <div className='ml-8 2xl:ml-50'>
            <Link to='#' className='flex items-center'>
              <img
                src={addBtn}
                className='w-20 h-20 mr-8'
                alt='add button'
              ></img>
              <span className='text-blue-450'>new NFT</span>
            </Link>
          </div>
        </div>
        <div className='ml-13 2xl:ml-68'>
          <SearhBar />
        </div>
      </div>
      <div className='flex items-center mr-33'>
        {icons.map(icon => (
          <div className='mr-26'>
            <Icon src={icon.src} variant={icon.variant} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default withRouter(Header)
