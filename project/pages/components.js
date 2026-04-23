/* ============================================================
   COMPONENTS — buttons, forms, cards, nav, badges, tabs
   ============================================================ */

window.renderComponents = function (root) {
  root.innerHTML = `
  <style>
    /* -- scoped to the components page -- */

    .cp-hero {
      padding: calc(var(--s-9) * var(--density)) 0 calc(var(--s-7) * var(--density));
      border-bottom: 1px solid var(--rule);
    }
    .cp-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .cp-hero h1 em { font-style: italic; color: var(--accent); }
    .cp-hero__lede {
      margin-top: 22px; max-width: 60ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }

    /* Specimen frame */
    .cp-spec {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg);
    }
    .cp-spec__head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 20px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .cp-spec__stage {
      padding: var(--s-7) var(--s-6);
      display: flex; flex-wrap: wrap; gap: 16px; align-items: center;
      background: var(--bg);
      min-height: 140px;
    }
    .cp-spec__stage--dark {
      background: var(--k-ink);
      color: #fff;
    }
    .cp-spec__stage--warm {
      background: #F6F4F0;
    }
    .cp-spec__stage--col {
      flex-direction: column; align-items: flex-start; gap: 20px;
    }
    .cp-spec__foot {
      padding: 14px 20px;
      border-top: 1px solid var(--rule);
      font-size: var(--fs-sm); color: var(--fg-2);
      line-height: 1.6;
    }
    .cp-spec__foot b { color: var(--fg); display: inline; font-weight: 500; }

    /* ---------- BUTTONS ---------- */
    .k-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 20px;
      border-radius: 999px;
      font-family: var(--font-sans);
      font-size: 14px; font-weight: 500;
      letter-spacing: 0.01em;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all .18s cubic-bezier(.2,.8,.2,1);
      text-decoration: none;
      white-space: nowrap;
    }
    .k-btn__arrow { transition: transform .18s ease; display: inline-flex; align-items: center; }
    .k-btn__arrow .lucide { width: 16px; height: 16px; stroke-width: 1.75; }
    .k-btn:hover .k-btn__arrow { transform: translateX(3px); }
    .k-btn:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
    }

    /* Primary — ink */
    .k-btn--primary {
      background: var(--k-ink); color: #fff; border-color: var(--k-ink);
    }
    .k-btn--primary:hover { background: var(--accent); border-color: var(--accent); }

    /* Accent — red (conversion critical only) */
    .k-btn--accent {
      background: var(--accent); color: #fff; border-color: var(--accent);
    }
    .k-btn--accent:hover { background: #B40224; border-color: #B40224; }

    /* Secondary — outline */
    .k-btn--secondary {
      background: transparent; color: var(--k-ink); border-color: var(--k-ink);
    }
    .k-btn--secondary:hover { background: var(--k-ink); color: #fff; }

    /* Ghost — no border */
    .k-btn--ghost {
      background: transparent; color: var(--k-ink); border-color: transparent;
      padding: 12px 12px;
    }
    .k-btn--ghost:hover { color: var(--accent); }

    /* On-dark variants */
    .cp-spec__stage--dark .k-btn--primary { background: #fff; color: var(--k-ink); border-color: #fff; }
    .cp-spec__stage--dark .k-btn--primary:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
    .cp-spec__stage--dark .k-btn--secondary { color: #fff; border-color: #fff; }
    .cp-spec__stage--dark .k-btn--secondary:hover { background: #fff; color: var(--k-ink); }
    .cp-spec__stage--dark .k-btn--ghost { color: #fff; }

    /* Sizes */
    .k-btn--sm { padding: 8px 14px; font-size: 13px; }
    .k-btn--lg { padding: 16px 26px; font-size: 15px; }

    /* Disabled */
    .k-btn[disabled], .k-btn.is-disabled {
      opacity: 0.4; pointer-events: none;
    }

    /* ---------- BADGES / CHIPS ---------- */
    .k-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px;
      border-radius: 999px;
      font-family: var(--font-sans);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      border: 1px solid var(--rule-strong);
    }
    .k-badge--solid { background: var(--k-ink); color: #fff; border-color: var(--k-ink); }
    .k-badge--accent { background: var(--accent); color: #fff; border-color: var(--accent); }
    .k-badge--soft { background: #FCE5EA; color: #8A021B; border-color: transparent; }
    .k-badge--outline { background: transparent; color: var(--fg); }
    .k-badge::before {
      content: ""; width: 6px; height: 6px; border-radius: 50%;
      background: currentColor;
    }
    .k-badge--no-dot::before { display: none; }

    /* ---------- EYEBROW LABEL ---------- */
    .k-eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: var(--font-sans);
      font-size: 12px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--fg);
    }
    .k-eyebrow::before {
      content: ""; width: 24px; height: 1px; background: currentColor;
    }
    .k-eyebrow--accent { color: var(--accent); }
    .k-eyebrow--red-line::before { background: var(--accent); }

    /* ---------- FORMS ---------- */
    .k-field { display: flex; flex-direction: column; gap: 6px; width: 100%; max-width: 340px; }
    .k-field__label {
      font-family: var(--font-sans);
      font-size: 12px; font-weight: 500;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .k-input, .k-select, .k-textarea {
      font-family: var(--font-sans);
      font-size: 15px;
      padding: 12px 14px;
      background: var(--bg);
      color: var(--fg);
      border: 1px solid var(--rule-strong);
      border-radius: 4px;
      transition: border-color .15s ease, box-shadow .15s ease;
      width: 100%;
    }
    .k-input:focus, .k-select:focus, .k-textarea:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(228,2,45,0.12);
    }
    .k-input::placeholder, .k-textarea::placeholder { color: #9AA3AF; }
    .k-textarea { resize: vertical; min-height: 96px; }
    .k-field__hint {
      font-size: 12px; color: var(--fg-2);
    }
    .k-field--error .k-input { border-color: var(--accent); }
    .k-field--error .k-field__hint { color: var(--accent); }

    /* Checkbox / radio */
    .k-check {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: var(--font-sans); font-size: 14px;
      cursor: pointer;
    }
    .k-check input {
      appearance: none; -webkit-appearance: none;
      width: 18px; height: 18px;
      border: 1.5px solid var(--rule-strong);
      border-radius: 3px;
      background: var(--bg);
      display: grid; place-items: center;
      cursor: pointer;
      margin: 0;
    }
    .k-check input[type="radio"] { border-radius: 50%; }
    .k-check input:checked {
      background: var(--k-ink);
      border-color: var(--k-ink);
    }
    .k-check input:checked::after {
      content: "";
      width: 10px; height: 10px;
      background: #fff;
      -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' d='M3 8.5l3.5 3.5L13 5'/></svg>") no-repeat center/contain;
              mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' d='M3 8.5l3.5 3.5L13 5'/></svg>") no-repeat center/contain;
    }
    .k-check input[type="radio"]:checked::after {
      width: 8px; height: 8px; border-radius: 50%;
      background: #fff; -webkit-mask: none; mask: none;
    }

    /* Switch */
    .k-switch {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: var(--font-sans); font-size: 14px;
      cursor: pointer;
    }
    .k-switch input { position: absolute; opacity: 0; pointer-events: none; }
    .k-switch__track {
      width: 38px; height: 22px; border-radius: 999px;
      background: var(--rule-strong);
      position: relative;
      transition: background .18s ease;
    }
    .k-switch__track::after {
      content: ""; position: absolute; top: 3px; left: 3px;
      width: 16px; height: 16px; border-radius: 50%;
      background: #fff;
      transition: transform .18s cubic-bezier(.2,.8,.2,1);
      box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
    .k-switch input:checked + .k-switch__track {
      background: var(--k-ink);
    }
    .k-switch input:checked + .k-switch__track::after {
      transform: translateX(16px);
    }

    /* ---------- CARDS ---------- */
    .k-card {
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: 8px;
      padding: 28px;
      display: flex; flex-direction: column; gap: 14px;
      transition: border-color .2s ease, transform .2s ease;
    }
    .k-card:hover { border-color: var(--rule-strong); }
    .k-card--hover:hover { transform: translateY(-2px); border-color: var(--k-ink); }

    .k-card__eyebrow {
      font-family: var(--font-sans);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .k-card__title {
      font-family: var(--font-display);
      font-size: 1.5rem; font-weight: 400;
      line-height: 1.15; letter-spacing: -0.01em;
    }
    .k-card__title em { font-style: italic; color: var(--accent); }
    .k-card__body {
      color: var(--fg-2); font-size: 14px; line-height: 1.6;
    }
    .k-card__foot {
      margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule);
      display: flex; justify-content: space-between; align-items: center;
      font-size: 12px; color: var(--fg-2);
    }

    /* Stat card */
    .k-stat {
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: 8px;
      padding: 28px;
      display: flex; flex-direction: column; gap: 8px;
    }
    .k-stat__num {
      font-family: var(--font-display);
      font-size: 4rem; line-height: 1;
      color: var(--accent);
      letter-spacing: -0.03em;
      font-weight: 400;
    }
    .k-stat__label {
      font-size: 13px; color: var(--fg-2); line-height: 1.5;
      max-width: 22ch;
    }
    .k-stat__source {
      margin-top: 6px; font-family: var(--font-mono);
      font-size: 11px; color: var(--fg-2);
      letter-spacing: 0.06em; text-transform: uppercase;
    }

    /* Case study card — image placeholder */
    .k-case {
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: 8px;
      overflow: hidden;
      display: flex; flex-direction: column;
    }
    .k-case__img {
      aspect-ratio: 4/3;
      background: var(--k-ink) center/cover no-repeat;
      position: relative;
    }
    .k-case__img::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(11,15,20,0) 55%, rgba(11,15,20,0.25) 100%);
      pointer-events: none;
    }
    .k-case__body { padding: 24px; display: flex; flex-direction: column; gap: 10px; }
    .k-case__meta { display: flex; gap: 8px; flex-wrap: wrap; }
    .k-case__title {
      font-family: var(--font-display);
      font-size: 1.25rem; font-weight: 400;
      line-height: 1.2; letter-spacing: -0.01em;
    }
    .k-case__title em { font-style: italic; color: var(--accent); }
    .k-case__cta {
      margin-top: 10px;
      font-size: 13px; font-weight: 500;
      color: var(--fg);
      display: inline-flex; align-items: center; gap: 6px;
    }
    .k-case__cta .lucide { width: 14px; height: 14px; stroke-width: 1.75; }
    .k-card__foot span .lucide { width: 14px; height: 14px; stroke-width: 1.75; vertical-align: middle; }
    .lp-s7__more .lucide { width: 14px; height: 14px; stroke-width: 1.75; }

    /* ---------- TABS ---------- */
    .k-tabs {
      display: inline-flex; gap: 2px;
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: 999px;
      padding: 3px;
    }
    .k-tab {
      padding: 8px 16px;
      border-radius: 999px;
      font-family: var(--font-sans);
      font-size: 14px; font-weight: 500;
      color: var(--fg-2);
      border: 0; background: transparent; cursor: pointer;
      transition: color .15s ease;
    }
    .k-tab:hover { color: var(--fg); }
    .k-tab[aria-current="page"], .k-tab.is-active {
      background: var(--k-ink); color: #fff;
    }
    /* Underline variant */
    .k-tabs--underline {
      display: flex; gap: 0; border: 0; border-bottom: 1px solid var(--rule);
      background: transparent; border-radius: 0; padding: 0;
    }
    .k-tabs--underline .k-tab {
      border-radius: 0; padding: 14px 2px; margin-right: 24px;
      border-bottom: 2px solid transparent;
      background: transparent; color: var(--fg-2);
    }
    .k-tabs--underline .k-tab.is-active {
      color: var(--fg); border-bottom-color: var(--accent); background: transparent;
    }

    /* ---------- BREADCRUMBS ---------- */
    .k-breadcrumb {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: var(--font-sans); font-size: 13px;
      color: var(--fg-2);
    }
    .k-breadcrumb a { color: var(--fg-2); text-decoration: none; transition: color .15s; }
    .k-breadcrumb a:hover { color: var(--fg); }
    .k-breadcrumb__sep { color: var(--rule-strong); }
    .k-breadcrumb__current { color: var(--fg); }

    /* ---------- INDEX GRID ---------- */
    .cp-index {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      margin-top: 32px;
    }
    @media (max-width: 800px) { .cp-index { grid-template-columns: 1fr 1fr; } }
    .cp-index a {
      display: flex; justify-content: space-between; align-items: center;
      padding: 18px 20px;
      border: 1px solid var(--rule);
      text-decoration: none; color: var(--fg);
      font-size: 14px; font-weight: 500;
      transition: background .15s, border-color .15s;
    }
    .cp-index a:hover { background: var(--bg-2); border-color: var(--rule-strong); }
    .cp-index a::after {
      content: "↓"; color: var(--fg-2); font-weight: 400;
    }

    /* Dense grids */
    .cp-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .cp-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    @media (max-width: 900px) { .cp-grid-2, .cp-grid-3 { grid-template-columns: 1fr; } }

    /* ---------- UI STATES ---------- */
    .k-state {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      padding: 48px 32px;
      display: flex; flex-direction: column; align-items: center; text-align: center;
      gap: 14px;
      min-height: 280px;
      justify-content: center;
    }
    .k-state__icon {
      width: 40px; height: 40px;
      color: var(--fg-2);
      display: grid; place-items: center;
      border: 1px solid var(--rule);
      border-radius: 50%;
    }
    .k-state__icon svg { width: 20px; height: 20px; }
    .k-state__title {
      font-family: var(--font-display);
      font-size: 1.375rem; line-height: 1.2; letter-spacing: -0.01em;
      font-weight: 400;
      max-width: 22ch;
    }
    .k-state__title em { font-style: italic; color: var(--accent); }
    .k-state__body {
      color: var(--fg-2); font-size: 14px; line-height: 1.6;
      max-width: 36ch;
    }
    .k-state__body b { color: var(--fg); font-weight: 500; }
    .k-state__actions {
      display: flex; gap: 10px; margin-top: 8px;
    }
    .k-state--error .k-state__icon { color: var(--accent); border-color: var(--accent); background: #FCE5EA; }
    .k-state--alert .k-state__title em,
    .k-state--error .k-state__title em { color: var(--accent); }

    /* Skeleton loader */
    .k-skel {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      padding: 28px;
      display: flex; flex-direction: column; gap: 12px;
    }
    .k-skel__line {
      background: var(--bg-3);
      height: 12px; border-radius: 3px;
      animation: k-skel-pulse 1.4s ease-in-out infinite;
    }
    .k-skel__line--title { height: 22px; width: 68%; }
    .k-skel__line--short { width: 40%; }
    .k-skel__line--full  { width: 100%; }
    .k-skel__line--med   { width: 72%; }
    @keyframes k-skel-pulse {
      0%, 100% { opacity: 0.55; }
      50%      { opacity: 1; }
    }

    /* Spinner */
    .k-spinner {
      width: 24px; height: 24px;
      border: 2px solid var(--rule);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: k-spin 0.9s linear infinite;
    }
    .k-spinner--sm { width: 16px; height: 16px; border-width: 1.5px; }
    .k-spinner--lg { width: 40px; height: 40px; border-width: 3px; }
    @keyframes k-spin { to { transform: rotate(360deg); } }
    @media (prefers-reduced-motion: reduce) {
      .k-skel__line, .k-spinner { animation: none; }
    }

    /* 404 page */
    .k-404 {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      padding: 72px 32px;
      text-align: center;
      background: var(--bg);
    }
    .k-404__num {
      font-family: var(--font-display);
      font-size: clamp(5rem, 12vw, 9rem);
      line-height: 1; letter-spacing: -0.04em;
      color: var(--fg);
      font-variant-numeric: tabular-nums;
      font-weight: 400;
    }
    .k-404__num em { font-style: italic; color: var(--accent); }
    .k-404__title {
      font-family: var(--font-display);
      font-size: 1.5rem; letter-spacing: -0.01em; line-height: 1.2;
      margin: 8px 0 0;
      font-weight: 400;
    }
    .k-404__body {
      color: var(--fg-2); font-size: 15px; line-height: 1.6;
      max-width: 48ch; margin: 16px auto 24px;
    }

    /* ---------- MODAL / DIALOG ---------- */
    .k-modal-demo {
      width: 100%;
      min-height: 260px;
      background: var(--bg-2, #F6F4F0);
      border: 1px dashed var(--rule);
      border-radius: var(--r-2);
      position: relative;
      overflow: hidden;
      display: grid; place-items: center;
    }
    .k-modal-scrim {
      position: absolute; inset: 0;
      background: rgba(11,15,20,0.52);
      display: grid; place-items: center;
      padding: 20px;
      opacity: 0; pointer-events: none;
      transition: opacity .18s ease;
    }
    .k-modal-scrim.is-open { opacity: 1; pointer-events: auto; }
    .k-modal {
      width: 100%; max-width: 420px;
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      box-shadow: 0 24px 64px rgba(11,15,20,0.24);
      display: flex; flex-direction: column;
      transform: translateY(8px);
      transition: transform .22s cubic-bezier(.2,.8,.2,1);
    }
    .k-modal-scrim.is-open .k-modal { transform: translateY(0); }
    .k-modal__head {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 22px;
      border-bottom: 1px solid var(--rule);
    }
    .k-modal__title {
      font-family: var(--font-display);
      font-size: 1.125rem; font-weight: 400;
      letter-spacing: -0.01em; line-height: 1.25;
    }
    .k-modal__title em { font-style: italic; color: var(--accent); }
    .k-modal__close {
      appearance: none; background: transparent;
      border: 0; padding: 6px; cursor: pointer;
      color: var(--fg-2);
      border-radius: 4px;
      line-height: 0;
    }
    .k-modal__close:hover { color: var(--fg); background: var(--bg-2); }
    .k-modal__close:focus-visible {
      outline: 2px solid var(--accent); outline-offset: 3px;
    }
    .k-modal__body {
      padding: 20px 22px;
      font-size: 14px; line-height: 1.6;
      color: var(--fg-2);
    }
    .k-modal__body b { color: var(--fg); font-weight: 500; }
    .k-modal__foot {
      display: flex; justify-content: flex-end; gap: 10px;
      padding: 14px 22px 18px;
    }
    .k-modal--destructive .k-modal__title em { color: var(--accent); }

    /* ---------- TOAST / NOTIFICATION ---------- */
    .k-toast-demo {
      width: 100%;
      min-height: 260px;
      background: var(--bg-2, #F6F4F0);
      border: 1px dashed var(--rule);
      border-radius: var(--r-2);
      position: relative; overflow: hidden;
      padding: 20px;
    }
    .k-toast-stack {
      position: absolute; right: 18px; bottom: 18px;
      display: flex; flex-direction: column; gap: 10px;
      max-width: calc(100% - 36px);
    }
    .k-toast {
      display: flex; align-items: flex-start; gap: 12px;
      background: var(--bg);
      border: 1px solid var(--rule);
      border-left: 3px solid var(--fg);
      border-radius: var(--r-2);
      padding: 12px 14px;
      min-width: 260px; max-width: 360px;
      box-shadow: 0 8px 24px rgba(11,15,20,0.12);
      animation: k-toast-in .22s cubic-bezier(.2,.8,.2,1);
    }
    .k-toast.is-leaving { animation: k-toast-out .2s ease forwards; }
    @keyframes k-toast-in {
      from { transform: translateY(10px); opacity: 0; }
      to   { transform: translateY(0); opacity: 1; }
    }
    @keyframes k-toast-out {
      to { transform: translateY(10px); opacity: 0; }
    }
    .k-toast__icon {
      flex: 0 0 auto; width: 18px; height: 18px;
      margin-top: 1px; color: var(--fg);
    }
    .k-toast__body {
      flex: 1 1 auto; font-size: 13px; line-height: 1.5; color: var(--fg);
    }
    .k-toast__body b { font-weight: 500; }
    .k-toast__close {
      background: transparent; border: 0; color: var(--fg-2);
      cursor: pointer; padding: 0; line-height: 1;
      font-size: 16px;
    }
    .k-toast--info     { border-left-color: var(--k-ink); }
    .k-toast--success  { border-left-color: #1f8a3b; }
    .k-toast--success .k-toast__icon { color: #1f8a3b; }
    .k-toast--warning  { border-left-color: #B67B02; }
    .k-toast--warning .k-toast__icon { color: #B67B02; }
    .k-toast--danger   { border-left-color: var(--accent); }
    .k-toast--danger .k-toast__icon { color: var(--accent); }

    /* ---------- TOOLTIP ---------- */
    .k-tip-wrap {
      position: relative; display: inline-flex;
    }
    .k-tip {
      position: absolute;
      background: var(--k-ink); color: #fff;
      font-family: var(--font-sans);
      font-size: 12px; font-weight: 500;
      letter-spacing: 0.01em;
      padding: 6px 10px;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transform: translate(0, 4px);
      transition: opacity .15s ease, transform .15s ease;
      z-index: 10;
    }
    .k-tip::after {
      content: "";
      position: absolute;
      width: 0; height: 0;
      border: 5px solid transparent;
    }
    .k-tip--top {
      bottom: calc(100% + 8px); left: 50%; transform: translate(-50%, 4px);
    }
    .k-tip--top::after {
      top: 100%; left: 50%; transform: translateX(-50%);
      border-top-color: var(--k-ink);
    }
    .k-tip--bottom {
      top: calc(100% + 8px); left: 50%; transform: translate(-50%, -4px);
    }
    .k-tip--bottom::after {
      bottom: 100%; left: 50%; transform: translateX(-50%);
      border-bottom-color: var(--k-ink);
    }
    .k-tip--left {
      right: calc(100% + 8px); top: 50%; transform: translate(4px, -50%);
    }
    .k-tip--left::after {
      left: 100%; top: 50%; transform: translateY(-50%);
      border-left-color: var(--k-ink);
    }
    .k-tip--right {
      left: calc(100% + 8px); top: 50%; transform: translate(-4px, -50%);
    }
    .k-tip--right::after {
      right: 100%; top: 50%; transform: translateY(-50%);
      border-right-color: var(--k-ink);
    }
    .k-tip-wrap:hover .k-tip,
    .k-tip-wrap:focus-within .k-tip {
      opacity: 1;
    }
    .k-tip-wrap:hover .k-tip--top,
    .k-tip-wrap:focus-within .k-tip--top { transform: translate(-50%, 0); }
    .k-tip-wrap:hover .k-tip--bottom,
    .k-tip-wrap:focus-within .k-tip--bottom { transform: translate(-50%, 0); }
    .k-tip-wrap:hover .k-tip--left,
    .k-tip-wrap:focus-within .k-tip--left { transform: translate(0, -50%); }
    .k-tip-wrap:hover .k-tip--right,
    .k-tip-wrap:focus-within .k-tip--right { transform: translate(0, -50%); }

    /* ---------- ACCORDION ---------- */
    .k-accordion {
      width: 100%;
      border-top: 1px solid var(--rule);
    }
    .k-accordion__item { border-bottom: 1px solid var(--rule); }
    .k-accordion__trigger {
      width: 100%;
      display: flex; align-items: center; justify-content: space-between;
      gap: 16px;
      background: transparent; border: 0;
      padding: 18px 4px;
      font-family: var(--font-sans);
      font-size: 15px; font-weight: 500;
      color: var(--fg);
      cursor: pointer;
      text-align: left;
    }
    .k-accordion__trigger:focus-visible {
      outline: 2px solid var(--accent); outline-offset: 3px;
    }
    .k-accordion__chev {
      flex: 0 0 auto; width: 14px; height: 14px;
      color: var(--fg-2);
      transition: transform .2s cubic-bezier(.2,.8,.2,1);
    }
    .k-accordion__item.is-open .k-accordion__chev { transform: rotate(180deg); color: var(--accent); }
    .k-accordion__panel {
      max-height: 0;
      overflow: hidden;
      transition: max-height .24s cubic-bezier(.2,.8,.2,1);
    }
    .k-accordion__item.is-open .k-accordion__panel { max-height: 320px; }
    .k-accordion__body {
      padding: 0 4px 18px;
      color: var(--fg-2);
      font-size: 14px; line-height: 1.6;
    }
    .k-accordion__body b { color: var(--fg); font-weight: 500; }

    /* ---------- DROPDOWN MENU ---------- */
    .k-dropdown {
      position: relative; display: inline-block;
    }
    .k-dropdown__trigger {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 14px;
      background: var(--bg);
      border: 1px solid var(--rule-strong);
      border-radius: var(--r-2);
      font-family: var(--font-sans);
      font-size: 14px; font-weight: 500;
      color: var(--fg);
      cursor: pointer;
    }
    .k-dropdown__trigger:focus-visible {
      outline: 2px solid var(--accent); outline-offset: 3px;
    }
    .k-dropdown__trigger-chev {
      width: 10px; height: 10px; color: var(--fg-2);
      transition: transform .18s ease;
    }
    .k-dropdown.is-open .k-dropdown__trigger-chev { transform: rotate(180deg); }
    .k-dropdown__menu {
      position: absolute; top: calc(100% + 6px); left: 0;
      min-width: 220px;
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      box-shadow: 0 16px 40px rgba(11,15,20,0.14);
      padding: 6px;
      display: none;
      z-index: 20;
    }
    .k-dropdown.is-open .k-dropdown__menu { display: block; }
    .k-dropdown__item {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 10px;
      border-radius: 4px;
      font-family: var(--font-sans); font-size: 14px;
      color: var(--fg);
      cursor: pointer;
      text-decoration: none;
    }
    .k-dropdown__item:hover { background: var(--bg-2); }
    .k-dropdown__item--active { font-weight: 500; }
    .k-dropdown__item--active::before {
      content: "✓"; color: var(--accent); font-weight: 500;
      width: 14px; display: inline-block; text-align: center;
    }
    .k-dropdown__item:not(.k-dropdown__item--active)::before {
      content: ""; width: 14px; display: inline-block;
    }
    .k-dropdown__item--danger { color: var(--accent); }
    .k-dropdown__item--danger:hover { background: #FCE5EA; }
    .k-dropdown__divider {
      height: 1px; background: var(--rule); margin: 4px 2px;
    }

    /* ---------- AVATAR ---------- */
    .k-avatar {
      display: inline-grid; place-items: center;
      width: 40px; height: 40px;
      border-radius: 50%;
      background: var(--bg-3, #E8E4DD);
      color: var(--fg);
      font-family: var(--font-sans);
      font-size: 14px; font-weight: 500;
      letter-spacing: 0.02em;
      overflow: hidden;
      border: 2px solid var(--bg);
      position: relative;
    }
    .k-avatar--sm { width: 28px; height: 28px; font-size: 11px; }
    .k-avatar--lg { width: 56px; height: 56px; font-size: 18px; }
    .k-avatar--photo {
      background-size: cover; background-position: center; color: transparent;
    }
    .k-avatar--placeholder {
      background: var(--bg-2, #F6F4F0);
      color: var(--fg-2);
    }
    .k-avatar-group {
      display: inline-flex;
    }
    .k-avatar-group .k-avatar + .k-avatar { margin-left: -10px; }
    .k-avatar-group .k-avatar--more {
      background: var(--k-ink); color: #fff;
      font-variant-numeric: tabular-nums;
      font-size: 12px;
    }
    .k-avatar-wrap { position: relative; display: inline-block; }
    .k-avatar-wrap .k-tip { white-space: nowrap; }

    /* ---------- ALERT BANNER ---------- */
    .k-alert {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px;
      border: 1px solid var(--rule);
      border-left-width: 3px;
      border-radius: var(--r-2);
      background: var(--bg);
      font-family: var(--font-sans); font-size: 14px;
      color: var(--fg);
      width: 100%;
    }
    .k-alert__icon { flex: 0 0 auto; width: 18px; height: 18px; color: var(--fg-2); }
    .k-alert__body { flex: 1 1 auto; line-height: 1.5; }
    .k-alert__body b { font-weight: 500; }
    .k-alert__action {
      font-size: 13px; font-weight: 500;
      color: var(--fg); text-decoration: underline;
      text-underline-offset: 3px;
    }
    .k-alert__close {
      background: transparent; border: 0; cursor: pointer;
      color: var(--fg-2); padding: 4px; line-height: 1; font-size: 16px;
      border-radius: 4px;
    }
    .k-alert__close:hover { color: var(--fg); }
    .k-alert--info    { border-left-color: var(--k-ink); }
    .k-alert--info .k-alert__icon { color: var(--k-ink); }
    .k-alert--warning { border-left-color: #B67B02; background: #FFF8E6; }
    .k-alert--warning .k-alert__icon { color: #B67B02; }
    .k-alert--danger  { border-left-color: var(--accent); background: #FCE5EA; }
    .k-alert--danger .k-alert__icon { color: var(--accent); }

    /* ---------- PAGINATION ---------- */
    .k-pagination {
      display: inline-flex; align-items: center; gap: 4px;
      font-family: var(--font-sans);
    }
    .k-page {
      min-width: 36px; height: 36px;
      padding: 0 10px;
      display: inline-grid; place-items: center;
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      font-size: 13px;
      color: var(--fg);
      font-variant-numeric: tabular-nums;
      cursor: pointer;
      text-decoration: none;
    }
    .k-page:hover { border-color: var(--rule-strong); }
    .k-page:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    .k-page.is-active {
      background: var(--k-ink); color: #fff; border-color: var(--k-ink);
      font-weight: 500;
    }
    .k-page.is-disabled { opacity: 0.4; pointer-events: none; }
    .k-page__ell {
      min-width: 28px; text-align: center;
      color: var(--fg-2); font-size: 13px;
    }

    /* ---------- CONTENT TABLE ---------- */
    .k-table-wrap {
      width: 100%;
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      overflow: hidden;
    }
    .k-table-wrap--sticky { max-height: 260px; overflow: auto; }
    .k-table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--font-sans);
      font-size: 14px;
    }
    .k-table thead th {
      text-align: left;
      font-family: var(--font-mono);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--fg-2);
      padding: 12px 16px;
      border-bottom: 1px solid var(--rule);
      background: var(--bg);
    }
    .k-table-wrap--sticky .k-table thead th {
      position: sticky; top: 0;
    }
    .k-table th.is-sortable { cursor: pointer; user-select: none; }
    .k-table th.is-sortable::after {
      content: " ↕"; color: var(--rule-strong);
    }
    .k-table th.is-sorted-asc::after  { content: " ↑"; color: var(--accent); }
    .k-table th.is-sorted-desc::after { content: " ↓"; color: var(--accent); }
    .k-table tbody td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--rule);
      color: var(--fg);
    }
    .k-table tbody tr:last-child td { border-bottom: 0; }
    .k-table tbody tr:hover { background: var(--bg-2); }
    .k-table--striped tbody tr:nth-child(even) { background: var(--bg-2); }
    .k-table--striped tbody tr:nth-child(even):hover { background: var(--bg-3); }
    .k-table td.num, .k-table th.num { text-align: right; font-variant-numeric: tabular-nums; }

    /* ---------- TOP-NAV (marketing) ---------- */
    .k-nav {
      display: flex; align-items: center; justify-content: space-between;
      gap: 24px;
      padding: 14px 22px;
      background: var(--bg);
      border-bottom: 1px solid var(--rule);
      width: 100%;
    }
    .k-nav--transparent {
      background: transparent;
      border-bottom-color: transparent;
    }
    .k-nav--scrolled {
      background: var(--bg);
      box-shadow: 0 1px 0 var(--rule), 0 8px 24px rgba(11,15,20,0.06);
      border-bottom-color: transparent;
    }
    .k-nav__logo {
      font-family: var(--font-display);
      font-size: 20px; font-weight: 400;
      letter-spacing: -0.01em;
      color: var(--fg);
      text-decoration: none;
    }
    .k-nav__logo em { font-style: italic; color: var(--accent); }
    .k-nav__links {
      display: flex; align-items: center; gap: 28px;
      list-style: none; padding: 0; margin: 0;
    }
    .k-nav__links a {
      font-family: var(--font-sans);
      font-size: 14px; font-weight: 500;
      color: var(--fg); text-decoration: none;
      transition: color .15s ease;
    }
    .k-nav__links a:hover { color: var(--accent); }
    .k-nav__right { display: flex; align-items: center; gap: 12px; }
    @media (max-width: 720px) {
      .k-nav__links { display: none; }
    }

    /* ---------- FOOTER ---------- */
    .k-footer {
      width: 100%;
      background: var(--bg);
      border-top: 1px solid var(--rule);
      padding: 36px 28px 24px;
      color: var(--fg-2);
      font-family: var(--font-sans);
    }
    .k-footer__grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr;
      gap: 28px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--rule);
    }
    @media (max-width: 720px) {
      .k-footer__grid { grid-template-columns: 1fr; }
    }
    .k-footer__brand {
      font-family: var(--font-display);
      font-size: 22px; letter-spacing: -0.01em;
      color: var(--fg);
      margin: 0 0 8px;
    }
    .k-footer__brand em { font-style: italic; color: var(--accent); }
    .k-footer__tag {
      font-size: 13px; line-height: 1.55;
      color: var(--fg-2);
      max-width: 32ch;
    }
    .k-footer__social {
      display: flex; gap: 10px;
      margin-top: 14px;
    }
    .k-footer__social a {
      width: 32px; height: 32px;
      display: inline-grid; place-items: center;
      border: 1px solid var(--rule);
      border-radius: 50%;
      color: var(--fg);
      text-decoration: none;
      font-size: 12px;
    }
    .k-footer__social a:hover { border-color: var(--accent); color: var(--accent); }
    .k-footer__col h4 {
      font-family: var(--font-sans);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--fg-2);
      margin: 0 0 12px;
    }
    .k-footer__col ul {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 8px;
    }
    .k-footer__col a {
      color: var(--fg); text-decoration: none; font-size: 14px;
    }
    .k-footer__col a:hover { color: var(--accent); }
    .k-footer__legal {
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 12px;
      padding-top: 16px;
      font-size: 12px; color: var(--fg-2);
      font-family: var(--font-mono);
      letter-spacing: 0.04em;
    }

    /* ---------- SEARCH ---------- */
    .k-search {
      position: relative;
      width: 100%; max-width: 420px;
    }
    .k-search__input-wrap {
      position: relative;
    }
    .k-search__icon {
      position: absolute; left: 12px; top: 50%;
      transform: translateY(-50%);
      width: 16px; height: 16px;
      color: var(--fg-2);
      pointer-events: none;
    }
    .k-search__input {
      width: 100%;
      font-family: var(--font-sans);
      font-size: 14px;
      padding: 11px 14px 11px 36px;
      background: var(--bg);
      color: var(--fg);
      border: 1px solid var(--rule-strong);
      border-radius: 999px;
      transition: border-color .15s ease, box-shadow .15s ease;
    }
    .k-search__input:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(228,2,45,0.12);
    }
    .k-search__results {
      position: absolute; top: calc(100% + 6px); left: 0; right: 0;
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-2);
      box-shadow: 0 16px 40px rgba(11,15,20,0.12);
      max-height: 260px; overflow: auto;
      z-index: 15;
      display: none;
    }
    .k-search.is-open .k-search__results { display: block; }
    .k-search__cat {
      font-family: var(--font-mono);
      font-size: 10px; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--fg-2);
      padding: 10px 14px 6px;
    }
    .k-search__item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px;
      color: var(--fg); font-size: 14px;
      text-decoration: none;
      cursor: pointer;
    }
    .k-search__item:hover { background: var(--bg-2); }
    .k-search__item small {
      margin-left: auto; color: var(--fg-2); font-size: 12px;
    }
    .k-search__empty {
      padding: 22px 14px;
      text-align: center; color: var(--fg-2);
      font-size: 13px; line-height: 1.5;
    }

  </style>

  <!-- HERO -->
  <section class="cp-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">05 · Components</span>
      <h1>The shared <em>parts</em> bin.</h1>
      <p class="cp-hero__lede">Every button, input, card and tab in one place. If it&rsquo;s on this page, use it as-is. If it&rsquo;s not, add it here before scattering a one-off across the site or a deck. Components are built from the same tokens as the rest of the system &mdash; swap theme, density or font pair and they follow.</p>

      <nav class="cp-index" aria-label="Component index">
        <a href="#cp-buttons" data-cp-jump="cp-buttons">Buttons</a>
        <a href="#cp-badges" data-cp-jump="cp-badges">Badges &amp; Eyebrows</a>
        <a href="#cp-forms" data-cp-jump="cp-forms">Form fields</a>
        <a href="#cp-cards" data-cp-jump="cp-cards">Cards</a>
        <a href="#cp-tabs-bc" data-cp-jump="cp-tabs-bc">Tabs &amp; Nav</a>
        <a href="#cp-stat-case" data-cp-jump="cp-stat-case">Stat &amp; Case cards</a>
        <a href="#cp-states" data-cp-jump="cp-states">UI states</a>
        <a href="#cp-modal" data-cp-jump="cp-modal">Modal</a>
        <a href="#cp-toast" data-cp-jump="cp-toast">Toast</a>
        <a href="#cp-tooltip" data-cp-jump="cp-tooltip">Tooltip</a>
        <a href="#cp-accordion" data-cp-jump="cp-accordion">Accordion</a>
        <a href="#cp-dropdown" data-cp-jump="cp-dropdown">Dropdown</a>
        <a href="#cp-avatar" data-cp-jump="cp-avatar">Avatar</a>
        <a href="#cp-alert" data-cp-jump="cp-alert">Alert banner</a>
        <a href="#cp-pagination" data-cp-jump="cp-pagination">Pagination</a>
        <a href="#cp-table" data-cp-jump="cp-table">Content table</a>
        <a href="#cp-nav" data-cp-jump="cp-nav">Top-nav</a>
        <a href="#cp-footer" data-cp-jump="cp-footer">Footer</a>
        <a href="#cp-search" data-cp-jump="cp-search">Search</a>
      </nav>
    </div>
  </section>

  <!-- BUTTONS -->
  <section class="section" id="cp-buttons">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Buttons</h2>
        <p class="section-head__body">Four variants, three sizes. <b>Primary</b> is the default. <b>Accent</b> is reserved for conversion-critical actions (Get in touch, Book a call). Never two Accents on the same view.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Variants · on paper</span><span>.k-btn</span></div>
          <div class="cp-spec__stage">
            <button class="k-btn k-btn--primary">Primary <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
            <button class="k-btn k-btn--accent">Get in touch <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
            <button class="k-btn k-btn--secondary">Secondary</button>
            <button class="k-btn k-btn--ghost">Ghost <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
          </div>
          <div class="cp-spec__foot"><b>Use —</b> Primary for default actions. Accent for the single most important CTA. Secondary for alternates. Ghost inside dense UI.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Variants · on ink</span><span>--stage-dark</span></div>
          <div class="cp-spec__stage cp-spec__stage--dark">
            <button class="k-btn k-btn--primary">Primary <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
            <button class="k-btn k-btn--accent">Get in touch <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
            <button class="k-btn k-btn--secondary">Secondary</button>
            <button class="k-btn k-btn--ghost">Ghost <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
          </div>
          <div class="cp-spec__foot"><b>On dark —</b> Primary flips to paper/white. Accent stays red for recognition.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Sizes</span><span>sm · md · lg</span></div>
          <div class="cp-spec__stage">
            <button class="k-btn k-btn--primary k-btn--sm">Small</button>
            <button class="k-btn k-btn--primary">Medium</button>
            <button class="k-btn k-btn--primary k-btn--lg">Large <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
          </div>
          <div class="cp-spec__foot"><b>Rule —</b> Medium is the default. Small for dense UI &amp; inline. Large for hero CTAs only.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>States</span><span>hover · focus · disabled</span></div>
          <div class="cp-spec__stage">
            <button class="k-btn k-btn--primary">Default</button>
            <button class="k-btn k-btn--primary" style="background:var(--accent); border-color:var(--accent);">Hover</button>
            <button class="k-btn k-btn--primary" style="box-shadow: 0 0 0 3px rgba(228,2,45,0.25);">Focus</button>
            <button class="k-btn k-btn--primary is-disabled">Disabled</button>
          </div>
          <div class="cp-spec__foot"><b>Focus —</b> 2px ring in accent color at 3px offset. Never remove focus outlines.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- BADGES -->
  <section class="section" id="cp-badges">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Badges &amp; Eyebrows</h2>
        <p class="section-head__body">Both do the same job &mdash; labeling context. <b>Eyebrows</b> sit above headlines. <b>Badges</b> sit inline or on cards. Pick one per surface.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Badge variants</span><span>.k-badge</span></div>
          <div class="cp-spec__stage">
            <span class="k-badge k-badge--solid">Live</span>
            <span class="k-badge k-badge--accent">New</span>
            <span class="k-badge k-badge--soft">Beta</span>
            <span class="k-badge k-badge--outline">Archived</span>
            <span class="k-badge k-badge--outline k-badge--no-dot">Tag</span>
          </div>
          <div class="cp-spec__foot"><b>Dot —</b> Shown by default for status. Remove for generic taxonomy tags.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Eyebrows</span><span>.k-eyebrow</span></div>
          <div class="cp-spec__stage cp-spec__stage--col">
            <span class="k-eyebrow">Case study</span>
            <span class="k-eyebrow k-eyebrow--accent">Partner success</span>
            <span class="k-eyebrow k-eyebrow--red-line">Industry — Health</span>
          </div>
          <div class="cp-spec__foot"><b>Rule —</b> ALL CAPS, 0.18em tracked, 24px rule prefix. Max 4 words.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FORMS -->
  <section class="section" id="cp-forms">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Form fields</h2>
        <p class="section-head__body">Inputs, selects, checks, radios and switches. Labels are uppercase and sit above the field. Error state uses the accent red &mdash; the only time red is allowed for body-sized type.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Text input</span><span>.k-input</span></div>
          <div class="cp-spec__stage cp-spec__stage--col">
            <div class="k-field">
              <label class="k-field__label">Work email</label>
              <input class="k-input" placeholder="you@company.com">
              <span class="k-field__hint">We&rsquo;ll never share this.</span>
            </div>
            <div class="k-field k-field--error">
              <label class="k-field__label">Work email</label>
              <input class="k-input" value="notanemail">
              <span class="k-field__hint">Please enter a valid email.</span>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Focus —</b> Border flips to accent, soft 3px ring at 12% opacity.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Select &amp; Textarea</span><span>.k-select · .k-textarea</span></div>
          <div class="cp-spec__stage cp-spec__stage--col">
            <div class="k-field">
              <label class="k-field__label">Industry</label>
              <select class="k-select">
                <option>Fintech</option>
                <option>Health</option>
                <option>Energy</option>
              </select>
            </div>
            <div class="k-field">
              <label class="k-field__label">Tell us about the project</label>
              <textarea class="k-textarea" placeholder="A few sentences is plenty."></textarea>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Labels —</b> Uppercase, 0.08em tracked, above the field. Never inside as placeholders.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Checkbox &amp; Radio</span><span>.k-check</span></div>
          <div class="cp-spec__stage cp-spec__stage--col">
            <label class="k-check"><input type="checkbox" checked> Subscribe to the quarterly note</label>
            <label class="k-check"><input type="checkbox"> Send me case studies</label>
            <label class="k-check"><input type="radio" name="r1" checked> Startup (&lt;50)</label>
            <label class="k-check"><input type="radio" name="r1"> Scale-up (50–500)</label>
            <label class="k-check"><input type="radio" name="r1"> Enterprise (500+)</label>
          </div>
          <div class="cp-spec__foot"><b>Check mark —</b> Paper tick on ink background. 18px hit area per WCAG min.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Switch</span><span>.k-switch</span></div>
          <div class="cp-spec__stage cp-spec__stage--col">
            <label class="k-switch"><input type="checkbox" checked><span class="k-switch__track"></span> Notify me about launches</label>
            <label class="k-switch"><input type="checkbox"><span class="k-switch__track"></span> Weekly digest</label>
          </div>
          <div class="cp-spec__foot"><b>Use —</b> For instant-apply settings. For form submits, use a checkbox.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CARDS -->
  <section class="section" id="cp-cards">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Content cards</h2>
        <p class="section-head__body">One shape, three roles. The content card is the workhorse &mdash; use it for anything with a title, a paragraph and a link out.</p>
      </div>

      <div class="cp-grid-3">
        <div class="k-card k-card--hover">
          <span class="k-card__eyebrow">Service</span>
          <h3 class="k-card__title">Product <em>engineering</em> at scale.</h3>
          <p class="k-card__body">Embedded pods that ship from week one. From prototype to production, one team.</p>
          <div class="k-card__foot">
            <span>12 case studies</span>
            <span>Learn more <i data-lucide="arrow-right"></i></span>
          </div>
        </div>

        <div class="k-card k-card--hover">
          <span class="k-card__eyebrow">Capability</span>
          <h3 class="k-card__title">AI &amp; data <em>engineering</em>.</h3>
          <p class="k-card__body">We build the plumbing behind your product&rsquo;s intelligence &mdash; data pipelines, model infra, safe deployments.</p>
          <div class="k-card__foot">
            <span>8 case studies</span>
            <span>Learn more <i data-lucide="arrow-right"></i></span>
          </div>
        </div>

        <div class="k-card k-card--hover">
          <span class="k-card__eyebrow">Industry</span>
          <h3 class="k-card__title">Health <em>tech</em>, shipped.</h3>
          <p class="k-card__body">HIPAA-ready patient platforms, clinical tools, and telehealth experiences built by a team that has been here before.</p>
          <div class="k-card__foot">
            <span>5 case studies</span>
            <span>Learn more <i data-lucide="arrow-right"></i></span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STAT & CASE -->
  <section class="section" id="cp-stat-case">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Stat &amp; case-study cards</h2>
        <p class="section-head__body">Two specialised cards. <b>Stat</b> for outcomes (one number, one line). <b>Case study</b> for the hero grid on the work page and partner decks.</p>
      </div>

      <div class="cp-grid-3">
        <div class="k-stat">
          <div class="k-stat__num">14×</div>
          <div class="k-stat__label">Faster time-to-production versus in-house benchmark.</div>
          <div class="k-stat__source">Source · internal audit 2025</div>
        </div>
        <div class="k-stat">
          <div class="k-stat__num">07</div>
          <div class="k-stat__label">Year partnership across four consecutive product lines.</div>
          <div class="k-stat__source">Since · 2018</div>
        </div>
        <div class="k-stat">
          <div class="k-stat__num">99.9<span style="font-size:2rem">%</span></div>
          <div class="k-stat__label">Uptime across customer-facing infrastructure.</div>
          <div class="k-stat__source">Trailing · 12 months</div>
        </div>
      </div>

      <div class="cp-grid-3" style="margin-top: 32px;">
        <article class="k-case">
          <div class="k-case__img" style="background-image: url(assets/photos/pair-working-warm.jpg);"></div>
          <div class="k-case__body">
            <div class="k-case__meta">
              <span class="k-badge k-badge--outline k-badge--no-dot">Health</span>
              <span class="k-badge k-badge--outline k-badge--no-dot">AI</span>
            </div>
            <h3 class="k-case__title">Rebuilding a clinical platform in <em>six months</em>.</h3>
            <a class="k-case__cta">Read the case <i data-lucide="arrow-right"></i></a>
          </div>
        </article>
        <article class="k-case">
          <div class="k-case__img" style="background-image: url(assets/photos/team-focused-laptop.jpg);"></div>
          <div class="k-case__body">
            <div class="k-case__meta">
              <span class="k-badge k-badge--outline k-badge--no-dot">Fintech</span>
              <span class="k-badge k-badge--outline k-badge--no-dot">Web</span>
            </div>
            <h3 class="k-case__title">Shipping <em>bravely</em> inside a regulated stack.</h3>
            <a class="k-case__cta">Read the case <i data-lucide="arrow-right"></i></a>
          </div>
        </article>
        <article class="k-case">
          <div class="k-case__img" style="background-image: url(assets/photos/team-standing-discussion.jpg);"></div>
          <div class="k-case__body">
            <div class="k-case__meta">
              <span class="k-badge k-badge--outline k-badge--no-dot">Energy</span>
              <span class="k-badge k-badge--outline k-badge--no-dot">IoT</span>
            </div>
            <h3 class="k-case__title">A grid-scale dashboard, read by <em>plant managers</em>.</h3>
            <a class="k-case__cta">Read the case <i data-lucide="arrow-right"></i></a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- TABS & BREADCRUMBS -->
  <section class="section" id="cp-tabs-bc">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Tabs &amp; breadcrumbs</h2>
        <p class="section-head__body">Two tab flavours. Pill tabs for switching views. Underline tabs for inline page sections.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Pill tabs</span><span>.k-tabs</span></div>
          <div class="cp-spec__stage">
            <div class="k-tabs">
              <button class="k-tab is-active">Overview</button>
              <button class="k-tab">Work</button>
              <button class="k-tab">People</button>
              <button class="k-tab">Notes</button>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Use —</b> View switching inside a component. Never more than 5.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Underline tabs</span><span>.k-tabs--underline</span></div>
          <div class="cp-spec__stage">
            <div class="k-tabs k-tabs--underline">
              <button class="k-tab is-active">All</button>
              <button class="k-tab">Health</button>
              <button class="k-tab">Fintech</button>
              <button class="k-tab">Energy</button>
              <button class="k-tab">Retail</button>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Use —</b> Filtering long lists. Accent underline on the active tab.</div>
        </div>

        <div class="cp-spec" style="grid-column: 1 / -1;">
          <div class="cp-spec__head"><span>Breadcrumb</span><span>.k-breadcrumb</span></div>
          <div class="cp-spec__stage">
            <nav class="k-breadcrumb">
              <a href="#components" data-cp-nav>Work</a>
              <span class="k-breadcrumb__sep">/</span>
              <a href="#components" data-cp-nav>Health</a>
              <span class="k-breadcrumb__sep">/</span>
              <span class="k-breadcrumb__current">Clinical platform rebuild</span>
            </nav>
          </div>
          <div class="cp-spec__foot"><b>Use —</b> Deep pages only (3+ levels). Separator is a soft slash.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- UI STATES -->
  <section class="section" id="cp-states">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">UI states</h2>
        <p class="section-head__body">The surfaces that show up when there&rsquo;s nothing to show. Every app sees empty, loading, error, and 404 &mdash; this is how they look on Kilowott.</p>
      </div>

      <div class="cp-grid-3">
        <!-- Empty state -->
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Empty state</span><span>.k-state</span></div>
          <div class="cp-spec__stage" style="min-height: 320px;">
            <div class="k-state" style="width: 100%;">
              <div class="k-state__icon">
                <i data-lucide="calendar"></i>
              </div>
              <h3 class="k-state__title">No invoices <em>yet</em>.</h3>
              <p class="k-state__body">You haven&rsquo;t raised one this quarter. When you do, it lands here &mdash; grouped by status and sortable by due.</p>
              <div class="k-state__actions">
                <button class="k-btn k-btn--primary k-btn--sm">Raise an invoice <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
                <button class="k-btn k-btn--ghost k-btn--sm">Import CSV</button>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> One italic accent word in the headline. One primary action. Never a sad-face illustration.</div>
        </div>

        <!-- Error state -->
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Error state</span><span>.k-state.k-state--error</span></div>
          <div class="cp-spec__stage" style="min-height: 320px;">
            <div class="k-state k-state--error" style="width: 100%;">
              <div class="k-state__icon">
                <i data-lucide="triangle-alert"></i>
              </div>
              <h3 class="k-state__title">We <em>couldn&rsquo;t</em> load the ledger.</h3>
              <p class="k-state__body">The finance API is returning a 503 &mdash; it&rsquo;s usually back within two minutes. <b>Reference · TRC-4812.</b></p>
              <div class="k-state__actions">
                <button class="k-btn k-btn--primary k-btn--sm">Try again</button>
                <button class="k-btn k-btn--ghost k-btn--sm">Open incident</button>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> Name the failure in plain English. Include a reference code so support has something to quote. Retry always first action.</div>
        </div>

        <!-- Loading / Skeleton -->
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Loading · skeleton</span><span>.k-skel</span></div>
          <div class="cp-spec__stage" style="min-height: 320px;">
            <div class="k-skel" style="width: 100%;">
              <div class="k-skel__line k-skel__line--short"></div>
              <div class="k-skel__line k-skel__line--title"></div>
              <div class="k-skel__line k-skel__line--full"></div>
              <div class="k-skel__line k-skel__line--full"></div>
              <div class="k-skel__line k-skel__line--med"></div>
              <div style="display:flex; gap:12px; margin-top:12px;">
                <div class="k-skel__line" style="height:32px; width:96px; border-radius:999px;"></div>
                <div class="k-skel__line" style="height:32px; width:72px; border-radius:999px;"></div>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> Skeleton matches the shape of what&rsquo;s loading. Pulses at 1.4s. Respects <code>prefers-reduced-motion</code>.</div>
        </div>

        <!-- Spinner -->
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Spinner · sizes</span><span>.k-spinner</span></div>
          <div class="cp-spec__stage" style="min-height: 200px; display:flex; align-items:center; justify-content:center; gap:36px;">
            <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
              <div class="k-spinner k-spinner--sm"></div>
              <span class="mono" style="font-size:10px; color:var(--fg-2); letter-spacing:.1em;">16</span>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
              <div class="k-spinner"></div>
              <span class="mono" style="font-size:10px; color:var(--fg-2); letter-spacing:.1em;">24</span>
            </div>
            <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
              <div class="k-spinner k-spinner--lg"></div>
              <span class="mono" style="font-size:10px; color:var(--fg-2); letter-spacing:.1em;">40</span>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> Border in rule color, top-arc in accent. Use sparingly &mdash; skeletons are the default loading pattern.</div>
        </div>

        <!-- Success toast -->
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Success · inline</span><span>.k-state</span></div>
          <div class="cp-spec__stage" style="min-height: 320px;">
            <div class="k-state" style="width: 100%;">
              <div class="k-state__icon" style="color: #1f8a3b; border-color: #1f8a3b; background: rgba(31,138,59,0.08);">
                <i data-lucide="circle-check"></i>
              </div>
              <h3 class="k-state__title">Engagement <em>live</em>.</h3>
              <p class="k-state__body">Kickoff confirmed with Priya. The team has Slack access and the first milestone lands Thursday.</p>
              <div class="k-state__actions">
                <button class="k-btn k-btn--primary k-btn--sm">Open kickoff deck</button>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Success &mdash;</b> The ONE place green is allowed in the brand &mdash; sparingly, on confirmation moments only. Never for decoration.</div>
        </div>

        <!-- 404 -->
        <div class="cp-spec">
          <div class="cp-spec__head"><span>404 · page not found</span><span>.k-404</span></div>
          <div class="cp-spec__stage" style="min-height: 320px; padding: 20px;">
            <div class="k-404" style="width: 100%;">
              <div class="k-404__num">4<em>0</em>4</div>
              <h3 class="k-404__title">That page isn&rsquo;t here.</h3>
              <p class="k-404__body">We might&rsquo;ve moved it, archived it, or it never existed. You&rsquo;re best off starting from the work page or talking to a human.</p>
              <div style="display:flex; justify-content:center; gap:10px;">
                <button class="k-btn k-btn--primary k-btn--sm">Back to work <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
                <button class="k-btn k-btn--ghost k-btn--sm">Talk to someone</button>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>404 &mdash;</b> Italic 0 is the accent moment. No sad-face, no clever-copy, no &ldquo;houston we have a problem.&rdquo; Plain and useful.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- MODAL -->
  <section class="section" id="cp-modal">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Modal / dialog</h2>
        <p class="section-head__body">Centered overlay with scrim, title, body, and actions. ESC closes. Backdrop click closes. One destructive variant.</p>
      </div>

      <div class="cp-grid-3">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Confirm</span><span>.k-modal</span></div>
          <div class="cp-spec__stage" style="min-height: 320px;">
            <div class="k-modal-demo">
              <button class="k-btn k-btn--secondary k-btn--sm" data-k-modal-open="confirm">Open modal</button>
              <div class="k-modal-scrim" data-k-modal-scrim="confirm">
                <div class="k-modal" role="dialog" aria-modal="true" aria-labelledby="km-c-t">
                  <div class="k-modal__head">
                    <h3 class="k-modal__title" id="km-c-t">Publish the <em>engagement</em>?</h3>
                    <button class="k-modal__close" aria-label="Close" data-k-modal-close="confirm">
                      <i data-lucide="x"></i>
                    </button>
                  </div>
                  <div class="k-modal__body">This will notify the client team and trigger the kickoff email. You can still edit details after publishing.</div>
                  <div class="k-modal__foot">
                    <button class="k-btn k-btn--ghost k-btn--sm" data-k-modal-close="confirm">Cancel</button>
                    <button class="k-btn k-btn--primary k-btn--sm" data-k-modal-close="confirm">Publish</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Use &mdash;</b> Reversible confirmations. Primary action on the right. ESC &amp; backdrop close.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Destructive confirm</span><span>.k-modal--destructive</span></div>
          <div class="cp-spec__stage" style="min-height: 320px;">
            <div class="k-modal-demo">
              <button class="k-btn k-btn--secondary k-btn--sm" data-k-modal-open="destructive">Open destructive</button>
              <div class="k-modal-scrim" data-k-modal-scrim="destructive">
                <div class="k-modal k-modal--destructive" role="alertdialog" aria-modal="true" aria-labelledby="km-d-t">
                  <div class="k-modal__head">
                    <h3 class="k-modal__title" id="km-d-t">Delete <em>this engagement</em>?</h3>
                    <button class="k-modal__close" aria-label="Close" data-k-modal-close="destructive">
                      <i data-lucide="x"></i>
                    </button>
                  </div>
                  <div class="k-modal__body">All timesheets, invoices and attachments tied to it will be permanently removed. <b>This cannot be undone.</b></div>
                  <div class="k-modal__foot">
                    <button class="k-btn k-btn--ghost k-btn--sm" data-k-modal-close="destructive">Cancel</button>
                    <button class="k-btn k-btn--accent k-btn--sm" data-k-modal-close="destructive">Delete forever</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> Accent (red) action. Name what is lost. Cancel is the default focus.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Info</span><span>role="dialog"</span></div>
          <div class="cp-spec__stage" style="min-height: 320px;">
            <div class="k-modal-demo">
              <button class="k-btn k-btn--secondary k-btn--sm" data-k-modal-open="info">Open info</button>
              <div class="k-modal-scrim" data-k-modal-scrim="info">
                <div class="k-modal" role="dialog" aria-modal="true" aria-labelledby="km-i-t">
                  <div class="k-modal__head">
                    <h3 class="k-modal__title" id="km-i-t">What changes <em>here</em>?</h3>
                    <button class="k-modal__close" aria-label="Close" data-k-modal-close="info">
                      <i data-lucide="x"></i>
                    </button>
                  </div>
                  <div class="k-modal__body">Engagements are the top-level container &mdash; every milestone, invoice and team roster hangs off one. Create one per client contract, not per project.</div>
                  <div class="k-modal__foot">
                    <button class="k-btn k-btn--primary k-btn--sm" data-k-modal-close="info">Got it</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Use &mdash;</b> Read-only explainers. One &ldquo;Got it&rdquo; primary. No secondary button.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- TOAST -->
  <section class="section" id="cp-toast">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Toast / notification</h2>
        <p class="section-head__body">Corner-anchored, non-blocking. Four variants. Auto-dismiss at 3s. Stacks bottom-up, max three visible.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Live demo</span><span>.k-toast</span></div>
          <div class="cp-spec__stage" style="min-height: 320px; padding: 20px;">
            <div class="k-toast-demo">
              <div style="display:flex; flex-wrap:wrap; gap:8px;">
                <button class="k-btn k-btn--secondary k-btn--sm" data-k-toast="info">Info</button>
                <button class="k-btn k-btn--secondary k-btn--sm" data-k-toast="success">Success</button>
                <button class="k-btn k-btn--secondary k-btn--sm" data-k-toast="warning">Warning</button>
                <button class="k-btn k-btn--secondary k-btn--sm" data-k-toast="danger">Danger</button>
              </div>
              <div class="k-toast-stack" data-k-toast-stack></div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Stack &mdash;</b> New toasts appear at the bottom and push older ones up. Max three visible; older ones drop.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Variants</span><span>info · success · warning · danger</span></div>
          <div class="cp-spec__stage cp-spec__stage--col" style="min-height: 320px;">
            <div class="k-toast k-toast--info">
              <i class="k-toast__icon" data-lucide="circle-alert"></i>
              <div class="k-toast__body"><b>Saved.</b> Draft synced to the workspace.</div>
              <button class="k-toast__close" aria-label="Close"><i data-lucide="x"></i></button>
            </div>
            <div class="k-toast k-toast--success">
              <i class="k-toast__icon" data-lucide="circle-check"></i>
              <div class="k-toast__body"><b>Published.</b> The client team has been notified.</div>
              <button class="k-toast__close" aria-label="Close"><i data-lucide="x"></i></button>
            </div>
            <div class="k-toast k-toast--warning">
              <i class="k-toast__icon" data-lucide="triangle-alert"></i>
              <div class="k-toast__body"><b>Heads up.</b> Two invoices are overdue by 7+ days.</div>
              <button class="k-toast__close" aria-label="Close"><i data-lucide="x"></i></button>
            </div>
            <div class="k-toast k-toast--danger">
              <i class="k-toast__icon" data-lucide="circle-x"></i>
              <div class="k-toast__body"><b>Failed to save.</b> Check connection and retry.</div>
              <button class="k-toast__close" aria-label="Close"><i data-lucide="x"></i></button>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> 3px coloured rail, single line body, close affordance. Bold the status, plain the detail.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- TOOLTIP -->
  <section class="section" id="cp-tooltip">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Tooltip</h2>
        <p class="section-head__body">Hover or focus to reveal. Four positions. Ink background, paper text, small arrow pointer.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Positions</span><span>.k-tip</span></div>
          <div class="cp-spec__stage" style="min-height: 280px; gap: 40px; justify-content: center;">
            <span class="k-tip-wrap" tabindex="0">
              <button class="k-btn k-btn--secondary k-btn--sm">Top</button>
              <span class="k-tip k-tip--top">Appears above</span>
            </span>
            <span class="k-tip-wrap" tabindex="0">
              <button class="k-btn k-btn--secondary k-btn--sm">Right</button>
              <span class="k-tip k-tip--right">Appears right</span>
            </span>
            <span class="k-tip-wrap" tabindex="0">
              <button class="k-btn k-btn--secondary k-btn--sm">Bottom</button>
              <span class="k-tip k-tip--bottom">Appears below</span>
            </span>
            <span class="k-tip-wrap" tabindex="0">
              <button class="k-btn k-btn--secondary k-btn--sm">Left</button>
              <span class="k-tip k-tip--left">Appears left</span>
            </span>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> Tooltips are labels, not docs. Keep to 4 words. Hover on desktop, tap-and-hold on touch, :focus on keyboard.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>On icons &amp; avatars</span><span>.k-tip-wrap</span></div>
          <div class="cp-spec__stage" style="min-height: 280px; gap: 28px; justify-content: center;">
            <span class="k-tip-wrap" tabindex="0">
              <button class="k-btn k-btn--ghost k-btn--sm" aria-label="Share" style="padding:8px;">
                <i data-lucide="share" style="width:16px;height:16px;"></i>
              </button>
              <span class="k-tip k-tip--top">Share</span>
            </span>
            <span class="k-tip-wrap" tabindex="0">
              <button class="k-btn k-btn--ghost k-btn--sm" aria-label="Duplicate" style="padding:8px;">
                <i data-lucide="copy" style="width:16px;height:16px;"></i>
              </button>
              <span class="k-tip k-tip--top">Duplicate</span>
            </span>
            <span class="k-tip-wrap" tabindex="0">
              <button class="k-btn k-btn--ghost k-btn--sm" aria-label="Archive" style="padding:8px;">
                <i data-lucide="archive" style="width:16px;height:16px;"></i>
              </button>
              <span class="k-tip k-tip--top">Archive</span>
            </span>
          </div>
          <div class="cp-spec__foot"><b>Use &mdash;</b> Label icon-only buttons. Always pair with an <code>aria-label</code> &mdash; tooltips aren&rsquo;t accessible names.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ACCORDION -->
  <section class="section" id="cp-accordion">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Accordion</h2>
        <p class="section-head__body">Collapsible panels for FAQ or dense documentation. Chevron rotates on open. Two modes &mdash; only-one-open and all-open.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Only one open</span><span>data-k-accordion="single"</span></div>
          <div class="cp-spec__stage cp-spec__stage--col" style="align-items: stretch;">
            <div class="k-accordion" data-k-accordion="single">
              <div class="k-accordion__item is-open">
                <button class="k-accordion__trigger" aria-expanded="true">
                  How does the discovery sprint work?
                  <i class="k-accordion__chev" data-lucide="chevron-down"></i>
                </button>
                <div class="k-accordion__panel">
                  <div class="k-accordion__body">Two weeks, fixed fee. We sit with your team, audit the codebase, write a <b>shape-of-work</b> doc, and leave you with a prioritised backlog whether you engage us further or not.</div>
                </div>
              </div>
              <div class="k-accordion__item">
                <button class="k-accordion__trigger" aria-expanded="false">
                  What stack do you default to?
                  <i class="k-accordion__chev" data-lucide="chevron-down"></i>
                </button>
                <div class="k-accordion__panel">
                  <div class="k-accordion__body">TypeScript end-to-end, Next.js on the front, Postgres + a thin API. We&rsquo;ll happily use your stack when that&rsquo;s the right call.</div>
                </div>
              </div>
              <div class="k-accordion__item">
                <button class="k-accordion__trigger" aria-expanded="false">
                  Do you work fixed-price or retainer?
                  <i class="k-accordion__chev" data-lucide="chevron-down"></i>
                </button>
                <div class="k-accordion__panel">
                  <div class="k-accordion__body">Either. Most long engagements are monthly retainer by named team. Fixed-price works best for scoped builds under twelve weeks.</div>
                </div>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Use &mdash;</b> FAQ pages. Opening one closes the others.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Many open</span><span>data-k-accordion="multi"</span></div>
          <div class="cp-spec__stage cp-spec__stage--col" style="align-items: stretch;">
            <div class="k-accordion" data-k-accordion="multi">
              <div class="k-accordion__item is-open">
                <button class="k-accordion__trigger" aria-expanded="true">
                  Team composition
                  <i class="k-accordion__chev" data-lucide="chevron-down"></i>
                </button>
                <div class="k-accordion__panel">
                  <div class="k-accordion__body">Tech lead, two engineers, a designer, a PM. Named humans from day one.</div>
                </div>
              </div>
              <div class="k-accordion__item is-open">
                <button class="k-accordion__trigger" aria-expanded="true">
                  Working hours &amp; overlap
                  <i class="k-accordion__chev" data-lucide="chevron-down"></i>
                </button>
                <div class="k-accordion__panel">
                  <div class="k-accordion__body">Minimum four-hour overlap with your timezone. Daily async standup plus a weekly 30-min video.</div>
                </div>
              </div>
              <div class="k-accordion__item">
                <button class="k-accordion__trigger" aria-expanded="false">
                  Handover &amp; documentation
                  <i class="k-accordion__chev" data-lucide="chevron-down"></i>
                </button>
                <div class="k-accordion__panel">
                  <div class="k-accordion__body">A live architecture doc, ADRs for every big decision, and a runbook. Your code stays yours.</div>
                </div>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Use &mdash;</b> Documentation where sections are independent. Keyboard: Tab + Enter/Space.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- DROPDOWN -->
  <section class="section" id="cp-dropdown">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Dropdown menu</h2>
        <p class="section-head__body">Trigger button + popup list. Checkmark marks the active option. Divider groups items. One destructive action in accent red.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Row action menu</span><span>.k-dropdown</span></div>
          <div class="cp-spec__stage" style="min-height: 260px; padding: 32px; align-items: flex-start;">
            <div class="k-dropdown" data-k-dropdown>
              <button class="k-dropdown__trigger" data-k-dropdown-trigger>
                Actions
                <i class="k-dropdown__trigger-chev" data-lucide="chevron-down"></i>
              </button>
              <div class="k-dropdown__menu" role="menu">
                <a class="k-dropdown__item" href="#" data-cp-nav role="menuitem">Open engagement</a>
                <a class="k-dropdown__item k-dropdown__item--active" href="#" data-cp-nav role="menuitem">Edit details</a>
                <a class="k-dropdown__item" href="#" data-cp-nav role="menuitem">Duplicate</a>
                <div class="k-dropdown__divider"></div>
                <a class="k-dropdown__item" href="#" data-cp-nav role="menuitem">Archive</a>
                <a class="k-dropdown__item k-dropdown__item--danger" href="#" data-cp-nav role="menuitem">Delete forever</a>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> Click outside closes. One destructive item, always last, separated by a divider.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Select-like menu</span><span>.k-dropdown__item--active</span></div>
          <div class="cp-spec__stage" style="min-height: 260px; padding: 32px; align-items: flex-start;">
            <div class="k-dropdown" data-k-dropdown>
              <button class="k-dropdown__trigger" data-k-dropdown-trigger>
                Industry: Health
                <i class="k-dropdown__trigger-chev" data-lucide="chevron-down"></i>
              </button>
              <div class="k-dropdown__menu" role="menu">
                <a class="k-dropdown__item" href="#" data-cp-nav role="menuitem">All industries</a>
                <div class="k-dropdown__divider"></div>
                <a class="k-dropdown__item k-dropdown__item--active" href="#" data-cp-nav role="menuitem">Health</a>
                <a class="k-dropdown__item" href="#" data-cp-nav role="menuitem">Fintech</a>
                <a class="k-dropdown__item" href="#" data-cp-nav role="menuitem">Energy</a>
                <a class="k-dropdown__item" href="#" data-cp-nav role="menuitem">Retail</a>
              </div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Use &mdash;</b> Single-select filters. Checkmark on the active item. Divider between &ldquo;all&rdquo; and specifics.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- AVATAR -->
  <section class="section" id="cp-avatar">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Avatar</h2>
        <p class="section-head__body">Three variants &mdash; initials, photo, placeholder. Three sizes &mdash; sm / md / lg. Stacked groups show <b>+N</b> overflow.</p>
      </div>

      <div class="cp-grid-3">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Variants</span><span>.k-avatar</span></div>
          <div class="cp-spec__stage" style="gap: 18px;">
            <span class="k-avatar" aria-label="Priya Nair">PN</span>
            <span class="k-avatar k-avatar--photo" style="background-image:url(assets/photos/pair-working-warm.jpg)" aria-label="Team photo"></span>
            <span class="k-avatar k-avatar--placeholder" aria-label="No avatar">
              <i data-lucide="user" style="width:18px;height:18px;"></i>
            </span>
          </div>
          <div class="cp-spec__foot"><b>Initials &mdash;</b> Two letters, from given + family. <b>Photo &mdash;</b> square crop to circle. <b>Placeholder &mdash;</b> for unknowns.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Sizes</span><span>sm · md · lg</span></div>
          <div class="cp-spec__stage" style="gap: 18px;">
            <span class="k-avatar k-avatar--sm">PN</span>
            <span class="k-avatar">PN</span>
            <span class="k-avatar k-avatar--lg">PN</span>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> 28 / 40 / 56 px. Medium is default. Small for inline. Large for profile cards.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Group (+N)</span><span>.k-avatar-group</span></div>
          <div class="cp-spec__stage" style="gap: 24px;">
            <div class="k-avatar-group" data-k-avatar-group>
              <span class="k-avatar-wrap">
                <span class="k-avatar" data-name="Priya Nair">PN</span>
                <span class="k-tip k-tip--top">Priya Nair</span>
              </span>
              <span class="k-avatar-wrap">
                <span class="k-avatar" data-name="Ravi Kumar">RK</span>
                <span class="k-tip k-tip--top">Ravi Kumar</span>
              </span>
              <span class="k-avatar-wrap">
                <span class="k-avatar" data-name="Meera Shah">MS</span>
                <span class="k-tip k-tip--top">Meera Shah</span>
              </span>
              <span class="k-avatar-wrap">
                <span class="k-avatar k-avatar--more" data-name="+4 more">+4</span>
                <span class="k-tip k-tip--top">4 more</span>
              </span>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Stack &mdash;</b> Show three + a dark <b>+N</b> chip. Hover or focus any avatar to reveal the name.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ALERT -->
  <section class="section" id="cp-alert">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Alert banner</h2>
        <p class="section-head__body">Top-of-page strip that sets context for the view below. Three variants. Dismissible with an optional action link.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec" style="grid-column: 1 / -1;">
          <div class="cp-spec__head"><span>Info · with action</span><span>.k-alert--info</span></div>
          <div class="cp-spec__stage cp-spec__stage--col" style="align-items: stretch; gap: 14px;">
            <div class="k-alert k-alert--info" data-k-alert>
              <i class="k-alert__icon" data-lucide="circle-alert"></i>
              <div class="k-alert__body"><b>Read-only view.</b> You&rsquo;re looking at this engagement as a client observer.</div>
              <a class="k-alert__action" href="#" data-cp-nav>Request edit access</a>
              <button class="k-alert__close" aria-label="Dismiss" data-k-alert-close><i data-lucide="x"></i></button>
            </div>
            <div class="k-alert k-alert--warning" data-k-alert>
              <i class="k-alert__icon" data-lucide="triangle-alert"></i>
              <div class="k-alert__body"><b>Two invoices overdue.</b> Client payment is past due by more than seven days.</div>
              <a class="k-alert__action" href="#" data-cp-nav>Open invoices</a>
              <button class="k-alert__close" aria-label="Dismiss" data-k-alert-close><i data-lucide="x"></i></button>
            </div>
            <div class="k-alert k-alert--danger" data-k-alert>
              <i class="k-alert__icon" data-lucide="circle-x"></i>
              <div class="k-alert__body"><b>Sync failed.</b> We haven&rsquo;t reached the finance API since 09:14 &mdash; data may be stale.</div>
              <a class="k-alert__action" href="#" data-cp-nav>Retry now</a>
              <button class="k-alert__close" aria-label="Dismiss" data-k-alert-close><i data-lucide="x"></i></button>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> One banner visible at a time. Always state the <b>consequence</b>, not the cause. Action link right-aligned before close.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- PAGINATION -->
  <section class="section" id="cp-pagination">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Pagination</h2>
        <p class="section-head__body">Previous / next plus up-to-five numbered pages. Ellipsis when there are more than seven pages. Tabular nums on all counters.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec">
          <div class="cp-spec__head"><span>Short (&le; 7 pages)</span><span>.k-pagination</span></div>
          <div class="cp-spec__stage">
            <nav class="k-pagination" aria-label="Results">
              <a class="k-page is-disabled" href="#" data-cp-nav>&lsaquo; Prev</a>
              <a class="k-page is-active" href="#" data-cp-nav>1</a>
              <a class="k-page" href="#" data-cp-nav>2</a>
              <a class="k-page" href="#" data-cp-nav>3</a>
              <a class="k-page" href="#" data-cp-nav>4</a>
              <a class="k-page" href="#" data-cp-nav>5</a>
              <a class="k-page" href="#" data-cp-nav>Next &rsaquo;</a>
            </nav>
          </div>
          <div class="cp-spec__foot"><b>Use &mdash;</b> Lists under 7 pages. Show every page. Previous is disabled on page 1.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Long (with ellipsis)</span><span>.k-page__ell</span></div>
          <div class="cp-spec__stage">
            <nav class="k-pagination" aria-label="Results">
              <a class="k-page" href="#" data-cp-nav>&lsaquo; Prev</a>
              <a class="k-page" href="#" data-cp-nav>1</a>
              <span class="k-page__ell">…</span>
              <a class="k-page" href="#" data-cp-nav>6</a>
              <a class="k-page is-active" href="#" data-cp-nav>7</a>
              <a class="k-page" href="#" data-cp-nav>8</a>
              <span class="k-page__ell">…</span>
              <a class="k-page" href="#" data-cp-nav>24</a>
              <a class="k-page" href="#" data-cp-nav>Next &rsaquo;</a>
            </nav>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> Always show first, last, and three around current. Ellipsis is a span, not a button.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTENT TABLE -->
  <section class="section" id="cp-table">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Content table</h2>
        <p class="section-head__body">Generic long-form table for docs, pricing, specs. Sortable columns, row hover, optional striped rows and sticky header.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec" style="grid-column: 1 / -1;">
          <div class="cp-spec__head"><span>Standard · sortable</span><span>.k-table</span></div>
          <div class="cp-spec__stage cp-spec__stage--col" style="align-items: stretch;">
            <div class="k-table-wrap">
              <table class="k-table">
                <thead>
                  <tr>
                    <th class="is-sortable is-sorted-asc">Engagement</th>
                    <th class="is-sortable">Industry</th>
                    <th class="is-sortable">Team</th>
                    <th class="is-sortable num">Weeks</th>
                    <th class="is-sortable num">MRR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Clinical platform rebuild</td><td>Health</td><td>5</td><td class="num">18</td><td class="num">$ 42,000</td></tr>
                  <tr><td>Grid-scale dashboard</td><td>Energy</td><td>4</td><td class="num">12</td><td class="num">$ 36,000</td></tr>
                  <tr><td>Regulated payments stack</td><td>Fintech</td><td>6</td><td class="num">24</td><td class="num">$ 54,000</td></tr>
                  <tr><td>Retail ops overhaul</td><td>Retail</td><td>3</td><td class="num">08</td><td class="num">$ 21,000</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> Monospace uppercase header. Numeric columns right-aligned with tabular-nums. Hover reveals row affordance.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Striped</span><span>.k-table--striped</span></div>
          <div class="cp-spec__stage cp-spec__stage--col" style="align-items: stretch;">
            <div class="k-table-wrap">
              <table class="k-table k-table--striped">
                <thead>
                  <tr><th>Plan</th><th class="num">Seats</th><th class="num">Price</th></tr>
                </thead>
                <tbody>
                  <tr><td>Starter</td><td class="num">5</td><td class="num">$ 0</td></tr>
                  <tr><td>Team</td><td class="num">25</td><td class="num">$ 240</td></tr>
                  <tr><td>Business</td><td class="num">100</td><td class="num">$ 960</td></tr>
                  <tr><td>Enterprise</td><td class="num">∞</td><td class="num">Contact</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Use &mdash;</b> Wide specs where zebra-striping aids row-scanning.</div>
        </div>

        <div class="cp-spec">
          <div class="cp-spec__head"><span>Sticky header</span><span>.k-table-wrap--sticky</span></div>
          <div class="cp-spec__stage cp-spec__stage--col" style="align-items: stretch;">
            <div class="k-table-wrap k-table-wrap--sticky">
              <table class="k-table">
                <thead>
                  <tr><th>Milestone</th><th>Owner</th><th class="num">Due</th></tr>
                </thead>
                <tbody>
                  <tr><td>Discovery readout</td><td>Priya</td><td class="num">Wk 02</td></tr>
                  <tr><td>Architecture decision</td><td>Ravi</td><td class="num">Wk 03</td></tr>
                  <tr><td>First build</td><td>Meera</td><td class="num">Wk 05</td></tr>
                  <tr><td>Design review</td><td>Lena</td><td class="num">Wk 06</td></tr>
                  <tr><td>Beta in staging</td><td>Ravi</td><td class="num">Wk 09</td></tr>
                  <tr><td>Client UAT</td><td>Priya</td><td class="num">Wk 11</td></tr>
                  <tr><td>Production go-live</td><td>Team</td><td class="num">Wk 12</td></tr>
                  <tr><td>Retrospective</td><td>Meera</td><td class="num">Wk 13</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Use &mdash;</b> Long tables in a constrained container. Header stays on top while the body scrolls.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- TOP NAV -->
  <section class="section" id="cp-nav">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Top-nav (marketing)</h2>
        <p class="section-head__body">Full-width marketing navigation. Logo left, five links center, one primary CTA right. Two scroll states &mdash; transparent over hero, solid when scrolled.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec" style="grid-column: 1 / -1;">
          <div class="cp-spec__head"><span>Default &amp; scrolled</span><span>.k-nav</span></div>
          <div class="cp-spec__stage cp-spec__stage--col" style="align-items: stretch; gap: 18px;">
            <div style="border: 1px dashed var(--rule); border-radius: var(--r-2); overflow: hidden;">
              <nav class="k-nav">
                <a class="k-nav__logo" href="#" data-cp-nav>Kilo<em>wott</em></a>
                <ul class="k-nav__links">
                  <li><a href="#" data-cp-nav>Work</a></li>
                  <li><a href="#" data-cp-nav>Services</a></li>
                  <li><a href="#" data-cp-nav>Industries</a></li>
                  <li><a href="#" data-cp-nav>About</a></li>
                  <li><a href="#" data-cp-nav>Journal</a></li>
                </ul>
                <div class="k-nav__right">
                  <button class="k-btn k-btn--accent k-btn--sm">Get in touch <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
                </div>
              </nav>
            </div>

            <div style="border: 1px dashed var(--rule); border-radius: var(--r-2); overflow: hidden; background: var(--k-ink); padding-bottom: 60px;">
              <nav class="k-nav k-nav--transparent" style="color:#fff;">
                <a class="k-nav__logo" href="#" data-cp-nav style="color:#fff;">Kilo<em>wott</em></a>
                <ul class="k-nav__links">
                  <li><a href="#" data-cp-nav style="color:#fff;">Work</a></li>
                  <li><a href="#" data-cp-nav style="color:#fff;">Services</a></li>
                  <li><a href="#" data-cp-nav style="color:#fff;">Industries</a></li>
                  <li><a href="#" data-cp-nav style="color:#fff;">About</a></li>
                  <li><a href="#" data-cp-nav style="color:#fff;">Journal</a></li>
                </ul>
                <div class="k-nav__right">
                  <button class="k-btn k-btn--secondary k-btn--sm" style="color:#fff; border-color:#fff;">Get in touch</button>
                </div>
              </nav>
              <div style="padding: 18px 22px; color: #fff; font-family: var(--font-display); font-size: 28px; letter-spacing:-0.01em;">Hero headline sits beneath.</div>
            </div>

            <div style="border: 1px dashed var(--rule); border-radius: var(--r-2); overflow: hidden;">
              <nav class="k-nav k-nav--scrolled">
                <a class="k-nav__logo" href="#" data-cp-nav>Kilo<em>wott</em></a>
                <ul class="k-nav__links">
                  <li><a href="#" data-cp-nav>Work</a></li>
                  <li><a href="#" data-cp-nav>Services</a></li>
                  <li><a href="#" data-cp-nav>Industries</a></li>
                  <li><a href="#" data-cp-nav>About</a></li>
                  <li><a href="#" data-cp-nav>Journal</a></li>
                </ul>
                <div class="k-nav__right">
                  <button class="k-btn k-btn--accent k-btn--sm">Get in touch <span class="k-btn__arrow"><i data-lucide="arrow-right"></i></span></button>
                </div>
              </nav>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Rule &mdash;</b> Five primary links max. One CTA. Transparent on hero, solid (with soft shadow) once scrolled past 80&thinsp;px.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <section class="section" id="cp-footer">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Footer</h2>
        <p class="section-head__body">Three columns: brand + tag + socials, sitemap, legal and address. Rule dividers above and below the main grid.</p>
      </div>

      <div class="cp-spec" style="grid-column: 1 / -1;">
        <div class="cp-spec__head"><span>Marketing footer</span><span>.k-footer</span></div>
        <div class="cp-spec__stage" style="padding: 0; min-height: 0;">
          <footer class="k-footer">
            <div class="k-footer__grid">
              <div>
                <h3 class="k-footer__brand">Kilo<em>wott</em></h3>
                <p class="k-footer__tag">An engineering studio for ambitious software. Built in Goa, shipping worldwide since 2014.</p>
                <div class="k-footer__social">
                  <a href="#" data-cp-nav aria-label="LinkedIn">in</a>
                  <a href="#" data-cp-nav aria-label="X">X</a>
                  <a href="#" data-cp-nav aria-label="GitHub">gh</a>
                  <a href="#" data-cp-nav aria-label="Dribbble">db</a>
                </div>
              </div>
              <div class="k-footer__col">
                <h4>Sitemap</h4>
                <ul>
                  <li><a href="#" data-cp-nav>Work</a></li>
                  <li><a href="#" data-cp-nav>Services</a></li>
                  <li><a href="#" data-cp-nav>Industries</a></li>
                  <li><a href="#" data-cp-nav>About</a></li>
                  <li><a href="#" data-cp-nav>Journal</a></li>
                  <li><a href="#" data-cp-nav>Careers</a></li>
                </ul>
              </div>
              <div class="k-footer__col">
                <h4>Find us</h4>
                <ul>
                  <li>2F, Cidade de Goa House<br/>Panjim · Goa · India</li>
                  <li><a href="#" data-cp-nav>hello@kilowott.com</a></li>
                  <li><a href="#" data-cp-nav>Privacy</a></li>
                  <li><a href="#" data-cp-nav>Terms</a></li>
                </ul>
              </div>
            </div>
            <div class="k-footer__legal">
              <span>© 2025 Kilowott Technologies Pvt. Ltd.</span>
              <span>Built on quarterly releases.</span>
            </div>
          </footer>
        </div>
        <div class="cp-spec__foot"><b>Rule &mdash;</b> Three columns desktop, one on mobile. Rule divider between grid and legal strip. Legal strip uses mono caps-esque, tabular, muted.</div>
      </div>
    </div>
  </section>

  <!-- SEARCH -->
  <section class="section" id="cp-search">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Search input + results</h2>
        <p class="section-head__body">Pill input with leading icon. Typing opens a live-results dropdown with category headers. Empty state is plain prose.</p>
      </div>

      <div class="cp-grid-2">
        <div class="cp-spec" style="grid-column: 1 / -1;">
          <div class="cp-spec__head"><span>Live results</span><span>.k-search</span></div>
          <div class="cp-spec__stage" style="min-height: 340px; align-items: flex-start; padding: 28px;">
            <div class="k-search" data-k-search>
              <div class="k-search__input-wrap">
                <i class="k-search__icon" data-lucide="search"></i>
                <input class="k-search__input" type="search" placeholder="Search engagements, people, notes…" data-k-search-input>
              </div>
              <div class="k-search__results" data-k-search-results></div>
            </div>
          </div>
          <div class="cp-spec__foot"><b>Try &mdash;</b> Type <b>&ldquo;health&rdquo;</b>, <b>&ldquo;priya&rdquo;</b>, or <b>&ldquo;grid&rdquo;</b>. Clear the field to close. Unknown query shows an empty state.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- PRINCIPLES / RULES -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Rules of the parts bin</h2>
        <p class="section-head__body">Four house rules that apply to every component &mdash; old and new.</p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; Never introduce a new component before checking this page.</span><span class="token-row__meta">House rule</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; One Accent button per view. One Accent moment per page.</span><span class="token-row__meta">House rule</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Every component must work in light &amp; dark, compact &amp; spacious.</span><span class="token-row__meta">House rule</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; Focus outlines are non-negotiable. 2px accent ring, 3px offset.</span><span class="token-row__meta">House rule</span></li>
      </ul>
    </div>
  </section>
  `;

  // Smooth in-page jumps without tripping the hash router
  root.querySelectorAll('[data-cp-jump]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('data-cp-jump');
      const target = document.getElementById(id);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.pageYOffset - 24;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Breadcrumb demo links — prevent hash route-reset to overview
  root.querySelectorAll('[data-cp-nav]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
  });

  // ---------- MODAL ----------
  const openScrim = (scrim) => { if (scrim) scrim.classList.add('is-open'); };
  const closeScrim = (scrim) => { if (scrim) scrim.classList.remove('is-open'); };

  root.querySelectorAll('[data-k-modal-open]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-k-modal-open');
      const scrim = root.querySelector('[data-k-modal-scrim="' + key + '"]');
      openScrim(scrim);
    });
  });
  root.querySelectorAll('[data-k-modal-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-k-modal-close');
      const scrim = root.querySelector('[data-k-modal-scrim="' + key + '"]');
      closeScrim(scrim);
    });
  });
  root.querySelectorAll('[data-k-modal-scrim]').forEach(scrim => {
    scrim.addEventListener('click', (e) => {
      if (e.target === scrim) closeScrim(scrim);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      root.querySelectorAll('.k-modal-scrim.is-open').forEach(closeScrim);
    }
  });

  // ---------- TOAST ----------
  const toastCopy = {
    info:    { b: 'Saved.',       rest: ' Draft synced to the workspace.' },
    success: { b: 'Published.',   rest: ' Client team has been notified.' },
    warning: { b: 'Heads up.',    rest: ' Two invoices are overdue.' },
    danger:  { b: 'Failed.',      rest: ' Check your connection and retry.' },
  };
  const toastIcons = {
    info:    '<i class="k-toast__icon" data-lucide="circle-alert"></i>',
    success: '<i class="k-toast__icon" data-lucide="circle-check"></i>',
    warning: '<i class="k-toast__icon" data-lucide="triangle-alert"></i>',
    danger:  '<i class="k-toast__icon" data-lucide="circle-x"></i>',
  };
  const toastStack = root.querySelector('[data-k-toast-stack]');
  const dismissToast = (el) => {
    if (!el) return;
    el.classList.add('is-leaving');
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 220);
  };
  root.querySelectorAll('[data-k-toast]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!toastStack) return;
      const kind = btn.getAttribute('data-k-toast');
      const meta = toastCopy[kind] || toastCopy.info;
      const el = document.createElement('div');
      el.className = 'k-toast k-toast--' + kind;
      el.innerHTML = toastIcons[kind] + '<div class="k-toast__body"><b>' + meta.b + '</b>' + meta.rest + '</div><button class="k-toast__close" aria-label="Close"><i data-lucide="x"></i></button>';
      toastStack.appendChild(el);
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        try { window.lucide.createIcons({ root: el }); } catch (e) {}
      }
      while (toastStack.children.length > 3) {
        dismissToast(toastStack.firstElementChild);
      }
      const closeBtn = el.querySelector('.k-toast__close');
      if (closeBtn) closeBtn.addEventListener('click', () => dismissToast(el));
      setTimeout(() => dismissToast(el), 3000);
    });
  });
  // Static demo toasts: close buttons
  root.querySelectorAll('.cp-spec__stage .k-toast .k-toast__close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const t = btn.closest('.k-toast');
      if (t && !t.closest('[data-k-toast-stack]')) {
        t.style.opacity = '0.3';
      }
    });
  });

  // ---------- ACCORDION ----------
  root.querySelectorAll('[data-k-accordion]').forEach(acc => {
    const mode = acc.getAttribute('data-k-accordion');
    acc.querySelectorAll('.k-accordion__trigger').forEach(trig => {
      trig.addEventListener('click', (e) => {
        e.preventDefault();
        const item = trig.closest('.k-accordion__item');
        if (!item) return;
        const wasOpen = item.classList.contains('is-open');
        if (mode === 'single') {
          acc.querySelectorAll('.k-accordion__item').forEach(i => {
            i.classList.remove('is-open');
            const t = i.querySelector('.k-accordion__trigger');
            if (t) t.setAttribute('aria-expanded', 'false');
          });
        }
        if (!wasOpen) {
          item.classList.add('is-open');
          trig.setAttribute('aria-expanded', 'true');
        } else if (mode !== 'single') {
          item.classList.remove('is-open');
          trig.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  // ---------- DROPDOWN ----------
  const closeAllDropdowns = () => {
    root.querySelectorAll('[data-k-dropdown].is-open').forEach(d => d.classList.remove('is-open'));
  };
  root.querySelectorAll('[data-k-dropdown]').forEach(dd => {
    const trigger = dd.querySelector('[data-k-dropdown-trigger]');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const wasOpen = dd.classList.contains('is-open');
      closeAllDropdowns();
      if (!wasOpen) dd.classList.add('is-open');
    });
    dd.querySelectorAll('.k-dropdown__item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        dd.classList.remove('is-open');
      });
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-k-dropdown]')) closeAllDropdowns();
  });

  // ---------- ALERT dismiss ----------
  root.querySelectorAll('[data-k-alert-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const a = btn.closest('[data-k-alert]');
      if (!a) return;
      a.style.transition = 'opacity .18s ease';
      a.style.opacity = '0';
      setTimeout(() => {
        a.style.display = 'none';
        a.style.opacity = '';
      }, 200);
    });
  });

  // ---------- SEARCH ----------
  const searchData = [
    { cat: 'Engagement', items: [
      { title: 'Clinical platform rebuild', meta: 'Health · 18wk' },
      { title: 'Grid-scale dashboard', meta: 'Energy · 12wk' },
      { title: 'Regulated payments stack', meta: 'Fintech · 24wk' },
      { title: 'Retail ops overhaul', meta: 'Retail · 08wk' },
    ]},
    { cat: 'People', items: [
      { title: 'Priya Nair', meta: 'Product · Panjim' },
      { title: 'Ravi Kumar', meta: 'Engineering · Panjim' },
      { title: 'Meera Shah', meta: 'Design · Mumbai' },
      { title: 'Lena Fernandes', meta: 'PM · Panjim' },
    ]},
    { cat: 'Notes', items: [
      { title: 'Grid dashboard architecture ADR', meta: 'Mar · 2025' },
      { title: 'Health platform — kickoff notes', meta: 'Feb · 2025' },
      { title: 'Weekly retro template', meta: 'Template' },
    ]},
  ];
  root.querySelectorAll('[data-k-search]').forEach(sw => {
    const input = sw.querySelector('[data-k-search-input]');
    const results = sw.querySelector('[data-k-search-results]');
    if (!input || !results) return;
    const render = (q) => {
      const ql = q.trim().toLowerCase();
      if (!ql) { sw.classList.remove('is-open'); results.innerHTML = ''; return; }
      sw.classList.add('is-open');
      let html = '';
      let any = false;
      searchData.forEach(group => {
        const matches = group.items.filter(i => i.title.toLowerCase().includes(ql) || i.meta.toLowerCase().includes(ql));
        if (matches.length) {
          any = true;
          html += '<div class="k-search__cat">' + group.cat + '</div>';
          matches.forEach(m => {
            html += '<a class="k-search__item" href="#">' + m.title + '<small>' + m.meta + '</small></a>';
          });
        }
      });
      if (!any) {
        html = '<div class="k-search__empty">No results for &ldquo;<b>' + q.replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c])) + '</b>&rdquo;. Try a shorter query.</div>';
      }
      results.innerHTML = html;
      results.querySelectorAll('a.k-search__item').forEach(a => a.addEventListener('click', e => e.preventDefault()));
    };
    input.addEventListener('input', () => render(input.value));
    input.addEventListener('focus', () => { if (input.value.trim()) sw.classList.add('is-open'); });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-k-search]')) sw.classList.remove('is-open');
    });
  });
};
