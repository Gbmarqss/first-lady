import React, { useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Info, CheckCircle, WarningCircle, XCircle, X } from '@phosphor-icons/react';

export function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    info: <Info className="w-5 h-5 text-blue-400" />,
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    warning: <WarningCircle className="w-5 h-5 text-yellow-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />
  };

  const bgs = {
    info: 'bg-blue-900/50 border-blue-500/20',
    success: 'bg-green-900/50 border-green-500/20',
    warning: 'bg-yellow-900/50 border-yellow-500/20',
    error: 'bg-red-900/50 border-red-500/20'
  };

  return (
    <div className={cn("flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg animate-[slideIn_0.3s_ease-out]", bgs[type])}>
      {icons[type]}
      <p className="text-sm font-medium text-white">{message}</p>
      <button onClick={onClose} className="p-1 ml-2 text-white/50 hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
