import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as electron from 'electron'
import React from 'react'

import * as hooks from '../../../../redux/hooks'
import { setFormData } from '../../artRegSlice'
import { ImageSelectionStep } from '../ImageSelectionStep'

describe('ImageSelectionStep', () => {
  test('shows image if its present in the state', async () => {
    // Arrange
    jest.spyOn(hooks, 'useAppSelector').mockReturnValue({
      filePath: 'a/b',
    })

    electron.ipcRenderer.invoke = jest.fn().mockResolvedValue('base64')

    jest.spyOn(hooks, 'useAppDispatch').mockImplementation()

    // Act
    const c = render(<ImageSelectionStep />)

    await waitForElementToBeRemoved(() =>
      screen.getByTestId('imagePlaceholder'),
    )

    // Assert
    expect(c.queryByTestId('imageSelected')).toBeInTheDocument()
  })

  test('shows error if there was an error reading an image', async () => {
    // Arrange
    jest.spyOn(hooks, 'useAppSelector').mockReturnValue({
      filePath: 'a/b',
    })
    jest.spyOn(console, 'warn').mockImplementation(() => null)

    electron.ipcRenderer.invoke = jest
      .fn()
      .mockRejectedValue(new Error('expected error'))

    jest.spyOn(hooks, 'useAppDispatch').mockImplementation()

    // Act
    const c = render(<ImageSelectionStep />)

    // Assert
    await waitFor(() => {
      expect(c.queryByTestId('error')).toBeInTheDocument()
    })
  })

  test('renders an image if an image was selected from the state', async () => {
    // Arrange
    jest.spyOn(hooks, 'useAppSelector').mockReturnValue({
      filePath: '',
    })
    jest.spyOn(console, 'warn').mockImplementation(() => null)

    const dispatchSpy = jest.fn()
    jest.spyOn(hooks, 'useAppDispatch').mockImplementation(() => {
      return dispatchSpy
    })

    // Act
    const c = render(<ImageSelectionStep />)

    // Assert
    await waitFor(() => {
      electron.ipcRenderer.send('chooseImageDone', {
        status: 'Success',
        payload: {
          base64: 'base64',
          size: 100,
          path: 'a/b',
        },
      })

      expect(c.queryByTestId('imageSelected')).toBeInTheDocument()
      expect(dispatchSpy).toHaveBeenLastCalledWith(
        setFormData({
          filePath: 'a/b',
          fileSize: 100,
        }),
      )
    })
  })

  test('shows error if there was an error reading an image from use input', async () => {
    // Arrange
    jest.spyOn(hooks, 'useAppSelector').mockReturnValue({
      filePath: '',
    })
    jest.spyOn(console, 'warn').mockImplementation(() => null)
    jest.spyOn(hooks, 'useAppDispatch').mockImplementation()

    // Act
    const c = render(<ImageSelectionStep />)

    // Assert
    await waitFor(() => {
      electron.ipcRenderer.send('chooseImageDone', {
        status: 'Failure',
        error: 'expected error',
      })

      expect(c.queryByTestId('error')).toBeInTheDocument()
    })
  })
})
