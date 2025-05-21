import './header.css';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
import { Link } from 'react-router';
import { Nav } from 'react-bootstrap';

function Header() {
    return (
        <div className='header'>
            <img src={logo} alt="Logo" className="img-fluid rounded" />
            <Nav className="container d-flex justify-content-between">
                <Nav.Item>
                    <Link to="/" className="text-white text-decoration-none">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/aboutus" className="text-white me-3">About Us</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/contacto" className="text-white me-3">Contacto</Link>
                </Nav.Item>

            </Nav>
        </div>
    );
}

export default Header;
