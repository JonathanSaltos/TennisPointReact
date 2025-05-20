import ProductList from "../componentes/ProductList";

function Home() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Productos más vendidos</h1>
      <ProductList />
    </div>
  );
}

export default Home;