
"use client"

import css from '@/components/Modal/Modal.module.css'
import { createPortal } from 'react-dom'
import React, { useEffect } from 'react'

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}


const Modal = ({ onClose, children }: ModalProps) => {

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
    

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        }

    }, [onClose]);

    return createPortal(
        <div
            className={css.backdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true">
            <div className={css.modal}>{children}</div>
        </div>,
        document.body
    )
}

export default Modal
