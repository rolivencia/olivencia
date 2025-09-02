import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

/**
 * Configuration interface for SEO settings
 * Defines all possible SEO-related metadata that can be configured for a page
 */
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'profile' | 'article';
  siteName?: string;
  locale?: string;
  alternateLocales?: string[];
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  /**
   * Default SEO configuration for the site
   * These values are used as fallbacks when specific page configuration is not provided
   */
  private defaultConfig: SEOConfig = {
    title: 'Ramiro Olivencia - R&D Software Engineer',
    description: 'Senior Software Engineer & Angular Technical Lead with 11+ years of proven expertise in architecting scalable web solutions and mentoring development teams.',
    keywords: 'Angular, TypeScript, Frontend Developer, Tech Lead, Software Engineer, Web Development, JavaScript, HTML, CSS, FrontendCafé',
    author: 'Ramiro Olivencia',
    type: 'profile',
    siteName: 'Ramiro Olivencia',
    locale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterSite: '@ramiroolivencia',
    twitterCreator: '@ramiroolivencia'
  };

  /**
   * Main method to update all SEO-related metadata for a page
   * This is the primary entry point for configuring SEO on any page
   * 
   * @param config - Partial SEO configuration that overrides default values
   */
  updateSEO(config: Partial<SEOConfig>) {
    // Merge provided config with default configuration
    // This ensures we always have complete metadata even if only some values are provided
    const seoConfig = { ...this.defaultConfig, ...config };
    
    // Update the page title in the browser tab
    this.title.setTitle(seoConfig.title);
    
    // Update basic HTML meta tags (description, keywords, author, etc.)
    this.updateBasicMetaTags(seoConfig);
    
    // Update Open Graph protocol tags for social media sharing
    this.updateOpenGraphTags(seoConfig);
    
    // Update Twitter Card tags for enhanced Twitter sharing
    this.updateTwitterCardTags(seoConfig);
    
    // Update technical SEO tags (canonical URLs, language tags, performance hints)
    this.updateTechnicalSEOTags(seoConfig);
    
    // Add JSON-LD structured data for search engines if provided
    if (seoConfig.structuredData) {
      this.addStructuredData(seoConfig.structuredData);
    }
  }

  /**
   * Updates fundamental HTML meta tags that search engines use for basic page information
   * These tags are essential for SEO and help search engines understand page content
   * 
   * @param config - Complete SEO configuration object
   */
  private updateBasicMetaTags(config: SEOConfig) {
    // Page description that appears in search results snippets
    this.meta.updateTag({ name: 'description', content: config.description });
    
    // Keywords help search engines understand page topics (less important in modern SEO)
    this.meta.updateTag({ name: 'keywords', content: config.keywords || '' });
    
    // Author information for content attribution
    this.meta.updateTag({ name: 'author', content: config.author || '' });
    
    // Robot directives tell search engine crawlers how to handle this page
    // index: allow indexing, follow: follow links, max-snippet/-1: no limit on snippet length
    // max-video-preview/-1: no limit on video preview, max-image-preview:large: allow large image previews
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large' });
    
    // Theme color defines the browser UI color on mobile devices
    // This creates a consistent brand experience when users visit the site
    this.meta.updateTag({ name: 'theme-color', content: '#ffffff' });
    this.meta.updateTag({ name: 'msapplication-TileColor', content: '#ffffff' });
    
    // Security and compatibility headers
    // X-UA-Compatible ensures the latest rendering engine is used in IE
    this.meta.updateTag({ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' });
    
    // Referrer policy controls how much referrer information is sent with requests
    // strict-origin-when-cross-origin provides good privacy while maintaining functionality
    this.meta.updateTag({ name: 'referrer', content: 'strict-origin-when-cross-origin' });
  }

  /**
   * Updates Open Graph protocol tags for rich social media sharing
   * These tags control how the page appears when shared on Facebook, LinkedIn, and other platforms
   * 
   * @param config - Complete SEO configuration object
   */
  private updateOpenGraphTags(config: SEOConfig) {
    // Get the current page URL, falling back to router URL if not explicitly provided
    const currentUrl = config.url || `${this.getBaseUrl()}${this.router.url}`;
    
    // Basic Open Graph tags that define the shared content
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:url', content: currentUrl });
    this.meta.updateTag({ property: 'og:site_name', content: config.siteName || 'Ramiro Olivencia' });
    
    // Locale information helps platforms display content in the correct language/region
    this.meta.updateTag({ property: 'og:locale', content: config.locale || 'en_US' });
    
    // Image configuration for social media previews
    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ property: 'og:image:alt', content: config.title });
      
      // Image dimensions help platforms optimize the display
      // 1200x630 is the recommended size for most social platforms
      this.meta.updateTag({ property: 'og:image:width', content: '1200' });
      this.meta.updateTag({ property: 'og:image:height', content: '630' });
      this.meta.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
    }
    
    // Add alternate locale tags for international sites
    // This helps platforms show the content to users in appropriate regions
    if (config.alternateLocales) {
      config.alternateLocales.forEach(locale => {
        this.meta.updateTag({ property: 'og:locale:alternate', content: locale });
      });
    }
  }

  /**
   * Updates Twitter Card tags for enhanced Twitter sharing experience
   * Twitter Cards provide rich media experiences when URLs are shared on Twitter
   * 
   * @param config - Complete SEO configuration object
   */
  private updateTwitterCardTags(config: SEOConfig) {
    // Card type determines the layout and features available
    // summary_large_image provides the best visual impact for most content
    this.meta.updateTag({ name: 'twitter:card', content: config.twitterCard || 'summary_large_image' });
    
    // Title and description for the Twitter card (can differ from main page title)
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    
    // Twitter site account (usually the organization's main Twitter handle)
    if (config.twitterSite) {
      this.meta.updateTag({ name: 'twitter:site', content: config.twitterSite });
    }
    
    // Twitter creator account (usually the content author's Twitter handle)
    if (config.twitterCreator) {
      this.meta.updateTag({ name: 'twitter:creator', content: config.twitterCreator });
    }
    
    // Image configuration for Twitter card preview
    if (config.image) {
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image:alt', content: config.title });
    }
  }

  /**
   * Updates technical SEO tags that improve search engine crawling and indexing
   * These tags help search engines understand site structure and relationships
   * 
   * @param config - Complete SEO configuration object
   */
  private updateTechnicalSEOTags(config: SEOConfig) {
    const currentUrl = config.url || `${this.getBaseUrl()}${this.router.url}`;
    
    // Canonical URL prevents duplicate content issues by specifying the preferred URL
    this.updateCanonicalUrl(currentUrl);
    
    // Language and alternate language links help search engines serve content to appropriate regions
    this.updateLanguageLinks(config);
    
    // DNS prefetch allows browsers to resolve domain names early, improving performance
    // These are common external domains that might be referenced on the site
    this.addDNSPrefetch([
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ]);
    
    // Preconnect goes further than DNS prefetch by establishing full connections
    // Use for critical resources that will definitely be loaded
    this.addPreconnect([
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]);
  }

  /**
   * Updates the canonical URL to prevent duplicate content penalties
   * Canonical URLs tell search engines which version of a page is the "official" one
   * 
   * @param url - The canonical URL for the current page
   */
  private updateCanonicalUrl(url: string) {
    // Remove any existing canonical link to avoid conflicts
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Create and add new canonical link element
    // This helps prevent duplicate content issues and consolidates page authority
    const canonical = this.document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    this.document.head.appendChild(canonical);
  }

  /**
   * Updates hreflang and language alternate links for international SEO
   * These tags help search engines serve the correct language version to users
   * 
   * @param config - Complete SEO configuration object
   */
  private updateLanguageLinks(config: SEOConfig) {
    // Remove existing hreflang links to avoid conflicts
    const existingHreflangs = this.document.querySelectorAll('link[hreflang]');
    existingHreflangs.forEach(link => link.remove());
    
    // Add x-default hreflang for international targeting
    // This tells search engines which version to show to users who don't match any specific locale
    const defaultLang = this.document.createElement('link');
    defaultLang.setAttribute('rel', 'alternate');
    defaultLang.setAttribute('hreflang', 'x-default');
    defaultLang.setAttribute('href', this.getBaseUrl());
    this.document.head.appendChild(defaultLang);
    
    // Add hreflang for the current page's locale
    if (config.locale) {
      const currentLang = this.document.createElement('link');
      currentLang.setAttribute('rel', 'alternate');
      // Convert locale format from en_US to en-us as required by hreflang
      currentLang.setAttribute('hreflang', config.locale.replace('_', '-').toLowerCase());
      currentLang.setAttribute('href', this.getBaseUrl());
      this.document.head.appendChild(currentLang);
    }
  }

  /**
   * Adds DNS prefetch hints for external domains to improve loading performance
   * DNS prefetch allows browsers to resolve domain names before they're actually needed
   * 
   * @param domains - Array of domain URLs to prefetch
   */
  private addDNSPrefetch(domains: string[]) {
    domains.forEach(domain => {
      // Check if DNS prefetch already exists to avoid duplicates
      if (!this.document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
        const link = this.document.createElement('link');
        link.setAttribute('rel', 'dns-prefetch');
        link.setAttribute('href', domain);
        this.document.head.appendChild(link);
      }
    });
  }

  /**
   * Adds preconnect hints for critical external resources
   * Preconnect establishes early connections (DNS + TCP + TLS) to external domains
   * Use sparingly for resources you're certain will be needed
   * 
   * @param domains - Array of domain URLs to preconnect
   */
  private addPreconnect(domains: string[]) {
    domains.forEach(domain => {
      // Check if preconnect already exists to avoid duplicates
      if (!this.document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
        const link = this.document.createElement('link');
        link.setAttribute('rel', 'preconnect');
        link.setAttribute('href', domain);
        // Crossorigin attribute is needed for font and some other resources
        link.setAttribute('crossorigin', '');
        this.document.head.appendChild(link);
      }
    });
  }

  /**
   * Adds structured data (JSON-LD) to help search engines understand page content
   * Structured data enables rich snippets, knowledge panels, and other enhanced search features
   * 
   * @param data - Structured data object following schema.org format
   */
  addStructuredData(data: any) {
    // Remove existing structured data to avoid conflicts
    const existingData = this.document.querySelector('script[type="application/ld+json"]');
    if (existingData) {
      existingData.remove();
    }
    
    // Create script tag with JSON-LD structured data
    // This helps search engines understand entities, relationships, and context
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  /**
   * Generates Person schema structured data for profile/personal pages
   * This helps search engines understand personal information and can enable rich snippets
   * 
   * @param profile - Profile information object
   * @returns Schema.org Person structured data object
   */
  generatePersonSchema(profile: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': profile.name,
      'jobTitle': 'Senior Software Engineer & Angular Technical Lead',
      'description': 'Senior Software Engineer & Angular Technical Lead with 11+ years of proven expertise in architecting scalable web solutions and mentoring development teams.',
      'url': this.getBaseUrl(),
      // Include profile image if available, using absolute URL
      'image': profile.imageUrl ? `${this.getBaseUrl()}/${profile.imageUrl}` : undefined,
      // Work organization information
      'worksFor': {
        '@type': 'Organization',
        'name': 'FrontendCafé',
        'url': 'https://frontend.cafe'
      },
      // Skills and knowledge areas for expertise indication
      'knowsAbout': [
        'Angular',
        'TypeScript',
        'JavaScript',
        'Web Development',
        'Frontend Development',
        'Software Engineering',
        'Technical Leadership'
      ],
      // Educational background
      'alumniOf': {
        '@type': 'Organization',
        'name': 'Software Engineering'
      },
      // Social media profiles for identity verification and connection
      'sameAs': [
        'https://linkedin.com/in/ramiro-olivencia',
        'https://github.com/ramiro-olivencia',
        'https://twitter.com/ramiroolivencia'
      ]
    };
  }

  /**
   * Generates WebSite schema structured data for the main site
   * This helps search engines understand the overall website structure and purpose
   * 
   * @returns Schema.org WebSite structured data object
   */
  generateWebsiteSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Ramiro Olivencia',
      'description': 'Personal website of Ramiro Olivencia, Senior Software Engineer & Angular Technical Lead',
      'url': this.getBaseUrl(),
      // Author information for content attribution
      'author': {
        '@type': 'Person',
        'name': 'Ramiro Olivencia'
      },
      'inLanguage': 'en-US',
      // Copyright holder information
      'copyrightHolder': {
        '@type': 'Person',
        'name': 'Ramiro Olivencia'
      }
    };
  }

  /**
   * Utility method to get the base URL of the current site
   * Combines protocol and host to create absolute URLs
   * 
   * @returns Complete base URL (e.g., "https://example.com")
   */
  private getBaseUrl(): string {
    return `${this.document.location.protocol}//${this.document.location.host}`;
  }

  /**
   * Adds critical CSS inline to improve loading performance
   * Critical CSS should include styles for above-the-fold content
   * 
   * @param css - CSS string to be inlined
   */
  addCriticalCSS(css: string) {
    const style = this.document.createElement('style');
    style.textContent = css;
    // Mark as critical for identification and debugging
    style.setAttribute('data-critical', 'true');
    this.document.head.appendChild(style);
  }

  /**
   * Adds resource preload hints to improve loading performance
   * Preload tells the browser to fetch resources early in the page load process
   * 
   * @param href - URL of the resource to preload
   * @param as - Resource type (script, style, image, font, etc.)
   * @param type - MIME type of the resource (optional)
   */
  preloadResource(href: string, as: string, type?: string) {
    const link = this.document.createElement('link');
    link.setAttribute('rel', 'preload');
    link.setAttribute('href', href);
    link.setAttribute('as', as);
    if (type) {
      link.setAttribute('type', type);
    }
    this.document.head.appendChild(link);
  }

  /**
   * Adds security-related HTTP headers via meta tags
   * While server-side headers are preferred, meta tags provide a fallback
   * These headers help protect against common web vulnerabilities
   */
  addSecurityHeaders() {
    // Content Security Policy helps prevent XSS attacks by controlling resource loading
    // This policy allows self-hosted resources and common external resources like fonts
    this.meta.updateTag({ 'http-equiv': 'Content-Security-Policy', 
      content: "default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;" });
    
    // Prevents MIME type sniffing, reducing risk of drive-by downloads
    this.meta.updateTag({ 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' });
    
    // Prevents the page from being embedded in frames, protecting against clickjacking
    this.meta.updateTag({ 'http-equiv': 'X-Frame-Options', content: 'DENY' });
    
    // Enables XSS filtering in browsers (legacy protection, now largely replaced by CSP)
    this.meta.updateTag({ 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' });
  }
}