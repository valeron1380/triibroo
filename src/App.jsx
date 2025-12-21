import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BotButton from './components/BotButton';
import Hero from './components/Hero'; // Если есть
import Services from './components/Services';
import Promo from './components/Promo';
import BeforeAfter from './components/BeforeAfter';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contacts from './components/Contacts';
import Footer from './components/Footer'; // Если есть
import BookingModal from './components/BookingModal';

function App() {
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Прокрутка наверх при загрузке и обновлении страницы
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleOpenBooking = (data = null) => {
    setOrderData(data);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setOrderData(null);
  };

  return (
    <div className="App">
      <Header onOpenBooking={() => handleOpenBooking()} />

      <BotButton />
      {/* Если у вас есть Hero (Главный экран) */}
      <Hero /> 

      <Services onOpenBooking={handleOpenBooking} />

      


      <Gallery />
      
      {/* Процесс работы (если был ранее) */}
      {/* <Process /> */}
            {/* Слайдер "До/После" */}
            <BeforeAfter />
      <Promo />
      {/* Отзывы */}
      <Reviews />

      {/* Контакты и Карта */}
      <Contacts />

      <Footer />

      {/* Общая модалка записи */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={handleCloseBooking}
        orderData={orderData}
      />
    </div>
  );
}

export default App;