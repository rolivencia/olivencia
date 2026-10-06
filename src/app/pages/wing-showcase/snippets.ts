/** Markup shown next to each live demo. Kept as data so the page and its samples cannot drift apart. */
export const snippets = {
  install: `@use './styles/wing/tokens.css';
@use './styles/wing/base.css';
@use './styles/wing/components.css';`,
  scope: `<body class="wing">
  <!-- every element inside is styled -->
</body>`,
  toggle: `<form>
  <label for="name">Name</label>
  <input id="name" type="text" placeholder="John Doe" />
  <button type="submit">Send</button>
</form>`,
  typography: `<h1>Heading</h1>
<p>Paragraph with a <a href="#">link</a>
and <code>inline code</code>.</p>
<ul><li>List item</li></ul>`,
  buttons: `<div class="button-group">
  <button>Default</button>
  <button class="outline">Outlined</button>
  <button disabled>Disabled</button>
</div>`,
  forms: `<label for="type">Type</label>
<select id="type">…</select>
<label for="message">Message</label>
<textarea id="message"></textarea>`,
  cards: `<div class="grid gap-4 md:grid-cols-2">
  <article class="card">
    <h4 class="card-header">Title</h4>
    <p class="card-body">Content</p>
    <div class="card-footer">
      <a class="card-footer-item" href="#">Link</a>
    </div>
  </article>
</div>`,
  table: `<table class="table">
  <thead><tr><th>Utility</th><th>Use</th></tr></thead>
  <tbody>
    <tr>
      <td data-label="Utility">bg-wing-paper</td>
      <td data-label="Use">Page background</td>
    </tr>
  </tbody>
</table>`,
};

export const tokenRows = [
  ['text-wing-1 to text-wing-6', 'Fluid heading scale'],
  ['bg-wing-paper', 'Page background'],
  ['bg-wing-card', 'Card surface'],
  ['text-wing-gray-text', 'Secondary text, 6.0:1 on paper'],
  ['border-wing-gray-line', 'Hairlines and dividers'],
  ['text-wing-blue', 'Links and focus'],
  ['shadow-wing-card', 'Card elevation'],
] as const;

export const typeSpecimens = [
  { cls: 'text-wing-1', name: 'h1 · text-wing-1' },
  { cls: 'text-wing-2', name: 'h2 · text-wing-2' },
  { cls: 'text-wing-3', name: 'h3 · text-wing-3' },
  { cls: 'text-wing-4', name: 'h4 · text-wing-4' },
  { cls: 'text-wing-5', name: 'h5 · text-wing-5' },
  { cls: 'text-wing-6', name: 'h6 · text-wing-6' },
] as const;
