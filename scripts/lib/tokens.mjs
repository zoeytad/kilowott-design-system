// Parse project/styles/tokens.css (the single source of truth) into a token model.
// No dependencies. Node >= 18.

const SECTION_GROUPS = [
  [/BRAND COLOU?RS/i, 'brand'],
  [/STATE/i, 'state'],
  [/SEMANTIC/i, 'semantic'],
  [/TYPE/i, 'type'],
  [/SPACING/i, 'spacing'],
  [/RADII/i, 'radii'],
  [/SHADOWS/i, 'shadow'],
  [/MOTION/i, 'motion'],
  [/LAYOUT/i, 'layout'],
];

function extractBlock(css, selectorRe) {
  const m = selectorRe.exec(css);
  if (!m) return null;
  let i = css.indexOf('{', m.index) + 1;
  let depth = 1;
  const start = i;
  while (i < css.length && depth > 0) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') depth--;
    i++;
  }
  return css.slice(start, i - 1);
}

function parseDecls(block) {
  const out = [];
  let group = null;
  let pendingNote = null;
  const re = /\/\*([\s\S]*?)\*\/|(--[a-z0-9-]+)\s*:\s*([^;]+);[ \t]*(?:\/\*([\s\S]*?)\*\/)?/gi;
  let m;
  while ((m = re.exec(block))) {
    if (m[1] !== undefined) {
      const text = m[1].trim();
      if (/^-{3,}/.test(text)) {
        const found = SECTION_GROUPS.find(([r]) => r.test(text));
        group = found ? found[1] : group;
        pendingNote = null;
      } else {
        pendingNote = text.replace(/\s+/g, ' ');
      }
      continue;
    }
    out.push({
      name: m[2],
      value: m[3].trim(),
      comment: m[4] ? m[4].trim().replace(/\s+/g, ' ') : null,
      note: pendingNote,
      group,
    });
    pendingNote = null;
  }
  return out;
}

export function parseTokensCss(css) {
  const rootBlock = extractBlock(css, /:root\s*\{/);
  const darkBlock = extractBlock(css, /\[data-theme="dark"\]\s*\{/);
  if (!rootBlock) throw new Error('tokens.css: no :root block found');
  const root = parseDecls(rootBlock);
  const dark = darkBlock ? parseDecls(darkBlock) : [];
  // Dark decls inherit the group of the same-named root decl.
  const groupOf = Object.fromEntries(root.map(d => [d.name, d.group]));
  dark.forEach(d => { d.group = groupOf[d.name] || 'semantic'; });
  return { root, dark };
}

// ---------- resolution ----------
export function makeResolver(decls, overrides = []) {
  const map = new Map(decls.map(d => [d.name, d.value]));
  overrides.forEach(d => map.set(d.name, d.value));
  const resolve = (value, seen = new Set()) =>
    value.replace(/var\((--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\)/gi, (_, name, fb) => {
      if (seen.has(name)) throw new Error('tokens.css: circular var ' + name);
      if (!map.has(name)) return fb ? fb.trim() : _;
      return resolve(map.get(name), new Set([...seen, name]));
    });
  return { get: n => (map.has(n) ? resolve(map.get(n)) : undefined), raw: n => map.get(n), resolve };
}

export function refOf(value) {
  const m = /^var\((--[a-z0-9-]+)\)$/i.exec(value.trim());
  return m ? m[1] : null;
}

// ---------- colour maths ----------
export function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
export function normHex(hex) {
  const rgb = hexToRgb(hex);
  return rgb ? '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase() : hex;
}
export function luminance(rgb) {
  const [r, g, b] = rgb.map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(hexA, hexB) {
  const a = hexToRgb(hexA), b = hexToRgb(hexB);
  if (!a || !b) return null;
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
export const isHex = v => /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(String(v).trim());

// ---------- value helpers ----------
export function splitTopLevel(value, sep = ',') {
  const parts = [];
  let depth = 0, cur = '';
  for (const ch of value) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === sep && depth === 0) { parts.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

export function parseShadow(value) {
  if (value.trim() === 'none') return [];
  return splitTopLevel(value).map(layer => {
    const colorMatch = /(rgba?\([^)]*\)|#[0-9a-f]{3,8})/i.exec(layer);
    const color = colorMatch ? colorMatch[1] : '#000000';
    const lens = layer.replace(color, '').trim().split(/\s+/).filter(Boolean)
      .map(v => (v === '0' ? '0px' : v));
    const [offsetX = '0px', offsetY = '0px', blur = '0px', spread = '0px'] = lens;
    return { color, offsetX, offsetY, blur, spread };
  });
}

export function parseFontStack(value) {
  return splitTopLevel(value).map(s => s.replace(/^["']|["']$/g, ''));
}

export function remToPx(v) {
  const m = /^([\d.]+)rem$/.exec(v.trim());
  return m ? Math.round(parseFloat(m[1]) * 16 * 100) / 100 : null;
}

export function clampPx(v) {
  const m = /clamp\(\s*([\d.]+)rem\s*,[^,]+,\s*([\d.]+)rem\s*\)/.exec(v);
  return m ? [parseFloat(m[1]) * 16, parseFloat(m[2]) * 16] : null;
}
