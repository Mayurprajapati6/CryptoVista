import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import CoinTableSkeleton from '../Skeleton/CoinTableSkeleton';

const Home = lazy(() => import('../../Pages/Home'));
const CoinDetailsPage = lazy(() => import('../../Pages/CoinDetailsPage'));
const Layout = lazy(() => import('../../Pages/Layout'));
const About = lazy(() => import('../../Pages/About'));
const EasterEgg = lazy(() => import('../../Pages/EasterEgg'));



function Routing() {
  return (
    <Suspense fallback={<CoinTableSkeleton />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/coin/:coinId" element={<CoinDetailsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/easteregg" element={<EasterEgg />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Routing;