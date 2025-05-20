import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function Product({ product }) {
    return (
        <div className="card m-3 shadow-sm h-100 d-flex flex-column" style={{ width: '18rem' }}>
            <img
                src={product.imagen}
                className="card-img-top"
                alt={product.Nombre}
                style={{ height: '320px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
                <h5 className="card-title">{product.Nombre}</h5>
                <p className="card-text">{product.Descripción}</p>
                <p className="card-text fw-bold">{product.Precio} €</p>
                <div className="d-flex justify-content-between align-items-center">
                    <Button variant="danger">-</Button>
                    <Button variant="primary">+</Button>
                </div>
            </div>
        </div>
    );
}

export default Product;

