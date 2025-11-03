// Importa useState y useEffect
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartSummary from './components/cart/CartSummary';
import CatalogView from './views/CatalogView';
import { CartProvider } from './context/CartContext';

// Define las horas de inicio y fin (formato 24hs)
const PROMO_START_HOUR = 7;  // 7:00 AM
const PROMO_END_HOUR = 20; // 8:00 PM (las promos terminan a las 20:00:00)

function App() {
  // 1. Este estado sigue siendo la "única fuente de verdad"
  const [arePromosActive, setArePromosActive] = useState(false);

  // 2. Este useEffect actuará como el "vigilante"
  useEffect(() => {
    // Función que comprueba la hora actual
    const checkPromoTime = () => {
      const now = new Date();
      const currentHour = now.getHours(); // 0-23

      // La lógica:
      // Debe ser mayor o igual a las 7 AM
      // Y debe ser menor a las 8 PM (hora 20)
      const isActive = currentHour >= PROMO_START_HOUR && currentHour < PROMO_END_HOUR;
      
      setArePromosActive(isActive);
    };

    // 3. Comprueba la hora inmediatamente cuando la app carga
    checkPromoTime();

    // 4. Establece un intervalo para comprobar la hora cada segundo
    const intervalId = setInterval(checkPromoTime, 1000);

    // 5. Limpia el intervalo cuando el componente se "desmonta"
    return () => clearInterval(intervalId);

  }, []); // El array vacío [] asegura que esto se ejecute solo una vez (al montar)

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Header />

        <main>
          {/* 6. Pasa el estado 'arePromosActive'
             YA NO necesitamos pasar 'disablePromos' */}
          <CatalogView 
            arePromosActive={arePromosActive}
          />
        </main>

        <CartSummary />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;