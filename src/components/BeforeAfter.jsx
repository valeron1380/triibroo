import React, { useState } from 'react';
import styles from './BeforeAfter.module.css';
import { Reveal } from './ui/Reveal';
// Убедитесь, что эти картинки есть в папке assets
import imgBefore from '../assets/before.jpg'; 
import imgAfter from '../assets/after.jpg'; 

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMove = (clientX, rect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Reveal>
            <h2 className={styles.heading}>Результат работы</h2>
        </Reveal>
        
        <div 
          className={styles.sliderContainer}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Изображение "ПОСЛЕ" (Фон) */}
          <div 
            className={styles.imageWrapper}
            style={{ backgroundImage: `url(${imgAfter})` }}
          />

          {/* Изображение "ДО" (Сверху, обрезается) */}
          <div 
            className={styles.imageWrapper}
            style={{ 
              backgroundImage: `url(${imgBefore})`,
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
            }}
          />

          {/* Линия разделителя */}
          <div 
            className={styles.sliderLine} 
            style={{ left: `${sliderPosition}%` }}
          >
            <div className={styles.sliderButton}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="black"><path d="M8 12L14 6V18L8 12Z" /><path d="M16 12L10 6V18L16 12Z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;