import React, { useState, useEffect } from 'react';
import './styles/App.css';
import ProductForm from './components/ProductForm';
import ContentType from './components/ContentType';
import GeneratedContent from './components/GeneratedContent';
import StyleOptions from './components/StyleOptions';
import { fetchProducts, generateContent, completeProduct, generateProductImage } from './services/api';

function App() {
  // State for product data
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customProduct, setCustomProduct] = useState({
    name: '',
    price: '',
    brand: '',
    basic_description: '',
    category: '',
    subcategory: '',
    features: [],
    materials: [],
    colors: [],
    tags: []
  });
  
  // State for content generation
  const [selectedContentTypes, setSelectedContentTypes] = useState(['product_description']);
  const [styleOptions, setStyleOptions] = useState({
    tone: 'professional',
    length: 'medium',
    audience: 'general',
    keywords: []
  });
  const [socialMediaPlatforms, setSocialMediaPlatforms] = useState({
    instagram: true,
    facebook: true,
    twitter: true,
    linkedin: false
  });
  const [imageStyleOptions, setImageStyleOptions] = useState({
    background: 'white',
    lighting: 'studio',
    angle: 'front'
  });
  
  // State for generated content
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    loadProducts();
  }, []);
  
  // Handle product selection
  const handleProductSelect = (productId) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
    setCustomProduct({
      name: '',
      price: '',
      brand: '',
      basic_description: '',
      category: '',
      subcategory: '',
      features: [],
      materials: [],
      colors: [],
      tags: []
    });
  };
  
  // Handle custom product changes
  const handleCustomProductChange = (updatedProduct) => {
    setCustomProduct(updatedProduct);
    setSelectedProduct(null);
  };
  
  // Handle content type selection
  const handleContentTypeChange = (contentTypes) => {
    setSelectedContentTypes(contentTypes);
  };
  
  // Handle style options changes
  const handleStyleChange = (styleOptions) => {
    setStyleOptions(styleOptions);
  };
  
  // Handle social media platform selection
  const handleSocialMediaChange = (platforms) => {
    setSocialMediaPlatforms(platforms);
  };
  
  // Handle image style options changes
  const handleImageStyleChange = (options) => {
    setImageStyleOptions(options);
  };
  
  // Generate content based on selected options
  const handleGenerateContent = async () => {
    setIsLoading(true);
    try {
      const productData = selectedProduct || customProduct;
      
      // Check if product image generation is selected
      if (selectedContentTypes.includes('product_image')) {
        // Handle image generation separately
        const imageResult = await generateProductImage({
          product_data: productData,
          style: imageStyleOptions
        });
        
        // Store image result in generated content
        setGeneratedContent(prevContent => ({
          ...prevContent || {},
          product_image: imageResult.image_result
        }));
        
        // Remove product_image from content types to process with regular content endpoint
        const otherContentTypes = selectedContentTypes.filter(type => type !== 'product_image');
        
        if (otherContentTypes.length > 0) {
          // Create request data for other content types
          const requestData = {
            product_data: productData,
            content_types: otherContentTypes,
            style: styleOptions
          };
          
          // Add social media config if needed
          if (otherContentTypes.includes('social_media')) {
            requestData.social_media = socialMediaPlatforms;
          }
          
          // Generate other content
          const data = await generateContent(requestData);
          setGeneratedContent(prevContent => ({
            ...prevContent,
            ...data.generated_content
          }));
        }
      } else {
        // Handle all other content types through the regular endpoint
        // Create request data
        const requestData = {
          product_data: productData,
          content_types: selectedContentTypes,
          style: styleOptions
        };
        
        // Add social media config if needed
        if (selectedContentTypes.includes('social_media')) {
          requestData.social_media = socialMediaPlatforms;
        }
        
        // Generate content
        const data = await generateContent(requestData);
        setGeneratedContent(data.generated_content);
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle completing a product (generating all missing fields)
  const handleCompleteProduct = async () => {
    setIsLoading(true);
    try {
      const productData = selectedProduct || customProduct;
      
      // Complete the product
      const data = await completeProduct({ product_data: productData });
      
      // If we're working with a custom product, update it
      if (!selectedProduct) {
        setCustomProduct(data.completed_product);
      }
      
      // Set generated content
      setGeneratedContent({
        missing_fields: data.completed_product
      });
    } catch (error) {
      console.error('Error completing product:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>AI-Powered Product Description Generator</h1>
      </header>
      
      <main className="app-content">
        <div className="configuration-section">
          <ProductForm 
            products={products}
            selectedProduct={selectedProduct}
            customProduct={customProduct}
            onProductSelect={handleProductSelect}
            onCustomProductChange={handleCustomProductChange}
          />
          
          <ContentType 
            selectedContentTypes={selectedContentTypes}
            onContentTypeChange={handleContentTypeChange}
          />
          
          <StyleOptions 
            styleOptions={styleOptions}
            socialMediaPlatforms={socialMediaPlatforms}
            imageStyleOptions={imageStyleOptions}
            onStyleChange={handleStyleChange}
            onSocialMediaChange={handleSocialMediaChange}
            onImageStyleChange={handleImageStyleChange}
            showSocialMedia={selectedContentTypes.includes('social_media')}
            showImageOptions={selectedContentTypes.includes('product_image')}
          />
          
          <div className="action-buttons">
            <button 
              className="generate-btn"
              onClick={handleGenerateContent}
              disabled={isLoading || (!selectedProduct && !customProduct.name)}
            >
              {isLoading ? 'Generating...' : 'Generate Content'}
            </button>
            
            <button 
              className="complete-product-btn"
              onClick={handleCompleteProduct}
              disabled={isLoading || (!selectedProduct && !customProduct.name)}
            >
              {isLoading ? 'Processing...' : 'Complete Product'}
            </button>
          </div>
        </div>
        
        <div className="result-section">
          <GeneratedContent 
            content={generatedContent}
            contentTypes={selectedContentTypes}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;