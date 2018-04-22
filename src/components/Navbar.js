import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/logo.png'

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/">
          <figure className="image">
              <img src={logo} alt="Wind Swell" style={{ width: '500px', height: '70px' }} />
          </figure>
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="navbar-item" to="/about">
          About
        </Link>
        <Link className="navbar-item" to="/contact">
          Contact
        </Link>
      </div>
    </div>
  </nav>
)

export default Navbar
