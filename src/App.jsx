import React, { useState } from 'react'; // Importamos useState
// Importamos los iconos necesarios, incluyendo Menu y X para el toggle
import { Leaf, Zap, Globe, Users, TrendingUp, Phone, ChevronRight, Menu, X } from 'lucide-react';
import Logo from "../src/assets/tecnogen.png"
import VideoSolar from "../src/assets/SolarEnergy.mp4"
import MobileHeroImg from "../src/assets/HeroMobile.jpg"
// URL del video de fondo. ¡Reemplaza con tu propio video!
const DEFAULT_VIDEO_URL = VideoSolar; // Placeholder
// Color primario de la marca TechnoGen (el verde vibrante)
const PRIMARY_COLOR = '#0FE778';

// --- Componentes Reutilizables ---

// Botón primario de llamado a la acción
const PrimaryButton = ({ children, className = '' }) => (
  <button
    // Las clases se mantienen como string para Tailwind
    className={`
      bg-techno-green text-gray-900 font-semibold py-3 px-8 
      rounded-full shadow-lg hover:bg-opacity-90 
      transition duration-300 ease-in-out transform hover:scale-[1.02]
      flex items-center justify-center space-x-2 
      ${className}
    `}
  >
    {/* ANTES: <span>{children}</span>
      AHORA: Envolvemos los children con un div/span que también sea flex 
      para asegurar que el icono y el texto estén en línea.
    */}
    <span className="flex items-center space-x-1"> 
      {children}
    </span>
    <ChevronRight size={18} />
  </button>
);

const SecondaryButton = ({ children, className = '' }) => (
  <button
    // Las clases se mantienen como string para Tailwind
    className={`
      bg-techno-green text-gray-900 font-semibold py-3 px-8 
      rounded-full shadow-lg hover:bg-opacity-90 
      transition duration-300 ease-in-out transform hover:scale-[1.02]
      flex items-center justify-center space-x-2 
      ${className}
    `}
  >
    <span>{children}</span>
    <ChevronRight size={18} />
  </button>
);

// Sección de Cabecera (Header) - Modificado para menú móvil
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = ['Soluciones', 'Proyectos', 'Nosotros', 'Contacto'];

  // Función para cerrar el menú al hacer clic en un enlace (útil en móvil)
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <a href="#" className="flex items-center text-2xl font-bold text-gray-900">
         <img src={Logo} alt="Logo Tecnogen" width="40px"/>
          Tecno<span className="text-techno-green">Gen</span>
        </a>

        {/* Navegación (Solo Desktop/Tablet) */}
        <nav className="hidden md:flex space-x-8 font-medium">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-600 hover:text-techno-green transition duration-150"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA de Contacto (Solo Desktop/Tablet) */}
        <div className="hidden md:block">
          <PrimaryButton className="py-2 px-6 flex ">
            <Phone size={18} className="mr-1" />
            Hablemos
          </PrimaryButton>
        </div>

        {/* Menú Móvil (Icono Toggle) */}
        <div className="md:hidden">
          <button 
            className="text-gray-900 hover:text-techno-green p-2 transition duration-150"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Contenido del Menú Móvil */}
      <div 
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
        } bg-gray-50 border-t border-gray-200`}
      >
        <nav className="flex flex-col space-y-2 px-4 font-medium">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={handleNavLinkClick} // Cierra el menú al hacer clic
              className="block py-2 text-gray-700 hover:bg-gray-200 rounded-md transition duration-150"
            >
              {item}
            </a>
          ))}
          {/* CTA en el menú móvil */}
          <div className="pt-4 pb-2 w-full">
            <PrimaryButton className="w-full bg-green-400  ">
              <Phone size={18} className="mr-1" />
              Hablemos 
            </PrimaryButton>
          </div>
        </nav>
      </div>
    </header>
  );
};
// Sección Principal (Hero)
const HeroSection = () => (
  <section id="inicio" className="relative h-[70vh] md:h-[90vh] flex items-center justify-center text-center bg-gray-900 ">
    {/* Video de Fondo (Solo Desktop) */}
    <video
      className="absolute inset-0 w-full h-full object-cover hidden md:block"
      autoPlay
      loop
      muted
      playsInline
      src={DEFAULT_VIDEO_URL}
    >
      Tu navegador no soporta la etiqueta de video.
    </video>

    {/* Fallback de Imagen (Solo Móvil) */}
    <div
      className="absolute inset-0 w-full h-full object-cover md:hidden"
      style={{ 
        backgroundImage: `url(${MobileHeroImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    ></div>

    {/* Overlay para mejor contraste de texto sobre video/imagen */}
    <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
    
    <div className="relative z-10 text-white p-6 max-w-4xl">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
        El Futuro es Verde. El Futuro es <span className="text-techno-green">TechnoGen</span>.
      </h1>
      <p className="text-lg sm:text-xl font-light mb-8 max-w-2xl mx-auto">
        Lideramos la transición energética con soluciones solares, eólicas y de eficiencia para un mañana sostenible.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <PrimaryButton className="text-lg bg-green-500">
          Descubre Soluciones
        </PrimaryButton>
        <PrimaryButton className="text-lg bg-green-500" >
          Contáctanos Hoy
        </PrimaryButton>
      </div>
    </div>
  </section>
);

// Sección de Servicios/Soluciones
const ServicesSection = () => {
  const services = [
    { icon: Leaf, title: 'Energía Solar Fotovoltaica', description: 'Diseño e instalación de parques solares y sistemas on-grid para empresas e industrias.' },
    { icon: Zap, title: 'Eficiencia Energética', description: 'Auditorías y optimización de consumo para reducir costos operativos y huella de carbono.' },
    { icon: Globe, title: 'Proyectos a Gran Escala', description: 'Gestión integral de proyectos de energía renovable de alta potencia y complejidad.' },
  ];

  return (
    <section id="soluciones" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Nuestras Soluciones Clave</h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Ofrecemos un portafolio de servicios innovadores adaptados a las necesidades de cada cliente, impulsando la sostenibilidad.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 bg-gray-50 rounded-xl shadow-xl border-t-4 border-techno-green transition duration-300 hover:shadow-2xl">
              <service.icon size={48} className="text-techno-green mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sección de Proyectos Destacados (Similar a Portfolio)
const ProjectsSection = () => {
  const projects = [
    { title: 'Planta Industrial Solar', sector: 'Manufactura', img: 'https://placehold.co/400x250/0FE778/000?text=Proyecto+Industrial' },
    { title: 'Auditoría Residencial', sector: 'Hogares Inteligentes', img: 'https://placehold.co/400x250/0FE778/000?text=Proyecto+Residencial' },
    { title: 'Parque Eólico Costa', sector: 'Energía Eólica', img: 'https://placehold.co/400x250/0FE778/000?text=Proyecto+Eólico' },
  ];

  return (
    <section id="proyectos" className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Casos de Éxito</h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Demostramos nuestro impacto con proyectos reales que transforman el consumo energético.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
              <img src={project.img} alt={project.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x250/0FE778/000?text=Imagen+No+Disponible'; }} />
              <div className="p-6">
                <p className="text-sm font-semibold text-techno-green uppercase mb-1">{project.sector}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <a href="#" className="text-techno-green font-medium hover:underline text-sm flex items-center">
                  Ver detalles <ChevronRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sección Quiénes Somos (About Us)
const AboutSection = () => (
  <section id="nosotros" className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre TecnoGen</h2>
          <p className="text-lg text-gray-700 mb-4">
            Nacimos de la visión de un futuro 100% renovable. TecnoGen combina la **innovación tecnológica** con el compromiso ambiental para ofrecer soluciones de energía limpia que son accesibles y rentables.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Nuestra experiencia abarca desde pequeñas instalaciones residenciales hasta proyectos industriales a gran escala, siempre priorizando la calidad, la seguridad y la maximización del retorno de inversión para nuestros clientes.
          </p>
          <PrimaryButton className="bg-gray-900 text-white hover:bg-gray-800">
            Conoce a nuestro equipo
          </PrimaryButton>
        </div>
        
        {/* Placeholder de imagen o video */}
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={`https://placehold.co/600x400/000/0FE778?text=Visión+y+Misión`}
            alt="Equipo de TecnoGen"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/000/0FE778?text=Nuestra+Historia'; }}
          />
        </div>
      </div>
    </div>
  </section>
);

// Sección de Contacto y CTA final
const ContactSection = () => (
  <section id="contacto" className="py-16 md:py-24 bg-techno-green text-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold mb-4">¿Listo para unirte a la Revolución Verde?</h2>
      <p className="text-xl font-medium mb-8 max-w-3xl mx-auto">
        Nuestro equipo de expertos está listo para diseñar tu solución energética personalizada.
      </p>
      <PrimaryButton className="bg-white text-gray-900 hover:bg-gray-100">
        Agenda una Consulta Gratuita
      </PrimaryButton>
    </div>
  </section>
);

// Pie de Página (Footer)
const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
        {/* Columna 1: Logo y Misión */}
        <div>
          <a href="#" className="flex items-center text-2xl font-bold mb-3">
          <img src={Logo} alt="Logo Tecnogen" width="40px"/>
            Techno<span className="text-techno-green" color='#0FE778'>Gen</span>
          </a>
          <p className="text-sm text-gray-400">Impulsando un mundo más limpio con tecnología de punta en energía renovable.</p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-techno-green">Enlaces</h4>
          <ul className="space-y-2"> 
            {['Inicio', 'Soluciones', 'Proyectos', 'Nosotros'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm transition duration-150">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-techno-green">Contacto</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: info@tecnogen.com</li>
            <li>Tel: +54 9 11 XXXX-XXXX</li>
            <li>Dirección: Calle Falsa 123, CABA, Argentina</li>
          </ul>
        </div>

        {/* Columna 4: Legal y Redes */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-techno-green">Legal & Redes</h4>
          {/* El error se manifestaba en el UL. Aseguramos sintaxis limpia. */}
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Política de Privacidad</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Términos de Uso</a></li>
          </ul>
          {/* Social Icons Placeholder */}
          <div className="flex space-x-4 mt-4">
            <Globe size={20} className="text-gray-400 hover:text-techno-green cursor-pointer" />
            <Users size={20} className="text-gray-400 hover:text-techno-green cursor-pointer" />
            <TrendingUp size={20} className="text-gray-400 hover:text-techno-green cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 pt-4">
        © {new Date().getFullYear()} TecnoGen. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

// --- Componente Principal ---
export default function App() {
  // Nota: Asegúrate de que tu `src/index.css` contenga las directivas de Tailwind y la configuración del color 'techno-green'.
  return (
    <div className="min-h-screen font-sans">
 <text>Base Generica Vue.js + TailwindCSS + React Router + Redux Toolkit</text>
    </div>
  );
}
