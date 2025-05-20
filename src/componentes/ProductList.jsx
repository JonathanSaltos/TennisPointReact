import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product'; // Asegúrate de que la ruta sea correcta

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
      .then((response) => {
        const data = response.data;
        if (data && typeof data === 'object') {
          // Convertir objeto en array de productos con id
          const loadedProducts = Object.entries(data).map(([id, value]) => ({
            id,
            ...value
          }));
          setProducts(loadedProducts);
        } else {
          console.error("La estructura de datos no es válida:", data);
        }
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });
  }, []);

  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-4 mb-4">
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
