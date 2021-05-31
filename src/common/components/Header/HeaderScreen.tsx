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
import cn from 'classnames'

import Icon from '../Icon'

interface IMenuType {
  name: string
  routeName: string
  currentRoute: string
  style: string | undefined
}

const MenubarItem = ({ name, routeName, currentRoute, style }: IMenuType) => {
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
      // className={[
      //   styles.headermenuitem,
      //   activeColorClass,
      //   'mr-8px md:mr-13px lg:mr-28px',
      //   style,
      // ].join(' ')}
      className={cn(
        styles.headermenuitem,
        activeColorClass,
        'mr-8px md:mr-13px lg:mr-28px font-medium h-22px',
        style,
      )}
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
    <div className='psl-flex psl-relative'>
      <img width='16' className={styles.searchIconPosition} src={searchIcon} />
      <input
        className=' placeholder-gray-b0 h-41px bg-gray-110 rounded-full pl-46px md:w-300px lg:w-300px xl:w-352px'
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
  ]

  const menubar_items = [
    {
      name: 'Dashboard',
      routeName: routes.DASHBOARD,
      currentRoute: location.pathname,
      style: 'xl:psl-mr-35px',
    },
    {
      name: 'NFTs',
      routeName: routes.SEND,
      currentRoute: location.pathname,
      style: 'xl:psl-mr-37px',
    },
    {
      name: 'Members',
      routeName: routes.RECEIVE,
      currentRoute: location.pathname,
      style: 'xl:psl-mr-28px',
    },
    {
      name: 'Wallet',
      routeName: routes.TRANSACTIONS,
      currentRoute: location.pathname,
      style: 'xl:psl-mr-35px',
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
    <div className='flex items-center h-66px bg-white justify-between md:text-h6 lg:text-15 xl:text-h5 font-display'>
      <div className='flex items-center'>
        <div className='ml-20px md:ml-30px lg:ml-50px xl:ml-60px mr-13px md:mr-20px lg:mr-30px xl:mr-40px w-30px md:w-36px h-30px md:h-36px'>
          <img src={Logo} alt='logo' />
        </div>
        <div className='flex'>
          {menubar_items.map((item, index) => (
            <MenubarItem
              key={index}
              name={item.name}
              routeName={item.routeName}
              currentRoute={item.currentRoute}
              style={item.style}
            />
          ))}
          <div className='md:psl-ml-13px lg:psl-ml-40px xl:psl-ml-50px'>
            <Link to='#' className='psl-flex psl-items-center'>
              <img
                src={addBtn}
                className='psl-w-20px psl-h-20px psl-mr-2px md:psl-mr-8px'
                alt='add button'
              ></img>
              <span className='psl-text-blue-450 psl-whitespace-nowrap'>
                new NFT
              </span>
            </Link>
          </div>
        </div>
        <div className='psl-ml-20px md:psl-ml-40px lg:psl-ml-50px xl:psl-ml-68px md:psl-mr-8px lg:psl-mr-8px xl:psl-mr-8px'>
          <SearhBar />
        </div>
      </div>
      <div className='flex items-center mr-33px'>
        {icons.map((icon, index) => (
          <div className='psl-mr-20px md:psl-mr-26px' key={index}>
            <Icon src={icon.src} variant={icon.variant} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default withRouter(Header)
