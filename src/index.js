import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Function to inject Tailwind CSS directives into the document head.
 * This simulates having the necessary @tailwind directives in a separate
 * global CSS file, which is required for Tailwind to function.
 */
const injectGlobalStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        /* Custom Inter Font Fallback */
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        }
    `;
    document.head.appendChild(style);
};

// 1. Inject the required global styles first
injectGlobalStyles();

// 2. Locate the root element in index.html
const rootElement = document.getElementById('root');

// 3. Render the application
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Root element with ID 'root' not found in the document.");
}
