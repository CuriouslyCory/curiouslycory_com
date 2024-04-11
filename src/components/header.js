import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import CuriouslyCoryLogo from '../images/curiously_cory_logo_white.png';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#606161`,
      marginBottom: `1.45rem`,
      borderBottom: `3px solid #7396ae`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ 
        margin: 0,
        color: `#5d5c61`,
      }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <img src={CuriouslyCoryLogo} style={{
            height: `80px`,
            marginBottom: `0px`,
          }}/>
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
