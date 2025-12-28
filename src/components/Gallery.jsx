import React, { useState } from 'react'; // Добавлен useState
import styles from './Gallery.module.css';
import { Reveal } from './ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion'; // Добавлен AnimatePresence
import { FaSearchPlus, FaTimes, FaVk, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { getTelegramLink } from '../utils/telegram';

// Импорты Swiper (оставляем как есть)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Данные для слайдера (оставляем как есть)
const sliderPhotos = [
  '/images/slider1.jpg',
  '/images/slider2.jpg',
  '/images/slider3.jpg',
  '/images/slider4.jpg',
  '/images/slider5.jpg',
];

// Данные для сетки (оставляем как есть)
const gridItems = [
  { id: 1, src: '/images/grid1.jpg', title: 'Мойка днища', category: 'Днище' },
  { id: 2, src: '/images/grid2.jpg', title: 'Мойка кузова', category: 'Кузов' },
  { id: 3, src: '/images/grid10.jpg', title: 'Мойка радиаторов', category: 'Мойка радиаторов' },
  { id: 4, src: '/images/grid7.jpg', title: 'Мойка днища', category: 'Днище' },
  { id: 5, src: '/images/grid3.jpg', title: 'Поклейка плёнки', category: 'Пленка' },
  { id: 6, src: '/images/grid4.jpg', title: 'Полировка кузова', category: 'Полировка' },
  { id: 7, src: '/images/grid5.jpg', title: 'Чистка салона', category: 'Салон' },
  { id: 8, src: '/images/grid6.jpg', title: 'Установка защитной плёнки', category: 'Салон' },
  { id: 9, src: '/images/grid8.jpg', title: 'Установка шумоизоляции', category: 'Шумоизоляция' },
  { id: 10, src: '/images/grid9.jpg', title: 'Наша шумоизоляция', category: 'Шумоизоляция' },
];

const Gallery = () => {
  // НОВОЕ: Состояние для выбранной картинки в лайтбоксе
  const [selectedImage, setSelectedImage] = useState(null);

  // НОВОЕ: Функции открытия и закрытия
  const openLightbox = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Разблокируем скролл
  };

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container}>
        <Reveal>
          <h2 className={styles.title}>Наши работы</h2>
        </Reveal>
        
        {/* СЛАЙДЕР (без изменений) */}
        <Reveal delay={0.2}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 8000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.swiper}
          >
            {sliderPhotos.map((photo, idx) => (
              <SwiperSlide key={idx}>
                <div className={styles.slideContent}>
                  <img 
                    src={photo} 
                    alt={`Slider work ${idx + 1}`} 
                    className={styles.image} 
                    onError={(e) => { e.target.src = 'https://placehold.co/800x600/1a1a1a/f0c419?text=slider'+(idx+1)+'.jpg'; }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        {/* СЕТКА С ИЗОБРАЖЕНИЯМИ */}
        <div className={styles.gridContainer}>
          <Reveal>
            <div className={styles.gridHeader}>
              <h3 className={styles.gridTitle}>Процесс работы</h3>
              <p className={styles.gridSubtitle}>Представляем Вашему вниманию процесс работы нашего сервиса</p>
            </div>
          </Reveal>

          <div className={styles.imageGrid}>
            {gridItems.map((item) => (
              <motion.div 
                key={item.id}
                className={styles.gridItem}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(item)} // НОВОЕ: Добавлен клик
              >
                <div className={styles.imageWrapper}>
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className={styles.gridImage}
                    onError={(e) => { e.target.src = `https://placehold.co/800x600/1a1a1a/f0c419?text=grid${item.id}.jpg`; }}
                  />
                  <div className={styles.imageOverlay}>
                    <FaSearchPlus className={styles.zoomIcon} />
                    <span className={styles.categoryBadge}>{item.category}</span>
                    <p className={styles.imageLabel}>{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* НОВОЕ: Модальное окно Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox} // Закрытие по клику на фон
          >
            <button className={styles.closeBtn} onClick={closeLightbox}>
              <FaTimes />
            </button>
            
            <motion.div 
              className={styles.lightboxContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на саму картинку
            >
              <img src={selectedImage.src} alt={selectedImage.title} className={styles.lightboxImage} />
              <div className={styles.lightboxCaption}>
                <span className={styles.categoryBadge}>{selectedImage.category}</span>
                <h3>{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Секция с соц сетями */}
      <div className={styles.socialSection}>
        <div className={styles.container}>
          <h2 className={styles.socialHeading}>Больше фото и видео в нашем Telegram канале</h2>
          <Reveal delay={0.1}>
            <div className={styles.socialButtons}>
            <a 
                href={getTelegramLink('tribro1', 'channel')}
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialBtn}
              >
                <FaTelegramPlane className={styles.socialIcon} />
                <span className={styles.socialText}>Telegram</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Gallery;