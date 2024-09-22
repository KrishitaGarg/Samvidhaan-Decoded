import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Layout.css"; 

const Layout = ({ children }) => {
  return (
    <Fragment>
      <main className="layout-main">{children}</main>
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
