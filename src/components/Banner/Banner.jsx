import React from 'react';
import BannerImage from '../../assets/Banner.jpg';

function Banner() {
  return (
    <div className='w-full h-[25rem] relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-b from-base-100/50 to-base-100 z-10'></div>
      <img 
        src={BannerImage}
        className='w-full h-full object-cover object-top'
      />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-4 z-20'> 
        <h1 className='text-5xl text-primary font-cyber tracking-wider backdrop-blur-md p-4 border border-primary/20 rounded-lg bg-base-200/30'>
          CryptoVista
        </h1>
        <p className='text-base-content text-xl backdrop-blur-md p-3 rounded-lg bg-base-200/30 border border-primary/20'>
          Track your favorite cryptocurrencies in real-time
        </p>
      </div>
    </div>
  );
}

export default Banner;
