import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import useUIStore from '../../stores/useUIStore';

interface ModalProps {
    id: string;
    title: string;
    children: React.ReactNode;
    onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ id, title, children, onClose }) => {
    const { activeModal, closeModal } = useUIStore();
    const isOpen = activeModal === id;

    const handleClose = () => {
        if (onClose) onClose();
        closeModal();
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) handleClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-secondary border border-slate-700 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-700/50">
                                <h3 className="text-xl font-bold text-white">{title}</h3>
                                <button
                                    onClick={handleClose}
                                    className="text-slate-400 hover:text-white transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="p-6">
                                {children}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
