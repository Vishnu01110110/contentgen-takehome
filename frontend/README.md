# AI-Powered Product Description Generator - Frontend

This is the frontend component of the AI-Powered Product Description Generator take-home assignment. It provides a React interface that allows users to generate compelling, SEO-optimized product descriptions, marketing copy, and product images based on basic product information.

## Project Structure

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
└── README.md            # This file
```

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

The application will open at `http://localhost:3000`.

## Implementation 
Almost no changes were made to the frontend. The Ui already ahde everything assumed nothing was needed here

Just added one feature to display images which was not there before