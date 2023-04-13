import axios from "axios";
import { useState, useEffect } from "react";
import getConfig from "../helpers/getConfig";
import Card from 'react-bootstrap/Card';

const Purchases = () => {
  const [purchases, setPurchases]= useState([])

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, getConfig() )
      .then(resp => setPurchases(resp.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1 className="text-center">Mis Compras</h1>
      {
        purchases.map( item => (
          <Card 
          key={item.id} 
          style={{ width: "100%", display: "flex", flexDirection: "row", padding: '10px' }}>
            <Card.Img style={{width: 150}} className="img-fluid" variant="left" src={item.product.images?.[0].url} />
            <Card.Body>
              <Card.Title>{item.product.title}</Card.Title>
              <Card.Text>
                {item.product.description}
            </Card.Text>
            </Card.Body>
        </Card>
        ))
      }
    </div>
  )
}

export default Purchases
