import React, { useState, useEffect } from 'react';

// Ordem correta de importação de CSS
import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css'; 
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Imports de Lógica e Componentes
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaWhatsapp, FaComments, FaCalendarAlt, FaCamera, FaGift } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import logo from './assets/logo-coruja.png';

// ===================================================================
// DADOS
// ===================================================================
const whatsappLink = "https://wa.me/5588988088291?text=Olá! Quero um orçamento para formatura de ABC!";

const imageUrls = [ 
  "https://i.imgur.com/JZjfbZy.png", "https://i.imgur.com/8RXBNQD.png", "https://i.imgur.com/XdHTROM.png", 
  "https://i.imgur.com/Wtr8rZ7.png", "https://i.imgur.com/GjnElDw.png", "https://i.imgur.com/qpWNLpq.png", 
  "https://i.imgur.com/IA9UxXx.png", "https://i.imgur.com/9VODFSz.png" 
];
const lightboxSlides = imageUrls.map(url => ({ src: url }));

// ===================================================================
// COMPONENTE PRINCIPAL
// ===================================================================
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <header className="nav-header">
        <img src={logo} alt="Coruja Estúdio Móvel Logo" className="nav-header__logo" />
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-button button-with-icon">
          <FaWhatsapp /> Peça um Orçamento
        </a>
      </header>

      <main>
        <section className="section hero">
          <h1 className="hero__title">O Primeiro Diploma é Inesquecível 🎓</h1>
          <p className="hero__subtitle">Eternizamos a conquista da formatura de ABC com a sensibilidade e a qualidade que este momento merece.</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-button button-with-icon">
            <FaWhatsapp /> Falar no WhatsApp
          </a>
        </section>

        <section className="section">
          <h2 className="section-title">Nossa Galeria</h2>
          {isMobile ? (
            <div className="mobile-carousel">
              <Swiper 
                className="swiper"
                modules={[Pagination, Navigation, Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                slidesPerView={1}
                spaceBetween={20} 
                loop={true} 
                pagination={{ clickable: true }} 
                navigation
              >
                {imageUrls.map((url, index) => ( 
                  <SwiperSlide key={index}>
                    <img src={url} alt={`Galeria de fotos ${index + 1}`} />
                  </SwiperSlide> 
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="gallery-grid">
              {imageUrls.map((url, index) => ( 
                <img key={index} src={url} alt={`Galeria de fotos ${index + 1}`} className="gallery-grid__item" onClick={() => openLightbox(index)} /> 
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Nossos Pacotes</h2>
          <div className="packages-grid">
            <div className="package-card">
              <h3 className="package-card__title">Pacote Essencial</h3>
              <ul className="package-card__list">
                <li className="package-card__item"><BsCheckCircleFill /> Cobertura da Colação de Grau</li>
                <li className="package-card__item"><BsCheckCircleFill /> Sessão de fotos em estúdio com beca</li>
                <li className="package-card__item"><BsCheckCircleFill /> 10 fotos digitais tratadas em alta resolução</li>
                <li className="package-card__item"><BsCheckCircleFill /> Galeria online privada para seleção</li>
              </ul>
            </div>
            <div className="package-card package-card--featured">
              <h3 className="package-card__title">Pacote Completo</h3>
              <ul className="package-card__list">
                <li className="package-card__item"><BsCheckCircleFill /> <strong>Tudo do Pacote Essencial</strong></li>
                <li className="package-card__item"><BsCheckCircleFill /> Cobertura do baile de formatura</li>
                <li className="package-card__item"><BsCheckCircleFill /> Álbum de luxo impresso (20x30cm)</li>
                <li className="package-card__item"><BsCheckCircleFill /> Ensaio pré-formatura temático</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="section">
          <h2 className="section-title">Como Funciona</h2>
          <div className="steps-grid">
              <div className="step-card">
                  <div className="step-card__icon"><FaComments /></div>
                  <div>
                      <h3 className="step-card__title">1. Contato Inicial</h3>
                      <p className="step-card__description">Você nos chama no WhatsApp e conta sobre o evento.</p>
                  </div>
              </div>
              <div className="step-card">
                  <div className="step-card__icon"><FaCalendarAlt /></div>
                  <div>
                      <h3 className="step-card__title">2. Agendamento</h3>
                      <p className="step-card__description">Reservamos a data perfeita para as fotos.</p>
                  </div>
              </div>
              <div className="step-card">
                  <div className="step-card__icon"><FaCamera /></div>
                  <div>
                      <h3 className="step-card__title">3. Sessão Fotográfica</h3>
                      <p className="step-card__description">No dia, registramos tudo com profissionalismo e criatividade.</p>
                  </div>
              </div>
              <div className="step-card">
                  <div className="step-card__icon"><FaGift /></div>
                  <div>
                      <h3 className="step-card__title">4. Entrega Mágica</h3>
                      <p className="step-card__description">Você recebe suas memórias em alta resolução para sempre.</p>
                  </div>
              </div>
          </div>
        </section>
      </main>
      
      <footer className="site-footer">
        <img src={logo} alt="Coruja Estúdio Móvel Logo" className="site-footer__logo"/>
        <p>Coruja Estúdio Móvel - Eternizando suas melhores memórias.</p>
        <p>© 2024 - Todos os direitos reservados.</p>
      </footer>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Fale Conosco pelo WhatsApp" className="whatsapp-float">
        <FaWhatsapp />
      </a>
      
      <div className="mobile-cta-bar">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-button button-with-icon">
          <FaWhatsapp /> Solicitar Orçamento
        </a>
      </div>

      <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} slides={lightboxSlides} index={lightboxIndex} />
    </>
  );
}

export default App;