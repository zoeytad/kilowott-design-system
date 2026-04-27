/* ============================================================
   DASHBOARDS — finance-grade, data-heavy, space-tight
   KPI tiles, tables, sparklines, deltas, shells.
   ============================================================ */

window.renderDashboards = function (root) {

  // ---------- Spreadsheet demo data ----------
  const ssData = [
    {id:'CMP-2401', date:'2026-01-08', channel:'Meta',     type:'Conversion', memo:'Paul John Caffeine · US launch',         spend:48120, revenue:148120, owner:'Growth',      end:'Mar 31', status:'Live'},
    {id:'CMP-2402', date:'2026-01-10', channel:'SEO',      type:'Brand',      memo:'Editorial content · Q1 publish',         spend:22500, revenue: 78400, owner:'Brand',       end:'Mar 28', status:'Live'},
    {id:'CMP-2403', date:'2026-01-12', channel:'Google',   type:'Conversion', memo:'Branded search · always-on',             spend: 8400, revenue: 31200, owner:'Performance', end:'—',     status:'Live'},
    {id:'CMP-2404', date:'2026-01-14', channel:'LinkedIn', type:'Lead-gen',   memo:'Enterprise prospects · Nordics',          spend:18600, revenue:     0, owner:'Growth',      end:'Feb 28', status:'Optimizing'},
    {id:'CMP-2405', date:'2026-01-16', channel:'Meta',     type:'Awareness',  memo:'Ramadan campaign · UAE',                 spend: 6240, revenue: 14800, owner:'Brand',       end:'Mar 10', status:'Live'},
    {id:'CMP-2406', date:'2026-01-18', channel:'Email',    type:'Retention',  memo:'Win-back · dormant subscribers',         spend: 9800, revenue: 27400, owner:'Lifecycle',   end:'Apr 15', status:'Live'},
    {id:'CMP-2407', date:'2026-01-21', channel:'YouTube',  type:'Awareness',  memo:'Brand film · 6-week burst',              spend:14200, revenue: 19200, owner:'Brand',       end:'Mar 04', status:'Live'},
    {id:'CMP-2408', date:'2026-01-23', channel:'Google',   type:'Conversion', memo:'Comparison keywords · DTC',              spend:31500, revenue:     0, owner:'Performance', end:'Feb 28', status:'Paused'},
    {id:'CMP-2409', date:'2026-01-25', channel:'Meta',     type:'Retargeting',memo:'Cart abandon · 14-day window',           spend:12840, revenue: 38600, owner:'Performance', end:'—',     status:'Live'},
    {id:'CMP-2410', date:'2026-01-27', channel:'TikTok',   type:'Awareness',  memo:'UGC creator partnership',                spend: 3200, revenue:  4800, owner:'Creative',    end:'Mar 02', status:'Live'},
    {id:'CMP-2411', date:'2026-01-29', channel:'LinkedIn', type:'Lead-gen',   memo:'C-suite ABM · Norway',                   spend:42000, revenue:     0, owner:'Growth',      end:'Apr 02', status:'Optimizing'},
    {id:'CMP-2412', date:'2026-01-30', channel:'SEO',      type:'Brand',      memo:'Case-study landing pages',               spend: 7680, revenue: 22400, owner:'Brand',       end:'—',     status:'Live'},
    {id:'CMP-2413', date:'2026-02-02', channel:'Email',    type:'Lifecycle',  memo:'Onboarding sequence · 5-touch',          spend: 2400, revenue:  9600, owner:'Lifecycle',   end:'—',     status:'Live'},
    {id:'CMP-2414', date:'2026-02-04', channel:'Meta',     type:'Conversion', memo:'Spring collection · push',               spend:32440, revenue: 89200, owner:'Performance', end:'Apr 30', status:'Live', active:true},
    {id:'CMP-2415', date:'2026-02-06', channel:'Google',   type:'Conversion', memo:'Display retarget · audience-first',      spend:28000, revenue: 64200, owner:'Performance', end:'Mar 28', status:'Live'},
    {id:'CMP-2416', date:'2026-02-08', channel:'X',        type:'Awareness',  memo:'Industry event piggyback',               spend:11400, revenue: 14800, owner:'Brand',       end:'Feb 24', status:'Ended'},
    {id:'CMP-2417', date:'2026-02-10', channel:'Meta',     type:'Conversion', memo:'Bundle promo · DTC',                     spend:48200, revenue:121400, owner:'Performance', end:'Mar 18', status:'Live'},
    {id:'CMP-2418', date:'2026-02-12', channel:'LinkedIn', type:'Brand',      memo:'Thought leadership · founder voice',     spend:22800, revenue: 31600, owner:'Brand',       end:'—',     status:'Live'},
    {id:'CMP-2419', date:'2026-02-14', channel:'Email',    type:'Retention',  memo:'VIP loyalty tier · Q1',                  spend: 1240, revenue:  8400, owner:'Lifecycle',   end:'—',     status:'Live'},
    {id:'CMP-2420', date:'2026-02-16', channel:'Meta',     type:'Awareness',  memo:'Brand refresh launch · phase 1',         spend:64000, revenue: 92800, owner:'Brand',       end:'Apr 30', status:'Optimizing'},
    {id:'CMP-2421', date:'2026-02-18', channel:'Google',   type:'Lead-gen',   memo:'Lookalike modeling · expansion',         spend:38400, revenue:     0, owner:'Growth',      end:'Mar 22', status:'Optimizing'},
    {id:'CMP-2422', date:'2026-02-20', channel:'YouTube',  type:'Conversion', memo:'Pre-roll · purchase intent',             spend:12400, revenue:     0, owner:'Performance', end:'Mar 14', status:'Optimizing'},
    {id:'CMP-2423', date:'2026-02-22', channel:'SEO',      type:'Brand',      memo:'Hub-and-spoke content programme',        spend:14800, revenue: 41200, owner:'Brand',       end:'—',     status:'Live'},
    {id:'CMP-2424', date:'2026-02-24', channel:'TikTok',   type:'Conversion', memo:'Promo code influencer drop',             spend:56000, revenue:     0, owner:'Creative',    end:'Mar 18', status:'Draft'},
  ];
  const fmt = n => n === 0 ? '—' : '$' + n.toLocaleString('en-US');
  const sum = arr => arr.reduce((a,b)=>a+b,0);
  const totSpend   = sum(ssData.map(r=>r.spend));
  const totRevenue = sum(ssData.map(r=>r.revenue));
  const totProfit  = totRevenue - totSpend;
  const belowROAS  = ssData.filter(r=>(r.revenue - r.spend) < 0);
  const statusClass = s => ({
    'Live':'ss-st ss-st--paid',
    'Optimizing':'ss-st ss-st--open',
    'Paused':'ss-st ss-st--over',
    'Ended':'ss-st ss-st--disp',
    'Draft':'ss-st ss-st--draft',
  })[s] || 'ss-st';
  const ssRows = () => ssData.map((r, i) => {
    const rowNum = i + 1;
    const profit = r.revenue - r.spend;
    const isActive = r.active;
    const trCls = isActive ? ' class="is-active-row"' : '';
    const profitCls = 'ss-num' + (profit < 0 ? ' ss-num--neg' : '') + (isActive ? ' is-active-cell' : '');
    return `
      <tr${trCls}>
        <td class="ss-rownum${isActive ? ' is-active-row-num' : ''}">${rowNum}</td>
        <td class="ss-mono">${r.id}</td>
        <td class="ss-mono ss-muted">${r.date}</td>
        <td class="ss-vendor">${r.channel}</td>
        <td><span class="ss-pill">${r.type}</span></td>
        <td class="ss-memo">${r.memo}</td>
        <td class="ss-num">${fmt(r.spend)}</td>
        <td class="ss-num ss-num--paid">${fmt(r.revenue)}</td>
        <td class="${profitCls}">${fmt(profit)}</td>
        <td class="ss-mono ss-muted">${r.end}</td>
        <td>${r.owner}</td>
        <td><span class="${statusClass(r.status)}">${r.status}</span></td>
      </tr>`;
  }).join('');
  // Replace tfoot values at render time
  const ssTotInv = '$' + totSpend.toLocaleString('en-US');
  const ssTotPaid = '$' + totRevenue.toLocaleString('en-US');
  const ssTotBal = '$' + totProfit.toLocaleString('en-US');
  const ssOverdueCount = belowROAS.length;
  const ssOverdueSum = '$' + Math.abs(sum(belowROAS.map(r=>r.revenue-r.spend))).toLocaleString('en-US');
  const ssRowCount = ssData.length;

  // ==============================================================
  //  CANDLESTICK / OHLC DATA + SVG BUILDER
  // ==============================================================
  const ohlcSeries = [
    {t:'Oct 01',o:138.20,h:140.50,l:137.40,c:139.60,v:1.2},
    {t:'Oct 02',o:139.60,h:141.20,l:138.80,c:140.80,v:1.5},
    {t:'Oct 03',o:140.80,h:141.60,l:138.10,c:138.40,v:2.1},
    {t:'Oct 04',o:138.40,h:139.50,l:136.20,c:136.80,v:2.6},
    {t:'Oct 07',o:136.80,h:138.00,l:135.40,c:137.20,v:1.9},
    {t:'Oct 08',o:137.20,h:139.80,l:136.90,c:139.40,v:1.7},
    {t:'Oct 09',o:139.40,h:141.50,l:139.00,c:141.10,v:1.4},
    {t:'Oct 10',o:141.10,h:143.20,l:140.80,c:142.60,v:1.8},
    {t:'Oct 11',o:142.60,h:144.50,l:141.40,c:141.90,v:2.2},
    {t:'Oct 14',o:141.90,h:142.40,l:139.20,c:139.80,v:2.8},
    {t:'Oct 15',o:139.80,h:140.70,l:137.60,c:137.90,v:3.1},
    {t:'Oct 16',o:137.90,h:139.30,l:136.50,c:138.70,v:2.4},
    {t:'Oct 17',o:138.70,h:140.20,l:138.30,c:140.00,v:1.6},
    {t:'Oct 18',o:140.00,h:142.60,l:139.80,c:142.40,v:1.9},
    {t:'Oct 21',o:142.40,h:144.80,l:142.10,c:144.30,v:2.3},
    {t:'Oct 22',o:144.30,h:145.90,l:143.40,c:143.80,v:2.0},
    {t:'Oct 23',o:143.80,h:144.20,l:140.60,c:140.90,v:2.9},
    {t:'Oct 24',o:140.90,h:141.40,l:138.00,c:138.40,v:3.4},
    {t:'Oct 25',o:138.40,h:139.70,l:137.10,c:139.20,v:2.1},
    {t:'Oct 28',o:139.20,h:141.00,l:138.80,c:140.60,v:1.7},
    {t:'Oct 29',o:140.60,h:142.80,l:140.20,c:142.40,v:1.8},
    {t:'Oct 30',o:142.40,h:143.50,l:141.00,c:141.20,v:2.0},
    {t:'Oct 31',o:141.20,h:142.00,l:138.90,c:139.40,v:2.6},
    {t:'Nov 01',o:139.40,h:140.30,l:137.20,c:137.60,v:3.0},
    {t:'Nov 04',o:137.60,h:138.80,l:136.40,c:138.60,v:2.4},
    {t:'Nov 05',o:138.60,h:140.20,l:138.10,c:140.00,v:1.8},
    {t:'Nov 06',o:140.00,h:142.40,l:139.80,c:142.40,v:1.6},
    {t:'Nov 07',o:142.40,h:143.20,l:141.20,c:142.40,v:1.5},
  ];
  const ohlcSvg = () => {
    const W = 720, priceH = 200, volH = 56, pad = 28, gap = 6;
    const n = ohlcSeries.length;
    const cw = (W - pad * 2) / n;
    const bodyW = Math.max(4, cw - gap);
    const priceMin = Math.min(...ohlcSeries.map(d => d.l)) - 0.5;
    const priceMax = Math.max(...ohlcSeries.map(d => d.h)) + 0.5;
    const yPrice = p => 10 + (priceMax - p) * (priceH - 20) / (priceMax - priceMin);
    const volMax = Math.max(...ohlcSeries.map(d => d.v));
    const yVol   = v => priceH + 20 + (volH - 8) - (v / volMax) * (volH - 8);
    // Gridlines (5 steps)
    const gridY = [];
    for (let i = 0; i <= 4; i++) {
      const p = priceMin + (priceMax - priceMin) * (i / 4);
      const y = yPrice(p);
      gridY.push(`<line class="ohlc-grid" x1="${pad}" y1="${y.toFixed(1)}" x2="${W - pad}" y2="${y.toFixed(1)}"/>
                  <text class="ohlc-axis ohlc-axis--right" x="${W - pad - 4}" y="${(y - 3).toFixed(1)}">${p.toFixed(2)}</text>`);
    }
    const candles = ohlcSeries.map((d, i) => {
      const x = pad + i * cw + cw / 2;
      const up = d.c >= d.o;
      const cls = up ? 'up' : 'down';
      const bodyTop = yPrice(Math.max(d.o, d.c));
      const bodyBot = yPrice(Math.min(d.o, d.c));
      const bodyHeight = Math.max(1, bodyBot - bodyTop);
      return `
      <g class="ohlc-candle-group" data-i="${i}">
        <rect class="ohlc-candle__hit" x="${x - cw/2}" y="0" width="${cw}" height="${priceH + volH + 30}"/>
        <line class="ohlc-candle__wick--${cls}" x1="${x}" y1="${yPrice(d.h)}" x2="${x}" y2="${yPrice(d.l)}"/>
        <rect class="ohlc-candle__body--${cls}" x="${x - bodyW/2}" y="${bodyTop.toFixed(1)}" width="${bodyW.toFixed(1)}" height="${bodyHeight.toFixed(1)}"/>
        <rect class="ohlc-vol__bar--${cls}" x="${x - bodyW/2}" y="${yVol(d.v).toFixed(1)}" width="${bodyW.toFixed(1)}" height="${(priceH + 20 + volH - 8 - yVol(d.v)).toFixed(1)}"/>
      </g>`;
    }).join('');
    // X-axis ticks (every 4)
    const xAxis = ohlcSeries.filter((_,i)=>i%4===0).map((d,i) => {
      const idx = i*4;
      const x = pad + idx * cw + cw / 2;
      return `<text class="ohlc-axis" x="${x}" y="${priceH + volH + 28}" text-anchor="middle">${d.t.replace(' ','&nbsp;')}</text>`;
    }).join('');
    return `
    <svg class="ohlc__svg" viewBox="0 0 ${W} ${priceH + volH + 36}" preserveAspectRatio="xMidYMid meet" aria-label="OHLC chart">
      ${gridY.join('')}
      <line class="ohlc-baseline" x1="${pad}" y1="${priceH + 10}" x2="${W - pad}" y2="${priceH + 10}" stroke="var(--rule-strong)" stroke-width="0.5"/>
      <text class="ohlc-axis" x="${pad}" y="${priceH + 26}">VOLUME · M</text>
      ${candles}
      ${xAxis}
      <line class="ohlc-crosshair" id="ohlc-ch-x" x1="0" y1="0" x2="0" y2="${priceH + volH + 30}"/>
    </svg>`;
  };
  const ohlcLast = ohlcSeries[ohlcSeries.length - 1];
  const ohlcPrev = ohlcSeries[ohlcSeries.length - 2];
  const ohlcDelta = ohlcLast.c - ohlcPrev.c;
  const ohlcDeltaPct = (ohlcDelta / ohlcPrev.c) * 100;

  // ==============================================================
  //  TREE GRID DATA + ROW BUILDER
  // ==============================================================
  const treeData = [
    { name: 'Revenue', group: true, open: true, values: [2410, 2560, 2680, 7650, 120], children: [
      { name: 'Subscription', group: true, open: true, values: [1820, 1960, 2080, 5860, 180], children: [
        { name: 'Enterprise', values: [1280, 1410, 1490, 4180, 140] },
        { name: 'SMB',        values: [540,  550,  590,  1680,  40] },
      ]},
      { name: 'Services', values: [840, 790, 720, 2350, -210] },
    ]},
    { name: 'COGS', group: true, open: false, values: [1120, 1180, 1210, 3510, 40], children: [
      { name: 'Hosting',  values: [720, 760, 790, 2270,  20] },
      { name: 'Support',  values: [400, 420, 420, 1240,  20] },
    ]},
    { name: 'Gross profit', total: true, values: [2130, 2170, 2170, 6470, -130] },
    { name: 'OpEx', group: true, open: true, values: [1440, 1510, 1580, 4530, 150], children: [
      { name: 'S&M',  values: [680, 720, 760, 2160, 160] },
      { name: 'R&D',  values: [540, 560, 580, 1680,  20] },
      { name: 'G&A',  values: [220, 230, 240, 690,  -30] },
    ]},
    { name: 'EBITDA', total: true, values: [690, 660, 590, 1940, -320] },
  ];
  const fmtK = n => {
    if (n === 0) return '—';
    const abs = Math.abs(n);
    if (abs >= 1000) return (n/1000).toFixed(n % 1000 === 0 ? 0 : 2) + 'M';
    return n + 'K';
  };
  const treeRowBuilder = (nodes, depth = 0, parentKey = '', parentOpen = true) => {
    let out = '';
    nodes.forEach((node, i) => {
      const key = parentKey + '-' + i;
      const hasChildren = node.children && node.children.length;
      const indent = 'tree__indent-' + depth;
      const hidden = !parentOpen ? ' tree__row--hidden' : '';
      const rowCls = node.total ? 'tree__row tree__row--total' : (node.group ? 'tree__row tree__row--group' : 'tree__row');
      const nameCls = node.group ? 'tree__group-label' : (node.total ? 'tree__total-label' : '');
      const chev = hasChildren
        ? `<button class="tree__chev" aria-expanded="${node.open ? 'true' : 'false'}" data-tree-toggle="${key}">▸</button>`
        : `<span class="tree__leaf"></span>`;
      const v = node.values;
      const deltaCls = v[4] >= 0 ? 'tree__delta--up' : 'tree__delta--down';
      const deltaSign = v[4] >= 0 ? '+' : '−';
      out += `
      <tr class="${rowCls}${hidden}" data-tree-row="${key}" data-tree-depth="${depth}">
        <td class="tree__cell ${indent}"><div class="tree__name">${chev}<span class="${nameCls}">${node.name}</span></div></td>
        <td class="tree__cell tree__num">$${v[0]}K</td>
        <td class="tree__cell tree__num">$${v[1]}K</td>
        <td class="tree__cell tree__num">$${v[2]}K</td>
        <td class="tree__cell tree__num">$${fmtK(v[3])}</td>
        <td class="tree__cell tree__num ${deltaCls}">${deltaSign}$${Math.abs(v[4])}K</td>
      </tr>`;
      if (hasChildren) {
        out += treeRowBuilder(node.children, depth + 1, key, parentOpen && node.open);
      }
    });
    return out;
  };

  // ==============================================================
  //  WATERFALL CHART BUILDER
  // ==============================================================
  const wfSteps = [
    { label: 'Q3 actual',    type: 'base', value: 4630 },
    { label: 'Sub growth',   type: 'pos',  value: 180 },
    { label: 'Services dip', type: 'neg',  value: -210 },
    { label: 'S&M over',     type: 'neg',  value: -160 },
    { label: 'Other OpEx',   type: 'neg',  value: -20 },
    { label: 'New logos',    type: 'pos',  value: 120 },
    { label: 'Q4 forecast',  type: 'end',  value: null },
  ];
  const waterfallSvg = () => {
    const W = 720, H = 260, pad = 30, botPad = 48, topPad = 28;
    const n = wfSteps.length;
    const bw = (W - pad * 2) / n * 0.72;
    const gap = (W - pad * 2) / n;
    // Compute running value for connectors
    let running = wfSteps[0].value;
    const vals = wfSteps.map((s, i) => {
      if (s.type === 'base') return { start: 0, end: s.value, cum: s.value };
      if (s.type === 'end')  { const cum = running; return { start: 0, end: cum, cum }; }
      const start = running;
      running += s.value;
      return { start, end: running, cum: running };
    });
    const minV = 0;
    const maxV = Math.max(...vals.map(v => Math.max(v.start, v.end))) * 1.08;
    const yV = v => topPad + (maxV - v) * (H - topPad - botPad) / (maxV - minV);
    // Bars
    const bars = wfSteps.map((s, i) => {
      const x = pad + i * gap + (gap - bw) / 2;
      const v = vals[i];
      const top = yV(Math.max(v.start, v.end));
      const bot = yV(Math.min(v.start, v.end));
      const h = Math.max(2, bot - top);
      const cls = 'wf-bar wf-bar--' + s.type;
      const deltaCls = s.type === 'pos' ? 'wf-label--delta--pos' : (s.type === 'neg' ? 'wf-label--delta--neg' : 'wf-label--muted');
      const showDelta = s.type === 'pos' || s.type === 'neg';
      const valueLabel = s.type === 'end' || s.type === 'base'
        ? '$' + (v.end/1000).toFixed(2) + 'M'
        : (s.value > 0 ? '+$' : '−$') + Math.abs(s.value) + 'K';
      return `
        <rect class="${cls}" x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}"/>
        <text class="wf-label ${deltaCls}" x="${(x + bw/2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle">${valueLabel}</text>
        <text class="wf-label--cat" x="${(x + bw/2).toFixed(1)}" y="${(H - botPad + 18).toFixed(1)}" text-anchor="middle">${s.label}</text>
        <text class="wf-label wf-label--muted" x="${(x + bw/2).toFixed(1)}" y="${(H - botPad + 32).toFixed(1)}" text-anchor="middle">$${(v.end/1000).toFixed(2)}M</text>
      `;
    }).join('');
    // Connectors
    const connectors = wfSteps.slice(0, -1).map((s, i) => {
      const x1 = pad + i * gap + (gap + bw) / 2;
      const x2 = pad + (i+1) * gap + (gap - bw) / 2;
      const y = yV(vals[i].end);
      return `<line class="wf-connector" x1="${x1.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
    }).join('');
    // Baseline
    const baseline = `<line class="wf-baseline" x1="${pad}" y1="${yV(0).toFixed(1)}" x2="${W-pad}" y2="${yV(0).toFixed(1)}"/>`;
    return `
    <svg class="waterfall__svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-label="Waterfall chart">
      ${baseline}
      ${connectors}
      ${bars}
    </svg>`;
  };

  // ==============================================================
  //  HEATMAP — risk matrix 5x5
  // ==============================================================
  const riskLikelihood = ['Rare','Unlikely','Possible','Likely','Almost certain'];
  const riskImpact     = ['Negligible','Minor','Moderate','Major','Catastrophic'];
  // Matrix values (row = likelihood 1..5, col = impact 1..5)
  // Each cell: {count, risk (1-5 intensity)}
  const riskCells = [
    // Rare
    [{c:3,r:1},{c:2,r:1},{c:1,r:2},{c:0,r:2},{c:0,r:3}],
    // Unlikely
    [{c:4,r:1},{c:6,r:2},{c:3,r:2},{c:1,r:3},{c:0,r:3}],
    // Possible
    [{c:2,r:2},{c:5,r:2},{c:8,r:3},{c:4,r:4},{c:1,r:4}],
    // Likely
    [{c:1,r:2},{c:3,r:3},{c:6,r:4},{c:5,r:4},{c:2,r:5}],
    // Almost certain
    [{c:0,r:3},{c:2,r:4},{c:3,r:4},{c:4,r:5},{c:1,r:5}],
  ];
  const heatmapGrid = () => {
    let cells = '<div class="heatmap__corner"><span>Likelihood ↓ · Impact →</span></div>';
    riskImpact.forEach(label => {
      const num = { 'Negligible': '1', 'Minor': '2', 'Moderate': '3', 'Major': '4', 'Catastrophic': '5' }[label];
      cells += `<div class="heatmap__colhead"><b>${num}</b>${label}</div>`;
    });
    riskLikelihood.forEach((rowLabel, rIdx) => {
      cells += `<div class="heatmap__rowhead"><b>${5-rIdx}</b>${rowLabel}</div>`;
      riskCells[4 - rIdx].forEach(cell => {
        cells += `<div class="heatmap__cell heatmap__cell--${cell.r}" tabindex="0" title="${cell.c} risks">${cell.c}<small>risks</small></div>`;
      });
    });
    return cells;
  };

  // ==============================================================
  //  FORECAST SCENARIOS
  // ==============================================================
  const fcMonths = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'];
  const fcActualIdx = 4; // first 5 months actual, rest projected
  const scenarios = {
    base: {
      label: 'Base',
      revenue: [4.2, 4.35, 4.48, 4.63, 4.82, 5.00, 5.18, 5.38, 5.58, 5.78, 5.98, 6.18],
      burn:    [0.98, 1.02, 1.06, 1.09, 1.14, 1.17, 1.20, 1.22, 1.24, 1.26, 1.28, 1.30],
      runway:  16,
    },
    best: {
      label: 'Best',
      revenue: [4.2, 4.35, 4.48, 4.63, 4.82, 5.12, 5.48, 5.86, 6.28, 6.72, 7.18, 7.68],
      burn:    [0.98, 1.02, 1.06, 1.09, 1.14, 1.12, 1.10, 1.08, 1.06, 1.04, 1.02, 1.00],
      runway:  24,
    },
    worst: {
      label: 'Worst',
      revenue: [4.2, 4.35, 4.48, 4.63, 4.82, 4.72, 4.58, 4.42, 4.28, 4.12, 3.98, 3.82],
      burn:    [0.98, 1.02, 1.06, 1.09, 1.14, 1.24, 1.38, 1.52, 1.66, 1.78, 1.88, 1.96],
      runway:  9,
    },
  };
  const fcSvg = () => {
    const W = 720, H = 260, pad = 42, topPad = 24, botPad = 36;
    const n = fcMonths.length;
    const allVals = [...scenarios.base.revenue, ...scenarios.best.revenue, ...scenarios.worst.revenue];
    const yMin = Math.floor(Math.min(...allVals) - 0.5);
    const yMax = Math.ceil(Math.max(...allVals) + 0.5);
    const x = i => pad + i * (W - pad * 2) / (n - 1);
    const y = v => topPad + (yMax - v) * (H - topPad - botPad) / (yMax - yMin);
    const pathFor = arr => arr.map((v, i) => (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
    const bandFor = (a, b) => {
      const top = a.map((v, i) => 'L' + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
      const bot = b.slice().reverse().map((v, i) => 'L' + x(n - 1 - i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
      return 'M' + x(0).toFixed(1) + ',' + y(a[0]).toFixed(1) + ' ' + top + ' ' + bot + ' Z';
    };
    // Grid
    const gridLines = [];
    for (let v = yMin; v <= yMax; v++) {
      gridLines.push(`<line class="fc-grid" x1="${pad}" y1="${y(v).toFixed(1)}" x2="${W-pad}" y2="${y(v).toFixed(1)}"/>
                      <text class="fc-axis" x="${pad - 6}" y="${(y(v)+3).toFixed(1)}" text-anchor="end">$${v.toFixed(1)}M</text>`);
    }
    // X-axis
    const xLabels = fcMonths.map((m, i) =>
      `<text class="fc-axis" x="${x(i).toFixed(1)}" y="${H - botPad + 18}" text-anchor="middle">${m}</text>`
    ).join('');
    // Divider between actual vs forecast
    const divX = x(fcActualIdx);
    const divider = `<line class="fc-divider" x1="${divX.toFixed(1)}" y1="${topPad}" x2="${divX.toFixed(1)}" y2="${H-botPad}"/>
                     <text class="fc-axis" x="${(divX+6).toFixed(1)}" y="${topPad + 10}">PROJECTED →</text>`;
    // Actual line (solid up to actualIdx)
    const actualSeg = scenarios.base.revenue.slice(0, fcActualIdx + 1);
    const actualPath = actualSeg.map((v, i) => (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
    const lastActualDot = `<circle class="fc-actual-dot" cx="${x(fcActualIdx).toFixed(1)}" cy="${y(actualSeg[actualSeg.length-1]).toFixed(1)}" r="3"/>`;
    // Band best vs worst
    const bandPath = bandFor(scenarios.best.revenue, scenarios.worst.revenue);
    return `
    <svg class="fc__svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-label="Forecast chart">
      ${gridLines.join('')}
      <path class="fc-band is-active" id="fc-band" d="${bandPath}" fill="var(--fg)"/>
      ${divider}
      <path class="fc-line fc-line--worst" id="fc-line-worst" d="${pathFor(scenarios.worst.revenue)}"/>
      <path class="fc-line fc-line--best"  id="fc-line-best"  d="${pathFor(scenarios.best.revenue)}"/>
      <path class="fc-line fc-line--base is-active" id="fc-line-base" d="${pathFor(scenarios.base.revenue)}"/>
      <path class="fc-actual" d="${actualPath}" fill="none"/>
      ${lastActualDot}
      ${xLabels}
    </svg>`;
  };

  root.innerHTML = `
  <style>
    /* -- scoped to the dashboards page -- */

    .db-hero {
      padding: calc(var(--s-9) * var(--density)) 0 calc(var(--s-7) * var(--density));
      border-bottom: 1px solid var(--rule);
    }
    .db-hero h1 {
      font-family: var(--font-display);
      font-size: var(--fs-d2); line-height: 1.04; letter-spacing: -0.02em;
      margin-top: 20px; max-width: 22ch;
    }
    .db-hero h1 em { font-style: italic; color: var(--accent); }
    .db-hero__lede {
      margin-top: 22px; max-width: 62ch;
      color: var(--fg-2); font-size: 1.0625rem; line-height: 1.6;
    }

    /* Index grid (copied from components page for consistency) */
    .db-index {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 4px; margin-top: 32px;
    }
    @media (max-width: 800px) { .db-index { grid-template-columns: 1fr 1fr; } }
    .db-index a {
      display: flex; justify-content: space-between; align-items: center;
      padding: 18px 20px;
      border: 1px solid var(--rule);
      text-decoration: none; color: var(--fg);
      font-size: 14px; font-weight: 500;
      transition: background .15s, border-color .15s;
    }
    .db-index a:hover { background: var(--bg-2); border-color: var(--rule-strong); }
    .db-index a::after { content: "↓"; color: var(--fg-2); font-weight: 400; }

    /* Specimen frame */
    .db-spec {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      background: var(--bg);
    }
    .db-spec__head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 16px;
      border-bottom: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .db-spec__stage {
      padding: 20px;
      background: var(--bg);
    }
    .db-spec__stage--warm { background: var(--bg-2); }
    .db-spec__stage--ink { background: #0B0F14; color: #fff; }
    .db-spec__stage--flush { padding: 0; }
    .db-spec__foot {
      padding: 12px 16px;
      border-top: 1px solid var(--rule);
      font-size: 13px; color: var(--fg-2); line-height: 1.55;
    }
    .db-spec__foot b { color: var(--fg); font-weight: 500; }

    .db-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .db-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .db-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    @media (max-width: 1000px) { .db-grid-3 { grid-template-columns: 1fr 1fr; } .db-grid-4 { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 700px) { .db-grid-2, .db-grid-3, .db-grid-4 { grid-template-columns: 1fr; } }

    /* ============================================================
       KPI TILE — finance primary. Tight pad, mono numerals,
       display serif reserved ONLY for the headline number.
       ============================================================ */
    .kpi {
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: 6px;
      padding: 14px 16px 12px;
      display: flex; flex-direction: column; gap: 6px;
      min-height: 112px;
    }
    .kpi__label {
      font-family: var(--font-sans);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--fg-2);
      display: flex; justify-content: space-between; align-items: center;
    }
    .kpi__num {
      font-family: var(--font-display);
      font-size: 2rem; line-height: 1;
      letter-spacing: -0.02em;
      font-weight: 400;
      font-variant-numeric: tabular-nums;
      color: var(--fg);
    }
    .kpi__num--accent { color: var(--accent); }
    .kpi__num small { font-size: 0.6em; color: var(--fg-2); letter-spacing: 0; margin-left: 2px; }
    .kpi__foot {
      display: flex; justify-content: space-between; align-items: baseline;
      margin-top: auto;
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.04em;
      color: var(--fg-2);
    }
    .kpi__unit { color: var(--fg-2); font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; }

    /* Compact variant — denser still */
    .kpi--compact { padding: 10px 12px 10px; min-height: 78px; gap: 3px; }
    .kpi--compact .kpi__num { font-family: var(--font-sans); font-size: 1.25rem; font-weight: 500; letter-spacing: -0.01em; }
    .kpi--compact .kpi__label { font-size: 10px; letter-spacing: 0.12em; }

    /* Row variant — horizontal, used inside bars */
    .kpi--row {
      flex-direction: row; align-items: center; justify-content: space-between;
      min-height: 0; padding: 10px 14px;
    }
    .kpi--row .kpi__label { flex: 0 0 auto; margin-right: 12px; }
    .kpi--row .kpi__num { font-size: 1rem; font-family: var(--font-sans); font-weight: 500; }

    /* ============================================================
       DELTA CHIP — rise/fall indicator
       Positive = ink (default). Negative = red (alert only).
       ============================================================ */
    .delta {
      display: inline-flex; align-items: center; gap: 3px;
      font-family: var(--font-mono);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.02em;
      padding: 2px 6px;
      border-radius: 3px;
      background: var(--bg-2);
      color: var(--fg);
      font-variant-numeric: tabular-nums;
    }
    .delta::before {
      content: "▲";
      font-size: 8px;
      transform: translateY(-1px);
    }
    .delta--down { color: var(--accent); background: #FCE5EA; }
    .delta--down::before { content: "▼"; }
    .delta--flat { color: var(--fg-2); }
    .delta--flat::before { content: "—"; transform: none; letter-spacing: 0; }
    .delta--plain { background: transparent; padding: 0; }

    /* ============================================================
       SPARKLINE — pure inline SVG
       ============================================================ */
    .sparkline {
      width: 100%; height: 32px;
      display: block;
    }
    .sparkline path.line { fill: none; stroke: var(--fg); stroke-width: 1.25; stroke-linecap: round; stroke-linejoin: round; }
    .sparkline path.area { fill: currentColor; opacity: 0.08; stroke: none; }
    .sparkline--accent path.line { stroke: var(--accent); }
    .sparkline--down path.line { stroke: var(--accent); }
    .sparkline__dot { fill: var(--fg); }
    .sparkline--accent .sparkline__dot { fill: var(--accent); }

    /* ============================================================
       TABLE — finance-grade, dense, tabular-nums, right-aligned $
       ============================================================ */
    .db-table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--font-sans);
      font-size: 13px;
    }
    .db-table thead th {
      text-align: left;
      padding: 8px 12px;
      font-family: var(--font-mono); font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--fg-2);
      border-bottom: 1px solid var(--rule-strong);
      background: var(--bg-2);
      white-space: nowrap;
    }
    .db-table tbody td {
      padding: 9px 12px;
      border-bottom: 1px solid var(--rule);
      vertical-align: middle;
      line-height: 1.4;
    }
    .db-table tbody tr:last-child td { border-bottom: 0; }
    .db-table tbody tr:hover td { background: var(--bg-2); }
    .db-table .num {
      text-align: right;
      font-variant-numeric: tabular-nums;
      font-family: var(--font-mono);
      font-size: 12.5px;
      white-space: nowrap;
    }
    .db-table .neg { color: var(--accent); }
    .db-table .muted { color: var(--fg-2); }
    .db-table tfoot td {
      padding: 10px 12px;
      border-top: 1px solid var(--rule-strong);
      font-weight: 500;
      background: var(--bg-2);
    }
    .db-table .ticker {
      font-family: var(--font-mono);
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.08em;
      color: var(--fg);
    }
    .db-table .secondary {
      font-size: 11px; color: var(--fg-2);
      display: block; margin-top: 1px;
    }

    /* Zebra option */
    .db-table--zebra tbody tr:nth-child(even) td { background: var(--bg-2); }
    .db-table--zebra tbody tr:nth-child(even):hover td { background: var(--bg-3); }

    /* ============================================================
       STATUS DOT — live feed, health
       ============================================================ */
    .dot {
      display: inline-block; width: 6px; height: 6px; border-radius: 50%;
      background: var(--fg);
      margin-right: 6px; transform: translateY(-1px);
    }
    .dot--live { background: #1f8a3b; box-shadow: 0 0 0 3px rgba(31,138,59,0.12); }
    .dot--alert { background: var(--accent); box-shadow: 0 0 0 3px rgba(228,2,45,0.14); animation: dbPulse 1.6s ease-in-out infinite; }
    .dot--idle { background: var(--fg-2); }
    .dot--paused { background: transparent; border: 1.5px solid var(--fg-2); }
    @keyframes dbPulse {
      0%, 100% { box-shadow: 0 0 0 3px rgba(228,2,45,0.14); }
      50% { box-shadow: 0 0 0 6px rgba(228,2,45,0.02); }
    }

    /* ============================================================
       PROGRESS / METER
       ============================================================ */
    .meter {
      height: 4px; border-radius: 2px;
      background: var(--rule); overflow: hidden;
      margin: 4px 0;
    }
    .meter__fill {
      height: 100%; background: var(--fg);
      transition: width .3s ease;
    }
    .meter__fill--accent { background: var(--accent); }
    .meter--thin { height: 2px; }

    /* Budget vs. actual: overlaid track */
    .meter--vs {
      position: relative; height: 8px;
      background: var(--bg-2);
      border: 1px solid var(--rule);
      border-radius: 2px;
    }
    .meter--vs .target {
      position: absolute; top: -2px; bottom: -2px;
      width: 2px; background: var(--fg);
    }
    .meter--vs .fill {
      height: 100%;
      background: var(--accent);
      opacity: 0.85;
    }

    /* ============================================================
       TOOLBAR / FILTER BAR — tight controls
       ============================================================ */
    .db-bar {
      display: flex; align-items: center; gap: 8px;
      flex-wrap: wrap;
      padding: 10px 12px;
      border: 1px solid var(--rule);
      border-radius: 6px;
      background: var(--bg);
    }
    .db-input {
      font-family: var(--font-sans); font-size: 13px;
      padding: 6px 10px;
      background: var(--bg);
      color: var(--fg);
      border: 1px solid var(--rule-strong);
      border-radius: 4px;
      width: auto;
    }
    .db-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 2px rgba(228,2,45,0.12); }

    .db-seg {
      display: inline-flex; background: var(--bg);
      border: 1px solid var(--rule-strong);
      border-radius: 4px; padding: 2px;
    }
    .db-seg button {
      font-family: var(--font-sans); font-size: 12px;
      font-weight: 500;
      padding: 4px 10px;
      background: transparent; color: var(--fg-2);
      border: 0; border-radius: 2px;
      cursor: pointer;
      transition: all .12s ease;
    }
    .db-seg button:hover { color: var(--fg); }
    .db-seg button.is-on { background: #0B0F14; color: #fff; }

    .db-iconbtn {
      width: 28px; height: 28px;
      border: 1px solid var(--rule-strong);
      background: var(--bg); color: var(--fg);
      border-radius: 4px;
      display: inline-grid; place-items: center;
      font-family: var(--font-mono); font-size: 13px;
      cursor: pointer;
    }
    .db-iconbtn .lucide { width: 14px; height: 14px; stroke-width: 1.75; }
    .db-iconbtn:hover { background: var(--bg-2); }
    .db-iconbtn--accent { background: var(--accent); color: #fff; border-color: var(--accent); }

    /* ============================================================
       SHELL — full dashboard mock
       ============================================================ */
    .db-shell {
      display: grid;
      grid-template-columns: 200px 1fr;
      min-height: 520px;
      background: var(--bg);
    }
    @media (max-width: 900px) { .db-shell { grid-template-columns: 1fr; } }
    .db-side {
      background: var(--bg-2);
      color: var(--fg);
      padding: 20px 16px;
      display: flex; flex-direction: column; gap: 8px;
      font-size: 13px;
      border-right: 1px solid var(--rule);
    }
    .db-side__brand {
      display: flex; flex-direction: column;
      gap: 6px;
      padding-bottom: 18px; margin-bottom: 8px;
      border-bottom: 1px solid var(--rule);
    }
    .db-side__logo {
      width: 96px; height: 14px;
      background: currentColor;
      color: var(--fg);
      -webkit-mask: url(assets/kilowott-logo.svg) no-repeat left center / contain;
              mask: url(assets/kilowott-logo.svg) no-repeat left center / contain;
    }
    .db-side__sublabel {
      font-family: var(--font-sans);
      font-size: 10px; font-weight: 500;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--fg-2);
      display: inline-flex; align-items: center; gap: 8px;
    }
    .db-side__sublabel::before {
      content: ""; width: 16px; height: 1px; background: var(--accent);
    }
    .db-side__group {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--fg-2);
      margin-top: 12px; margin-bottom: 2px;
    }
    .db-side__link {
      display: flex; justify-content: space-between; align-items: center;
      padding: 7px 10px; margin: 0 -8px;
      border-radius: 4px;
      color: var(--fg); text-decoration: none;
      font-weight: 400;
      cursor: pointer;
      border: 0; background: transparent;
      font-family: inherit; font-size: inherit;
      text-align: left; width: calc(100% + 16px);
      transition: background .14s ease, color .14s ease;
      position: relative;
    }
    .db-side__link:hover { background: var(--bg-3); }
    .db-side__link.is-on {
      color: var(--fg); font-weight: 500;
      background: var(--bg);
      box-shadow: 0 1px 0 rgba(11,15,20,0.04), 0 1px 2px rgba(11,15,20,0.03);
    }
    .db-side__link.is-on:hover { background: var(--bg); }
    .db-side__link.is-on::before {
      content: ""; position: absolute;
      left: -16px; top: 8px; bottom: 8px;
      width: 2px; background: var(--accent);
    }
    .db-side__link small {
      font-family: var(--font-mono); font-size: 10px;
      color: var(--fg-2); letter-spacing: 0.04em;
      font-weight: 400;
    }
    .db-side__link.is-on small { color: var(--accent); font-weight: 500; }
    .db-side__foot {
      margin-top: auto; padding-top: 16px;
      border-top: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--fg-2);
      display: flex; justify-content: space-between;
    }

    .db-main { display: flex; flex-direction: column; }
    .db-top {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px;
      border-bottom: 1px solid var(--rule);
      background: var(--bg);
      gap: 12px; flex-wrap: wrap;
    }
    .db-top__crumb {
      font-family: var(--font-sans); font-size: 12px;
      color: var(--fg-2);
    }
    .db-top__crumb b { color: var(--fg); font-weight: 500; }
    .db-body { padding: 14px 16px; display: flex; flex-direction: column; gap: 14px; }

    /* Alert strip */
    .db-alert {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 12px;
      background: #FCE5EA; color: #8A021B;
      border: 1px solid rgba(228,2,45,0.2);
      border-radius: 4px;
      font-size: 12.5px; line-height: 1.45;
    }
    .db-alert b { color: #8A021B; font-weight: 500; }
    .db-alert__dismiss {
      margin-left: auto;
      background: transparent; border: 0; color: #8A021B; font-family: var(--font-mono);
      font-size: 14px; cursor: pointer;
    }

    /* Compare (two values stacked) */
    .compare {
      display: flex; flex-direction: column; gap: 2px;
      font-variant-numeric: tabular-nums;
    }
    .compare__now { font-family: var(--font-sans); font-weight: 500; font-size: 14px; }
    .compare__prev { font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); }

    /* Section spacing — tighter than rest of design system */
    .db-section {
      padding: calc(var(--s-7) * var(--density)) 0;
    }
    .db-section:first-of-type { padding-top: calc(var(--s-6) * var(--density)); }

    /* ============================================================
       SPREADSHEET GRID
       ============================================================ */
    .ss-wrap {
      background: var(--bg);
      font-family: var(--font-sans);
      color: var(--fg);
      display: flex; flex-direction: column;
      min-height: 620px;
    }

    /* Toolbar */
    .ss-toolbar {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 10px;
      border-bottom: 1px solid var(--rule);
      background: var(--bg);
      flex-wrap: wrap;
    }
    .ss-seg {
      display: inline-flex;
      background: var(--bg);
      border: 1px solid var(--rule-strong);
      border-radius: 4px;
      padding: 1px;
    }
    .ss-seg button {
      font-family: var(--font-sans); font-size: 12px;
      padding: 4px 8px; min-width: 26px;
      background: transparent; color: var(--fg);
      border: 0; border-radius: 2px;
      cursor: pointer;
    }
    .ss-seg button:hover { background: var(--bg-2); }
    .ss-tb-sep { width: 1px; height: 18px; background: var(--rule); margin: 0 4px; }
    .ss-tb-btn {
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--font-sans); font-size: 12px; font-weight: 500;
      padding: 5px 10px;
      background: var(--bg); color: var(--fg);
      border: 1px solid var(--rule-strong);
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
    }
    .ss-tb-btn:hover { background: var(--bg-2); }
    .ss-tb-btn.is-on { background: var(--bg-2); border-color: var(--fg); }
    .ss-tb-btn--accent { background: var(--accent); color: #fff; border-color: var(--accent); }
    .ss-tb-btn--accent:hover { background: #B40224; }
    .ss-tb-btn .lucide, .ss-seg button .lucide { width: 13px; height: 13px; stroke-width: 1.75; }
    .db-alert__dismiss .lucide { width: 14px; height: 14px; stroke-width: 1.75; }
    .ss-chip button .lucide { width: 10px; height: 10px; stroke-width: 2; }
    .ss-tb-count {
      font-family: var(--font-mono); font-size: 10px;
      background: var(--accent); color: #fff;
      padding: 1px 5px; border-radius: 8px;
      letter-spacing: 0.04em;
    }
    .ss-tb-search {
      flex: 1 1 260px;
      min-width: 200px; max-width: 360px;
      font-family: var(--font-sans); font-size: 12.5px;
      padding: 5px 10px;
      background: var(--bg);
      border: 1px solid var(--rule-strong);
      border-radius: 4px;
      color: var(--fg);
    }
    .ss-tb-search:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 2px rgba(228,2,45,0.12); }

    /* Formula bar */
    .ss-formula {
      display: flex; align-items: center; gap: 0;
      padding: 0;
      border-bottom: 1px solid var(--rule);
      background: var(--bg-2);
    }
    .ss-namebox {
      font-family: var(--font-mono); font-size: 12px; font-weight: 500;
      padding: 7px 14px;
      background: var(--bg);
      color: var(--fg);
      border-right: 1px solid var(--rule);
      min-width: 72px; text-align: center;
      letter-spacing: 0.04em;
    }
    .ss-fx {
      font-family: var(--font-display); font-style: italic;
      font-size: 14px; color: var(--fg-2);
      padding: 0 12px;
      border-right: 1px solid var(--rule);
      align-self: stretch; display: flex; align-items: center;
    }
    .ss-fx-input {
      flex: 1 1 auto;
      font-family: var(--font-mono); font-size: 12.5px;
      padding: 7px 12px;
      background: transparent;
      border: 0;
      color: var(--fg);
    }
    .ss-fx-input:focus { outline: none; background: var(--bg); box-shadow: inset 0 0 0 1px var(--accent); }
    .ss-fx-status {
      font-family: var(--font-mono); font-size: 10px;
      color: var(--fg-2);
      padding: 0 14px;
      letter-spacing: 0.08em; text-transform: uppercase;
      border-left: 1px solid var(--rule);
      align-self: stretch; display: flex; align-items: center; gap: 6px;
    }
    .ss-fx-status::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #1f8a3b; }
    .ss-fx-status .ss-fx-time { color: var(--fg); font-weight: 500; }

    /* Filter chips row */
    .ss-chips {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 12px;
      border-bottom: 1px solid var(--rule);
      background: var(--bg);
      flex-wrap: wrap;
    }
    .ss-chips__label {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--fg-2);
      margin-right: 4px;
    }
    .ss-chip {
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--font-sans); font-size: 11.5px;
      padding: 3px 4px 3px 10px;
      background: var(--bg);
      border: 1px solid var(--rule-strong);
      border-radius: 14px;
      color: var(--fg-2);
    }
    .ss-chip b { color: var(--fg); font-weight: 500; }
    .ss-chip button {
      background: transparent; border: 0; cursor: pointer;
      font-family: var(--font-mono); font-size: 13px; line-height: 1;
      color: var(--fg-2);
      width: 18px; height: 18px; border-radius: 50%;
      display: inline-grid; place-items: center;
      padding: 0;
    }
    .ss-chip button:hover { background: var(--bg-2); color: var(--accent); }
    .ss-chip--add {
      border-style: dashed; color: var(--fg-2);
      padding: 3px 10px;
      cursor: pointer;
    }
    .ss-chip--add:hover { border-color: var(--fg); color: var(--fg); background: var(--bg-2); }
    .ss-chips__count {
      margin-left: auto;
      font-family: var(--font-sans); font-size: 11.5px;
      color: var(--fg-2);
    }
    .ss-chips__count b { color: var(--fg); font-weight: 500; }

    /* Grid container — scrollable, sticky head/col */
    .ss-grid {
      overflow: auto;
      max-height: 440px;
      background: var(--bg);
      position: relative;
    }
    .ss-grid:focus { outline: none; }
    .ss-grid::-webkit-scrollbar { width: 10px; height: 10px; }
    .ss-grid::-webkit-scrollbar-track { background: var(--bg-2); }
    .ss-grid::-webkit-scrollbar-thumb { background: var(--rule-strong); border-radius: 5px; }

    .ss-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      font-family: var(--font-sans);
      font-size: 12.5px;
      line-height: 1.3;
    }

    /* Column headers */
    .ss-colhead {
      position: sticky; top: 0; z-index: 3;
      background: var(--bg-2);
      border-bottom: 1px solid var(--rule-strong);
      border-right: 1px solid var(--rule);
      padding: 0;
      font-weight: 500;
      text-align: left;
      white-space: nowrap;
    }
    .ss-colhead__inner {
      display: flex; align-items: center; gap: 6px;
      padding: 6px 10px;
      font-family: var(--font-mono); font-size: 10.5px;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .ss-colhead__inner span:first-child {
      background: var(--bg); color: var(--fg);
      padding: 1px 5px; border-radius: 2px;
      font-weight: 500;
      border: 1px solid var(--rule);
    }
    .ss-colhead__label {
      font-family: var(--font-sans); font-weight: 500;
      letter-spacing: 0.04em; text-transform: none;
      color: var(--fg);
      font-size: 11.5px;
    }
    .ss-colhead__sort {
      color: var(--accent); font-size: 10px; margin-left: 2px;
    }
    .ss-colhead__filter {
      color: var(--accent); font-size: 11px; margin-left: 2px;
    }
    .ss-colhead__inner--num { justify-content: flex-end; text-align: right; }
    .ss-colhead__inner--num .ss-colhead__label { text-align: right; }

    .ss-col-id    { min-width: 100px; }
    .ss-col-wide  { min-width: 180px; }
    .ss-col-num   { min-width: 110px; }

    /* Row numbers (sticky left) */
    .ss-rownum {
      position: sticky; left: 0; z-index: 2;
      width: 36px; min-width: 36px;
      background: var(--bg-2);
      border-right: 1px solid var(--rule-strong);
      border-bottom: 1px solid var(--rule);
      text-align: center;
      font-family: var(--font-mono);
      font-size: 10.5px;
      color: var(--fg-2);
      padding: 4px 4px;
      letter-spacing: 0.04em;
    }
    .ss-colhead.ss-rownum {
      z-index: 4;
      background: var(--bg-2);
    }
    thead .ss-rownum { border-bottom: 1px solid var(--rule-strong); }
    .is-active-row-num {
      background: var(--accent); color: #fff;
    }

    /* Body cells */
    .ss-table tbody td {
      padding: 5px 10px;
      border-right: 1px solid var(--rule);
      border-bottom: 1px solid var(--rule);
      vertical-align: middle;
      background: var(--bg);
      white-space: nowrap;
    }
    .ss-table tbody td:last-child { border-right: 0; }
    .ss-table tbody tr:hover td { background: var(--bg-2); }
    .ss-table tbody tr:hover .ss-rownum { background: var(--bg-3); color: var(--fg); }

    /* Sticky first data col (optional): freeze ID column */
    .ss-table tbody td.ss-mono:first-of-type,
    .ss-table thead th.ss-col-id {
      position: sticky; left: 36px; z-index: 1;
      background: var(--bg);
    }
    .ss-table thead th.ss-col-id { z-index: 3; background: var(--bg-2); }
    .ss-table tbody tr:hover td.ss-mono:first-of-type { background: var(--bg-2); }

    .ss-mono {
      font-family: var(--font-mono);
      font-size: 11.5px;
      letter-spacing: 0.02em;
      color: var(--fg);
    }
    .ss-muted { color: var(--fg-2); }
    .ss-vendor { font-weight: 500; color: var(--fg); }
    .ss-memo { color: var(--fg-2); max-width: 240px; overflow: hidden; text-overflow: ellipsis; }
    .ss-num {
      text-align: right;
      font-variant-numeric: tabular-nums;
      font-family: var(--font-mono);
      font-size: 11.5px;
      color: var(--fg);
    }
    .ss-num--paid { color: var(--fg-2); }
    .ss-num--neg { color: var(--accent); font-weight: 500; }

    /* Category pill */
    .ss-pill {
      display: inline-block;
      font-family: var(--font-sans); font-size: 10.5px; font-weight: 500;
      padding: 1px 7px;
      border: 1px solid var(--rule-strong);
      border-radius: 10px;
      color: var(--fg);
      letter-spacing: 0.02em;
    }

    /* Status pills */
    .ss-st {
      display: inline-flex; align-items: center; gap: 5px;
      font-family: var(--font-sans); font-size: 10.5px; font-weight: 500;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 3px;
    }
    .ss-st::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
    .ss-st--paid  { color: #1f8a3b; background: rgba(31,138,59,0.08); }
    .ss-st--open  { color: #0B0F14; background: var(--bg-2); }
    .ss-st--over  { color: #8A021B; background: #FCE5EA; }
    .ss-st--disp  { color: #8A021B; background: transparent; border: 1px solid var(--accent); padding: 1px 7px; }
    .ss-st--draft { color: var(--fg-2); background: transparent; border: 1px dashed var(--rule-strong); padding: 1px 7px; }

    /* Active row + cell */
    tr.is-active-row td { background: #FFF7F8 !important; }
    tr.is-active-row td.ss-mono:first-of-type { background: #FFF7F8 !important; }
    td.is-active-cell {
      outline: 2px solid var(--accent);
      outline-offset: -2px;
      background: #fff !important;
      box-shadow: inset 0 0 0 3px rgba(228,2,45,0.08);
    }

    /* Footer */
    .ss-table tfoot td {
      position: sticky; bottom: 0;
      padding: 7px 10px;
      border-top: 1px solid var(--rule-strong);
      background: var(--bg-2);
      font-weight: 500;
      z-index: 2;
    }
    .ss-foot-label {
      font-family: var(--font-sans); font-size: 11.5px;
      color: var(--fg);
      letter-spacing: 0.04em;
    }
    .ss-foot-meta {
      font-family: var(--font-mono); font-size: 10.5px;
      color: var(--fg-2);
      letter-spacing: 0.08em; text-transform: uppercase;
      text-align: right;
    }

    /* Tabs + status bar */
    .ss-tabsbar {
      display: flex; align-items: stretch; justify-content: space-between;
      border-top: 1px solid var(--rule);
      background: var(--bg-2);
      gap: 0;
      min-height: 34px;
    }
    .ss-tabs {
      display: flex; gap: 0; overflow-x: auto;
      flex: 1 1 auto;
    }
    .ss-tabs::-webkit-scrollbar { height: 4px; }
    .ss-tab {
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--font-sans); font-size: 12px; font-weight: 500;
      padding: 8px 14px;
      background: transparent;
      border: 0; border-right: 1px solid var(--rule);
      color: var(--fg-2);
      cursor: pointer;
      white-space: nowrap;
      position: relative;
    }
    .ss-tab:hover { color: var(--fg); background: var(--bg); }
    .ss-tab.is-active {
      background: var(--bg); color: var(--fg);
    }
    .ss-tab.is-active::before {
      content: ""; position: absolute; top: 0; left: 0; right: 0;
      height: 2px; background: var(--accent);
    }
    .ss-tab__n {
      font-family: var(--font-mono); font-size: 10px;
      color: var(--fg-2);
      background: var(--bg-2);
      padding: 1px 5px; border-radius: 8px;
      letter-spacing: 0.04em;
    }
    .ss-tab.is-active .ss-tab__n { background: var(--bg-3); color: var(--fg); }
    .ss-tab__dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--accent);
    }
    .ss-tab__pill {
      color: var(--accent);
      font-size: 9px;
    }
    .ss-tab:first-child,
    .ss-tab--add {
      color: var(--fg-2);
      padding: 8px 12px;
      font-family: var(--font-mono); font-size: 14px; font-weight: 400;
    }

    /* Tab placement — top variant */
    .ss-tabsbar--top {
      border-top: 0;
      border-bottom: 1px solid var(--rule);
      background: var(--bg-2);
    }
    .ss-tabsbar--top .ss-tab.is-active::before {
      top: auto; bottom: 0;
    }
    .ss-tabsbar--top .ss-tab {
      border-right: 1px solid var(--rule);
      border-left: 0;
    }

    /* Bottom bar, status only (no tabs) — used when tabs are on top */
    .ss-tabsbar--status-only {
      justify-content: flex-end;
    }
    .ss-tabsbar--status-only .ss-status {
      border-left: 0;
    }

    /* Mini variant of the grid — for the compact demo */
    .ss-grid--mini { max-height: 260px; }
    .ss-wrap--mini { min-height: auto; }
    .ss-status {
      display: flex; align-items: center; gap: 0;
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2);
      border-left: 1px solid var(--rule);
      flex-shrink: 0;
    }
    .ss-status span {
      padding: 0 12px;
      border-right: 1px solid var(--rule);
      display: inline-flex; align-items: center;
      align-self: stretch;
      letter-spacing: 0.04em;
    }
    .ss-status span:last-child { border-right: 0; }
    .ss-status b { color: var(--fg); font-weight: 500; margin-left: 4px; }
    .ss-status__zoom {
      font-weight: 500;
      color: var(--fg) !important;
    }

    /* Dark theme overrides for sheet */
    [data-theme="dark"] .ss-st--paid { color: #5fd07a; background: rgba(95,208,122,0.08); }
    [data-theme="dark"] .ss-st--open { color: var(--fg); background: var(--bg-2); }
    [data-theme="dark"] .ss-st--over { color: #ff8fa3; background: rgba(228,2,45,0.2); }
    [data-theme="dark"] tr.is-active-row td,
    [data-theme="dark"] tr.is-active-row td.ss-mono:first-of-type { background: #2A1419 !important; }
    [data-theme="dark"] td.is-active-cell { background: #1A2230 !important; }
    [data-theme="dark"] .ss-fx-input:focus { background: var(--bg-2); }

    @media (max-width: 900px) {
      .ss-status { display: none; }
      .ss-memo { max-width: 160px; }
    }

    /* ============================================================
       CANDLESTICK / OHLC CHART
       ============================================================ */
    .ohlc {
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      position: relative;
    }
    .ohlc__head {
      display: flex; align-items: center; gap: 18px;
      padding: 14px 18px;
      border-bottom: 1px solid var(--rule);
      flex-wrap: wrap;
    }
    .ohlc__sym {
      font-family: var(--font-mono);
      font-size: 13px; font-weight: 500;
      letter-spacing: 0.06em;
      color: var(--fg);
    }
    .ohlc__sym small { color: var(--fg-2); font-weight: 400; margin-left: 6px; }
    .ohlc__price {
      font-family: var(--font-display);
      font-size: 28px; line-height: 1;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }
    .ohlc__delta {
      font-family: var(--font-mono);
      font-size: 12px;
      padding: 3px 8px; border-radius: 3px;
      background: var(--bg-2);
    }
    .ohlc__delta--down { color: var(--accent); background: #FCE5EA; }
    .ohlc__meta {
      margin-left: auto;
      display: flex; align-items: center; gap: 10px;
    }
    .ohlc__chart {
      padding: 18px 16px 8px;
      background: var(--bg);
      position: relative;
    }
    .ohlc__svg { width: 100%; height: auto; display: block; }

    .ohlc-candle__body--up   { fill: var(--fg);     stroke: var(--fg);     stroke-width: 1; }
    .ohlc-candle__body--down { fill: var(--accent); stroke: var(--accent); stroke-width: 1; }
    .ohlc-candle__body--flat { fill: var(--fg);     stroke: var(--fg);     stroke-width: 1; }
    .ohlc-candle__wick--up   { stroke: var(--fg);     stroke-width: 1; }
    .ohlc-candle__wick--down { stroke: var(--accent); stroke-width: 1; }
    .ohlc-candle__hit {
      fill: transparent; cursor: crosshair;
    }
    .ohlc-candle__hit:hover ~ .ohlc-candle__body--up,
    .ohlc-candle-group:hover .ohlc-candle__body--up,
    .ohlc-candle-group:hover .ohlc-candle__body--down {
      stroke-width: 2;
    }
    .ohlc-vol__bar--up   { fill: var(--fg);     opacity: 0.45; }
    .ohlc-vol__bar--down { fill: var(--accent); opacity: 0.45; }
    .ohlc-grid { stroke: var(--rule); stroke-width: 0.5; stroke-dasharray: 2 3; }
    .ohlc-axis { font-family: var(--font-mono); font-size: 10px; fill: var(--fg-2); letter-spacing: 0.06em; }
    .ohlc-axis--right { text-anchor: end; }
    .ohlc-crosshair { stroke: var(--fg); stroke-width: 0.5; stroke-dasharray: 3 3; opacity: 0; pointer-events: none; }
    .ohlc-crosshair.is-on { opacity: 0.5; }

    .ohlc__tooltip {
      position: absolute;
      background: var(--fg); color: var(--bg);
      padding: 10px 14px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 11px;
      line-height: 1.6;
      pointer-events: none;
      opacity: 0;
      transition: opacity .12s ease;
      min-width: 170px;
      box-shadow: var(--shadow-2);
      z-index: 3;
    }
    .ohlc__tooltip.is-on { opacity: 1; }
    .ohlc__tooltip b {
      font-family: var(--font-sans); color: var(--bg);
      font-weight: 500; font-size: 12px;
      display: block; margin-bottom: 6px;
      letter-spacing: 0.02em;
    }
    .ohlc__tooltip .tt-row {
      display: flex; justify-content: space-between; gap: 12px;
    }
    .ohlc__tooltip .tt-row span:first-child {
      color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.1em;
    }
    .ohlc__tooltip .tt-row span:last-child {
      color: var(--bg); font-variant-numeric: tabular-nums;
    }
    .ohlc__tooltip .tt-row .up { color: #9adeb4; }
    .ohlc__tooltip .tt-row .dn { color: #ff8fa3; }
    .ohlc__foot {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 18px;
      border-top: 1px solid var(--rule);
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-2);
    }

    /* ============================================================
       TREE GRID — expandable P&L
       ============================================================ */
    .tree {
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
      font-family: var(--font-sans);
    }
    .tree__table { width: 100%; border-collapse: collapse; }
    .tree__table thead th {
      text-align: left;
      padding: 10px 14px;
      font-family: var(--font-mono); font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--fg-2);
      border-bottom: 1px solid var(--rule-strong);
      background: var(--bg-2);
    }
    .tree__table thead th.tree-num { text-align: right; }
    .tree__row { border-bottom: 1px solid var(--rule); }
    .tree__row:last-child { border-bottom: 0; }
    .tree__row:hover td { background: var(--bg-2); }
    .tree__cell { padding: 8px 14px; font-size: 13px; vertical-align: middle; }
    .tree__name {
      display: flex; align-items: center; gap: 6px;
      color: var(--fg);
    }
    .tree__chev {
      width: 18px; height: 18px;
      border: 0; background: transparent;
      cursor: pointer;
      display: grid; place-items: center;
      color: var(--fg-2);
      padding: 0; border-radius: 2px;
      font-family: var(--font-mono); font-size: 10px;
      transition: transform .15s ease, background .12s;
    }
    .tree__chev:hover { background: var(--bg-3); color: var(--fg); }
    .tree__chev[aria-expanded="true"] { transform: rotate(90deg); color: var(--fg); }
    .tree__leaf { width: 18px; display: inline-block; }
    .tree__group-label { font-weight: 500; color: var(--fg); }
    .tree__total-label { font-weight: 500; font-style: italic; color: var(--fg); }
    .tree__num {
      text-align: right;
      font-variant-numeric: tabular-nums;
      font-family: var(--font-mono);
      font-size: 12.5px;
      white-space: nowrap;
      color: var(--fg);
    }
    .tree__delta { font-size: 11px; }
    .tree__delta--up { color: var(--fg); }
    .tree__delta--down { color: var(--accent); }
    .tree__row--total td { background: var(--bg-2); font-weight: 500; border-top: 1px solid var(--rule-strong); }
    .tree__row--hidden { display: none; }
    .tree__row--group td { background: var(--bg); }
    .tree__indent-1 { padding-left: 34px; }
    .tree__indent-2 { padding-left: 60px; }
    .tree__indent-3 { padding-left: 86px; }
    .tree__sparkline { width: 80px; height: 20px; }

    /* ============================================================
       WATERFALL CHART
       ============================================================ */
    .waterfall {
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      padding: 24px;
    }
    .waterfall__title {
      display: flex; justify-content: space-between; align-items: baseline;
      margin-bottom: 16px;
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .waterfall__title b { color: var(--fg); font-weight: 500; }
    .waterfall__svg { width: 100%; height: auto; display: block; }
    .wf-bar--base { fill: var(--fg); opacity: 0.85; }
    .wf-bar--pos  { fill: var(--fg); }
    .wf-bar--neg  { fill: var(--accent); }
    .wf-bar--end  { fill: var(--fg); opacity: 0.85; }
    .wf-bar:hover { opacity: 1; }
    .wf-connector { stroke: var(--rule-strong); stroke-width: 0.75; stroke-dasharray: 2 2; }
    .wf-label {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.06em;
      fill: var(--fg);
    }
    .wf-label--cat {
      font-family: var(--font-sans); font-size: 11px;
      font-weight: 500;
      letter-spacing: 0; text-transform: none;
      fill: var(--fg);
    }
    .wf-label--delta--pos { fill: var(--fg); }
    .wf-label--delta--neg { fill: var(--accent); }
    .wf-label--muted { fill: var(--fg-2); }
    .wf-baseline { stroke: var(--rule); stroke-width: 0.5; stroke-dasharray: 2 3; }

    /* ============================================================
       HEATMAP — risk matrix
       ============================================================ */
    .heatmap {
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      padding: 24px;
      overflow-x: auto;
    }
    .heatmap__title {
      display: flex; justify-content: space-between; align-items: baseline;
      margin-bottom: 18px;
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .heatmap__title b { color: var(--fg); font-weight: 500; }
    .heatmap__grid {
      display: grid;
      grid-template-columns: 140px repeat(5, minmax(76px, 1fr));
      gap: 3px;
      align-items: stretch;
    }
    .heatmap__corner {
      display: flex; align-items: flex-end; justify-content: flex-end;
      padding: 6px 10px;
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--fg-2);
      position: relative;
      border-bottom: 1px solid var(--rule);
    }
    .heatmap__corner::after {
      content: "→"; position: absolute; right: 10px; bottom: 8px; color: var(--fg-2);
      display: none;
    }
    .heatmap__colhead {
      font-family: var(--font-sans); font-size: 11px;
      padding: 6px 8px 10px;
      text-align: center;
      color: var(--fg-2);
      border-bottom: 1px solid var(--rule);
      line-height: 1.3;
    }
    .heatmap__colhead b { color: var(--fg); font-weight: 500; display: block; font-size: 12px; }
    .heatmap__rowhead {
      font-family: var(--font-sans); font-size: 11px;
      padding: 12px 10px;
      text-align: right;
      color: var(--fg-2);
      border-right: 1px solid var(--rule);
      line-height: 1.3;
    }
    .heatmap__rowhead b { color: var(--fg); font-weight: 500; display: block; font-size: 12px; }
    .heatmap__cell {
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      aspect-ratio: 1.6/1;
      border-radius: 3px;
      font-family: var(--font-mono);
      font-size: 13px; font-weight: 500;
      color: var(--fg);
      cursor: pointer;
      transition: transform .12s ease, box-shadow .12s;
      position: relative;
    }
    .heatmap__cell:hover {
      transform: scale(1.04);
      z-index: 2;
      box-shadow: var(--shadow-2);
    }
    .heatmap__cell small {
      font-family: var(--font-sans); font-size: 9px; font-weight: 400;
      letter-spacing: 0.1em; text-transform: uppercase; color: inherit; opacity: 0.7;
      margin-top: 2px;
    }
    /* 5 intensity steps from soft → accent */
    .heatmap__cell--1 { background: #F6F4F0; color: var(--fg); }
    .heatmap__cell--2 { background: #FCE5EA; color: #8A021B; }
    .heatmap__cell--3 { background: #F5A8B7; color: #60010F; }
    .heatmap__cell--4 { background: #E4022D; color: #fff; }
    .heatmap__cell--5 { background: #8A021B; color: #fff; }
    [data-theme="dark"] .heatmap__cell--1 { background: #1A2230; color: var(--fg); }
    [data-theme="dark"] .heatmap__cell--2 { background: #3A1820; }
    [data-theme="dark"] .heatmap__cell--3 { background: #6B1528; }
    .heatmap__legend {
      display: flex; align-items: center; gap: 14px;
      margin-top: 18px;
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg-2);
    }
    .heatmap__legend-scale { display: flex; gap: 2px; }
    .heatmap__legend-scale span {
      width: 18px; height: 10px; border-radius: 2px;
    }

    /* ============================================================
       FORECAST / SCENARIO TOGGLES
       ============================================================ */
    .fc {
      background: var(--bg);
      border: 1px solid var(--rule);
      border-radius: var(--r-3);
      overflow: hidden;
    }
    .fc__head {
      display: flex; align-items: center; gap: 18px;
      padding: 14px 18px;
      border-bottom: 1px solid var(--rule);
      flex-wrap: wrap;
    }
    .fc__title {
      font-family: var(--font-display);
      font-size: 1.125rem; letter-spacing: -0.01em; line-height: 1.2;
      color: var(--fg);
    }
    .fc__title em { font-style: italic; color: var(--accent); }
    .fc__scenarios { margin-left: auto; }
    .fc__chart { padding: 20px; }
    .fc__svg { width: 100%; height: auto; display: block; }
    .fc-line { fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
    .fc-line--base  { stroke: var(--fg);     opacity: 0.3; stroke-width: 1.25; }
    .fc-line--best  { stroke: var(--fg);     opacity: 0.3; stroke-width: 1.25; }
    .fc-line--worst { stroke: var(--accent); opacity: 0.3; stroke-width: 1.25; }
    .fc-line.is-active { opacity: 1; stroke-width: 2; }
    .fc-band {
      opacity: 0;
      transition: opacity .22s ease;
    }
    .fc-band.is-active { opacity: 0.08; }
    .fc-actual { stroke: var(--fg); stroke-width: 2; }
    .fc-actual-dot { fill: var(--fg); }
    .fc-divider { stroke: var(--rule-strong); stroke-dasharray: 3 3; stroke-width: 0.75; }
    .fc-axis { font-family: var(--font-mono); font-size: 10px; fill: var(--fg-2); letter-spacing: 0.06em; }
    .fc-grid { stroke: var(--rule); stroke-width: 0.5; stroke-dasharray: 2 3; }
    .fc__kpis {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding: 0 20px 20px;
    }
    @media (max-width: 700px) { .fc__kpis { grid-template-columns: 1fr; } }
    .fc__kpi {
      border: 1px solid var(--rule);
      border-radius: 4px;
      padding: 12px 14px;
      display: flex; flex-direction: column; gap: 4px;
      transition: border-color .15s, background .15s;
    }
    .fc__kpi.is-active { border-color: var(--accent); background: #FFF7F8; }
    [data-theme="dark"] .fc__kpi.is-active { background: #2A1419; }
    .fc__kpi-label {
      font-family: var(--font-mono); font-size: 10px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--fg-2);
    }
    .fc__kpi-num {
      font-family: var(--font-display);
      font-size: 1.5rem; line-height: 1;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--fg);
    }
    .fc__kpi-num small { font-size: 0.6em; color: var(--fg-2); letter-spacing: 0; margin-left: 2px; }
    .fc__kpi-delta {
      font-family: var(--font-mono); font-size: 11px;
      color: var(--fg-2);
      font-variant-numeric: tabular-nums;
    }
    .fc__kpi-delta.neg { color: var(--accent); }
  </style>

  <!-- ============ HERO ============ -->
  <section class="db-hero">
    <div class="container">
      <span class="eyebrow eyebrow--accent">06 · Dashboards</span>
      <h1>Numbers carry the <em>weight</em>.</h1>
      <p class="db-hero__lede">
        Finance and ops dashboards demand density without noise. This module is the parts bin for data-heavy surfaces
        &mdash; KPI tiles, sparklines, deltas, tables, shells. Tight padding, tabular numerals, serif reserved for one
        hero number per tile, red earned by alerts and losses only.
      </p>

      <nav class="db-index" aria-label="Dashboards index">
        <a href="#db-kpi" data-db-jump="db-kpi">KPI tiles</a>
        <a href="#db-delta" data-db-jump="db-delta">Deltas &amp; sparklines</a>
        <a href="#db-table" data-db-jump="db-table">Data tables</a>
        <a href="#db-status" data-db-jump="db-status">Status, meters, alerts</a>
        <a href="#db-toolbar" data-db-jump="db-toolbar">Toolbars &amp; filters</a>
        <a href="#db-sheet" data-db-jump="db-sheet">Spreadsheet grid</a>
        <a href="#db-ohlc" data-db-jump="db-ohlc">Candlestick / OHLC</a>
        <a href="#db-tree" data-db-jump="db-tree">Tree grid</a>
        <a href="#db-waterfall" data-db-jump="db-waterfall">Waterfall</a>
        <a href="#db-heatmap" data-db-jump="db-heatmap">Heatmap</a>
        <a href="#db-forecast" data-db-jump="db-forecast">Forecast &amp; scenarios</a>
        <a href="#db-shell" data-db-jump="db-shell">Full shell example</a>
      </nav>
    </div>
  </section>

  <!-- ============ PRINCIPLES ============ -->
  <section class="db-section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Rules for the dense surface</h2>
        <p class="section-head__body">
          Dashboards earn their own rules. The editorial register stays &mdash; but the pace changes: information per square
          inch goes up, white space goes down, and the typographic hierarchy gets flatter.
        </p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">01</b> &nbsp; One serif number per tile &mdash; the headline. Everything else is sans or mono.</span><span class="token-row__meta">Typography</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">02</b> &nbsp; Tabular-nums on every figure that sits in a column.</span><span class="token-row__meta">Typography</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">03</b> &nbsp; Red is reserved for losses, alerts, and critical thresholds &mdash; never decoration.</span><span class="token-row__meta">Color</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">04</b> &nbsp; Positive deltas use ink, not green. The convention loses; the brand wins.</span><span class="token-row__meta">Color</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">05</b> &nbsp; Spacing inside a tile is 12&ndash;16px. Gaps between tiles are 12&ndash;16px. Not more.</span><span class="token-row__meta">Spacing</span></li>
        <li class="token-row"><span class="token-row__label"><b style="color:var(--fg)">06</b> &nbsp; Every number earns a window. &ldquo;$4.2M&rdquo; without &ldquo;trailing 30d&rdquo; is half a figure.</span><span class="token-row__meta">Labeling</span></li>
      </ul>
    </div>
  </section>

  <!-- ============ KPI TILES ============ -->
  <section class="db-section" id="db-kpi">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">KPI tiles</h2>
        <p class="section-head__body">The workhorse. One metric, one number, one delta, one window. Four densities for different grid constraints.</p>
      </div>

      <div class="db-spec" style="margin-bottom:16px;">
        <div class="db-spec__head"><span>Default · 4-up hero strip</span><span>.kpi</span></div>
        <div class="db-spec__stage db-spec__stage--warm">
          <div class="db-grid-4">
            <div class="kpi">
              <div class="kpi__label">Revenue <span class="delta delta--plain">+4.2%</span></div>
              <div class="kpi__num">$4.82<small>M</small></div>
              <div class="kpi__foot"><span>vs. $4.63M</span><span>TRAILING 30D</span></div>
            </div>
            <div class="kpi">
              <div class="kpi__label">Gross margin <span class="delta delta--plain">+120<small>BPS</small></span></div>
              <div class="kpi__num">62.4<small>%</small></div>
              <div class="kpi__foot"><span>vs. 61.2%</span><span>QTD</span></div>
            </div>
            <div class="kpi">
              <div class="kpi__label">Burn <span class="delta delta--down delta--plain">+8.3%</span></div>
              <div class="kpi__num kpi__num--accent">$1.14<small>M</small></div>
              <div class="kpi__foot"><span>vs. $1.05M</span><span>MONTH</span></div>
            </div>
            <div class="kpi">
              <div class="kpi__label">Runway <span class="delta delta--down delta--plain">&minus;2 MO</span></div>
              <div class="kpi__num">14<small>mo</small></div>
              <div class="kpi__foot"><span>vs. 16 mo</span><span>AT CURRENT BURN</span></div>
            </div>
          </div>
        </div>
        <div class="db-spec__foot"><b>Use &mdash;</b> Top of every finance dashboard. Four is the ceiling &mdash; six breaks scanning.</div>
      </div>

      <div class="db-grid-2">
        <div class="db-spec">
          <div class="db-spec__head"><span>With sparkline</span><span>.kpi + .sparkline</span></div>
          <div class="db-spec__stage db-spec__stage--warm">
            <div class="db-grid-2">
              <div class="kpi">
                <div class="kpi__label">MRR <span class="delta delta--plain">+6.1%</span></div>
                <div class="kpi__num">$842<small>K</small></div>
                <svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none">
                  <path class="area" d="M0,24 L12,22 L24,20 L36,21 L48,18 L60,16 L72,14 L84,12 L96,10 L108,8 L120,6 L120,32 L0,32 Z"/>
                  <path class="line" d="M0,24 L12,22 L24,20 L36,21 L48,18 L60,16 L72,14 L84,12 L96,10 L108,8 L120,6"/>
                  <circle class="sparkline__dot" cx="120" cy="6" r="2"/>
                </svg>
                <div class="kpi__foot"><span>12-week trend</span><span>USD</span></div>
              </div>
              <div class="kpi">
                <div class="kpi__label">Churn <span class="delta delta--down delta--plain">+0.4<small>PP</small></span></div>
                <div class="kpi__num kpi__num--accent">3.8<small>%</small></div>
                <svg class="sparkline sparkline--accent" viewBox="0 0 120 32" preserveAspectRatio="none">
                  <path class="area" d="M0,14 L12,12 L24,15 L36,13 L48,16 L60,14 L72,18 L84,16 L96,20 L108,19 L120,22 L120,32 L0,32 Z"/>
                  <path class="line" d="M0,14 L12,12 L24,15 L36,13 L48,16 L60,14 L72,18 L84,16 L96,20 L108,19 L120,22"/>
                  <circle class="sparkline__dot" cx="120" cy="22" r="2"/>
                </svg>
                <div class="kpi__foot"><span>12-week trend</span><span>ALERT</span></div>
              </div>
            </div>
          </div>
          <div class="db-spec__foot"><b>Sparkline &mdash;</b> 32px tall. Line is 1.25px. Last point gets a 2px dot. Accent color only for red-alert metrics.</div>
        </div>

        <div class="db-spec">
          <div class="db-spec__head"><span>Compare (now vs. prev)</span><span>.kpi + .compare</span></div>
          <div class="db-spec__stage db-spec__stage--warm">
            <div class="db-grid-2">
              <div class="kpi">
                <div class="kpi__label">AR balance</div>
                <div class="kpi__num">$612<small>K</small></div>
                <div class="compare">
                  <span class="compare__now">42 open invoices</span>
                  <span class="compare__prev">prev month: 38</span>
                </div>
                <div class="kpi__foot"><span>Overdue</span><span>7 &middot; $84K</span></div>
              </div>
              <div class="kpi">
                <div class="kpi__label">DSO</div>
                <div class="kpi__num">38<small>d</small></div>
                <div class="meter"><div class="meter__fill" style="width:63%"></div></div>
                <div class="kpi__foot"><span>Target &lt; 45d</span><span>ON TRACK</span></div>
              </div>
            </div>
          </div>
          <div class="db-spec__foot"><b>Compare &mdash;</b> Use when the delta isn&rsquo;t a percent. &ldquo;42 open, prev 38&rdquo; reads faster than &ldquo;+10.5%&rdquo; on raw counts.</div>
        </div>
      </div>

      <div class="db-spec" style="margin-top:16px;">
        <div class="db-spec__head"><span>Compact — 8-up strip</span><span>.kpi.kpi--compact</span></div>
        <div class="db-spec__stage db-spec__stage--warm" style="padding: 14px;">
          <div class="db-grid-4" style="gap:8px;">
            <div class="kpi kpi--compact"><div class="kpi__label">ACV</div><div class="kpi__num">$48.2K</div></div>
            <div class="kpi kpi--compact"><div class="kpi__label">LTV:CAC</div><div class="kpi__num">4.1<small>×</small></div></div>
            <div class="kpi kpi--compact"><div class="kpi__label">CAC Payback</div><div class="kpi__num">11<small>mo</small></div></div>
            <div class="kpi kpi--compact"><div class="kpi__label">Net Dollar Ret.</div><div class="kpi__num">118<small>%</small></div></div>
            <div class="kpi kpi--compact"><div class="kpi__label">Rule of 40</div><div class="kpi__num">38</div></div>
            <div class="kpi kpi--compact"><div class="kpi__label">Quick Ratio</div><div class="kpi__num">3.6</div></div>
            <div class="kpi kpi--compact"><div class="kpi__label">Gross Margin</div><div class="kpi__num">62<small>%</small></div></div>
            <div class="kpi kpi--compact"><div class="kpi__label">OpEx / Rev</div><div class="kpi__num">41<small>%</small></div></div>
          </div>
        </div>
        <div class="db-spec__foot"><b>Compact &mdash;</b> For index rows where 6&ndash;12 tiles need to live together. Sans for numbers, no serif hero.</div>
      </div>
    </div>
  </section>

  <!-- ============ DELTAS & SPARKS ============ -->
  <section class="db-section" id="db-delta">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Deltas &amp; sparklines</h2>
        <p class="section-head__body">Small indicators, high frequency. Deltas are mono and tight &mdash; they read at a glance, never compete with the headline number.</p>
      </div>

      <div class="db-grid-2">
        <div class="db-spec">
          <div class="db-spec__head"><span>Delta chip</span><span>.delta</span></div>
          <div class="db-spec__stage">
            <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
              <span class="delta">+4.2%</span>
              <span class="delta">+120 bps</span>
              <span class="delta delta--down">&minus;8.3%</span>
              <span class="delta delta--down">&minus;$84K</span>
              <span class="delta delta--flat">0.0%</span>
              <span class="delta delta--plain">+1.4%</span>
              <span class="delta delta--down delta--plain">&minus;2 mo</span>
            </div>
          </div>
          <div class="db-spec__foot"><b>Rule &mdash;</b> Up arrow ink. Down arrow red (alert). Flat em-dash muted. <b>Plain</b> strips the chip background when sitting inside a label.</div>
        </div>

        <div class="db-spec">
          <div class="db-spec__head"><span>Sparkline variants</span><span>.sparkline</span></div>
          <div class="db-spec__stage">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
              <div>
                <div style="font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); letter-spacing:.1em; text-transform:uppercase; margin-bottom:4px;">Rev, 12w</div>
                <svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none">
                  <path class="area" d="M0,24 L12,22 L24,20 L36,21 L48,18 L60,16 L72,14 L84,12 L96,10 L108,8 L120,6 L120,32 L0,32 Z"/>
                  <path class="line" d="M0,24 L12,22 L24,20 L36,21 L48,18 L60,16 L72,14 L84,12 L96,10 L108,8 L120,6"/>
                  <circle class="sparkline__dot" cx="120" cy="6" r="2"/>
                </svg>
              </div>
              <div>
                <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent); letter-spacing:.1em; text-transform:uppercase; margin-bottom:4px;">Burn, 12w</div>
                <svg class="sparkline sparkline--accent" viewBox="0 0 120 32" preserveAspectRatio="none">
                  <path class="area" d="M0,22 L12,20 L24,18 L36,15 L48,16 L60,12 L72,10 L84,9 L96,8 L108,6 L120,4 L120,32 L0,32 Z"/>
                  <path class="line" d="M0,22 L12,20 L24,18 L36,15 L48,16 L60,12 L72,10 L84,9 L96,8 L108,6 L120,4"/>
                  <circle class="sparkline__dot" cx="120" cy="4" r="2"/>
                </svg>
              </div>
              <div>
                <div style="font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); letter-spacing:.1em; text-transform:uppercase; margin-bottom:4px;">Cash, 6mo</div>
                <svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none">
                  <path class="line" d="M0,14 L20,12 L40,18 L60,10 L80,16 L100,8 L120,14"/>
                </svg>
              </div>
              <div>
                <div style="font-family: var(--font-mono); font-size: 11px; color: var(--fg-2); letter-spacing:.1em; text-transform:uppercase; margin-bottom:4px;">Head&shy;count</div>
                <svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none">
                  <path class="line" d="M0,28 L24,28 L24,22 L48,22 L48,18 L72,18 L72,14 L96,14 L96,8 L120,8"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="db-spec__foot"><b>Use &mdash;</b> Trend glance only. If the shape matters more than &ldquo;up/down&rdquo;, use a real chart &mdash; not a sparkline.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ TABLES ============ -->
  <section class="db-section" id="db-table">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Data tables</h2>
        <p class="section-head__body">Finance-grade. Right-aligned numerals, mono column, soft zebra, bold footer. One row per thing, no collapsed cells.</p>
      </div>

      <div class="db-spec" style="margin-bottom:16px;">
        <div class="db-spec__head"><span>P&amp;L summary</span><span>.db-table</span></div>
        <div class="db-spec__stage db-spec__stage--flush">
          <table class="db-table">
            <thead>
              <tr>
                <th>Line item</th>
                <th class="num">Oct</th>
                <th class="num">Nov</th>
                <th class="num">Dec</th>
                <th class="num">QTD</th>
                <th class="num">Δ vs. plan</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue &mdash; Subscription<span class="secondary muted">Recurring ARR book</span></td>
                <td class="num">$2.41M</td>
                <td class="num">$2.56M</td>
                <td class="num">$2.68M</td>
                <td class="num">$7.65M</td>
                <td class="num">+$120K</td>
                <td style="width:120px"><svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none"><path class="line" d="M0,22 L30,18 L60,14 L90,10 L120,6"/></svg></td>
              </tr>
              <tr>
                <td>Revenue &mdash; Services</td>
                <td class="num">$840K</td>
                <td class="num">$790K</td>
                <td class="num">$720K</td>
                <td class="num">$2.35M</td>
                <td class="num neg">&minus;$210K</td>
                <td><svg class="sparkline sparkline--accent" viewBox="0 0 120 32" preserveAspectRatio="none"><path class="line" d="M0,10 L30,12 L60,16 L90,19 L120,22"/></svg></td>
              </tr>
              <tr>
                <td>COGS<span class="secondary muted">Hosting + support</span></td>
                <td class="num">$1.12M</td>
                <td class="num">$1.18M</td>
                <td class="num">$1.21M</td>
                <td class="num">$3.51M</td>
                <td class="num">+$40K</td>
                <td><svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none"><path class="line" d="M0,20 L40,18 L80,15 L120,14"/></svg></td>
              </tr>
              <tr>
                <td>Gross profit</td>
                <td class="num">$2.13M</td>
                <td class="num">$2.17M</td>
                <td class="num">$2.17M</td>
                <td class="num">$6.47M</td>
                <td class="num">&minus;$130K</td>
                <td><svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none"><path class="line" d="M0,14 L40,14 L80,14 L120,14"/></svg></td>
              </tr>
              <tr>
                <td>OpEx &mdash; Sales &amp; Marketing</td>
                <td class="num">$680K</td>
                <td class="num">$720K</td>
                <td class="num">$760K</td>
                <td class="num">$2.16M</td>
                <td class="num neg">&minus;$160K</td>
                <td><svg class="sparkline sparkline--accent" viewBox="0 0 120 32" preserveAspectRatio="none"><path class="line" d="M0,20 L40,16 L80,12 L120,8"/></svg></td>
              </tr>
              <tr>
                <td>OpEx &mdash; R&amp;D</td>
                <td class="num">$540K</td>
                <td class="num">$560K</td>
                <td class="num">$580K</td>
                <td class="num">$1.68M</td>
                <td class="num">&minus;$20K</td>
                <td><svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none"><path class="line" d="M0,16 L40,14 L80,12 L120,10"/></svg></td>
              </tr>
              <tr>
                <td>OpEx &mdash; G&amp;A</td>
                <td class="num">$220K</td>
                <td class="num">$230K</td>
                <td class="num">$240K</td>
                <td class="num">$690K</td>
                <td class="num">+$10K</td>
                <td><svg class="sparkline" viewBox="0 0 120 32" preserveAspectRatio="none"><path class="line" d="M0,14 L40,13 L80,12 L120,11"/></svg></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>EBITDA</td>
                <td class="num">$690K</td>
                <td class="num">$660K</td>
                <td class="num">$590K</td>
                <td class="num">$1.94M</td>
                <td class="num neg">&minus;$320K</td>
                <td><svg class="sparkline sparkline--accent" viewBox="0 0 120 32" preserveAspectRatio="none"><path class="line" d="M0,8 L40,12 L80,16 L120,22"/></svg></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="db-spec__foot"><b>Negative values &mdash;</b> Minus sign, not parens. Red ink when the number is unfavorable (cost over plan, revenue under plan). Never on headers.</div>
      </div>

      <div class="db-spec">
        <div class="db-spec__head"><span>Market watch · zebra rows</span><span>.db-table.db-table--zebra</span></div>
        <div class="db-spec__stage db-spec__stage--flush">
          <table class="db-table db-table--zebra">
            <thead>
              <tr>
                <th style="width:40px;"></th>
                <th>Position</th>
                <th class="num">Last</th>
                <th class="num">Chg</th>
                <th class="num">%</th>
                <th class="num">Volume</th>
                <th>Today</th>
                <th style="width:80px;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="dot dot--live"></span></td>
                <td><span class="ticker">OBX</span><span class="secondary muted">Oslo benchmark</span></td>
                <td class="num">$142.40</td>
                <td class="num">+$3.20</td>
                <td class="num">+2.30%</td>
                <td class="num">1.42M</td>
                <td><svg class="sparkline" viewBox="0 0 80 24" preserveAspectRatio="none"><path class="line" d="M0,18 L20,15 L40,12 L60,8 L80,4"/></svg></td>
                <td><span class="k-badge k-badge--outline k-badge--no-dot" style="font-size:10px">LONG</span></td>
              </tr>
              <tr>
                <td><span class="dot dot--alert"></span></td>
                <td><span class="ticker">KLW.EU</span><span class="secondary muted">Kilowott Indx Fund</span></td>
                <td class="num">$88.12</td>
                <td class="num neg">&minus;$4.88</td>
                <td class="num neg">&minus;5.25%</td>
                <td class="num">3.80M</td>
                <td><svg class="sparkline sparkline--accent" viewBox="0 0 80 24" preserveAspectRatio="none"><path class="line" d="M0,6 L20,10 L40,14 L60,18 L80,22"/></svg></td>
                <td><span class="k-badge k-badge--soft" style="font-size:10px; background:#FCE5EA; color:#8A021B;">REVIEW</span></td>
              </tr>
              <tr>
                <td><span class="dot dot--live"></span></td>
                <td><span class="ticker">ENRG.X</span><span class="secondary muted">Energy composite</span></td>
                <td class="num">$54.90</td>
                <td class="num">+$0.14</td>
                <td class="num">+0.26%</td>
                <td class="num">920K</td>
                <td><svg class="sparkline" viewBox="0 0 80 24" preserveAspectRatio="none"><path class="line" d="M0,12 L20,11 L40,12 L60,10 L80,11"/></svg></td>
                <td><span class="k-badge k-badge--outline k-badge--no-dot" style="font-size:10px">HOLD</span></td>
              </tr>
              <tr>
                <td><span class="dot dot--idle"></span></td>
                <td><span class="ticker">MSCI.WR</span><span class="secondary muted">Global equities</span></td>
                <td class="num">$318.04</td>
                <td class="num">+$1.06</td>
                <td class="num">+0.33%</td>
                <td class="num">2.10M</td>
                <td><svg class="sparkline" viewBox="0 0 80 24" preserveAspectRatio="none"><path class="line" d="M0,14 L20,13 L40,11 L60,10 L80,9"/></svg></td>
                <td><span class="k-badge k-badge--outline k-badge--no-dot" style="font-size:10px">BENCH</span></td>
              </tr>
              <tr>
                <td><span class="dot dot--paused"></span></td>
                <td><span class="ticker">CRUDE.Q</span><span class="secondary muted">WTI quarterly</span></td>
                <td class="num">$78.32</td>
                <td class="num">&mdash;</td>
                <td class="num">&mdash;</td>
                <td class="num muted">&mdash;</td>
                <td class="muted" style="font-family:var(--font-mono); font-size:11px;">market closed</td>
                <td><span class="k-badge k-badge--outline k-badge--no-dot" style="font-size:10px">PAUSED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="db-spec__foot"><b>Status dot &mdash;</b> Live (green pulse), alert (red pulse), idle (muted), paused (hollow). One column, 6px, never bigger.</div>
      </div>
    </div>
  </section>

  <!-- ============ STATUS / METERS / ALERTS ============ -->
  <section class="db-section" id="db-status">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Status, meters, alerts</h2>
        <p class="section-head__body">Low-frequency but high-impact. The signals that earn red.</p>
      </div>

      <div class="db-grid-3">
        <div class="db-spec">
          <div class="db-spec__head"><span>Meters</span><span>.meter</span></div>
          <div class="db-spec__stage">
            <div style="display:flex; flex-direction:column; gap:14px;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:12px;"><span>Q4 revenue plan</span><span class="ticker">78%</span></div>
                <div class="meter"><div class="meter__fill" style="width:78%"></div></div>
              </div>
              <div>
                <div style="display:flex; justify-content:space-between; font-size:12px;"><span>Hiring plan</span><span class="ticker">112%</span></div>
                <div class="meter"><div class="meter__fill" style="width:100%"></div></div>
              </div>
              <div>
                <div style="display:flex; justify-content:space-between; font-size:12px;"><span>Cash reserve min</span><span class="ticker" style="color:var(--accent)">42%</span></div>
                <div class="meter"><div class="meter__fill meter__fill--accent" style="width:42%"></div></div>
              </div>
              <div>
                <div style="display:flex; justify-content:space-between; font-size:12px;"><span>Budget vs. actual</span><span class="ticker">$1.14M / $1.05M</span></div>
                <div class="meter meter--vs">
                  <div class="fill" style="width:109%"></div>
                  <div class="target" style="left:100%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="db-spec__foot"><b>Thickness &mdash;</b> 4px default, 2px dense. Target line = 2px ink tick at 100%.</div>
        </div>

        <div class="db-spec">
          <div class="db-spec__head"><span>Status dots</span><span>.dot</span></div>
          <div class="db-spec__stage">
            <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
              <div><span class="dot dot--live"></span> Live feed &mdash; 3 clusters</div>
              <div><span class="dot dot--alert"></span> Alert &mdash; ingestion lag 14m</div>
              <div><span class="dot dot--idle"></span> Idle &mdash; no new events</div>
              <div><span class="dot dot--paused"></span> Paused &mdash; manual hold</div>
            </div>
          </div>
          <div class="db-spec__foot"><b>Pulse &mdash;</b> Alert pulses 1.6s. Never pulse more than one state on a view.</div>
        </div>

        <div class="db-spec">
          <div class="db-spec__head"><span>Alert banner</span><span>.db-alert</span></div>
          <div class="db-spec__stage">
            <div style="display:flex; flex-direction:column; gap:10px;">
              <div class="db-alert">
                <span class="dot dot--alert" style="margin-right:0"></span>
                <span><b>Runway breach risk.</b> Current burn puts reserves under policy floor in 11 weeks.</span>
                <button class="db-alert__dismiss" aria-label="Dismiss"><i data-lucide="x"></i></button>
              </div>
              <div class="db-alert" style="background:var(--bg-2); color:var(--fg); border-color:var(--rule-strong);">
                <span class="dot dot--idle" style="margin-right:0"></span>
                <span><b>Notice.</b> Q3 close pending 2 approvals &mdash; finance ops lead.</span>
                <button class="db-alert__dismiss" aria-label="Dismiss" style="color:var(--fg-2)"><i data-lucide="x"></i></button>
              </div>
            </div>
          </div>
          <div class="db-spec__foot"><b>Red banner &mdash;</b> Breach, miss, or data outage. Everything else is the muted variant.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ TOOLBAR / FILTERS ============ -->
  <section class="db-section" id="db-toolbar">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Toolbars &amp; filters</h2>
        <p class="section-head__body">Dense controls. Segmented switches for view, small selects for scope, icon buttons for actions.</p>
      </div>

      <div class="db-spec">
        <div class="db-spec__head"><span>Dashboard toolbar</span><span>.db-bar</span></div>
        <div class="db-spec__stage db-spec__stage--warm">
          <div class="db-bar">
            <input class="db-input" placeholder="Search positions, tickers, lines…" style="flex: 1 1 240px; min-width: 200px;">
            <select class="db-input" style="max-width:140px">
              <option>All portfolios</option>
              <option>Kilowott Fund I</option>
              <option>Operating</option>
            </select>
            <div class="db-seg">
              <button>1D</button>
              <button>1W</button>
              <button class="is-on">1M</button>
              <button>QTD</button>
              <button>YTD</button>
            </div>
            <div class="db-seg">
              <button class="is-on">Table</button>
              <button>Grid</button>
              <button>Chart</button>
            </div>
            <div style="margin-left:auto; display:flex; gap:6px;">
              <button class="db-iconbtn" title="Refresh"><i data-lucide="rotate-cw"></i></button>
              <button class="db-iconbtn" title="Export"><i data-lucide="download"></i></button>
              <button class="db-iconbtn db-iconbtn--accent" title="Add"><i data-lucide="plus"></i></button>
            </div>
          </div>
        </div>
        <div class="db-spec__foot"><b>Rule &mdash;</b> One row, wraps on narrow. Search left, scope center, view toggles right-center, primary action far right.</div>
      </div>
    </div>
  </section>

  <!-- ============ SPREADSHEET GRID ============ -->
  <section class="db-section" id="db-sheet">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Spreadsheet grid</h2>
        <p class="section-head__body">
          Full data surface &mdash; formula bar, filter chips, sortable headers, sticky row/column freeze,
          active-cell state, footer totals, sheet tabs. The workbook idiom, rendered in the Kilowott register.
        </p>
      </div>

      <div class="db-spec">
        <div class="db-spec__head">
          <span>Campaigns ledger · Q1</span>
          <span>.ss-wrap</span>
        </div>
        <div class="db-spec__stage db-spec__stage--flush">
          <div class="ss-wrap">

            <!-- Toolbar -->
            <div class="ss-toolbar">
              <div class="ss-seg">
                <button title="Cut"><i data-lucide="scissors"></i></button>
                <button title="Copy"><i data-lucide="copy"></i></button>
                <button title="Paste"><i data-lucide="clipboard"></i></button>
              </div>
              <div class="ss-tb-sep"></div>
              <div class="ss-seg">
                <button title="Bold"><i data-lucide="bold"></i></button>
                <button title="Italic"><i data-lucide="italic"></i></button>
                <button title="Underline"><i data-lucide="underline"></i></button>
              </div>
              <div class="ss-tb-sep"></div>
              <button class="ss-tb-btn" title="Sort"><i data-lucide="arrow-up-down"></i> Sort</button>
              <button class="ss-tb-btn is-on" title="Filter"><i data-lucide="filter"></i> Filter <span class="ss-tb-count">3</span></button>
              <button class="ss-tb-btn" title="Freeze"><i data-lucide="snowflake"></i> Freeze</button>
              <button class="ss-tb-btn" title="Group"><i data-lucide="menu"></i> Group</button>
              <div class="ss-tb-sep"></div>
              <input class="ss-tb-search" placeholder="Search channel, campaign, ID…">
              <div style="margin-left:auto; display:flex; gap:6px;">
                <button class="ss-tb-btn" title="Share"><i data-lucide="share-2"></i> Share</button>
                <button class="ss-tb-btn" title="Export"><i data-lucide="download"></i> CSV</button>
                <button class="ss-tb-btn ss-tb-btn--accent" title="New row"><i data-lucide="plus"></i> Row</button>
              </div>
            </div>

            <!-- Formula bar -->
            <div class="ss-formula">
              <div class="ss-namebox">H14</div>
              <div class="ss-fx">fx</div>
              <input class="ss-fx-input" value="=G14-F14">
              <span class="ss-fx-status">● synced <span class="ss-fx-time">12:04:18</span></span>
            </div>

            <!-- Filter chips -->
            <div class="ss-chips">
              <span class="ss-chips__label">Active filters</span>
              <span class="ss-chip">Period <b>Q1</b> <button aria-label="remove"><i data-lucide="x"></i></button></span>
              <span class="ss-chip">Status <b>Live, Optimizing</b> <button aria-label="remove"><i data-lucide="x"></i></button></span>
              <span class="ss-chip">Spend <b>&gt; $5,000</b> <button aria-label="remove"><i data-lucide="x"></i></button></span>
              <button class="ss-chip ss-chip--add">+ Add filter</button>
              <span class="ss-chips__count">Showing <b>${ssRowCount}</b> of 812 rows</span>
            </div>

            <!-- Grid -->
            <div class="ss-grid" tabindex="0">
              <table class="ss-table">
                <thead>
                  <tr>
                    <th class="ss-rownum"></th>
                    <th class="ss-colhead ss-col-id">
                      <div class="ss-colhead__inner"><span>A</span> <span class="ss-colhead__label">ID</span>
                        <span class="ss-colhead__sort">▲</span></div>
                    </th>
                    <th class="ss-colhead">
                      <div class="ss-colhead__inner"><span>B</span> <span class="ss-colhead__label">Date</span></div>
                    </th>
                    <th class="ss-colhead ss-col-wide">
                      <div class="ss-colhead__inner"><span>C</span> <span class="ss-colhead__label">Channel</span>
                        <span class="ss-colhead__filter" title="Filtered">⧩</span></div>
                    </th>
                    <th class="ss-colhead">
                      <div class="ss-colhead__inner"><span>D</span> <span class="ss-colhead__label">Type</span></div>
                    </th>
                    <th class="ss-colhead ss-col-wide">
                      <div class="ss-colhead__inner"><span>E</span> <span class="ss-colhead__label">Memo</span></div>
                    </th>
                    <th class="ss-colhead ss-col-num">
                      <div class="ss-colhead__inner ss-colhead__inner--num"><span>F</span> <span class="ss-colhead__label">Spend $</span></div>
                    </th>
                    <th class="ss-colhead ss-col-num">
                      <div class="ss-colhead__inner ss-colhead__inner--num"><span>G</span> <span class="ss-colhead__label">Revenue $</span></div>
                    </th>
                    <th class="ss-colhead ss-col-num">
                      <div class="ss-colhead__inner ss-colhead__inner--num"><span>H</span> <span class="ss-colhead__label">Profit $</span>
                        <span class="ss-colhead__sort">▼</span></div>
                    </th>
                    <th class="ss-colhead">
                      <div class="ss-colhead__inner"><span>I</span> <span class="ss-colhead__label">End</span></div>
                    </th>
                    <th class="ss-colhead">
                      <div class="ss-colhead__inner"><span>J</span> <span class="ss-colhead__label">Owner</span></div>
                    </th>
                    <th class="ss-colhead">
                      <div class="ss-colhead__inner"><span>K</span> <span class="ss-colhead__label">Status</span>
                        <span class="ss-colhead__filter" title="Filtered">⧩</span></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  ${ssRows()}
                </tbody>
                <tfoot>
                  <tr>
                    <td class="ss-rownum"></td>
                    <td colspan="5" class="ss-foot-label">Totals · ${ssRowCount} rows</td>
                    <td class="ss-num">${ssTotInv}</td>
                    <td class="ss-num">${ssTotPaid}</td>
                    <td class="ss-num ss-num--neg">${ssTotBal}</td>
                    <td colspan="3" class="ss-foot-meta">${ssOverdueCount} below ROAS · ${ssOverdueSum} deficit · avg ROAS 2.4×</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Status bar + sheet tabs -->
            <div class="ss-tabsbar">
              <div class="ss-tabs">
                <button class="ss-tab" title="Add sheet">+</button>
                <button class="ss-tab is-active">
                  <span class="ss-tab__dot"></span>Campaigns <span class="ss-tab__n">34</span>
                </button>
                <button class="ss-tab">Performance <span class="ss-tab__n">218</span></button>
                <button class="ss-tab">Audience <span class="ss-tab__n">94</span></button>
                <button class="ss-tab">Creative <span class="ss-tab__n">42</span></button>
                <button class="ss-tab">Forecast <span class="ss-tab__n">Q1'26</span></button>
                <button class="ss-tab">Attribution <span class="ss-tab__pill">●</span></button>
                <button class="ss-tab">Audit trail</button>
                <button class="ss-tab">Notes</button>
              </div>
              <div class="ss-status">
                <span>Selection · <b>H14</b></span>
                <span>Value · <b>$56,760</b></span>
                <span>Sum · <b>${ssTotBal}</b></span>
                <span>Avg · <b>$${Math.round(totProfit/ssRowCount).toLocaleString('en-US')}</b></span>
                <span>Count · <b>${ssRowCount}</b></span>
                <span class="ss-status__zoom">100%</span>
              </div>
            </div>

          </div>
        </div>
        <div class="db-spec__foot">
          <b>Anatomy &mdash;</b> Toolbar · formula bar · filter chips · grid (sticky row-nums + col-headers, 2 frozen cols) · footer totals · sheet tabs · status bar. <b>Active cell</b> H14 highlighted accent; <b>active row</b> tinted; <b>sort/filter</b> glyphs on column headers.
        </div>
      </div>

      <!-- Tab placement variant — tabs on top -->
      <div class="db-spec" style="margin-top:16px;">
        <div class="db-spec__head">
          <span>Tab placement · top · compact workbook</span>
          <span>.ss-tabsbar--top</span>
        </div>
        <div class="db-spec__stage db-spec__stage--flush">
          <div class="ss-wrap ss-wrap--mini">

            <!-- Sheet tabs — on top -->
            <div class="ss-tabsbar ss-tabsbar--top">
              <div class="ss-tabs">
                <button class="ss-tab is-active">
                  <span class="ss-tab__dot"></span>Campaigns <span class="ss-tab__n">${ssRowCount}</span>
                </button>
                <button class="ss-tab">Performance <span class="ss-tab__n">218</span></button>
                <button class="ss-tab">Audience <span class="ss-tab__n">94</span></button>
                <button class="ss-tab">Forecast <span class="ss-tab__n">Q1'26</span></button>
                <button class="ss-tab">Audit trail</button>
                <button class="ss-tab ss-tab--add" title="Add sheet">+</button>
              </div>
            </div>

            <!-- Toolbar (condensed) -->
            <div class="ss-toolbar">
              <button class="ss-tb-btn" title="Sort"><i data-lucide="arrow-up-down"></i> Sort</button>
              <button class="ss-tb-btn is-on" title="Filter"><i data-lucide="filter"></i> Filter <span class="ss-tb-count">2</span></button>
              <button class="ss-tb-btn" title="Freeze"><i data-lucide="snowflake"></i> Freeze</button>
              <div class="ss-tb-sep"></div>
              <input class="ss-tb-search" placeholder="Search…">
              <div style="margin-left:auto; display:flex; gap:6px;">
                <button class="ss-tb-btn" title="Export"><i data-lucide="download"></i> CSV</button>
                <button class="ss-tb-btn ss-tb-btn--accent" title="New row"><i data-lucide="plus"></i> Row</button>
              </div>
            </div>

            <!-- Formula bar -->
            <div class="ss-formula">
              <div class="ss-namebox">F3</div>
              <div class="ss-fx">fx</div>
              <input class="ss-fx-input" value="8400">
              <span class="ss-fx-status">● synced <span class="ss-fx-time">12:04:18</span></span>
            </div>

            <!-- Filter chips -->
            <div class="ss-chips">
              <span class="ss-chips__label">Active filters</span>
              <span class="ss-chip">Status <b>Live, Optimizing</b> <button aria-label="remove"><i data-lucide="x"></i></button></span>
              <span class="ss-chip">Owner <b>Growth</b> <button aria-label="remove"><i data-lucide="x"></i></button></span>
              <button class="ss-chip ss-chip--add">+ Add filter</button>
              <span class="ss-chips__count">Showing <b>8</b> of 812 rows</span>
            </div>

            <!-- Mini grid — 8 rows -->
            <div class="ss-grid ss-grid--mini" tabindex="0">
              <table class="ss-table">
                <thead>
                  <tr>
                    <th class="ss-rownum"></th>
                    <th class="ss-colhead ss-col-id">
                      <div class="ss-colhead__inner"><span>A</span> <span class="ss-colhead__label">ID</span>
                        <span class="ss-colhead__sort">▲</span></div>
                    </th>
                    <th class="ss-colhead">
                      <div class="ss-colhead__inner"><span>B</span> <span class="ss-colhead__label">Date</span></div>
                    </th>
                    <th class="ss-colhead ss-col-wide">
                      <div class="ss-colhead__inner"><span>C</span> <span class="ss-colhead__label">Channel</span></div>
                    </th>
                    <th class="ss-colhead">
                      <div class="ss-colhead__inner"><span>D</span> <span class="ss-colhead__label">Type</span></div>
                    </th>
                    <th class="ss-colhead ss-col-num">
                      <div class="ss-colhead__inner ss-colhead__inner--num"><span>E</span> <span class="ss-colhead__label">Spend $</span></div>
                    </th>
                    <th class="ss-colhead ss-col-num">
                      <div class="ss-colhead__inner ss-colhead__inner--num"><span>F</span> <span class="ss-colhead__label">Profit $</span></div>
                    </th>
                    <th class="ss-colhead">
                      <div class="ss-colhead__inner"><span>G</span> <span class="ss-colhead__label">Status</span>
                        <span class="ss-colhead__filter" title="Filtered">⧩</span></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  ${ssData.slice(0,8).map((r,i) => {
                    const profit = r.revenue - r.spend;
                    return `
                    <tr>
                      <td class="ss-rownum">${i+1}</td>
                      <td class="ss-mono">${r.id}</td>
                      <td class="ss-mono ss-muted">${r.date}</td>
                      <td class="ss-vendor">${r.channel}</td>
                      <td><span class="ss-pill">${r.type}</span></td>
                      <td class="ss-num">${fmt(r.spend)}</td>
                      <td class="ss-num${profit<0 ? ' ss-num--neg' : ''}">${fmt(profit)}</td>
                      <td><span class="${statusClass(r.status)}">${r.status}</span></td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <!-- Bottom: status only (no tabs) -->
            <div class="ss-tabsbar ss-tabsbar--status-only">
              <div class="ss-status">
                <span>Ready</span>
                <span>Selection · <b>F3</b></span>
                <span>Value · <b>$8,400</b></span>
                <span>Count · <b>8</b></span>
                <span class="ss-status__zoom">100%</span>
              </div>
            </div>

          </div>
        </div>
        <div class="db-spec__foot">
          <b>Placement rule &mdash;</b> Tabs on top for <b>application-style</b> workbooks (settings, configuration, multi-context views). Tabs on bottom for <b>document-style</b> (Excel register, financial ledgers). Status bar always bottom.
        </div>
      </div>

    </div>
  </section>

  <!-- ============ CANDLESTICK / OHLC ============ -->
  <section class="db-section" id="db-ohlc">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Candlestick &middot; OHLC</h2>
        <p class="section-head__body">Price + volume in one canvas. Up candles hold ink; down candles earn red. Hover a candle for the full open / high / low / close read.</p>
      </div>

      <div class="db-spec">
        <div class="db-spec__head"><span>OBX &middot; 28 sessions</span><span>.ohlc</span></div>
        <div class="db-spec__stage db-spec__stage--flush">
          <div class="ohlc">
            <div class="ohlc__head">
              <div>
                <div class="ohlc__sym">OBX <small>Oslo benchmark</small></div>
              </div>
              <div class="ohlc__price">$${ohlcLast.c.toFixed(2)}</div>
              <div class="ohlc__delta${ohlcDelta < 0 ? ' ohlc__delta--down' : ''}">${ohlcDelta >= 0 ? '+' : '−'}$${Math.abs(ohlcDelta).toFixed(2)} &middot; ${ohlcDelta >= 0 ? '+' : '−'}${Math.abs(ohlcDeltaPct).toFixed(2)}%</div>
              <div class="ohlc__meta">
                <div class="db-seg">
                  <button>1D</button>
                  <button>5D</button>
                  <button class="is-on">1M</button>
                  <button>3M</button>
                  <button>YTD</button>
                </div>
              </div>
            </div>
            <div class="ohlc__chart">
              ${ohlcSvg()}
              <div class="ohlc__tooltip" id="ohlc-tt"></div>
            </div>
            <div class="ohlc__foot">
              <span>Session &middot; last 28</span>
              <span>NYSE open &middot; $${ohlcSeries[ohlcSeries.length-1].o.toFixed(2)} &middot; vol ${ohlcLast.v.toFixed(1)}M</span>
            </div>
          </div>
        </div>
        <div class="db-spec__foot"><b>Rule &mdash;</b> Up = ink, down = accent. Tooltip surfaces O / H / L / C + volume on hover. Use for positions, portfolio, trading surfaces &mdash; never for generic time-series (use a sparkline or line chart instead).</div>
      </div>
    </div>
  </section>

  <!-- ============ TREE GRID ============ -->
  <section class="db-section" id="db-tree">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Tree grid</h2>
        <p class="section-head__body">Drill-down ledger. Hierarchy on the left, numerals on the right, each group rolls up to its parent. The spreadsheet grid is flat &mdash; this is the shape you want for management P&amp;L.</p>
      </div>

      <div class="db-spec">
        <div class="db-spec__head"><span>Management P&amp;L &middot; Q4</span><span>.tree</span></div>
        <div class="db-spec__stage db-spec__stage--flush">
          <div class="tree">
            <table class="tree__table">
              <thead>
                <tr>
                  <th>Line item</th>
                  <th class="tree-num">Oct</th>
                  <th class="tree-num">Nov</th>
                  <th class="tree-num">Dec</th>
                  <th class="tree-num">Quarter</th>
                  <th class="tree-num">Δ vs. plan</th>
                </tr>
              </thead>
              <tbody>
                ${treeRowBuilder(treeData)}
              </tbody>
            </table>
          </div>
        </div>
        <div class="db-spec__foot"><b>Chevron &mdash;</b> Click to expand / collapse a group. Depth expressed by indentation only &mdash; no vertical rules. Totals use warm paper fill.</div>
      </div>
    </div>
  </section>

  <!-- ============ WATERFALL ============ -->
  <section class="db-section" id="db-waterfall">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Waterfall</h2>
        <p class="section-head__body">Variance decomposition. A single number broken into the moves that produced it &mdash; gains in ink, losses in red, running total across the top.</p>
      </div>

      <div class="db-spec">
        <div class="db-spec__head"><span>Q3 → Q4 forecast bridge</span><span>.waterfall</span></div>
        <div class="db-spec__stage db-spec__stage--flush">
          <div class="waterfall">
            <div class="waterfall__title">
              <span><b>Revenue bridge</b> · Q3 $4.63M → Q4 forecast $4.39M</span>
              <span>Δ −$240K</span>
            </div>
            ${waterfallSvg()}
          </div>
        </div>
        <div class="db-spec__foot"><b>Rule &mdash;</b> Start + end bars lean heavier (muted ink). Gain bars full ink. Loss bars accent. Dashed connectors trace the running total. Cumulative total under each bar.</div>
      </div>
    </div>
  </section>

  <!-- ============ HEATMAP ============ -->
  <section class="db-section" id="db-heatmap">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Heatmap &middot; risk matrix</h2>
        <p class="section-head__body">Two-axis density. Red owns high-risk quadrants. Anything sitting in the top-right three cells earns an executive review.</p>
      </div>

      <div class="db-spec">
        <div class="db-spec__head"><span>Enterprise risk register · 71 items</span><span>.heatmap</span></div>
        <div class="db-spec__stage db-spec__stage--flush">
          <div class="heatmap">
            <div class="heatmap__title">
              <span><b>Likelihood × impact</b> · 71 risks tracked</span>
              <span>Updated 3 days ago</span>
            </div>
            <div class="heatmap__grid">
              ${heatmapGrid()}
            </div>
            <div class="heatmap__legend">
              <span>Intensity</span>
              <div class="heatmap__legend-scale">
                <span class="heatmap__cell--1"></span>
                <span class="heatmap__cell--2"></span>
                <span class="heatmap__cell--3"></span>
                <span class="heatmap__cell--4"></span>
                <span class="heatmap__cell--5"></span>
              </div>
              <span>Low &mdash; Severe</span>
              <span style="margin-left:auto">Clickable cells open the risk list</span>
            </div>
          </div>
        </div>
        <div class="db-spec__foot"><b>Color ramp &mdash;</b> Uses the red scale only &mdash; paper → red-soft → mid → accent → red-ink. The only surface where red is allowed to fill large areas, because severity IS the point.</div>
      </div>
    </div>
  </section>

  <!-- ============ FORECAST / SCENARIOS ============ -->
  <section class="db-section" id="db-forecast">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Forecast &amp; scenarios</h2>
        <p class="section-head__body">Same chart, three futures. Toggle the scenario to recompose the line, the band, and the KPI tiles beneath &mdash; so a CFO can run base, best, and worst in three clicks.</p>
      </div>

      <div class="db-spec">
        <div class="db-spec__head"><span>12-month revenue outlook</span><span>.fc</span></div>
        <div class="db-spec__stage db-spec__stage--flush">
          <div class="fc">
            <div class="fc__head">
              <div class="fc__title">Revenue &middot; <em>base</em> case carries forward.</div>
              <div class="fc__scenarios">
                <div class="db-seg" data-fc-scenarios>
                  <button class="is-on" data-fc="base">Base</button>
                  <button data-fc="best">Best</button>
                  <button data-fc="worst">Worst</button>
                </div>
              </div>
            </div>
            <div class="fc__chart">
              ${fcSvg()}
            </div>
            <div class="fc__kpis">
              <div class="fc__kpi is-active" data-fc-kpi="revenue">
                <div class="fc__kpi-label">EoY Revenue</div>
                <div class="fc__kpi-num" data-fc-val-revenue>$6.18<small>M</small></div>
                <div class="fc__kpi-delta" data-fc-val-revenue-delta>+28% YoY &middot; base</div>
              </div>
              <div class="fc__kpi is-active" data-fc-kpi="burn">
                <div class="fc__kpi-label">EoY Burn</div>
                <div class="fc__kpi-num" data-fc-val-burn>$1.30<small>M</small></div>
                <div class="fc__kpi-delta" data-fc-val-burn-delta>+14% &middot; base</div>
              </div>
              <div class="fc__kpi is-active" data-fc-kpi="runway">
                <div class="fc__kpi-label">Runway</div>
                <div class="fc__kpi-num" data-fc-val-runway>16<small>mo</small></div>
                <div class="fc__kpi-delta" data-fc-val-runway-delta>at EoY burn &middot; base</div>
              </div>
            </div>
          </div>
        </div>
        <div class="db-spec__foot"><b>Layers &mdash;</b> Hard line = actuals. Divider = today. Past divider, three scenario lines; the active scenario bolds, the others mute to 30%. The faint band behind every chart = best/worst envelope.</div>
      </div>
    </div>
  </section>

  <!-- ============ FULL SHELL ============ -->
  <section class="db-section" id="db-shell">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Full shell</h2>
        <p class="section-head__body">Everything together &mdash; dark sidebar, paper body, 4-up KPI strip, alert, P&amp;L excerpt. The reference layout for any finance dashboard.</p>
      </div>

      <div class="db-spec">
        <div class="db-spec__head"><span>CFO overview · light theme</span><span>.db-shell</span></div>
        <div class="db-spec__stage db-spec__stage--flush">
          <div class="db-shell">
            <aside class="db-side">
              <div class="db-side__brand">
                <div class="db-side__logo" aria-label="Kilowott"></div>
                <span class="db-side__sublabel">Finance Ops</span>
              </div>
              <div class="db-side__group">Today</div>
              <button class="db-side__link is-on" data-nav="Overview">Overview<small>⌘1</small></button>
              <button class="db-side__link" data-nav="Alerts">Alerts<small>3</small></button>
              <div class="db-side__group">Ledgers</div>
              <button class="db-side__link" data-nav="P&amp;L">P&amp;L<small>⌘2</small></button>
              <button class="db-side__link" data-nav="Cash">Cash<small>⌘3</small></button>
              <button class="db-side__link" data-nav="AR &middot; AP">AR &middot; AP<small>⌘4</small></button>
              <div class="db-side__group">Portfolio</div>
              <button class="db-side__link" data-nav="Positions">Positions<small></small></button>
              <button class="db-side__link" data-nav="Risk">Risk<small></small></button>
              <button class="db-side__link" data-nav="Hedge book">Hedge book<small></small></button>
              <div class="db-side__foot">
                <span>v2026.04</span><span>UTC</span>
              </div>
            </aside>
            <div class="db-main">
              <div class="db-top">
                <div class="db-top__crumb">Finance &nbsp;/&nbsp; <b>Overview</b> &middot; <span style="font-family:var(--font-mono); font-size:11px;">updated 12 min ago</span></div>
                <div style="display:flex; gap:6px; align-items:center;">
                  <div class="db-seg">
                    <button>1D</button>
                    <button class="is-on">MTD</button>
                    <button>QTD</button>
                    <button>YTD</button>
                  </div>
                  <button class="db-iconbtn" title="Refresh"><i data-lucide="rotate-cw"></i></button>
                  <button class="db-iconbtn" title="Export"><i data-lucide="download"></i></button>
                </div>
              </div>
              <div class="db-body">
                <div class="db-alert">
                  <span class="dot dot--alert" style="margin-right:0"></span>
                  <span><b>Runway breach risk.</b> 11 weeks to policy floor at current burn &mdash; review with ops Thursday.</span>
                  <button class="db-alert__dismiss"><i data-lucide="x"></i></button>
                </div>
                <div class="db-grid-4">
                  <div class="kpi">
                    <div class="kpi__label">Revenue <span class="delta delta--plain">+4.2%</span></div>
                    <div class="kpi__num">$4.82<small>M</small></div>
                    <svg class="sparkline" viewBox="0 0 120 28" preserveAspectRatio="none"><path class="line" d="M0,22 L30,18 L60,14 L90,10 L120,6"/></svg>
                    <div class="kpi__foot"><span>vs. $4.63M</span><span>MTD</span></div>
                  </div>
                  <div class="kpi">
                    <div class="kpi__label">Gross margin <span class="delta delta--plain">+120<small>BPS</small></span></div>
                    <div class="kpi__num">62.4<small>%</small></div>
                    <svg class="sparkline" viewBox="0 0 120 28" preserveAspectRatio="none"><path class="line" d="M0,16 L30,15 L60,13 L90,12 L120,10"/></svg>
                    <div class="kpi__foot"><span>vs. 61.2%</span><span>QTD</span></div>
                  </div>
                  <div class="kpi">
                    <div class="kpi__label">Burn <span class="delta delta--down delta--plain">+8.3%</span></div>
                    <div class="kpi__num kpi__num--accent">$1.14<small>M</small></div>
                    <svg class="sparkline sparkline--accent" viewBox="0 0 120 28" preserveAspectRatio="none"><path class="line" d="M0,18 L30,14 L60,11 L90,8 L120,6"/></svg>
                    <div class="kpi__foot"><span>vs. $1.05M</span><span>MONTH</span></div>
                  </div>
                  <div class="kpi">
                    <div class="kpi__label">Runway <span class="delta delta--down delta--plain">&minus;2 MO</span></div>
                    <div class="kpi__num">14<small>mo</small></div>
                    <svg class="sparkline" viewBox="0 0 120 28" preserveAspectRatio="none"><path class="line" d="M0,8 L30,10 L60,13 L90,16 L120,20"/></svg>
                    <div class="kpi__foot"><span>vs. 16 mo</span><span>AT CURRENT BURN</span></div>
                  </div>
                </div>
                <div style="display:grid; grid-template-columns: 2fr 1fr; gap:14px;">
                  <div style="border:1px solid var(--rule); border-radius:6px; overflow:hidden;">
                    <div style="padding:10px 14px; border-bottom:1px solid var(--rule); display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--fg-2);"><span>P&amp;L excerpt</span><span>MTD</span></div>
                    <table class="db-table">
                      <tbody>
                        <tr><td>Subscription revenue</td><td class="num">$2.68M</td><td class="num">+$120K</td></tr>
                        <tr><td>Services revenue</td><td class="num">$720K</td><td class="num neg">&minus;$210K</td></tr>
                        <tr><td>COGS</td><td class="num">$1.21M</td><td class="num">+$40K</td></tr>
                        <tr><td>S&amp;M</td><td class="num">$760K</td><td class="num neg">&minus;$160K</td></tr>
                        <tr><td>R&amp;D</td><td class="num">$580K</td><td class="num">&minus;$20K</td></tr>
                      </tbody>
                      <tfoot><tr><td>EBITDA</td><td class="num">$590K</td><td class="num neg">&minus;$320K</td></tr></tfoot>
                    </table>
                  </div>
                  <div style="border:1px solid var(--rule); border-radius:6px; padding:14px;">
                    <div style="font-family:var(--font-mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--fg-2); margin-bottom:10px;">Cash position</div>
                    <div style="font-family:var(--font-display); font-size:2.25rem; line-height:1; letter-spacing:-0.02em; font-variant-numeric:tabular-nums;">$18.4<small style="font-size:0.55em; color:var(--fg-2)">M</small></div>
                    <div style="font-size:12px; color:var(--fg-2); margin-top:6px;">across 4 accounts</div>
                    <hr class="rule" style="margin:14px 0">
                    <div style="display:flex; flex-direction:column; gap:8px; font-size:12px;">
                      <div style="display:flex; justify-content:space-between;"><span>Operating</span><span class="ticker">$9.2M</span></div>
                      <div style="display:flex; justify-content:space-between;"><span>Reserve</span><span class="ticker">$6.8M</span></div>
                      <div style="display:flex; justify-content:space-between;"><span>Tax escrow</span><span class="ticker">$1.9M</span></div>
                      <div style="display:flex; justify-content:space-between;"><span>FX</span><span class="ticker">$0.5M</span></div>
                    </div>
                    <hr class="rule" style="margin:14px 0">
                    <div style="display:flex; justify-content:space-between; font-size:12px;">
                      <span>Policy floor</span><span class="ticker" style="color:var(--accent)">$8.0M</span>
                    </div>
                    <div class="meter" style="margin-top:4px;">
                      <div class="meter__fill meter__fill--accent" style="width:58%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="db-spec__foot"><b>Composition &mdash;</b> Sidebar ink · paper body · 4-up KPI strip · alert band · 2/3 table + 1/3 cash module. The canonical CFO view.</div>
      </div>
    </div>
  </section>

  <!-- ============ CLOSE ============ -->
  <section class="db-section">
    <div class="container">
      <div class="section-head">
        <h2 class="section-head__title">Extending the set</h2>
        <p class="section-head__body">Primitives shipped. Next round brings composite surfaces &mdash; pivot tables, session-replay views, and the full portfolio shell &mdash; all built from the same tile, table, and chart pieces above.</p>
      </div>
      <ul style="list-style:none; padding:0; margin:0; border-top: 1px solid var(--rule);">
        <li class="token-row"><span class="token-row__label">KPI tiles · sparklines · deltas</span><span class="token-row__meta">Ready</span></li>
        <li class="token-row"><span class="token-row__label">Data tables · status · meters · alerts</span><span class="token-row__meta">Ready</span></li>
        <li class="token-row"><span class="token-row__label">Spreadsheet grid &middot; sheet tabs (top + bottom)</span><span class="token-row__meta">Ready</span></li>
        <li class="token-row"><span class="token-row__label">Candlestick / OHLC + volume</span><span class="token-row__meta">Ready</span></li>
        <li class="token-row"><span class="token-row__label">Tree grid (expandable P&amp;L)</span><span class="token-row__meta">Ready</span></li>
        <li class="token-row"><span class="token-row__label">Waterfall (variance decomposition)</span><span class="token-row__meta">Ready</span></li>
        <li class="token-row"><span class="token-row__label">Heatmap (risk matrix)</span><span class="token-row__meta">Ready</span></li>
        <li class="token-row"><span class="token-row__label">Forecast + scenario toggles</span><span class="token-row__meta">Ready</span></li>
        <li class="token-row"><span class="token-row__label">Pivot table (cross-tab, drag dimensions)</span><span class="token-row__meta">v0.4</span></li>
        <li class="token-row"><span class="token-row__label">Session-replay / event log viewer</span><span class="token-row__meta">v0.4</span></li>
        <li class="token-row"><span class="token-row__label">Portfolio allocation shell (pie + table)</span><span class="token-row__meta">v0.4</span></li>
      </ul>
    </div>
  </section>
  `;

  // Smooth in-page jumps without tripping the hash router
  root.querySelectorAll('[data-db-jump]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('data-db-jump');
      const target = document.getElementById(id);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.pageYOffset - 24;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ============================================================
  //  SHELL + SPREADSHEET INTERACTIVITY
  //  Everything clickable actually does something. No hash routing.
  // ============================================================

  // Safety net: any stray <a href="#"> inside the shell or sheet
  // gets its default prevented so the global hash router stays put.
  root.querySelectorAll('.db-shell a[href="#"], .ss-wrap a[href="#"]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
  });

  // ---------- Shell ----------
  const shell = root.querySelector('.db-shell');
  if (shell) {
    const crumb = shell.querySelector('.db-top__crumb');

    // Sidebar nav — swap active indicator + update crumb
    shell.querySelectorAll('.db-side__link').forEach(btn => {
      btn.addEventListener('click', () => {
        shell.querySelectorAll('.db-side__link').forEach(b => b.classList.remove('is-on'));
        btn.classList.add('is-on');
        const label = btn.dataset.nav || btn.textContent.trim();
        if (crumb) {
          const mins = Math.floor(Math.random() * 18) + 3;
          crumb.innerHTML = 'Finance &nbsp;/&nbsp; <b>' + label + '</b> &middot; <span style="font-family:var(--font-mono); font-size:11px;">updated ' + mins + ' min ago</span>';
        }
      });
    });

    // Alert dismiss — collapse animation
    shell.querySelectorAll('.db-alert__dismiss').forEach(btn => {
      btn.addEventListener('click', () => {
        const a = btn.closest('.db-alert');
        if (!a) return;
        const h = a.offsetHeight;
        a.style.overflow = 'hidden';
        a.style.maxHeight = h + 'px';
        a.style.transition = 'opacity .18s ease, max-height .28s ease, padding .28s ease, margin .28s ease, border-width .28s ease';
        requestAnimationFrame(() => {
          a.style.opacity = '0';
          a.style.maxHeight = '0';
          a.style.paddingTop = '0';
          a.style.paddingBottom = '0';
          a.style.marginTop = '0';
          a.style.marginBottom = '0';
          a.style.borderWidth = '0';
        });
        setTimeout(() => a.remove(), 320);
      });
    });

    // Segmented groups (1D / MTD / QTD / YTD etc) — single-choice
    shell.querySelectorAll('.db-seg').forEach(seg => {
      seg.addEventListener('click', e => {
        const b = e.target.closest('button');
        if (!b) return;
        seg.querySelectorAll('button').forEach(x => x.classList.remove('is-on'));
        b.classList.add('is-on');
      });
    });

    // Icon buttons — brief accent flash to confirm action
    shell.querySelectorAll('.db-iconbtn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.animate([
          { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' },
          { background: '', color: '', borderColor: '' }
        ], { duration: 260, easing: 'ease-out' });
      });
    });
  }

  // ---------- Spreadsheet(s) ----------
  root.querySelectorAll('.ss-wrap').forEach(sheet => {

    // Sheet tabs (Campaigns / Performance / Audience / …)
    const tabs = Array.from(sheet.querySelectorAll('.ss-tab'));
    const addTab = tabs[0]; // the "+" tab
    tabs.forEach(tab => {
      if (tab === addTab) {
        tab.addEventListener('click', () => {
          tab.animate([
            { color: 'var(--accent)' }, { color: '' }
          ], { duration: 280 });
        });
        return;
      }
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
      });
    });

    // Toolbar — Sort / Filter / Freeze / Group toggle; Share / CSV / Row flash
    sheet.querySelectorAll('.ss-toolbar .ss-tb-btn').forEach(btn => {
      if (btn.classList.contains('ss-tb-btn--accent')) {
        btn.addEventListener('click', () => {
          btn.animate([
            { transform: 'scale(1.04)' }, { transform: 'scale(1)' }
          ], { duration: 180 });
        });
        return;
      }
      const txt = btn.textContent.trim();
      if (/Share|CSV/i.test(txt)) {
        btn.addEventListener('click', () => {
          btn.animate([
            { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' },
            { background: '', color: '', borderColor: '' }
          ], { duration: 260 });
        });
      } else {
        btn.addEventListener('click', () => btn.classList.toggle('is-on'));
      }
    });

    // Toolbar seg groups (cut/copy/paste, bold/italic/underline) — momentary press
    sheet.querySelectorAll('.ss-seg').forEach(seg => {
      seg.addEventListener('click', e => {
        const b = e.target.closest('button');
        if (!b) return;
        b.animate([
          { background: 'var(--bg-3)' }, { background: 'transparent' }
        ], { duration: 220 });
      });
    });

    // Filter chip remove × — decrement toolbar Filter count
    const syncFilterCount = () => {
      const n = sheet.querySelectorAll('.ss-chip:not(.ss-chip--add)').length;
      const filterBtn = Array.from(sheet.querySelectorAll('.ss-toolbar .ss-tb-btn'))
        .find(b => /Filter/.test(b.textContent));
      if (!filterBtn) return;
      const pill = filterBtn.querySelector('.ss-tb-count');
      if (n === 0) {
        if (pill) pill.remove();
        filterBtn.classList.remove('is-on');
      } else {
        if (pill) pill.textContent = n;
        else {
          const p = document.createElement('span');
          p.className = 'ss-tb-count';
          p.textContent = n;
          filterBtn.appendChild(p);
        }
      }
    };
    sheet.querySelectorAll('.ss-chip button').forEach(x => {
      x.addEventListener('click', () => {
        const chip = x.closest('.ss-chip');
        if (chip) chip.remove();
        syncFilterCount();
      });
    });

    // "+ Add filter" chip — ghost-append a demo filter
    const addChipBtn = sheet.querySelector('.ss-chip--add');
    if (addChipBtn) {
      const demoFilters = [
        { field: 'Owner',   val: 'Growth, Performance' },
        { field: 'Type',    val: 'Conversion, Lead-gen' },
        { field: 'Channel', val: 'contains "Meta"' },
        { field: 'End',     val: 'this week' },
      ];
      let nextDemo = 0;
      addChipBtn.addEventListener('click', () => {
        const f = demoFilters[nextDemo % demoFilters.length]; nextDemo++;
        const chip = document.createElement('span');
        chip.className = 'ss-chip';
        chip.innerHTML = f.field + ' <b>' + f.val + '</b> <button aria-label="remove"><i data-lucide="x"></i></button>';
        addChipBtn.parentNode.insertBefore(chip, addChipBtn);
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
          try { window.lucide.createIcons({ root: chip }); } catch (e) {}
        }
        chip.querySelector('button').addEventListener('click', () => {
          chip.remove(); syncFilterCount();
        });
        syncFilterCount();
      });
    }

    // Cell click — update name box, formula, status bar
    const nameBox = sheet.querySelector('.ss-namebox');
    const fxInput = sheet.querySelector('.ss-fx-input');
    const statusSpans = sheet.querySelectorAll('.ss-status span');
    const colLetters = ['A','B','C','D','E','F','G','H','I','J','K','L'];

    sheet.querySelectorAll('.ss-table tbody tr').forEach((tr, rowIdx) => {
      Array.from(tr.children).forEach((td, cellIdx) => {
        if (td.classList.contains('ss-rownum')) {
          td.style.cursor = 'pointer';
          td.addEventListener('click', () => {
            sheet.querySelectorAll('.is-active-row, .is-active-row-num, .is-active-cell')
              .forEach(el => el.classList.remove('is-active-row', 'is-active-row-num', 'is-active-cell'));
            tr.classList.add('is-active-row');
            td.classList.add('is-active-row-num');
          });
          return;
        }
        td.style.cursor = 'cell';
        td.addEventListener('click', () => {
          sheet.querySelectorAll('.is-active-row, .is-active-row-num, .is-active-cell')
            .forEach(el => el.classList.remove('is-active-row', 'is-active-row-num', 'is-active-cell'));
          tr.classList.add('is-active-row');
          const rn = tr.querySelector('.ss-rownum');
          if (rn) rn.classList.add('is-active-row-num');
          td.classList.add('is-active-cell');

          const colLetter = colLetters[cellIdx - 1] || '?';
          const rowNum = rowIdx + 1;
          const ref = colLetter + rowNum;
          const raw = td.textContent.trim();
          if (nameBox) nameBox.textContent = ref;
          if (fxInput) {
            fxInput.value = (colLetter === 'H') ? ('=G' + rowNum + '-F' + rowNum) : raw;
          }
          if (statusSpans[0]) statusSpans[0].innerHTML = 'Selection · <b>' + ref + '</b>';
          if (statusSpans[1]) statusSpans[1].innerHTML = 'Value · <b>' + raw + '</b>';
        });
      });
    });

    // Column header click — indicate sort cycle (▲ / ▼ / —)
    sheet.querySelectorAll('.ss-colhead').forEach(th => {
      if (th.classList.contains('ss-rownum')) return;
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        // clear others
        sheet.querySelectorAll('.ss-colhead__sort').forEach(s => {
          if (!th.contains(s)) s.remove();
        });
        const inner = th.querySelector('.ss-colhead__inner');
        if (!inner) return;
        let sort = inner.querySelector('.ss-colhead__sort');
        if (!sort) {
          sort = document.createElement('span');
          sort.className = 'ss-colhead__sort';
          sort.textContent = '▲';
          inner.appendChild(sort);
        } else {
          sort.textContent = sort.textContent === '▲' ? '▼' : (sort.textContent === '▼' ? '' : '▲');
          if (sort.textContent === '') sort.remove();
        }
      });
    });
  });

  // ============================================================
  //  CANDLESTICK HOVER TOOLTIP
  // ============================================================
  root.querySelectorAll('.ohlc').forEach(chart => {
    const tt = chart.querySelector('.ohlc__tooltip');
    const svg = chart.querySelector('.ohlc__svg');
    if (!tt || !svg) return;
    chart.querySelectorAll('.ohlc-candle-group').forEach(g => {
      g.addEventListener('mouseenter', e => {
        const i = parseInt(g.dataset.i, 10);
        const d = ohlcSeries[i];
        if (!d) return;
        const up = d.c >= d.o;
        const chg = d.c - d.o;
        const pct = (chg / d.o) * 100;
        tt.innerHTML = `
          <b>${d.t}</b>
          <div class="tt-row"><span>Open</span><span>$${d.o.toFixed(2)}</span></div>
          <div class="tt-row"><span>High</span><span>$${d.h.toFixed(2)}</span></div>
          <div class="tt-row"><span>Low</span><span>$${d.l.toFixed(2)}</span></div>
          <div class="tt-row"><span>Close</span><span class="${up ? 'up' : 'dn'}">$${d.c.toFixed(2)}</span></div>
          <div class="tt-row"><span>Chg</span><span class="${up ? 'up' : 'dn'}">${up ? '+' : ''}${chg.toFixed(2)} · ${pct.toFixed(2)}%</span></div>
          <div class="tt-row"><span>Volume</span><span>${d.v.toFixed(1)}M</span></div>`;
        tt.classList.add('is-on');
      });
      g.addEventListener('mousemove', e => {
        const rect = chart.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ttW = tt.offsetWidth, ttH = tt.offsetHeight;
        let left = x + 14;
        let top  = y + 14;
        if (left + ttW > rect.width - 8) left = x - ttW - 14;
        if (top + ttH > rect.height - 8) top = y - ttH - 14;
        tt.style.left = Math.max(4, left) + 'px';
        tt.style.top  = Math.max(4, top)  + 'px';
      });
      g.addEventListener('mouseleave', () => {
        tt.classList.remove('is-on');
      });
    });
  });

  // ============================================================
  //  TREE GRID EXPAND / COLLAPSE
  // ============================================================
  root.querySelectorAll('.tree').forEach(tree => {
    const rows = Array.from(tree.querySelectorAll('[data-tree-row]'));
    const descendantsOf = key => rows.filter(r => r.dataset.treeRow.startsWith(key + '-'));
    tree.querySelectorAll('[data-tree-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.treeToggle;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        // Direct children are one-level deeper than the toggled row's depth
        const parentRow = tree.querySelector('[data-tree-row="' + key + '"]');
        if (!parentRow) return;
        const parentDepth = parseInt(parentRow.dataset.treeDepth, 10);
        descendantsOf(key).forEach(row => {
          const depth = parseInt(row.dataset.treeDepth, 10);
          if (depth === parentDepth + 1) {
            // Direct child: toggle visibility
            row.classList.toggle('tree__row--hidden', expanded);
            // If collapsing, also collapse deeper descendants and reset their chevron state to what it was
            if (expanded) {
              descendantsOf(row.dataset.treeRow).forEach(d => d.classList.add('tree__row--hidden'));
            }
          } else if (!expanded) {
            // Expanding: deeper descendants only visible if their ancestors are expanded
            // Check each ancestor's chevron state
            let visible = true;
            const segs = row.dataset.treeRow.split('-').filter(Boolean);
            for (let j = 1; j < segs.length; j++) {
              const ancKey = '-' + segs.slice(0, j).join('-');
              const ancBtn = tree.querySelector('[data-tree-toggle="' + ancKey + '"]');
              if (ancBtn && ancBtn.getAttribute('aria-expanded') === 'false') { visible = false; break; }
            }
            if (visible) row.classList.remove('tree__row--hidden');
          }
        });
      });
    });
  });

  // ============================================================
  //  FORECAST / SCENARIO TOGGLE
  // ============================================================
  root.querySelectorAll('.fc').forEach(fc => {
    const seg = fc.querySelector('[data-fc-scenarios]');
    if (!seg) return;
    const titleEm = fc.querySelector('.fc__title em');
    const update = name => {
      // Buttons
      seg.querySelectorAll('button').forEach(b => b.classList.toggle('is-on', b.dataset.fc === name));
      // Lines: highlight selected
      ['base','best','worst'].forEach(key => {
        const line = fc.querySelector('#fc-line-' + key);
        if (line) line.classList.toggle('is-active', key === name);
      });
      // KPI values
      const s = scenarios[name];
      if (!s) return;
      const revEnd  = s.revenue[s.revenue.length - 1];
      const revStart = s.revenue[0];
      const burnEnd = s.burn[s.burn.length - 1];
      const burnStart = s.burn[0];
      const revDelta  = Math.round(((revEnd / revStart) - 1) * 100);
      const burnDelta = Math.round(((burnEnd / burnStart) - 1) * 100);
      const setText = (sel, val) => { const el = fc.querySelector(sel); if (el) el.innerHTML = val; };
      setText('[data-fc-val-revenue]', '$' + revEnd.toFixed(2) + '<small>M</small>');
      setText('[data-fc-val-revenue-delta]', (revDelta >= 0 ? '+' : '') + revDelta + '% YoY &middot; ' + name);
      setText('[data-fc-val-burn]', '$' + burnEnd.toFixed(2) + '<small>M</small>');
      setText('[data-fc-val-burn-delta]', (burnDelta >= 0 ? '+' : '') + burnDelta + '% &middot; ' + name);
      setText('[data-fc-val-runway]', s.runway + '<small>mo</small>');
      setText('[data-fc-val-runway-delta]', 'at EoY burn &middot; ' + name);
      // Burn delta class: worst → negative direction in finance terms
      const burnK = fc.querySelector('[data-fc-val-burn-delta]');
      if (burnK) burnK.classList.toggle('neg', name === 'worst' || burnDelta > 20);
      const rwK = fc.querySelector('[data-fc-val-runway-delta]');
      if (rwK) rwK.classList.toggle('neg', name === 'worst');
      // Title
      if (titleEm) titleEm.textContent = s.label.toLowerCase();
    };
    seg.addEventListener('click', e => {
      const b = e.target.closest('button[data-fc]');
      if (!b) return;
      update(b.dataset.fc);
    });
  });
};
