import React from 'react';
import styles from './Header.module.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaVk, FaTelegram, FaWhatsapp } from 'react-icons/fa';

/**
 * Компонент шапки сайта.
 * @param {function} onOpenBooking - Функция для открытия модального окна записи.
 */
const Header = ({ onOpenBooking }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* --- БЛОК ЛОГОТИПА (Картинка) --- */}
        <div className={styles.logo}>
          {/* Ссылка на главную секцию/Hero */}
          <a href="#hero">
            <img 
              src="/images/logo.png" 
              alt="Логотип TRI-BRO Detailing" 
              className={styles.logoImage} 
            />
          </a>
        </div>
        
        {/* --- НАВИГАЦИЯ --- */}
        <nav className={styles.nav}>
          <a href="#services" className={styles.navLink}>Услуги</a>
          <a href="#gallery" className={styles.navLink}>Галерея</a>
          <a href="#promo" className={styles.navLink}>Акции</a>
        </nav>

        {/* --- КНОПКИ ДЕЙСТВИЙ (КОНТАКТ) --- */}
        <div className={styles.actions}>
        
          {/* Ссылка на телефон (замените номер) */}
          <a href="tel:+79254901313" className={styles.phoneLink}>
            <FaPhoneAlt />
            <span>+7 (925) 490-13-13</span>
          </a>
          
          
          {/* Кнопка открытия общей модалки записи */}
          <button 
            className={styles.bookingBtn} 
            onClick={onOpenBooking}
          >
            Записаться
          </button>
          <div className={styles.headerSocials}>
            <a href="https://vk.com/club228221372" target="_blank" rel="noreferrer" className={styles.headerSocBtn}><FaVk /></a>
            <a href="tg://resolve?domain=tribro1" target="_blank" rel="noreferrer" className={styles.headerSocBtn}><FaTelegram /></a>
            <a href="https://wa.me/79254901313" target="_blank" rel="noreferrer" className={styles.headerSocBtn}><FaWhatsapp /></a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;