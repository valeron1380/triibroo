import React from 'react';
import styles from './Services.module.css';
import { FaTimes, FaWhatsapp, FaPhoneAlt, FaInfoCircle } from 'react-icons/fa';
import { MdDirectionsCar } from 'react-icons/md';
import { FaCarSide, FaTruckMonster, FaShuttleVan } from 'react-icons/fa';
import { MdOutlineDirectionsCarFilled } from 'react-icons/md';

const CLASS_ICONS = [
  { icon: <MdDirectionsCar />, label: "Мини" },
  { icon: <FaCarSide />, label: "Седан" },
  { icon: <MdOutlineDirectionsCarFilled />, label: "Кроссовер" },
  { icon: <FaTruckMonster />, label: "Внедорожник" },
  { icon: <FaShuttleVan />, label: "Микроавтобус" }
];

const BookingModal = ({ isOpen, onClose, orderData = null }) => {
  if (!isOpen) return null;

  const createMessage = () => {
    if (orderData && orderData.selectedDetails && orderData.selectedDetails.length > 0) {
      let text = `Здравствуйте! Заявка (Класс: ${orderData.carClass + 1}):\n`;
      orderData.selectedDetails.forEach(item => { 
        text += `- ${item.title}: ${item.currentPrice}₽\n`; 
      });
      text += `\nИтого: ${orderData.totalPrice}₽`;
      return encodeURIComponent(text);
    } else {
      // Простое сообщение для записи без выбранных услуг
      return encodeURIComponent('Здравствуйте! Хочу записаться на услугу.');
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <FaTimes className={styles.closeIcon} onClick={onClose} />
        <h3>Оформление заказа</h3>
        
        {orderData && orderData.selectedDetails && orderData.selectedDetails.length > 0 ? (
          <>
            <div className={styles.classWarning}>
              <FaInfoCircle />
              <p>Вы выбрали <strong>{orderData.carClass + 1} класс ({CLASS_ICONS[orderData.carClass]?.label})</strong>. Убедитесь в правильности выбора, так как стоимость услуг напрямую зависит от габаритов авто.</p>
            </div>

            <div className={styles.orderList}>
              {orderData.selectedDetails.map(item => (
                <div key={item.id} className={styles.orderItem}>
                  <span>{item.title}</span>
                  <strong>{item.currentPrice.toLocaleString()} ₽</strong>
                </div>
              ))}
            </div>
            <div className={styles.orderTotal}>
              <span>Итого:</span>
              <span>{orderData.totalPrice.toLocaleString()} ₽</span>
            </div>
          </>
        ) : (
          <p style={{ color: '#888', margin: '20px 0' }}>
            Выберите услуги в разделе "Прайс-лист" или свяжитесь с нами для консультации.
          </p>
        )}
        
        <div className={styles.socialButtons}>
          <a href={`https://wa.me/79254901313?text=${createMessage()}`} target="_blank" rel="noreferrer" className={styles.waBtn}>
            <FaWhatsapp /> Написать в WhatsApp
          </a>
          <a href="tel:+79254901313" className={styles.phoneBtn}>
            <FaPhoneAlt /> Позвонить
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

