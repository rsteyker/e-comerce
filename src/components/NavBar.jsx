import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PurchasesSidebar from './PurchasesSidebar';

const NavBar = () => {
  const [ show, setShow ] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  }

  const sidebarAction = () => {
    const token = localStorage.getItem( 'token' )

    if (token) {
      setShow(true);
    }else{
      navigate('/login');
    }
  }

  return (
    <>
    <Navbar bg="primary" variant="dark">
        <Container className='navbar'>
          <Navbar.Brand className='fs-1 fw-bold text-warning' as={ Link } to={'/'}>E-COMERCE</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='fs-5 fw-bold text-light' as={ Link } to={'/login'}>LOGIN</Nav.Link>
            <Nav.Link className='fs-5 fw-bold text-light' as={ Link } to={'/purchases'}>COMPRAS</Nav.Link>
            <Nav.Link 
              className='fs-5 fw-bold text-light'
              onClick={() => setShow(true)}
            >CARRITO
            </Nav.Link>
          </Nav>
        </Container>
    </Navbar>
    <PurchasesSidebar
      show={ show }
      handleClose={ handleClose }
    />
    </>
  )
}

export default NavBar
