// ══════════════════════════════════════════
//  GAME ENGINE — Progress, Scoring, Streaks
// ══════════════════════════════════════════

const STORAGE_KEY = 'math-hub-progress';

// ── Load / Save ──
function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch(e) {}
  }
  return {
    xp: 0,
    level: 1,
    streak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    stars: {},        // { 'w1u1': 3, 'w1u2': 2 }
    completed: {},    // { 'w1u1': true }
    bossCompleted: {},// { 'world1': true }
    brainGames: {},   // { 'bg_shape_count': { completed: true, score: 3 } }
    badges: [],       // ['shape_master', 'perfect']
    quizHistory: {},  // { 'w1u1': { attempts: 2, bestPct: 90 } }
    dailyDone: {},    // { '2026-04-05': true }
    totalCorrect: 0,
    totalWrong: 0,
    settings: { parentPin: null },
  };
}

function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

let progress = loadProgress();

// ── XP & Leveling ──
function addXP(amount) {
  progress.xp += amount;
  const newLevel = Math.floor(progress.xp / GAME_CONFIG.xpPerLevel) + 1;
  const leveled = newLevel > progress.level;
  progress.level = newLevel;
  saveProgress(progress);
  return { leveled, newLevel };
}

// ── Stars ──
function calcStars(correctPct) {
  if (correctPct >= GAME_CONFIG.star3Pct) return 3;
  if (correctPct >= GAME_CONFIG.star2Pct) return 2;
  if (correctPct >= GAME_CONFIG.star1Pct) return 1;
  return 0;
}

function setUnitStars(unitId, stars) {
  const current = progress.stars[unitId] || 0;
  if (stars > current) {
    progress.stars[unitId] = stars;
  }
  progress.completed[unitId] = stars >= 1;
  saveProgress(progress);
}

// ── Streak ──
function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (progress.lastActiveDate === today) return; // already counted today

  if (progress.lastActiveDate === yesterday) {
    progress.streak++;
  } else if (progress.lastActiveDate !== today) {
    progress.streak = 1;
  }

  if (progress.streak > progress.bestStreak) {
    progress.bestStreak = progress.streak;
  }

  progress.lastActiveDate = today;
  progress.dailyDone[today] = true;

  // Check streak badge
  if (progress.streak >= 7 && !progress.badges.includes('streak7')) {
    progress.badges.push('streak7');
  }

  saveProgress(progress);
}

// ── Badge Check ──
function checkBadges(worldId, quizPct, quizTime) {
  // Perfect score badge
  if (quizPct >= 100 && !progress.badges.includes('perfect')) {
    progress.badges.push('perfect');
  }
  // Speed badge (under 60s)
  if (quizTime && quizTime < 60000 && quizPct >= 80 && !progress.badges.includes('speed_demon')) {
    progress.badges.push('speed_demon');
  }
  // World completion badge
  if (worldId) {
    const world = WORLDS.find(w => w.id === worldId);
    if (world) {
      const allDone = world.units.every(u => progress.completed[u.id]);
      const badge = BADGES.find(b => b.world === worldId);
      if (allDone && badge && !progress.badges.includes(badge.id)) {
        progress.badges.push(badge.id);
      }
    }
  }
  // Brain game champion
  const bgCount = Object.values(progress.brainGames).filter(g => g.completed).length;
  if (bgCount >= 10 && !progress.badges.includes('brain_champ')) {
    progress.badges.push('brain_champ');
  }

  saveProgress(progress);
}

// ── World Unlock Check ──
function isWorldUnlocked(worldIdx) {
  if (worldIdx === 0) return true;
  // Unlock next world when boss of previous world is completed
  const prevWorld = WORLDS[worldIdx - 1];
  if (!prevWorld) return false;
  return !!progress.bossCompleted[prevWorld.id];
}

// ── Stats for Parent Dashboard ──
function getStats() {
  const totalStars = Object.values(progress.stars).reduce((s, v) => s + v, 0);
  const maxStars = WORLDS.reduce((s, w) => s + w.units.length * 3, 0);
  const totalUnits = WORLDS.reduce((s, w) => s + w.units.length, 0);
  const completedUnits = Object.keys(progress.completed).filter(k => progress.completed[k]).length;

  // Accuracy by topic
  const accuracy = {};
  for (const [key, val] of Object.entries(progress.quizHistory)) {
    accuracy[key] = val.bestPct;
  }

  // Recent activity (last 30 days)
  const last30 = {};
  const now = Date.now();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now - i * 86400000).toISOString().slice(0, 10);
    last30[d] = !!progress.dailyDone[d];
  }

  return {
    xp: progress.xp,
    level: progress.level,
    streak: progress.streak,
    bestStreak: progress.bestStreak,
    totalStars,
    maxStars,
    completedUnits,
    totalUnits,
    badges: progress.badges,
    accuracy,
    last30,
    totalCorrect: progress.totalCorrect,
    totalWrong: progress.totalWrong,
  };
}

// ── Quiz Session ──
class QuizSession {
  constructor(questions, unitId, worldId) {
    this.questions = questions;
    this.unitId = unitId;
    this.worldId = worldId;
    this.current = 0;
    this.correct = 0;
    this.wrong = 0;
    this.answers = [];
    this.startTime = Date.now();
  }

  getCurrentQuestion() {
    return this.questions[this.current] || null;
  }

  answer(chosenIdx) {
    const q = this.questions[this.current];
    if (!q) return null;

    let isCorrect = false;
    if (q.type === 'trueFalse') {
      isCorrect = (chosenIdx === 0) === q.answer; // 0=Đúng, 1=Sai
    } else if (q.type === 'fillBlank') {
      isCorrect = parseInt(chosenIdx) === q.answer;
    } else if (q.type === 'counting') {
      isCorrect = parseInt(chosenIdx) === q.answer;
    } else {
      isCorrect = chosenIdx === q.correct;
    }

    if (isCorrect) {
      this.correct++;
      progress.totalCorrect++;
      addXP(GAME_CONFIG.xpPerCorrect);
    } else {
      this.wrong++;
      progress.totalWrong++;
    }

    this.answers.push({ question: q, chosen: chosenIdx, correct: isCorrect });
    this.current++;
    saveProgress(progress);

    return {
      isCorrect,
      explain: q.explain || '',
      done: this.current >= this.questions.length,
    };
  }

  getResults() {
    const total = this.questions.length;
    const pct = total > 0 ? Math.round(this.correct / total * 100) : 0;
    const stars = calcStars(pct);
    const elapsed = Date.now() - this.startTime;

    // Save
    if (this.unitId) {
      setUnitStars(this.unitId, stars);
      progress.quizHistory[this.unitId] = {
        attempts: (progress.quizHistory[this.unitId]?.attempts || 0) + 1,
        bestPct: Math.max(progress.quizHistory[this.unitId]?.bestPct || 0, pct),
      };
    }

    updateStreak();
    checkBadges(this.worldId, pct, elapsed);
    saveProgress(progress);

    return {
      correct: this.correct,
      total,
      pct,
      stars,
      elapsed,
      answers: this.answers,
    };
  }
}

// ── Reset (for dev/testing) ──
function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
  progress = loadProgress();
}
