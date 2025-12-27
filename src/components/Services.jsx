import React, { useState, useEffect } from 'react';
import styles from './Services.module.css';
import { Reveal } from './ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaCheck, FaShoppingBag, FaTimes, FaCarSide, FaTruckMonster, FaShuttleVan, FaMotorcycle } from 'react-icons/fa';
import { MdDirectionsCar, MdOutlineDirectionsCarFilled } from 'react-icons/md';

// Данные классификации (те же, что из таблиц)
const CAR_CLASSIFICATION_DATA = [
  { brand: "ACURA", models: ["-", "RSX", "ILX, TSX", "RLX, TSX, TL", "MDX, RDX, ZDX"] },
  { brand: "ALFA ROMEO", models: ["Mito", "147, 159, Giulietta, 4C", "Brera", "-", "-"] },
  { brand: "ASTON MARTIN", models: ["-", "-", "-", "Rapide, Vantage, DB, Lagonda, Vanquish, Vulcan", "-"] },
  { brand: "AUDI", models: ["A1, A2, TT", "A3, A4", "A5, A6, A7, Allroad, A8, Q3, Q5", "Q7", "R8, Q8"] },
  { brand: "BENTLEY", models: ["-", "-", "-", "-", "Arnage, Continental GT, Flying Spur, Mulsanne"] },
  { brand: "BMW", models: ["-", "1, 3, 4 series", "5, 6, 7 series, Z3, Z4, X1, X3, X4", "X5, X6", "X7"] },
  { brand: "CADILLAC", models: ["-", "-", "CTS, STS, BLS, ATS", "-", "Escalade, SRX"] },
  { brand: "CHEVROLET", models: ["Spark", "Aveo, Cobalt, Cruze, Lacetti, Lanos", "Camaro, Malibu, Niva, Orlando", "Captiva, Trailblazer", "Tahoe"] },
  { brand: "CHRYSLER", models: ["-", "Crossfire", "200, 300, Sebring, PT Cruiser", "Voyager", "Town & Country"] },
  { brand: "CITROEN", models: ["C1, C2", "C3, C4, DS3, Berlingo", "C4 Picasso, C4 Aircross, C5, C6, C8", "C-crosser, Grand C4", "Jumper"] },
  { brand: "DAEWOO", models: ["Matiz", "Nexia", "Espero", "-", "-"] },
  { brand: "DODGE", models: ["-", "-", "Challenger, Charger, Caliber", "Caravan", "Journey, RAM"] },
  { brand: "FIAT", models: ["500", "Albea, Barchetta, Bravo, Linea, Punto, Stilo", "Panorama, Sedici", "Freemont", "Ducato"] },
  { brand: "FORD", models: ["Fiesta", "Fusion, Focus", "Kuga, Maverick, Mustang, C-max, Mondeo", "Galaxy, S-max", "Explorer, Transit"] },
  { brand: "GENESIS", models: ["-", "-", "G70, G80, GV80, G90, G90L", "-", "-"] },
  { brand: "HONDA", models: ["Jazz", "Civic, N-WGN", "Accord, Legend, Crosstour, CR-V", "-", "Pilot"] },
  { brand: "HUMMER", models: ["-", "-", "-", "-", "H1, H2, H3"] },
  { brand: "HYUNDAI", models: ["Getz", "Accent, Solaris, Elantra, Veloster", "Sonata, i40, NF, Genesis, ix35, Equus, Creta", "Santa Fe, Tucson, Palisade", "H-1"] },
  { brand: "ISUZU", models: ["-", "-", "VehiCross", "D-Max, Trooper, Rodeo, Axiom", "-"] },
  { brand: "INFINITI", models: ["-", "Q30", "Q50, Q60, Q70, QX50, QX70", "QX60", "QX80"] },
  { brand: "JAGUAR", models: ["-", "-", "S-type, XF, X-type", "XK, XJ", "-"] },
  { brand: "JEEP", models: ["-", "-", "Compass, Liberty", "Cherokee, Wrangler, Grand Cherokee", "Wrangler Unlimited"] },
  { brand: "KIA", models: ["Picanto", "Ceed, Rio, Spectra, Venga, Cerato", "Carens, Magentis, Opirus, Optima, Soul, Sportage, Quoris", "Sorento, Carnival", "Mohave"] },
  { brand: "LADA", models: ["2101-2115", "Приора, Гранта, Веста", "Largus, Веста Кросс", "-", "-"] },
  { brand: "LAMBORGHINI", models: ["-", "-", "-", "Aventador, Murcielago, Gallardo, Huracan", "Urus"] },
  { brand: "LAND ROVER", models: ["-", "-", "Evoque", "Freelander, Sport", "Discovery, Defender, Range Rover, Vogue, RR Sport"] },
  { brand: "LEXUS", models: ["-", "-", "CT, ES, GS, IS, LS, NX", "RX", "GX, LX"] },
  { brand: "MASERATI", models: ["-", "-", "-", "-", "Ghibli, Granturismo, Quattroporte"] },
  { brand: "MAYBACH", models: ["-", "-", "-", "-", "57, 62, Guard"] },
  { brand: "MAZDA", models: ["2", "3, MX-5, RX-8", "6, CX-3, CX-5, CX-6", "CX-7, CX-9", "BT-50"] },
  { brand: "MERCEDES", models: ["Smart", "A, B, SLK", "C, CLA, E, GLK, GLC, CLS, SL, M, SLS", "ML, GLE, S-Class", "V-Class, X-Class, Vito, G-Klass, AMG, GLS, GL"] },
  { brand: "MINI", models: ["-", "Cooper", "Countryman, Paceman", "-", "-"] },
  { brand: "MITSUBISHI", models: ["Colt, I-Miev", "Carisma, Lancer", "Galant, ASX, Outlander", "Pajero", "L200"] },
  { brand: "NISSAN", models: ["Micra", "Almera, Note, Tiida", "Primera, Teana, Juke, Qashqai, GTR", "Murano, Pathfinder, X-Trail", "Navara, Patrol"] },
  { brand: "OPEL", models: ["-", "Astra, Corsa", "Insignia, Meriva, Vectra, Zafira", "Antara", "-"] },
  { brand: "PEUGEOT", models: ["107", "206, 208, 207, 301, 307, 308", "407, 408, 605, 508, RCZ, Partner", "3008, 4007, 4008", "Boxer"] },
  { brand: "PORSCHE", models: ["-", "-", "Boxster, Cayman, 911, Macan, Panamera", "Cayenne", "-"] },
  { brand: "RENAULT", models: ["-", "Clio, Logan, Megane, Sandero, Symbol", "Fluence, Kangoo, Latitude, Laguna, Scenic, Duster", "Koleos", "Trafic, Master"] },
  { brand: "ROLLS-ROYCE", models: ["-", "-", "-", "-", "Ghost, Mulsanne, Phantom, Wraith, Cullinan"] },
  { brand: "SAAB", models: ["-", "900", "9000, 95, 93", "-", "-"] },
  { brand: "SSANGYONG", models: ["-", "-", "-", "Sport Pick-Up, Rodius, Actyon, Rexton, Kayron", "-"] },
  { brand: "SEAT", models: ["-", "Ibiza, Leon", "Freetrack", "Alhambra", "-"] },
  { brand: "SKODA", models: ["-", "Fabia, Rapid", "Octavia, Roomster, Yeti, Superb, Karoq", "Kodiaq", "-"] },
  { brand: "SUBARU", models: ["-", "Impreza, XV", "BRZ, Legacy", "Forester, Outback, Tribeca", "-"] },
  { brand: "SUZUKI", models: ["Splash", "Liana, SX4, Swift", "Kizashi", "Grand Vitara", "-"] },
  { brand: "TOYOTA", models: ["Yaris", "Auris, Corolla, Verso", "Avensis, GT, Camry, RAV-4, Venza, Prius", "Highlander, LC 100, RAV-4 (new)", "Alphard, LC 200, LC 300, Hiace, Sequoia, Tundra, Fortuner, Prado"] },
  { brand: "VOLKSWAGEN", models: ["Lupo", "Beetle, Bora, Golf, Polo, Scirocco, Jetta", "Caddy, CC, Passat, Tiguan, Touran, Phaeton, Sharan", "Touareg", "Amarok, Multivan, Caravelle, Transporter, Crafter, Teramont"] },
  { brand: "VOLVO", models: ["-", "C30, C70, S40", "S60, S80, V40, XC60, XC70, XC40, V70, V90", "XC90", "-"] },
  { brand: "GEELY", models: ["-", "-", "Atlas, Coolray, SX-11", "Tugella", "-"] },
  { brand: "CHERY", models: ["-", "-", "Tiggo 4", "Tiggo 7, Tiggo 7 Pro, Tiggo 8 Pro", "-"] },
  { brand: "HAVAL", models: ["-", "-", "-", "H9, Jolion, F7", "Gwmwingle7"] }
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
          { id: "tech", title: "Бесконтактная мойка", desc: "Бесконтактная мойка (кузов, арки и коврики салона).", prices: [600, 650, 800, 900, 1100] },
          { id: "euro", title: "Двухфазная мойка", desc: "Двухфазная мойка кузова с использованием шампуня  (кузов, арки и коврики салона).", prices: [750, 900, 1150, 1400, 1650] },
          { id: "lux", title: "НАНО (3х-фазная) мойка кузова", desc: "-обработка первичным составом -ручная мойка НАНОшампунем -мойка колёсных дисков, выхлопных труб -покрытие кузова наноконсерватом - осушителем", prices: [1150, 1250, 1500, 1900, 2250] },
          { id: "quartz", title: "Quartz - Light", desc: "Бесконтактная мойка кузова, обезжиривание и кварцевое покрытие (кварцевание).", prices: [2100, 2500, 3000, 3500, 4000] },
        ]
      },
      {
        id: "complex",
        title: "Комплексы",
        items: [
          { id: "prem", title: "2х-фазный Комплекс", desc: "Мойка кузова с использованием шампуня для бережной мойки, арки, пороги, коврики, пылесос салона, чистка педалей,мойка стёкол, чернение резины", prices: [1500, 1650, 1900, 2250, 2500] },
          { id: "hitech", title: "НАНО 3ёх-фазный Комплекс", desc: "Мойка кузова с использованием шампуня для бережной мойки, химчистка дисков, пылесос салона, мойка стёкол стеклоочистителем, влажная уборка салона очищающим составом, обработка кожи салона кондиционером, уборка багажника, чистка педалей, чернение резины", prices: [2800, 3200, 3700, 4200, 4700] },
          { id: "pro", title: "Комплекс 'Зимний пакет'", desc: "Комплекc 'Стандарт', обезжирование кузова, полимерное покрытие кузова, пылесос багажника, мойка дисков и выхлопных труб, обработка силиконом резиновых уплотнителей, чистка педалей, чернение резины", prices: [3000, 3400, 4150, 4500, 5000] },
          { id: "ceramic_wash", title: "Комплекс INSIDE", desc: "Бесконтактная мойка кузова, протирка всех пластиковых поверхностей и использованием полироли, пылесоса салона, кондиционер кожи всех сидений и обшивок, уборка багажника, азонация салона", prices: [2750, 3000, 3250, 3500, 3875] },
        ]
      },
      {
        id: "coatings",
        title: "Покрытия кузова",
        items: [
          { id: "ceramic_protect", title: "Cquarts HydrO2", desc: "Гидро 'Бомба' - защитное кварцевое покрытие.", prices: [1300, 1450, 1650, 1850, 2050] },
          { id: "metal_clean", title: "Обезжиривание кузова", desc: "Удаление битума, загрязнений и металлических вкраплений.", prices: [2500, 3150, 3750, 4400, 5000] },
          { id: "wax_coat", title: "Воск", desc: "Покрытие кузова горячим воском.", prices: [400, 450, 500, 650, 800] },
          { id: "tie", title: "Покрытие кузова керамикой", desc: "", prices: ["от 40000 ₽", "от 40000 ₽", "от 40000 ₽", "от 40000 ₽", "от 40000 ₽"] },
          { id: "hydro", title: "Антидождь", desc: "Передняя полусфера.", prices: [1900, 15900, 1900, 2000, 2250] },
          { id: "polish_head", title: "Востановление цвета", desc: "Востановление цвета и блеска кузова, бесконтактная мойка, удаление паутинок, помутнений.", prices: ["от 10000 ₽", "от 12000 ₽", "от 15000 ₽", "от 15000 ₽", "от 18000 ₽"] },
          { id: "remove_scratches", title: "Ручная чистка кузова Глиной Clay Magic", desc: "Глубоко очищает поверхность, удалчяет все стойкие и невидимые загрязнения, делая поверхность гладкой как стекло и кристально чистой.", prices: [3200, 3800, 4400, 5000, 5650] },
          { id: "tire_shine", title: "Удаление насекомых", desc: "", prices: ["от 300 ₽", "от 300 ₽", "от 300 ₽", "от 300 ₽", "от 300 ₽"] },
          { id: "engine_protect", title: "Удаление тополиных точек", desc: "", prices: ["от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽"] },
          { id: "engine_protec", title: "Удаление битумных пятен", desc: "", prices: ["от 500 ₽ за деталь", "от 500 ₽ за деталь", "от 500 ₽ за деталь", "от 500 ₽ за деталь", "от 500 ₽ за деталь"] },
          { id: "pp", title: "	Чернение резины", desc: "", prices: [300, 300, 300, 300, 300] },
          { id: "remove_bitume", title: "	Чистка хрома", desc: "", prices: ["от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽", "от 500 ₽"] },
          { id: "remove_bitum", title: "	BUMPER COAT", desc: "Защитное покрытие пластика", prices: ["от 3000 ₽", "от 3000 ₽", "от 3000 ₽", "от 3000 ₽", "от 3000 ₽"] },
          { id: "wax_coa", title: "Мойка двигателя и моторного отсека с продувкой воздухом", desc: "(Производится по согласованию гостя и под его ответственность.", prices: [700, 750, 850, 900, 950] },

        ]
      },
      {
        id: "interior",
        title: "Уход за салоном",
        items: [
          { id: "dry_vacuum", title: "Пылесос салона", desc: "Сухая чистка салона пылесосом.", prices: ["от 250 ₽", "от 300 ₽", "от 350 ₽", "от 350 ₽", "от 450 ₽"] },
          { id: "trunk_vacuum", title: "Уборка багажника", desc: "", prices: [300, 300, 300, 300, 400] },
          { id: "plastic_clean", title: "Протирка пластика", desc: "Протирка пластиковых деталей с полиролью.", prices: [250, 300, 300, 350, 400] },
          { id: "glass_protet", title: "Протирка приборной панели", desc: "", prices: [200, 200, 200, 250, 300] },
          { id: "glass_protect", title: "Протирка стекол", desc: "Протирка стекол изнутри.", prices: [250, 300, 300, 350, 400] },
          { id: "glass_prote", title: "	Протирка лобового стекла изнутри", desc: "", prices: [200, 200, 200, 200, 250] },
          { id: "dry_vacu", title: "Очистка стёкл от клея 1 шт.", desc: "Сухая чистка салона пылесосом.", prices: ["от 700 ₽", "от 700 ₽", "от 700 ₽", "от 700 ₽", "от 700 ₽"] },
          { id: "leather_care", title: "Уход за кожей", desc: "	Обработка сидений кондиционером для кожи 1 шт.", prices: [300, 300, 300, 300, 300] },
          { id: "deodorize", title: "	Обработка силиконом резиновых уплотнений", desc: "", prices: [300, 300, 300, 300, 300] },
          { id: "dry_ice", title: "Сухой туман", desc: "Удаление запахов и ароматизация.", prices: [1300, 1300, 1300, 1300, 1300] },
          { id: "silence", title: "	Озонация салона", desc: "", prices: [1300, 1300, 1300, 1300, 1300] }, 
          { id: "dry_cu", title: "Очистка лобового стекла от клея 1 шт.", desc: "", prices: ["от 1900 ₽", "от 1900 ₽", "от 1900 ₽", "от 2500 ₽", "от 2500 ₽"] },
          { id: "silen", title: "Протирка пластиковых деталей салона молочком	", desc: "", prices: [250, 300, 300, 350, 350] },
        ]
      },
      {
        id: "bottom",
        title: "Мойка днища",
        items: [
          { id: "express_wash", title: "Экспресс мойка", desc: "Быстрая мойка днища автомобиля.", prices: [3000, 3000, 3000, 3500, 4000] },
          { id: "two_phase_bottom", title: "2-ух фазная мойка днища", desc: "Двухфазная мойка днища с использованием специальных составов.", prices: [4400, 4400, 4400, 5000, 6000] },
          { id: "wheel_remove", title: "Снятие/установка 1 колесо", desc: "Снятие и установка одного колеса для доступа к днищу.", prices: [400, 400, 400, 400, 400] },
          { id: "protection_remove", title: "Снятие/установка защиты", desc: "Снятие и установка защиты днища.", prices: [650, 650, 650, 650, 650] },
          { id: "fender_remove", title: "Снятие/установка подкрылок", desc: "Снятие и установка подкрылок для доступа к днищу.", prices: [1250, 1250, 1250, 1250, 1250] },
          { id: "detailing_bottom", title: "Детейлинг мойка днища", desc: "Полная детейлинг мойка днища с глубокой очисткой всех элементов.", prices: ["от 12000 ₽ до 20000 ₽", "от 12000 ₽ до 20000 ₽", "от 12000 ₽ до 20000 ₽", "от 15000 ₽ до 20000 ₽", "от 17000 ₽ до 25000 ₽"] },
          { id: "frame_wash", title: "Мойка рамы внутри", desc: "Мойка внутренней части рамы автомобиля.", prices: ["-", "-", 5000, 5000, 5000] },
        ]
      },
      {
        id: "radiator",
        title: "Мойка радиатора",
        items: [
          { id: "radiator_wash", title: "Мойка радиатора", desc: "Профессиональная мойка радиатора.", prices: [3000, 3000, 3500, 4000, 5000] },
          { id: "armature_work", title: "Арматурные работы автомобиля", desc: "", prices: ["от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽"] },
          { id: "intercooler_wash", title: "Мойка Интеркулера", desc: "Мойка интеркулера с использованием специальных средств.", prices: ["от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽"] },
        ]
      },
    ]
  },
  detailing: {
    title: "Детейлинг",
    subcategories: [

      {
        id: "dryclean",
        title: "Химчистка",
        items: [
          { id: "seats", title: "	Химчистка салона", desc: "Зависит от степени загрязненности.", prices: ["от 12000 ₽", "от 15000 ₽", "от 15000 ₽", "от 18000 ₽", "от 18000 ₽"] },
          { id: "roof", title: "Химчистка потолка", desc: "Зависит от степени загрязненности.", prices: ["от 2500 ₽", "от 2500 ₽", "от 2500 ₽", "от 2500 ₽", "от 2500 ₽"] },
          { id: "floor", title: "Химчистка пола", desc: "Зависит от степени загрязненности.", prices: ["от 3000 ₽", "от 3000 ₽", "от 3000 ₽", "от 3000 ₽", "от 3000 ₽"] },
          { id: "door", title: "Химчистка дверей", desc: "Зависит от степени загрязненности.", prices: ["от 800 ₽", "от 800 ₽", "от 800 ₽", "от 800 ₽", "от 800 ₽"] },
          { id: "dashboard", title: "Химчистка панели приборов", desc: "Зависит от степени загрязненности.", prices: ["от 2000 ₽", "от 2000 ₽", "от 2000 ₽", "от 2000 ₽", "от 2000 ₽"] },
          { id: "trunk", title: "Химчистка багажника", desc: "Зависит от степени загрязненности.", prices: ["от 1500 ₽", "от 1500 ₽", "от 1500 ₽", "от 1500 ₽", "от 1500 ₽"] },
          { id: "tru", title: "Химчистка сидений", desc: "Зависит от степени загрязненности.", prices: ["от 1900 ₽", "от 1900 ₽", "от 1900 ₽", "от 1900 ₽", "от 1900 ₽"] },
          { id: "tu", title: "Химчистка дисков", desc: "Зависит от степени загрязненности (за единицу)", prices: ["от 400 ₽", "от 400 ₽", "от 400 ₽", "от 400 ₽", "от 400 ₽"] },
        ]
      },
      {
        id: "polish",
        title: "Полировка",
        items: [
          { id: "restore_paint", title: "Ручная полировка", desc: "Ручная полировка кузова натуральным воском.", prices: [2500, 3200, 3800, 4400, 5000] },
          { id: "ppf", title: "Полировка Фар", desc: "Полировка Фар (задних фонарей, повторителей поворотников).", prices: ["от 1900 ₽", "от 1900 ₽", "от 1900 ₽", "от 1900 ₽", "от 1900 ₽"] },
          { id: "remove_insects", title: "Полная образивная полировка ЛКП", desc: "Бесконтактная мойка, удалиние царапин, паутинок, затираний, помутнений, восстановление цвета и блеска.", prices: ["от 18000 ₽", "от 20000 ₽", "от 23000 ₽", "от 28000 ₽", "от 28000 ₽"] },
          { id: "scratch_removal", title: "Удаление царапин", desc: "Удаление царапин с кузова.", prices: ["от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽", "от 1000 ₽"] },
        ]
      },
      {
        id: "soundproofing",
        title: "Шумоизоляция",
        items: [
          { id: "full_sound", title: "Пакет \"Комплексная шумоизоляция\"", desc: "Комплексная шумоизоляция всего автомобиля. Цена зависит от модели автомобиля.", prices: ["от 70000 ₽", "от 70000 ₽", "от 70000 ₽", "от 70000 ₽", "от 70000 ₽"] },
          { id: "floor_sound", title: "Шумоизоляция пола", desc: "Установка шумоизоляции на пол салона.", prices: ["от 35000 ₽", "от 35000 ₽", "от 35000 ₽", "от 35000 ₽", "от 35000 ₽"] },
          { id: "doors_sound", title: "Шумоизоляция дверей", desc: "Установка шумоизоляции на двери автомобиля.", prices: ["от 30000 ₽", "от 30000 ₽", "от 30000 ₽", "от 30000 ₽", "от 30000 ₽"] },
          { id: "roof_sound", title: "Шумоизоляция крыши", desc: "Установка шумоизоляции на крышу салона.", prices: ["от 15000 ₽", "от 15000 ₽", "от 15000 ₽", "от 15000 ₽", "от 15000 ₽"] },
          { id: "hood_sound", title: "Шумоизоляция капота", desc: "Установка шумоизоляции на капот.", prices: ["от 5000 ₽", "от 5000 ₽", "от 5000 ₽", "от 5000 ₽", "от 5000 ₽"] },
          { id: "trunk_sound", title: "Шумоизоляция багажника", desc: "Установка шумоизоляции в багажнике.", prices: ["от 28000 ₽", "от 28000 ₽", "от 28000 ₽", "от 28000 ₽", "от 28000 ₽"] },
          { id: "dashboard_sound", title: "Шумоизоляция торпеды", desc: "Установка шумоизоляции на торпеду (панель приборов).", prices: ["от 35000 ₽", "от 35000 ₽", "от 35000 ₽", "от 35000 ₽", "от 35000 ₽"] },
          { id: "wheel_arches_sound", title: "Шумоизоляция колесных арок с улицы", desc: "Установка шумоизоляции на колесные арки с внешней стороны.", prices: ["от 30000 ₽", "от 30000 ₽", "от 30000 ₽", "от 30000 ₽", "от 30000 ₽"] },
        ]
      },
      {
        id: "ppf",
        title: "Бронеплёнка",
        items: [
          { id: "risk_zones_ppf", title: "Оклейка зон риска", desc: "Оклейка зон риска: капот, фары, бампер, крылья, зеркала, стойки лобового, полоса на крышу. Срок выполнения: 5 часов.", prices: [90000, 90000, 90000, 90000, 90000] },
          { id: "full_body_ppf", title: "Оклейка всего кузова а/м (то что окрашено в цвет)", desc: "Полная оклейка всего кузова автомобиля (окрашенные элементы).", prices: [280000, 280000, 280000, 280000, 280000] },
          { id: "matte_ppf", title: "Оклейка кузова матовой бронеплёнкой.", desc: "", prices: [320000, 320000, 320000, 320000, 320000] },
          { id: "headlight_ppf", title: "Оклейка фар бронеплёнкой", desc: "Оклейка фар защитной плёнкой.", prices: [9000, 9000, 9000, 9000, 9000] },
        ]
      }
    ]
  },
  moto: {
    title: "Мото",
    subcategories: [
      {
        id: "moto_main",
        title: "Услуги для мотоциклов",
        items: [
          { 
            id: "moto_wash", 
            title: "Бесконтактная мойка мотоцикла", 
            desc: "Очистка кузова и двигателя мотоцикла специализированными составами.", 
            // Цены указаны одинаковыми для всех классов, так как для мото обычно нет деления на 5 классов авто
            prices: [700, 700, 700, 700, 700] 
          },
          { 
            id: "moto_detailing", 
            title: "Детейлинг мойка мотоцикла", 
            desc: "Глубокая чистка всех труднодоступных мест, чистка цепи, удаление битума и консервация пластика/хрома.", 
            prices: [3000, 3000, 3000, 3000, 3000] 
          },
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

  // Индекс класса "Мото" (6-й класс, индекс 5)
  const MOTO_CLASS_INDEX = 5;

  // Сброс подкатегории при смене вкладки
  useEffect(() => { 
    setActiveSub(0);
  }, [activeMain]);

  // Автоматическое переключение на категорию "Мото" при выборе класса "Мото"
  useEffect(() => {
    if (carClass === MOTO_CLASS_INDEX && activeMain !== 'moto') {
      setActiveMain('moto');
    } else if (carClass !== MOTO_CLASS_INDEX && activeMain === 'moto') {
      setActiveMain('carwash');
    }
  }, [carClass, activeMain]);

  // Блокировка скролла при открытии модалки классов
  useEffect(() => {
    if (showClassInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showClassInfo]);

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
    // Для класса "Мото" используем индекс 0, так как все цены одинаковые
    const priceIndex = carClass === MOTO_CLASS_INDEX ? 0 : carClass;
    Object.values(SERVICES_DATA).forEach(cat => {
      cat.subcategories.forEach(sub => {
        sub.items.forEach(item => {
          if (selectedIds.has(item.id)) {
            selected.push({ ...item, currentPrice: item.prices[priceIndex] });
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
    { icon: <FaShuttleVan />, label: "" },
    { icon: <FaMotorcycle />, label: "Мотоцикл" }
  ];

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <Reveal><h2 className={styles.heading}>Прайс-лист</h2></Reveal>

        {/* --- ВЫБОР КЛАССА --- */}
        <div className={styles.classSelectorWrapper}>
          <div className={styles.classHeaderRow}>
            <span className={styles.classLabel}>Класс вашего транспорта:</span>
            {carClass !== MOTO_CLASS_INDEX && (
              <button className={styles.infoBtn} onClick={() => setShowClassInfo(true)}>
                <FaInfoCircle /> Таблица классов
              </button>
            )}
          </div>
          <div className={styles.classGrid}>
            {CLASS_ICONS.map((item, idx) => (
              <button
                key={idx}
                className={`${styles.classCard} ${carClass === idx ? styles.activeClass : ''}`}
                onClick={() => setCarClass(idx)}
              >
                <div className={styles.iconBox}>{item.icon}</div>
                <span className={styles.classText}>
                  {idx === MOTO_CLASS_INDEX ? 'Мото' : `${idx + 1} Класс`}
                </span>
                <span className={styles.classSubText}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- ТАБЫ --- */}
        <div className={styles.mainTabs}>
          {Object.keys(SERVICES_DATA).map(key => {
            // Скрываем категорию "Мото" если выбран класс автомобиля (1-5)
            if (key === 'moto' && carClass !== MOTO_CLASS_INDEX) {
              return null;
            }
            // Скрываем все категории кроме "Мото" если выбран класс "Мото"
            if (key !== 'moto' && carClass === MOTO_CLASS_INDEX) {
              return null;
            }
            return (
              <button 
                key={key}
                className={`${styles.mainTab} ${activeMain === key ? styles.activeMain : ''}`} 
                onClick={() => setActiveMain(key)}
              >
                {SERVICES_DATA[key].title}
              </button>
            );
          })}
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
                  {(() => {
                    // Для класса "Мото" используем индекс 0, так как все цены одинаковые
                    const priceIndex = carClass === MOTO_CLASS_INDEX ? 0 : carClass;
                    const price = service.prices[priceIndex];
                    return typeof price === 'string' 
                      ? price 
                      : `${price.toLocaleString()} ₽`;
                  })()}
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
              <div className={styles.modalFooter}>
                <button className={styles.closeModalBtn} onClick={() => setShowClassInfo(false)}>
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;