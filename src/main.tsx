import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import App from './App'
import './index.css'

// Handle chunk load errors automatically
window.addEventListener('vite:preloadError', () => {
  window.location.reload();
});

// Handle 404 redirects from GitHub Pages
const RedirectHandler = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('p');
    if (redirectPath) {
      urlParams.delete('p');
      const search = urlParams.toString();
      const newPath = redirectPath + (search ? '?' + search : '') + window.location.hash;
      navigate(newPath, { replace: true });
    }
  }, [navigate]);
  
  return null;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RedirectHandler />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
