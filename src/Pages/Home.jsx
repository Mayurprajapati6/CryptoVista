import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Banner from '../Components/Banner/Banner'
import CryptoCoinTable from '../components/CryptoCoinTable/CryptoCoinTable'
function Home() {
  return (
    <>
        <Banner/>
        <CryptoCoinTable/>
    </>
  )
}

export default Home