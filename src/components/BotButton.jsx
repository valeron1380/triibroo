import React from 'react';
import { FaRobot, FaTelegramPlane } from 'react-icons/fa';
import styles from './BotButton.module.css';
import { motion } from 'framer-motion';

const BotButton = () => {
  return (
    <motion.a
      href="https://web.telegram.org/k/#@tribro_bot" // Ссылка для открытия приложения Telegram
      target="_blank"
      rel="noopener noreferrer"
      className={styles.botButton}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={styles.iconContainer}>
        <FaRobot className={styles.icon} />
        {/* Анимация "волны" вокруг иконки */}
        <span className={styles.ping}></span>
      </div>
      <span className={styles.text}>Узнать подробности у бота</span>
    </motion.a>
  );
};

export default BotButton;