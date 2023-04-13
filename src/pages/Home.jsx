import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProductThunk } from '../store/slices/product.slice';
import { filterCategoriesThunk } from '../store/slices/product.slice';
import { filterTiltleThunk } from '../store/slices/product.slice';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const products = useSelector( state => state.product )
  const dispatch = useDispatch()
  const [ categories, setCategories ] = useState([]);
  const [ inputSearch, setInputSearch ] = useState("");

  useEffect( ()  => {
    dispatch( getProductThunk() )

    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
      .then( resp => setCategories(resp.data))
      .catch( err => console.error(err))

  }, []) 



  return (
    <div>
      <Container className='mt-5'>
        <Row className='home py-3'>
          {
            categories.map( category => (
              <Col key={category.id}>
                <Button 
                  className='w-100 fw-bold'
                  onClick={() => dispatch( filterCategoriesThunk( category.id ) )}>
                    {category.name}
                </Button>
              </Col>
            ))
          }
          <Col>
            <Button
              className='w-100 fw-bold'
              onClick={() => dispatch( getProductThunk() )}
              >
                All
            </Button>
          </Col>
        </Row> 
        <Row>
          <Col>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Buacar productos"
              aria-label="Product's name"
              aria-describedby="basic-addon2"
              value={ inputSearch }
              onChange={ e => setInputSearch(e.target.value) }
            />
            <Button 
              variant='primary' 
              onClick={ () => dispatch( filterTiltleThunk(inputSearch) ) }
            >
              Search
            </Button>
          </InputGroup>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} xl={4} className='py-3'>
          {
            products?.map( item => (
              <Col className='mb-3' key={item.id}>
                <Card className='p-3' style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.images[0]?.url}/>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text><strong>Price:</strong> S/{item.price}</Card.Text>
                    <Button 
                      className='w-100 fs-6' variant="primary"
                      as={ Link }
                      to={`/products/${item.id}`}
                      >
                      Ver detalle
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  )
}

export default Home
