import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/logo.png'

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={logo} alt="Wind Swell" />
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="navbar-item has-text-centered-touch" to="/about">
          About
        </Link>
        <Link className="navbar-item has-text-centered-touch" to="/contact">
          Contact
        </Link>
      </div>
    </div>
  </nav>
)

export default Navbar
