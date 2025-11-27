import React from 'react';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import Button from './UI/Button';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-secondary border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaSignOutAlt className="text-accent" /> Confirm Logout
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <FaTimes size={20} />
                    </button>
                </div>

                <p className="text-slate-300 mb-8">
                    Are you sure you want to log out? You will need to sign in again to access your dashboard.
                </p>

                <div className="flex gap-4 justify-end">
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onConfirm} className="bg-danger hover:bg-red-600 border-danger">
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
