import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface IProps {
    title: string, 
    message: string
}

const MacOSNotification = ({ title, message }: IProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => setIsVisible(false), 300); // Match this with CSS transition duration
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 w-80 bg-white bg-opacity-80 backdrop-blur-md 
                     rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out
                     ${isLeaving ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
                     animate-slide-in-right`}>
      <div className="px-4 py-3 flex items-start">
        {/* <div className="flex-shrink-0 mr-3">
          {icon}
        </div> */}
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-700 mt-1">{message}</p>
        </div>
        <button 
          onClick={handleClose}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500">
        Now • Your App Name
      </div>
    </div>
  );
};

export default MacOSNotification