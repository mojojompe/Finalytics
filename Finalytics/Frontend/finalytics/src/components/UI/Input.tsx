import React from 'react';
import type { IconType } from 'react-icons';

interface InputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    error?: string;
    icon?: IconType;
    className?: string;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    error,
    icon: Icon,
    className = ''
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Icon />
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`
            w-full bg-dark border rounded-lg py-2.5 px-4 text-slate-200 placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-danger focus:border-danger' : 'border-slate-700 focus:border-accent'}
          `}
                />
            </div>
            {error && (
                <p className="mt-1 text-xs text-danger">{error}</p>
            )}
        </div>
    );
};

export default Input;
