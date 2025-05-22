import './header.css';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
import { Link } from 'react-router';
import { Nav } from 'react-bootstrap';

function Header() {
    const email = localStorage.getItem('email'); // obtener el email guardado

    return (
        <div className='header'>
            <img src={logo} alt="Logo" className="img-fluid rounded" />
            
            <Nav className="container d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3">
                    <Nav.Item>
                        <Link to="/" className="text-white text-decoration-none">Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/pedidos" className="text-white text-decoration-none">Pedidos</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/aboutus" className="text-white text-decoration-none">About Us</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/contacto" className="text-white text-decoration-none">Contacto</Link>
                    </Nav.Item>
                </div>

                <div className="d-flex gap-3 align-items-center">
                    {email ? (
                        <span className="text-white">Bienvenido, <strong>{email}</strong></span>
                    ) : (
                        <>
                            <Nav.Item>
                                <Link className="text-white text-decoration-none" to="/registro">Registrarse</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="text-white text-decoration-none" to="/login">Login</Link>
                            </Nav.Item>
                        </>
                    )}
                </div>
            </Nav>
        </div>
    );
}

export default Header;

