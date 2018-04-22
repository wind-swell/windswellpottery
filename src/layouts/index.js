import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <section className="hero">
    <Helmet title="Wind Swell" />
    <div className="hero-head">
      <Navbar />
    </div>
    <div className="hero-body">
      {children()}
    </div>
    <div className="hero-foot">
      <div className="copyright is-size-7 has-text-light has-text-right is-italic has-text-weight-light">
        &copy; Copyright {(new Date()).getFullYear()} Will Simons. All rights reserved.
      </div>
    </div>
  </section>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
