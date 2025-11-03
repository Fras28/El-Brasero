import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext'; // <-- Importamos el Hook
import { ShoppingCart, X } from 'lucide-react'; // <-- Iconos

const CartSummary = () => {
  const [showSummary, setShowSummary] = useState(false);
  
  // Obtenemos todo el estado del carrito desde el contexto
  const { items, removeItem, totalPrice, itemCount } = useCart();

  // Número de WhatsApp (debe incluir el código de país)
  const WHATSAPP_NUMBER = "549XXXXXXXXXX"; // (El PDF pide esta info)

  // useMemo para calcular el link de WhatsApp
  const whatsappLink = useMemo(() => {
    let message = "¡Hola El Brasero! Quisiera hacer el siguiente pedido:\n\n";
    
    items.forEach(item => {
      message += `* (x${item.quantity}) ${item.name}\n`;
    });
    
    message += `\nTotal (aprox): $${totalPrice}\n`;
    message += "\nPor favor, confirmar mi pedido.";

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [items, totalPrice]);

  if (itemCount === 0 && !showSummary) {
    return null; // No mostrar el botón si el carrito está vacío
  }

  return (
    <>
      {/* Botón flotante del carrito */}
      <div className="fixed bottom-4 right-4 z-40">
        <button 
          onClick={() => setShowSummary(true)} 
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all relative"
        >
          <ShoppingCart size={24} />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        </button>
      </div>

      {/* Modal/Resumen del Pedido */}
      {showSummary && (
        <div 
          onClick={() => setShowSummary(false)} 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()} // <-- Reemplaza @click.stop
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Resumen de tu Pedido</h2>
            
            {/* Lista de Items */}
            <div className="max-h-64 overflow-y-auto mb-4 divide-y">
              {items.length > 0 ? (
                items.map(item => (
                  <div key={item.id} className="py-2 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.name} (x{item.quantity})</p>
                      {item.price && (
                        <p className="text-sm text-gray-600">${item.price}</p>
                      )}
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                      <X size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Tu carrito está vacío.</p>
              )}
            </div>

            {items.length > 0 && (
              <>
                <p className="text-lg font-bold text-right mb-4">
                  Total (aprox): ${totalPrice}
                </p>
                {/* Botón de WhatsApp */}
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer" // <-- Buena práctica de seguridad en React
                  className="w-full flex items-center justify-center py-3 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                >
                  {/* Icono de WhatsApp (SVG en línea) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.56-3.806-1.56-5.816C.184 6.643 5.407 1.42 12.028 1.42c6.62 0 11.842 5.223 11.842 11.843 0 6.62-5.223 11.843-11.843 11.843-1.944 0-3.793-.455-5.443-1.28L.057 24zM6.92 6.603c-.66 0-1.196.536-1.196 1.196 0 .66.536 1.196 1.196 1.196.66 0 1.196-.536 1.196-1.196 0-.66-.536-1.196-1.196-1.196zm7.258 10.39c-1.135 0-2.057-.922-2.057-2.057 0-1.135.922-2.057 2.057-2.057s2.057.922 2.057 2.057c0 1.135-.922 2.057-2.057 2.057zm4.336-4.336c-.66 0-1.196.536-1.196 1.196 0 .66.536 1.196 1.196 1.196.66 0 1.196-.536 1.196-1.196 0-.66-.536-1.196-1.196-1.196z"></path></svg>
                  <span className="ml-2">Finalizar Pedido por WhatsApp</span>
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartSummary;