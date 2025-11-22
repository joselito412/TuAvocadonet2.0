import { config, isDevelopment } from '../config/config';

/**
 * Simple analytics tracker
 */
class Analytics {
  constructor() {
    this.enabled = config.enableAnalytics;
    this.sessionId = this.generateSessionId();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Track page view
   * @param {string} pageName
   * @param {object} additionalData
   */
  trackPageView(pageName, additionalData = {}) {
    if (!this.enabled) return;

    const event = {
      type: 'page_view',
      page: pageName,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      url: window.location.href,
      ...additionalData
    };

    this.sendEvent(event);
  }

  /**
   * Track user action
   * @param {string} action
   * @param {object} metadata
   */
  trackAction(action, metadata = {}) {
    if (!this.enabled) return;

    const event = {
      type: 'user_action',
      action,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      ...metadata
    };

    this.sendEvent(event);
  }

  /**
   * Track errors
   * @param {Error} error
   * @param {object} context
   */
  trackError(error, context = {}) {
    if (!config.enableErrorTracking) return;

    const errorEvent = {
      type: 'error',
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      ...context
    };

    this.sendEvent(errorEvent);
    
    // In development, also log to console
    if (isDevelopment()) {
      console.error('Tracked error:', error, context);
    }
  }

  /**
   * Send event to analytics service
   * @param {object} event
   */
  sendEvent(event) {
    if (isDevelopment()) {
      console.log('[Analytics]', event);
      return;
    }

    // In production, send to analytics service
    // Example: send to Google Analytics, Mixpanel, etc.
    try {
      // navigator.sendBeacon('/api/analytics', JSON.stringify(event));
      // or use fetch for more control
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }
}

export const analytics = new Analytics();

/**
 * Performance monitoring
 */
export const performanceMonitor = {
  measurePageLoad() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      analytics.trackAction('page_load_complete', {
        loadTime: pageLoadTime,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart
      });
    });
  },

  measureComponentRender(componentName, duration) {
    if (isDevelopment()) {
      console.log(`[Performance] ${componentName} rendered in ${duration}ms`);
    }
    
    if (duration > 1000) {
      analytics.trackAction('slow_component_render', {
        component: componentName,
        duration
      });
    }
  }
};
