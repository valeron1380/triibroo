import React from 'react';
import styles from './Promo.module.css';
import { Reveal } from './ui/Reveal';

const Promo = () => {
  return (
    <section id="promo" className={styles.section}>
      <div className={styles.container}>
        <Reveal><h2 className={styles.heading}>Акции</h2></Reveal>
        <div className={styles.promoGrid}>
          <Reveal>
            <div className={`${styles.promoCard} ${styles.gold}`}>
              <span className={styles.badge}>Акция</span>
              <h3>Кэшбэк с каждого чека</h3>
              <p>Получайте кэшбэк с каждого визита! Накопительная система бонусов за каждую оплаченную услугу.</p>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <div className={`${styles.promoCard} ${styles.gold}`}>
              <span className={styles.badge}>Временное предложение</span>
              <h3>Кварцевое покрытие -20%</h3>
              <p>Защитное кварцевое покрытие со скидкой 20%. Долговременная защита кузова по выгодной цене.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className={`${styles.promoCard} ${styles.gold}`}>
              <span className={styles.badge}>Для новых клиентов</span>
              <h3>Скидка 10% новым гостям</h3>
              <p>При первом посещении получите скидку 10% на любую услугу. Добро пожаловать в TRI-BRO!</p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className={`${styles.promoCard} ${styles.gold}`}>
              <span className={styles.badge}>Подарок</span>
              <h3>Бесплатный бонус при заказе</h3>
              <p>При заказе химчистки, полировки или шумоизоляции выберите подарок: комплекс, полировка фар, озонация салона или сухой туман.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Promo;