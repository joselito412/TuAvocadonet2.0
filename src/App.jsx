import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import WhatWeDoPage from './pages/WhatWeDoPage';
import PersonasPage from './pages/PersonasPage';
import AboutPage from './pages/AboutPage';
import LegalPage from './pages/LegalPage';
import BlogPage from './pages/BlogPage';
import { analytics, performanceMonitor } from './utils/analytics';

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
    <>
      <Navigation />
      
      <ErrorBoundary name="PageContent">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/que-hacemos" element={<WhatWeDoPage />} />
          <Route path="/personas" element={<PersonasPage />} />
          <Route path="/sobre-nosotros" element={<AboutPage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </ErrorBoundary>

      <Footer />

      <WhatsAppButton />
    </>
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
