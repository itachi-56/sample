import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = (message: string, position: any, type: string) => {
  switch (type) {
    case 'success':
      toast.success(message, { position });
      break;
    case 'error':
      toast.error(message, { position });
      break;
    case 'warning':
      toast.warning(message, { position });
      break;
    default:
      toast(message, { position });
  }
};

export default Toast;
