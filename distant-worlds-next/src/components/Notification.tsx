'use client';

import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export default function Notification({ message, type, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-success border-success',
    error: 'bg-danger border-danger',
    info: 'bg-[var(--primary-color)] border-[var(--primary-color)]'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${typeStyles[type]} text-white shadow-lg transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-white hover:text-gray-200 text-lg leading-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
} 