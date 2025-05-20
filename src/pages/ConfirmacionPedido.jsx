import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
function Confirmacion() {
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
        setCart(savedCart);

        axios
            .get('https://dsm-react-webapp-default-rtdb.europe-west1.firebasedatabase.app/productos.json')
            .then(res => {
                const data = res.data;
                const prodArray = Object.entries(data || {}).map(([id, val]) => ({ id, ...val }));
                setProducts(prodArray);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }, []);

    const calcularTotal = () => {
        return products.reduce((total, p) => {
            const cantidad = cart[p.id] || 0;
            return total + cantidad * parseFloat(p.Precio);
        }, 0).toFixed(2);
    };

    const productosEnCarrito = products.filter(p => cart[p.id] > 0);
console.log(productosEnCarrito)
    return (
        <div className="container mt-4">
            <h2>Confirmación de Pedido</h2>
          
        </div>
    );
}

export default Confirmacion;
