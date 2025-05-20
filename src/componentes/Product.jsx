import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function Product() {
    return (
        <div className="card m-3 shadow-sm" style={{ width: '18rem' }}>
        
            <div className="card-body text-center">
                <img src="https://via.placeholder.com/286x160" className="card-img-top" alt="Producto" />
                <h5 className="card-title">Nombre del Producto</h5>
                <p className="card-text">Descripción breve del producto</p>
                <p className="card-text">Precio: €</p>
                <div className="d-flex justify-content-between align-items-center">
                    <Button variant="danger">-</Button>
                    <Button variant="primary">+</Button>
                </div>
            </div>
        </div>
    );
}

export default Product;
