import React from 'react'
import { Meta } from '@storybook/react'
import IconButton from './IconButton'

export const IconButtonBorder: React.FC = () => (
  <IconButton type='border' hoverColor='error' activeColor='error-pressed'>
    <svg
      width='22'
      height='18'
      viewBox='0 0 22 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11 1.80957C9.83211 0.688804 8.24649 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 12.8683 6.97034 16.385 9.81379 17.5547C10.5796 17.8697 11.4204 17.8697 12.1862 17.5547C15.0297 16.385 22 12.8682 22 6.5C22 2.91015 19.0899 0 15.5 0C13.7535 0 12.1679 0.688804 11 1.80957Z' />
    </svg>
  </IconButton>
)
export const IconButtonShadow: React.FC = () => (
  <IconButton type='shadow' hoverColor='error' activeColor='error-pressed'>
    <svg
      width='22'
      height='18'
      viewBox='0 0 22 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11 1.80957C9.83211 0.688804 8.24649 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 12.8683 6.97034 16.385 9.81379 17.5547C10.5796 17.8697 11.4204 17.8697 12.1862 17.5547C15.0297 16.385 22 12.8682 22 6.5C22 2.91015 19.0899 0 15.5 0C13.7535 0 12.1679 0.688804 11 1.80957Z' />
    </svg>
  </IconButton>
)

export default {
  component: IconButton,
  title: 'Icon Button',
} as Meta
