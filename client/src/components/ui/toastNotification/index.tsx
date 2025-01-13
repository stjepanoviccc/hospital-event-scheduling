import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const ToastNotifications: React.FC = () => {
  return (
    <ToastContainer 
      position="top-right" 
      autoClose={5000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick 
      rtl={false} 
      pauseOnFocusLoss 
      draggable 
      pauseOnHover 
    />
  );
};

export default ToastNotifications;
