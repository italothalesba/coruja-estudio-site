import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// --- Imports de bibliotecas ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Lightbox from "yet-another-react-lightbox";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

// --- Imports de Ícones ---
import { FaWhatsapp, FaComments, FaCalendarAlt, FaCamera, FaGift } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';

// --- Assets ---
import logo from './assets/logo-coruja.png';

// ===================================================================
// DADOS E CONFIGURAÇÕES
// ===================================================================
const heroBackgroundImage = "https://i.imgur.com/icp4mdA.jpeg";
const whatsappLink = "https://wa.me/5588988088291?text=Olá! Quero um orçamento para formatura de ABC!";

// !! IMPORTANTE !!
// Troque estas URLs de exemplo pelas URLs das suas fotos do Google Drive.
const imageUrls = [
  "https://i.imgur.com/JZjfbZy.png",
  "https://i.imgur.com/8RXBNQD.png",
  "https://i.imgur.com/XdHTROM.png",
  "https://i.imgur.com/Wtr8rZ7.png",
  "https://i.imgur.com/GjnElDw.png",
  "https://i.imgur.com/qpWNLpq.png",
  "https://i.imgur.com/IA9UxXx.png",
  "https://i.imgur.com/9VODFSz.png",
];
const lightboxSlides = imageUrls.map(url => ({ src: url }));

// ===================================================================
// ESTILOS GLOBAIS
// ===================================================================
const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    background-color: #FFFFFF;
    color: #4A2E2A;
  }
`;

// ===================================================================
// COMPONENTES ESTILIZADOS
// ===================================================================
const Nav = styled.header`
  display: flex; justify-content: space-between; align-items: center; padding: 1rem 5%;
  background: #FFF; box-shadow: 0 2px 10px rgba(0,0,0,0.08); position: sticky; top: 0; z-index: 1000;
  img { height: 50px; }
`;
const CtaButton = styled.a`
  background-color: #FF7043; color: white; padding: 12px 28px; border-radius: 50px;
  text-decoration: none; font-weight: bold; transition: all 0.3s ease; display: inline-block;
  &:hover { transform: scale(1.05); box-shadow: 0 4px 15px rgba(255, 112, 67, 0.4); }
`;
const Section = styled.section`
  padding: clamp(60px, 8vw, 100px) 5%; text-align: center;
`;
const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 2.8rem); margin-bottom: 50px; font-weight: 700; color: #4A2E2A;
`;
const HeroContainer = styled.section`
  position: relative; text-align: center; padding: clamp(100px, 20vw, 200px) 20px; color: white;
  background-image: url(${heroBackgroundImage}); background-size: cover; background-position: center;
  &::before { content: ''; position: absolute; inset: 0; background-color: rgba(0, 0, 0, 0.55); z-index: 1; }
  & > * { position: relative; z-index: 2; }
  h1 { font-size: clamp(2.5rem, 6vw, 4rem); text-shadow: 2px 2px 8px rgba(0,0,0,0.7); margin-bottom: 1rem; }
  p { font-size: clamp(1rem, 3vw, 1.25rem); max-width: 600px; margin: 0 auto 2rem auto; text-shadow: 1px 1px 6px rgba(0,0,0,0.8); }
`;
const PhotoGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;
  img {
    width: 100%; height: 280px; object-fit: cover; border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease;
    &:hover { transform: scale(1.04); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
  }
`;
const MobileCarouselContainer = styled.div`
  .swiper-slide img { width: 100%; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
  .swiper-button-next, .swiper-button-prev { color: #FF7043; }
  .swiper-pagination-bullet-active { background: #FF7043; }
`;
const PackagesGrid = styled.div`
  display: grid; grid-template-columns: 1fr; gap: 30px; max-width: 900px; margin: 0 auto;
  @media (min-width: 768px) { grid-template-columns: 1fr 1fr; }
`;
const PackageCard = styled.div`
  background: white; border-radius: 15px; padding: 40px; text-align: left;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08); transition: all 0.3s ease;
  border-top: 5px solid ${props => props.$featured ? '#FF7043' : 'transparent'};
  &:hover { transform: translateY(-10px); }
  h3 { font-size: 1.6rem; margin-bottom: 20px; color: #4A2E2A; }
  ul { list-style: none; margin: 0 0 20px 0; padding: 0;}
  li { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 1rem; }
  li svg { color: #25D366; margin-right: 12px; flex-shrink: 0; margin-top: 4px;}
`;
const StepsContainer = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;
  max-width: 1200px; margin: 0 auto;
`;
const StepCard = styled.div`
  svg { font-size: 3rem; color: #FF7043; margin-bottom: 15px; }
  h3 { font-size: 1.3rem; margin-bottom: 10px; }
  p { font-size: 1rem; color: #555; }
`;
const FinalCtaContainer = styled(Section)`
  background-color: #FDF4E6;
  p { max-width: 600px; margin: -30px auto 30px auto; font-size: 1.1rem; }
`;
const StyledFooter = styled.footer`
  background-color: #4A2E2A; color: #FFF8F0; text-align: center; padding: 40px 20px;
  img { height: 60px; opacity: 0.8; margin-bottom: 15px; }
`;
const FloatingButton = styled.a`
  position: fixed; bottom: 30px; right: 30px; background-color: #25D366; color: white;
  width: 65px; height: 65px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 38px; box-shadow: 2px 4px 12px rgba(0,0,0,0.3); z-index: 999; transition: transform 0.3s ease;
  &:hover { transform: scale(1.1); }
`;

// ===================================================================
// O COMPONENTE PRINCIPAL DA PÁGINA
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
      <GlobalStyle />
      <Nav>
        <img src={logo} alt="Coruja Estúdio Móvel Logo" />
        <CtaButton href={whatsappLink} target="_blank" rel="noopener noreferrer">Peça um Orçamento</CtaButton>
      </Nav>

      <main>
        <HeroContainer>
          <h1>O Primeiro Diploma a Gente Nunca Esquece! 🎓</h1>
          <p>Registramos a alegria e o orgulho da formatura de ABC do seu pequeno com fotos que você vai guardar para sempre.</p>
          <CtaButton href={whatsappLink} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</CtaButton>
        </HeroContainer>

        <Section>
          <SectionTitle>Momentos Mágicos que Ficam na Memória</SectionTitle>
          {isMobile ? (
            <MobileCarouselContainer>
              <Swiper modules={[Pagination, Navigation]} slidesPerView={1} spaceBetween={20} loop pagination={{ clickable: true }} navigation>
                {imageUrls.map((url, index) => (
                  <SwiperSlide key={index}><img src={url} alt={`Foto de formatura ${index + 1}`} /></SwiperSlide>
                ))}
              </Swiper>
            </MobileCarouselContainer>
          ) : (
            <PhotoGrid>
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Foto de formatura ${index + 1}`} onClick={() => openLightbox(index)} />
              ))}
            </PhotoGrid>
          )}
        </Section>

        <Section style={{ backgroundColor: '#FDF4E6' }}>
          <SectionTitle>Nossos Pacotes de Formatura</SectionTitle>
          <PackagesGrid>
            <PackageCard>
              <h3>Pacote Essencial</h3>
              <ul>
                <li><BsCheckCircleFill /> Cobertura da Colação de Grau</li>
                <li><BsCheckCircleFill /> Fotos posadas em estúdio com beca</li>
                <li><BsCheckCircleFill /> 10 fotos digitais tratadas em alta resolução</li>
                <li><BsCheckCircleFill /> Galeria online privada para escolher as fotos</li>
              </ul>
            </PackageCard>
            <PackageCard $featured>
              <h3>Pacote Completo</h3>
              <ul>
                <li><BsCheckCircleFill /> <strong>Tudo do Pacote Essencial</strong></li>
                <li><BsCheckCircleFill /> Cobertura completa do baile de formatura</li>
                <li><BsCheckCircleFill /> Lindo álbum impresso de capa dura (20x30cm)</li>
                <li><BsCheckCircleFill /> Ensaio pré-formatura em estúdio ou externo</li>
              </ul>
            </PackageCard>
          </PackagesGrid>
          <CtaButton href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ marginTop: '50px' }}>Montar Meu Pacote Personalizado</CtaButton>
        </Section>
        
        <Section>
            <SectionTitle>Seu Ensaio de Formatura em 4 Passos</SectionTitle>
            <StepsContainer>
                <StepCard><FaComments /><h3>1. Contato</h3><p>Você entra em contato pelo WhatsApp e nos conta todos os detalhes do seu evento.</p></StepCard>
                <StepCard><FaCalendarAlt /><h3>2. Agendamento</h3><p>Reservamos a melhor data na nossa agenda para sua sessão de fotos.</p></StepCard>
                <StepCard><FaCamera /><h3>3. Sessão de Fotos</h3><p>Realizamos o ensaio com equipamentos de ponta e muita criatividade para captar a emoção.</p></StepCard>
                <StepCard><FaGift /><h3>4. Entrega</h3><p>Você recebe suas fotos digitais em alta resolução, prontas para guardar para sempre.</p></StepCard>
            </StepsContainer>
        </Section>
        
        <FinalCtaContainer>
            <SectionTitle>Vamos Conversar Sobre Sua Formatura?</SectionTitle>
            <p>Clique no botão abaixo e fale diretamente conosco no WhatsApp. Estamos prontos para planejar a cobertura fotográfica perfeita para você!</p>
            <CtaButton href={whatsappLink} target="_blank" rel="noopener noreferrer">Solicitar Orçamento Agora</CtaButton>
        </FinalCtaContainer>
      </main>
      
      <StyledFooter>
        <img src={logo} alt="Coruja Estúdio Móvel Logo"/>
        <p>Coruja Estúdio Móvel - Eternizando suas melhores memórias.</p>
        <p>© 2024 - Todos os direitos reservados.</p>
      </StyledFooter>

      <FloatingButton href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Fale Conosco pelo WhatsApp"><FaWhatsapp /></FloatingButton>

      <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} slides={lightboxSlides} index={lightboxIndex} />
    </>
  );
}

export default App;