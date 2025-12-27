import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Footer.module.css';
import { FaVk, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { getTelegramLink } from '../utils/telegram';

const Footer = () => {
  // Координаты центра (Москва, пример)
  const position = [55.751244, 37.618423]; 

  return (
    <footer id="footer" className={styles.footer}>


      <div className={styles.content}>
        <div className={styles.logo}>
          <a href="#hero">
            <img 
              src="/images/logo.png" 
              alt="Логотип TRI-BRO Detailing" 
              className={styles.logoImage} 
            />
          </a>
        </div>
        <div className={styles.info}>
          <p>Московская область, городской округ Люберцы, Угрешская улица, 15А</p>
          <p><a href="tel:+79254901313">+7 (925) 490-13-13</a></p>
          <p>Ежедневно с 09:00 до 21:00</p>
        </div>
        <div className={styles.socials}>
          <a href="https://vk.com/club228221372" target="_blank" rel="noreferrer"><FaVk /></a>
          <a href={getTelegramLink('tribro1', 'channel')} target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
          <a href="https://wa.me/79254901313" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
        </div>
        <div className={styles.copyright}>
          © 2025 TRI BRO Detailing. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;