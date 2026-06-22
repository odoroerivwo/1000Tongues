import React from 'react';
import Hero from '../components/Hero';
// import Countdown from '../components/Countdown';
import Statistics from '../components/Statistics';
import Prophesy from '../components/Prophesy';
//import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
//import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
//import Blog from '../components/Blog';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      {/*  <Countdown />  */}
      <Statistics />
      <Prophesy />
      {/*<Testimonials />*/}
      <Gallery />
      {/* <Newsletter /> */}
      <FAQ />
      {/* <Blog /> */}
    </div>
  );
};

export default HomePage;

