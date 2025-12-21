import React from 'react';
import styles from './Contacts.module.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaVk, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';

const Contacts = () => {
  return (
    <section id="contacts" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.heading}>Контакты</h2>
          
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.icon}/>
            <div>
              <h3>Адрес</h3>
              <p>Московская область, городской округ Люберцы, городской округ, Угрешская улица, 15А</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FaPhoneAlt className={styles.icon}/>
            <div>
              <h3>Телефон</h3>
              <a href="tel:+79254901313">+7 (925) 490-13-13</a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FaClock className={styles.icon}/>
            <div>
              <h3>Режим работы</h3>
              <p>Ежедневно с 09:00 до 21:00</p>
            </div>
          </div>

          <div className={styles.socials}>
          <a href="https://vk.com/club228221372" target="_blank" rel="noreferrer"><FaVk /></a>
          <a href="https://web.telegram.org/k/#@tribro1" target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
          <a href="https://wa.me/79254901313" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

        <div className={styles.mapWrapper}>
        <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=37.851634%2C55.636086&z=17&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCZonMTU2Nzg5OTI1MhJC0KDQvtGB0YHQuNGPLCDQnNC-0YHQutC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0JTQt9C10YDQttC40L3RgdC60LjQuSwg0KPQs9GA0LXRiNGB0LrQsNGPINGD0LvQuNGG0LAsIDE10JAiCg29RhlCFfAnX0I%2C"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen={true}
                  className={styles.map}
                ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contacts;