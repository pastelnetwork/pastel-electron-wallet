import React from 'react'
import styles from './Profile.module.css'
import cx from 'classnames'
import Rate from 'rc-rate'

const ProfileGeneral = (): JSX.Element => {
  return (
    <div
      className={cx(
        styles.General,
        'flex-grow divide-y divide-grey-400 pr-4 w-full xl:w-1/2',
      )}
    >
      {/* First Row Group of General */}
      <div className='w-full py-10 pt-4'>
        <div className={cx(styles.row)}>
          <div className={cx(styles.row_title)}>Location</div>
          <div className={cx(styles.row_content, 'flex')}>
            <div>New York, US</div>
            <div className='mx-auto -mt-2'>#121</div>
          </div>
        </div>
        <div className={cx(styles.row)}>
          <div className={cx(styles.row_title)}>Language</div>
          <div className={cx(styles.row_content)}>English</div>
        </div>
        <div className={cx(styles.row)}>
          <div className={cx(styles.row_title)}>Categories</div>
          <div className={cx(styles.row_content)}>
            motion graphics, illustration, <br />
            abstract
          </div>
        </div>
        <div className={cx(styles.row)}>
          <div className={cx(styles.row_title)}>Buyer reputation</div>
          <div className={cx(styles.row_content, 'flex flex-col xl:flex-row')}>
            <Rate value={4.7} allowHalf={true} allowClear={false} />
            <div className='xl:pl-2 text-gray-500'>4.89 reputation</div>
          </div>
        </div>
        <div className={cx(styles.row)}>
          <div className={cx(styles.row_title)}>Buyer bans</div>
          <div className={cx('text-blue-400')}>3</div>
        </div>
      </div>
      {/* Second Row Group of General */}
      <div className={cx('w-full py-10')}>
        <div className={styles.row}>
          <div className={styles.row_title}>Highest fee recieved</div>
          <div className={styles.row_content}>136,200,000k PSL</div>
        </div>
        <div className={styles.row}>
          <div className={styles.row_title}>Total sales amount</div>
          <div className={styles.row_content}>560,600,00k PSL</div>
        </div>
        <div className={styles.row}>
          <div className={styles.row_title}>Total items sold</div>
          <div className={styles.row_content}>14</div>
        </div>
        <div className={styles.row}>
          <div className={styles.row_title}>Top category persentage</div>
          <div className={styles.row_content}>motion graphics 30%</div>
        </div>
      </div>
      {/* Third Row Group of General */}
      <div className={cx('w-full py-10')}>
        <div className={styles.row}>
          <div className={styles.row_title}>Bio</div>
        </div>
        <div className={styles.row}>
          <div className={styles.row_content} style={{ fontSize: 14 }}>
            I'am baby readymade mikshk tatooed actually activated charcoal
            godard listicle. Mumblecore cronut kickstarter, bushwick wolf copper
            mug woke chia put a bird on it viral gentrify keytar synth. Twee
            chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out
            drinking vinegar pinterest mumblecore tousled occupy brunch whatever
            ugh.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileGeneral
