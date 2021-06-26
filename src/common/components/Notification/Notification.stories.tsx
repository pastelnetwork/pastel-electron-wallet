import React from 'react'
import { Story, Meta } from '@storybook/react'
import Notification, { TNotification } from './Notification'

export const NotificationUnread: Story<TNotification> = () => (
  <Notification
    status='unread'
    type='system'
    title='New listing: Diamonds in the sky by followed Bnksy64'
  />
)
export const NotificationRead: Story<TNotification> = () => (
  <Notification
    type='wallet'
    status='read'
    title='Remiders: bookmarked auction starts in 10 minutes'
  />
)

export default {
  component: Notification,
  title: 'Notification',
} as Meta
