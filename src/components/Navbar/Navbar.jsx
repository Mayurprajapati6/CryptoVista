import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="navbar bg-base-100 fixed w-full z-[1] shadow-md h-16">
      <div className="navbar-start">
        <div className="dropdown text-yellow-400">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-yellow-400"
          >
            <li>
              <a onClick={()=>{navigate('/')}}>Homepage</a>
            </li>
            <li>
              <a onClick={()=>{navigate('/about')}}>About</a>
            </li>
            <li>
              <a onClick={()=>{navigate('/easteregg')}}>EasterEgg</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        {show ? (
          <div className="flex items-center justify-center w-full max-w-2xl">
            <div className="flex items-center w-full max-w-2xl border border-yellow-400 rounded-full overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Search Currency"
                className="flex-grow px-4 py-2 text-yellow-400 placeholder-yellow-400 bg-transparent text-sm focus:outline-none"
              />
              <button className="px-5 py-2 text-sm font-medium text-black bg-yellow-400 rounded-full transition hover:bg-yellow-500">
                Search
              </button>
            </div>
          </div>
        ) : (
          <a className="btn btn-ghost text-xl tracking-wider text-yellow-400 font-bold uppercase" onClick={()=>{navigate('/')}}>
            Crypto Tracker
          </a>
        )}
      </div>
      <div className="navbar-end text-yellow-400">
        <button className="btn btn-ghost btn-circle">
          {!show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setShow(!show)}
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
              onClick={() => setShow(!show)}
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
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;