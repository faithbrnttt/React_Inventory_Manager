// App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';


function App() {
  const [products, setProducts] = useState([]);
  const [mode, setMode] = useState('create');
  const [selectedId, setSelectedId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:3000/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if ((mode === 'update' || mode === 'delete') && selectedId) {
      const product = products.find(p => p._id === selectedId);
      setSelectedProduct(product || null);
    } else {
      setSelectedProduct(null);
    }
  }, [mode, selectedId, products]);

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="sub-container">
        <ToastContainer />
        <h1>Product Manager</h1>
        <hr></hr>

        <div className="btns">
          <button className="btn" onClick={() => setMode('create')}>Add</button>
          <button className="btn" onClick={() => setMode('update')}>Update</button>
          <button className="btn" onClick={() => setMode('delete')}>Delete</button>
        </div>

        {(mode === 'update' || mode === 'delete') && (
          <select className="product-select" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
            <option value="">Select Product</option>
            {filteredProducts.map(product => (
              <option key={product._id} value={product._id}>
                {product.name} ({product.category})
              </option>
            ))}
          </select>
        )}

        <Form
          mode={mode}
          selectedProduct={selectedProduct}
          onSuccess={() => {
            fetchProducts();
            setSelectedId('');
            setSelectedProduct(null);
          }}
        />



        <div className="product-display">
          <h2>Current Products</h2>
          <hr></hr>

          <input
            className="product-search"
            type="text"
            placeholder="Search by name or category"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <ul className="product-list">
            {filteredProducts.map(product => (
              <li key={product._id}>
                {product.name} ({product.category}) - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;