import { toast, ToastOptions } from 'react-toastify'

export const alertify = (
  message: string,
  type: 'success' | 'warning' | 'error',
): void => {
  const option: ToastOptions = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
  if (type === 'success') {
    toast.success(message, option)
  } else if (type === 'warning') {
    toast.warn(message, option)
  } else {
    toast.error(message, option)
  }
}
