import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('Successfully signed out');
      })
      .catch((error) => {
        console.error('Failed to sign out:', error);
      });
  };

  // Navigation links
  const links = (
    <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to="/allServices">Services</NavLink></li>
      {user && (
        <li>
          <div className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className="">Dashboard</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><NavLink to="/">Add Service</NavLink></li>
              <li><NavLink to="/">Booked</NavLink></li>
              <li><NavLink to="/">Manage Services</NavLink></li>
              <li><NavLink to='/'>Service To Do </NavLink></li>
            </ul>
          </div>
        </li>
      )}
    </>
  );

  return (
    <nav>
      <div className="navbar bg-base-100 mb-5 shadow-sm">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {links}
            </ul>
          </div>
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 btn btn-ghost">
            <img className="w-[50px] h-auto rounded-full"
              src="https://i.ibb.co/gLzZFk9R/homecare-solutions-logo.jpg"
              alt="Homecare Solutions Logo" />
            <h2 className="font-bold text-xl">Home Repairs</h2>
          </NavLink>
        </div>
        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        {/* Navbar End */}
        <div className="navbar-end gap-4">
          {!user ? (
            <>
              <NavLink to="/register" className="btn btn-primary">Register</NavLink>
              <NavLink to="/signin" className="btn btn-secondary">Log In</NavLink>
            </>
          ) : (
            <>
              <button onClick={handleSignOut} className="btn">Log Out</button>
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border" />
                ) : (
                  <span className="font-bold">{user.displayName || 'User'}</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;