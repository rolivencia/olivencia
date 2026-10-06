import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { WingShowcase } from './wing-showcase';

describe('WingShowcase', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WingShowcase],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(WingShowcase);
    fixture.detectChanges();
    root = fixture.nativeElement;
  });

  it('has exactly one h1 and never skips a heading level', () => {
    const levels = [...root.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));

    expect(levels.filter((level) => level === 1).length).toBe(1);
    levels.slice(1).forEach((level, i) => expect(level - levels[i]).toBeLessThanOrEqual(1));
  });

  it('toggles the wing class on the live demo', () => {
    const demo = root.querySelector('[aria-label="Live result"]') as HTMLElement;
    const toggle = root.querySelector('button[aria-pressed]') as HTMLButtonElement;

    expect(demo.classList).toContain('wing');
    toggle.click();
    TestBed.tick();
    expect(demo.classList).not.toContain('wing');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
  });

  it('labels every table cell so the table can restack on mobile', () => {
    const cells = root.querySelectorAll('table tbody td');

    expect(cells.length).toBeGreaterThan(0);
    cells.forEach((cell) => expect(cell.getAttribute('data-label')).toBeTruthy());
  });
});
