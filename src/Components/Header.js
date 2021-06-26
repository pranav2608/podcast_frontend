import React,{useState} from 'react'
import "./Header.css"

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';

  const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar className="position" color="light" light expand="md">
          <NavbarBrand href="/"><h1 class="site-logo"><a href="index.html" className="h2">Podcast<span class="text-primary">.</span> </a></h1></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink  href="/contact">Contact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
            </Nav>
            <NavbarText tag="h6" onClick={props.handleLogout}>Logout</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  

export default Header