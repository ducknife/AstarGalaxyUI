import React from 'react';
import HeroSection from '../components/home/HeroSection';
import HighlightProducts from '../components/home/HighlightProducts';
import About from '../components/home/About';
import KeyBrands from '../components/home/KeyBrands';
import BestFeedBacks from '../components/home/BestFeedBacks';
import CallToAction from '../components/home/CallToAction';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <KeyBrands />
      <About />
      <HighlightProducts />
      <BestFeedBacks />
      <CallToAction />
    </main>
  );
}