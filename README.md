# i95dev AI Engineering Intern - Take-Home Assignment
## AI-Powered Product Description Generator

### Overview

Welcome to the i95dev AI Engineering Intern take-home assignment! This project is designed to evaluate your skills in working with LLMs, prompt engineering, and full-stack development in an eCommerce context.

Your task is to build a product description generator that leverages LLMs to create compelling, SEO-optimized product descriptions and marketing copy based on basic product information. The system should also be able to generate missing product fields and product images using all available product data.

### Project Requirements

#### Backend (Python)
- Develop a REST API using FastAPI that interfaces with an LLM (OpenAI GPT-3.5-turbo or similar)
- Implement prompt engineering to generate:
  - Compelling product descriptions
  - SEO-optimized titles and meta descriptions
  - Marketing copy in various formats (email, social media, etc.)
  - Missing product fields (categories, tags, features, etc.)
  - Image descriptions based on product data
  - Product image generation prompts for DALL-E or similar image generation models
- Create endpoints for:
  - Processing product data and generating content
  - Selecting different content types and formats
  - Customizing tone, length, and style of generated content
  - Generating product images based on product attributes

#### Frontend (React)
- Build a clean interface for entering product information
- Implement a form with fields for product attributes (name, basic description, price, features, etc.)
- Create tabs for different content types (descriptions, marketing copy, SEO elements, image generation)
- Implement a preview and edit functionality for generated content
- Add a component for visualizing generated image descriptions
- Include an image generation component that displays generated product images

### Starter Kit

We've provided a starter kit to help you focus on the core technical challenges rather than boilerplate setup. The kit includes:

#### Backend Structure
```
backend/
│
├── app.py               # Main FastAPI application
├── requirements.txt     # Python dependencies
├── config.py            # Configuration (add your API keys here)
├── data/
│   └── sample_products.json    # Sample product data
│
├── services/
│   ├── __init__.py
│   ├── llm_service.py   # Service for LLM interactions (implement this)
│   └── product_service.py  # Service for product data operations
│
└── README.md            # Backend setup instructions
```

#### Frontend Structure
```
frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── App.js           # Main application component
│   ├── index.js         # Entry point
│   ├── components/
│   │   ├── ProductForm.js   # Form for product data input (implement this)
│   │   ├── ContentType.js   # Content type selector (implement this)
│   │   ├── GeneratedContent.js  # Display for generated content (implement this)
│   │   └── StyleOptions.js  # Style and tone configuration (implement this)
│   │
│   ├── services/
│   │   └── api.js       # API client for backend communication
│   │
│   └── styles/
│       └── App.css      # Styling
│
├── package.json         # NPM dependencies
└── README.md            # Frontend setup instructions
```

### Sample Dataset

We've provided a sample product dataset (`sample_products.json`) that contains 15 products with varying levels of completeness. Some products have missing fields that your system should be able to generate. Each product has the following structure:

```json
{
  "id": "prod123",
  "name": "Ultra-Comfort Running Shoes",
  "price": 89.99,
  "brand": "SportsFlex",
  "basic_description": "Lightweight running shoes with cushioning.",
  "category": "Footwear",
  "subcategory": "Running",
  "features": ["Responsive cushioning", "Breathable mesh"],
  "materials": ["Synthetic mesh", "Rubber outsole"],
  "colors": ["Black/Red", "Blue/White", "Grey/Orange"],
  "tags": ["running", "athletic", "comfortable"],
  "image_url": "https://example.com/images/shoes123.jpg",
  "seo_title": "",
  "seo_description": "",
  "detailed_description": "",
  "marketing_copy": {
    "email": "",
    "social_media": {
      "instagram": "",
      "facebook": ""
    }
  }
}
```

Note that some fields are intentionally left empty in many products. Your system should be able to generate content for these empty fields.

### Key Implementation Guidelines

#### LLM Integration
- You should use OpenAI's API (GPT-3.5-turbo is sufficient) or another LLM API of your choice
- Implement proper error handling for API calls
- Use appropriate context windows and token limits

#### Prompt Engineering
- Design prompts that effectively utilize product attributes to generate compelling content
- Create different prompt templates for different content types
- Implement strategies for maintaining brand voice and style consistency
- Ensure generated content is SEO-friendly for relevant fields
- Craft effective prompts for generating realistic product images that match product attributes

#### API Design
- Create RESTful endpoints with proper request/response formats
- Implement appropriate error handling
- Consider performance and optimization for potentially large requests

#### React Frontend
- Focus on clean, functional UI rather than elaborate designs
- Implement responsive components that adapt to different screen sizes
- Use React state management appropriately (useState, useContext, etc.)

### Stretch Goals (Optional)

If you complete the core requirements and want to demonstrate additional skills, consider implementing one or more of these stretch goals:

1. Add A/B testing capabilities for different content styles
2. Implement a ratings system to provide feedback on generated content
3. Create a batch processing feature for generating content for multiple products
4. Add a multilingual option to generate content in different languages
5. Implement image generation suggestions based on product data (text prompts for image generation)

### Evaluation Criteria

Your submission will be evaluated based on:

1. **Prompt Engineering Quality (30%)**
   - Quality of generated content across different types
   - Effectiveness of prompts in utilizing product attributes
   - Adaptability to different product types and missing data
   - Quality and relevance of generated image prompts

2. **API Design and Implementation (25%)**
   - RESTful API design and implementation
   - Error handling and edge cases
   - Code organization and structure
   - Integration with image generation APIs

3. **Frontend Implementation (25%)**
   - Component architecture and organization
   - User experience and interface design
   - Preview and editing capabilities
   - Image display and management

4. **Code Quality (20%)**
   - Code readability and documentation
   - Proper use of version control (commit messages, organization)
   - Error handling and edge cases

### Submission Guidelines

1. **GitHub Repository**
   - Create a **public** GitHub repository with your implementation
   - Ensure your repository includes:
     - Complete source code for both frontend and backend
     - A comprehensive README with setup instructions
     - Documentation of your approach, especially for prompt engineering

2. **Deployment (Optional)**
   - If possible, deploy your application (e.g., Vercel, Netlify, Heroku)
   - Include the deployed URL in your README

3. **Submission Timeline**
   - Complete the assignment within 7 days of receiving it
   - Submit by **replying to the original assessment email** with:
     - GitHub repository link
     - Brief overview of your approach (1-2 paragraphs)
     - Any challenges you faced and how you overcame them
     - Time spent on the assignment

### Setup Instructions

#### Backend Setup
1. Navigate to the `backend` directory
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file based on `.env.example` and add your LLM API key
6. Run the application: `uvicorn app:app --host 0.0.0.0 --port 5000 --reload`

#### Frontend Setup
1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. The application should open at `http://localhost:3000`

### Notes and Tips

- **API Keys**: Never commit your API keys to GitHub. Use environment variables.
- **Time Management**: Focus on core functionality first, then enhance if time permits.
- **Documentation**: Document your approach, especially your prompt engineering strategy.
- **Code Quality**: Clean, well-organized code is more important than feature quantity.
- **Questions**: If you have questions, email recruiting@i95dev.com with "Question: AI Intern Take-Home" as the subject.

### Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [SEO Best Practices for Product Descriptions](https://www.shopify.com/blog/seo-product-descriptions)

We're excited to see your implementation and approach! Good luck!