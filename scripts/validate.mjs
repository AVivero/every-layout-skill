import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const errors = [];
const fail = (msg) => errors.push(msg);
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), 'utf8') : null);

/** name = doc basename (matches class minus the dot); selector = substring that must appear in every-layout.css */
const PRIMITIVES = [
  { name: 'stack', selector: '.stack' },
  { name: 'box', selector: '.box' },
  { name: 'center', selector: '.center' },
  { name: 'cluster', selector: '.cluster' },
  { name: 'with-sidebar', selector: '.with-sidebar' },
  { name: 'switcher', selector: '.switcher' },
  { name: 'cover', selector: '.cover' },
  { name: 'grid', selector: '.grid' },
  { name: 'frame', selector: '.frame' },
  { name: 'reel', selector: '.reel' },
  { name: 'imposter', selector: '.imposter' },
  { name: 'icon', selector: '.icon' },
];

const REQUIRED_SECTIONS = [
  '## The problem',
  '## Canonical CSS',
  '## API',
  '## When to reach for it',
  '## Pitfalls',
  '## Example',
];

const EXAMPLES = ['holy-grail', 'card-with-footer', 'prose-page', 'dashboard'];

// --- Flagship stylesheet ---
const css = read('every-layout.css');
if (!css || css.trim().length === 0) fail('every-layout.css is missing or empty');
for (const p of PRIMITIVES) {
  if (css && !css.includes(p.selector)) fail(`every-layout.css is missing selector ${p.selector}`);
}
if (css && !css.includes('--measure')) fail('every-layout.css is missing the --measure token');
if (css && !css.includes('--ratio')) fail('every-layout.css is missing the --ratio (modular scale) token');
if (css) {
  const open = (css.match(/{/g) || []).length;
  const close = (css.match(/}/g) || []).length;
  if (open !== close) fail(`every-layout.css has unbalanced braces (${open} '{' vs ${close} '}')`);
}

// --- SKILL.md ---
const skill = read('SKILL.md');
if (!skill) fail('SKILL.md is missing');
else {
  if (!/^---\r?\n[\s\S]*?^name:\s*\S+/m.test(skill)) fail('SKILL.md frontmatter is missing a name');
  if (!/\ndescription:\s*\S+/.test(skill)) fail('SKILL.md frontmatter is missing a description');
}

// --- Top-level reference docs ---
for (const f of ['references/rudiments.md', 'references/decision-tree.md', 'references/composition.md']) {
  if (!read(f)) fail(`${f} is missing`);
}

// --- Primitive reference docs ---
for (const p of PRIMITIVES) {
  const path = `references/primitives/${p.name}.md`;
  const doc = read(path);
  if (!doc) { fail(`${path} is missing`); continue; }
  for (const section of REQUIRED_SECTIONS) {
    if (!doc.includes(section)) fail(`${path} is missing section "${section}"`);
  }
  if (!doc.includes(p.selector)) fail(`${path} does not reference its selector ${p.selector}`);

  /* The doc's first ```css block is the primitive's Canonical CSS. It must appear
     verbatim in every-layout.css — this is what catches doc/stylesheet drift. */
  const block = doc.match(/```css\n([\s\S]*?)```/);
  if (!block) {
    fail(`${path} has no \`\`\`css Canonical CSS block`);
  } else if (css) {
    const cssNorm = css.replace(/\r/g, '');
    const blockNorm = block[1].replace(/\r/g, '').trimEnd();
    if (!cssNorm.includes(blockNorm)) {
      fail(`${path} Canonical CSS block does not match every-layout.css (drift)`);
    }
  }
}

// --- Examples ---
for (const ex of EXAMPLES) {
  const path = `examples/${ex}/index.html`;
  const html = read(path);
  if (!html) { fail(`${path} is missing`); continue; }
  if (!html.includes('../../every-layout.css')) {
    fail(`${path} does not link ../../every-layout.css`);
  }
}

// --- Top-level docs ---
if (!read('README.md')) fail('README.md is missing');
if (!read('llms.txt')) fail('llms.txt is missing');

// --- Report ---
if (errors.length) {
  console.error(`✗ ${errors.length} validation error(s):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log('✓ all structural checks passed');
