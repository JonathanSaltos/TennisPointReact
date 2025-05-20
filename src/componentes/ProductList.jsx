import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product'; // Asegúrate de que la ruta sea correcta
import Button from 'react-bootstrap/Button';
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

    const calcularTotal = () => {
        return products.reduce((total, p) => {
            const cantidad = cart[p.id] || 0;
            return total + cantidad * parseFloat(p.Precio);
        }, 0).toFixed(2);
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
            <div className="text-end mt-4">
                <h4>Total del pedido: {calcularTotal()} €</h4>
                {Object.keys(cart).length > 0 && (
                    <div className="d-flex justify-content-end mt-4">
                        <Button
                              variant="warning"
                            onClick={() => window.location.href = '/confirmacionPedido'}
                        >
                            REALIZAR PEDIDO
                        </Button>
                    </div>
                )}
            </div>
        </div>

    );
}

export default ProductList;
