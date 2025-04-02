# AI-Powered Product Description Generator - Backend

This is the backend component of the AI-Powered Product Description Generator take-home assignment. It provides a FastAPI API that interfaces with LLMs to generate compelling product descriptions, marketing copy, and product images based on basic product information.

## Project Structure

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
└── README.md            # This file
```

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   MODEL_NAME=gpt-3.5-turbo
   MAX_TOKENS=1000
   TEMPERATURE=0.7
   DATA_PATH=data/sample_products.json
   ```

5. Run the application:
   ```
   uvicorn app:app --host 0.0.0.0 --port 5000 --reload
   ```

The server will start on `http://localhost:5000`. You can access the automatic API documentation at `http://localhost:5000/docs`.

## API Endpoints

### GET /api/products
Returns the full product catalog.

#### Response
```json
[
  {
    "id": "prod001",
    "name": "Ultra-Comfort Running Shoes",
    "price": 89.99,
    "brand": "SportsFlex",
    "basic_description": "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
    "category": "Footwear",
    "subcategory": "Running",
    "features": ["Responsive cushioning", "Breathable mesh", "Durable outsole"],
    "materials": ["Synthetic mesh", "Rubber outsole", "EVA foam midsole"],
    "colors": ["Black/Red", "Blue/White", "Grey/Orange"],
    "tags": ["running", "athletic", "comfortable", "lightweight"]
  },
  ...
]
```

### POST /api/generate-content
Generates different types of content based on product data.

#### Request Body
```json
{
  "product_data": {
    "name": "Ultra-Comfort Running Shoes",
    "price": 89.99,
    "brand": "SportsFlex",
    "basic_description": "Lightweight running shoes with cushioning.",
    "category": "Footwear",
    "subcategory": "Running",
    "features": ["Responsive cushioning", "Breathable mesh"]
  },
  "content_types": ["product_description", "seo", "marketing_email"],
  "style": {
    "tone": "enthusiastic",
    "length": "medium",
    "audience": "fitness enthusiasts",
    "keywords": ["comfortable", "performance", "lightweight"]
  },
  "social_media": {
    "instagram": true,
    "facebook": true,
    "twitter": true,
    "linkedin": false
  }
}
```

#### Response
```json
{
  "product": {
    // Original product data
  },
  "generated_content": {
    "product_description": {
      "detailed_description": "Elevate your running experience with the Ultra-Comfort Running Shoes..."
    },
    "seo": {
      "title": "Ultra-Comfort Running Shoes: Lightweight Performance Footwear | SportsFlex",
      "description": "Experience responsive cushioning and breathable comfort with SportsFlex Ultra-Comfort Running Shoes. Designed for performance and all-day comfort."
    },
    "marketing_email": {
      "subject": "Introducing Ultra-Comfort: Revolutionary Running Shoes That Feel Like Walking on Clouds",
      "body": "Dear Runner,\n\nPrepare to transform your running experience..."
    }
  }
}
```

### POST /api/complete-product
Generates all missing fields for a product.

#### Request Body
```json
{
  "product_data": {
    "name": "Wireless Bluetooth Earbuds",
    "price": 79.99,
    "brand": "AudioTech",
    "basic_description": "Wireless earbuds with noise cancellation."
  }
}
```

#### Response
```json
{
  "original_product": {
    // Original product data
  },
  "completed_product": {
    "name": "Wireless Bluetooth Earbuds",
    "price": 79.99,
    "brand": "AudioTech",
    "basic_description": "Wireless earbuds with noise cancellation.",
    "category": "Electronics",
    "subcategory": "Audio",
    "features": ["Active noise cancellation", "Bluetooth 5.0", "Water resistant", "8-hour battery life", "Touch controls"],
    "materials": ["Silicone ear tips", "Plastic housing", "Aluminum charging case"],
    "colors": ["Black", "White", "Navy Blue"],
    "tags": ["wireless", "bluetooth", "earbuds", "audio", "noise-cancellation"],
    "detailed_description": "...",
    "seo_title": "...",
    "seo_description": "...",
    "marketing_copy": {
      "email": { "subject": "...", "body": "..." },
      "social_media": { "instagram": "...", "facebook": "...", "twitter": "..." }
    }
  }
}
```

### POST /api/generate-image
Generates a product image based on product data.

#### Request Body
```json
{
  "product_data": {
    "name": "Ultra-Comfort Running Shoes",
    "brand": "SportsFlex",
    "category": "Footwear",
    "subcategory": "Running",
    "colors": ["Black/Red"],
    "materials": ["Synthetic mesh", "Rubber outsole"]
  },
  "style": {
    "background": "white",
    "lighting": "studio",
    "angle": "three-quarter"
  }
}
```

#### Response
```json
{
  "product": {
    // Original product data
  },
  "image_result": {
    "image_url": "https://example.com/generated-image.jpg",
    "prompt": "A professional product photograph of Ultra-Comfort Running Shoes, a Footwear Running, color: Black/Red, made of Synthetic mesh, Rubber outsole, SportsFlex brand style, white background, studio lighting, three-quarter angle view, high resolution, professional product photography, detailed, studio lighting"
  }
}
```

## Implementation Tasks

As part of this assignment, you need to implement the following components:

### 1. LLM Service (services/llm_service.py)

The LLM service is responsible for generating various types of content. You need to implement:

- **`generate_product_description`**: Create compelling product descriptions
- **`generate_seo_content`**: Generate SEO-optimized titles and meta descriptions
- **`generate_marketing_email`**: Craft marketing email subject lines and body content
- **`generate_social_media_content`**: Create platform-specific social media posts
- **`generate_missing_fields`**: Generate missing product fields and attributes
- **`generate_product_image`**: Create prompts for generating product images

Each of these methods requires effective prompt engineering to get high-quality results.

### 2. Prompt Engineering

The key challenge is creating effective prompts for each content type:

- Design prompts that effectively use product attributes
- Create different prompt templates for different content types
- Implement strategies for brand voice consistency
- Ensure generated content is appropriate for the target audience
- Craft effective image generation prompts

### 3. Error Handling

Implement robust error handling throughout the API, including:
- Invalid input validation
- LLM API error handling
- Image generation error handling
- Graceful error responses

## Testing Your Implementation

A test script (`candidate_test.py`) is provided in the root directory to help you test your implementation. Run it after starting your FastAPI server:

```
python candidate_test.py
```

## Evaluation Criteria

Your backend implementation will be evaluated based on:

1. **Prompt Engineering Quality (50%)**
   - Quality of generated content across different types
   - Effectiveness of prompts in utilizing product attributes
   - Adaptability to different product types and missing data
   - Quality and relevance of generated image prompts

2. **API Design and Implementation (30%)**
   - RESTful API design and implementation
   - Error handling and edge cases
   - Response time and efficiency

3. **Code Quality (20%)**
   - Code readability and organization
   - Documentation and comments
   - Error handling approaches

## Tips for Success

- **Focus on prompt engineering**: This is the most critical part of the assignment. Consider how to structure your prompts to get the best results.
- **Test with various products**: Try different types of products to ensure your implementation adapts well.
- **Consider token limitations**: Be mindful of the LLM's context window limitations when designing your prompts.
- **Document your approach**: In addition to code comments, consider adding a section in your project README explaining your prompt engineering strategy.
- **Implement error handling**: Ensure your code gracefully handles potential failures, especially when calling external APIs.