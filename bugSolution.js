```javascript
// pages/product/[id].js

import { Suspense } from 'react';

export default async function ProductPage({ params }) {
  const productId = params.id;

  const res = await fetch(`https://api.example.com/products/${productId}`);
  if (!res.ok) {
    // Handle errors gracefully
    throw new Error('Failed to fetch product data');
  }
  const product = await res.json();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

// Error Boundary (Optional)

function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  const fallbackUI = <div>Something went wrong.</div>;

  const handleError = (error) => {
    setError(error);
  };

  if (error) {
    return fallbackUI;
  }

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default function ProductPage({params}){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <ProductPageContent params={params}/>
      </ErrorBoundary>
    </Suspense>
  );
}
```