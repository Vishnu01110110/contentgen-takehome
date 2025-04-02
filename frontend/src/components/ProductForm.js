import React, { useState } from 'react';

const ProductForm = ({ products, selectedProduct, customProduct, onProductSelect, onCustomProductChange }) => {
  // State for form display mode
  const [mode, setMode] = useState('select'); // 'select' or 'custom'
  
  // Handle product selection
  const handleProductSelect = (e) => {
    const productId = e.target.value;
    if (productId === 'custom') {
      setMode('custom');
      onProductSelect(null);
    } else {
      setMode('select');
      onProductSelect(productId);
    }
  };
  
  // Handle custom product form change
  const handleCustomProductChange = (e) => {
    const { name, value } = e.target;
    onCustomProductChange({
      ...customProduct,
      [name]: value
    });
  };
  
  // Handle array fields (features, materials, colors, tags)
  const handleArrayFieldChange = (e, field) => {
    const value = e.target.value;
    const array = value ? value.split(',').map(item => item.trim()) : [];
    onCustomProductChange({
      ...customProduct,
      [field]: array
    });
  };
  
  return (
    <div className="product-form-container">
      <h2>Product Information</h2>
      
      <div className="form-group">
        <label htmlFor="product-select">Select a product or create a custom one:</label>
        <select 
          id="product-select" 
          value={selectedProduct ? selectedProduct.id : (mode === 'custom' ? 'custom' : '')} 
          onChange={handleProductSelect}
        >
          <option value="">Select a product...</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
          <option value="custom">Create Custom Product</option>
        </select>
      </div>
      
      {mode === 'custom' && (
        <div className="custom-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customProduct.name}
              onChange={handleCustomProductChange}
              placeholder="e.g., Ultra-Comfort Running Shoes"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={customProduct.price}
              onChange={handleCustomProductChange}
              placeholder="e.g., 89.99"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={customProduct.brand}
              onChange={handleCustomProductChange}
              placeholder="e.g., SportsFlex"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="basic_description">Basic Description:</label>
            <textarea
              id="basic_description"
              name="basic_description"
              value={customProduct.basic_description}
              onChange={handleCustomProductChange}
              placeholder="e.g., Lightweight running shoes with responsive cushioning..."
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={customProduct.category}
              onChange={handleCustomProductChange}
              placeholder="e.g., Footwear"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subcategory">Subcategory:</label>
            <input
              type="text"
              id="subcategory"
              name="subcategory"
              value={customProduct.subcategory}
              onChange={handleCustomProductChange}
              placeholder="e.g., Running"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="features">Features (comma-separated):</label>
            <textarea
              id="features"
              value={customProduct.features.join(', ')}
              onChange={(e) => handleArrayFieldChange(e, 'features')}
              placeholder="e.g., Responsive cushioning, Breathable mesh, Durable outsole"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="materials">Materials (comma-separated):</label>
            <textarea
              id="materials"
              value={customProduct.materials.join(', ')}
              onChange={(e) => handleArrayFieldChange(e, 'materials')}
              placeholder="e.g., Synthetic mesh, Rubber outsole, EVA foam midsole"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="colors">Colors (comma-separated):</label>
            <input
              type="text"
              id="colors"
              value={customProduct.colors.join(', ')}
              onChange={(e) => handleArrayFieldChange(e, 'colors')}
              placeholder="e.g., Black/Red, Blue/White, Grey/Orange"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated):</label>
            <input
              type="text"
              id="tags"
              value={customProduct.tags.join(', ')}
              onChange={(e) => handleArrayFieldChange(e, 'tags')}
              placeholder="e.g., running, athletic, comfortable, lightweight"
            />
          </div>
        </div>
      )}
      
      {selectedProduct && (
        <div className="selected-product-info">
          <h3>Selected Product Details</h3>
          <div className="product-details">
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Description:</strong> {selectedProduct.basic_description}</p>
            
            {selectedProduct.category && (
              <p><strong>Category:</strong> {selectedProduct.category}</p>
            )}
            
            {selectedProduct.subcategory && (
              <p><strong>Subcategory:</strong> {selectedProduct.subcategory}</p>
            )}
            
            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div>
                <p><strong>Features:</strong></p>
                <ul>
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedProduct.materials && selectedProduct.materials.length > 0 && (
              <div>
                <p><strong>Materials:</strong></p>
                <ul>
                  {selectedProduct.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedProduct.colors && selectedProduct.colors.length > 0 && (
              <p><strong>Colors:</strong> {selectedProduct.colors.join(', ')}</p>
            )}
            
            {selectedProduct.tags && selectedProduct.tags.length > 0 && (
              <p><strong>Tags:</strong> {selectedProduct.tags.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;