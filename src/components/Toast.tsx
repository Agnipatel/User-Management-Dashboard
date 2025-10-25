import React from 'react';
import { CheckCircle } from 'lucide-react';

// Define the toast type
interface ToastProps {
  toast: {
    type: 'success' | 'error'; // specify allowed types
    message: string;
  };
}

const Toast: React.FC<ToastProps> = ({ toast }) => (
  <div
    className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
      toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}
  >
    <CheckCircle size={20} />
    <span>{toast.message}</span>
  </div>
);

export default Toast;
