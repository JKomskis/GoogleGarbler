import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export class Header extends React.Component{
  render(){
    return(
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="https://jkomskis.github.io/">JKomskis</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <MenuItem eventKey={1} href="https://github.com/JKomskis?tab=repositories">GitHub</MenuItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={1} title="Web" id="basic-nav-dropdown">
              <MenuItem eventKey={1.1} href="https://jkomskis.github.io/GoogleGarbler">GoogleGarbler</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
