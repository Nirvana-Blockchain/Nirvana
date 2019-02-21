import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../images/logo.png';
import sygnet from '../../images/hp3-short.png';
import userLogo from '../../images/6.jpg';
import '../../css/custom.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class LoginHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav className="ml-auto" navbar>
          <NavItem className="px-3">
            <NavLink href="/login">Login</NavLink>
          </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}

LoginHeader.propTypes = propTypes;
LoginHeader.defaultProps = defaultProps;

export default LoginHeader;
