import React, { useState, useMemo } from 'react';
import ProductCard from '../components/products/ProductCard';
import CategoryFilter from '../components/products/CategoryFilter'; // Asegúrate de que este path sea correcto
import ReservationDiscount from '../components/promos/ReservationDiscount';
import Hero from '../components/home/Hero';
import InfoSection from '../components/home/InfoSection';
import PromotionsModule from '../components/promos/PromotionsModule';
import parrilla from '../assets/img/parrilla.png';
import sandwiches from '../assets/img/sandwiches.png';
import guarniciones from '../assets/img/guarniciones.png';
import cajitaInfantil from '../assets/img/cajitaInfantil.png';
import bebidas from '../assets/img/bebidas.png';
import eventos from '../assets/img/eventos.png';
import promociones from '../assets/img/promociones.png';
import postres from '../assets/img/postres.png';

// Datos de productos (sin cambios)
const allProductsData = [
  { id: 1, name: "Bife de Chorizo", category: "Parrilla", description: "Corte clásico argentino.", image: "https://placehold.co/400x250/A62A2A/white?text=Bife" },
  { id: 2, name: "Promo Burger", category: "Promociones", description: "Con queso y panceta.", price: 1500, image: "https://placehold.co/400x250/EAA000/white?text=Promo+Burger" },
  { id: 3, name: "Papas Fritas", category: "Guarniciones", description: "Crujientes por fuera.", image: "https://placehold.co/400x250/C7C7C7/black?text=Papas" },
  { id: 4, name: "Asado de Tira", category: "Parrilla", description: "El favorito de todos.", image: "https://placehold.co/400x250/A62A2A/white?text=Asado" },
  { id: 5, name: "Promo Lomo", category: "Promociones", description: "Lomo completo + bebida.", price: 2000, image: "https://placehold.co/400x250/EAA000/white?text=Promo+Lomo" },
];

// MODIFICACIÓN CLAVE: Array de objetos con el nombre y la URL del ícono.
// *** REEMPLAZA ESTAS URLs con las de tus iconos PNG ***
const categoriesData = [
  { name: "Parrilla", iconUrl: parrilla }, // Ícono de ejemplo
  { name: "Sandwiches", iconUrl: sandwiches }, // Ícono de ejemplo
  { name: "Guarniciones", iconUrl: guarniciones }, // Ícono de ejemplo
  { name: "Cajita Infantil", iconUrl: cajitaInfantil }, // Ícono de ejemplo
  { name: "Bebidas", iconUrl: bebidas }, // Ícono de ejemplo
  { name: "Eventos", iconUrl: eventos }, // Ícono de ejemplo
  { name: "Promociones", iconUrl: promociones }, // Ícono de ejemplo
  { name: "Postres", iconUrl: postres } // Ícono de ejemplo
];


// 1. Recibe solo 'arePromosActive'
const CatalogView = ({ arePromosActive }) => {
  
  // El estado local se mantiene. Inicializamos con el nombre de la primera categoría.
  const [isReservationDiscountActive, setIsReservationDiscountActive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0].name); 
  const [allProducts, setAllProducts] = useState(allProductsData);

  const filteredProducts = useMemo(() => {
    // Filtra productos donde el campo 'category' coincide con el 'selectedCategory' (string)
    return allProducts.filter(p => p.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  return (
    <>
      <Hero />

      {/* 2. Pasa 'arePromosActive' al Módulo de Promos */}
      <PromotionsModule 
        allProducts={allProducts}
        arePromosActive={arePromosActive}
      />

      {/* Catálogo Completo */}
      <div id="catalogo" className="container mx-auto p-4 pt-12">
        {isReservationDiscountActive && <ReservationDiscount />}
        
        {/* CategoryFilter ahora recibe el array de objetos */}
        <CategoryFilter
          categories={categoriesData}
          selectedCategory={selectedCategory}
          onFilter={setSelectedCategory}
        />
        
        <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
          {selectedCategory}
        </h2>

        {/* 3. Pasa 'arePromosActive' a las tarjetas de producto */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              arePromosActive={arePromosActive}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <p className="text-gray-600 text-center py-12">
            No hay productos en esta categoría por el momento.
          </p>
        )}
      </div>
      <InfoSection />
    </>
  );
};

export default CatalogView;