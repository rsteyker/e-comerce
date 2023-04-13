import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { createProductsPurchasesThunk } from "../store/slices/productosPurchaces.slice";
import { useDispatch } from "react-redux";

const ProductsDetails = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({})
  const [ counter, setCounter ] = useState(1)
  const dispatch = useDispatch();


  useEffect( () => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then( resp => setDetail(resp.data))
      .catch( err => console.error(err))
  }, [])

  const addProductsDetails = () =>{
    const data = {
      quantity : counter,
      productId : id
    }
    dispatch( createProductsPurchasesThunk( data ) )
  }

  return (
    <Container className="mt-5 detail-container">
      <Row className="mt-3">
        <Col className="detail-imagen">
          <img src={detail.images?.[0].url} className="img-fluid"/>
        </Col>
      </Row>
      <Row className="detail-info">
        <Col className="detail w-100" lg={9}>
          <h5>{detail.title}</h5>
          <p>{detail.description}</p>
        </Col>
        <Col className="detail-grid mb-5">
          <p><span>Precio: </span>s/{detail.price}</p>
          <Button onClick={() => setCounter(counter - 1)}>-</Button>
          {counter}
          <Button onClick={() => setCounter(counter + 1)}>+</Button>
        </Col>
        <Col>
          <Button className="w-100" onClick={()=>addProductsDetails()}>Agregar a carrito</Button>
        </Col>
      </Row>
    </Container>

  )
}

export default ProductsDetails
