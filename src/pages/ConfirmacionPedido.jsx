import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa'; // Importar icono

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

    return (
        <div className="container mt-4">
            <h2> 
                Confirmación de Pedido
                <FaShoppingCart className="me-2 text-success" />
            </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {productosEnCarrito.map(p => (
                        <tr key={p.id}>
                            <td>
                                {p.imagen ? (
                                    <img src={p.imagen} alt={p.Nombre} width="60" />
                                ) : (
                                    'Sin imagen'
                                )}
                            </td>
                            <td>{p.Nombre}</td>
                            <td>{cart[p.id]}</td>
                            <td>{p.Precio} €</td>
                            <td>{(cart[p.id] * parseFloat(p.Precio)).toFixed(2)} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4>Total: {calcularTotal()} €</h4>
            <Button
                variant="warning"
                onClick={() => navigate('/FormularioPedido')}
            >
                CONTINUAR
            </Button>
        </div>
    );
}

export default Confirmacion;
