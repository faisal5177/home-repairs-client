import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
      <li><Link to="/">Home</Link></li>
      <li><Link to="/allServices">Services</Link></li>
      {user && (
        <li>
          <div className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className="">Dashboard</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><Link to="/addService">Add Service</Link></li>
              <li><Link  to="/myPostedServices">Booked</Link></li>
              <li><Link to="/myApplications">Manage Services</Link></li>
              <li><Link to='/'>Service To Do </Link></li>
            </ul>
          </div>
        </li>
      )}
    </>
  );

  return (
    <nav>
      <div className="navbar bg-base-100 shadow-sm">
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
          <Link to="/" className="flex items-center space-x-2 btn btn-ghost">
            <img className="w-[50px] h-auto rounded-full"
              src=""
              alt="" />
            <h2 className="font-bold text-xl">Homecare Solutions</h2>
          </Link>
        </div>
        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        {/* Navbar End */}
        <div className="navbar-end gap-4">
          {!user ? (
            <>
              <Link to="/register" className="btn btn-primary">Register</Link>
              <Link to="/signin" className="btn btn-secondary">Log In</Link>
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