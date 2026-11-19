/* ============================================================
   POSTERS & BANNERS — print + digital campaign surfaces
   ------------------------------------------------------------
   FOR AI AGENTS READING SOURCE
   The same data ships in the rendered DOM as
     <script type="application/json" id="posters-spec">
   and at runtime as window.KWPosters.spec (plus .build/.toSVG/.toCanvas).

   FOUR ARCHETYPES (everything is built from these)
     statement  Paper ground. One Newsreader headline, ONE italic red word.
     stat       Ink ground. One giant number in red + label + source line.
     photo      Photo cover-crop + ink scrim (>=78% under type). Paper type,
                one italic red word.
     event      Warm-paper ground. Date (display), place, headline in ink,
                red CTA button. Red goes to the CTA only.
   One red element per surface, always. Logo = wordmark, bottom-left, min
   80 px / 20 mm wide, clear space = K height. With a button: logo left,
   button right, centred on one line; in towers too narrow for that row the
   logo moves to the top-left corner and the button stays bottom-left.

   LAYOUT MODES (by width / height ratio r)
     strip r>2.6 · landscape 1.3–2.6 · square 0.9–1.3 · portrait 0.6–0.9 · tower <0.6
     margin 7.5% short edge (portrait/square), 8.5% landscape, 9% tower,
     20% of height on strips. Grid 6 col portrait/square, 4 tower, 12 landscape/strip.

   PRINT (mm · PDF/X-1a:2001 · CMYK · 300 ppi at final size unless noted)
     id             size (mm)        bleed  safe (t/r/b/l)   min type        archetypes
     a5-flyer       148 x 210        3      5                8 pt            all four
     a4-onepager    210 x 297        3      5                8 pt            all four
     a3             297 x 420        3      10               16 pt           all four
     a2             420 x 594        3      12               24 pt           all four
     a1             594 x 841        3      15               32 pt           all four
     us-18x24       457.2 x 609.6    3.175  12.7             24 pt           all four
     rollup         850 x 2000       5      50/40/250/40     48 pt  150 ppi  all four
                    (content area ends 700 mm above the floor: eye level)
     backdrop       3000 x 2000      30     150/150/700/150  160 pt 100 ppi  statement, photo
     billboard-48   6096 x 3048      30     150              ~285 mm type    statement, stat, photo
                    (supply at 1:10 = 609.6 x 304.8 mm, 300 ppi at scale)
     badge          90 x 130         3      15/5/5/5         8 pt (name 24)  event
   Brand red CMYK  C0 M100 Y87 K5 · Pantone 186 C nearest  (APPROXIMATE — confirm with printer)
   Ink rich black  C60 M50 Y50 K100 for solids; type < 24 pt in K100 only (approximate)

   DIGITAL (px · sRGB)
     iab-300x250 / iab-728x90 / iab-160x600 / iab-300x600 / iab-970x250 / iab-320x50
       min type 11 px · <=150 KB initial load · 1 px border on paper grounds
       728x90: statement, stat, event · 320x50: statement, event (no photo-led on either)
     feed-1080 (1080x1080) · feed-1080x1350 · li-1200x627   safe 60 · min 28 px · all four
     story-1080x1920   safe 250 top / 340 bottom / 60 sides · min 32 px · all four
     og-1200x630       safe 60 · min 32 px · statement, stat, photo
     yt-1280x720       safe 64 · min 48 px · statement, photo (3–5 words)
     email-600x300     safe 24 · min 16 px · export @2x · all four
   Social / OG / YouTube / email: no CTA button baked into the artwork.

   TYPE BY VIEWING DISTANCE: cap height >= distance / 250
   (source/footnote lines may drop to 60% of the floor, never under 8 pt / 11 px)
     0.5 m 8 pt · 1 m 16 pt · 2 m 32 pt · 3 m 48 pt · 10 m 160 pt · 50 m ~285 mm
   All copy is dummy data (Nordhavn Coffee 3.5x sample case, fictional
   Kilowott Signal Summit, Fredrikstad, 12 March 2027).
   ============================================================ */

(function () {
  'use strict';

  const PT = 0.3528;              // mm per typographic point
  const LOGO_R = 41 / 313;        // wordmark height / width
  const LOGO_SRC = 'assets/kilowott-logo.svg';
  const ASC = 0.72, DESC = 0.24;  // line box model used for every text block
  const BTN_H = 2.5;              // button height in button-font sizes

  const PDFX = 'PDF/X-1a:2001 · CMYK · fonts embedded';

  /* ---------------- PHOTOS (existing kit assets) ---------------- */
  const PHOTOS = [
    { id: 'workshop', src: 'assets/photos/team-seated-workshop.jpg',     label: 'Workshop' },
    { id: 'nordic',   src: 'assets/photos/landscape-nordic.jpg',         label: 'Nordic landscape' },
    { id: 'standing', src: 'assets/photos/team-standing-discussion.jpg', label: 'Standing discussion' },
    { id: 'lounge',   src: 'assets/photos/lounge-discussion.jpg',        label: 'Lounge' },
    { id: 'focused',  src: 'assets/photos/team-focused-laptop.jpg',      label: 'Focused work' },
    { id: 'pair',     src: 'assets/photos/pair-working-warm.jpg',        label: 'Pair working' },
    { id: 'atmoCool', src: 'assets/photos/textural-atmosphere-cool.jpg', label: 'Atmosphere, cool' },
    { id: 'leader',   src: 'assets/photos/portrait-leader-window.jpg',   label: 'Window light' },
  ];
  const PHOTO = Object.fromEntries(PHOTOS.map(p => [p.id, p.src]));

  /* ---------------- ARCHETYPES ---------------- */
  const ARCHETYPES = [
    { id: 'statement', name: 'Statement', icon: 'quote',
      use: 'Brand lines, manifestos, recruitment. One sentence, set large.',
      ground: 'Paper', red: 'One italic emphasis word in the headline.' },
    { id: 'stat', name: 'Stat', icon: 'hash',
      use: 'Proof. One number, one label, one source line.',
      ground: 'Ink', red: 'The number. Nothing else.' },
    { id: 'photo', name: 'Photo-led', icon: 'image',
      use: 'Place, people, atmosphere. The photo sets the mood; the headline carries the meaning.',
      ground: 'Photo + ink scrim', red: 'One italic emphasis word, set on the scrim.' },
    { id: 'event', name: 'Event', icon: 'calendar',
      use: 'Date, place, call to action. Built to be read in passing.',
      ground: 'Warm paper', red: 'The call-to-action button. The headline stays ink.' },
  ];
  const ARCH = Object.fromEntries(ARCHETYPES.map(a => [a.id, a]));
  const ALL = ['statement', 'stat', 'photo', 'event'];

  /* Dummy content (policy: fictional client, fictional event, real Kilowott facts) */
  const CONTENT = {
    statement: { eyebrow: 'Strategy + execution', headline: 'Ahead, by design.', em: 'design',
                 cta: 'Work with us', photo: 'nordic' },
    stat:      { eyebrow: 'Case study · Nordhavn Coffee', stat: '3.5×',
                 headline: 'organic traffic in six months, from a standing start.', em: '',
                 source: 'Nordhavn Coffee US launch, Jan–Jun 2026 · sample figures', cta: 'Read the case', photo: 'focused' },
    photo:     { eyebrow: 'Fredrikstad · Sandnes · Goa · Dubai', headline: 'Strategy and execution in one team.', em: 'one team',
                 cta: 'How we work', photo: 'workshop' },
    event:     { eyebrow: 'Kilowott Signal Summit', date: '12 March 2027', place: 'Fredrikstad · Norway',
                 headline: 'A day on search, social, and the signal in between.', em: 'signal',
                 cta: 'Save your seat', photo: 'standing',
                 name: 'Ola Nordmann', role: 'Senior Strategist', company: 'Kilowott', badge: 'Speaker' },
  };
  const clone = o => JSON.parse(JSON.stringify(o));

  /* ---------------- FORMATS (single source of truth) ---------------- */
  const S = (t, r, b, l) => ({ t, r: r == null ? t : r, b: b == null ? t : b, l: l == null ? (r == null ? t : r) : l });
  const FORMATS = [
    // PRINT
    { id: 'a5-flyer', name: 'A5 flyer', group: 'print', unit: 'mm', w: 148, h: 210, bleed: 3, safe: S(5), minPt: 8,
      view: '0.3–0.5 m', arch: ALL, def: 'event', ppi: 300, file: PDFX,
      notes: 'Hand-out. Front is one archetype; detail goes on the back at 9–10 pt.' },
    { id: 'a4-onepager', name: 'A4 one-pager', group: 'print', unit: 'mm', w: 210, h: 297, bleed: 3, safe: S(5), minPt: 8,
      view: '0.3–0.5 m', arch: ALL, def: 'stat', ppi: 300, file: PDFX,
      notes: 'Leave-behind. The front sells one idea; the reverse carries the proof.' },
    { id: 'a3', name: 'A3 poster', group: 'print', unit: 'mm', w: 297, h: 420, bleed: 3, safe: S(10), minPt: 16,
      view: '1 m', arch: ALL, def: 'statement', ppi: 300, file: PDFX,
      notes: 'Office walls, noticeboards, meeting rooms.' },
    { id: 'a2', name: 'A2 poster', group: 'print', unit: 'mm', w: 420, h: 594, bleed: 3, safe: S(12), minPt: 24,
      view: '1.5 m', arch: ALL, def: 'photo', ppi: 300, file: PDFX,
      notes: 'Reception, event foyers, window displays.' },
    { id: 'a1', name: 'A1 poster', group: 'print', unit: 'mm', w: 594, h: 841, bleed: 3, safe: S(15), minPt: 32,
      view: '2 m', arch: ALL, def: 'event', ppi: 300, file: PDFX,
      notes: 'Corridors and venues. Read from across a room.' },
    { id: 'us-18x24', name: '18 × 24 in poster', group: 'print', unit: 'mm', w: 457.2, h: 609.6, bleed: 3.175, safe: S(12.7), minPt: 24,
      view: '1.5 m', arch: ALL, def: 'stat', ppi: 300, file: PDFX, sizeLabel: '18 × 24 in · 457.2 × 609.6 mm',
      bleedLabel: '0.125 in (3.175 mm)', safeLabel: '0.5 in (12.7 mm) from trim',
      notes: 'US standard. Not an A-series ratio (3:4), so the grid reflows rather than scales.' },
    { id: 'rollup', name: 'Roll-up banner', group: 'print', unit: 'mm', w: 850, h: 2000, bleed: 5, safe: S(50, 40, 250, 40), minPt: 48,
      view: '2–4 m', arch: ALL, def: 'photo', ppi: 150, file: PDFX + ' · 150 ppi at 100%', contentInset: S(50, 40, 700, 40),
      zones: [{ x: 0, y: 1850, w: 850, h: 150, label: '150 mm rolls into the cassette' }],
      notes: 'Message and logo sit above 700 mm from the floor, at eye level (1.2–1.8 m). Nothing in the bottom 250 mm.' },
    { id: 'backdrop', name: 'Stage backdrop', group: 'print', unit: 'mm', w: 3000, h: 2000, bleed: 30, safe: S(150, 150, 700, 150), minPt: 160,
      view: '5–15 m', arch: ['statement', 'photo'], def: 'statement', ppi: 100, file: PDFX + ' · 100 ppi at 100%',
      zones: [{ x: 0, y: 1300, w: 3000, h: 700, label: 'Lectern, speakers, and heads — no type below 1.3 m' }],
      notes: 'Fabric or frame with 30 mm wrap. Logo and headline above 1.3 m; the lower third is always blocked.' },
    { id: 'billboard-48', name: '48-sheet billboard', group: 'print', unit: 'mm', w: 6096, h: 3048, bleed: 30, safe: S(150), minFontMM: 285,
      minLabel: '≈ 285 mm type (200 mm cap height)', view: '50–150 m', arch: ['statement', 'stat', 'photo'], def: 'photo',
      ppi: '300 at 1:10 scale', printScale: 0.1, file: PDFX + ' · supplied at 1:10 (609.6 × 304.8 mm)',
      notes: 'Seven words or fewer. Confirm bleed and panel joins with the media owner before artwork.' },
    { id: 'badge', name: 'Event badge', group: 'print', unit: 'mm', w: 90, h: 130, bleed: 3, safe: S(15, 5, 5, 5), minPt: 8,
      view: '0.5–1 m', arch: ['event'], def: 'event', ppi: 300, file: PDFX,
      zones: [{ x: 37.5, y: 5, w: 15, h: 3.5, r: 1.75, label: 'Lanyard slot' }],
      notes: 'Lanyard badge. Name at 24 pt minimum; slot punched 5 mm from the top edge.' },

    // DISPLAY (IAB)
    { id: 'iab-300x250', name: 'Medium rectangle', group: 'display', unit: 'px', w: 300, h: 250, safe: S(0), minPx: 11,
      arch: ALL, def: 'stat', cta: true, file: 'PNG · JPG · HTML5 · ≤ 150 KB initial load', notes: 'The most-served IAB unit.' },
    { id: 'iab-728x90', name: 'Leaderboard', group: 'display', unit: 'px', w: 728, h: 90, safe: S(0), minPx: 11,
      arch: ['statement', 'stat', 'event'], def: 'statement', cta: true, file: 'PNG · JPG · HTML5 · ≤ 150 KB initial load',
      notes: 'One row: logo, message, button.' },
    { id: 'iab-160x600', name: 'Wide skyscraper', group: 'display', unit: 'px', w: 160, h: 600, safe: S(0), minPx: 11,
      arch: ALL, def: 'photo', cta: true, file: 'PNG · JPG · HTML5 · ≤ 150 KB initial load',
      notes: 'One column: logo at the top, then eyebrow and headline, button at the bottom.' },
    { id: 'iab-300x600', name: 'Half page', group: 'display', unit: 'px', w: 300, h: 600, safe: S(0), minPx: 11,
      arch: ALL, def: 'event', cta: true, file: 'PNG · JPG · HTML5 · ≤ 150 KB initial load', notes: 'Tower with room for a full Event layout.' },
    { id: 'iab-970x250', name: 'Billboard (display)', group: 'display', unit: 'px', w: 970, h: 250, safe: S(0), minPx: 11,
      arch: ALL, def: 'photo', cta: true, file: 'PNG · JPG · HTML5 · ≤ 150 KB initial load',
      notes: 'Photo crops to a left panel; the message sits on ink.' },
    { id: 'iab-320x50', name: 'Mobile leaderboard', group: 'display', unit: 'px', w: 320, h: 50, safe: S(0), minPx: 11,
      arch: ['statement', 'event'], def: 'statement', cta: true, file: 'PNG · JPG · HTML5 · ≤ 50 KB initial load',
      notes: 'The whole unit is the tap target. The button drops out first when space runs short.' },

    // PAID SOCIAL
    { id: 'feed-1080', name: 'Feed square 1:1', group: 'social', unit: 'px', w: 1080, h: 1080, safe: S(60), minPx: 28,
      arch: ALL, def: 'stat', file: 'PNG · JPG · sRGB', notes: 'Meta and LinkedIn feed. The platform adds the CTA button.' },
    { id: 'feed-1080x1350', name: 'Feed portrait 4:5', group: 'social', unit: 'px', w: 1080, h: 1350, safe: S(60), minPx: 28,
      arch: ALL, def: 'photo', file: 'PNG · JPG · sRGB', notes: 'Takes the most feed height on mobile.' },
    { id: 'story-1080x1920', name: 'Story / Reel 9:16', group: 'social', unit: 'px', w: 1080, h: 1920, safe: S(250, 60, 340, 60), minPx: 32,
      arch: ALL, def: 'event', file: 'PNG · JPG · MP4 · sRGB',
      zones: [{ x: 0, y: 0, w: 1080, h: 250, label: 'Profile + progress bar' }, { x: 0, y: 1580, w: 1080, h: 340, label: 'Reply bar + CTA sticker' }],
      notes: 'Top 250 px and bottom 340 px sit under platform UI.' },
    { id: 'li-1200x627', name: 'LinkedIn single image', group: 'social', unit: 'px', w: 1200, h: 627, safe: S(60), minPx: 28,
      arch: ALL, def: 'statement', file: 'PNG · JPG · sRGB', notes: 'Sponsored content, 1.91:1.' },

    // WEB, VIDEO & EMAIL
    { id: 'og-1200x630', name: 'Open Graph / link preview', group: 'web', unit: 'px', w: 1200, h: 630, safe: S(60), minPx: 32,
      arch: ['statement', 'stat', 'photo'], def: 'statement', file: 'PNG · JPG · ≤ 5 MB · sRGB',
      zones: [{ x: 285, y: 0, w: 630, h: 630, label: 'Centre square crop (some messaging apps)' }],
      notes: 'Some apps crop to the centre square; keep the logo inside it or accept the loss.' },
    { id: 'yt-1280x720', name: 'YouTube thumbnail', group: 'web', unit: 'px', w: 1280, h: 720, safe: S(64), minPx: 48,
      arch: ['statement', 'photo'], def: 'photo', file: 'JPG · PNG · ≤ 2 MB',
      zones: [{ x: 1060, y: 640, w: 200, h: 60, label: 'Timestamp' }],
      notes: 'Seen at 168–360 px wide. Three to five words.' },
    { id: 'email-600x300', name: 'Email hero', group: 'web', unit: 'px', w: 600, h: 300, safe: S(24), minPx: 16, exportScale: 2,
      arch: ALL, def: 'photo', file: 'JPG · export @2x (1200 × 600) · ≤ 200 KB',
      notes: 'Never the only copy of the message: repeat the headline as live text and use a live HTML button.' },
  ];
  const FMT = Object.fromEntries(FORMATS.map(f => [f.id, f]));
  const GROUPS = { print: 'Print', display: 'Display (IAB)', social: 'Paid social', web: 'Web, video & email' };

  const minFontOf = f => f.unit === 'mm' ? (f.minFontMM || f.minPt * PT) : f.minPx;
  const minLabelOf = f => f.minLabel || (f.unit === 'mm' ? `${f.minPt} pt (${(f.minPt * PT).toFixed(1)} mm)` : `${f.minPx} px`);
  const fmtNum = n => (Math.round(n * 10) / 10).toString();
  const sizeLabelOf = f => f.sizeLabel || `${fmtNum(f.w)} × ${fmtNum(f.h)} ${f.unit}`;
  const bleedLabelOf = f => f.bleedLabel || (f.bleed ? `${f.bleed} mm` : 'None');
  const safeLabelOf = f => {
    if (f.safeLabel) return f.safeLabel;
    const s = f.safe; if (!s || (!s.t && !s.r && !s.b && !s.l)) return 'Margins only';
    if (s.t === s.r && s.r === s.b && s.b === s.l) return `${s.t} ${f.unit} from trim`;
    if (s.l === s.r) return `top ${s.t} · sides ${s.l} · bottom ${s.b} ${f.unit}`;
    return `${s.t} / ${s.r} / ${s.b} / ${s.l} ${f.unit}`;
  };

  /* ---------------- COLOUR (tokens resolved at runtime) ---------------- */
  const CV = { ink: '--k-ink', ink2: '--k-ink-2', ink3: '--k-ink-3', paper: '--k-paper', paper2: '--k-paper-2',
               red: '--k-red', muted: '--k-muted', mutedDark: '--k-muted-dark', ruleSoft: '--k-rule-soft' };
  const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const colHex = c => cssVar(CV[c] || CV.ink) || '#000000';
  function rgba(c, a) {
    let h = colHex(c).replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a == null ? 1 : a})`;
  }
  const FAMVAR = { display: '--font-display', sans: '--font-sans', mono: '--font-mono' };

  /* ---------------- TEXT MEASURE + WRAP ---------------- */
  let MC = null; const MCACHE = new Map();
  function fontStr(st, italic, size) {
    return `${italic ? 'italic ' : ''}${st.weight || 400} ${size}px ${cssVar(FAMVAR[st.family]) || 'serif'}`;
  }
  function mw(text, st, italic) { // width at font-size 1
    const key = st.family + '|' + (st.weight || 400) + '|' + (italic ? 1 : 0) + '|' + (st.ls || 0) + '|' + text;
    let v = MCACHE.get(key); if (v != null) return v;
    if (!MC) MC = document.createElement('canvas').getContext('2d');
    MC.font = fontStr(st, italic, 100);
    if ('letterSpacing' in MC) MC.letterSpacing = ((st.ls || 0) * 100) + 'px';
    v = MC.measureText(text).width / 100; MCACHE.set(key, v); return v;
  }
  function toks(text, em, upper) {
    let t = String(text || '').replace(/\s+/g, ' ').trim(); if (upper) t = t.toUpperCase();
    if (!t) return [];
    let parts = [{ s: t, em: false }];
    let e = String(em || '').replace(/\s+/g, ' ').trim(); if (upper) e = e.toUpperCase();
    if (e) {
      const i = t.toLowerCase().indexOf(e.toLowerCase());
      if (i >= 0) parts = [{ s: t.slice(0, i), em: false }, { s: t.slice(i, i + e.length), em: true }, { s: t.slice(i + e.length), em: false }].filter(p => p.s);
    }
    const out = []; let prevSpace = true;
    parts.forEach(p => {
      p.s.split(' ').forEach((w, k) => { if (!w) return; out.push({ t: w, em: p.em, join: k === 0 && out.length > 0 && !prevSpace }); });
      prevSpace = p.s.endsWith(' ');
    });
    return out;
  }
  const itOf = (x, st) => x.em ? st.emItalic !== false : !!st.italic;
  function units(tk) { const u = []; tk.forEach(x => { if (x.join && u.length) u[u.length - 1].push(x); else u.push([x]); }); return u; }
  function wrap(tk, st, size, w) {
    const us = units(tk), sp = mw(' ', st, false) * size;
    const lines = []; let cur = [], cw = 0, overflow = false;
    us.forEach(u => {
      const uw = u.reduce((a, x) => a + mw(x.t, st, itOf(x, st)) * size, 0);
      if (uw > w + 0.001) overflow = true;
      if (cur.length && cw + sp + uw > w + 0.001) { lines.push(cur); cur = [u]; cw = uw; }
      else { cw += (cur.length ? sp : 0) + uw; cur.push(u); }
    });
    if (cur.length) lines.push(cur);
    return { lines, overflow };
  }
  const blockH = (n, size, lh) => n ? size * (ASC + DESC + lh * (n - 1)) : 0;
  function fit(tk, st, w, h, o) {
    const min = o.min, max = Math.max(o.max, min), lh = o.lh || 1.1, maxLines = o.maxLines || 99;
    let size = max, res = { lines: [], overflow: false };
    if (!tk.length) return { size, lines: [], h: 0, ok: true, lh };
    for (let i = 0; i < 80; i++) {
      res = wrap(tk, st, size, w);
      const bh = blockH(res.lines.length, size, lh);
      if (!res.overflow && res.lines.length <= maxLines && bh <= h + 0.01) return { size, lines: res.lines, h: bh, ok: true, lh };
      if (size <= min) break;
      size = Math.max(min, size * 0.94);
    }
    return { size, lines: res.lines, h: blockH(res.lines.length, size, lh), ok: false, lh };
  }
  function segs(line, st) {
    const out = [];
    line.forEach((u, ui) => u.forEach((x, xi) => {
      const it = itOf(x, st), col = x.em ? (st.emColor || st.color) : st.color;
      const txt = (ui > 0 && xi === 0 ? ' ' : '') + x.t;
      const last = out[out.length - 1];
      if (last && last.it === it && last.col === col) last.t += txt; else out.push({ t: txt, it, col });
    }));
    return out;
  }
  const lineW = (sg, st, size) => sg.reduce((a, q) => a + mw(q.t, st, q.it) * size, 0);

  /* ---------------- LAYOUT ENGINE ---------------- */
  function modeOf(W, H) { const r = W / H; return r > 2.6 ? 'strip' : r >= 1.3 ? 'landscape' : r >= 0.9 ? 'square' : r >= 0.6 ? 'portrait' : 'tall'; }
  const MP = {
    portrait:  { m: .075, sm: .024, logo: .24, head: .15, lines: 6, stat: .52, cols: 6 },
    square:    { m: .075, sm: .027, logo: .24, head: .13, lines: 5, stat: .42, cols: 6 },
    landscape: { m: .085, sm: .032, logo: .34, head: .16, lines: 4, stat: .62, cols: 12 },
    tall:      { m: .09,  sm: .04,  logo: .3,  head: .17, lines: 7, stat: .42, cols: 4 },
    strip:     { m: .2,   sm: .17,  logo: 1.15, head: .42, lines: 2, stat: .62, cols: 12 },
  };
  const PAL = {
    statement: { bg: 'paper', fg: 'ink', em: 'red', muted: 'muted', logo: 'ink', btn: 'ink', btnText: 'paper', rule: 'ink' },
    stat:      { bg: 'ink', fg: 'paper', em: 'paper', num: 'red', muted: 'mutedDark', logo: 'paper', btn: 'paper', btnText: 'ink', rule: 'ink3' },
    photo:     { bg: 'ink', fg: 'paper', em: 'red', muted: 'paper', logo: 'paper', btn: 'paper', btnText: 'ink', rule: 'paper' },
    event:     { bg: 'paper2', fg: 'ink', em: 'ink', muted: 'muted', logo: 'ink', btn: 'red', btnText: 'paper', rule: 'ink' },
    badge:     { bg: 'paper', fg: 'ink', em: 'ink', muted: 'muted', logo: 'ink', btn: 'red', btnText: 'paper', rule: 'ink' },
  };

  /**
   * build(format, archetype, content, opts) -> layout { prims, warns, ... } in the
   * format's own units (mm or px). opts: { guides:{grid,safe}, twoReds, noScrim, stretch, noCta }
   */
  function build(fmt, archIn, cIn, opts) {
    opts = opts || {};
    const c = Object.assign({}, CONTENT[archIn] || {}, cIn || {});
    const W = fmt.w, H = fmt.h, b = fmt.bleed || 0, mode = modeOf(W, H), P = MP[mode], s = Math.min(W, H);
    const minF = minFontOf(fmt), minLogo = fmt.unit === 'mm' ? 20 : 80;
    const arch = fmt.id === 'badge' ? 'badge' : archIn;
    const pal = Object.assign({}, PAL[arch]);
    if (opts.twoReds) { pal.fg = 'red'; pal.btn = 'red'; pal.btnText = 'paper'; }
    const m = P.m * s, sf = fmt.contentInset || fmt.safe || S(0);
    const bx = Math.max(m, sf.l), by = Math.max(m, sf.t);
    const box = { x: bx, y: by, w: W - bx - Math.max(m, sf.r), h: H - by - Math.max(m, sf.b) };
    const sm = Math.max(minF, P.sm * s), g = m * 0.5;
    // source lines are footnotes: 60% of the floor, never under 8 pt / 11 px
    const srcFloor = Math.min(minF, Math.max(minF * .6, fmt.unit === 'px' ? 11 : 8 * PT));
    const L = { fmt, arch, W, H, b, mode, s, m, g, sm, minF, box, prims: [], warns: [], notes: [], headSize: 0, logoRect: null, cols: P.cols };
    const push = p => { L.prims.push(p); return p; };
    const miss = what => L.warns.push(what);

    // primitives
    const rect = (x, y, w, h, fill, extra) => push(Object.assign({ type: 'rect', x, y, w, h, fill }, extra || {}));
    const rule = (x1, y1, x2, y2, color, sw) => push({ type: 'rule', x1, y1, x2, y2, color, sw });
    const image = (src, x, y, w, h) => push({ type: 'image', src, x, y, w, h, stretch: !!opts.stretch });
    const grad = (x, y, w, h, dir, color, stops) => push({ type: 'grad', x, y, w, h, dir, color, stops });
    function logo(x, y, w, color) { const h = w * LOGO_R; L.logoRect = { x, y, w, h }; return push({ type: 'logo', x, y, w, h, color }); }
    function place(f, st, x, top, anchor) {
      return push({ type: 'text', x, anchor: anchor || 'start', size: f.size, st,
        lines: f.lines.map((ln, i) => { const sg = segs(ln, st); return { y: top + f.size * (ASC + i * f.lh), segs: sg, w: lineW(sg, st, f.size) }; }) });
    }
    const fixed = (tk, st, size, w, maxLines, lh) => fit(tk, st, w, Infinity, { max: size, min: size, lh: lh || 1.3, maxLines: maxLines || 2 });

    // shared styles
    const stHead  = { family: 'display', weight: 400, ls: -0.02, color: pal.fg, emColor: pal.em, emItalic: true };
    const stNum   = { family: 'display', weight: 400, ls: -0.035, color: pal.num || 'red' };
    const stLabel = { family: 'display', weight: 400, ls: -0.01, color: pal.fg, emColor: pal.fg, emItalic: true };
    const stSrc   = { family: 'mono', weight: 400, ls: 0.02, color: pal.muted };
    const stDate  = { family: 'display', weight: 400, ls: -0.025, color: pal.fg };
    const stPlace = { family: 'sans', weight: 500, ls: 0.1, color: pal.fg };
    const stBtn   = { family: 'sans', weight: 500, ls: 0.02, color: pal.btnText };
    const stUrl   = { family: 'mono', weight: 400, ls: 0.04, color: pal.muted };

    const headTk = toks(c.headline, c.em);
    const words = headTk.length;
    if (c.em && String(c.em).trim() && !headTk.some(t => t.em) && arch !== 'badge') L.warns.push(`The emphasis word “${c.em}” isn’t in the headline, so nothing is set in red italic.`);
    const wordCap = arch === 'event' ? 12 : (fmt.id === 'billboard-48' || fmt.id === 'rollup' || fmt.id === 'backdrop') ? 7 : (fmt.unit === 'px' && (fmt.w <= 320 || fmt.h <= 90) ? 6 : 10);
    const headShown = !(mode === 'strip' && arch === 'event' && H < 200);
    if (arch === 'stat' && words > 14) L.warns.push(`The stat label is ${words} words. Keep it to one line of proof, 14 words at most.`);
    else if (arch !== 'stat' && arch !== 'badge' && headShown && words > wordCap) L.warns.push(`The headline is ${words} words. One poster carries one message; aim for ${wordCap} or fewer on this format.`);
    if (fmt.arch.indexOf(archIn) < 0 && arch !== 'badge') L.warns.push(`${ARCH[archIn].name} isn’t approved for ${fmt.name}. Use ${fmt.arch.map(a => ARCH[a].name).join(', ')}.`);

    // logo size
    let logoW = mode === 'strip' ? Math.min(W * .14, H * P.logo) : P.logo * s * (mode === 'tall' && fmt.unit === 'px' && W < 400 ? 1.6 : 1);
    logoW = Math.max(minLogo, Math.min(logoW, box.w));
    if (mode === 'strip' && logoW * LOGO_R > box.h * .6) logoW = Math.max(minLogo, box.h * .6 / LOGO_R);
    const logoH = logoW * LOGO_R;

    // CTA button
    const showBtn = !!(c.cta && String(c.cta).trim()) && (arch === 'event' || fmt.cta) && !opts.noCta && arch !== 'badge';
    const btnLabel = String(c.cta || '').trim() + ' →';
    let btnS = Math.max(minF, sm * 1.1);
    const btnW = size => mw(btnLabel, stBtn, false) * size + size * 2.4;
    function button(x, top, size, h) {
      const bw = btnW(size), bh = h || size * BTN_H;
      rect(x, top, bw, bh, pal.btn, { r: bh / 2 });
      push({ type: 'text', x: x + bw / 2, anchor: 'middle', size, st: stBtn,
        lines: [{ y: top + bh / 2 + size * 0.35, segs: [{ t: btnLabel, it: false, col: pal.btnText }], w: mw(btnLabel, stBtn, false) * size }] });
      return { w: bw, h: bh };
    }

    function eyebrow(text, x, top, w, color, maxLines) {
      const tk = toks(text, '', true); if (!tk.length) return 0;
      const st = { family: 'sans', weight: 500, ls: 0.14, color };
      const rl = sm * 1.8, gap = sm * .8;
      const f = fit(tk, st, w - rl - gap, Infinity, { max: sm, min: sm, lh: 1.35, maxLines: maxLines || 2 });
      if (!f.ok) return 0; // drops quietly when it can't fit at the minimum size
      rule(x, top + sm * .36, x + rl, top + sm * .36, color, Math.max(sm * .08, fmt.unit === 'px' ? 1 : .2));
      place(f, st, x + rl + gap, top);
      return f.h;
    }

    /* Sign-off: the logo and the button never touch.
       1. Row: logo bottom-left, button bottom-right, both centred on one line.
       2. Too narrow for a row (towers): the logo goes to the top-left corner and
          the button stays bottom-left, so each owns its own end of the layout.
       Clear space between the logo and anything else is at least 2x the logo height. */
    let ctTop = box.y; // content starts here (moves down when the logo takes the top)
    const clear = Math.max(g * 2, logoH * 2);
    function footer(o) {
      const bottom = box.y + box.h;
      let top = bottom - logoH;
      if (o.btn && showBtn) {
        if (btnW(btnS) > box.w && btnW(minF) <= box.w) btnS = minF;
        const bw = btnW(btnS), bh = btnS * BTN_H;
        if (logoW + clear + bw <= box.w) {
          button(box.x + box.w - bw, bottom - bh, btnS);
          logo(box.x, bottom - bh / 2 - logoH / 2, logoW, pal.logo);
          top = Math.min(top, bottom - bh);
        } else if (bw <= box.w) {
          logo(box.x, box.y, logoW, pal.logo);
          ctTop = box.y + logoH + clear;
          button(box.x, bottom - bh, btnS);
          top = bottom - bh;
        } else {
          logo(box.x, bottom - logoH, logoW, pal.logo);
          L.warns.push('The button dropped out: the call to action is wider than the column at the minimum size. Shorten it.');
        }
        return top;
      }
      logo(box.x, bottom - logoH, logoW, pal.logo);
      if (o.url) {
        const f = fixed(toks('kilowott.com'), stUrl, sm, box.w - logoW - g * 2, 1);
        if (f.ok) place(f, stUrl, box.x + box.w, bottom - sm * ASC, 'end');
      }
      return top;
    }

    const isPrint = fmt.group === 'print';
    const bgFull = color => rect(-b, -b, W + 2 * b, H + 2 * b, color);

    /* ---------- BADGE ---------- */
    if (arch === 'badge') {
      bgFull(pal.bg);
      const lw = Math.max(minLogo, W * .34);
      logo(box.x, box.y, lw, pal.logo);
      let y = box.y + lw * LOGO_R + g * 2.2;
      y += eyebrow(c.eyebrow, box.x, y, box.w, 'ink') + g;
      const bandTop = H * .8;
      rect(-b, bandTop, W + 2 * b, H - bandTop + b, 'ink');
      const bandF = fixed(toks([c.date, c.place].filter(Boolean).join(' · '), '', true), { family: 'mono', weight: 500, ls: .08, color: 'paper' }, Math.max(minF, W * .036), box.w, 2);
      place(bandF, bandF.lines.length ? { family: 'mono', weight: 500, ls: .08, color: 'paper' } : stSrc, box.x, bandTop + (H - bandTop - bandF.h) / 2);
      const pillS = Math.max(minF, W * .036), pillTk = toks(c.badge || 'Attendee', '', true);
      const pst = { family: 'sans', weight: 500, ls: .12, color: 'paper' };
      const pw = lineW(segs(units(pillTk), pst), pst, pillS) + pillS * 2.2, ph = pillS * 2.2;
      const pillTop = bandTop - g * 1.6 - ph;
      rect(box.x, pillTop, pw, ph, 'red', { r: ph / 2 });
      push({ type: 'text', x: box.x + pw / 2, anchor: 'middle', size: pillS, st: pst, lines: [{ y: pillTop + ph / 2 + pillS * .35, segs: [{ t: (c.badge || 'Attendee').toUpperCase(), it: false, col: 'paper' }], w: 0 }] });
      const roleS = Math.max(minF, W * .05);
      const stRole = { family: 'sans', weight: 400, ls: 0, color: 'muted' }, stCo = { family: 'sans', weight: 500, ls: 0, color: 'ink' };
      const coF = fixed(toks(c.company), stCo, roleS, box.w, 1), roleF = fixed(toks(c.role), stRole, roleS, box.w, 2);
      const nameAvail = pillTop - g * 2 - coF.h - roleF.h - g * 1.2 - y;
      const nameF = fit(toks(c.name), { family: 'display', weight: 400, ls: -.02, color: 'ink' }, box.w, nameAvail, { max: W * .16, min: 24 * PT, lh: 1, maxLines: 2 });
      if (!nameF.ok) miss('The name doesn’t fit at 24 pt. Use a shorter form of the name.');
      let ny = y + (nameAvail - nameF.h) / 2;
      place(nameF, { family: 'display', weight: 400, ls: -.02, color: 'ink' }, box.x, ny); ny += nameF.h + g * 1.2;
      place(roleF, stRole, box.x, ny); ny += roleF.h;
      place(coF, stCo, box.x, ny);
      L.headSize = nameF.size;
      return finish();
    }

    /* ---------- STRIP (leaderboards, display billboards) ---------- */
    if (mode === 'strip') {
      let x0 = box.x;
      if (arch === 'photo') {
        bgFull('ink');
        const pw = Math.min(W * .3, H * 1.8);
        image(PHOTO[c.photo] || c.photo || PHOTO.workshop, -b, -b, pw + b, H + 2 * b);
        x0 = pw + m;
      } else bgFull(pal.bg);
      logo(x0, box.y + (box.h - logoH) / 2, logoW, pal.logo);
      const midX = x0 + logoW + m * 1.5;
      let btnSz = Math.min(Math.max(minF, Math.min(H * .15, W * .022)), box.h / BTN_H);
      btnSz = Math.max(btnSz, minF);
      const bh = Math.min(box.h, btnSz * BTN_H);
      const lines = H >= 200 ? 3 : (H >= 80 ? 2 : 1);
      const attempt = (withBtn) => {
        const right = box.x + box.w - (withBtn ? btnW(btnSz) + m * 1.5 : 0);
        const mwid = right - midX;
        const out = { ok: true, items: [], withBtn };
        if (mwid <= 0) return { ok: false };
        if (arch === 'statement' || arch === 'photo') {
          const f = fit(headTk, stHead, mwid, box.h, { max: P.head * H, min: minF * 1.5, lh: 1.02, maxLines: lines });
          out.ok = f.ok; out.items.push([f, stHead, midX, box.y + (box.h - f.h) / 2]); L.headSize = f.size;
        } else if (arch === 'stat') {
          const nf = fit(toks(c.stat), stNum, mwid * .42, box.h, { max: P.stat * H, min: minF * 2, lh: .9, maxLines: 1 });
          const nw = nf.lines.length ? lineW(segs(nf.lines[0], stNum), stNum, nf.size) : 0;
          const lx = midX + nw + m;
          const lf = fit(toks(c.headline, c.em), stLabel, right - lx, box.h, { max: H * .22, min: minF * 1.3, lh: 1.1, maxLines: lines });
          out.ok = nf.ok && lf.ok;
          out.items.push([nf, stNum, midX, box.y + (box.h - nf.h) / 2], [lf, stLabel, lx, box.y + (box.h - lf.h) / 2]);
          L.headSize = nf.size;
        } else { // event
          const df = fit(toks(c.date), stDate, mwid * (H >= 200 ? .45 : .62), box.h, { max: H * .42, min: minF * 1.5, lh: .96, maxLines: lines });
          const dw = Math.max.apply(null, df.lines.map(l => lineW(segs(l, stDate), stDate, df.size)).concat([0]));
          out.ok = df.ok; out.items.push([df, stDate, midX, box.y + (box.h - df.h) / 2]); L.headSize = df.size;
          const rx = midX + dw + m, rw = right - rx;
          const pf = fixed(toks(c.place, '', true), stPlace, Math.max(minF, sm * .8), rw, 1);
          if (rw > 0 && pf.ok) {
            let stack = [[pf, stPlace]];
            if (H >= 200) {
              const hf = fit(headTk, Object.assign({}, stHead, { emColor: 'ink' }), rw, box.h - pf.h - g, { max: H * .16, min: minF * 1.4, lh: 1.1, maxLines: 3 });
              if (hf.ok) stack = [[hf, Object.assign({}, stHead, { emColor: 'ink' })], [pf, stPlace]];
            }
            const th = stack.reduce((a, q) => a + q[0].h, 0) + g * (stack.length - 1);
            let yy = box.y + (box.h - th) / 2;
            stack.forEach(q => { out.items.push([q[0], q[1], rx, yy]); yy += q[0].h + g; });
          }
        }
        return out;
      };
      let res = showBtn ? attempt(true) : attempt(false);
      if (showBtn && !res.ok) res = attempt(false);
      if (!res.ok) { miss('The copy is at this format’s minimum size and still doesn’t fit. Shorten it.'); if (!res.items) res = { items: [], withBtn: false }; }
      res.items.forEach(q => place(q[0], q[1], q[2], q[3]));
      if (res.withBtn) button(box.x + box.w - btnW(btnSz), box.y + (box.h - bh) / 2, btnSz, bh);
      else if (showBtn) L.notes.push('The button dropped out to keep the message above the type floor. The whole unit stays clickable.');
      return finish();
    }

    /* ---------- LANDSCAPE ---------- */
    if (mode === 'landscape') {
      const top = box.y;
      if (arch === 'statement') {
        bgFull(pal.bg);
        const ft = footer({ btn: true, url: isPrint });
        const eh = eyebrow(c.eyebrow, box.x, ctTop, box.w * .7, pal.fg);
        const aT = ctTop + (eh ? eh + g * 2 : 0), aB = ft - g * 2;
        const f = fit(headTk, stHead, box.w * .8, aB - aT, { max: P.head * s, min: minF * 1.5, lh: 1.02, maxLines: P.lines });
        if (!f.ok) miss('The headline hit the minimum size and still doesn’t fit. Shorten it.');
        place(f, stHead, box.x, aT + (aB - aT - f.h) / 2); L.headSize = f.size;
      } else if (arch === 'stat') {
        bgFull(pal.bg);
        const ft = footer({ btn: true, url: isPrint });
        const eh = eyebrow(c.eyebrow, box.x, ctTop, box.w * .7, pal.muted);
        const aT = ctTop + (eh ? eh + g * 2 : 0), aB = ft - g * 2, ah = aB - aT;
        const nf = fit(toks(c.stat), stNum, box.w * .5 - g, ah, { max: P.stat * s, min: minF * 2, lh: .9, maxLines: 1 });
        place(nf, stNum, box.x, aT + (ah - nf.h) / 2); L.headSize = nf.size;
        const rx = box.x + box.w * .54, rw = box.w * .46;
        const srcF = fixed(toks(c.source ? 'Source: ' + c.source : ''), stSrc, Math.max(srcFloor, sm * .62), rw, 3);
        const lf = fit(toks(c.headline, c.em), stLabel, rw, ah - srcF.h - g * 2, { max: P.head * s * .45, min: minF * 1.1, lh: 1.12, maxLines: 4 });
        if (!nf.ok || !lf.ok) miss('The stat or its label hit the minimum size. Shorten the label.');
        const th = lf.h + (srcF.h ? g * 2 + srcF.h : 0);
        let y = aT + (ah - th) / 2;
        place(lf, stLabel, rx, y); y += lf.h + g * 2; place(srcF, stSrc, rx, y);
      } else if (arch === 'photo') {
        bgFull('ink');
        image(PHOTO[c.photo] || c.photo || PHOTO.workshop, -b, -b, W + 2 * b, H + 2 * b);
        if (!opts.noScrim) grad(-b, -b, W * .92 + b, H + 2 * b, 'right', 'ink', [[0, .94], [.7, .8], [1, 0]]);
        const ft = footer({ btn: false, url: false });
        const colW = box.w * .56;
        const bw = showBtn ? btnW(btnS) : 0, bh = showBtn ? btnS * BTN_H : 0;
        const ebTk = toks(c.eyebrow, '', true);
        const ebF = ebTk.length ? fixed(ebTk, { family: 'sans', weight: 500, ls: .14 }, sm, colW - sm * 2.6, 2, 1.35) : { h: 0, ok: true };
        const aB = ft - g * 2.5, aT = box.y;
        const avail = aB - aT - (ebF.ok && ebF.h ? ebF.h + g * 2 : 0) - (showBtn ? bh + g * 2 : 0);
        const f = fit(headTk, stHead, colW, avail, { max: P.head * s, min: minF * 1.5, lh: 1.02, maxLines: P.lines });
        if (!f.ok) miss('The headline hit the minimum size and still doesn’t fit. Shorten it.');
        let y = aB - (showBtn ? bh + g * 2 : 0) - f.h;
        if (ebF.ok && ebF.h) eyebrow(c.eyebrow, box.x, y - g * 2 - ebF.h, colW, 'paper');
        place(f, stHead, box.x, y); L.headSize = f.size;
        if (showBtn && bw <= colW) button(box.x, aB - bh, btnS);
      } else { // event
        bgFull(pal.bg);
        const eh = eyebrow(c.eyebrow, box.x, top, box.w * .46, pal.fg);
        const ft = footer({ btn: false, url: false });
        const aT = top + (eh ? eh + g * 2 : 0), aB = ft - g * 2;
        const df = fit(toks(c.date), stDate, box.w * .46, aB - aT, { max: P.head * s * 1.5, min: minF * 2, lh: .96, maxLines: 3 });
        place(df, stDate, box.x, aT); L.headSize = df.size;
        const rx = box.x + box.w * .52, rw = box.w * .48, bottom = box.y + box.h;
        let y = bottom;
        if (showBtn) {
          const bh = btnS * BTN_H; y -= bh; button(rx, y, btnS); y -= g * 2.5;
          // logo and button share the bottom line: centre the logo on the button
          const lg = L.prims.find(p => p.type === 'logo');
          if (lg) { lg.y = bottom - bh / 2 - logoH / 2; L.logoRect.y = lg.y; }
        }
        const pf = fixed(toks(c.place, '', true), stPlace, Math.max(minF, sm), rw, 2);
        y -= pf.h; place(pf, stPlace, rx, y); y -= g * 1.5;
        const stH = Object.assign({}, stHead, { emColor: 'ink' });
        const hf = fit(headTk, stH, rw, y - g * 2 - box.y, { max: P.head * s * .5, min: minF * 1.4, lh: 1.1, maxLines: 4 });
        if (!df.ok || !hf.ok) miss('The date or headline hit the minimum size. Shorten it.');
        y -= hf.h; place(hf, stH, rx, y);
        rule(rx, y - g * 1.6, rx + rw, y - g * 1.6, pal.rule, Math.max(s * .0018, fmt.unit === 'px' ? 1 : .25));
      }
      return finish();
    }

    /* ---------- PORTRAIT / SQUARE / TALL ---------- */
    const top = box.y, bottom = box.y + box.h;
    const tiny = fmt.unit === 'px' && s < 400;
    const thin = Math.max(s * .0018, fmt.unit === 'px' ? 1 : .25);
    if (arch === 'statement') {
      bgFull(pal.bg);
      const ft = footer({ btn: true, url: isPrint });
      const eh = eyebrow(c.eyebrow, box.x, ctTop, box.w, pal.fg, mode === 'tall' ? 3 : 2);
      let aB = ft - g * 2;
      if (!tiny && mode !== 'tall') { const ry = ft - g * 1.8; rule(box.x, ry, box.x + box.w, ry, pal.rule, thin); aB = ry - g * 2.2; }
      const aT = ctTop + (eh ? eh + g * 2 : 0);
      const f = fit(headTk, stHead, box.w, aB - aT, { max: P.head * s, min: minF * 1.5, lh: 1.02, maxLines: P.lines });
      if (!f.ok) miss('The headline hit the minimum size and still doesn’t fit. Shorten it.');
      place(f, stHead, box.x, mode === 'tall' ? aT + (aB - aT - f.h) / 2 : aB - f.h); L.headSize = f.size;
    } else if (arch === 'stat') {
      bgFull(pal.bg);
      const ft = footer({ btn: true, url: isPrint });
      const eh = eyebrow(c.eyebrow, box.x, ctTop, box.w, pal.muted, mode === 'tall' ? 3 : 2);
      const aT = ctTop + (eh ? eh + g * 2 : 0), aB = ft - g * 2.5, ah = aB - aT;
      const srcF = fixed(toks(c.source ? 'Source: ' + c.source : ''), stSrc, Math.max(srcFloor, sm * .62), box.w, mode === 'tall' ? 5 : 3);
      const lf = fit(toks(c.headline, c.em), stLabel, box.w, ah * .4, { max: P.head * s * .5, min: minF * 1.1, lh: 1.12, maxLines: mode === 'tall' ? 6 : 4 });
      const nAvail = ah - lf.h - srcF.h - g * 3;
      const nf = fit(toks(c.stat), stNum, box.w, nAvail, { max: P.stat * s, min: minF * 2, lh: .9, maxLines: 1 });
      if (!nf.ok || !lf.ok || !srcF.ok) miss('The stat or its label hit the minimum size. Shorten the label or source.');
      let y = aB - srcF.h; place(srcF, stSrc, box.x, y);
      y -= g * 1.5 + lf.h; place(lf, stLabel, box.x, y);
      y -= g * 1.5 + nf.h; place(nf, stNum, box.x, mode === 'tall' ? aT + (y + nf.h - aT - nf.h) / 2 : y);
      L.headSize = nf.size;
    } else if (arch === 'photo') {
      bgFull('ink');
      image(PHOTO[c.photo] || c.photo || PHOTO.workshop, -b, -b, W + 2 * b, H + 2 * b);
      // headline may climb to 42% down the content box; the scrim is >= 80% ink from there down
      const iScrim = L.prims.length;
      const ft = footer({ btn: true, url: isPrint });
      const limit = Math.max(ctTop, box.y + box.h * (tiny ? .25 : .42));
      if (!opts.noScrim) {
        const y0 = Math.max(-b, limit - H * .28), hh = H + b - y0, oL = Math.min(.95, (H + b - limit) / hh);
        const sc = [{ type: 'grad', x: -b, y: y0, w: W + 2 * b, h: hh, dir: 'up', color: 'ink', stops: [[0, .94], [oL, .8], [1, 0]] }];
        // logo moved to the top corner: a short ink fade behind it keeps it legible on bright photos
        if (ctTop > box.y) sc.push({ type: 'grad', x: -b, y: -b, w: W + 2 * b, h: ctTop + clear + b, dir: 'up', color: 'ink', stops: [[0, 0], [1, .7]] });
        L.prims.splice(iScrim, 0, ...sc);
      }
      const aB = ft - g * 2.5;
      const ebTk = tiny ? [] : toks(c.eyebrow, '', true);
      const ebF = ebTk.length ? fixed(ebTk, { family: 'sans', weight: 500, ls: .14 }, sm, box.w - sm * 2.6, mode === 'tall' ? 3 : 2, 1.35) : { h: 0, ok: true };
      const ebH = ebF.ok && ebF.h ? ebF.h + g * 1.6 : 0;
      const f = fit(headTk, stHead, box.w, aB - limit - ebH, { max: P.head * s * .95, min: minF * 1.5, lh: 1.02, maxLines: P.lines });
      if (!f.ok) miss('The headline hit the minimum size and still doesn’t fit. Shorten it.');
      const y = aB - f.h;
      place(f, stHead, box.x, y); L.headSize = f.size;
      if (ebH) eyebrow(c.eyebrow, box.x, y - ebH, box.w, 'paper', mode === 'tall' ? 3 : 2);
    } else { // event
      bgFull(pal.bg);
      const ft = footer({ btn: true, url: false });
      const eh = eyebrow(c.eyebrow, box.x, ctTop, box.w, pal.fg, mode === 'tall' ? 3 : 2);
      const dT = ctTop + (eh ? eh + g * 2 : 0);
      const pf = fixed(toks(c.place, '', true), stPlace, Math.max(minF, sm * 1.05), box.w, 2);
      let y = ft - g * 2.5 - pf.h;
      place(pf, stPlace, box.x, y);
      const stH = Object.assign({}, stHead, { emColor: 'ink' });
      let df0, hf;
      for (const share of [.4, .3, .22]) { // give the date less height until the headline fits
        df0 = fit(toks(c.date), stDate, box.w, box.h * share, { max: P.head * s * 1.35, min: minF * 2, lh: .96, maxLines: 3 });
        const hAvail = y - g * 1.2 - (dT + df0.h + g * 4) - g * 2;
        hf = fit(headTk, stH, box.w, hAvail, { max: P.head * s * .5, min: minF * 1.4, lh: 1.1, maxLines: mode === 'tall' ? 6 : 4 });
        if (hf.ok) break;
      }
      if (!hf.ok && tiny) hf = { lines: [], h: 0, ok: true, size: 0, lh: 1 }; // small units: date, place, and CTA carry it
      if (!df0.ok || !hf.ok) miss('The date or headline hit the minimum size. Shorten it.');
      if (hf.h) { y -= g * 1.2 + hf.h; place(hf, stH, box.x, y); }
      const ry = y - g * 2; rule(box.x, ry, box.x + box.w, ry, pal.rule, thin);
      place(df0, stDate, box.x, dT); L.headSize = df0.size;
    }
    return finish();

    function finish() {
      if (fmt.group === 'display' && (pal.bg === 'paper' || pal.bg === 'paper2') && arch !== 'photo')
        push({ type: 'rect', x: .5, y: .5, w: W - 1, h: H - 1, stroke: 'muted', sw: 1, alpha: .6 });
      if (opts.guides && (opts.guides.grid || opts.guides.safe)) L.guides = guides(L, opts.guides);
      else L.guides = [];
      return L;
    }
  }

  function guides(L, o) {
    const G = [], { W, H, b, box, s, fmt } = L, sw = s * .0028;
    const labelS = Math.max(L.sm * .62, s * .016);
    const showLabels = fmt.unit === 'mm' || s >= 500;
    const lab = (t, x, y, anchor) => {
      if (!showLabels) return;
      const st = { family: 'mono', weight: 500, ls: .06, color: 'paper' };
      G.push({ type: 'text', x, anchor: anchor || 'start', size: labelS, st, lines: [{ y, segs: [{ t: t.toUpperCase(), it: false, col: 'paper' }], w: 0 }] });
    };
    if (o.grid) {
      const n = L.cols, gut = L.m * .35, cw = (box.w - gut * (n - 1)) / n;
      for (let i = 0; i < n; i++) G.push({ type: 'rect', x: box.x + i * (cw + gut), y: box.y, w: cw, h: box.h, fill: 'paper', alpha: .13 });
      G.push({ type: 'rect', x: box.x, y: box.y, w: box.w, h: box.h, stroke: 'paper', sw, dash: [s * .004, s * .004] });
      lab(`${n} col · margin ${fmtNum(L.m)} ${fmt.unit}`, box.x + labelS * .4, box.y - labelS * .6);
    }
    if (o.safe) {
      if (b > 0) {
        G.push({ type: 'rect', x: -b, y: -b, w: W + 2 * b, h: H + 2 * b, stroke: 'paper', sw, dash: [s * .02, s * .01] });
        G.push({ type: 'rect', x: 0, y: 0, w: W, h: H, stroke: 'paper', sw: sw * 1.3 });
      }
      const sf = fmt.safe;
      if (sf && (sf.t || sf.r || sf.b || sf.l)) {
        G.push({ type: 'rect', x: sf.l, y: sf.t, w: W - sf.l - sf.r, h: H - sf.t - sf.b, stroke: 'paper', sw, dash: [s * .006, s * .006] });
        lab(`Safe zone ${safeLabelOf(fmt)}`, W - sf.r - labelS * .4, sf.t + labelS * 1.3, 'end');
      }
      (fmt.zones || []).forEach(z => {
        G.push({ type: 'rect', x: z.x, y: z.y, w: z.w, h: z.h, fill: 'paper', alpha: .22, r: z.r || 0 });
        if (z.w > labelS * 8) lab(z.label, z.x + Math.min(z.w * .03, labelS * 2), z.y + z.h / 2 + labelS * .35);
        else lab(z.label, z.x + z.w + labelS * .6, z.y + z.h / 2 + labelS * .35);
      });
      if (L.logoRect) {
        const r = L.logoRect, k = r.h;
        G.push({ type: 'rect', x: r.x - k, y: r.y - k, w: r.w + 2 * k, h: r.h + 2 * k, stroke: 'paper', sw, dash: [s * .003, s * .003] });
      }
      if (b > 0) lab(`Bleed ${bleedLabelOf(fmt)}`, labelS * .4, -b - labelS * .5);
    }
    return G;
  }

  /* ---------------- SVG BACKEND ---------------- */
  let UID = 0;
  const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const n2 = v => (Math.round(v * 100) / 100).toString();
  const fillCss = (c, a) => `fill:var(${CV[c]})${a != null && a < 1 ? ';fill-opacity:' + a : ''}`;

  function primSVG(p, defs) {
    if (p.type === 'rect') {
      const r = p.r ? ` rx="${n2(p.r)}"` : '';
      if (p.stroke) return `<rect x="${n2(p.x)}" y="${n2(p.y)}" width="${n2(p.w)}" height="${n2(p.h)}"${r} style="fill:none;stroke:var(${CV[p.stroke]});stroke-width:${n2(p.sw)}${p.alpha ? ';stroke-opacity:' + p.alpha : ''}${p.dash ? ';stroke-dasharray:' + p.dash.map(n2).join(' ') : ''}"/>`;
      return `<rect x="${n2(p.x)}" y="${n2(p.y)}" width="${n2(p.w)}" height="${n2(p.h)}"${r} style="${fillCss(p.fill, p.alpha)}"/>`;
    }
    if (p.type === 'rule') return `<line x1="${n2(p.x1)}" y1="${n2(p.y1)}" x2="${n2(p.x2)}" y2="${n2(p.y2)}" style="stroke:var(${CV[p.color]});stroke-width:${n2(p.sw)}"/>`;
    if (p.type === 'image') return `<image href="${esc(p.src)}" x="${n2(p.x)}" y="${n2(p.y)}" width="${n2(p.w)}" height="${n2(p.h)}" preserveAspectRatio="${p.stretch ? 'none' : 'xMidYMid slice'}"/>`;
    if (p.type === 'grad') {
      const id = 'po-g' + (++UID);
      const v = p.dir === 'up' ? 'x1="0" y1="1" x2="0" y2="0"' : 'x1="0" y1="0" x2="1" y2="0"';
      defs.push(`<linearGradient id="${id}" ${v}>${p.stops.map(st => `<stop offset="${st[0]}" style="stop-color:var(${CV[p.color]});stop-opacity:${st[1]}"/>`).join('')}</linearGradient>`);
      return `<rect x="${n2(p.x)}" y="${n2(p.y)}" width="${n2(p.w)}" height="${n2(p.h)}" fill="url(#${id})"/>`;
    }
    if (p.type === 'logo') {
      const id = 'po-lg' + (++UID);
      defs.push(`<mask id="${id}" maskUnits="userSpaceOnUse" x="${n2(p.x)}" y="${n2(p.y)}" width="${n2(p.w)}" height="${n2(p.h)}" style="mask-type:alpha"><image href="${LOGO_SRC}" x="${n2(p.x)}" y="${n2(p.y)}" width="${n2(p.w)}" height="${n2(p.h)}" preserveAspectRatio="xMidYMid meet"/></mask>`);
      return `<rect x="${n2(p.x)}" y="${n2(p.y)}" width="${n2(p.w)}" height="${n2(p.h)}" style="${fillCss(p.color)}" mask="url(#${id})"/>`;
    }
    if (p.type === 'text') {
      const st = p.st;
      return p.lines.map(ln => `<text x="${n2(p.x)}" y="${n2(ln.y)}" text-anchor="${p.anchor}" font-size="${n2(p.size)}" font-weight="${st.weight || 400}" letter-spacing="${n2((st.ls || 0) * p.size)}" xml:space="preserve" style="font-family:var(${FAMVAR[st.family]});white-space:pre">${ln.segs.map(q => `<tspan style="${fillCss(q.col)}${q.it ? ';font-style:italic' : ''}">${esc(q.t)}</tspan>`).join('')}</text>`).join('');
    }
    return '';
  }

  /** toSVG(layout, { view: 'trim' | 'bleed' | 'bleed-only', label }) */
  function toSVG(L, o) {
    o = o || {};
    const b = L.b, s = L.s;
    const view = b > 0 ? (o.view || 'trim') : 'trim';
    const slug = view === 'bleed' ? s * .05 : 0;
    const pad = view === 'trim' ? 0 : b + slug;
    const vx = -pad, vy = -pad, vw = L.W + 2 * pad, vh = L.H + 2 * pad;
    const defs = [];
    const body = L.prims.map(p => primSVG(p, defs)).join('');
    const gd = L.guides.length ? `<g class="po-guides" style="mix-blend-mode:difference">${L.guides.map(p => primSVG(p, defs)).join('')}</g>` : '';
    let crop = '';
    if (view === 'bleed') {
      const len = slug * .8, gap = b + slug * .15, sw = s * .0022;
      const pts = [[0, 0, -1, -1], [L.W, 0, 1, -1], [0, L.H, -1, 1], [L.W, L.H, 1, 1]];
      crop = pts.map(([x, y, dx, dy]) =>
        `<line x1="${n2(x + dx * gap)}" y1="${n2(y)}" x2="${n2(x + dx * (gap + len))}" y2="${n2(y)}"/><line x1="${n2(x)}" y1="${n2(y + dy * gap)}" x2="${n2(x)}" y2="${n2(y + dy * (gap + len))}"/>`).join('');
      crop = `<g style="stroke:var(--fg);stroke-width:${n2(sw)}">${crop}</g>`;
    }
    const clipId = 'po-c' + (++UID);
    defs.push(`<clipPath id="${clipId}"><rect x="${n2(-b * (view === 'trim' ? 0 : 1))}" y="${n2(-b * (view === 'trim' ? 0 : 1))}" width="${n2(L.W + (view === 'trim' ? 0 : 2 * b))}" height="${n2(L.H + (view === 'trim' ? 0 : 2 * b))}"/></clipPath>`);
    const label = esc(o.label || `${ARCH[L.arch] ? ARCH[L.arch].name : 'Event badge'} layout, ${L.fmt.name}, ${sizeLabelOf(L.fmt)}`);
    return `<svg class="po-svg" xmlns="http://www.w3.org/2000/svg" viewBox="${n2(vx)} ${n2(vy)} ${n2(vw)} ${n2(vh)}" role="img" aria-label="${label}" style="aspect-ratio:${n2(vw)} / ${n2(vh)};--po-r:${(vw / vh).toFixed(4)}"><defs>${defs.join('')}</defs><g clip-path="url(#${clipId})">${body}${gd}</g>${crop}</svg>`;
  }

  /* ---------------- CANVAS BACKEND (PNG export) ---------------- */
  const FONT_LOADS = ['400 100px Newsreader', 'italic 400 100px Newsreader', '400 100px "DM Sans"', '500 100px "DM Sans"', '400 100px "JetBrains Mono"', '500 100px "JetBrains Mono"'];
  function fontsReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all(FONT_LOADS.map(f => document.fonts.load(f).catch(() => null))).then(() => document.fonts.ready);
  }
  const loadImg = src => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error('Image failed: ' + src)); im.src = src; });
  let LOGO_TXT = null;
  async function logoBitmap(wpx, hpx, color) {
    if (!LOGO_TXT) LOGO_TXT = await fetch(LOGO_SRC).then(r => r.text());
    const svg = LOGO_TXT.replace(/<svg([^>]*?)\swidth="[^"]*"/, `<svg$1 width="${wpx}"`).replace(/<svg([^>]*?)\sheight="[^"]*"/, `<svg$1 height="${hpx}"`);
    const im = await loadImg('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
    const oc = document.createElement('canvas'); oc.width = wpx; oc.height = hpx;
    const o = oc.getContext('2d'); o.drawImage(im, 0, 0, wpx, hpx);
    o.globalCompositeOperation = 'source-in'; o.fillStyle = colHex(color); o.fillRect(0, 0, wpx, hpx);
    return oc;
  }
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else { ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  }

  /** toCanvas(layout, pxPerUnit) -> Promise<HTMLCanvasElement> (trim size, no guides) */
  async function toCanvas(L, k) {
    await fontsReady();
    const cw = Math.max(1, Math.round(L.W * k)), ch = Math.max(1, Math.round(L.H * k));
    const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch;
    const ctx = cv.getContext('2d');
    ctx.scale(cw / L.W, ch / L.H);
    const srcs = Array.from(new Set(L.prims.filter(p => p.type === 'image').map(p => p.src)));
    const imgs = {}; await Promise.all(srcs.map(async s => { imgs[s] = await loadImg(s); }));
    for (const p of L.prims) {
      ctx.save();
      if (p.type === 'rect') {
        if (p.stroke) { ctx.strokeStyle = rgba(p.stroke, p.alpha); ctx.lineWidth = p.sw; ctx.strokeRect(p.x, p.y, p.w, p.h); }
        else { ctx.fillStyle = rgba(p.fill, p.alpha); if (p.r) { rr(ctx, p.x, p.y, p.w, p.h, p.r); ctx.fill(); } else ctx.fillRect(p.x, p.y, p.w, p.h); }
      } else if (p.type === 'rule') {
        ctx.strokeStyle = rgba(p.color); ctx.lineWidth = p.sw; ctx.beginPath(); ctx.moveTo(p.x1, p.y1); ctx.lineTo(p.x2, p.y2); ctx.stroke();
      } else if (p.type === 'image') {
        const im = imgs[p.src];
        if (p.stretch) ctx.drawImage(im, p.x, p.y, p.w, p.h);
        else {
          const ir = im.naturalWidth / im.naturalHeight, r = p.w / p.h; let sw, sh, sx, sy;
          if (ir > r) { sh = im.naturalHeight; sw = sh * r; sx = (im.naturalWidth - sw) / 2; sy = 0; }
          else { sw = im.naturalWidth; sh = sw / r; sx = 0; sy = (im.naturalHeight - sh) / 2; }
          ctx.drawImage(im, sx, sy, sw, sh, p.x, p.y, p.w, p.h);
        }
      } else if (p.type === 'grad') {
        const gr = p.dir === 'up' ? ctx.createLinearGradient(0, p.y + p.h, 0, p.y) : ctx.createLinearGradient(p.x, 0, p.x + p.w, 0);
        p.stops.forEach(st => gr.addColorStop(st[0], rgba(p.color, st[1])));
        ctx.fillStyle = gr; ctx.fillRect(p.x, p.y, p.w, p.h);
      } else if (p.type === 'logo') {
        const bm = await logoBitmap(Math.max(1, Math.round(p.w * k)), Math.max(1, Math.round(p.h * k)), p.color);
        ctx.drawImage(bm, p.x, p.y, p.w, p.h);
      } else if (p.type === 'text') {
        const st = p.st;
        // measure on this context so advances match exactly what fillText draws
        const setFont = q => { ctx.font = fontStr(st, q.it, p.size); if ('letterSpacing' in ctx) ctx.letterSpacing = ((st.ls || 0) * p.size) + 'px'; };
        p.lines.forEach(ln => {
          const adv = ln.segs.map(q => { setFont(q); return ctx.measureText(q.t).width; });
          const w = adv.reduce((a, v) => a + v, 0);
          let x = p.anchor === 'end' ? p.x - w : p.anchor === 'middle' ? p.x - w / 2 : p.x;
          ln.segs.forEach((q, i) => {
            setFont(q); ctx.fillStyle = rgba(q.col); ctx.textBaseline = 'alphabetic';
            ctx.fillText(q.t, x, ln.y);
            x += adv[i];
          });
        });
      }
      ctx.restore();
    }
    return cv;
  }

  /* ---------------- MACHINE-READABLE SPEC ---------------- */
  function buildSpec() {
    return {
      name: 'Kilowott posters & banners', version: '1.0', updated: '2026-11-18', source: 'project/pages/posters.js',
      dummyData: 'All copy is fictional sample content (Nordhavn Coffee case, Kilowott Signal Summit). Kilowott’s own name, domain and offices are real.',
      units: 'Print formats in millimetres (mm); digital formats in pixels (px). safeZone is measured inward from the trim edge. minFont is the smallest permitted type size in the format unit.',
      layoutModes: { strip: 'width/height > 2.6', landscape: '1.3–2.6', square: '0.9–1.3', portrait: '0.6–0.9', tower: '< 0.6' },
      grid: { margin: '7.5% of the short edge (portrait, square), 8.5% (landscape), 9% (tower), 20% of height (strip)', columns: { portrait: 6, square: 6, tower: 4, landscape: 12, strip: 12 }, gutter: '35% of the margin' },
      logo: { asset: 'project/assets/kilowott-logo.svg', placement: 'bottom-left. With a button: logo left and button right on one shared centre line; if that row does not fit (towers), logo top-left and button bottom-left. Logo and button never stack.', width: '24% of the short edge on portrait posters, 34% on landscape', minimum: { px: 80, mm: 20, below: 'use the bolt mark' }, clearSpace: 'height of the K on all sides' },
      color: {
        red: { token: '--k-red', hex: '#E4022D', cmyk: 'C0 M100 Y87 K5', pantone: 'Pantone 186 C (nearest)', status: 'approximate — confirm with printer', rule: 'one red element per surface' },
        ink: { token: '--k-ink', hex: '#0B0F14', cmyk: 'C60 M50 Y50 K100 rich black for solids; K100 only for type under 24 pt', status: 'approximate — confirm with printer' },
        warmPaper: { token: '--k-paper-2', hex: '#F6F4F0', print: 'uncoated natural-white stock, or C0 M2 Y4 K2 tint on coated', status: 'approximate — confirm with printer' },
        digital: 'sRGB, tokens from project/styles/tokens.css',
      },
      typeByViewingDistance: { rule: 'cap height ≥ viewing distance ÷ 250; headline ≥ 3× body', table: TYPE_TABLE.map(r => ({ distance: r[0], capHeight: r[1], minType: r[2], typical: r[3] })) },
      archetypes: ARCHETYPES.map(a => ({ id: a.id, name: a.name, use: a.use, ground: a.ground, red: a.red })),
      formats: FORMATS.map(f => ({
        id: f.id, name: f.name, group: f.group, unit: f.unit, width: f.w, height: f.h,
        bleed: f.bleed || 0, safeZone: { top: f.safe.t, right: f.safe.r, bottom: f.safe.b, left: f.safe.l },
        minFont: f.unit === 'mm' ? (f.minFontMM ? { value: f.minFontMM, unit: 'mm', note: f.minLabel } : { value: f.minPt, unit: 'pt', mm: +(f.minPt * PT).toFixed(2) }) : { value: f.minPx, unit: 'px' },
        viewingDistance: f.view || null, archetypes: f.arch, defaultArchetype: f.def,
        ctaInArtwork: f.group === 'print' ? 'event only' : !!f.cta,
        file: f.file, colour: f.group === 'print' ? 'CMYK' : 'sRGB',
        resolution: f.group === 'print' ? (typeof f.ppi === 'number' ? f.ppi + ' ppi at final size' : f.ppi) : (f.exportScale ? 'export @' + f.exportScale + 'x' : '1x pixel-exact'),
        printScale: f.printScale || 1, zones: f.zones || [], contentArea: f.contentInset ? { top: f.contentInset.t, right: f.contentInset.r, bottom: f.contentInset.b, left: f.contentInset.l } : undefined, notes: f.notes,
      })),
      rules: RULES.map(r => r.h + ' ' + r.b.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ')),
    };
  }
  const TYPE_TABLE = [
    ['0.5 m', '2 mm', '8 pt', 'Flyer, one-pager, badge'],
    ['1 m', '4 mm', '16 pt', 'A3 poster'],
    ['2 m', '8 mm', '32 pt', 'A1 poster'],
    ['3 m', '12 mm', '48 pt', 'Roll-up banner'],
    ['10 m', '40 mm', '160 pt', 'Stage backdrop'],
    ['50 m', '200 mm', '≈ 285 mm type', '48-sheet billboard'],
  ];
  const RULES = [
    { h: 'One red, always.', b: 'One spotlight per surface: the italic emphasis word, the stat, or the CTA button. Never two. Never a red ground, a red headline, or red body text.' },
    { h: 'One poster, one message.', b: 'Eight words or fewer for the headline; seven on billboards, roll-ups, and backdrops. A second message is a second poster.' },
    { h: 'Size type for the distance.', b: 'Cap height at least the viewing distance divided by 250. The layout engine never sets type below the format’s floor; it drops the button or flags the copy instead. Source lines are footnotes and may sit at 60% of the floor, never under 8&nbsp;pt or 11&nbsp;px.' },
    { h: 'Logo bottom-left, with room.', b: 'Wordmark bottom-left. With a button, the logo sits left and the button right, centred on one line. When the row won&rsquo;t fit, the logo moves to the top-left corner; the two never stack. Clear space equals the height of the K. Never under 80&nbsp;px or 20&nbsp;mm wide; use the bolt instead.' },
    { h: 'Never stretch a photo.', b: 'Cover-crop to the frame and move the crop, never the proportions. Keep faces clear of the trim and the safe-zone edge.' },
    { h: 'Scrim under every word on a photo.', b: 'Type over photography sits on an ink scrim of at least 78% under the text. Paper type then clears 7:1 even over a white sky.' },
  ];

  /* ============================================================
     PAGE
     ============================================================ */
  // The layout engine is shared: the Social page builds its post images with it.
  // Exposed at load so other pages can use it before Posters has rendered.
  window.KWPosters = Object.assign(window.KWPosters || {}, { FORMATS, ARCHETYPES, CONTENT, build, toSVG, toCanvas, fontsReady,
    clearMeasure: () => MCACHE.clear() });

  window.renderPosters = function (root) {
    const mounts = [];
    const fmtGroups = g => FORMATS.filter(f => f.group === g);
    const archChips = f => f.arch.map(a => `<span class="po-chip${a === f.def ? ' is-def' : ''}">${ARCH[a].name}</span>`).join('');
    const unitOut = f => f.unit === 'mm' ? 'CMYK' : 'sRGB';

    const specRows = f => `
      <dl class="po-spec">
        <div><dt>Size</dt><dd>${sizeLabelOf(f)}</dd></div>
        ${f.group === 'print' ? `<div><dt>Bleed</dt><dd>${bleedLabelOf(f)}</dd></div>` : ''}
        <div><dt>Safe zone</dt><dd>${safeLabelOf(f)}</dd></div>
        <div><dt>Min type</dt><dd>${minLabelOf(f)}${f.view ? ` · read at ${f.view}` : ''}</dd></div>
        <div><dt>File</dt><dd>${f.file}</dd></div>
        <div><dt>Colour</dt><dd>${unitOut(f)}${f.group === 'print' ? ' · red ≈ C0 M100 Y87 K5' : ''}</dd></div>
        <div><dt>Archetypes</dt><dd class="po-chips">${archChips(f)}</dd></div>
      </dl>
      ${f.notes ? `<p class="po-fmt__note">${f.notes}</p>` : ''}`;

    const fmtCard = (f, extra) => `
      <article class="po-fmt${extra || ''}" id="po-f-${f.id}">
        <div class="po-fmt__stage"><div class="po-mount" data-fmt="${f.id}" data-arch="${f.def}" data-set="${f.group === 'print' ? 'print' : 'digital'}"${f.unit === 'px' && f.w <= 970 ? ` style="--po-max-w:${f.w}px"` : ''}></div></div>
        <div class="po-fmt__body">
          <div class="po-fmt__head"><h3>${f.name}</h3><span>${sizeLabelOf(f)}</span></div>
          ${specRows(f)}
        </div>
      </article>`;

    const fmtOptions = Object.keys(GROUPS).map(g => `<optgroup label="${GROUPS[g]}">${fmtGroups(g).map(f => `<option value="${f.id}">${f.name} · ${sizeLabelOf(f).replace(/ ·.*$/, '')}</option>`).join('')}</optgroup>`).join('');

    const LONG = 'New website, new services, three new offices, a summit in March, and we are hiring designers too.';
    const DD = [
      { arch: 'statement', do: {}, dont: {}, bad: { twoReds: true },
        cap: '<b>One red.</b> The italic word is the spotlight. A red headline plus a red button is two, and neither wins.' },
      { arch: 'photo', do: { photo: 'nordic' }, dont: { photo: 'nordic' }, bad: { noScrim: true },
        cap: '<b>Scrim under the type.</b> Without it, paper type over a light photo drops well under 3:1.' },
      { arch: 'photo', do: { photo: 'lounge' }, dont: { photo: 'lounge' }, bad: { stretch: true },
        cap: '<b>Never stretch.</b> Cover-crop and move the crop. Squashed people read as a mistake from across the room.' },
      { arch: 'statement', do: {}, dont: { headline: LONG, em: 'hiring' }, bad: {},
        cap: '<b>One message.</b> Five messages shrink to the minimum size and none of them land. Make five posters.' },
    ];
    const specJson = JSON.stringify(buildSpec(), null, 2);
    const specSafe = specJson.replace(/</g, '\\u003c');

    root.innerHTML = `
  <style>
    .po-hero { padding: var(--s-9) 0 var(--s-7); border-bottom: 1px solid var(--rule); }
    .po-hero h1 { font-family: var(--font-display); font-weight: 400; font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em; margin-top: 20px; max-width: 20ch; }
    .po-hero h1 em { font-style: italic; color: var(--accent); }
    .po-hero__lede { margin-top: 22px; max-width: 64ch; color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; }
    .po-hero__meta { display: flex; flex-wrap: wrap; gap: var(--s-5) var(--s-7); margin-top: var(--s-6); font-size: var(--fs-xs); letter-spacing: var(--tracking-eyebrow); text-transform: uppercase; color: var(--fg-2); }
    .po-hero__meta b { display: block; margin-top: 4px; color: var(--fg); font-weight: 500; font-size: var(--fs-sm); letter-spacing: 0.02em; text-transform: none; }

    .po-sec { display: flex; align-items: baseline; flex-wrap: wrap; gap: 8px 16px; margin-bottom: var(--s-6); }
    .po-sec__h { font-family: var(--font-display); font-weight: 400; font-size: var(--fs-d3); line-height: 1.1; letter-spacing: -0.02em; }
    .po-sec__sub { margin-left: auto; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-2); }
    .po-lead { color: var(--fg-2); max-width: 64ch; line-height: 1.6; margin: calc(-1 * var(--s-4)) 0 var(--s-6); }

    .po-svg { display: block; margin: 0 auto; height: auto; max-width: 100%;
      width: min(100%, var(--po-max-w, 100%), calc(var(--po-max-h, 440px) * var(--po-r, 1))); }
    .po-mount { width: 100%; }

    /* toolbar toggles */
    .po-tools { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: var(--s-5); }
    .po-toggle { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border: 1px solid var(--rule); border-radius: var(--r-pill); background: var(--bg); color: var(--fg-2); font-size: var(--fs-sm); }
    .po-toggle .lucide { width: 15px; height: 15px; stroke-width: 1.75; }
    .po-toggle[aria-pressed="true"] { background: var(--fg); color: var(--bg); border-color: var(--fg); }
    .po-legend { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-left: auto; font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); letter-spacing: 0.04em; }
    .po-legend span { display: inline-flex; align-items: center; gap: 6px; }
    .po-legend i { display: inline-block; width: 22px; height: 0; border-top: 1.5px solid var(--fg); }
    .po-legend i.d1 { border-top-style: dashed; }
    .po-legend i.d2 { border-top-style: dotted; }
    .po-legend i.fill { height: 10px; border: 0; background: var(--bg-3); }

    /* archetypes */
    .po-arch { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--s-5); }
    @media (max-width: 1100px) { .po-arch { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 560px) { .po-arch { grid-template-columns: minmax(0, 1fr); } }
    .po-card { border: 1px solid var(--rule); border-radius: var(--r-3); overflow: hidden; background: var(--bg-2); display: flex; flex-direction: column; min-width: 0; }
    .po-card__stage { padding: var(--s-5); display: grid; place-items: center; --po-max-h: 520px; }
    .po-card__cap { padding: 16px 20px 20px; border-top: 1px solid var(--rule); background: var(--bg); font-size: 13px; color: var(--fg-2); line-height: 1.55; flex: 1; }
    .po-card__cap h3 { font-family: var(--font-display); font-weight: 400; font-size: 1.5rem; letter-spacing: -0.01em; color: var(--fg); display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
    .po-card__cap h3 .lucide { width: 18px; height: 18px; stroke-width: 1.75; color: var(--fg-2); }
    .po-card__cap dl { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; margin-top: 12px; }
    .po-card__cap dt { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2); padding-top: 2px; }
    .po-card__cap dd { margin: 0; color: var(--fg); }

    .po-anat { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--s-5); margin-top: var(--s-7); }
    @media (max-width: 900px) { .po-anat { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 560px) { .po-anat { grid-template-columns: minmax(0, 1fr); } }
    .po-anat > div { padding-top: var(--s-4); border-top: 1px solid var(--rule-strong); font-size: var(--fs-sm); color: var(--fg-2); line-height: 1.6; }
    .po-anat b { display: block; color: var(--fg); font-weight: 500; margin-bottom: 4px; }
    .po-anat code, .po-rules code, .po-agent code { font-family: var(--font-mono); font-size: 12.5px; color: var(--link); }

    /* format cards */
    .po-fmts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--s-5); align-items: start; }
    .po-fmts--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .po-fmt--wide { grid-column: span 2; }
    @media (max-width: 1100px) { .po-fmts { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 720px) { .po-fmts, .po-fmts--2 { grid-template-columns: minmax(0, 1fr); } .po-fmt--wide { grid-column: auto; } }
    .po-fmt { border: 1px solid var(--rule); border-radius: var(--r-3); overflow: hidden; background: var(--bg); min-width: 0; }
    .po-fmt__stage { background: var(--bg-2); padding: var(--s-5); display: grid; place-items: center; min-height: 160px; --po-max-h: 340px; border-bottom: 1px solid var(--rule); }
    .po-fmt--wide .po-fmt__stage { --po-max-h: 300px; }
    .po-fmt__body { padding: 16px 20px 20px; }
    .po-fmt__head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 10px; }
    .po-fmt__head h3 { font-family: var(--font-display); font-weight: 400; font-size: 1.375rem; letter-spacing: -0.01em; }
    .po-fmt__head span { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); }
    .po-spec { display: grid; gap: 0; margin: 0; }
    .po-spec > div { display: grid; grid-template-columns: 92px minmax(0, 1fr); gap: 12px; padding: 7px 0; border-top: 1px solid var(--rule); font-size: 13px; }
    .po-spec dt { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2); padding-top: 2px; }
    .po-spec dd { margin: 0; color: var(--fg); overflow-wrap: anywhere; }
    .po-chips { display: flex; flex-wrap: wrap; gap: 4px; }
    .po-chip { display: inline-block; padding: 1px 8px; border: 1px solid var(--rule); border-radius: var(--r-pill); font-size: 11.5px; color: var(--fg-2); }
    .po-chip.is-def { border-color: var(--rule-strong); color: var(--fg); }
    .po-fmt__note { margin-top: 10px; font-size: 13px; color: var(--fg-2); line-height: 1.55; }

    .po-colour { margin-top: var(--s-7); }
    .po-colour .token-row { gap: 16px; flex-wrap: wrap; }
    .po-colour .token-row__meta { text-align: right; }
    .po-sw { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: -1px; margin-right: 8px; border: 1px solid var(--rule); }
    .po-approx { display: inline-block; margin-left: 8px; padding: 1px 8px; border-radius: var(--r-pill); background: var(--warning-soft); color: var(--warning); font-family: var(--font-sans); font-size: 11px; font-weight: 500; letter-spacing: 0.04em; }

    .po-group-h { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-2); margin: var(--s-7) 0 var(--s-4); display: flex; align-items: center; gap: 10px; }
    .po-group-h::after { content: ""; flex: 1; height: 1px; background: var(--rule); }
    .po-group-h:first-of-type { margin-top: 0; }

    /* extreme ratios */
    .po-x { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: var(--s-6); align-items: start; border: 1px solid var(--rule); border-radius: var(--r-3); padding: var(--s-6); background: var(--bg-2); }
    @media (max-width: 720px) { .po-x { grid-template-columns: minmax(0, 1fr); padding: var(--s-5); } }
    .po-x__tower { --po-max-h: 600px; }
    .po-x__strips { display: grid; gap: var(--s-4); min-width: 0; }
    .po-x__cap { font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); letter-spacing: 0.06em; margin-top: 6px; text-transform: uppercase; }
    .po-x__notes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--s-5); margin-top: var(--s-5); }
    @media (max-width: 900px) { .po-x__notes { grid-template-columns: minmax(0, 1fr); } }
    .po-x__notes div { font-size: var(--fs-sm); color: var(--fg-2); line-height: 1.6; border-top: 1px solid var(--rule-strong); padding-top: 12px; }
    .po-x__notes b { color: var(--fg); font-weight: 500; display: block; }

    /* editor */
    .po-ed { display: grid; grid-template-columns: minmax(300px, 380px) minmax(0, 1fr); gap: var(--s-6); align-items: start; }
    @media (max-width: 900px) { .po-ed { grid-template-columns: minmax(0, 1fr); } }
    .po-ed__form { display: grid; gap: 14px; border: 1px solid var(--rule); border-radius: var(--r-3); padding: var(--s-5); background: var(--bg); min-width: 0; }
    .po-ed__form [hidden] { display: none !important; }
    .po-ed__form fieldset { border: 0; padding: 0; margin: 0; min-width: 0; }
    .po-f { display: grid; gap: 6px; min-width: 0; }
    .po-f > span, .po-ed__form legend { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2); padding: 0; margin-bottom: 6px; }
    .po-f > span { margin-bottom: 0; }
    .po-f input, .po-f select, .po-f textarea {
      width: 100%; min-width: 0; font: inherit; font-size: var(--fs-sm); color: var(--fg); background: var(--bg);
      border: 1px solid var(--rule); border-radius: var(--r-2); padding: 9px 11px; }
    .po-f textarea { resize: vertical; min-height: 64px; line-height: 1.45; }
    .po-f input:focus-visible, .po-f select:focus-visible, .po-f textarea:focus-visible, .po-seg input:focus-visible + span, .po-photos input:focus-visible + img { outline: 2px solid var(--fg); outline-offset: 2px; }
    .po-row2 { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 10px; }
    .po-seg { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
    .po-seg label { position: relative; }
    .po-seg input, .po-photos input { position: absolute; opacity: 0; width: 1px; height: 1px; }
    .po-seg span { display: flex; align-items: center; gap: 8px; padding: 9px 11px; border: 1px solid var(--rule); border-radius: var(--r-2); font-size: var(--fs-sm); color: var(--fg-2); cursor: pointer; }
    .po-seg span .lucide { width: 15px; height: 15px; stroke-width: 1.75; }
    .po-seg input:checked + span { border-color: var(--fg); color: var(--fg); background: var(--bg-2); }
    .po-photos { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
    .po-photos label { position: relative; cursor: pointer; }
    .po-photos img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--r-1, 4px); border: 2px solid transparent; }
    .po-photos input:checked + img { border-color: var(--fg); }
    .po-check { display: inline-flex; align-items: center; gap: 8px; font-size: var(--fs-sm); color: var(--fg); }
    .po-check input { width: 16px; height: 16px; accent-color: var(--fg); }
    .po-ed__opts { display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: center; padding-top: 4px; border-top: 1px solid var(--rule); padding-top: 14px; }
    .po-ed__opts select { font: inherit; font-size: var(--fs-sm); padding: 4px 8px; border: 1px solid var(--rule); border-radius: var(--r-2); background: var(--bg); color: var(--fg); }
    .po-ed__actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .po-ed__actions .btn { padding: 11px 18px; }
    .po-ed__actions .lucide { width: 16px; height: 16px; stroke-width: 1.75; }
    .po-ed__out { font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); min-height: 1em; }
    .po-ed__preview { min-width: 0; }
    .po-ed__stage { border: 1px solid var(--rule); border-radius: var(--r-3); background: var(--bg-2); padding: var(--s-6); display: grid; place-items: center; min-height: 320px; --po-max-h: min(72vh, 760px); }
    @media (max-width: 560px) { .po-ed__stage { padding: var(--s-4); } }
    .po-ed__meta { margin-top: 12px; font-family: var(--font-mono); font-size: 12px; color: var(--fg-2); display: flex; flex-wrap: wrap; gap: 6px 16px; }
    .po-ed__warn { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 6px; }
    .po-ed__warn li { font-size: 13px; line-height: 1.5; padding: 8px 12px; border-radius: var(--r-2); background: var(--warning-soft); color: var(--fg); border-left: 3px solid var(--warning); }
    .po-ed__warn li.ok { background: var(--success-soft); border-left-color: var(--success); }
    .po-ed__warn li.note { background: var(--bg-2); border-left-color: var(--rule-strong); color: var(--fg-2); }

    /* rules */
    .po-dd { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--s-5); }
    @media (max-width: 1100px) { .po-dd { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 560px) { .po-dd { grid-template-columns: minmax(0, 1fr); } }
    .po-dd__pair { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1px; background: var(--rule); border: 1px solid var(--rule); border-radius: var(--r-3); overflow: hidden; }
    .po-dd__cell { background: var(--bg-2); padding: 14px; position: relative; --po-max-h: 260px; }
    .po-dd__tag { display: inline-block; margin-bottom: 10px; font-size: 11px; letter-spacing: var(--tracking-eyebrow); text-transform: uppercase; font-weight: 500; padding: 3px 9px; border-radius: var(--r-pill); }
    .po-dd__tag--do { background: var(--fg); color: var(--bg); }
    .po-dd__tag--dont { background: var(--accent); color: var(--k-paper); }
    .po-dd__cap { grid-column: 1 / -1; background: var(--bg); padding: 14px 16px; font-size: 13px; line-height: 1.5; color: var(--fg-2); }
    .po-dd__cap b { color: var(--fg); font-weight: 500; }
    .po-rules { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--s-6) var(--s-5); margin-top: var(--s-8); }
    @media (max-width: 900px) { .po-rules { grid-template-columns: minmax(0, 1fr); } }
    .po-rule { border-top: 1px solid var(--rule-strong); padding-top: var(--s-4); }
    .po-rule__num { font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); letter-spacing: 0.1em; }
    .po-rule h3 { font-family: var(--font-display); font-weight: 400; font-size: 1.375rem; margin: 6px 0 8px; letter-spacing: -0.01em; }
    .po-rule p { font-size: var(--fs-sm); color: var(--fg-2); line-height: 1.6; }
    .po-table { width: 100%; border-collapse: collapse; font-size: var(--fs-sm); }
    .po-table th, .po-table td { text-align: left; padding: 11px 12px 11px 0; border-bottom: 1px solid var(--rule); vertical-align: top; }
    .po-table th { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-2); font-weight: 400; }
    .po-table td:nth-child(2), .po-table td:nth-child(3) { font-family: var(--font-mono); font-size: 13px; }
    .po-table-wrap { overflow-x: auto; }
    @media (max-width: 560px) { .po-table td:nth-child(4), .po-table th:nth-child(4) { display: none; } }

    /* agent block */
    .po-agent { border: 1px solid var(--rule); border-radius: var(--r-3); padding: var(--s-6); background: var(--bg-2); }
    @media (max-width: 560px) { .po-agent { padding: var(--s-5); } }
    .po-agent p { color: var(--fg-2); line-height: 1.6; max-width: 70ch; font-size: var(--fs-sm); }
    .po-agent p + p { margin-top: 10px; }
    .po-agent details { margin-top: var(--s-5); }
    .po-agent summary { cursor: pointer; font-size: var(--fs-sm); font-weight: 500; }
    .po-agent pre { margin-top: 12px; max-height: 420px; overflow: auto; background: var(--bg); border: 1px solid var(--rule); border-radius: var(--r-2); padding: 14px; font-family: var(--font-mono); font-size: 12px; line-height: 1.5; color: var(--fg); white-space: pre; max-width: 100%; }
  </style>

  <!-- HERO -->
  <section class="po-hero">
    <div class="container">
      <span class="eyebrow">Make something</span>
      <h1>One message, <em>four</em> ways to put it on a wall.</h1>
      <p class="po-hero__lede">
        Every poster, banner, and ad Kilowott ships is built from four archetypes&mdash;Statement, Stat, Photo-led, and Event.
        Same margins, same type, one spotlight of red. This page shows how each one is constructed, how it stretches from a
        320&nbsp;&times;&nbsp;50 mobile banner to a six-metre billboard, and ends with a live editor that exports a pixel-exact PNG
        or a print-size PDF. All copy is sample content.
      </p>
      <div class="po-hero__meta">
        <div>Archetypes<b>4</b></div>
        <div>Print formats<b>${fmtGroups('print').length}</b></div>
        <div>Digital formats<b>${FORMATS.length - fmtGroups('print').length}</b></div>
        <div>Export<b>PNG &middot; PDF</b></div>
      </div>
    </div>
  </section>

  <!-- ARCHETYPES -->
  <section class="section" id="po-archetypes">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Four archetypes</h2>
        <p class="section-head__body">Pick the archetype from what the poster has to prove, not from what looks fresh. Shown at A3 (297&nbsp;&times;&nbsp;420&nbsp;mm, 1:&radic;2). Turn on the guides to see the construction: the six-column grid, the margins, the 3&nbsp;mm bleed, the safe zone, and the logo&rsquo;s clear space.</p>
      </div>
      <div class="po-tools">
        <button type="button" class="po-toggle" data-guide="grid" aria-pressed="false"><i data-lucide="layout-grid"></i>Grid &amp; margins</button>
        <button type="button" class="po-toggle" data-guide="safe" aria-pressed="false"><i data-lucide="scan"></i>Safe zone &amp; bleed</button>
        <div class="po-legend" aria-label="Guide legend">
          <span><i></i>Trim</span><span><i class="d1"></i>Bleed / margin</span><span><i class="d2"></i>Safe zone / clear space</span><span><i class="fill"></i>Columns</span>
        </div>
      </div>
      <div class="po-arch">
        ${ARCHETYPES.map(a => `
        <div class="po-card">
          <div class="po-card__stage"><div class="po-mount" data-fmt="a3" data-arch="${a.id}" data-set="arch"></div></div>
          <div class="po-card__cap">
            <h3><i data-lucide="${a.icon}"></i>${a.name}</h3>
            ${a.use}
            <dl><dt>Ground</dt><dd>${a.ground}</dd><dt>Red</dt><dd>${a.red}</dd></dl>
          </div>
        </div>`).join('')}
      </div>
      <div class="po-anat">
        <div><b>Margins</b>7.5% of the short edge on portrait and square, 8.5% on landscape, 9% on towers. On A3 that&rsquo;s 22&nbsp;mm.</div>
        <div><b>Grid</b>Six columns portrait, four on towers, twelve on landscape and strips. Gutter is 35% of the margin.</div>
        <div><b>Type</b>Newsreader for the headline, stat, and date. DM Sans for eyebrows and buttons. JetBrains Mono for source lines and URLs.</div>
        <div><b>Logo</b>Wordmark at 24% of the short edge, bottom-left. Clear space equals the K height. With a button, logo left and button right, centred on one line.</div>
      </div>
    </div>
  </section>

  <!-- PRINT -->
  <section class="section" id="po-print-set">
    <div class="container">
      <div class="po-sec">
        <h2 class="po-sec__h">Print set</h2>
        <span class="po-sec__sub">${FMT['a5-flyer'].name} &rarr; 48-sheet &middot; ${PDFX.split(' · ')[0]}</span>
      </div>
      <p class="po-lead">Real dimensions, rendered by the same layout engine as the editor. Every print file is ${PDFX.replace(/ · /g, ', ')}, at 300&nbsp;ppi at final size unless the card says otherwise. Minimum type follows the viewing-distance rule further down.</p>
      <div class="po-tools">
        <button type="button" class="po-toggle" data-set-guides="print" aria-pressed="false"><i data-lucide="scan"></i>Show bleed &amp; safe zones</button>
      </div>
      <div class="po-fmts">
        ${fmtGroups('print').map(f => fmtCard(f, (f.id === 'backdrop' || f.id === 'billboard-48') ? ' po-fmt--wide' : '')).join('')}
      </div>

      <div class="po-colour">
        <div class="po-group-h">Colour for print</div>
        <ul style="list-style:none;padding:0;margin:0;">
          <li class="token-row"><span class="token-row__label"><span class="po-sw" style="background:var(--k-red)"></span>Brand red &middot; --k-red<span class="po-approx">Approximate &mdash; confirm with printer</span></span><span class="token-row__meta">C 0 / M 100 / Y 87 / K 5 &middot; Pantone 186 C nearest</span></li>
          <li class="token-row"><span class="token-row__label"><span class="po-sw" style="background:var(--k-ink)"></span>Ink &middot; --k-ink<span class="po-approx">Approximate &mdash; confirm with printer</span></span><span class="token-row__meta">C 60 / M 50 / Y 50 / K 100 solids &middot; K 100 only for type under 24 pt</span></li>
          <li class="token-row"><span class="token-row__label"><span class="po-sw" style="background:var(--k-paper-2)"></span>Warm paper &middot; --k-paper-2<span class="po-approx">Approximate &mdash; confirm with printer</span></span><span class="token-row__meta">Uncoated natural white, or C 0 / M 2 / Y 4 / K 2 tint on coated</span></li>
          <li class="token-row"><span class="token-row__label">Proofing</span><span class="token-row__meta">Hard proof the red on the actual stock. Screen red will not survive CMYK unchanged.</span></li>
        </ul>
      </div>
    </div>
  </section>

  <!-- DIGITAL -->
  <section class="section" id="po-digital-set">
    <div class="container">
      <div class="po-sec">
        <h2 class="po-sec__h">Digital set</h2>
        <span class="po-sec__sub">IAB &middot; Meta &middot; LinkedIn &middot; OG &middot; YouTube &middot; email</span>
      </div>
      <p class="po-lead">True aspect ratios. Display units render at 1:1 where the column allows, and scale down where it doesn&rsquo;t. Paid social, link previews, thumbnails, and email heroes never carry a baked-in button: the platform or the email supplies a real one.</p>
      <div class="po-tools">
        <button type="button" class="po-toggle" data-set-guides="digital" aria-pressed="false"><i data-lucide="scan"></i>Show safe zones &amp; platform UI</button>
      </div>

      <h3 class="po-group-h">Display (IAB)</h3>
      <div class="po-fmts po-fmts--2">
        ${['iab-970x250', 'iab-728x90'].map(id => fmtCard(FMT[id], ' po-fmt--wide')).join('')}
        ${['iab-300x250', 'iab-300x600', 'iab-160x600', 'iab-320x50'].map(id => fmtCard(FMT[id])).join('')}
      </div>

      <h3 class="po-group-h">Extreme ratios</h3>
      <div class="po-x">
        <div class="po-x__tower"><div class="po-mount" data-fmt="iab-160x600" data-arch="statement" data-set="x" style="--po-max-w:160px"></div><div class="po-x__cap">160 &times; 600 &middot; tower</div></div>
        <div>
          <div class="po-x__strips">
            <div><div class="po-mount" data-fmt="iab-728x90" data-arch="statement" data-set="x" style="--po-max-w:728px"></div><div class="po-x__cap">728 &times; 90 &middot; strip</div></div>
            <div><div class="po-mount" data-fmt="iab-320x50" data-arch="statement" data-set="x" style="--po-max-w:320px;margin:0"></div><div class="po-x__cap">320 &times; 50 &middot; strip, button dropped</div></div>
            <div><div class="po-mount" data-fmt="iab-970x250" data-arch="stat" data-set="x" style="--po-max-w:970px"></div><div class="po-x__cap">970 &times; 250 &middot; strip, Stat</div></div>
          </div>
          <div class="po-x__notes">
            <div><b>Strips (wider than 2.6:1)</b>One row: logo, message, button. The eyebrow, rule, source line, and URL drop out. Type is sized from the height.</div>
            <div><b>Towers (narrower than 0.6:1)</b>One column: logo at the top, eyebrow and headline, button at the bottom. The headline breaks into short lines and is sized from the width, centred in the free space.</div>
            <div><b>When it won&rsquo;t fit</b>The engine shrinks type to the format&rsquo;s floor (11&nbsp;px here), then drops the button, then flags the copy as too long. It never goes below the floor.</div>
          </div>
        </div>
      </div>

      <h3 class="po-group-h">Paid social &middot; Meta &amp; LinkedIn</h3>
      <div class="po-fmts">
        ${['feed-1080', 'feed-1080x1350', 'story-1080x1920'].map(id => fmtCard(FMT[id])).join('')}
        ${fmtCard(FMT['li-1200x627'], ' po-fmt--wide')}
      </div>

      <h3 class="po-group-h">Web, video &amp; email</h3>
      <div class="po-fmts">
        ${['og-1200x630', 'yt-1280x720', 'email-600x300'].map(id => fmtCard(FMT[id])).join('')}
      </div>
    </div>
  </section>

  <!-- EDITOR -->
  <section class="section" id="po-editor">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Live editor</h2>
        <p class="section-head__body">Write the copy, pick an archetype and a size. The preview runs the same engine as every visual on this page, so the warnings are the rules. <b>Download PNG</b> renders to a canvas at the exact pixel size (print sizes at up to 150&nbsp;ppi, capped at 4096&nbsp;px). <b>Print / save PDF</b> sets the page to the poster&rsquo;s trim size and prints only the poster.</p>
      </div>
      <div class="po-ed">
        <form class="po-ed__form" id="po-ed-form" autocomplete="off">
          <fieldset><legend>Archetype</legend>
            <div class="po-seg">${ARCHETYPES.map(a => `<label><input type="radio" name="arch" value="${a.id}"><span><i data-lucide="${a.icon}"></i>${a.name}</span></label>`).join('')}</div>
          </fieldset>
          <label class="po-f"><span>Size</span><select name="fmt">${fmtOptions}</select></label>
          <label class="po-f"><span>Eyebrow</span><input name="eyebrow" maxlength="60"></label>
          <label class="po-f"><span data-label-headline>Headline</span><textarea name="headline" rows="2" maxlength="160"></textarea></label>
          <label class="po-f" data-for="statement photo event"><span>Red emphasis word</span><input name="em" maxlength="40"></label>
          <div class="po-row2" data-for="stat">
            <label class="po-f"><span>Stat</span><input name="stat" maxlength="10"></label>
            <label class="po-f"><span>Source</span><input name="source" maxlength="90"></label>
          </div>
          <div class="po-row2" data-for="event">
            <label class="po-f"><span>Date</span><input name="date" maxlength="30"></label>
            <label class="po-f"><span>Place</span><input name="place" maxlength="40"></label>
          </div>
          <label class="po-f"><span>Call to action</span><input name="cta" maxlength="28"></label>
          <fieldset data-for="photo"><legend>Photo</legend>
            <div class="po-photos">${PHOTOS.map(p => `<label title="${p.label}"><input type="radio" name="photo" value="${p.id}"><img src="${p.src}" alt="${p.label}" loading="lazy"></label>`).join('')}</div>
          </fieldset>
          <div class="po-ed__opts">
            <label class="po-check"><input type="checkbox" name="guides"> Show guides</label>
            <label class="po-check" data-when="print"><input type="checkbox" name="bleed"> PDF with bleed</label>
            <label class="po-check" data-when="digital">PNG <select name="scale"><option value="1">1&times;</option><option value="2">2&times;</option></select></label>
          </div>
          <div class="po-ed__actions">
            <button type="button" class="btn btn--primary" id="po-png"><i data-lucide="download"></i>Download PNG</button>
            <button type="button" class="btn" id="po-pdf"><i data-lucide="printer"></i>Print / save PDF</button>
          </div>
          <p class="po-ed__out" id="po-out" aria-live="polite"></p>
        </form>
        <div class="po-ed__preview">
          <div class="po-ed__stage" id="po-ed-stage"></div>
          <div class="po-ed__meta" id="po-ed-meta"></div>
          <ul class="po-ed__warn" id="po-ed-warn" aria-live="polite"></ul>
        </div>
      </div>
    </div>
  </section>

  <!-- RULES -->
  <section class="section" id="po-rules">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Rules</h2>
        <p class="section-head__body">The four mistakes that turn up most in review, rendered by the engine with the rule switched off. Then the six rules that prevent them.</p>
      </div>
      <div class="po-dd">
        ${DD.map((d, i) => `
        <div class="po-dd__pair">
          <div class="po-dd__cell"><span class="po-dd__tag po-dd__tag--do">Do</span><div class="po-mount" data-fmt="a3" data-arch="${d.arch}" data-set="dd" data-dd="${i}" data-dd-bad="0"></div></div>
          <div class="po-dd__cell"><span class="po-dd__tag po-dd__tag--dont">Don&rsquo;t</span><div class="po-mount" data-fmt="a3" data-arch="${d.arch}" data-set="dd" data-dd="${i}" data-dd-bad="1"></div></div>
          <div class="po-dd__cap">${d.cap}</div>
        </div>`).join('')}
      </div>

      <div class="po-rules">
        ${RULES.map((r, i) => `<div class="po-rule"><div class="po-rule__num">${String(i + 1).padStart(2, '0')}</div><h3>${r.h}</h3><p>${r.b}</p></div>`).join('')}
      </div>

      <h3 class="po-group-h" style="margin-top:var(--s-8)">Minimum type by viewing distance &middot; cap height &ge; distance &divide; 250</h3>
      <div class="po-table-wrap">
        <table class="po-table">
          <thead><tr><th>Read at</th><th>Cap height</th><th>Min type</th><th>Typical format</th></tr></thead>
          <tbody>${TYPE_TABLE.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- FOR AGENTS -->
  <section class="section" id="po-agents">
    <div class="container">
      <div class="po-sec"><h2 class="po-sec__h">For agents</h2><span class="po-sec__sub">#posters-spec &middot; application/json</span></div>
      <div class="po-agent">
        <p>Every number on this page lives in one JSON block in the DOM: <code>JSON.parse(document.getElementById('posters-spec').textContent)</code>. It lists each format with its size in mm or px, bleed, safe zone, minimum type, file spec, and the archetypes allowed, plus the colour conversions (marked approximate), the viewing-distance table, and the rules.</p>
        <p>To render programmatically, use <code>window.KWPosters.build(format, archetype, content)</code>, then <code>toSVG(layout)</code> or <code>toCanvas(layout, pxPerUnit)</code>. The source header in <code>project/pages/posters.js</code> carries the same summary in plain text.</p>
        <details><summary>View the spec (${(specJson.length / 1024).toFixed(1)} KB)</summary><pre>${esc(specJson)}</pre></details>
      </div>
      <script type="application/json" id="posters-spec">${specSafe}</script>
    </div>
  </section>
  `;

    /* ---------- mounting ---------- */
    const state = { arch: { grid: false, safe: false }, print: false, digital: false };
    function cfgFor(el) {
      const set = el.dataset.set, f = FMT[el.dataset.fmt], arch = el.dataset.arch;
      if (set === 'arch') return { f, arch, c: null, opts: { guides: state.arch }, view: state.arch.safe ? 'bleed' : 'trim' };
      if (set === 'print') return { f, arch, c: null, opts: { guides: state.print ? { safe: true } : null }, view: state.print ? 'bleed' : 'trim' };
      if (set === 'digital') return { f, arch, c: null, opts: { guides: state.digital ? { safe: true } : null }, view: 'trim' };
      if (set === 'dd') {
        const d = DD[+el.dataset.dd], bad = el.dataset.ddBad === '1';
        return { f, arch, c: bad ? d.dont : d.do, opts: bad ? d.bad : {}, view: 'trim' };
      }
      return { f, arch, c: null, opts: {}, view: 'trim' };
    }
    function draw(el) {
      const k = cfgFor(el);
      const L = build(k.f, k.arch, k.c, k.opts);
      el.innerHTML = toSVG(L, { view: k.view });
    }
    root.querySelectorAll('.po-mount').forEach(el => { mounts.push(el); });
    const drawAll = () => { mounts.forEach(draw); drawEditor(); };

    root.querySelectorAll('[data-guide]').forEach(btn => btn.addEventListener('click', () => {
      const k = btn.dataset.guide; state.arch[k] = !state.arch[k];
      btn.setAttribute('aria-pressed', String(state.arch[k]));
      mounts.filter(el => el.dataset.set === 'arch').forEach(draw);
    }));
    root.querySelectorAll('[data-set-guides]').forEach(btn => btn.addEventListener('click', () => {
      const k = btn.dataset.setGuides; state[k] = !state[k];
      btn.setAttribute('aria-pressed', String(state[k]));
      mounts.filter(el => el.dataset.set === k).forEach(draw);
    }));

    /* ---------- editor ---------- */
    const form = root.querySelector('#po-ed-form');
    const stage = root.querySelector('#po-ed-stage');
    const metaEl = root.querySelector('#po-ed-meta');
    const warnEl = root.querySelector('#po-ed-warn');
    const outEl = root.querySelector('#po-out');
    const ed = { arch: 'statement', fmt: 'a3', content: clone(CONTENT), guides: false, bleed: false, scale: 1 };
    const FIELDS = ['eyebrow', 'headline', 'em', 'stat', 'source', 'date', 'place', 'cta'];

    function fillForm() {
      form.querySelector(`input[name="arch"][value="${ed.arch}"]`).checked = true;
      form.fmt.value = ed.fmt;
      const c = ed.content[ed.arch];
      FIELDS.forEach(n => { if (form[n]) form[n].value = c[n] || ''; });
      const ph = form.querySelector(`input[name="photo"][value="${c.photo}"]`); if (ph) ph.checked = true;
      form.guides.checked = ed.guides; form.bleed.checked = ed.bleed; form.scale.value = String(ed.scale);
      syncVisibility();
    }
    function syncVisibility() {
      const f = FMT[ed.fmt];
      const a = f.id === 'badge' ? 'event' : ed.arch;
      form.querySelectorAll('[data-for]').forEach(el => { el.hidden = el.dataset.for.split(' ').indexOf(a) < 0; });
      form.querySelector('[data-label-headline]').textContent = ed.arch === 'stat' ? 'Stat label' : 'Headline';
      form.querySelectorAll('[data-when]').forEach(el => { el.hidden = el.dataset.when !== (f.group === 'print' ? 'print' : 'digital'); });
    }
    function exportK(f) {
      if (f.unit === 'px') return (f.exportScale && ed.scale === 1 ? f.exportScale : ed.scale);
      return Math.min(150 / 25.4, 4096 / Math.max(f.w, f.h));
    }
    function drawEditor() {
      const f = FMT[ed.fmt];
      const arch = f.id === 'badge' ? 'event' : ed.arch;
      const L = build(f, arch, ed.content[arch], { guides: ed.guides ? { grid: true, safe: true } : null });
      stage.innerHTML = toSVG(L, { view: ed.guides ? 'bleed' : 'trim' });
      const k = exportK(f), pw = Math.round(f.w * k), ph = Math.round(f.h * k);
      const hs = f.unit === 'mm' ? `${Math.round(L.headSize / PT)} pt` : `${Math.round(L.headSize)} px`;
      metaEl.innerHTML = `<span>${f.name} · ${sizeLabelOf(f)}</span><span>${f.id === 'badge' ? 'Event badge' : ARCH[arch].name} · ${L.mode === 'tall' ? 'tower' : L.mode}</span><span>Lead type ${hs} · floor ${minLabelOf(f)}</span><span>PNG ${pw} × ${ph} px${f.unit === 'mm' ? ` (${Math.round(k * 25.4)} ppi)` : ''}</span>`;
      const ws = L.warns.slice();
      if (f.id === 'badge' && ed.arch !== 'event') ws.unshift('Badges always use the Event archetype; it’s the only one approved for this format.');
      warnEl.innerHTML = (ws.length ? ws.map(w => `<li>${esc(w)}</li>`).join('') : `<li class="ok">Within the rules for ${esc(f.name)}: one message, one red, type above the floor.</li>`)
        + L.notes.map(n => `<li class="note">${esc(n)}</li>`).join('');
      return L;
    }
    form.addEventListener('input', e => {
      const t = e.target, c = ed.content[ed.arch];
      if (t.name === 'arch') { ed.arch = t.value; fillForm(); }
      else if (t.name === 'fmt') { ed.fmt = t.value; const f = FMT[ed.fmt]; if (f.id !== 'badge' && f.arch.indexOf(ed.arch) < 0) { ed.arch = f.def; fillForm(); } syncVisibility(); }
      else if (t.name === 'photo') c.photo = t.value;
      else if (t.name === 'guides') ed.guides = t.checked;
      else if (t.name === 'bleed') ed.bleed = t.checked;
      else if (t.name === 'scale') ed.scale = +t.value;
      else if (FIELDS.indexOf(t.name) >= 0) c[t.name] = t.value;
      outEl.textContent = '';
      drawEditor();
    });
    form.addEventListener('submit', e => e.preventDefault());

    const fileBase = () => { const f = FMT[ed.fmt]; return `kilowott-${f.id}-${f.id === 'badge' ? 'badge' : ed.arch}`; };
    const editorLayout = () => { const f = FMT[ed.fmt]; const arch = f.id === 'badge' ? 'event' : ed.arch; return build(f, arch, ed.content[arch], {}); };

    async function renderPNG() {
      const f = FMT[ed.fmt];
      return toCanvas(editorLayout(), exportK(f));
    }
    root.querySelector('#po-png').addEventListener('click', async () => {
      outEl.textContent = 'Rendering…';
      try {
        const cv = await renderPNG();
        cv.toBlob(blob => {
          if (!blob) { outEl.textContent = 'Export failed: the canvas is too large for this browser.'; return; }
          const url = URL.createObjectURL(blob), a = document.createElement('a');
          a.href = url; a.download = fileBase() + '.png'; document.body.appendChild(a); a.click(); a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 5000);
          outEl.textContent = `Saved ${fileBase()}.png · ${cv.width} × ${cv.height} px · ${(blob.size / 1024).toFixed(0)} KB`;
        }, 'image/png');
      } catch (err) { outEl.textContent = 'Export failed: ' + err.message; }
    });

    function preparePrint() {
      const f = FMT[ed.fmt], L = editorLayout();
      const withBleed = f.group === 'print' && ed.bleed && f.bleed;
      const sc = f.printScale || 1, u = f.unit === 'mm' ? 'mm' : 'px', b = withBleed ? f.bleed : 0;
      const pw = +((f.w + 2 * b) * sc).toFixed(2), ph = +((f.h + 2 * b) * sc).toFixed(2);
      document.querySelectorAll('.po-print-host, #po-print-style').forEach(n => n.remove());
      const host = document.createElement('div'); host.className = 'po-print-host';
      host.innerHTML = toSVG(L, { view: withBleed ? 'bleed-only' : 'trim' });
      const st = document.createElement('style'); st.id = 'po-print-style';
      st.textContent = `.po-print-host{display:none}
@page{size:${pw}${u} ${ph}${u};margin:0}
@media print{html,body{margin:0!important;padding:0!important;background:none!important;width:auto!important;height:auto!important;overflow:visible!important}
body>*:not(.po-print-host){display:none!important}
.po-print-host{display:block!important;width:${pw}${u};height:${ph}${u};overflow:hidden;break-inside:avoid}
.po-print-host svg{display:block;width:${pw}${u}!important;height:${ph}${u}!important;max-width:none!important;margin:0}}`;
      document.head.appendChild(st); document.body.appendChild(host);
      const cleanup = () => { host.remove(); st.remove(); window.removeEventListener('afterprint', cleanup); };
      window.addEventListener('afterprint', cleanup);
      return { host, style: st, page: `${pw} × ${ph} ${u}`, cleanup };
    }
    root.querySelector('#po-pdf').addEventListener('click', async () => {
      const f = FMT[ed.fmt];
      const p = preparePrint();
      outEl.textContent = `Page ${p.page}${f.printScale ? ` (1:${Math.round(1 / f.printScale)} scale)` : ''}. Choose “Save as PDF” and set margins to none.`;
      await fontsReady();
      const imgs = Array.from(p.host.querySelectorAll('image'));
      await Promise.all(imgs.map(im => loadImg(im.getAttribute('href')).catch(() => null)));
      setTimeout(() => window.print(), 60);
    });

    // expose for agents + tests
    window.KWPosters = Object.assign(window.KWPosters || {}, { spec: buildSpec(), FORMATS, ARCHETYPES, CONTENT, build, toSVG, toCanvas, fontsReady,
      _editor: { state: ed, renderPNG, preparePrint, drawEditor } });

    fillForm();
    drawAll();
    fontsReady().then(() => { MCACHE.clear(); drawAll(); });
  };
})();
