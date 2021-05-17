import { render } from '@testing-library/react'
import React, { ReactNode } from 'react'

import { ArtRegForm } from '../ArtRegForm'

interface IMockProps {
  children: ReactNode
}

jest.mock('../GeneralInfoStep', () => ({
  GeneralInfoStep: (props: IMockProps) => (
    <div data-testid='GeneralInfoStep'>{props.children}</div>
  ),
}))

jest.mock('../../../../redux/hooks', () => ({
  useAppSelector: jest.fn().mockReturnValue({ step: 'GeneralInfo' }),
}))

describe('ArtRegForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows right component based on the state', () => {
    const component = render(<ArtRegForm />)
    expect(component.queryByTestId('GeneralInfoStep')).toBeInTheDocument()
  })
})
