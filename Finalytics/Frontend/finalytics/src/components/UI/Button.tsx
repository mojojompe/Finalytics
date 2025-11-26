import React from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    type = 'button',
    disabled = false,
    icon: Icon
}) => {
    const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-accent text-dark hover:bg-sky-400 shadow-lg shadow-sky-500/20",
        secondary: "bg-secondary text-slate-200 hover:bg-slate-700 border border-slate-700",
        danger: "bg-danger text-white hover:bg-red-600",
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50",
        outline: "bg-transparent border border-accent text-accent hover:bg-accent/10"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {Icon && <Icon className="text-lg" />}
            {children}
        </motion.button>
    );
};

export default Button;
