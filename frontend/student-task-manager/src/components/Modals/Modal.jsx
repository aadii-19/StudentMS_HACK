import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const dropIn = {
        hidden: { y: "-100vh", opacity: 0 },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        },
        exit: { y: "100vh", opacity: 0 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay} onClick={onClose}>
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className={styles.modal}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className={styles.header}>
                            <h2>{title}</h2>
                            <button className={styles.closeButton} onClick={onClose}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
