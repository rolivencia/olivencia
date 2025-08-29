import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLink } from './social-link';
import { provideZonelessChangeDetection } from '@angular/core';

const testLink = {
  name: 'Github',
  href: 'https://github.com',
  icon: 'featherGithub',
  description: 'Link to Github',
};

describe('SocialLink', () => {
  let component: SocialLink;
  let fixture: ComponentFixture<SocialLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLink],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialLink);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link input property of correct type', () => {
    fixture.componentRef.setInput('link', testLink);
    fixture.detectChanges();

    expect(component.link()).toBeDefined();
    expect(component.link().name).toBe('Github');
    expect(component.link().route).toBe('https://github.com');
    expect(component.link().icon).toBe('featherGithub');
    expect(component.link().description).toBe('Link to Github');
    expect(typeof component.link().name).toBe('string');
    expect(typeof component.link().route).toBe('string');
    expect(typeof component.link().icon).toBe('string');
  });

  it('should render a link with correct attributes for navigation', () => {
    fixture.componentRef.setInput('link', testLink);
    fixture.detectChanges();

    const linkElement = fixture.debugElement.nativeElement.querySelector('a');

    console.log(linkElement);
    expect(linkElement).toBeTruthy();
    expect(linkElement.href).toBe('https://github.com/');
    expect(linkElement.target).toBe('_blank');
    expect(linkElement.rel).toBe('noopener noreferrer');
    expect(linkElement.title.trim()).toBe('Link to Github');
  });
});
