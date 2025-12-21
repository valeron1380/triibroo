import React, { useState, useRef } from 'react';
import styles from './Reviews.module.css';
import { Reveal } from './ui/Reveal';
import { motion } from 'framer-motion';
import { FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const REVIEWS_DATA = [
  { id: 1, author: "gregoryzpost", date: "2 июля 2024", rating: 5, text: "Являюсь владельцем 2 проектных авто: уникальный винил, обвесы, дополнительное оборудование, перешиты салоны в натуральные материалы, такое мыть надо уметь. По факту: - отлично понимают как работать с пленкой - на линии подачи воды стоит фильтра ( что важно, так как если фильтра нет, летит мелкий абразив, царапающий поверхность, а так же потом остается пленка из налета ) - применяют хорошую химию ( не жгут пленку ), про химию рассказывают, показывают, не скрывают ничего - моют очень кропотливо - отмыли все сложные места стыковок обвесов, пластика - после мойки не остается потеков, разводов, струек воды из под зеркал, ручек - салон весь вычищен ( выемки в ручках дверей, подстаканники - вообще все ) - авто выезжает приятно пахнущим, чистейшим. Три Бро не позиционирует себя как мега крутой детейлинг центр, НО выдает качество на класс выше, чем самые раскрученные детейлинги по Москве при этом за цену, куда скромнее. Желаю развития и больше клиентов! 5 баллов!" },
  { id: 2, author: "Дмитрий Туринцев", date: "11 октября 2024", rating: 5, text: "Ребята все оч хорошо сделали: Отмыли кузов, сделали приятный запах в салоне Фары фонари - полировка и закатка в пленку. Смотрятся теперь просто прекрасно Клиентоориентированность тоже оч крутая, ребята всегда на связи, все можно обсудить/согласовать или добавить. Ненужные работы рекомендуют не делать или делать в сезон, то есть чек намеренно не увеличивают, что приятно. Рекомендую!" },
  { id: 3, author: "Алексей Ласица", date: "14 августа 2024", rating: 5, text: "Делал у этих ребят химчистку и установку шумки на аутлендер, доволен ихней работай как слон! Сделали так что теперь моя машина из консервной банки превратилась в подводную лодку). У ребят цены по сравнению с другими куда обращался приемлемые а главное это качество работы за что им огромное спасибо!!! Так же отдельное спасибо Кириллу Георгиевичу за то что проконсультировал по материалам лишнего ничего не навязал работы провели в кротчайшие сроки!!! Теперь езжу на новой машине хотя ей уже 10 лет. Низкий паклон парни, и большое Спасибо!" },
  { id: 4, author: "Татьяна Захарова", date: "18 ноября 2025", rating: 5, text: "Данная мойка находится рядом с домом, машину мою на ней всегда, все устраивает. Есть возможность записаться и приехать к данному времени, ждать очередь не надо. В этот раз порекомендовали сделать кварцевое покрытие, тем более, что сейчас на нее скидка. Согласилась. Но при оплате сказали, что вместо скидки сделали чернение шин, стоимость такая же как и величина скидки. Я чернение не просила, поэтому минус ⭐. А так ребята молодцы, данную мойку рекомендую !" },
  { id: 5, author: "Илья", date: "20 декабря  2025", rating: 5, text: "Отличная мойка, записался на нужное время, приехал, можно оставить ключи и уйти по своим делам либо подождать в комнате для гостей с удобным диванами и креслами. Моют качественно, есть различные доп возможности, которые выбирает клиент без навязывания. Периодически приходится мыть кузов с применение антибитумных средств, у ребят и такая доп. услуга имеется. Цены на услуги не дорогие учитывая качество работы. Данной организации желаю процветания, буду приезжать ещё." },
  { id: 6, author: "Рома Сёмкин", date: "3 декабря 2025", rating: 5, text: "Молодцы быстро и хорошо. Спасибо!" },
  { id: 7, author: "Илья Кулясов", date: "27 ноября 2025", rating: 5, text: "Советую данную организацию к посещению. Очень высокая клиентоориентированность, было не большое недопонимание - со мной связались владельцы и урегулировали вопрос. Цены приемлемые. В Дзержинском это точно самая лучшая мойка можно смело обращаться" },
  { id: 8, author: "Валерий Я.", date: "25 ноября 2025", rating: 5, text: "Лучшая мойка в нашем городе,работают по записи и можно оставить автомобиль,по готовности позвонят" },
];

const ReviewCard = ({ review, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const TEXT_LIMIT = 120;
  const isLong = review.text.length > TEXT_LIMIT;

  const handleToggle = (e) => {
    if (e) e.stopPropagation();
    setIsExpanded(!isExpanded);
    if (onToggle) setTimeout(onToggle, 100); 
  };

  return (
    <motion.div 
      layout
      className={`${styles.reviewCard} ${isExpanded ? styles.expanded : ''}`}
      onClick={isLong ? handleToggle : undefined}
    >
      <div className={styles.cardTop}>
        <div className={styles.authorInfo}>
          <strong>{review.author}</strong>
          <span>{review.date}</span>
        </div>
        <div className={styles.cardStars}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < review.rating ? "#f0c419" : "#333"} />
          ))}
        </div>
      </div>

      <motion.p layout="position" className={styles.reviewText}>
        "{isExpanded || !isLong ? review.text : review.text.substring(0, TEXT_LIMIT) + "..."}"
      </motion.p>

      {isLong && (
        <button className={styles.readMore} onClick={handleToggle}>
          {isExpanded ? 'Скрыть' : 'Читать полностью'}
        </button>
      )}
    </motion.div>
  );
};

const Reviews = () => {
  const swiperRef = useRef(null);
  // Вычисляем средний рейтинг из всех отзывов
  const averageRating = REVIEWS_DATA.length > 0 
    ? parseFloat((REVIEWS_DATA.reduce((sum, review) => sum + review.rating, 0) / REVIEWS_DATA.length).toFixed(1))
    : 5.0;
  const YANDEX_MAPS_URL = "https://yandex.ru/maps/21735/dzerzhinsky/?ll=37.852534%2C55.636027&mode=poi&poi%5Bpoint%5D=37.850491%2C55.635611&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D199059391803&tab=reviews&z=16"; // Замените на вашу ссылку

  const updateHeight = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.updateAutoHeight(300);
    }
  };

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.ratingHeader}>
          <Reveal>
            <div className={styles.yandexBadge}>
              {/* Заменили FaYandex на текст для стабильности */}
              <span className={styles.yaLetter}>Y</span>
              <span>Яндекс Карты</span>
            </div>
            <div className={styles.scoreBlock}>
              <span className={styles.bigScore}>{averageRating}</span>
              <p className={styles.totalCount}>На основе 150+ отзывов</p>
              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={styles.starGold} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            autoHeight={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.swiper}
          >
            {REVIEWS_DATA.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} onToggle={updateHeight} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        <div className={styles.controls}>
          <a href={YANDEX_MAPS_URL} target="_blank" rel="noopener noreferrer" className={styles.moreBtn}>
            Больше отзывов тут <FaExternalLinkAlt size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;