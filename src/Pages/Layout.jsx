import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div data-theme="cryptovista" className="min-h-screen bg-base-100 text-base-content">
      <div className="container mx-auto px-4">
        <Navbar setSearchTerm={setSearchTerm} />
        <main className="pt-20 pb-6">
          <Outlet context={{ searchTerm }} />
        </main>
      </div>
    </div>
  )
}

export default Layout