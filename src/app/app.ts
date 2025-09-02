import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocialLink } from './components/social-link/social-link';
import { LinksProvider } from './providers/links.provider';
import { Profile } from './components/profile/profile';
import { SEOService } from './services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SocialLink, Profile],
  template: `<main
      class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 md:p-4"
    >
      <div
        class="mx-auto w-full max-w-md md:rounded-3xl bg-white md:p-8 shadow-lg h-svh md:h-fit flex flex-col justify-center md:min-w-[480px]"
      >
        <app-profile class="mb-8" />

        <div class="mb-6 justify-center flex gap-4">
          @for (link of socialLinks(); track $index) {
            <!-- The special class hides social links when more than 5 exist in mobile layouts -->
            <app-social-link
              [link]="link"
              class="[*:last-child:nth-child(n+5)]:hidden md:[*:last-child:nth-child(n+5)]:block"
            />
          }
        </div>
        <!--TODO: Implement tab navigation-->
        <!-- <app-tabs />-->
      </div>
    </main>

    <router-outlet /> `,
})
export class App implements OnInit {
  private readonly seoService = inject(SEOService);
  readonly socialLinksProvider = inject(LinksProvider);

  socialLinks = computed(() => this.socialLinksProvider.links());

  ngOnInit() {
    // Initialize SEO with comprehensive metadata and structured data
    this.initializeSEO();
  }

  /**
   * Initializes comprehensive SEO setup for the application
   * Sets up meta tags, structured data, and performance optimizations
   */
  private initializeSEO() {
    // Get profile data for structured data generation
    const profileData = {
      name: 'Ramiro Olivencia',
      imageUrl: 'profile.jpg'
    };

    // Generate Person schema structured data
    const personSchema = this.seoService.generatePersonSchema(profileData);
    
    // Generate Website schema structured data
    const websiteSchema = this.seoService.generateWebsiteSchema();
    
    // Combine both schemas into a single structured data object
    const combinedStructuredData = [personSchema, websiteSchema];

    // Update SEO with complete configuration
    this.seoService.updateSEO({
      title: 'Ramiro Olivencia - R&D Software Engineer',
      description: 'Senior Software Engineer & Angular Technical Lead with 11+ years of proven expertise in architecting scalable web solutions and mentoring development teams. Staff Engineer at FrontendCafé.',
      keywords: 'Angular, TypeScript, Frontend Developer, Tech Lead, Software Engineer, Web Development, JavaScript, HTML, CSS, FrontendCafé, Technical Leadership',
      image: 'https://olivencia.com.ar/profile.jpg',
      type: 'profile',
      structuredData: combinedStructuredData
    });

    // Add security headers for enhanced protection
    this.seoService.addSecurityHeaders();

    // Preload critical fonts for better performance
    this.seoService.preloadResource('/fonts/edelsans_regular.otf', 'font', 'font/otf');
    this.seoService.preloadResource('/fonts/avenir_regular.ttf', 'font', 'font/ttf');
  }
}
