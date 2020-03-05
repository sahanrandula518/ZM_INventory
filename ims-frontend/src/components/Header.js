import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link to='/dashboard' className='navbar-brand ' href='#'>
        <b
          style={{
            fontFamily:'Vidaloka, serif',
            fontSize: 25
          }}
        >
          Inventory
        </b>
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      {/* <div className='collapse navbar-collapse' id='navbarSupportedContent '>
        <ul className='navbar-nav' >
          <li className='nav-item active'>
            <Link to='/users' className='navbar-brand' href='#'>
              Users
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/tools' className='navbar-brand' href='#'>
              Tools
            </Link>
          </li>
        </ul>
      </div> */}
    </nav>
  );
};

export default Header;
