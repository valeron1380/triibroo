import React from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.title}
        >
          ТРИ БРО
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={styles.subtitle}
        >
          Автомоечный комплекс премиального качества
        </motion.p>
        
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 1, duration: 0.5 }}
        >
            <Link to="services" smooth={true} className={styles.ctaButton}>
              Наши услуги
            </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;