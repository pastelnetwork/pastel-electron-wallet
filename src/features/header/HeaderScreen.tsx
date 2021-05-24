/* eslint-disable */

import React, { PureComponent } from 'react'
import fs from 'fs'
import dateformat from 'dateformat'
import Modal from 'react-modal'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { ipcRenderer, remote } from 'electron'
import TextareaAutosize from 'react-textarea-autosize'
import styles from './HeaderScreen.module.css'
import cstyles from '../../legacy/components/Common.module.css'
import rstyles from '../../common/utils/Styles.module.css'
import routes from '../../legacy/constants/routes.json'
import Logo from '../../legacy/assets/img/logo.png'
import addBtn from '../../legacy/assets/img/add-btn.png'
import searchIcon from '../../legacy/assets/img/search-icon.png'
import QuestionTag from '../../common/assets/icons/ico-question.svg'
import BellIcon from '../../common/assets/icons/ico-bell.svg'
import MessageIcon from '../../common/assets/icons/ico-msg.svg'
import SettingIcon from '../../common/assets/icons/ico-setting.svg'
import UserIcon from '../../common/assets/icons/ico-user.svg'

import Icon from '../../common/components/Icon/Icon'

import Utils from '../../legacy/utils/utils'
import { parsePastelURI, PastelURITarget } from '../../legacy/utils/uris'

const SidebarMenuItem = ({ name, routeName, currentRoute, style }: any) => {
  let isActive = false

  if (
    (currentRoute.endsWith('app.html') && routeName === (routes as any).HOME) ||
    currentRoute === routeName
  ) {
    isActive = true
  }

  let activeColorClass = ''

  if (isActive) {
    activeColorClass = styles.headermainactive
  }

  return (
    <div className={[styles.headermenuitem, activeColorClass, style].join(' ')}>
      <Link to={routeName}>
        <span className={activeColorClass}>{name}</span>
      </Link>
    </div>
  )
}

const SearhBar = () => {
  return (
    <div className={[cstyles.flexcenter, cstyles.positionRelative].join(' ')}>
      <img width='16' className={styles.searchIconPosition} src={searchIcon} />
      <input
        className={styles.inputstyle}
        placeholder='Search creator or NFT'
      />
    </div>
  )
}

const IconItem = ({ src, noti, background }: any) => {
  return (
    <div
      className={[
        rstyles.mr26,
        rstyles.positionRelative,
        background ? styles.roundBackgournd : '',
      ].join(' ')}
    >
      {noti ? <div className={styles.notificationBadge}></div> : null}
      <img src={src} />
    </div>
  )
}

class Sidebar extends PureComponent<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { location } = this.props
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

    return (
      <div className={styles.headercontainer}>
        <div className={styles.logoimage}>
          <img src={Logo} width='36' alt='logo' />
        </div>
        <div className={styles.menulist}>
          <SidebarMenuItem
            name='Dashboard'
            routeName={routes.DASHBOARD}
            currentRoute={location.pathname}
            style={rstyles.mr35}
          />
          <SidebarMenuItem
            name='NFTs'
            routeName={routes.SEND}
            currentRoute={location.pathname}
            style={cstyles.mr37}
          />
          <SidebarMenuItem
            name='Members'
            routeName={routes.RECEIVE}
            currentRoute={location.pathname}
            style={cstyles.mr28}
          />
          <SidebarMenuItem
            name='Wallet'
            routeName={routes.TRANSACTIONS}
            currentRoute={location.pathname}
            style={styles.mr35}
          />
          <SidebarMenuItem
            name='Portfolio'
            routeName={routes.ADDRESSBOOK}
            currentRoute={location.pathname}
          />
          <div className={styles.headermenuitem}>
            <Link to='#' className={styles.iconbtn}>
              <img src={addBtn}></img>
              <span className={rstyles.ml8}>new NFT</span>
            </Link>
          </div>
        </div>

        <div className={[cstyles.ml68, rstyles.mr26].join(' ')}>
          <SearhBar />
        </div>

        <div className={rstyles.displayFlexCenter}>
          {icons.map(icon => (
            <Icon src={icon.src} variant={icon.variant} />
            // <IconItem src={icon.src} noti={icon.noti} background={icon.background}/>
          ))}
        </div>

        <div className='absolute text-black insert-0 bg-white text-center h-full flex flex-col justify justify-center'>
          ERB + TAILWIND = HAPPY
        </div>
      </div>
    )
  }
} // $FlowFixMe

export default withRouter(Sidebar)
