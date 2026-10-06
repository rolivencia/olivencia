/** Markup shown next to each live demo. Kept as data so the page and its samples cannot drift apart. */
export const snippets = {
  install: `@use './styles/wing/tokens.css';
@use './styles/wing/base.css';
@use './styles/wing/components.css';
@use './styles/wing/utilities.css';`,
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
  nav: `<nav class="nav" aria-label="Main">
  <p class="nav-logo">Acme</p>
  <a class="nav-item" href="#">Work</a>
  <a class="nav-item" href="#">About</a>
</nav>`,
  cards: `<div class="cards">
  <article class="card">
    <h4 class="card-header">Title</h4>
    <p class="card-body">Content</p>
    <div class="card-footer">
      <a class="card-footer-item" href="#">Link</a>
    </div>
  </article>
</div>`,
  table: `<table class="table">
  <thead><tr><th>Class</th><th>Effect</th></tr></thead>
  <tbody>
    <tr><td data-label="Class">center</td><td data-label="Effect">…</td></tr>
  </tbody>
</table>`,
};

export const utilityRows = [
  ['center', 'Centers children on both axes'],
  ['horizontal-align', 'Centers children horizontally'],
  ['vertical-align', 'Centers children vertically'],
  ['left', 'Aligns children to the left'],
  ['right', 'Aligns children to the right'],
  ['full-screen', 'Full width, at least one viewport tall'],
  ['pull-left', 'Floats the element left'],
  ['pull-right', 'Floats the element right'],
] as const;

export const typeSpecimens = [
  { cls: 'text-wing-1', name: 'h1 · text-wing-1' },
  { cls: 'text-wing-2', name: 'h2 · text-wing-2' },
  { cls: 'text-wing-3', name: 'h3 · text-wing-3' },
  { cls: 'text-wing-4', name: 'h4 · text-wing-4' },
  { cls: 'text-wing-5', name: 'h5 · text-wing-5' },
  { cls: 'text-wing-6', name: 'h6 · text-wing-6' },
] as const;
