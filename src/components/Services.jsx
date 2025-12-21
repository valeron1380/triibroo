import React, { useState, useEffect } from 'react';
import styles from './Services.module.css';
import { Reveal } from './ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaCheck, FaShoppingBag, FaTimes, FaCarSide, FaTruckMonster, FaShuttleVan } from 'react-icons/fa';
import { MdDirectionsCar, MdOutlineDirectionsCarFilled } from 'react-icons/md';

// Данные классификации (те же, что из таблиц)
const CAR_CLASSIFICATION_DATA = [
  { brand: "BMW", models: ["-", "1, 3, 4 series", "5, 6, 7 series, X1, X3, X4, Z3, Z4", "X5, X6", "X7"] },
  { brand: "Mercedes", models: ["Smart", "A-Class, B-Class, SLK", "C, CLA, E, GLK, GLC, M-Class, CLS", "ML, R-Class, S-Class", "G-Class, GL, GLS, V-Class, Vito"] },
  { brand: "Audi", models: ["A1, A2, TT", "A3, A4", "A5, A6, A7, A8, Q3, Q5, Allroad", "Q7, Q8", "R8"] },
  { brand: "Toyota", models: ["Yaris", "Auris, Corolla, Prius, Verso", "Avensis, Camry, RAV4, Venza", "Highlander, Prado, Alphard", "LC 100/200/300, Sequoia, Tundra"] },
  { brand: "Volkswagen", models: ["Lupo", "Golf, Polo, Scirocco, Beetle, Jetta", "Passat, CC, Tiguan, Touran", "Touareg", "Amarok, Multivan, Caravelle"] },
  { brand: "Lexus", models: ["-", "CT", "IS, ES, GS", "RX, NX", "LX, GX, LS"] },
  { brand: "Land Rover", models: ["-", "-", "Evoque, Freelander", "Discovery, Defender", "Range Rover, Vogue, Sport"] },
  { brand: "Porsche", models: ["-", "Boxster, Cayman", "911, Macan", "Cayenne, Panamera", "-"] },
  { brand: "Nissan", models: ["Micra", "Almera, Note, Tiida", "Teana, Qashqai, X-Trail, Juke", "Murano, Pathfinder", "Patrol, Navara, Titan"] },
  { brand: "Kia", models: ["Picanto", "Ceed, Rio, Soul, Venga", "Optima, Cerato, Sportage", "Sorento, Carnival", "Mohave"] },
  { brand: "Hyundai", models: ["Getz", "Accent, Solaris, Elantra, Veloster", "Sonata, i40, ix35, Genesis", "Santa Fe", "H-1, Equus, Palisade"] },
  { brand: "Mazda", models: ["2", "3, MX-5, RX-8", "6, CX-3, CX-5", "CX-7", "CX-9, BT-50"] },
  { brand: "Ford", models: ["Fiesta, Ka", "Focus, Fusion", "Kuga, Mondeo, Mustang", "Explorer", "Expedition, F-150"] },
  { brand: "Skoda", models: ["-", "Fabia, Rapid", "Octavia, Yeti, Superb", "Kodiaq", "-"] },
  { brand: "Chevrolet", models: ["Spark", "Aveo, Cruze, Lacetti", "Camaro, Malibu, Orlando", "Captiva, Trailblazer", "Tahoe, Suburban"] },
  { brand: "Volvo", models: ["C30", "S40, V40, C70", "S60, S80, XC60", "XC70, XC90", "-"] },
  { brand: "Honda", models: ["Jazz", "Civic", "Accord, Crosstour", "CR-V", "Pilot"] },
  { brand: "Mitsubishi", models: ["Colt", "Lancer", "Galant, ASX, Outlander", "Pajero, Pajero Sport", "L200"] }
];

// === ПРАЙС-ЛИСТ ===
const SERVICES_DATA = {
  carwash: {
    title: "Автомойка",
    subcategories: [
      {
        id: "body",
        title: "Мойка кузова",
        items: [
          { id: "tech", title: "Бесконтактная мойка", desc: "Бесконтактная мойка кузова, сушка и чистка ковриков.", prices: [400, 500, 600, 700, 800] },
          { id: "euro", title: "Сухая/Двухфазная мойка", desc: "Двухфазная мойка кузова с использованием шампуня (кузов, сушка и коврики).", prices: [600, 700, 800, 1100, 1300] },
          { id: "lux", title: "Мойка 'Люкс'", desc: "Двухфазная мойка кузова, которая включает глубокое очищение ЛКП, дисков, подкрылков.", prices: [900, 1000, 1200, 1500, 1800] },
          { id: "polymer", title: "Полимер-лайт", desc: "Бесконтактная мойка кузова, полимерное покрытие (защита).", prices: [800, 900, 1150, 1250, 1500] },
          { id: "quartz", title: "Quartz - Light", desc: "Бесконтактная мойка кузова, кварцевое покрытие (кварцевание).", prices: [2100, 2300, 3000, 3500, 4000] },
        ]
      },
      {
        id: "complex",
        title: "Комплексы",
        items: [
          { id: "std", title: "Комплекс 'Стандарт'", desc: "Кузов, сушка, пороги, коврики, чистка салона, стекла, чернение резины.", prices: [900, 1000, 1200, 1700, 1700] },
          { id: "prem", title: "Комплекс 'Премиум'", desc: "Двухфазная мойка + глубокая очистка дисков, чистка подкрылков, влажная уборка салона, очистка стекла.", prices: [1100, 1300, 1400, 1700, 1900] },
          { id: "hitech", title: "Hi-End Комплекс", desc: "Двухфазный комплекс, очиститель для ЛКП, чистка салона, пластика, кожи, устранение запахов.", prices: [2000, 2300, 2700, 3000, 3300] },
          { id: "pro", title: "Комплекс 'Detail-Light'", desc: "Двухфазный комплекс, полимерное покрытие, чистка салона, чернение резины.", prices: [2400, 2700, 3300, 3800, 4000] },
          { id: "ceramic_wash", title: "Комплекс HOCO", desc: "Бесконтактная мойка кузова, пропитка воском, чистка салона (коврики), уборка багажника.", prices: [2200, 2400, 2800, 3100, 3300] },
        ]
      }
    ]
  },
  detailing: {
    title: "Детейлинг",
    subcategories: [
      {
        id: "coatings",
        title: "Покрытия кузова",
        items: [
          { id: "ceramic_protect", title: "Защитное кварцевое покрытие", desc: "Гарантия HQDS 'Hydro Quartz Shield'.", prices: [1300, 1400, 1600, 1800, 2000] },
          { id: "protect_polymer", title: "Полимерное покрытие", desc: "Укрепление ЛКП, глубокий блеск и защита РУС, пластика, хрома.", prices: [400, 550, 600, 700, 750] },
          { id: "metal_clean", title: "Обезжиривание кузова", desc: "Удаление битума, загрязнений и металлических вкраплений.", prices: [2000, 2500, 3000, 3500, 4000] },
          { id: "wax_coat", title: "Спрей-покрытие (Воск)", desc: "Спрей-покрытие с карнаубским воском.", prices: [300, 400, 450, 500, 500] },
          { id: "hydro", title: "Гидрополимерное покрытие", desc: "Покрытие кузова натуральным воском.", prices: [1000, 1200, 1500, 1800, 2000] },
          { id: "restore_paint", title: "Восстановление ЛКП", desc: "Восстановление цвета и блеска кузова, удаление царапин.", prices: [17500, 19000, 21000, 23000, 28000] },
          { id: "polish_head", title: "Полировка фар", desc: "Восстановительная полировка фар и фонарей.", prices: [600, 800, 800, 900, 900] },
          { id: "ceramic_pro", title: "Профессиональная керамика", desc: "Ручная чистка кузова, полировка, керамическое покрытие.", prices: [2900, 3500, 3900, 4300, 5000] },
          { id: "ppf", title: "Полиуретановая пленка (PPF)", desc: "Защита зон риска или всего кузова.", prices: [15900, 17900, 20000, 23000, 25000] },
          { id: "remove_scratches", title: "Удаление царапин", desc: "Локальное удаление царапин (цена за элемент).", prices: [700, 700, 700, 700, 700] },
          { id: "remove_insects", title: "Удаление насекомых", desc: "Удаление следов от насекомых.", prices: [200, 200, 300, 300, 300] },
          { id: "remove_bitumen", title: "Удаление битума", desc: "Удаление битумных пятен (цена за элемент).", prices: [500, 500, 500, 500, 500] },
          { id: "tire_shine", title: "Чернение резины", desc: "Нанесение защитного состава на шины.", prices: [200, 200, 200, 200, 200] },
          { id: "engine_protect", title: "Защита двигателя", desc: "Консервация подкапотного пространства.", prices: [3000, 3000, 3000, 3500, 3500] },
        ]
      },
      {
        id: "interior",
        title: "Уход за салоном",
        items: [
          { id: "dry_vacuum", title: "Пылесос салона", desc: "Сухая чистка салона пылесосом.", prices: [250, 250, 300, 350, 400] },
          { id: "trunk_vacuum", title: "Уборка багажника", desc: "Сухая чистка багажного отсека.", prices: [200, 200, 250, 300, 300] },
          { id: "plastic_clean", title: "Протирка пластика", desc: "Протирка пластиковых деталей с полиролью.", prices: [200, 250, 300, 350, 350] },
          { id: "glass_protect", title: "Протирка стекол", desc: "Протирка стекол изнутри.", prices: [200, 200, 250, 300, 300] },
          { id: "leather_care", title: "Уход за кожей", desc: "Протирка и кондиционер для кожаного салона.", prices: [300, 350, 500, 500, 500] },
          { id: "deodorize", title: "Озонация", desc: "Устранение запахов с помощью озонатора.", prices: [150, 150, 200, 250, 250] },
          { id: "dry_ice", title: "Сухой туман", desc: "Удаление запахов и ароматизация.", prices: [1000, 1000, 1000, 1000, 1000] },
          { id: "silence", title: "Шумоизоляция", desc: "Оклейка шумоизоляцией (цена от).", prices: [500, 500, 500, 500, 500] }, 
        ]
      },
      {
        id: "dryclean",
        title: "Химчистка",
        items: [
          { id: "seats", title: "Химчистка сидений", desc: "Глубокая чистка текстиля/кожи.", prices: [7000, 8000, 9000, 10000, 14000] },
          { id: "roof", title: "Химчистка потолка", desc: "Удаление пятен с потолка.", prices: [2000, 2000, 2000, 2000, 2000] },
          { id: "floor", title: "Химчистка пола", desc: "Глубокая чистка ковролина.", prices: [1500, 1500, 1500, 1500, 1500] },
          { id: "door", title: "Дверные карты", desc: "Химчистка обивки дверей.", prices: [500, 500, 500, 500, 500] },
          { id: "dashboard", title: "Приборная панель", desc: "Детейлинг чистка торпедо и консоли.", prices: [900, 1300, 1500, 1500, 1800] },
          { id: "trunk", title: "Багажник", desc: "Полная химчистка багажника.", prices: [1000, 1000, 1000, 1000, 1000] },
        ]
      }
    ]
  }
};

const Services = ({ onOpenBooking }) => {
  const [activeMain, setActiveMain] = useState('carwash');
  const [activeSub, setActiveSub] = useState(0);
  const [carClass, setCarClass] = useState(0); 
  const [showClassInfo, setShowClassInfo] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Сброс подкатегории при смене вкладки
  useEffect(() => { setActiveSub(0); }, [activeMain]);

  const currentSubcategories = SERVICES_DATA[activeMain].subcategories;
  const currentServices = currentSubcategories[activeSub].items;

  const toggleService = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const getSelectedDetails = () => {
    const selected = [];
    Object.values(SERVICES_DATA).forEach(cat => {
      cat.subcategories.forEach(sub => {
        sub.items.forEach(item => {
          if (selectedIds.has(item.id)) {
            selected.push({ ...item, currentPrice: item.prices[carClass] });
          }
        });
      });
    });
    return selected;
  };

  const selectedDetails = getSelectedDetails();
  const totalPrice = selectedDetails.reduce((acc, item) => acc + item.currentPrice, 0);

  const handleOpenBooking = () => {
    if (onOpenBooking) {
      onOpenBooking({
        carClass,
        selectedDetails,
        totalPrice
      });
    }
  };

  const CLASS_ICONS = [
    { icon: <MdDirectionsCar />, label: "" },
    { icon: <FaCarSide />, label: "" },
    { icon: <MdOutlineDirectionsCarFilled />, label: "" },
    { icon: <FaTruckMonster />, label: "" },
    { icon: <FaShuttleVan />, label: "" }
  ];

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <Reveal><h2 className={styles.heading}>Прайс-лист</h2></Reveal>

        {/* --- ВЫБОР КЛАССА --- */}
        <div className={styles.classSelectorWrapper}>
          <div className={styles.classHeaderRow}>
            <span className={styles.classLabel}>Класс вашего автомобиля:</span>
            <button className={styles.infoBtn} onClick={() => setShowClassInfo(true)}>
              <FaInfoCircle /> Таблица классов
            </button>
          </div>
          <div className={styles.classGrid}>
            {CLASS_ICONS.map((item, idx) => (
              <button
                key={idx}
                className={`${styles.classCard} ${carClass === idx ? styles.activeClass : ''}`}
                onClick={() => setCarClass(idx)}
              >
                <div className={styles.iconBox}>{item.icon}</div>
                <span className={styles.classText}>{idx + 1} Класс</span>
                <span className={styles.classSubText}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- ТАБЫ --- */}
        <div className={styles.mainTabs}>
          {Object.keys(SERVICES_DATA).map(key => (
            <button 
              key={key}
              className={`${styles.mainTab} ${activeMain === key ? styles.activeMain : ''}`} 
              onClick={() => setActiveMain(key)}
            >
              {SERVICES_DATA[key].title}
            </button>
          ))}
        </div>
        <div className={styles.subTabs}>
          {currentSubcategories.map((sub, idx) => (
            <button 
              key={sub.id} 
              className={`${styles.subTab} ${activeSub === idx ? styles.activeSub : ''}`} 
              onClick={() => setActiveSub(idx)}
            >
              {sub.title}
            </button>
          ))}
        </div>

        {/* --- СЕТКА КАРТОЧЕК --- */}
        <motion.div layout className={styles.grid}>
          {currentServices.map((service) => (
            <div 
              key={service.id} 
              className={`${styles.card} ${selectedIds.has(service.id) ? styles.selectedCard : ''}`}
              onClick={() => toggleService(service.id)}
            >
              <div className={styles.cardHeader}>
                <h3>{service.title}</h3>
                {selectedIds.has(service.id) && <FaCheck className={styles.checkIcon} />}
              </div>
              <p>{service.desc}</p>
              <div className={styles.cardFooter}>
                <span className={styles.price}>{service.prices[carClass].toLocaleString()} ₽</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* --- КОРЗИНА (FLOATING) --- */}
        <AnimatePresence>
          {selectedIds.size > 0 && (
            <motion.div className={styles.cartBar} initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}>
              <div className={styles.cartInfo}>
                <strong>{totalPrice.toLocaleString()} ₽</strong>
                <p>{selectedIds.size} услуг выбрано</p>
              </div>
              <button className={styles.orderBtn} onClick={handleOpenBooking}>
                Записаться <FaShoppingBag />
              </button>
            </motion.div>
          )}
        </AnimatePresence>


        {/* --- МОДАЛКА ТАБЛИЦЫ --- */}
        {showClassInfo && (
          <div className={styles.modalOverlay} onClick={() => setShowClassInfo(false)}>
            <div className={styles.modalContentWide} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>Классификация по моделям</h3>
                <FaTimes className={styles.closeIcon} onClick={() => setShowClassInfo(false)} />
              </div>
              <div className={styles.tableScroll}>
                <table className={styles.customTable}>
                  <thead>
                    <tr>
                      <th>Марка</th>
                      {CLASS_ICONS.map((_, i) => <th key={i}>{i+1} кл.</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {CAR_CLASSIFICATION_DATA.map((row, i) => (
                      <tr key={i}>
                        <td>{row.brand}</td>
                        {row.models.map((m, j) => <td key={j}>{m}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;