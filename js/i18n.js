// Internationalization (i18n) System
class I18n {
  constructor() {
    this.currentLanguage = this.detectLanguage();
    this.translations = {};
    this.init();
  }

  // Detect user's preferred language
  detectLanguage() {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ['en', 'es'].includes(langParam)) {
      return langParam;
    }

    // Check localStorage
    const storedLang = localStorage.getItem('portfolio-language');
    if (storedLang && ['en', 'es'].includes(storedLang)) {
      return storedLang;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'es'].includes(browserLang)) {
      return browserLang;
    }

    // Default to English
    return 'en';
  }

  // Initialize the i18n system
  async init() {
    try {
      await this.loadTranslations();
      this.updatePageLanguage();
      this.updateContent();
    } catch (error) {
      console.error('Error initializing i18n:', error);
    }
  }

  // Load translation files
  async loadTranslations() {
    const isProjects = window.location.pathname.includes('/projects/');
    const basePath = isProjects ? '../translations' : './translations';
    const response = await fetch(`${basePath}/${this.currentLanguage}.json`);
    this.translations = await response.json();
  }

  // Get translation for a key
  t(key, params = {}) {
    const keys = key.split('.');
    let translation = this.translations;
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }

    // Replace parameters in translation
    if (typeof translation === 'string') {
      return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
        return params[param] || match;
      });
    }

    return translation;
  }

  // Change language
  async changeLanguage(lang) {
    if (!['en', 'es'].includes(lang)) return;
    
    this.currentLanguage = lang;
    localStorage.setItem('portfolio-language', lang);
    
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
    
    await this.loadTranslations();
    this.updatePageLanguage();
    this.updateContent();
  }

  // Update HTML lang attribute
  updatePageLanguage() {
    document.documentElement.lang = this.currentLanguage;
  }

  // Update all translatable content
  updateContent() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.placeholder = translation;
      } else if (element.hasAttribute('data-i18n-html')) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    });

    // Update meta tags
    this.updateMetaTags();
  }

  // Update meta tags for SEO
  updateMetaTags() {
    const title = this.t('meta.title');
    const description = this.t('meta.description');
    
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Check if current language is Spanish
  isSpanish() {
    return this.currentLanguage === 'es';
  }

  // Check if current language is English
  isEnglish() {
    return this.currentLanguage === 'en';
  }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});

// Export for use in other scripts
window.I18n = I18n;

