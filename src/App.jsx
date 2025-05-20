import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './componentes/Footer.jsx';
import Header from './componentes/Header.jsx';
import Eslogan from './componentes/Eslogan.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs.jsx'; // ajusta la ruta según tu estructura
import ContactUs from './pages/ContactUs';
import Product from './componentes/Product.jsx';

function App() {

  return (
    <div>
      <Header />
      <Product />

      <Eslogan />
      <Routes>
        <Route path="/"> </Route>
        <Route path="/aboutus" element={<AboutUs />} ></Route>
        <Route path="/contacto" element={<ContactUs />} ></Route>
      </Routes>

      <Footer />
    </div>
  )
}

export default App;
