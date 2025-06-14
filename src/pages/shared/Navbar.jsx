import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../firebase/firebase.init';
import AuthContext from '../../context/AuthContext';

const Navbar = ({ service = {} }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Successful sign out');
        navigate('/');
      })
      .catch((error) => {
        console.log('Sign out failed', error.message);
        alert('Failed to sign out. Please try again.');
      });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allServices">Services</NavLink>
      </li>
      <li ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className=" hover:text-sky-600"
        >
          Dashboard
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-10 w-52 p-2 bg-base-100 rounded-box shadow-md">
            <li>
              <NavLink to="/addService">Add Service</NavLink>
            </li>
            <li>
              <NavLink to="/myApplications">Booked</NavLink>
            </li>
            <li>
              <NavLink to="/myPostedServices">Manage Services</NavLink>
            </li>
            <li>
              <NavLink to={`/viewApplications/${service._id}`}>
                Service To Do
              </NavLink>
            </li>
          </ul>
        )}
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-md">
      <div className="navbar bg-base-100">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <img
              className="w-[60px] rounded-full"
              src="https://i.ibb.co/9HmwHp2J/Chat-GPT-Image-Jun-14-2025-12-52-29-PM.png"
              alt="Home Repairs Logo"
            />
          </Link>
          <h2 className="text-lg font-bold">Home Repairs</h2>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-4">
          {!user ? (
            <>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
              <Link to="/signin" className="btn btn-secondary">
                Log In
              </Link>
            </>
          ) : (
            <>
              <button onClick={handleSignOut} className="btn">
                Log Out
              </button>
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border"
                  />
                ) : (
                  <span className="font-bold">
                    {user.displayName || 'User'}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
