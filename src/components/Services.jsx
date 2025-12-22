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
          { id: "tec", title: "Мойка мотоцикла", desc: "Бесконтактная мойка кузова, сушка и чистка ковриков.", prices: [400, 400, 400, 400, 400] },
          { id: "tech", title: "Бесконтактная мойка", desc: "Бесконтактная мойка (кузов, арки и коврики салона).", prices: [400, 500, 600, 700, 800] },
          { id: "euro", title: "Сухая/Двухфазная мойка", desc: "Двухфазная мойка кузова с использованием шампуня  (кузов, арки и коврики салона).", prices: [600, 700, 800, 1100, 1300] },
          { id: "lux", title: "НАНО (3х-фазная) мойка кузова", desc: "-обработка первичным составом -ручная мойка НАНОшампунем -мойка колёсных дисков, выхлопных труб -покрытие кузова наноконсерватом - осушителем", prices: [900, 1000, 1200, 1500, 1800] },
          { id: "polymer", title: "Полимер -пакет", desc: "Бесконтактная мойка кузова, полимерное покрытие.", prices: [800, 900, 1150, 1250, 1500] },
          { id: "quartz", title: "Quartz - Light", desc: "Бесконтактная мойка кузова, обезжиривание и кварцевое покрытие (кварцевание).", prices: [2100, 2300, 3000, 3500, 4000] },
        ]
      },
      {
        id: "complex",
        title: "Комплексы",
        items: [
          { id: "std", title: "Комплекс 'Стандарт'", desc: "Кузов, сушка, пороги, коврики, чистка салона, стекла, чернение резины.", prices: [900, 1000, 1200, 1700, 1700] },
          { id: "prem", title: "2х-фазный Комплекс", desc: "Мойка кузова с использованием шампуня для бережной мойки, арки, пороги, коврики, пылесос салона, чистка педалей,мойка стёкол, чернение резины", prices: [1100, 1300, 1400, 1700, 1900] },
          { id: "hitech", title: "НАНО 3ёх-фазный Комплекс", desc: "Мойка кузова с использованием шампуня для бережной мойки, химчистка дисков, пылесос салона, мойка стёкол стеклоочистителем, влажная уборка салона очищающим составом, обработка кожи салона кондиционером, уборка багажника, чистка педалей, чернение резины", prices: [2000, 2300, 2700, 3000, 3300] },
          { id: "pro", title: "Комплекс 'Зимний пакет'", desc: "Комплекc 'Стандарт', обезжирование кузова, полимерное покрытие кузова, пылесос багажника, мойка дисков и выхлопных труб, обработка силиконом резиновых уплотнителей, чистка педалей, чернение резины", prices: [2400, 2700, 3300, 3800, 4000] },
          { id: "ceramic_wash", title: "Комплекс INSIDE", desc: "Бесконтактная мойка кузова, протирка всех пластиковых поверхностей и использованием полироли, пылесоса салона, кондиционер кожи всех сидений и обшивок, уборка багажника, азонация салона", prices: [2200, 2400, 2800, 3100, 3300] },
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
          { id: "ceramic_protect", title: "Cquarts HydrO2", desc: "Гидро 'Бомба' - защитное кварцевое покрытие.", prices: [1300, 1450, 1650, 1850, 2050] },
          { id: "protect_polymer", title: "Полимерное покрытие", desc: "мгновенный, глубокий блеск и защита ЛКП, пластика, хрома, гидрофобный эффект.", prices: [400, 450, 550, 600, 700] },
          { id: "metal_clean", title: "Обезжиривание кузова", desc: "Удаление битума, загрязнений и металлических вкраплений.", prices: [2000, 2500, 3000, 3500, 4000] },
          { id: "wax_coat", title: "Воск", desc: "Покрытие кузова горячим воском.", prices: [300, 350, 400, 450, 500] },
          { id: "hydro", title: "Антидождь", desc: "Передняя полусфера.", prices: [1500, 1500, 1500, 1600, 1800] },
          { id: "restore_paint", title: "Ручная полировка", desc: "Ручная полировка кузова натуральным воском.", prices: [2000, 2500, 3000, 3500, 4000] },
          { id: "polish_head", title: "Востановление цвета", desc: "Востановление цвета и блеска кузова, бесконтактная мойка, удаление паутинок, помутнений.", prices: [5000, 7000, 10000, 15000, 18000] },
          { id: "ceramic_pro", title: "Профессиональная керамика", desc: "Ручная чистка кузова, полировка, керамическое покрытие.", prices: [2900, 3500, 3900, 4300, 5000] },
          { id: "ppf", title: "Полировка Фар", desc: "Полировка Фар (задних фонарей, повторителей поворотников).", prices: [600, 600, 600, 600, 600] },
          { id: "remove_scratches", title: "Ручная чистка кузова Глиной Clay Magic", desc: "Глубоко очищает поверхность, удалчяет все стойкие и невидимые загрязнения, делая поверхность гладкой как стекло и кристально чистой.", prices: [2000, 2500, 3000, 3500, 4000] },
          { id: "remove_insects", title: "Полная образивная полировка ЛКП", desc: "Бесконтактная мойка, удалиние царапин, паутинок, затираний, помутнений, восстановление цвета и блеска.", prices: [15000, 17000, 20000, 25000, 25000] },
          { id: "remove_bitumen", title: "Удаление царапин", desc: "", prices: ["от 700 ₽", "от 700 ₽", "от 700 ₽", "от 700 ₽", "от 700 ₽"] },
          { id: "tire_shine", title: "Удаление насекомых", desc: "", prices: ["от 100 ₽", "от 100 ₽", "от 100 ₽", "от 100 ₽", "от 100 ₽"] },
          { id: "engine_protect", title: "Удаление тополиных точек", desc: "", prices: ["от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽"] },
          { id: "engine_protec", title: "Удаление битумных пятен", desc: "", prices: ["от 300 ₽ за деталь", "от 300 ₽ за деталь", "от 300 ₽ за деталь", "от 300 ₽ за деталь", "от 300 ₽ за деталь"] },
          { id: "pp", title: "	Чернение резины", desc: "", prices: [200, 200, 200, 200, 200] },
          { id: "remove_bitume", title: "	Чистка хрома", desc: "", prices: ["от 300 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽"] },
          { id: "remove_bitum", title: "	BUMPER COAT", desc: "Защитное покрытие пластика", prices: ["от 3000 ₽", "от 3000 ₽", "от3000 ₽", "от 3000 ₽", "от 3000 ₽"] },
          { id: "wax_coa", title: "Мойка двигателя и моторного отсека с продувкой воздухом", desc: "(Производится по согласованию гостя и под его ответственность.", prices: [550, 600, 650, 700, 750] },

        ]
      },
      {
        id: "interior",
        title: "Уход за салоном",
        items: [
          { id: "dry_vacuum", title: "Пылесос салона", desc: "Сухая чистка салона пылесосом.", prices: ["от 200 ₽", "от 250 ₽", "от 300 ₽", "от 300 ₽", "от 400 ₽"] },
          { id: "trunk_vacuum", title: "Уборка багажника", desc: "", prices: [200, 200, 200, 200, 300] },
          { id: "plastic_clean", title: "Протирка пластика", desc: "Протирка пластиковых деталей с полиролью.", prices: [200, 250, 250, 300, 300] },
          { id: "glass_protet", title: "Протирка приборной панели", desc: "", prices: [100, 100, 100, 150, 150] },
          { id: "glass_protect", title: "Протирка стекол", desc: "Протирка стекол изнутри.", prices: [200, 250, 250, 300, 300] },
          { id: "glass_prote", title: "	Протирка лобового стекла изнутри", desc: "", prices: [100, 100, 100, 100, 100] },
          { id: "dry_vacu", title: "Очистка стёкл от клея 1 шт.", desc: "Сухая чистка салона пылесосом.", prices: ["от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽"] },
          { id: "leather_care", title: "Уход за кожей", desc: "	Обработка сидений кондиционером для кожи 1 шт.", prices: [250, 250, 250, 250, 250] },
          { id: "deodorize", title: "	Обработка силиконом резиновых уплотнений", desc: "", prices: [150, 150, 200, 200, 200] },
          { id: "dry_ice", title: "Сухой туман", desc: "Удаление запахов и ароматизация.", prices: [1000, 1000, 1000, 1000, 1000] },
          { id: "silence", title: "	Озонация салона", desc: "", prices: [1000, 1000, 1000, 1000, 1000] }, 
          { id: "dry_cu", title: "Очистка лобового стекла от клея 1 шт.", desc: "", prices: ["от 1500 ₽", "от 1500 ₽", "от 1500 ₽", "от 2000 ₽", "от 2000 ₽"] },
          { id: "silen", title: "Протирка пластиковых деталей салона молочком	", desc: "", prices: [200, 250, 250, 300, 300] },
        ]
      },
      {
        id: "dryclean",
        title: "Химчистка",
        items: [
          { id: "seats", title: "	Химчистка салона", desc: "Зависит от степени загрязненности.", prices: ["от 7000 ₽", "от 9000 ₽", "от 10000 ₽", "от 12000 ₽", "от 14000 ₽"] },
          { id: "roof", title: "Химчистка потолка", desc: "Зависит от степени загрязненности.", prices: ["от 1500 ₽", "от 2000 ₽", "от 2000 ₽", "от 2000 ₽", "от 2000 ₽"] },
          { id: "floor", title: "Химчистка пола", desc: "Зависит от степени загрязненности.", prices: ["от 2000 ₽", "от 2000 ₽", "от 2000 ₽", "от 2000 ₽", "от 2000 ₽"] },
          { id: "door", title: "Химчистка дверей", desc: "Зависит от степени загрязненности.", prices: ["от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽"] },
          { id: "dashboard", title: "Химчистка панели приборов", desc: "Зависит от степени загрязненности.", prices: [1500, 1500, 1500, "от 1500 ₽", "от 1500 ₽"] },
          { id: "trunk", title: "Химчистка багажника", desc: "Зависит от степени загрязненности.", prices: ["от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽"] },
          { id: "tru", title: "Химчистка сидений", desc: "Зависит от степени загрязненности.", prices: ["от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽"] },
          { id: "tu", title: "Химчистка дисков", desc: "Зависит от степени загрязненности (за единицу)", prices: ["от 1000 ₽", "от 150 ₽", "от 150 ₽", "от 150 ₽", "от 150 ₽"] },
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

  // Функция для форматирования цены (поддержка строк типа "от 700")
  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return `${price.toLocaleString()} ₽`;
  };

  // Функция для извлечения числового значения из цены (для подсчета суммы)
  const getNumericPrice = (price) => {
    if (typeof price === 'string') {
      // Извлекаем число из строки типа "от 700" или "от 700 ₽"
      const match = price.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    }
    return price;
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
  // Подсчет суммы с учетом строковых цен
  const totalPrice = selectedDetails.reduce((acc, item) => {
    const numericPrice = getNumericPrice(item.currentPrice);
    return acc + numericPrice;
  }, 0);
  
  // Проверяем, есть ли цены со строкой "от"
  const hasFromPrices = selectedDetails.some(item => 
    typeof item.currentPrice === 'string' && item.currentPrice.toLowerCase().includes('от')
  );

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
                <span className={styles.price}>
                  {typeof service.prices[carClass] === 'string' 
                    ? service.prices[carClass] 
                    : `${service.prices[carClass].toLocaleString()} ₽`}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* --- КОРЗИНА (FLOATING) --- */}
        <AnimatePresence>
          {selectedIds.size > 0 && (
            <motion.div className={styles.cartBar} initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}>
              <div className={styles.cartInfo}>
                <strong>
                  {hasFromPrices ? 'от ' : ''}{totalPrice.toLocaleString()} ₽
                </strong>
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