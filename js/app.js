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

// SVG icons for UI elements
const UI_ICONS = {
  back: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>',
  home: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  brain: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"><path d="M12 2a5 5 0 015 5c0 .83-.2 1.61-.57 2.3A5 5 0 0120 14a5 5 0 01-4 4.9V22h-2v-3.1A5 5 0 0110 14a5 5 0 01-2-3.7A5 5 0 017 7a5 5 0 015-5z"/><path d="M12 2v7"/><path d="M8.5 8.5L12 9"/><path d="M15.5 8.5L12 9"/></svg>',
  parent: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  retry: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',
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
        '<div class="world-stars">⭐ ' + starCount + '/' + maxStars + '</div>'
        : '<div class="world-locked">🔒 Hoàn thành thế giới trước</div>'
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
    const starHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    const prevDone = idx === 0 || progress.completed[currentWorld.units[idx - 1].id];

    return '<div class="unit-card ' + (prevDone ? '' : 'unit-locked') + '" onclick="' + (prevDone ? 'openUnit(\'' + u.id + '\')' : '') + '">' +
      '<div class="unit-icon">' + u.icon + '</div>' +
      '<div class="unit-info">' +
      '<div class="unit-name">' + u.name + '</div>' +
      '<div class="unit-stars">' + starHTML + '</div>' +
      '</div>' +
      '<div class="unit-status">' + (done ? '✅' : prevDone ? '▶️' : '🔒') + '</div>' +
      '</div>';
  }).join('');

  // Boss button
  const allDone = currentWorld.units.every(u => progress.completed[u.id]);
  const bossDone = progress.bossCompleted[currentWorld.id];
  document.getElementById('wdBoss').innerHTML =
    '<button class="btn-boss ' + (allDone ? '' : 'boss-locked') + '" onclick="' + (allDone ? 'startBoss()' : '') + '">' +
    '👑 Thử Thách Cuối' + (bossDone ? ' ✅' : allDone ? '' : ' 🔒') +
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
  const starHTML = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  el.innerHTML =
    '<div class="um-header"><span class="um-icon">' + currentUnit.icon + '</span> ' + currentUnit.name + '</div>' +
    '<div class="um-stars">' + starHTML + '</div>' +
    '<div class="um-buttons">' +
    '<button class="um-btn um-lesson" onclick="startLesson()">📖 Bài Học</button>' +
    '<button class="um-btn um-tryit" onclick="startTryIt()">✏️ Thử Làm</button>' +
    '<button class="um-btn um-quiz" onclick="startQuiz()">📝 Kiểm Tra</button>' +
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
      if (step.props.sides !== undefined) html += '<span class="ls-prop">📐 Cạnh: ' + step.props.sides + '</span>';
      if (step.props.corners !== undefined) html += '<span class="ls-prop">📌 Góc: ' + step.props.corners + '</span>';
      if (step.props.note) html += '<span class="ls-prop">💡 ' + step.props.note + '</span>';
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
  const modeLabel = mode === 'tryit' ? 'Thử Làm' : mode === 'boss' ? '👑 Thử Thách' : 'Kiểm Tra';

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
      '<button class="q-opt q-opt-tf" onclick="submitAnswer(0)">✅ Đúng</button>' +
      '<button class="q-opt q-opt-tf" onclick="submitAnswer(1)">❌ Sai</button>' +
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
  const icon = result.isCorrect ? '🎉' : '😊';
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
    '<div class="r-time">⏱️ ' + timeStr + '</div>' +
    '<div class="r-xp">+' + (results.correct * GAME_CONFIG.xpPerCorrect) + ' XP</div>';

  // Boss completion
  if (mode === 'boss' && results.pct >= 60 && currentWorld) {
    progress.bossCompleted[currentWorld.id] = true;
    saveProgress(progress);
    html += '<div class="r-boss-win">🎊 Hoàn thành thế giới: ' + currentWorld.name + '!</div>';
  }

  html += '<div class="r-actions">';
  if (mode === 'quiz' && results.pct < 100) {
    html += '<button class="btn-retry" onclick="startQuiz()">🔄 Làm lại</button>';
  }
  if (mode === 'boss' && results.pct < 60) {
    html += '<button class="btn-retry" onclick="startBoss()">🔄 Thử lại</button>';
  }
  html += '<button class="btn-back" onclick="' + (mode === 'boss' ? 'openWorld(\'' + currentWorld.id + '\')' : 'showUnitMenu()') + '">← Quay lại</button>';
  html += '<button class="btn-home" onclick="goHome()">🏠 Trang chủ</button>';
  html += '</div>';

  // Review answers
  html += '<div class="r-review"><h3>Xem lại các câu trả lời:</h3>';
  results.answers.forEach((a, i) => {
    const cls = a.correct ? 'rv-correct' : 'rv-wrong';
    const icon = a.correct ? '✅' : '❌';
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
      '<div class="bg-icon">' + bg.icon + '</div>' +
      '<div class="bg-info">' +
      '<div class="bg-name">' + bg.name + (done ? ' ✅' : '') + '</div>' +
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
    html += '<div class="pd-day ' + (active ? 'pd-active' : '') + '" title="' + label + '">' + (active ? '🟢' : '⚪') + '</div>';
  });
  html += '</div>';

  // Reset button
  html += '<div class="pd-reset"><button class="btn-danger-sm" onclick="if(confirm(\'Xóa toàn bộ tiến trình?\')) { resetAllProgress(); goHome(); }">🗑️ Xóa tiến trình (Reset)</button></div>';

  el.innerHTML = html;
  showView('parent');
}

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  updateTopBar();
  renderWorldMap();
});
