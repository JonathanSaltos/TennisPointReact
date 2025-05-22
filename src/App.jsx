import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './componentes/Footer.jsx';
import Header from './componentes/Header.jsx';
import Eslogan from './componentes/Eslogan.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs.jsx'; // ajusta la ruta según tu estructura
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import Confirmacion from './pages/ConfirmacionPedido.jsx';
import Formulario from './pages/FormularioPedido.jsx';
import Gracias from './pages/Gracias.jsx';
import Pedidos from './pages/Pedidos.jsx';
import PedidoDetalle from './pages/PedidoDetalle.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';

function App() {

  return (
    <div>
      <Header />
      <Eslogan />
      <Routes>
        <Route path="/" element={<Home />}>  </Route>
        <Route path="/ConfirmacionPedido" element={<Confirmacion />}>  </Route>
        <Route path="/FormularioPedido" element={<Formulario />}></Route>
        <Route path="/pedidos" element={<Pedidos />} ></Route>
        <Route path="/pedido/:id" element={<PedidoDetalle />}></Route>
        <Route path="/gracias" element={<Gracias />} ></Route>
        <Route path="/registro" element={<Register />}> </Route>
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/aboutus" element={<AboutUs />} ></Route>
        <Route path="/contacto" element={<ContactUs />} ></Route>
      </Routes>

      <Footer />
    </div>
  )
}

export default App;
