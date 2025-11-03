import React, { createContext, useContext, useState, useMemo } from 'react';

// 1. Creamos el Contexto
const CartContext = createContext();

// 2. Creamos un "Hook" personalizado para consumir el contexto fácilmente
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Creamos el Componente "Provider" que manejará la lógica
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Lógica para añadir items
  const addItem = (product) => {
    setItems((prevItems) => {
      // 1. Revisa si el producto ya está en el carrito
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // 2. Si existe, actualiza la cantidad
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 3. Si no existe, añádelo con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Lógica para remover items (o decrementar)
  const removeItem = (productId) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === productId) {
            // Si la cantidad es > 1, solo la decrementa
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            // Si la cantidad es 1, lo elimina
            return null;
          }
          return item;
        })
        .filter(Boolean); // Filtra los 'null'
    });
  };

  // Lógica para calcular el total (usando useMemo para optimizar)
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      // Solo suma si el item tiene precio (como las promos)
      const price = item.price || 0;
      return total + price * item.quantity;
    }, 0);
  }, [items]);

  // Lógica para contar items (usando useMemo)
  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  // 4. Pasamos el estado y las funciones a los componentes hijos
  const value = {
    items,
    addItem,
    removeItem,
    totalPrice,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};