import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile } from './profile';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render profile name in template', () => {
    const compiled = fixture.nativeElement;
    const nameElement = compiled.querySelector('h1');

    expect(nameElement).toBeTruthy();
    expect(nameElement.textContent.trim()).toBe('Ramiro Olivencia');
  });

  it('should render profile description in template', () => {
    const compiled = fixture.nativeElement;
    const descriptionElement = compiled.querySelector('p');

    expect(descriptionElement).toBeTruthy();
    expect(descriptionElement.textContent).toContain('R&D Software Engineer');
  });

  it('should render initials in image placeholder', () => {
    const compiled = fixture.nativeElement;
    const imageElement = compiled.querySelector('span');

    expect(imageElement).toBeTruthy();
    expect(imageElement.textContent.trim()).toBe('RO');
  });
});
