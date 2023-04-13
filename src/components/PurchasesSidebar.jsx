import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProductsPurchasesThunk, productsCheckoutThunk } from '../store/slices/productosPurchaces.slice';

const PurchasesSidebar = ({ show, handleClose }) => {
    const purchases = useSelector( state => state.productosPurchaces )
    const dispatch = useDispatch();

    const token = localStorage.getItem('token')

    useEffect(()=> {
        if (token)  dispatch(getProductsPurchasesThunk()) 
    }, [token]);

  return (
    <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {
              purchases?.map( item => (
                <li key={item.id}>
                    <p>{item.id}</p>
                    <p>{item.product.title}</p>
                    <img src={item.product?.images?.[0].url} style={{width:88, objectFit: 'contain' }}/>
                </li>
              ) )
            }
          </ul>
          <Button className='w-100' onClick={() => dispatch( productsCheckoutThunk() )}>
            Checkout
          </Button>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default PurchasesSidebar
