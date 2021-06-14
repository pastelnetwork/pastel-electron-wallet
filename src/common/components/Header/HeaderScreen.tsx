import React from 'react'
import { withRouter } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import styles from './HeaderScreen.module.css'
import routes from '../../constants/routes.json'
import Logo from '../../assets/icons/ico-logo.svg'
import addBtn from '../../assets/icons/ico-add-btn.svg'
import searchIcon from '../../assets/icons/ico-search.svg'
import QuestionTag from '../../assets/icons/ico-question.svg'
import BellIcon from '../../assets/icons/ico-bell.svg'
import MessageIcon from '../../assets/icons/ico-msg.svg'
import SettingIcon from '../../assets/icons/ico-setting.svg'
import UserIcon from '../../assets/icons/ico-user.svg'
import cn from 'classnames'

type TMenuType = {
  name: string
  routeName: string
  currentRoute: string
  style: string | undefined
}

const MenubarItem = ({ name, routeName, currentRoute, style }: TMenuType) => {
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
    <div className='flex relative'>
      <img width='16' className={styles.searchIconPosition} src={searchIcon} />
      <input
        className=' placeholder-gray-b0 h-41px bg-gray-110 rounded-full pl-46px md:w-300px lg:w-300px xl:w-352px'
        placeholder={`${placeholder}`}
      />
    </div>
  )
}

type TLocation = {
  pathname: string
}

type TPropsType = {
  location: TLocation
}

const Header = (props: TPropsType) => {
  const { location } = props
  const history = useHistory()

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
      func: () => history.push(routes.PROFILE),
    },
  ]

  const menubar_items = [
    {
      name: 'Dashboard',
      routeName: routes.DASHBOARD,
      currentRoute: location.pathname,
      style: 'xl:mr-35px',
    },
    {
      name: 'Market',
      routeName: routes.MARKET,
      currentRoute: location.pathname,
      style: 'xl:mr-37px',
    },
    {
      name: 'Members',
      routeName: routes.MEMBERS,
      currentRoute: location.pathname,
      style: 'xl:mr-28px',
    },
    {
      name: 'Wallet',
      routeName: routes.TRANSACTIONS,
      currentRoute: location.pathname,
      style: 'xl:mr-35px',
    },
    {
      name: 'Portfolio',
      routeName: routes.ADDRESSBOOK,
      currentRoute: location.pathname,
    },
  ]
  return (
    <div className='flex items-center h-66px bg-white justify-between md:text-h6 lg:text-15 xl:text-h5 font-display border-b border-gray-e6'>
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
          <div className='md:ml-13px lg:ml-40px xl:ml-50px'>
            <Link to='#' className='flex items-center'>
              <img
                src={addBtn}
                className='w-20px h-20px mr-2px md:mr-2'
                alt='add button'
              ></img>
              <span className='text-blue-3f whitespace-nowrap'>new NFT</span>
            </Link>
          </div>
        </div>
        <div className='ml-20px md:ml-40px lg:ml-50px xl:ml-68px md:mr-8px lg:mr-8px xl:mr-8px'>
          <SearhBar />
        </div>
      </div>
      <div className='flex items-center mr-33px'>
        {icons.map((icon, index) => (
          <div className='mr-20px md:mr-26px' key={index}>
            <img
              src={icon.src}
              className='cursor-pointer'
              onClick={icon.func}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default withRouter(Header)
