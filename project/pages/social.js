/* ============================================================
   SOCIAL — realistic platform simulations
   LinkedIn · X · Facebook · Instagram (feed/reel/carousel/story)
   Each mock renders inside accurate platform chrome so you can see
   exactly how a Kilowott post will look in the wild. Content uses
   real Kilowott facts (Paul John Caffeine 3.5×, real offices, real
   tagline) and brand photos from /assets/photos/.
   ============================================================ */

window.renderSocial = function (root) {
  // System font stacks per platform, for accurate chrome
  const FONT_LI = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
  const FONT_X  = `"TwitterChirp", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  const FONT_FB = `"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
  const FONT_IG = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

  // Reusable photo paths — all real, in /assets/photos/
  const PHOTO = {
    teamLaugh:    'assets/photos/team-laughing-meeting.jpg',
    teamFocused:  'assets/photos/team-focused-laptop.jpg',
    teamWorkshop: 'assets/photos/team-seated-workshop.jpg',
    teamGroup:    'assets/photos/team-portrait-group.jpg',
    teamStanding: 'assets/photos/team-standing-discussion.jpg',
    pairWarm:     'assets/photos/pair-working-warm.jpg',
    leader:       'assets/photos/portrait-leader-window.jpg',
    portraitTab:  'assets/photos/portrait-woman-tablet.jpg',
    portraitPhone:'assets/photos/portrait-woman-phone.jpg',
    nordic:       'assets/photos/landscape-nordic.jpg',
    loungeWarm:   'assets/photos/lounge-coworking-warm.jpg',
    loungeDisc:   'assets/photos/lounge-discussion.jpg',
    atmoWarm:     'assets/photos/textural-atmosphere-warm.jpg',
    atmoCool:     'assets/photos/textural-atmosphere-cool.jpg',
  };

  // Avatar = Kilowott "K" mark on red — built inline
  const AVATAR = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;"><rect width="64" height="64" fill="#E4022D"/><text x="32" y="42" text-anchor="middle" font-family="Newsreader, Georgia, serif" font-size="34" font-style="italic" font-weight="500" fill="#fff">K</text></svg>`;

  root.innerHTML = `
  <style>
    /* ---- HERO ---- */
    .so-hero { padding: var(--s-9) 0 var(--s-7); border-bottom: 1px solid var(--rule); }
    .so-hero h1 {
      font-family: var(--font-display); font-weight: 400;
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .so-hero h1 em { font-style: italic; color: var(--accent); }
    .so-hero__lede { margin-top: 22px; max-width: 62ch; color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6; }

    /* ---- PLATFORM SECTION HEAD ---- */
    .so-plat {
      display: flex; align-items: baseline; gap: 16px;
      margin-bottom: var(--s-6);
    }
    .so-plat__icon {
      width: 36px; height: 36px; border-radius: 8px;
      display: inline-flex; align-items: center; justify-content: center;
      color: #fff;
      flex-shrink: 0;
    }
    .so-plat__icon svg { width: 20px; height: 20px; }
    .so-plat__h {
      font-family: var(--font-display);
      font-size: var(--fs-d3); line-height: 1.1; letter-spacing: -0.02em;
    }
    .so-plat__sub {
      margin-left: auto;
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-2);
    }

    /* ---- MOCK GRID ---- */
    .so-grid {
      display: grid; gap: var(--s-5);
      grid-template-columns: repeat(2, 1fr);
    }
    .so-grid--3 { grid-template-columns: repeat(3, 1fr); }
    .so-grid--4 { grid-template-columns: repeat(4, 1fr); }
    @media (max-width: 1100px) { .so-grid--4, .so-grid--3 { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 720px)  { .so-grid, .so-grid--3, .so-grid--4 { grid-template-columns: 1fr; } }

    .so-card {
      border: 1px solid var(--rule); border-radius: var(--r-3);
      overflow: hidden; background: var(--bg-2);
    }
    .so-card__stage {
      padding: 32px 28px;
      display: flex; align-items: flex-start; justify-content: center;
      min-height: 200px;
    }
    .so-card__cap {
      padding: 14px 20px;
      border-top: 1px solid var(--rule);
      font-size: 13px; color: var(--fg-2); line-height: 1.5;
      background: var(--bg);
    }
    .so-card__cap b { color: var(--fg); font-weight: 500; }

    /* ============================================================
       LINKEDIN — accurate post chrome
       ============================================================ */
    .li-post {
      width: 100%; max-width: 552px;
      background: #FFFFFF; color: rgba(0,0,0,0.9);
      border: 1px solid rgba(0,0,0,0.08);
      border-radius: 8px;
      font-family: ${FONT_LI};
      font-size: 14px; line-height: 1.5;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
    }
    .li-post__head { display: flex; align-items: flex-start; gap: 8px; padding: 12px 16px 0; }
    .li-post__avatar { width: 48px; height: 48px; border-radius: 50%; overflow: hidden; flex-shrink: 0; background: #E4022D; }
    .li-post__author { flex: 1; min-width: 0; }
    .li-post__name {
      font-weight: 600; color: rgba(0,0,0,0.9); font-size: 14px;
      display: flex; align-items: center; gap: 4px;
    }
    .li-post__name::after {
      content: "✓"; display: inline-flex; align-items: center; justify-content: center;
      width: 14px; height: 14px; background: #0A66C2; color: #fff;
      border-radius: 50%; font-size: 9px; font-weight: 700;
    }
    .li-post__follow {
      color: rgba(0,0,0,0.6); font-size: 12px; margin-top: 1px;
      max-width: 380px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .li-post__meta { color: rgba(0,0,0,0.6); font-size: 12px; margin-top: 2px; display: flex; align-items: center; gap: 4px; }
    .li-post__meta svg { width: 12px; height: 12px; }
    .li-post__more { padding: 6px; border-radius: 50%; color: rgba(0,0,0,0.6); cursor: default; }
    .li-post__body { padding: 12px 16px 4px; color: rgba(0,0,0,0.9); white-space: pre-line; word-wrap: break-word; }
    .li-post__body b { font-weight: 600; }
    .li-post__more-link { color: rgba(0,0,0,0.6); font-weight: 600; cursor: default; }
    .li-post__media { width: 100%; display: block; }
    .li-post__media img { width: 100%; display: block; }
    .li-post__counts {
      display: flex; align-items: center; gap: 4px;
      padding: 8px 16px; font-size: 12px; color: rgba(0,0,0,0.6);
      border-bottom: 1px solid rgba(0,0,0,0.08);
    }
    .li-post__reacts { display: inline-flex; }
    .li-post__react {
      width: 16px; height: 16px; border-radius: 50%;
      border: 1.5px solid #fff; margin-left: -3px;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 9px; color: #fff;
    }
    .li-post__react:first-child { margin-left: 0; }
    .li-post__react--like { background: #0A66C2; }
    .li-post__react--celeb { background: #6DAE4F; }
    .li-post__react--love { background: #DF704D; }
    .li-post__bar {
      display: grid; grid-template-columns: repeat(4, 1fr);
      padding: 4px 8px;
    }
    .li-post__btn {
      display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 10px 4px; font-size: 13px; font-weight: 600;
      color: rgba(0,0,0,0.6);
      border-radius: 4px;
    }
    .li-post__btn svg { width: 18px; height: 18px; }

    /* LinkedIn carousel/document */
    .li-doc {
      width: 100%; max-width: 552px;
      background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08);
      border-radius: 8px; font-family: ${FONT_LI};
      box-shadow: 0 0 0 1px rgba(0,0,0,0.08);
    }
    .li-doc__viewer {
      position: relative; aspect-ratio: 1/1;
      background: #0B0F14;
      display: grid; place-items: center;
      overflow: hidden;
    }
    .li-doc__slide {
      width: 100%; height: 100%;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 36px 36px 28px;
      color: #fff;
    }
    .li-doc__eyebrow {
      font-size: 11px; letter-spacing: 0.18em;
      text-transform: uppercase;
      display: inline-flex; align-items: center; gap: 10px;
    }
    .li-doc__eyebrow::before { content: ""; width: 18px; height: 1px; background: #E4022D; }
    .li-doc__h {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 42px; line-height: 1.04; letter-spacing: -0.02em;
      font-weight: 400;
    }
    .li-doc__h em { font-style: italic; color: #E4022D; }
    .li-doc__pgcount {
      position: absolute; right: 12px; bottom: 12px;
      background: rgba(0,0,0,0.7); color: #fff;
      font-size: 12px; padding: 4px 10px; border-radius: 4px;
      font-weight: 500;
    }
    .li-doc__nav-l, .li-doc__nav-r {
      position: absolute; top: 50%; transform: translateY(-50%);
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(0,0,0,0.6); color: #fff;
      display: grid; place-items: center;
      font-size: 16px;
    }
    .li-doc__nav-l { left: 8px; }
    .li-doc__nav-r { right: 8px; }

    /* ============================================================
       X (TWITTER) — accurate dark/light chrome
       ============================================================ */
    .x-post {
      width: 100%; max-width: 540px;
      background: #FFFFFF; color: #0F1419;
      border: 1px solid #EFF3F4;
      border-radius: 16px;
      font-family: ${FONT_X};
      font-size: 15px; line-height: 1.3125;
      padding: 12px 16px;
    }
    .x-post--dark { background: #000; color: #E7E9EA; border-color: #2F3336; }
    .x-post__head { display: flex; align-items: flex-start; gap: 12px; }
    .x-post__avatar { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; flex-shrink: 0; background: #E4022D; }
    .x-post__id { flex: 1; min-width: 0; }
    .x-post__line {
      display: flex; align-items: center; gap: 4px; font-size: 15px;
      flex-wrap: wrap;
    }
    .x-post__name { font-weight: 700; color: inherit; }
    .x-post__name::after {
      content: "✓"; display: inline-flex; align-items: center; justify-content: center;
      width: 17px; height: 17px; background: #1D9BF0; color: #fff;
      border-radius: 50%; font-size: 11px; font-weight: 700;
      margin-left: 3px; vertical-align: middle;
    }
    .x-post__handle { color: #536471; font-weight: 400; }
    .x-post--dark .x-post__handle { color: #71767B; }
    .x-post__sep { color: #536471; }
    .x-post--dark .x-post__sep { color: #71767B; }
    .x-post__time { color: #536471; }
    .x-post--dark .x-post__time { color: #71767B; }
    .x-post__more { margin-left: auto; color: #536471; }
    .x-post--dark .x-post__more { color: #71767B; }
    .x-post__body { margin-top: 4px; color: inherit; word-wrap: break-word; white-space: pre-line; }
    .x-post__body a { color: #1D9BF0; }
    .x-post__media {
      margin-top: 12px; border-radius: 16px; overflow: hidden;
      border: 1px solid #EFF3F4;
    }
    .x-post--dark .x-post__media { border-color: #2F3336; }
    .x-post__media img { width: 100%; display: block; }
    .x-post__bar {
      display: grid; grid-template-columns: repeat(5, 1fr);
      margin-top: 12px;
    }
    .x-post__btn {
      display: flex; align-items: center; gap: 6px;
      color: #536471; font-size: 13px;
    }
    .x-post--dark .x-post__btn { color: #71767B; }
    .x-post__btn svg { width: 18px; height: 18px; }

    /* X thread */
    .x-thread { display: flex; flex-direction: column; gap: 0; }
    .x-thread .x-post {
      border-radius: 0; border-bottom: 1px solid #EFF3F4;
      border-left: 0; border-right: 0; border-top: 0;
    }
    .x-thread .x-post:first-child { border-top: 1px solid #EFF3F4; border-radius: 16px 16px 0 0; }
    .x-thread .x-post:last-child { border-bottom: 1px solid #EFF3F4; border-radius: 0 0 16px 16px; }
    .x-thread__connector {
      width: 2px; background: #CFD9DE; margin-left: 35px; height: 12px;
      margin-top: -2px; margin-bottom: -2px; position: relative; z-index: 1;
    }

    /* ============================================================
       FACEBOOK — accurate card chrome
       ============================================================ */
    .fb-post {
      width: 100%; max-width: 552px;
      background: #FFFFFF; color: #050505;
      border-radius: 8px; font-family: ${FONT_FB};
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      font-size: 15px; line-height: 1.3333;
    }
    .fb-post__head { display: flex; align-items: center; gap: 8px; padding: 12px 16px; }
    .fb-post__avatar { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
    .fb-post__author { flex: 1; min-width: 0; }
    .fb-post__name {
      font-weight: 600; font-size: 15px; color: #050505;
      display: flex; align-items: center; gap: 4px;
    }
    .fb-post__name::after {
      content: "✓"; display: inline-flex; align-items: center; justify-content: center;
      width: 14px; height: 14px; background: #1877F2; color: #fff;
      border-radius: 50%; font-size: 9px; font-weight: 700;
    }
    .fb-post__meta { color: #65676B; font-size: 13px; display: flex; align-items: center; gap: 4px; }
    .fb-post__meta svg { width: 12px; height: 12px; }
    .fb-post__body { padding: 0 16px 12px; color: #050505; }
    .fb-post__media img { width: 100%; display: block; }
    .fb-post__counts {
      display: flex; align-items: center; gap: 4px;
      padding: 10px 16px; font-size: 13px; color: #65676B;
    }
    .fb-post__reacts { display: inline-flex; align-items: center; }
    .fb-post__react {
      width: 18px; height: 18px; border-radius: 50%;
      border: 1.5px solid #fff; margin-left: -4px;
      display: inline-flex; align-items: center; justify-content: center;
      color: #fff; font-size: 10px;
    }
    .fb-post__react:first-child { margin-left: 0; }
    .fb-post__react--like { background: #1877F2; }
    .fb-post__react--love { background: #F33E58; }
    .fb-post__react--care { background: #F7B125; }
    .fb-post__bar {
      display: grid; grid-template-columns: repeat(3, 1fr);
      padding: 4px 8px; border-top: 1px solid #CED0D4;
      margin: 0 8px;
    }
    .fb-post__btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 8px 4px; font-size: 14px; font-weight: 600;
      color: #65676B; border-radius: 6px;
    }
    .fb-post__btn svg { width: 18px; height: 18px; }

    /* ============================================================
       INSTAGRAM — feed post + reel + carousel + story
       ============================================================ */
    .ig-post {
      width: 100%; max-width: 470px;
      background: #FFFFFF; color: #262626;
      border: 1px solid #DBDBDB;
      border-radius: 8px;
      font-family: ${FONT_IG};
      font-size: 14px; line-height: 1.4;
    }
    .ig-post__head { display: flex; align-items: center; gap: 12px; padding: 14px 16px; }
    .ig-post__avatar {
      width: 32px; height: 32px; border-radius: 50%; overflow: hidden;
      padding: 2px; background: linear-gradient(45deg, #FED373, #F15245, #D92E7F, #9B36B7, #515ECF);
    }
    .ig-post__avatar > div {
      width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
      border: 2px solid #fff; background: #E4022D;
    }
    .ig-post__user { flex: 1; }
    .ig-post__name {
      font-weight: 600; font-size: 14px; color: #262626;
      display: flex; align-items: center; gap: 4px;
    }
    .ig-post__name::after {
      content: "✓"; display: inline-flex; align-items: center; justify-content: center;
      width: 14px; height: 14px; background: #2196F3; color: #fff;
      border-radius: 50%; font-size: 9px; font-weight: 700;
    }
    .ig-post__location { font-size: 12px; color: #262626; margin-top: 1px; }
    .ig-post__more { color: #262626; }
    .ig-post__media {
      position: relative;
      aspect-ratio: 1/1; overflow: hidden;
      background: #FAFAFA;
    }
    .ig-post__media img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .ig-post__dots {
      position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
      display: flex; gap: 4px;
    }
    .ig-post__dot { width: 6px; height: 6px; border-radius: 50%; background: #FFF; opacity: 0.6; }
    .ig-post__dot.is-active { opacity: 1; background: #0095F6; }
    .ig-post__multi {
      position: absolute; top: 12px; right: 12px;
      background: rgba(0,0,0,0.6); color: #fff;
      font-size: 12px; padding: 4px 10px; border-radius: 99px;
      display: inline-flex; align-items: center; gap: 4px;
    }
    .ig-post__bar {
      display: flex; align-items: center; padding: 8px 12px;
    }
    .ig-post__bar svg { width: 24px; height: 24px; stroke-width: 1.6; color: #262626; }
    .ig-post__bar > * { padding: 6px; }
    .ig-post__bar > *:last-child { margin-left: auto; padding-right: 6px; }
    .ig-post__likes { padding: 0 16px 6px; font-weight: 600; font-size: 14px; color: #262626; }
    .ig-post__caption { padding: 0 16px 6px; font-size: 14px; color: #262626; }
    .ig-post__caption b { font-weight: 600; }
    .ig-post__see { color: #8E8E8E; }
    .ig-post__time { padding: 0 16px 14px; font-size: 10px; text-transform: uppercase; color: #8E8E8E; letter-spacing: 0.4px; }

    /* IG Reel — 9:16 vertical */
    .ig-reel {
      position: relative;
      width: 100%; max-width: 280px;
      aspect-ratio: 9/16;
      background: #000; overflow: hidden;
      border-radius: 12px;
      font-family: ${FONT_IG};
      color: #fff;
    }
    .ig-reel__media { position: absolute; inset: 0; }
    .ig-reel__media img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .ig-reel__media::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.65) 100%);
    }
    .ig-reel__top {
      position: absolute; top: 0; left: 0; right: 0;
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px; z-index: 2;
    }
    .ig-reel__top-l { display: flex; gap: 16px; font-weight: 600; font-size: 16px; }
    .ig-reel__top-l span:first-child { opacity: 0.6; }
    .ig-reel__right {
      position: absolute; right: 8px; bottom: 110px; z-index: 2;
      display: flex; flex-direction: column; gap: 18px; align-items: center;
      color: #fff;
    }
    .ig-reel__action { display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 11px; font-weight: 600; }
    .ig-reel__action svg { width: 26px; height: 26px; stroke-width: 2.2; }
    .ig-reel__bottom {
      position: absolute; left: 0; right: 60px; bottom: 0; z-index: 2;
      padding: 14px 16px;
    }
    .ig-reel__user { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .ig-reel__user-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      border: 1.5px solid #fff; overflow: hidden; background: #E4022D;
    }
    .ig-reel__user-name { font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; }
    .ig-reel__follow {
      border: 1px solid #fff; padding: 3px 10px;
      border-radius: 6px; font-size: 12px; font-weight: 600;
    }
    .ig-reel__caption { font-size: 13px; line-height: 1.4; max-width: 90%; }
    .ig-reel__audio {
      display: flex; align-items: center; gap: 6px;
      margin-top: 8px; font-size: 12px;
    }
    .ig-reel__audio svg { width: 12px; height: 12px; }

    /* IG Story — 9:16 with progress bar */
    .ig-story {
      position: relative;
      width: 100%; max-width: 280px;
      aspect-ratio: 9/16;
      background: #000; overflow: hidden;
      border-radius: 12px;
      font-family: ${FONT_IG};
      color: #fff;
    }
    .ig-story__media { position: absolute; inset: 0; }
    .ig-story__media img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .ig-story__media::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.5) 100%);
    }
    .ig-story__bars {
      position: absolute; top: 8px; left: 8px; right: 8px;
      display: flex; gap: 4px; z-index: 2;
    }
    .ig-story__bar {
      flex: 1; height: 2px; background: rgba(255,255,255,0.4); border-radius: 1px;
    }
    .ig-story__bar.is-progress { background: #fff; }
    .ig-story__bar.is-active::after {
      content: ""; display: block;
      width: 60%; height: 100%; background: #fff; border-radius: 1px;
    }
    .ig-story__head {
      position: absolute; top: 18px; left: 14px; right: 14px;
      display: flex; align-items: center; gap: 10px; z-index: 2;
    }
    .ig-story__avatar {
      width: 32px; height: 32px; border-radius: 50%; overflow: hidden;
      border: 1px solid rgba(255,255,255,0.4); background: #E4022D;
    }
    .ig-story__user { font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 4px; }
    .ig-story__time { font-weight: 400; opacity: 0.8; font-size: 13px; margin-left: 4px; }
    .ig-story__center {
      position: absolute; top: 28%; left: 0; right: 0; padding: 0 28px;
      text-align: center; z-index: 2;
    }
    .ig-story__center h3 {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 30px; line-height: 1.05; letter-spacing: -0.01em; font-weight: 400;
      color: #fff;
    }
    .ig-story__center h3 em { font-style: italic; color: #FF6B82; }
    .ig-story__sticker {
      display: inline-block; margin-top: 16px;
      background: #fff; color: #0B0F14;
      font-weight: 700; font-size: 14px;
      padding: 8px 16px; border-radius: 6px;
      transform: rotate(-2deg);
    }
    .ig-story__bottom {
      position: absolute; left: 12px; right: 12px; bottom: 14px; z-index: 2;
      display: flex; align-items: center; gap: 10px;
    }
    .ig-story__reply {
      flex: 1;
      border: 1px solid rgba(255,255,255,0.5); border-radius: 24px;
      padding: 10px 14px; font-size: 13px;
      color: rgba(255,255,255,0.85);
    }
    .ig-story__icons { display: flex; gap: 12px; }
    .ig-story__icons svg { width: 22px; height: 22px; stroke-width: 2; }

    /* ---- BANNERS ---- */
    .so-banner {
      position: relative; overflow: hidden;
      border-radius: 8px;
      color: #fff;
      display: flex; align-items: center; padding: 0 48px;
    }
    .so-banner--li { aspect-ratio: 1584/396; background: #0B0F14; }
    .so-banner--x  { aspect-ratio: 1500/500;  background: #0B0F14; }
    .so-banner--fb { aspect-ratio: 820/312;   background: #0B0F14; }
    .so-banner__bg { position: absolute; inset: 0; }
    .so-banner__bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.55; }
    .so-banner__bg::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(11,15,20,0.9) 0%, rgba(11,15,20,0.55) 60%, rgba(11,15,20,0.2) 100%); }
    .so-banner__inner { position: relative; z-index: 1; max-width: 60%; }
    .so-banner__eyebrow {
      font-family: var(--font-sans); font-size: 11px; font-weight: 500;
      letter-spacing: 0.22em; text-transform: uppercase; color: #fff;
      display: inline-flex; align-items: center; gap: 10px;
    }
    .so-banner__eyebrow::before { content: ""; width: 22px; height: 1px; background: var(--accent); }
    .so-banner__h {
      font-family: var(--font-display); font-weight: 400;
      font-size: clamp(28px, 4vw, 56px); line-height: 1.03;
      letter-spacing: -0.02em; margin-top: 10px;
    }
    .so-banner__h em { font-style: italic; color: var(--accent); }

    /* ---- HOWTO ---- */
    .so-howto { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-5); margin-top: var(--s-7); }
    @media (max-width: 900px) { .so-howto { grid-template-columns: 1fr; } }
    .so-step { border: 1px solid var(--rule); border-radius: var(--r-3); padding: 22px; background: var(--bg); }
    .so-step__num { font-family: var(--font-display); font-size: 28px; line-height: 1; color: var(--accent); letter-spacing: -0.02em; margin-bottom: 10px; font-style: italic; }
    .so-step__h { font-family: var(--font-display); font-size: 19px; line-height: 1.2; letter-spacing: -0.01em; color: var(--fg); margin-bottom: 8px; }
    .so-step__b { font-size: 13px; color: var(--fg-2); line-height: 1.55; }
  </style>

  <!-- HERO -->
  <section class="so-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">12 · Social</span>
      <h1>Real <em>previews</em>, not abstract posters.</h1>
      <p class="so-hero__lede">
        Every layout below is rendered inside accurate platform chrome &mdash; LinkedIn, X, Facebook, Instagram feed, reel, carousel and story. So before you ship, you know exactly how a Kilowott post looks in the wild. Sample content uses the real Paul John Caffeine case (3.5&times; organic traffic) and brand photography from <code style="font-family:var(--font-mono);font-size:13px;">/assets/photos/</code>.
      </p>
    </div>
  </section>

  <!-- ============================================================
       LINKEDIN
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="so-plat">
        <div class="so-plat__icon" style="background:#0A66C2;"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg></div>
        <h2 class="so-plat__h">LinkedIn</h2>
        <span class="so-plat__sub">Feed · 552px · 1200×627 image</span>
      </div>

      <div class="so-grid">
        <div class="so-card">
          <div class="so-card__stage">
            ${linkedInPost({
              name: 'Kilowott',
              follow: 'Strategic partner for agencies and growing brands · 4,800 followers',
              time: '3d',
              body: 'When a premium Indian coffee brand asked us to help them break into the U.S. market, we led with SEO content strategy and Meta ads.\n\nThe results, six months in:\n• 3.5× organic traffic\n• Domain Authority: 1 → 20\n• 256,000 search impressions\n• Engaged sessions up 98%\n\nOne engagement, two levers, measurable result.',
              image: PHOTO.atmoWarm,
              alt: 'Coffee brand reference photography',
              reactCount: '247',
              comments: '38',
              reposts: '14'
            })}
          </div>
          <div class="so-card__cap"><b>Feed post</b> &middot; image + body. Headline carries the stat, first 3 lines fit before the &ldquo;...more&rdquo; collapse, hashtags omitted on purpose.</div>
        </div>

        <div class="so-card">
          <div class="so-card__stage">
            ${linkedInDoc()}
          </div>
          <div class="so-card__cap"><b>Document carousel</b> &middot; PDF-style document, swipeable slides. Cover slide does the heavy lifting &mdash; the next 4 expand the case.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       X (TWITTER)
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="so-plat">
        <div class="so-plat__icon" style="background:#000;"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
        <h2 class="so-plat__h">X</h2>
        <span class="so-plat__sub">Single post · thread · light + dark</span>
      </div>

      <div class="so-grid so-grid--3">
        <div class="so-card">
          <div class="so-card__stage">
            ${xPost({
              name: 'Kilowott', handle: '@kilowott', time: '6h',
              body: 'Built for what comes next.\n\nWe just wrote up how SEO content + targeted Meta ads pushed Paul John Caffeine 3.5× on organic traffic — full breakdown linked.',
              image: null, replies: '12', reposts: '47', likes: '218', views: '14.2K'
            })}
          </div>
          <div class="so-card__cap"><b>Text post</b> &middot; under 280 chars. Tagline first, claim second, link last.</div>
        </div>

        <div class="so-card">
          <div class="so-card__stage">
            ${xPost({
              name: 'Kilowott', handle: '@kilowott', time: '2d',
              body: 'Domain Authority: 1 → 20.\nOrganic users: +111%.\nEngaged sessions: +98%.\n\nNot rounding. Real numbers from a real engagement.',
              image: PHOTO.teamFocused, replies: '23', reposts: '89', likes: '512', views: '38.6K'
            })}
          </div>
          <div class="so-card__cap"><b>Stat post with image</b> &middot; numbers stacked, photo carries the team, no logo on the image itself.</div>
        </div>

        <div class="so-card">
          <div class="so-card__stage" style="display:block;padding:24px;">
            ${xThread()}
          </div>
          <div class="so-card__cap"><b>Thread</b> &middot; three connected posts unpacking the case study. Posts 2 + 3 inherit the author header, no avatar repeat.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       FACEBOOK
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="so-plat">
        <div class="so-plat__icon" style="background:#1877F2;"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg></div>
        <h2 class="so-plat__h">Facebook</h2>
        <span class="so-plat__sub">Page post · 552px · square or 1.91:1</span>
      </div>

      <div class="so-grid">
        <div class="so-card">
          <div class="so-card__stage">
            ${fbPost({
              name: 'Kilowott', time: '2 hrs',
              body: 'A premium Indian coffee brand asked us to help them break into the U.S. market — six months later, organic traffic is 3.5× and Domain Authority moved from 1 to 20. Read the full breakdown 👇',
              image: PHOTO.loungeWarm, alt: 'Team in warm lounge',
              reacts: '186', comments: '24', shares: '11'
            })}
          </div>
          <div class="so-card__cap"><b>Page post</b> &middot; emoji used sparingly, link cue at the end, photo frames the team.</div>
        </div>

        <div class="so-card">
          <div class="so-card__stage">
            ${fbPost({
              name: 'Kilowott', time: '5 days',
              body: 'We&apos;re hiring a Brand Strategist to join the team in Sandnes. If you can write a brand line that earns its keep, send us your work — link in comments.',
              image: PHOTO.teamWorkshop, alt: 'Workshop seated team',
              reacts: '94', comments: '31', shares: '8'
            })}
          </div>
          <div class="so-card__cap"><b>Hiring post</b> &middot; voice-led, photo of working environment, asks for samples not r&eacute;sum&eacute;s.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       INSTAGRAM — feed + carousel + reel + story
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="so-plat">
        <div class="so-plat__icon" style="background:linear-gradient(45deg,#FED373,#F15245,#D92E7F,#9B36B7,#515ECF);"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.55a5.87 5.87 0 00-2.13 1.39A5.87 5.87 0 00.62 4.14C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.55 2.91.3.79.7 1.46 1.39 2.13.67.69 1.34 1.09 2.13 1.39.76.29 1.63.49 2.91.55C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.55a5.87 5.87 0 002.13-1.39 5.87 5.87 0 001.39-2.13c.29-.76.49-1.63.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.55-2.91a5.87 5.87 0 00-1.39-2.13A5.87 5.87 0 0019.86.62C19.1.33 18.23.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg></div>
        <h2 class="so-plat__h">Instagram</h2>
        <span class="so-plat__sub">Feed · carousel · reel · story</span>
      </div>

      <div class="so-grid">
        <div class="so-card">
          <div class="so-card__stage">
            ${igPost({
              user: 'kilowott', location: 'Sandnes, Norway',
              image: PHOTO.teamLaugh, alt: 'Team laughing in meeting',
              isCarousel: false,
              likes: '1,284', user2: 'kilowott',
              caption: 'New work shipped. Paul John Caffeine — 3.5× organic traffic, six months in. Link in bio for the full breakdown.',
              time: '2 days ago'
            })}
          </div>
          <div class="so-card__cap"><b>Feed post</b> &middot; 1:1 square. Caption opens with the work, ends with the link cue.</div>
        </div>

        <div class="so-card">
          <div class="so-card__stage">
            ${igPost({
              user: 'kilowott', location: 'Goa, India',
              image: PHOTO.teamGroup, alt: 'Team portrait',
              isCarousel: true, slideCurrent: 1, slideTotal: 5,
              likes: '947', user2: 'kilowott',
              caption: 'Five frames from the Q2 partner workshop in Goa. Swipe →',
              time: '5 days ago'
            })}
          </div>
          <div class="so-card__cap"><b>Carousel</b> &middot; 1/5 indicator top right, dot row centered. Each slide can stand alone.</div>
        </div>
      </div>

      <div class="so-grid so-grid--3" style="margin-top: var(--s-5);">
        <div class="so-card">
          <div class="so-card__stage">
            ${igReel({
              image: PHOTO.portraitTab,
              caption: 'How we got Paul John Caffeine to 3.5× organic traffic — in 30 seconds.',
              likes: '14.2K', comments: '208', shares: '1,406',
              audio: 'kilowott · Original audio'
            })}
          </div>
          <div class="so-card__cap"><b>Reel</b> &middot; 9:16. Hook in caption, audio attribution, action rail right side.</div>
        </div>

        <div class="so-card">
          <div class="so-card__stage">
            ${igStory({
              image: PHOTO.atmoWarm,
              user: 'kilowott', time: '4h',
              h: 'Built for what <em>comes next</em>.',
              sticker: 'NEW WORK SHIPPED'
            })}
          </div>
          <div class="so-card__cap"><b>Story</b> &middot; 9:16. Five-bar progress at top, tagline center, sticker badge, swipe-up replaced by reply bar.</div>
        </div>

        <div class="so-card">
          <div class="so-card__stage">
            ${igStory({
              image: PHOTO.leader,
              user: 'kilowott', time: '1h',
              h: '<em>3.5×</em> organic traffic.',
              sticker: 'PAUL JOHN CAFFEINE',
              progressIdx: 2
            })}
          </div>
          <div class="so-card__cap"><b>Story · stat frame</b> &middot; one number, one client name, one image. The rest is restraint.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       BANNERS — header art for each platform
       ============================================================ -->
  <section class="section">
    <div class="container">
      <div class="so-plat">
        <div class="so-plat__icon" style="background:#0B0F14;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/></svg></div>
        <h2 class="so-plat__h">Cover banners</h2>
        <span class="so-plat__sub">LinkedIn 1584×396 · X 1500×500 · Facebook 820×312</span>
      </div>

      <div style="display:grid; gap: var(--s-5);">
        <div class="so-banner so-banner--li">
          <div class="so-banner__bg"><img src="${PHOTO.nordic}" alt=""></div>
          <div class="so-banner__inner">
            <span class="so-banner__eyebrow">LinkedIn page · 1584×396</span>
            <div class="so-banner__h">Built for what <em>comes next</em>.</div>
          </div>
        </div>

        <div class="so-banner so-banner--x">
          <div class="so-banner__bg"><img src="${PHOTO.atmoCool}" alt=""></div>
          <div class="so-banner__inner">
            <span class="so-banner__eyebrow">X header · 1500×500</span>
            <div class="so-banner__h">Scale faster. <em>Deliver better</em>.</div>
          </div>
        </div>

        <div class="so-banner so-banner--fb">
          <div class="so-banner__bg"><img src="${PHOTO.loungeDisc}" alt=""></div>
          <div class="so-banner__inner">
            <span class="so-banner__eyebrow">Facebook page · 820×312</span>
            <div class="so-banner__h">Strategy + execution &mdash; <em>measurable</em>.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW TO USE -->
  <section class="section">
    <div class="container">
      <div class="so-howto">
        <div class="so-step">
          <div class="so-step__num">01</div>
          <div class="so-step__h">Use the chrome to QA.</div>
          <p class="so-step__b">These are pixel-accurate previews. Read them like an actual feed &mdash; first 3 lines, dot menu, like bar. If something feels off here, it&rsquo;ll feel off when shipped.</p>
        </div>
        <div class="so-step">
          <div class="so-step__num">02</div>
          <div class="so-step__h">Photos from the kit.</div>
          <p class="so-step__b">Every photo above lives in <code>/assets/photos/</code> and follows the imagery rules &mdash; warm, candid, faces and tools, no stock-actor handshakes.</p>
        </div>
        <div class="so-step">
          <div class="so-step__num">03</div>
          <div class="so-step__h">Real metrics, real URLs.</div>
          <p class="so-step__b">Sample copy uses the actual Paul John Caffeine case (3.5&times; organic traffic, DA 1→20, 256k impressions). Swap in your numbers when you compose &mdash; never round.</p>
        </div>
      </div>
    </div>
  </section>
  `;

  // Hydrate Lucide icons after innerHTML set (called by app.js too, but rerun to be safe)
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    try { window.lucide.createIcons({ root }); } catch (e) {}
  }

  // ============================================================
  // PLATFORM POST BUILDERS
  // ============================================================

  function linkedInPost(p) {
    return `
    <div class="li-post">
      <div class="li-post__head">
        <div class="li-post__avatar">${AVATAR}</div>
        <div class="li-post__author">
          <div class="li-post__name">${p.name}</div>
          <div class="li-post__follow">${p.follow}</div>
          <div class="li-post__meta">${p.time} · <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 12.5A5.5 5.5 0 1113.5 8 5.5 5.5 0 018 13.5zm.5-9H7v4l3.5 2.1.7-1.2L8.5 7.5z"/></svg></div>
        </div>
        <div class="li-post__more">⋯</div>
      </div>
      <div class="li-post__body">${p.body}<br><span class="li-post__more-link">…more</span></div>
      <div class="li-post__media"><img src="${p.image}" alt="${p.alt || ''}"></div>
      <div class="li-post__counts" style="padding-top:12px;">
        <div class="li-post__reacts">
          <div class="li-post__react li-post__react--like">👍</div>
          <div class="li-post__react li-post__react--celeb">🎉</div>
          <div class="li-post__react li-post__react--love">❤️</div>
        </div>
        <span style="margin-left:6px;">${p.reactCount}</span>
        <span style="margin-left:auto;">${p.comments} comments · ${p.reposts} reposts</span>
      </div>
      <div class="li-post__bar">
        <div class="li-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>Like</div>
        <div class="li-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Comment</div>
        <div class="li-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>Repost</div>
        <div class="li-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send</div>
      </div>
    </div>`;
  }

  function linkedInDoc() {
    return `
    <div class="li-doc">
      <div class="li-post__head">
        <div class="li-post__avatar">${AVATAR}</div>
        <div class="li-post__author">
          <div class="li-post__name">Kilowott</div>
          <div class="li-post__follow">Strategic partner for agencies and growing brands</div>
          <div class="li-post__meta">1w · Document</div>
        </div>
        <div class="li-post__more">⋯</div>
      </div>
      <div class="li-doc__viewer">
        <div class="li-doc__slide">
          <div>
            <div class="li-doc__eyebrow">Case study · Paul John Caffeine</div>
          </div>
          <div>
            <div class="li-doc__h">A premium coffee brand,<br><em>3.5× organic</em> in the U.S.</div>
          </div>
          <div style="font-family:'DM Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.7);letter-spacing:0.04em;">Swipe →</div>
        </div>
        <div class="li-doc__nav-l">‹</div>
        <div class="li-doc__nav-r">›</div>
        <div class="li-doc__pgcount">1 / 5</div>
      </div>
      <div class="li-post__bar" style="border-top: 1px solid rgba(0,0,0,0.08);">
        <div class="li-post__btn">Like</div>
        <div class="li-post__btn">Comment</div>
        <div class="li-post__btn">Repost</div>
        <div class="li-post__btn">Send</div>
      </div>
    </div>`;
  }

  function xPost(p, opts = {}) {
    const dark = opts.dark ? ' x-post--dark' : '';
    const noChrome = opts.noChrome;
    const mediaHtml = p.image
      ? `<div class="x-post__media"><img src="${p.image}" alt=""></div>`
      : '';
    return `
    <div class="x-post${dark}" ${noChrome ? 'style="border:0;border-radius:0;padding:0 0 12px;"' : ''}>
      <div class="x-post__head">
        <div class="x-post__avatar">${AVATAR}</div>
        <div class="x-post__id">
          <div class="x-post__line">
            <span class="x-post__name">${p.name}</span>
            <span class="x-post__handle">${p.handle}</span>
            <span class="x-post__sep">·</span>
            <span class="x-post__time">${p.time}</span>
            <span class="x-post__more" style="margin-left:auto;">⋯</span>
          </div>
          <div class="x-post__body">${p.body}</div>
          ${mediaHtml}
          <div class="x-post__bar">
            <div class="x-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>${p.replies}</div>
            <div class="x-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>${p.reposts}</div>
            <div class="x-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>${p.likes}</div>
            <div class="x-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>${p.views || ''}</div>
            <div class="x-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function xThread() {
    return `
    <div class="x-thread">
      ${xPost({ name: 'Kilowott', handle: '@kilowott', time: '6h',
        body: '1/3 — How we got Paul John Caffeine 3.5× on organic traffic in six months.\n\nTL;DR: SEO content + Meta ads, paired. Not either/or.',
        replies: '8', reposts: '34', likes: '142', views: '12K' })}
      ${xPost({ name: 'Kilowott', handle: '@kilowott', time: '6h',
        body: '2/3 — Domain Authority moved 1 → 20 in six months.\n\nThat doesn\'t happen on content alone. The Meta ads built brand awareness fast enough that backlinks followed.',
        replies: '4', reposts: '21', likes: '98', views: '8.4K' })}
      ${xPost({ name: 'Kilowott', handle: '@kilowott', time: '6h',
        body: '3/3 — The lesson: stop arguing over which channel "works."\n\nThe channels work together. Engineer the loop, not just the touchpoint.\n\nFull breakdown: kilowott.com/case-studies/paul-john-caffeine',
        replies: '6', reposts: '17', likes: '88', views: '7.2K' })}
    </div>`;
  }

  function fbPost(p) {
    return `
    <div class="fb-post">
      <div class="fb-post__head">
        <div class="fb-post__avatar">${AVATAR}</div>
        <div class="fb-post__author">
          <div class="fb-post__name">${p.name}</div>
          <div class="fb-post__meta">${p.time} · <svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" stroke-width="1.5"/><path d="M8 1c2 2 2 12 0 14M8 1c-2 2-2 12 0 14M1 8h14" stroke="currentColor" fill="none" stroke-width="1"/></svg></div>
        </div>
      </div>
      <div class="fb-post__body">${p.body}</div>
      <div class="fb-post__media"><img src="${p.image}" alt="${p.alt || ''}"></div>
      <div class="fb-post__counts">
        <div class="fb-post__reacts">
          <div class="fb-post__react fb-post__react--like">👍</div>
          <div class="fb-post__react fb-post__react--love">❤</div>
          <div class="fb-post__react fb-post__react--care">🤗</div>
        </div>
        <span style="margin-left:4px;">${p.reacts}</span>
        <span style="margin-left:auto;">${p.comments} comments &nbsp; ${p.shares} shares</span>
      </div>
      <div class="fb-post__bar">
        <div class="fb-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>Like</div>
        <div class="fb-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Comment</div>
        <div class="fb-post__btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Share</div>
      </div>
    </div>`;
  }

  function igPost(p) {
    const dotsHtml = p.isCarousel
      ? `<div class="ig-post__dots">${[1,2,3,4,5].map(i => `<div class="ig-post__dot ${i === p.slideCurrent ? 'is-active' : ''}"></div>`).join('')}</div>`
      : '';
    const multiBadge = p.isCarousel
      ? `<div class="ig-post__multi"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="13" height="13" rx="1"/><path d="M21 7v13a1 1 0 0 1-1 1H7"/></svg>${p.slideCurrent}/${p.slideTotal}</div>`
      : '';
    return `
    <div class="ig-post">
      <div class="ig-post__head">
        <div class="ig-post__avatar"><div>${AVATAR}</div></div>
        <div class="ig-post__user">
          <div class="ig-post__name">${p.user}</div>
          ${p.location ? `<div class="ig-post__location">${p.location}</div>` : ''}
        </div>
        <div class="ig-post__more">⋯</div>
      </div>
      <div class="ig-post__media">
        <img src="${p.image}" alt="${p.alt || ''}">
        ${multiBadge}
        ${dotsHtml}
      </div>
      <div class="ig-post__bar">
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></span>
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></span>
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></span>
      </div>
      <div class="ig-post__likes">${p.likes} likes</div>
      <div class="ig-post__caption"><b>${p.user2}</b> ${p.caption} <span class="ig-post__see">more</span></div>
      <div class="ig-post__time">${p.time}</div>
    </div>`;
  }

  function igReel(p) {
    return `
    <div class="ig-reel">
      <div class="ig-reel__media"><img src="${p.image}" alt=""></div>
      <div class="ig-reel__top">
        <div class="ig-reel__top-l">
          <span>Following</span>
          <span style="opacity:1;">For you</span>
        </div>
        <span style="font-size:20px;">📷</span>
      </div>
      <div class="ig-reel__right">
        <div class="ig-reel__action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>${p.likes}</div>
        <div class="ig-reel__action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>${p.comments}</div>
        <div class="ig-reel__action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>${p.shares}</div>
        <div class="ig-reel__action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></div>
        <div style="width:32px;height:32px;border-radius:6px;overflow:hidden;border:2px solid #fff;background:#222;"><img src="${p.image}" style="width:100%;height:100%;object-fit:cover;"></div>
      </div>
      <div class="ig-reel__bottom">
        <div class="ig-reel__user">
          <div class="ig-reel__user-avatar">${AVATAR}</div>
          <div class="ig-reel__user-name">kilowott <span class="ig-reel__follow">Follow</span></div>
        </div>
        <div class="ig-reel__caption">${p.caption}</div>
        <div class="ig-reel__audio">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          ${p.audio}
        </div>
      </div>
    </div>`;
  }

  function igStory(p) {
    const idx = p.progressIdx || 1;
    const bars = [1,2,3,4,5].map(i => {
      let cls = '';
      if (i < idx) cls = 'is-progress';
      else if (i === idx) cls = 'is-active';
      return `<div class="ig-story__bar ${cls}"></div>`;
    }).join('');
    return `
    <div class="ig-story">
      <div class="ig-story__media"><img src="${p.image}" alt=""></div>
      <div class="ig-story__bars">${bars}</div>
      <div class="ig-story__head">
        <div class="ig-story__avatar">${AVATAR}</div>
        <div class="ig-story__user">${p.user} <span class="ig-story__time">${p.time}</span></div>
        <div style="margin-left:auto;display:flex;gap:14px;font-size:18px;">▶<span style="font-size:22px;">⋯</span></div>
      </div>
      <div class="ig-story__center">
        <h3>${p.h}</h3>
        ${p.sticker ? `<div class="ig-story__sticker">${p.sticker}</div>` : ''}
      </div>
      <div class="ig-story__bottom">
        <div class="ig-story__reply">Reply to ${p.user}…</div>
        <div class="ig-story__icons">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
      </div>
    </div>`;
  }
};
