import './index.scss';
import logo from '../../../assets/images/cc-logo.svg';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <div className="header-wrapper">
            <div className="logo-wrapper">
                <img className="logo-img" src={logo} alt="CuriouslyCory Logo"/>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/services">Services</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/find-me">Find Me At...</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}