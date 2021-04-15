import { toast } from 'react-toastify';

export function showToast (message, type) {
  toast(message, {
    position: 'bottom-right',
    autoClose: 3000,
    type: type,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  })
}
