import './header.css'
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
function Header() {

    return (

        <div className='header'>
            <img src={logo} alt="Logo" className="img-fluid rounded" />
        </div>

    )

}

export default Header