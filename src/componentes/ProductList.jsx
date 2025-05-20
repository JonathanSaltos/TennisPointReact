import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product'; // Asegúrate de que la ruta sea correcta

function ProductList() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : {};
    });

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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleAdd = (id) => {
        setCart((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const handleRemove = (id) => {
        setCart((prev) => {
            if (!prev[id]) return prev;
            const updated = { ...prev, [id]: prev[id] - 1 };
            if (updated[id] <= 0) delete updated[id];
            return updated;
        });
    };

   

    return (

        <div className="container mt-4">
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <Product
                            product={product}
                            quantity={cart[product.id] || 0}
                            onAdd={() => handleAdd(product.id)}
                            onRemove={() => handleRemove(product.id)}
                        />
                    </div>
                ))}
            </div>
            
        </div>

    );
}




export default ProductList;
