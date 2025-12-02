import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { WhatsAppMenuProvider } from './contexts/WhatsAppMenuContext';
import { analytics, performanceMonitor } from './utils/analytics';

// Lazy load all pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const WhatWeDoPage = lazy(() => import('./pages/WhatWeDoPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const SustainabilityPage = lazy(() => import('./pages/SustainabilityPage'));
const WhatsAppPage = lazy(() => import('./pages/WhatsAppPage'));

// Loading component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid #E8F5E9',
      borderTop: '4px solid #2E7D32',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ color: '#2E7D32', fontSize: '1.1rem' }}>Cargando...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    analytics.trackPageView(location.pathname);
  }, [location]);

  useEffect(() => {
    // Measure page load performance
    performanceMonitor.measurePageLoad();
  }, []);

  return (
    <WhatsAppMenuProvider>
      <Navigation />
      
      <ErrorBoundary name="PageContent">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/que-hacemos" element={<WhatWeDoPage />} />
            <Route path="/usuarios" element={<UsersPage />} />
            <Route path="/sobre-nosotros" element={<AboutPage />} />
            <Route path="/sostenibilidad" element={<SustainabilityPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/whatsapp" element={<WhatsAppPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      <Footer />

      <WhatsAppButton />
    </WhatsAppMenuProvider>
  );
}

function App() {
  return (
    <ErrorBoundary name="App">
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
