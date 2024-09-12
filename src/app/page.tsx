// pages/index.tsx
"use client";
import { useEffect, useState } from 'react';
import MainPage from './components/MainPage';
import AllItems from './components/AllItems';
import { ChakraProvider } from '@chakra-ui/react'
export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  // Função para detectar o scroll e ajustar a seção conforme a rolagem
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionHeight = window.innerHeight;
      const current = Math.floor(scrollPosition / sectionHeight);
      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * (currentSection + 1),
      behavior: 'smooth',
    });
  };

  return (
    <ChakraProvider>
      <MainPage scrollToNext={scrollToNextSection} />
      <AllItems scrollToNext={scrollToNextSection} />
    </ChakraProvider>
  );
}
