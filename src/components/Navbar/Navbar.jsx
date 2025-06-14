import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaBell, FaUser, FaWallet, FaChartLine, FaNewspaper, FaCog, FaSignOutAlt, FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiSolana, SiCardano, SiPolkadot } from "react-icons/si";
import { useQuery } from 'react-query';
import fetchCoinsGrid from '../../services/fetchCoinsGrid';

function Navbar({ setSearchTerm }) {
  const [search, setSearch] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'unread'
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const searchToggleButtonRef = useRef(null);
  
  // Extract page number from URL
  const currentPage = parseInt(new URLSearchParams(location.search).get('page')) || 1;

  // Fetch real cryptocurrency data
  const { data: cryptoData } = useQuery([
    'coins', 
    currentPage, 
    'usd', 
    'market_cap_desc'
  ], 
    () => fetchCoinsGrid(currentPage, 'usd', 'market_cap_desc'),
    {
      retry: 3,
      retryDelay: 2000,
      cacheTime: 1000 * 60 * 2,
      staleTime: 1000 * 60 * 5
    }
  );

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearch("");
      setSearchTerm(""); // Clear search term when closing
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchTerm(value); // Update search term as user types
  };

  const handleSearchSubmit = () => {
    if (search) {
      console.log("Searching for:", search);
      setSearchTerm(search); // Set search term on submit
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationClose = (e) => {
    if (!e.target.closest('.notification-dropdown') && !e.target.closest('.notification-icon')) {
      setIsNotificationOpen(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchToggleButtonRef.current && searchToggleButtonRef.current.contains(event.target)) {
        return;
      }
      
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef, searchToggleButtonRef]);

  useEffect(() => {
    document.addEventListener('click', handleNotificationClose);
    return () => {
      document.removeEventListener('click', handleNotificationClose);
    };
  }, []);

  useEffect(() => {
    const generateNotifications = () => {
      if (!cryptoData) return null;
      
      // Get top 2 positive and top 2 negative movers
      const positiveMovers = cryptoData
        .filter(coin => coin.price_change_percentage_24h > 0)
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 2);
      
      const negativeMovers = cryptoData
        .filter(coin => coin.price_change_percentage_24h < 0)
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        .slice(0, 2);

      const selectedCoins = [...positiveMovers, ...negativeMovers];

      return selectedCoins.map(crypto => ({
        id: Date.now() + crypto.market_cap_rank,
        coin: crypto.name,
        symbol: crypto.symbol.toUpperCase(),
        image: crypto.image,
        price: crypto.current_price,
        change: Math.abs(crypto.price_change_percentage_24h),
        direction: crypto.price_change_percentage_24h >= 0 ? 'up' : 'down',
        time: 'Just now',
        read: false,
        volume: crypto.total_volume,
        marketCap: crypto.market_cap
      }));
    };

    if (cryptoData) {
      const initialNotifications = generateNotifications();
      if (initialNotifications) {
        setNotifications(initialNotifications);
        setIsLoading(false);
      }
    }

    const intervalId = setInterval(() => {
      const newNotifications = generateNotifications();
      if (newNotifications) {
        setNotifications(newNotifications);
      }
    }, 15000);

    return () => clearInterval(intervalId);
  }, [cryptoData]);

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notification => 
    activeTab === 'all' || !notification.read
  );

  return (
    <div className={`navbar bg-base-200/50 backdrop-blur-sm fixed w-full z-[99] border-b border-primary/20 h-16 top-0 left-0 ${isScrolled ? 'bg-base-200/95 backdrop-blur-md shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <div className="navbar-start">
          <div className={`dropdown ${isMenuOpen ? 'dropdown-open' : ''}`}>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-primary hover:bg-primary/10" onClick={handleMenuToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[51] mt-3 w-52 p-2 shadow-lg border border-primary/20"
            >
              <li>
                <a onClick={()=>{navigate('/'); setIsMenuOpen(false); document.activeElement.blur();}} className="text-primary hover:bg-primary/10">Homepage</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/about'); setIsMenuOpen(false); document.activeElement.blur();}} className="text-primary hover:bg-primary/10">About</a>
              </li>
              <li>
                <a onClick={()=>{navigate('/easteregg'); setIsMenuOpen(false); document.activeElement.blur();}} className="text-primary hover:bg-primary/10">EasterEgg</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl tracking-wider text-primary font-cyber uppercase hover:bg-primary/10" onClick={()=>{navigate('/')}}>
            CryptoVista
          </a>
        </div>
        <div className="navbar-end flex items-center gap-2">
          {isSearchActive && (
            <div ref={searchRef} className="flex items-center border border-primary/50 rounded-full overflow-hidden shadow-lg bg-base-200/50 backdrop-blur-sm w-64">
              <input
                type="text"
                placeholder="Search Currency"
                className="flex-grow px-4 py-2 text-primary placeholder-primary/50 bg-transparent text-sm focus:outline-none"
                value={search}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
              />
              <button
                className="p-2 py-2 text-sm text-center font-medium text-base-100 bg-primary hover:bg-primary/90 transition-all duration-200"
                onClick={handleSearchSubmit}
              >
                Search
              </button>
            </div>
          )}
          <button ref={searchToggleButtonRef} className="btn btn-ghost btn-circle text-primary hover:bg-primary/10" onClick={handleSearchToggle}>
            {!isSearchActive ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="notification-icon p-2 text-base-content/70 hover:text-primary transition-colors relative"
            >
              <FaBell className="w-5 h-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="notification-dropdown absolute right-0 mt-2 w-96 bg-base-100 rounded-lg shadow-xl border border-base-300">
                <div className="p-4 border-b border-base-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-base-content">Top Movers</h3>
                    {notifications.some(n => !n.read) && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === 'all'
                          ? 'bg-primary text-primary-content'
                          : 'bg-base-200 text-base-content/70 hover:bg-base-300'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveTab('unread')}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeTab === 'unread'
                          ? 'bg-primary text-primary-content'
                          : 'bg-base-200 text-base-content/70 hover:bg-base-300'
                      }`}
                    >
                      Unread
                    </button>
                  </div>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-base-content/70">Loading notifications...</div>
                  ) : filteredNotifications.length === 0 ? (
                    <div className="p-4 text-center text-base-content/70">No price alerts</div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-4 border-b border-base-300 hover:bg-base-200 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-base-200/50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <img 
                              src={notification.image} 
                              alt={notification.coin} 
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-base-content">
                                  {notification.coin} ({notification.symbol})
                                </h4>
                                <span className={`text-sm font-medium ${
                                  notification.direction === 'up' 
                                    ? 'text-success' 
                                    : 'text-error'
                                }`}>
                                  {notification.direction === 'up' ? '+' : '-'}{notification.change.toFixed(2)}%
                                </span>
                              </div>
                              <div className="mt-1 space-y-1">
                                <p className="text-sm text-base-content/70">
                                  Price: ${notification.price.toLocaleString()}
                                </p>
                                <div className="flex gap-4 text-xs text-base-content/50">
                                  <span>Vol: ${(notification.volume / 1e9).toFixed(1)}B</span>
                                  <span>MCap: ${(notification.marketCap / 1e9).toFixed(1)}B</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-base-content/50">{notification.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-base-300">
                  <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors">
                    View All Alerts
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;