import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CoinTableSkeleton from '../Skeleton/CoinTableSkeleton';

import Home from '../../Pages/Home';
import CoinDetailsPage from '../../Pages/CoinDetailsPage';
import Layout from '../../Pages/Layout';
import About from '../../Pages/About';
import EasterEgg from '../../Pages/EasterEgg';



function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coinId" element={<CoinDetailsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/easteregg" element={<EasterEgg />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Routing;