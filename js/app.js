// ══════════════════════════════════════════
//  MATH LEARNING HUB — Main App
// ══════════════════════════════════════════

let currentView = 'map';
let currentWorld = null;
let currentUnit = null;
let currentSession = null;
let lessonStep = 0;

// ── Audio Feedback ──
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
function ensureAudio() { if (!audioCtx) audioCtx = new AudioCtx(); }

function playSound(type) {
  try {
    ensureAudio();
    if (type === 'correct') {
      playTone(523, 0.1, 0); playTone(659, 0.1, 0.1); playTone(784, 0.15, 0.2);
    } else if (type === 'wrong') {
      playTone(330, 0.2, 0); playTone(262, 0.3, 0.15);
    } else if (type === 'levelup') {
      playTone(523, 0.1, 0); playTone(659, 0.1, 0.1); playTone(784, 0.1, 0.2); playTone(1047, 0.2, 0.3);
    } else if (type === 'star') {
      playTone(784, 0.15, 0); playTone(988, 0.15, 0.12); playTone(1175, 0.2, 0.24);
    }
  } catch(e) {}
}

function playTone(freq, dur, delay) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + dur);
  osc.start(audioCtx.currentTime + delay);
  osc.stop(audioCtx.currentTime + delay + dur + 0.05);
}

// ── CSS Shape Renderer ──
function renderCSSShape(type) {
  const shapes = {
    circle: '<div class="css-shape css-circle"></div>',
    triangle: '<div class="css-shape css-triangle"></div>',
    square: '<div class="css-shape css-square"></div>',
    rectangle: '<div class="css-shape css-rectangle"></div>',
    cylinder: '<div class="css-shape css-cylinder"><div class="cyl-top"></div><div class="cyl-body"></div></div>',
    cube: '<div class="css-shape css-cube"><div class="cube-face front"></div><div class="cube-face top"></div><div class="cube-face right"></div></div>',
    box: '<div class="css-shape css-box"><div class="box-face front"></div><div class="box-face top"></div><div class="box-face right"></div></div>',
  };
  return shapes[type] || '';
}

// ── SVG World Icons (replace flat emoji) ──
const WORLD_SVGS = {
  world1: '<svg viewBox="0 0 80 80" class="world-svg"><circle cx="22" cy="50" r="16" fill="#3b82f6" opacity=".8"/><rect x="42" y="34" width="28" height="28" rx="4" fill="#22c55e" opacity=".8"/><polygon points="40,12 52,38 28,38" fill="#f59e0b" opacity=".9"/><circle cx="58" cy="22" r="6" fill="#ec4899" opacity=".7"/></svg>',
  world2: '<svg viewBox="0 0 80 80" class="world-svg"><text x="8" y="48" font-size="36" font-weight="900" fill="#3b82f6" font-family="Nunito,sans-serif">1</text><text x="28" y="58" font-size="36" font-weight="900" fill="#22c55e" font-family="Nunito,sans-serif">2</text><text x="50" y="42" font-size="36" font-weight="900" fill="#f59e0b" font-family="Nunito,sans-serif">3</text><circle cx="18" cy="18" r="8" fill="#ec4899" opacity=".6"/><circle cx="65" cy="60" r="6" fill="#8b5cf6" opacity=".6"/></svg>',
  world3: '<svg viewBox="0 0 80 80" class="world-svg"><rect x="10" y="25" width="60" height="32" rx="16" fill="#22c55e" opacity=".15"/><text x="14" y="52" font-size="32" font-weight="900" fill="#22c55e" font-family="Nunito,sans-serif">+</text><text x="44" y="52" font-size="32" font-weight="900" fill="#ef4444" font-family="Nunito,sans-serif">−</text><circle cx="62" cy="16" r="5" fill="#f59e0b"/><circle cx="15" cy="14" r="4" fill="#3b82f6"/><path d="M30 10 L34 4 L38 10 L36 10 L36 18 L32 18 L32 10Z" fill="#f59e0b" opacity=".7"/></svg>',
  world4: '<svg viewBox="0 0 80 80" class="world-svg"><circle cx="40" cy="40" r="30" fill="none" stroke="#8b5cf6" stroke-width="4"/><circle cx="40" cy="40" r="2.5" fill="#8b5cf6"/><line x1="40" y1="40" x2="40" y2="22" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/><line x1="40" y1="40" x2="54" y2="40" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/><text x="37" y="18" font-size="6" fill="#8b5cf6" font-weight="700" font-family="sans-serif">12</text><text x="57" y="43" font-size="6" fill="#8b5cf6" font-weight="700" font-family="sans-serif">3</text><text x="38" y="70" font-size="6" fill="#8b5cf6" font-weight="700" font-family="sans-serif">6</text><text x="14" y="43" font-size="6" fill="#8b5cf6" font-weight="700" font-family="sans-serif">9</text></svg>',
  world5: '<svg viewBox="0 0 80 80" class="world-svg"><rect x="6" y="20" width="68" height="42" rx="10" fill="#ef4444" opacity=".12"/><text x="10" y="54" font-size="34" font-weight="900" fill="#ef4444" font-family="Nunito,sans-serif">100</text><path d="M58 8 L62 2 L66 8Z" fill="#f59e0b"/><circle cx="62" cy="14" r="2" fill="#f59e0b"/><path d="M14 8 L18 2 L22 8Z" fill="#22c55e"/><circle cx="18" cy="14" r="2" fill="#22c55e"/></svg>',
};

// ── Complete SVG Icon System ──
function svgI(name, size) {
  const s = size || 18;
  const icons = {
    // Navigation
    back:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>',
    home:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    retry:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',

    // Stats (colored)
    star:     '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="#f59e0b" stroke="#d97706" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    starEmpty:'<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    xp:       '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><polygon points="12 2 15 10 22 10 16 15 18 22 12 18 6 22 8 15 2 10 9 10" fill="#8b5cf6" opacity=".9"/><circle cx="12" cy="12" r="4" fill="#c4b5fd"/></svg>',
    fire:     '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M12 23c-4.97 0-7-3.58-7-7 0-3.07 2.17-5.54 3.5-6.8.37-.35.95-.07.95.43v1.87c0 .83.68 1.5 1.5 1.5.65 0 1.2-.42 1.4-1 .65-1.87.15-4.14-1.1-6 3.16.6 5.75 3.53 5.75 7 0 2.72-1.5 5.09-4 6.32" fill="#ef4444"/><path d="M14.5 20c-1.38 0-2.5-1.12-2.5-2.5 0-1.98 2.5-3.5 2.5-3.5s2.5 1.52 2.5 3.5c0 1.38-1.12 2.5-2.5 2.5z" fill="#f59e0b"/></svg>',
    level:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" fill="#3b82f6" opacity=".15"/><text x="12" y="16.5" text-anchor="middle" font-size="11" font-weight="800" fill="#3b82f6" font-family="Nunito,sans-serif">Lv</text></svg>',
    brain:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M12 2C9.24 2 7 4.24 7 7c0 1.1.36 2.14 1 3-1.76 1.08-3 3-3 5.2C5 18.44 7.69 21 11 21h2c3.31 0 6-2.56 6-5.8 0-2.2-1.24-4.12-3-5.2.64-.86 1-1.9 1-3 0-2.76-2.24-5-5-5z" fill="#8b5cf6" opacity=".8"/><path d="M12 2v8M9 7l3 3M15 7l-3 3" stroke="#c4b5fd" stroke-width="1.5" stroke-linecap="round"/></svg>',
    parent:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',

    // Status
    check:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M8 12l3 3 5-6" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#3b82f6"/><polygon points="10 8 16 12 10 16" fill="#fff"/></svg>',
    lock:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1" fill="#a1a1aa"/></svg>',
    crown:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M2 20h20l-2-8-4 3-4-6-4 6-4-3z" fill="#f59e0b"/><rect x="2" y="20" width="20" height="2" rx="1" fill="#d97706"/><circle cx="12" cy="5" r="2" fill="#f59e0b"/><circle cx="3" cy="10" r="1.5" fill="#f59e0b"/><circle cx="21" cy="10" r="1.5" fill="#f59e0b"/></svg>',
    cross:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#ef4444"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg>',

    // Unit menu
    book:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" rx="2" fill="#3b82f6" opacity=".15"/><path d="M4 4c0-1.1.9-2 2-2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" stroke="#3b82f6" stroke-width="2"/><path d="M8 7h8M8 11h6M8 15h4" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/></svg>',
    pencil:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M17 3l4 4L7 21H3v-4L17 3z" fill="#f59e0b" opacity=".2" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round"/><path d="M14 6l4 4" stroke="#f59e0b" stroke-width="2"/></svg>',
    quiz:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#22c55e" opacity=".15" stroke="#22c55e" stroke-width="2"/><path d="M8 12l3 3 5-6" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chart:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"><rect x="3" y="12" width="4" height="9" rx="1" fill="#8b5cf6" opacity=".3"/><rect x="10" y="6" width="4" height="15" rx="1" fill="#8b5cf6" opacity=".5"/><rect x="17" y="2" width="4" height="19" rx="1" fill="#8b5cf6" opacity=".7"/></svg>',
    cap:     '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 9l10 6 10-6-10-6z" fill="#3b82f6"/><path d="M20 9v7" stroke="#3b82f6" stroke-width="2"/><path d="M6 11.5v4.5c0 2 2.69 3 6 3s6-1 6-3v-4.5" stroke="#3b82f6" stroke-width="2"/></svg>',

    // Feedback
    party:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#22c55e" opacity=".15"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="10" r="1.2" fill="#22c55e"/><circle cx="15" cy="10" r="1.2" fill="#22c55e"/><path d="M5 3l1 3M19 3l-1 3M3 8l3 .5M21 8l-3 .5" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/><circle cx="5" cy="2" r="1" fill="#f59e0b"/><circle cx="19" cy="2" r="1" fill="#ec4899"/><circle cx="2" cy="7" r="1" fill="#3b82f6"/></svg>',
    think:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#f59e0b" opacity=".15"/><circle cx="9" cy="10" r="1.2" fill="#f59e0b"/><circle cx="15" cy="10" r="1.2" fill="#f59e0b"/><path d="M9 15h6" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/><path d="M17 3l1 2M7 4l-1 2" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/></svg>',
    trophy:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M6 2h12v6a6 6 0 01-12 0V2z" fill="#f59e0b"/><path d="M6 4H3v2a3 3 0 003 3M18 4h3v2a3 3 0 01-3 3" stroke="#d97706" stroke-width="1.5"/><rect x="9" y="14" width="6" height="3" fill="#d97706"/><rect x="7" y="17" width="10" height="3" rx="1" fill="#f59e0b"/></svg>',

    // Misc UI
    timer:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M10 2h4"/><path d="M12 2v2"/></svg>',
    trash:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
    confetti:'<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><rect x="8" y="8" width="8" height="10" rx="2" fill="#f59e0b" opacity=".3"/><path d="M4 2l2 4M20 3l-2 3M2 10l3 1M22 10l-3 1" stroke="#ec4899" stroke-width="2" stroke-linecap="round"/><circle cx="5" cy="1" r="1.5" fill="#3b82f6"/><circle cx="20" cy="2" r="1.5" fill="#22c55e"/><circle cx="1" cy="9" r="1.5" fill="#f59e0b"/><circle cx="23" cy="9" r="1.5" fill="#8b5cf6"/><path d="M12 4v3M9 6l1 2M15 6l-1 2" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/></svg>',
    ruler:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><rect x="3" y="8" width="18" height="8" rx="1"/><path d="M7 8v3M11 8v5M15 8v3M19 8v3"/></svg>',
    pin:     '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M12 22s-6-6.5-6-11a6 6 0 1112 0c0 4.5-6 11-6 11z" fill="#ef4444" opacity=".8"/><circle cx="12" cy="11" r="2.5" fill="#fff"/></svg>',
    cube3d:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><rect x="5" y="5" width="12" height="12" rx="1" fill="#3b82f6" opacity=".6"/><rect x="8" y="2" width="12" height="12" rx="1" fill="#3b82f6" opacity=".3"/><path d="M5 5l3-3M17 5l3-3M5 17l3-3" stroke="#3b82f6" stroke-width="1"/></svg>',
    shapes:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="16" r="5" fill="#3b82f6" opacity=".6"/><rect x="13" y="11" width="9" height="9" rx="1" fill="#22c55e" opacity=".6"/><polygon points="12 2 17 11 7 11" fill="#f59e0b" opacity=".7"/></svg>',
    hand:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M18 11V6a1 1 0 00-2 0v5M14 10V4a1 1 0 00-2 0v6M10 10V5a1 1 0 00-2 0v5M6 11V8a1 1 0 012 0" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/><path d="M18 11a4 4 0 014 4v1a6 6 0 01-6 6H9a6 6 0 01-5-2.68" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/></svg>',
    hash:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"><path d="M4 9h16M4 15h16M10 3v18M14 3v18"/></svg>',
    link:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"><path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1"/></svg>',
    scale:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"><path d="M12 3v18"/><path d="M5 7l7-4 7 4"/><path d="M3 13l2-6 2 6a3 3 0 01-4 0zM17 13l2-6 2 6a3 3 0 01-4 0z"/></svg>',
    ball:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#ef4444" opacity=".7"/><path d="M12 2a10 10 0 010 20" stroke="#fff" stroke-width="1" opacity=".4"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#fff" stroke-width="1" opacity=".3"/></svg>',
    pie:     '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#f59e0b" opacity=".3"/><path d="M12 2a10 10 0 0110 10H12V2z" fill="#f59e0b" opacity=".7"/><circle cx="12" cy="12" r="10" stroke="#d97706" stroke-width="1.5" fill="none"/><line x1="12" y1="2" x2="12" y2="12" stroke="#d97706" stroke-width="1.5"/><line x1="12" y1="12" x2="22" y2="12" stroke="#d97706" stroke-width="1.5"/></svg>',
    medal:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M8 2l2 6M16 2l-2 6" stroke="#3b82f6" stroke-width="2"/><circle cx="12" cy="14" r="6" fill="#f59e0b"/><circle cx="12" cy="14" r="3.5" fill="#fbbf24"/><text x="12" y="16" text-anchor="middle" font-size="5" font-weight="800" fill="#92400e" font-family="sans-serif">1</text></svg>',
    target:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2"/><circle cx="12" cy="12" r="6" stroke="#ef4444" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="#ef4444"/></svg>',
    twins:   '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="4" fill="#3b82f6" opacity=".5"/><circle cx="16" cy="8" r="4" fill="#22c55e" opacity=".5"/><path d="M4 20v-1a4 4 0 014-4h0M16 15a4 4 0 014 4v1" stroke="#64748b" stroke-width="2"/><path d="M12 15a4 4 0 00-4 4v1h8v-1a4 4 0 00-4-4z" fill="#8b5cf6" opacity=".3"/></svg>',
    calendar:'<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="3" stroke="#8b5cf6" stroke-width="2"/><path d="M3 10h18" stroke="#8b5cf6" stroke-width="2"/><path d="M8 2v4M16 2v4" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"/><rect x="7" y="14" width="3" height="3" rx=".5" fill="#8b5cf6" opacity=".4"/><rect x="14" y="14" width="3" height="3" rx=".5" fill="#8b5cf6" opacity=".4"/></svg>',
    coin:    '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#f59e0b" opacity=".7"/><circle cx="12" cy="12" r="7" fill="#fbbf24"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="900" fill="#92400e" font-family="sans-serif">đ</text></svg>',
    barChart:'<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><rect x="3" y="14" width="4" height="8" rx="1" fill="#3b82f6" opacity=".7"/><rect x="10" y="8" width="4" height="14" rx="1" fill="#22c55e" opacity=".7"/><rect x="17" y="4" width="4" height="18" rx="1" fill="#f59e0b" opacity=".7"/></svg>',
    weight:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M5 22l2-14h10l2 14H5z" fill="#64748b" opacity=".6"/><circle cx="12" cy="6" r="4" fill="#64748b" opacity=".4"/><text x="12" y="18" text-anchor="middle" font-size="7" font-weight="800" fill="#fff" font-family="sans-serif">kg</text></svg>',
    bridge:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M2 18h20" stroke="#64748b" stroke-width="2"/><path d="M4 18c0-6 4-10 8-10s8 4 8 10" stroke="#3b82f6" stroke-width="2" fill="none"/><path d="M8 18V12M12 18V8M16 18V12" stroke="#3b82f6" stroke-width="1.5"/></svg>',
    blocks:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><rect x="3" y="12" width="8" height="8" rx="1" fill="#3b82f6" opacity=".6"/><rect x="13" y="12" width="8" height="8" rx="1" fill="#22c55e" opacity=".6"/><rect x="8" y="4" width="8" height="8" rx="1" fill="#f59e0b" opacity=".6"/></svg>',
    measure: '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><rect x="2" y="8" width="20" height="8" rx="2" stroke="#22c55e" stroke-width="2"/><path d="M6 8v3M10 8v5M14 8v3M18 8v3" stroke="#22c55e" stroke-width="1.5"/></svg>',
    eye:     '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    puzzle:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M4 7h3a2 2 0 100-4h0a2 2 0 100 4h3v3a2 2 0 104 0V7h3a1 1 0 011 1v3a2 2 0 100 4h0a2 2 0 100-4H17v3a1 1 0 01-1 1h-3a2 2 0 10-4 0H4a1 1 0 01-1-1v-3a2 2 0 110-4 2 2 0 010-4V8a1 1 0 011-1z" fill="#22c55e" opacity=".6" stroke="#22c55e" stroke-width="1.5"/></svg>',
    search:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><path d="M16 16l5 5"/></svg>',
    lightbulb:'<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M9 21h6M12 3a6 6 0 014 10.5V17H8v-3.5A6 6 0 0112 3z" fill="#f59e0b" opacity=".3" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/></svg>',
    corner:  '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M4 20V8l8-6 8 6v12" stroke="#8b5cf6" stroke-width="2"/><circle cx="4" cy="20" r="2" fill="#8b5cf6"/><circle cx="12" cy="2" r="2" fill="#ef4444"/><circle cx="20" cy="20" r="2" fill="#8b5cf6"/></svg>',
  };
  return icons[name] || '';
}

// Render star rating as SVG
function svgStars(count, max) {
  max = max || 3;
  let h = '';
  for (let i = 0; i < max; i++) h += svgI(i < count ? 'star' : 'starEmpty', 20);
  return '<span class="svg-stars">' + h + '</span>';
}

// Map unit/brain-game emoji icons to SVG names
const ICON_MAP = {
  '📍':'pin','📦':'cube3d','🔵':'shapes','🧩':'puzzle','🏀':'ball','🥧':'pie',
  '✋':'hand','🔟':'hash','🔗':'link','⚖️':'scale','🏅':'medal','🎯':'target',
  '👯':'twins','📝':'pencil','📅':'calendar','💰':'coin','📊':'barChart',
  '📏':'measure','🔍':'search','👀':'eye','🌉':'bridge','🏗️':'blocks',
  '🧮':'ruler','🔄':'retry','2️⃣':'hash','➕':'quiz','➖':'quiz',
};
function unitIcon(emoji, size) {
  const mapped = ICON_MAP[emoji];
  if (mapped) return svgI(mapped, size || 28);
  return '<span class="unit-emoji">' + emoji + '</span>';
}

// Keep backward compat
const UI_ICONS = {
  back: svgI('back'), home: svgI('home'), star: svgI('star'),
  brain: svgI('brain',22), parent: svgI('parent'), retry: svgI('retry'),
};

// ── Navigation ──
function showView(view) {
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const el = document.getElementById('view-' + view);
  if (el) el.style.display = 'block';
  updateTopBar();
}

function goHome() {
  currentSession = null;
  showView('map');
  renderWorldMap();
}

// ── Top Bar ──
function updateTopBar() {
  document.getElementById('topXP').textContent = progress.xp;
  document.getElementById('topLevel').textContent = progress.level;
  document.getElementById('topStreak').textContent = progress.streak;

  const totalStars = Object.values(progress.stars).reduce((s, v) => s + v, 0);
  document.getElementById('topStars').textContent = totalStars;
}

// ══════════════════════════════════════════
//  WORLD MAP
// ══════════════════════════════════════════
function renderWorldMap() {
  const grid = document.getElementById('worldGrid');
  grid.innerHTML = WORLD_PREVIEWS.map((wp, idx) => {
    const world = WORLDS.find(w => w.id === wp.id);
    const unlocked = idx === 0 || (WORLDS[idx - 1] && progress.bossCompleted[WORLDS[idx - 1].id]);
    const totalUnits = world ? world.units.length : 0;
    const doneUnits = world ? world.units.filter(u => progress.completed[u.id]).length : 0;
    const starCount = world ? world.units.reduce((s, u) => s + (progress.stars[u.id] || 0), 0) : 0;
    const maxStars = totalUnits * 3;
    const pct = totalUnits > 0 ? Math.round(doneUnits / totalUnits * 100) : 0;

    const svgIcon = WORLD_SVGS[wp.id] || '<div class="world-emoji">' + wp.icon + '</div>';
    return '<div class="world-card ' + (unlocked ? 'unlocked' : 'locked') + '" style="--wcolor:' + wp.color + '" onclick="' + (unlocked && world ? 'openWorld(\'' + wp.id + '\')' : '') + '">' +
      '<div class="world-icon">' + svgIcon + '</div>' +
      '<div class="world-name">' + wp.name + '</div>' +
      (unlocked ?
        '<div class="world-progress"><div class="wp-bar"><div class="wp-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="wp-text">' + doneUnits + '/' + totalUnits + ' bài</span></div>' +
        '<div class="world-stars">' + svgI('star',14) + ' ' + starCount + '/' + maxStars + '</div>'
        : '<div class="world-locked">' + svgI('lock',16) + ' Hoàn thành thế giới trước</div>'
      ) +
      '</div>';
  }).join('');

  // Brain games button
  const bgDone = Object.values(progress.brainGames).filter(g => g.completed).length;
  document.getElementById('brainGameCount').textContent = bgDone;
  document.getElementById('brainIcon').innerHTML = UI_ICONS.brain;

  showView('map');
}

// ══════════════════════════════════════════
//  WORLD DETAIL (Units List)
// ══════════════════════════════════════════
function openWorld(worldId) {
  currentWorld = WORLDS.find(w => w.id === worldId);
  if (!currentWorld) return;

  const el = document.getElementById('worldDetail');
  const header = document.getElementById('wdHeader');
  header.innerHTML = '<span class="wd-icon">' + currentWorld.icon + '</span> ' + currentWorld.name;
  header.style.background = currentWorld.color;

  const list = document.getElementById('wdUnits');
  list.innerHTML = currentWorld.units.map((u, idx) => {
    const stars = progress.stars[u.id] || 0;
    const done = progress.completed[u.id];
    const starHTML = svgStars(stars);
    const prevDone = idx === 0 || progress.completed[currentWorld.units[idx - 1].id];

    return '<div class="unit-card ' + (prevDone ? '' : 'unit-locked') + '" onclick="' + (prevDone ? 'openUnit(\'' + u.id + '\')' : '') + '">' +
      '<div class="unit-icon">' + unitIcon(u.icon, 28) + '</div>' +
      '<div class="unit-info">' +
      '<div class="unit-name">' + u.name + '</div>' +
      '<div class="unit-stars">' + starHTML + '</div>' +
      '</div>' +
      '<div class="unit-status">' + (done ? svgI('check',22) : prevDone ? svgI('play',22) : svgI('lock',22)) + '</div>' +
      '</div>';
  }).join('');

  // Boss button
  const allDone = currentWorld.units.every(u => progress.completed[u.id]);
  const bossDone = progress.bossCompleted[currentWorld.id];
  document.getElementById('wdBoss').innerHTML =
    '<button class="btn-boss ' + (allDone ? '' : 'boss-locked') + '" onclick="' + (allDone ? 'startBoss()' : '') + '">' +
    svgI('crown',20) + ' Thử Thách Cuối' + (bossDone ? ' ' + svgI('check',18) : allDone ? '' : ' ' + svgI('lock',18)) +
    '</button>';

  showView('world');
}

// ══════════════════════════════════════════
//  UNIT FLOW: Lesson → TryIt → Quiz
// ══════════════════════════════════════════
function openUnit(unitId) {
  currentUnit = currentWorld.units.find(u => u.id === unitId);
  if (!currentUnit) return;
  showUnitMenu();
}

function showUnitMenu() {
  const el = document.getElementById('unitMenuContent');
  const stars = progress.stars[currentUnit.id] || 0;
  const starHTML = svgStars(stars);

  el.innerHTML =
    '<div class="um-header"><span class="um-icon">' + unitIcon(currentUnit.icon, 32) + '</span> ' + currentUnit.name + '</div>' +
    '<div class="um-stars">' + starHTML + '</div>' +
    '<div class="um-buttons">' +
    '<button class="um-btn um-lesson" onclick="startLesson()">' + svgI('book',24) + ' Bài Học</button>' +
    '<button class="um-btn um-tryit" onclick="startTryIt()">' + svgI('pencil',24) + ' Thử Làm</button>' +
    '<button class="um-btn um-quiz" onclick="startQuiz()">' + svgI('quiz',24) + ' Kiểm Tra</button>' +
    '</div>';

  showView('unitmenu');
}

// ── Lesson ──
function startLesson() {
  lessonStep = 0;
  renderLessonStep();
  showView('lesson');
}

function renderLessonStep() {
  const steps = currentUnit.lesson.steps;
  if (lessonStep >= steps.length) {
    // Lesson complete
    addXP(GAME_CONFIG.xpPerTryIt);
    showUnitMenu();
    return;
  }

  const step = steps[lessonStep];
  const el = document.getElementById('lessonContent');
  const prog = document.getElementById('lessonProgress');
  prog.textContent = 'Bước ' + (lessonStep + 1) + ' / ' + steps.length;

  let html = '<div class="lesson-step ls-' + step.type + '">';

  if (step.type === 'intro') {
    html += '<h2 class="ls-title">' + step.title + '</h2>' +
      '<div class="ls-visual-big">' + (step.visual || '') + '</div>' +
      '<p class="ls-text">' + step.text + '</p>';
  }
  else if (step.type === 'concept') {
    html += '<h2 class="ls-title">' + step.title + '</h2>' +
      '<p class="ls-text">' + step.text.replace(/\n/g, '<br>') + '</p>';
    // CSS-drawn shape
    if (step.shape) {
      html += '<div class="ls-shape-display">' + renderCSSShape(step.shape) + '</div>';
    }
    // Items with proper layout (vertical for above/below, horizontal for left/right)
    if (step.items) {
      const layoutCls = step.layout === 'vertical' ? 'ls-items-vertical' : 'ls-items-horizontal';
      html += '<div class="ls-items ' + layoutCls + '">';
      step.items.forEach(item => {
        html += '<div class="ls-item">' +
          '<span class="ls-emoji">' + item.emoji + '</span>' +
          (item.label ? '<span class="ls-label">' + item.label + '</span>' : '') +
          '</div>';
      });
      html += '</div>';
    }
    if (step.examples) {
      html += '<div class="ls-examples">' + step.examples.map(e => '<span class="ls-example">' + e + '</span>').join('') + '</div>';
    }
    if (step.props) {
      html += '<div class="ls-props">';
      if (step.props.sides !== undefined) html += '<span class="ls-prop">' + svgI('ruler',14) + ' Cạnh: ' + step.props.sides + '</span>';
      if (step.props.corners !== undefined) html += '<span class="ls-prop">' + svgI('corner',14) + ' Góc: ' + step.props.corners + '</span>';
      if (step.props.note) html += '<span class="ls-prop">' + svgI('lightbulb',14) + ' ' + step.props.note + '</span>';
      html += '</div>';
    }
  }
  else if (step.type === 'compare') {
    html += '<h2 class="ls-title">' + step.title + '</h2>' +
      '<p class="ls-text">' + step.text + '</p>' +
      '<div class="ls-compare">' +
      '<div class="ls-cmp-box"><div class="ls-cmp-icon">' + (step.left.icon || '🔷') + '</div>' +
      '<div class="ls-cmp-name">' + step.left.name + '</div>' +
      '<div class="ls-cmp-note">' + step.left.note + '</div></div>' +
      '<div class="ls-cmp-vs">VS</div>' +
      '<div class="ls-cmp-box"><div class="ls-cmp-icon">' + (step.right.icon || '🔶') + '</div>' +
      '<div class="ls-cmp-name">' + step.right.name + '</div>' +
      '<div class="ls-cmp-note">' + step.right.note + '</div></div>' +
      '</div>';
  }
  else if (step.type === 'summary') {
    html += '<h2 class="ls-title">' + step.title + '</h2>';
    if (step.points) {
      html += '<ul class="ls-points">' + step.points.map(p => '<li>' + p + '</li>').join('') + '</ul>';
    }
    if (step.table) {
      html += '<table class="ls-table">';
      step.table.forEach((row, i) => {
        html += '<tr>' + row.map(cell => i === 0 ? '<th>' + cell + '</th>' : '<td>' + cell + '</td>').join('') + '</tr>';
      });
      html += '</table>';
    }
  }

  html += '</div>';
  html += '<div class="lesson-nav">' +
    (lessonStep > 0 ? '<button class="btn-nav" onclick="prevLesson()">← Trước</button>' : '<span></span>') +
    '<button class="btn-nav btn-next" onclick="nextLesson()">' + (lessonStep < steps.length - 1 ? 'Tiếp theo →' : 'Hoàn thành ✓') + '</button>' +
    '</div>';

  el.innerHTML = html;
}

function nextLesson() { lessonStep++; renderLessonStep(); }
function prevLesson() { if (lessonStep > 0) { lessonStep--; renderLessonStep(); } }

// ── Try It (Guided Practice) ──
function startTryIt() {
  currentSession = new QuizSession(currentUnit.tryIt, null, currentWorld?.id);
  renderQuestion('tryit');
  showView('quiz');
}

// ── Quiz ──
function startQuiz() {
  currentSession = new QuizSession([...currentUnit.quiz].sort(() => Math.random() - 0.5), currentUnit.id, currentWorld?.id);
  renderQuestion('quiz');
  showView('quiz');
}

// ── Boss ──
function startBoss() {
  if (!currentWorld) return;
  currentSession = new QuizSession([...currentWorld.boss.questions].sort(() => Math.random() - 0.5), null, currentWorld.id);
  currentSession.isBoss = true;
  renderQuestion('boss');
  showView('quiz');
}

// ══════════════════════════════════════════
//  QUIZ RENDERER (shared for tryIt, quiz, boss)
// ══════════════════════════════════════════
function renderQuestion(mode) {
  const q = currentSession.getCurrentQuestion();
  const el = document.getElementById('quizContent');

  if (!q) {
    showResults(mode);
    return;
  }

  const num = currentSession.current + 1;
  const total = currentSession.questions.length;
  const modeLabel = mode === 'tryit' ? svgI('pencil',16)+' Thử Làm' : mode === 'boss' ? svgI('crown',16)+' Thử Thách' : svgI('quiz',16)+' Kiểm Tra';

  let html = '<div class="q-header">' +
    '<span class="q-mode">' + modeLabel + '</span>' +
    '<span class="q-progress">Câu ' + num + ' / ' + total + '</span>' +
    '</div>';

  html += '<div class="q-bar"><div class="q-bar-fill" style="width:' + (num / total * 100) + '%"></div></div>';

  // Question display
  if (q.type === 'counting' && q.items) {
    html += '<div class="q-items">' + q.items.map(i => '<span class="q-item">' + i + '</span>').join('') + '</div>';
  }
  if (q.sequence) {
    html += '<div class="q-sequence">' + q.sequence.map(s => '<span class="q-seq-item">' + s + '</span>').join('') +
      '<span class="q-seq-item q-seq-unknown">❓</span></div>';
  }

  html += '<div class="q-question">' + q.question + '</div>';

  // Answer options
  if (q.type === 'trueFalse') {
    html += '<div class="q-options">' +
      '<button class="q-opt q-opt-tf q-opt-true" onclick="submitAnswer(0)">' + svgI('check',22) + ' Đúng</button>' +
      '<button class="q-opt q-opt-tf q-opt-false" onclick="submitAnswer(1)">' + svgI('cross',22) + ' Sai</button>' +
      '</div>';
  } else if (q.type === 'fillBlank') {
    html += '<div class="q-fill">' +
      '<input type="number" id="fillInput" class="q-input" min="0" max="999" autofocus>' +
      '<button class="q-submit" onclick="submitFill()">Trả lời</button>' +
      '</div>';
  } else if (q.type === 'counting') {
    html += '<div class="q-fill">' +
      '<input type="number" id="fillInput" class="q-input" min="0" max="99" autofocus>' +
      '<button class="q-submit" onclick="submitFill()">Trả lời</button>' +
      '</div>';
  } else {
    // multipleChoice, pattern
    const opts = q.options || [];
    html += '<div class="q-options">' +
      opts.map((opt, i) => '<button class="q-opt" onclick="submitAnswer(' + i + ')">' + opt + '</button>').join('') +
      '</div>';
  }

  el.innerHTML = html;

  // Focus input if fill
  setTimeout(() => {
    const inp = document.getElementById('fillInput');
    if (inp) inp.focus();
  }, 100);
}

function submitAnswer(idx) {
  if (!currentSession) return;
  const result = currentSession.answer(idx);
  showFeedback(result);
}

function submitFill() {
  const inp = document.getElementById('fillInput');
  if (!inp) return;
  const val = parseInt(inp.value);
  if (isNaN(val)) return;
  const result = currentSession.answer(val);
  showFeedback(result);
}

function showFeedback(result) {
  const el = document.getElementById('quizContent');
  const mode = currentSession.isBoss ? 'boss' : (currentSession.unitId ? 'quiz' : 'tryit');

  playSound(result.isCorrect ? 'correct' : 'wrong');
  const cls = result.isCorrect ? 'fb-correct' : 'fb-wrong';
  const icon = result.isCorrect ? svgI('party', 48) : svgI('think', 48);
  const text = result.isCorrect ? 'Đúng rồi! Giỏi lắm!' : 'Chưa đúng — Xem lại nhé!';

  let html = '<div class="feedback ' + cls + '">' +
    '<div class="fb-icon">' + icon + '</div>' +
    '<div class="fb-text">' + text + '</div>';
  if (result.explain) {
    html += '<div class="fb-explain">' + result.explain + '</div>';
  }
  html += '<button class="btn-next fb-next" onclick="' +
    (result.done ? 'showResults(\'' + mode + '\')' : 'renderQuestion(\'' + mode + '\')') +
    '">' + (result.done ? 'Xem kết quả' : 'Câu tiếp theo →') + '</button></div>';

  el.innerHTML = html;
}

// ── Results Screen ──
function showResults(mode) {
  const results = currentSession.getResults();
  const el = document.getElementById('quizContent');

  if (results.stars >= 2) playSound('star');
  else if (results.stars >= 1) playSound('correct');
  const starHTML = '⭐'.repeat(results.stars) + '☆'.repeat(3 - results.stars);
  const timeStr = Math.floor(results.elapsed / 1000) + ' giây';

  let msg = '';
  if (results.pct >= 100) msg = '🏆 Hoàn hảo! Xuất sắc!';
  else if (results.pct >= 80) msg = '🌟 Rất giỏi! Cố lên!';
  else if (results.pct >= 60) msg = '👍 Khá lắm! Ôn thêm nhé!';
  else msg = '📚 Cần ôn lại bài học. Cố gắng lên nào!';

  let html = '<div class="results">' +
    '<div class="r-stars">' + starHTML + '</div>' +
    '<div class="r-score">' + results.correct + ' / ' + results.total + '</div>' +
    '<div class="r-pct">' + results.pct + '%</div>' +
    '<div class="r-msg">' + msg + '</div>' +
    '<div class="r-time">' + svgI('timer',16) + ' ' + timeStr + '</div>' +
    '<div class="r-xp">+' + (results.correct * GAME_CONFIG.xpPerCorrect) + ' XP</div>';

  // Boss completion
  if (mode === 'boss' && results.pct >= 60 && currentWorld) {
    progress.bossCompleted[currentWorld.id] = true;
    saveProgress(progress);
    html += '<div class="r-boss-win">' + svgI('confetti',24) + ' Hoàn thành thế giới: ' + currentWorld.name + '!</div>';
  }

  html += '<div class="r-actions">';
  if (mode === 'quiz' && results.pct < 100) {
    html += '<button class="btn-retry" onclick="startQuiz()">' + svgI('retry',16) + ' Làm lại</button>';
  }
  if (mode === 'boss' && results.pct < 60) {
    html += '<button class="btn-retry" onclick="startBoss()">' + svgI('retry',16) + ' Thử lại</button>';
  }
  html += '<button class="btn-back" onclick="' + (mode === 'boss' ? 'openWorld(\'' + currentWorld.id + '\')' : 'showUnitMenu()') + '">← Quay lại</button>';
  html += '<button class="btn-home" onclick="goHome()">' + svgI('home',16) + ' Trang chủ</button>';
  html += '</div>';

  // Review answers
  html += '<div class="r-review"><h3>Xem lại các câu trả lời:</h3>';
  results.answers.forEach((a, i) => {
    const cls = a.correct ? 'rv-correct' : 'rv-wrong';
    const icon = a.correct ? svgI('check',16) : svgI('cross',16);
    html += '<div class="rv-item ' + cls + '">' +
      '<span class="rv-icon">' + icon + '</span>' +
      '<span class="rv-q">Câu ' + (i + 1) + ': ' + a.question.question + '</span>' +
      '</div>';
  });
  html += '</div></div>';

  el.innerHTML = html;
  updateTopBar();
}

// ══════════════════════════════════════════
//  BRAIN GAMES
// ══════════════════════════════════════════
function openBrainGames() {
  const el = document.getElementById('bgList');
  // Collect brain games from all unlocked worlds
  let allGames = [];
  WORLDS.forEach((w, idx) => {
    if (idx === 0 || progress.bossCompleted[WORLDS[idx - 1]?.id]) {
      if (w.brainGames) allGames = allGames.concat(w.brainGames);
    }
  });

  el.innerHTML = allGames.map(bg => {
    const done = progress.brainGames[bg.id]?.completed;
    return '<div class="bg-card" onclick="startBrainGame(\'' + bg.id + '\')">' +
      '<div class="bg-icon">' + unitIcon(bg.icon, 24) + '</div>' +
      '<div class="bg-info">' +
      '<div class="bg-name">' + bg.name + (done ? ' ' + svgI('check',16) : '') + '</div>' +
      '<div class="bg-source">' + bg.source + '</div>' +
      '<div class="bg-desc">' + bg.desc + '</div>' +
      '</div></div>';
  }).join('');

  if (allGames.length === 0) {
    el.innerHTML = '<div class="bg-empty">Hoàn thành bài học để mở khóa trò chơi tư duy!</div>';
  }

  showView('braingames');
}

function startBrainGame(gameId) {
  let game = null;
  for (const w of WORLDS) {
    if (w.brainGames) {
      game = w.brainGames.find(g => g.id === gameId);
      if (game) break;
    }
  }
  if (!game) return;

  currentSession = new QuizSession([...game.questions], null, null);
  currentSession.brainGameId = gameId;
  currentSession.isBrainGame = true;
  renderQuestion('braingame');
  showView('quiz');
}

// Override results for brain games
const origShowResults = showResults;
showResults = function(mode) {
  if (mode === 'braingame' && currentSession?.brainGameId) {
    const results = currentSession.getResults();
    const gameId = currentSession.brainGameId;

    if (results.pct >= 60) {
      progress.brainGames[gameId] = { completed: true, score: results.correct, total: results.total };
      addXP(GAME_CONFIG.xpPerBrainGame * results.correct);
      checkBadges(null, results.pct, results.elapsed);
      saveProgress(progress);
    }

    origShowResults.call(this, mode);
    return;
  }
  origShowResults.call(this, mode);
};

// ══════════════════════════════════════════
//  PARENT DASHBOARD
// ══════════════════════════════════════════
function openParent() {
  const stats = getStats();
  const el = document.getElementById('parentContent');

  let html = '<div class="pd-grid">' +
    '<div class="pd-stat"><div class="pd-val">' + stats.level + '</div><div class="pd-label">Cấp độ</div></div>' +
    '<div class="pd-stat"><div class="pd-val">' + stats.xp + '</div><div class="pd-label">Điểm XP</div></div>' +
    '<div class="pd-stat"><div class="pd-val">' + stats.streak + '</div><div class="pd-label">Ngày liên tiếp</div></div>' +
    '<div class="pd-stat"><div class="pd-val">' + stats.totalStars + '/' + stats.maxStars + '</div><div class="pd-label">Sao</div></div>' +
    '<div class="pd-stat"><div class="pd-val">' + stats.completedUnits + '/' + stats.totalUnits + '</div><div class="pd-label">Bài hoàn thành</div></div>' +
    '<div class="pd-stat"><div class="pd-val">' + (stats.totalCorrect + stats.totalWrong > 0 ? Math.round(stats.totalCorrect / (stats.totalCorrect + stats.totalWrong) * 100) : 0) + '%</div><div class="pd-label">Tỉ lệ đúng</div></div>' +
    '</div>';

  // Accuracy per unit
  const entries = Object.entries(stats.accuracy);
  if (entries.length > 0) {
    html += '<h3 class="pd-section">Kết quả theo bài:</h3><div class="pd-accuracy">';
    entries.forEach(([key, pct]) => {
      // Find unit name
      let uName = key;
      for (const w of WORLDS) {
        const u = w.units.find(u => u.id === key);
        if (u) { uName = u.name; break; }
      }
      const cls = pct >= 80 ? 'acc-good' : pct >= 60 ? 'acc-ok' : 'acc-bad';
      html += '<div class="pd-acc-row ' + cls + '"><span>' + uName + '</span><span class="pd-acc-pct">' + pct + '%</span></div>';
    });
    html += '</div>';
  }

  // Badges
  if (stats.badges.length > 0) {
    html += '<h3 class="pd-section">Huy hiệu:</h3><div class="pd-badges">';
    stats.badges.forEach(bid => {
      const b = BADGES.find(x => x.id === bid);
      if (b) html += '<div class="pd-badge"><span>' + b.icon + '</span><span>' + b.name + '</span></div>';
    });
    html += '</div>';
  }

  // Activity heatmap (last 30 days)
  html += '<h3 class="pd-section">Hoạt động 30 ngày qua:</h3><div class="pd-heatmap">';
  const days = Object.entries(stats.last30).reverse();
  days.forEach(([date, active]) => {
    const d = new Date(date);
    const label = d.getDate() + '/' + (d.getMonth() + 1);
    html += '<div class="pd-day ' + (active ? 'pd-active' : '') + '" title="' + label + '">' + (active ? '<span class="hm-dot hm-active"></span>' : '<span class="hm-dot"></span>') + '</div>';
  });
  html += '</div>';

  // Reset button
  html += '<div class="pd-reset"><button class="btn-danger-sm" onclick="if(confirm(\'Xóa toàn bộ tiến trình?\')) { resetAllProgress(); goHome(); }">' + svgI('trash',14) + ' Xóa tiến trình (Reset)</button></div>';

  el.innerHTML = html;
  showView('parent');
}

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  // Populate SVG icons in top bar
  const iconSlots = {
    topCap: ['cap',18], topStarIcon: ['star',14], topXPIcon: ['xp',14],
    topFireIcon: ['fire',14], topLvIcon: ['level',14], pdChartIcon: ['chart',20],
  };
  for (const [id, [name, size]] of Object.entries(iconSlots)) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = svgI(name, size);
  }
  updateTopBar();
  renderWorldMap();
});
