/* eslint-disable */
import React, { Component } from 'react'
import styles from './Profile.module.css'
import classnames from 'classnames'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css'
import '../assets/css/rc-rate.custom.css'

export default class Profile extends Component<any, any> {
  render() {
    // const {  } = this.props
    return (
      <div className={classnames('px-8 py-10 w-full flex', styles.profile)}>
        <div
          className={classnames(
            'm-auto w-full bg-white px-14 py-8 flex',
            styles.wrapper,
          )}
        >
          <div className='flex flex-col justify-between'>
            <Card />
            <div className='text-gray-400 text-sm'>
              Member Since May 15, 2021
            </div>
          </div>
          <div className='flex flex-col flex-grow pl-4'>
            <Tabs />
            <div className='flex pt-4 pl-2 justify-between'>
              <General />
              <Relations />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Card extends Component<any, any> {
  render() {
    return (
      <div
        className={classnames(
          'flex flex-col pb-4 rounded-md shadow-medium',
          styles.card,
        )}
      >
        <div className='bg-blue-300 h-32 rounded-t-md'></div>
        <div className='-mt-10 px-4 flex'>
          <div className='rounded-full border-4 border-white bg-pink-200 w-24 h-24'></div>
          <div className='mt-11 pl-3 text-sm'>
            <div className='px-1 text-gray-300'>@zndrson</div>
            <div className='pt-2 text-blue-400'>0xc41923...2145</div>
          </div>
        </div>
        <div className='flex flex-col px-5'>
          <div className='text-xs text-gray-600 pt-2'>
            <div className='flex items-center'>
              <Rate value={4.7} allowHalf={true} allowClear={false} />
              <div className='pl-1 text-gray-400'>4.89 reputation</div>
            </div>
          </div>
          <div className='font-bold text-2xl py-2'>Katy Jaison</div>
          <div className='text-xs text-gray-600 py-1'>
            Cosmic Perspective: Galactic Arch
          </div>
          <div className='text-xs'>New York, US</div>
          <div></div>
          <div className='cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-4 bg-blue-500 text-white h-10'>
            Follow
          </div>
          <div className='cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-2 text-blue-500 h-10 border-blue-500'>
            Message
          </div>
        </div>
      </div>
    )
  }
}

class Tabs extends Component<any, any> {
  render() {
    return (
      <div className='w-72 flex border rounded-full ml-4 text-md'>
        <div className={classnames(styles.tab_round, styles.active)}>
          General
        </div>
        <div className={classnames(styles.tab_round)}>Portfolio</div>
        <div className={classnames(styles.tab_round)}>Board</div>
      </div>
    )
  }
}

class General extends Component<any, any> {
  render() {
    // const {  } = this.props
    return (
      <div
        className={classnames(
          styles.General,
          'flex-grow divide-y divide-grey-400 mr-8',
        )}
      >
        {/* First Row Group of General */}
        <div className='py-8 pt-4'>
          <div className={classnames(styles.row)}>
            <div className={classnames(styles.row_title)}>Location</div>
            <div className={classnames(styles.row_content)}>New York, US</div>
            <div className='w-40'>#121</div>
          </div>
          <div className={classnames(styles.row)}>
            <div className={classnames(styles.row_title)}>Language</div>
            <div className={classnames(styles.row_content)}>English</div>
          </div>
          <div className={classnames(styles.row)}>
            <div className={classnames(styles.row_title)}>Categories</div>
            <div className={classnames(styles.row_content)}>
              motion graphics, illustration, <br />
              abstract
            </div>
          </div>
          <div className={classnames(styles.row)}>
            <div className={classnames(styles.row_title)}>Buyer reputation</div>
            <div className={classnames(styles.row_content, 'flex')}>
              <Rate value={4.7} allowHalf={true} allowClear={false} />
              <div className='pl-2 text-gray-500'>4.89 reputation</div>
            </div>
          </div>
          <div className={classnames(styles.row)}>
            <div className={classnames(styles.row_title)}>Buyer bans</div>
            <div className={classnames('text-blue-400')}>3</div>
          </div>
        </div>
        {/* Second Row Group of General */}
        <div className={classnames('py-8')}>
          <div className={styles.row}>
            <div className={styles.row_title}>Highest fee recieved</div>
            <div className={styles.row_content}>136,200,000k PSL,</div>
          </div>
          <div className={styles.row}>
            <div className={styles.row_title}>Total sales amount</div>
            <div className={styles.row_content}>560,600,00k PSL,</div>
          </div>
          <div className={styles.row}>
            <div className={styles.row_title}>Total items sold</div>
            <div className={styles.row_content}>14,</div>
          </div>
          <div className={styles.row}>
            <div className={styles.row_title}>Top category persentage</div>
            <div className={styles.row_content}>motion graphics 30%</div>
          </div>
        </div>
        {/* Third Row Group of General */}
        <div className={classnames('py-8')}>
          <div className={styles.row}>
            <div className={styles.row_title}>Bio</div>
          </div>
          <div className={styles.row}>
            <div className={styles.row_content} style={{ fontSize: 14 }}>
              I'am baby readymade mikshk tatooed actually activated charcoal
              godard listicle. Mumblecore cronut kickstarter, bushwick wolf
              copper mug woke chia put a bird on it viral gentrify keytar synth.
              Twee chartreuse etsy, +1 dreamcatcher lumbersexual before they
              sold out drinking vinegar pinterest mumblecore tousled occupy
              brunch whatever ugh.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Relations extends Component<any, any> {
  render() {
    const {} = this.props
    return (
      <div className='flex flex-col'>
        <div className='flex'>
          <div className={classnames(styles.tab, styles.active)}>
            Followers (235)
          </div>
          <div className={classnames(styles.tab)}>Following (162)</div>
          <div className={classnames(styles.tab)}>Mutual (73)</div>
        </div>
        <Followers followers={followers} />
      </div>
    )
  }
}

class Followers extends Component<any, any> {
  render() {
    const { followers } = this.props
    return (
      <div className='flex flex-col pt-2'>
        {followers.map((follower: any) => (
          <Follower follower={follower} />
        ))}
      </div>
    )
  }
}

class Follower extends Component<any, any> {
  render() {
    const { follower } = this.props
    return (
      <div className='flex items-center py-2 text-md'>
        <div
          className={classnames(
            'rounded-full bg-pink-300 w-10 h-10',
            styles.follower_avatar,
          )}
        ></div>
        <div
          className={classnames(
            'flex-grow font-bold pl-4',
            styles.follower_name,
          )}
        >
          {' '}
          {follower.name}{' '}
        </div>
        <div className={classnames('text-gray-400 text-sm')}>161 followers</div>
      </div>
    )
  }
}

const followers = [
  {
    name: 'Salley Fadel',
    count: 161,
  },
  {
    name: 'Aniya Harber',
    count: 161,
  },
  {
    name: 'Reymundo',
    count: 161,
  },
  {
    name: 'Edwardo Bea',
    count: 161,
  },
  {
    name: 'Aiya Gerald',
    count: 161,
  },
  {
    name: 'Reymundo',
    count: 161,
  },
  {
    name: 'Aniya Harber',
    count: 161,
  },
  {
    name: 'Aniya Harber',
    count: 161,
  },
  {
    name: 'Reymundo',
    count: 161,
  },
  {
    name: 'Edwardo Bea',
    count: 161,
  },
  {
    name: 'Reymundo',
    count: 161,
  },
  {
    name: 'Sally Fadel',
    count: 161,
  },
]
