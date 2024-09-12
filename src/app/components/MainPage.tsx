// components/FirstPage.tsx
import { IonIcon } from '@ionic/react';
import { arrowDownOutline } from 'ionicons/icons';
import styled from 'styled-components';
import { Fade } from "react-awesome-reveal";
import { Text } from '@chakra-ui/react'
interface MainPageProps {
  scrollToNext: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ scrollToNext }) => {
    return (
      <FirstSection>
        <BigText>
          <Fade delay={100} cascade damping={0.1} triggerOnce duration={1000}>
            CSkinStore
          </Fade>
        </BigText>
  
        <SmallText>
          <Fade delay={2e5} triggerOnce duration={2500}>
            A melhor loja de skins para CS:GO
          </Fade>
        </SmallText>
  
        <Arrow onClick={scrollToNext}>
          <IonIcon icon={arrowDownOutline} style={{ fontSize: '3rem', color: 'white' }} />
        </Arrow>
      </FirstSection>
    );
  };
  
  export default MainPage;
  
  const FirstSection = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
  
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("/images/main_background.png");
      background-size: cover;
      background-position: center;
      filter: blur(10px);
      z-index: -1;
      transform: scale(1.1);
    }
  
  `;
  
  const BigText = styled.h1`
    font-size: 9rem;
    z-index: 1;
    color: white;
    text-shadow: -0.01em -0.01em 0.01em #000;
    text-shadow: -0.01em -0.01em 0.01em #000;
    animation: rise 1s ease-in-out 0.5s forwards;

    @keyframes rise {
        to {
            text-shadow: 0em 0.01em #ffa500, 0em 0.02em #ffa500, 0em 0.02em 0.03em #ffa500,
                -0.01em 0.01em #333, -0.02em 0.02em #333, -0.03em 0.03em #333,
                -0.04em 0.04em #333, -0.01em -0.01em 0.03em #000, -0.02em -0.02em 0.03em #000,
                -0.03em -0.03em 0.03em #000;
            transform: translateY(-0.025em) translateX(0.04em);
        }
    }
    @media (max-width: 768px) {
      font-size: 3.5rem; 
      text-align: center; 
  
      span {
        font-size: 3rem; 
      }
    }
  `;
  
  const SmallText = styled.h2`
    font-size: 2rem;
    z-index: 1;
    color: #ffa500;
    margin-top: 20px; 
    text-align: center;
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: 1.2rem; 
    }
  `;
  
  const Arrow = styled.button`
    position: absolute;
    bottom: 40px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
  
    &:hover {
      width: 120px;
      border-radius: 50px;
      background-color: #ffa500;
      border: 2px solid #ffa500;
      box-shadow: 0px 0px 0px 0px #ffa500;
      color: black;
      scale: 1.1;
    }
  `;