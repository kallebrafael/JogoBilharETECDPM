(() => {
  const STORAGE_KEY = 'rei-da-mesa-save-v6';
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const els = {
    menuScreen: document.getElementById('menuScreen'),
    gameScreen: document.getElementById('gameScreen'),
    startBtn: document.getElementById('startBtn'),
    vsBotBtn: document.getElementById('vsBotBtn'),
    betBotBtn: document.getElementById('betBotBtn'),
    twoPlayersBtn: document.getElementById('twoPlayersBtn'),
    difficultyBtns: [...document.querySelectorAll('[data-difficulty]')],
    betBtns: [...document.querySelectorAll('[data-bet]')],
    difficultyRow: document.getElementById('difficultyRow'),
    betRow: document.getElementById('betRow'),
    inventoryBtn: document.getElementById('inventoryBtn'),
    shopBtn: document.getElementById('shopBtn'),
    rulesBtn: document.getElementById('rulesBtn'),
    resetBtn: document.getElementById('resetBtn'),
    accountBtn: document.getElementById('accountBtn'),
    historyBtn: document.getElementById('historyBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    gameAccountBtn: document.getElementById('gameAccountBtn'),
    backMenuBtn: document.getElementById('backMenuBtn'),
    gameHistoryBtn: document.getElementById('gameHistoryBtn'),
    accountDialog: document.getElementById('accountDialog'),
    shopDialog: document.getElementById('shopDialog'),
    historyDialog: document.getElementById('historyDialog'),
    settingsDialog: document.getElementById('settingsDialog'),
    rulesDialog: document.getElementById('rulesDialog'),
    resetConfirmDialog: document.getElementById('resetConfirmDialog'),
    endDialog: document.getElementById('endDialog'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    confirmResetBtn: document.getElementById('confirmResetBtn'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    endMenuBtn: document.getElementById('endMenuBtn'),
    avatarGrid: document.getElementById('avatarGrid'),
    inventoryList: document.getElementById('inventoryList'),
    historyList: document.getElementById('historyList'),
    cueList: document.getElementById('cueList'),
    remainingBalls: document.getElementById('remainingBalls'),
    shopList: document.getElementById('shopList'),
    volumeSlider: document.getElementById('volumeSlider'),
    aimAssistToggle: document.getElementById('aimAssistToggle'),
    fastTableToggle: document.getElementById('fastTableToggle'),
    playerNameInput: document.getElementById('playerNameInput'),
    menuChips: document.getElementById('menuChips'),
    gameChips: document.getElementById('gameChips'),
    accountChips: document.getElementById('accountChips'),
    accountSelectedCue: document.getElementById('accountSelectedCue'),
    player0Name: document.getElementById('player0Name'),
    player1Name: document.getElementById('player1Name'),
    player0Group: document.getElementById('player0Group'),
    player1Group: document.getElementById('player1Group'),
    player0Chip: document.getElementById('player0Chip'),
    player1Chip: document.getElementById('player1Chip'),
    player0AvatarImg: document.getElementById('player0AvatarImg'),
    player1AvatarImg: document.getElementById('player1AvatarImg'),
    turnLabel: document.getElementById('turnLabel'),
    modeLabel: document.getElementById('modeLabel'),
    statusBadge: document.getElementById('statusBadge'),
    cueNameBadge: document.getElementById('cueNameBadge'),
    powerFill: document.getElementById('powerFill'),
    endTitle: document.getElementById('endTitle'),
    endText: document.getElementById('endText'),
    restartMatchBtn: document.getElementById('restartMatchBtn'),
    resetAgree: document.getElementById('resetAgree'),
    messageDialog: document.getElementById('messageDialog'),
    messageTitle: document.getElementById('messageTitle'),
    messageText: document.getElementById('messageText'),
    tutorialDialog: document.getElementById('tutorialDialog'),
    tutorialOkBtn: document.getElementById('tutorialOkBtn'),
    toastStack: document.getElementById('toastStack'),
    aimSensitivitySlider: document.getElementById('aimSensitivitySlider'),
    contextTip: document.getElementById('contextTip'),
    difficultyDescription: document.getElementById('difficultyDescription'),
    turnTimer: document.getElementById('turnTimer'),
    canvasHolder: document.getElementById('canvasHolder'),
    spinControl: document.getElementById('spinControl'),
    spinDot: document.getElementById('spinDot')
  };

  const AVATARS = [1, 2, 3, 4, 5, 6].map(n => ({ id: `avatar-${n}.png`, name: `Avatar ${n}`, path: `assets/avatars/avatar-${n}.png` }));

  const CUES = [
    { id: 'basic', name: 'Taco Básico', className: 'basic', power: 1.18, aim: 1.00, source: 'starter', cost: 0 },
    { id: 'easy', name: 'Taco Bronze', className: 'easy', power: 1.26, aim: 1.03, source: 'bot', unlock: 'easy' },
    { id: 'medium', name: 'Taco Azul', className: 'medium', power: 1.34, aim: 1.07, source: 'bot', unlock: 'medium' },
    { id: 'hard', name: 'Taco Inferno', className: 'hard', power: 1.42, aim: 1.10, source: 'bot', unlock: 'hard' },
    { id: 'ruby', name: 'Taco Ruby', className: 'ruby', power: 1.48, aim: 1.12, source: 'shop', cost: 150 },
    { id: 'sapphire', name: 'Taco Sapphire', className: 'sapphire', power: 1.54, aim: 1.15, source: 'shop', cost: 230 },
    { id: 'emerald', name: 'Taco Emerald', className: 'emerald', power: 1.60, aim: 1.18, source: 'shop', cost: 330 },
    { id: 'obsidian', name: 'Taco Obsidian', className: 'obsidian', power: 1.66, aim: 1.20, source: 'shop', cost: 470 },
    { id: 'aurora', name: 'Taco Aurora', className: 'aurora', power: 1.72, aim: 1.22, source: 'shop', cost: 650 },
    { id: 'titan', name: 'Taco Titan', className: 'titan', power: 1.80, aim: 1.25, source: 'shop', cost: 880 },
    { id: 'royal', name: 'Taco Royal', className: 'royal', power: 1.90, aim: 1.28, source: 'shop', cost: 1200 }
  ];

  const BALL_COLORS = {
    1: '#ffd341', 2: '#245ef2', 3: '#e94035', 4: '#7b3fe0', 5: '#ff9832', 6: '#1fa56f', 7: '#8f3e28', 8: '#1a1a1a',
    9: '#ffd341', 10: '#245ef2', 11: '#e94035', 12: '#7b3fe0', 13: '#ff9832', 14: '#1fa56f', 15: '#8f3e28'
  };
  const BOT_NAMES = { easy: 'Bot Fácil', medium: 'Bot Médio', hard: 'Bot Difícil' };
  const DIFFICULTY_NAMES = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  const DIFFICULTY_BONUS = { easy: 45, medium: 90, hard: 160 };
  const BOT_NOISE = { easy: 0.16, medium: 0.08, hard: 0.025 };
  const BET_LEVELS = [25, 50, 100, 250];

  const TABLE = {
    outerX: 110, outerY: 90, outerW: 1180, outerH: 660,
    x: 150, y: 130, w: 1100, h: 580,
    pocketR: 34, ballR: 14
  };
  const POCKETS = [
    { x: TABLE.x, y: TABLE.y },
    { x: TABLE.x + TABLE.w / 2, y: TABLE.y - 3 },
    { x: TABLE.x + TABLE.w, y: TABLE.y },
    { x: TABLE.x, y: TABLE.y + TABLE.h },
    { x: TABLE.x + TABLE.w / 2, y: TABLE.y + TABLE.h + 3 },
    { x: TABLE.x + TABLE.w, y: TABLE.y + TABLE.h }
  ];

  let save = loadSave();
  let selectedMode = 'bot';
  let selectedDifficulty = 'easy';
  let selectedBet = save.bet || 25;
  let selectedCue = sanitizeSelectedCue(save.selectedCue || 'basic');
  let pendingMenuAction = 'vsBot';
  let animationId = null;
  let lastTs = 0;
  let turnDeadline = 0;
  let lastShotWasBreak = false;

  let game = createGame();

  function defaultSave() {
    return {
      chips: 500,
      avatar: 'avatar-1.png',
      selectedCue: 'basic',
      bet: 25,
      settings: { volume: 55, aimAssist: true, fastTable: false, playerName: 'Você', aimSensitivity: 100 },
      tutorialSeen: false,
      history: [],
      botUnlocks: { easy: false, medium: false, hard: false },
      shopOwned: []
    };
  }

  function loadSave() {
    const fallback = defaultSave();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return {
        ...fallback,
        ...parsed,
        settings: { ...fallback.settings, ...(parsed.settings || {}) },
        botUnlocks: { ...fallback.botUnlocks, ...(parsed.botUnlocks || {}) },
        shopOwned: Array.isArray(parsed.shopOwned) ? parsed.shopOwned : [],
        history: Array.isArray(parsed.history) ? parsed.history : []
      };
    } catch {
      return fallback;
    }
  }

  function persist() {
    save.selectedCue = selectedCue;
    save.bet = selectedBet;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
  }

  function sanitizeSelectedCue(id) {
    const cue = CUES.find(c => c.id === id);
    return cue ? id : 'basic';
  }

  function avatarPath(id) {
    return `assets/avatars/${id}`;
  }

  function isCueOwned(cue) {
    if (cue.source === 'starter') return true;
    if (cue.source === 'bot') return !!save.botUnlocks[cue.unlock];
    return save.shopOwned.includes(cue.id);
  }

  function unlockBotCue(diff) {
    if (!save.botUnlocks[diff]) {
      save.botUnlocks[diff] = true;
      const cue = CUES.find(c => c.unlock === diff);
      persist();
      return cue?.name || null;
    }
    return null;
  }

  function buyCue(id) {
    const cue = CUES.find(c => c.id === id && c.source === 'shop');
    if (!cue || isCueOwned(cue)) return false;
    if (save.chips < cue.cost) {
      showMessage('Fichas insuficientes', `Você precisa de ${cue.cost} fichas para comprar ${cue.name}.`);
      return false;
    }
    save.chips -= cue.cost;
    save.shopOwned.push(cue.id);
    selectedCue = cue.id;
    persist();
    renderShop();
    renderInventories();
    updateHUD();
    showToast('Item comprado', `${cue.name} foi adicionado ao seu inventário.`);
    return true;
  }

  function getCueData(id = selectedCue) {
    return CUES.find(c => c.id === id) || CUES[0];
  }

  function cueBall() { return game.balls.find(b => b.id === 0); }
  function activePlayer() { return game.players[game.currentPlayer]; }
  function otherPlayer() { return game.players[1 - game.currentPlayer]; }
  function isStripe(id) { return id >= 9; }
  function isSolid(id) { return id >= 1 && id <= 7; }
  function groupName(group) { return group ? (group === 'solids' ? 'Lisas' : 'Listradas') : 'Grupo aberto'; }
  function isMoving() { return game.balls.some(b => !b.pocketed && (Math.abs(b.vx) > 0.01 || Math.abs(b.vy) > 0.01)); }

  function createGame() {
    return {
      mode: 'bot',
      difficulty: 'easy',
      currentBet: 0,
      currentPlayer: 0,
      players: [
        { name: save.settings.playerName || 'Você', type: 'human', group: null, avatar: save.avatar },
        { name: BOT_NAMES.easy, type: 'bot', group: null, avatar: 'avatar-2.png' }
      ],
      balls: [],
      ballInHand: false,
      active: false,
      shotInProgress: false,
      aiming: false,
      aim: { x: 0, y: 0, power: 0 },
      openTable: true,
      firstHit: null,
      pottedThisTurn: [],
      foul: false,
      status: 'Mesa aberta',
      botTimer: null,
      winner: null,
      turnStartedAt: Date.now(),
      shotCount: 0
    };
  }

  function resetGameState() {
    clearTimeout(game.botTimer);
    game = createGame();
  }

  function setMenuAction(action) {
    pendingMenuAction = action;
    [els.vsBotBtn, els.betBotBtn, els.twoPlayersBtn].forEach(btn => btn.classList.remove('active'));
    if (action === 'vsBot') {
      els.vsBotBtn.classList.add('active');
      selectedMode = 'bot';
      els.difficultyRow.classList.remove('hidden');
      els.betRow.classList.add('hidden');
      setDifficultyButtonsLock(false);
    } else if (action === 'betBot') {
      els.betBotBtn.classList.add('active');
      selectedMode = 'bot';
      els.difficultyRow.classList.remove('hidden');
      els.betRow.classList.remove('hidden');
      selectedDifficulty = 'hard';
      setDifficultyButtonsLock(true);
    } else {
      els.twoPlayersBtn.classList.add('active');
      selectedMode = 'two';
      els.difficultyRow.classList.add('hidden');
      els.betRow.classList.add('hidden');
      setDifficultyButtonsLock(false);
    }
    renderDifficultySelection();
  }

  function setDifficultyButtonsLock(lockForBet) {
    els.difficultyBtns.forEach(btn => {
      const isHard = btn.dataset.difficulty === 'hard';
      btn.disabled = lockForBet && !isHard;
      btn.classList.toggle('locked-choice', lockForBet && !isHard);
    });
  }

  function renderDifficultySelection() {
    els.difficultyBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.difficulty === selectedDifficulty));
    els.betBtns.forEach(btn => btn.classList.toggle('active', Number(btn.dataset.bet) === selectedBet));
    const descriptions = {
      easy: 'Fácil: o bot joga simples, erra mais e é ideal para treinar.',
      medium: 'Médio: o bot tenta jogadas diretas com precisão moderada.',
      hard: 'Difícil: o bot escolhe melhores jogadas e erra menos. Apostas fictícias ficam liberadas aqui.'
    };
    if (els.difficultyDescription) els.difficultyDescription.textContent = descriptions[selectedDifficulty];
  }

  function createBalls() {
    const balls = [];
    balls.push({ id: 0, x: TABLE.x + TABLE.w * 0.25, y: TABLE.y + TABLE.h / 2, vx: 0, vy: 0, r: TABLE.ballR, pocketed: false, stripe: false });
    const rackX = TABLE.x + TABLE.w * 0.73;
    const rackY = TABLE.y + TABLE.h / 2;
    const ids = [1, 9, 2, 10, 8, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15];
    let idx = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col <= row; col++) {
        const x = rackX + row * (TABLE.ballR * 2 - 1.5);
        const y = rackY - row * TABLE.ballR + col * TABLE.ballR * 2;
        const id = ids[idx++];
        balls.push({ id, x, y, vx: 0, vy: 0, r: TABLE.ballR, pocketed: false, stripe: id > 8 });
      }
    }
    return balls;
  }

  function setSelectedCue(id) {
    const cue = CUES.find(c => c.id === id);
    if (!cue || !isCueOwned(cue)) return;
    selectedCue = id;
    persist();
    renderInventories();
    updateHUD();
  }

  function renderAvatars() {
    els.avatarGrid.innerHTML = '';
    AVATARS.forEach(av => {
      const btn = document.createElement('button');
      btn.className = `avatar-option ${save.avatar === av.id ? 'active' : ''}`;
      btn.innerHTML = `<img src="${av.path}" alt="${av.name}"><strong>${av.name}</strong>`;
      btn.addEventListener('click', () => {
        save.avatar = av.id;
        persist();
        renderAvatars();
        updateHUD();
      });
      els.avatarGrid.appendChild(btn);
    });
  }

  function renderCueCard(cue, forMini = false) {
    const owned = isCueOwned(cue);
    const button = document.createElement('button');
    button.className = `${forMini ? 'cue-item' : 'inventory-card'} ${selectedCue === cue.id ? 'active' : ''}`;
    button.disabled = !owned;
    button.innerHTML = `
      <div class="cue-stick-preview ${cue.className}"></div>
      <div class="inventory-meta">
        <strong>${cue.name}</strong>
        <small>Força ${Math.round(cue.power * 100)} • Mira ${Math.round(cue.aim * 100)} • Controle ${cue.source === 'shop' ? 'Avançado' : 'Padrão'}</small>
      </div>
      <span class="badge ${owned ? '' : 'locked'}">${owned ? (selectedCue === cue.id ? 'Usando' : 'Usar') : 'Bloqueado'}</span>
    `;
    if (owned) button.addEventListener('click', () => setSelectedCue(cue.id));
    return button;
  }

  function renderInventories() {
    const ownedCues = CUES.filter(isCueOwned);
    els.cueList.innerHTML = '';
    els.inventoryList.innerHTML = '';
    ownedCues.forEach(cue => {
      els.cueList.appendChild(renderCueCard(cue, true));
      els.inventoryList.appendChild(renderCueCard(cue, false));
    });
    els.accountSelectedCue.textContent = getCueData().name;
  }

  function renderShop() {
    els.shopList.innerHTML = '';
    CUES.filter(c => c.source === 'shop').forEach(cue => {
      const owned = isCueOwned(cue);
      const item = document.createElement('div');
      item.className = 'shop-card';
      item.innerHTML = `
        <div class="cue-stick-preview ${cue.className}"></div>
        <div class="shop-meta">
          <strong>${cue.name}</strong>
          <small>Força ${Math.round(cue.power * 100)} • Mira ${Math.round(cue.aim * 100)} • Controle ${cue.source === 'shop' ? 'Avançado' : 'Padrão'}</small>
          <small>Custo: ${cue.cost} fichas</small>
        </div>
        <button class="buy-btn ${owned ? 'owned' : ''}" ${owned ? 'disabled' : ''}>${owned ? 'Comprado' : 'Comprar'}</button>
      `;
      const btn = item.querySelector('button');
      if (!owned) btn.addEventListener('click', () => buyCue(cue.id));
      els.shopList.appendChild(item);
    });
  }

  function renderHistory() {
    els.historyList.innerHTML = '';
    if (!save.history.length) {
      const empty = document.createElement('div');
      empty.className = 'history-item';
      empty.innerHTML = '<strong>Nenhuma partida ainda.</strong><small>Jogue para preencher o histórico.</small>';
      els.historyList.appendChild(empty);
      return;
    }
    [...save.history].reverse().forEach(entry => {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `<strong>${entry.title}</strong><small>${entry.text}</small><small>${entry.mode || ''} ${entry.difficulty ? '• ' + entry.difficulty : ''} ${entry.chips ? '• ' + entry.chips : ''}</small><small>${entry.time}</small>`;
      els.historyList.appendChild(item);
    });
  }

  function addHistory(title, text) {
    save.history.push({ title, text, mode: game.mode === 'two' ? '2 Jogadores' : 'VS Bot', difficulty: game.mode === 'bot' ? DIFFICULTY_NAMES[game.difficulty] : '', chips: game.currentBet ? `${game.currentBet} fichas` : 'sem aposta', time: new Date().toLocaleString('pt-BR') });
    save.history = save.history.slice(-50);
    persist();
    renderHistory();
  }

  function startMatch() {
    resetGameState();
    game.mode = selectedMode;
    game.difficulty = selectedDifficulty;
    game.currentBet = pendingMenuAction === 'betBot' && selectedMode === 'bot' ? selectedBet : 0;
    game.players[0] = { name: save.settings.playerName || 'Você', type: 'human', group: null, avatar: save.avatar };
    if (selectedMode === 'two') {
      game.players[1] = { name: 'Jogador 2', type: 'human', group: null, avatar: 'avatar-6.png' };
    } else {
      const avatarByDiff = selectedDifficulty === 'easy' ? 'avatar-2.png' : selectedDifficulty === 'medium' ? 'avatar-3.png' : 'avatar-4.png';
      game.players[1] = { name: BOT_NAMES[selectedDifficulty], type: 'bot', group: null, avatar: avatarByDiff };
    }

    if (game.currentBet > 0) {
      if (selectedDifficulty !== 'hard') {
        showMessage('Modo bloqueado', 'Partidas com fichas fictícias só ficam disponíveis no bot Difícil.');
        setMenuAction('betBot');
        return;
      }
      if (save.chips < game.currentBet) {
        showMessage('Fichas insuficientes', 'Você não tem fichas suficientes para essa mesa. Jogue sem aposta ou escolha uma aposta menor.');
        return;
      }
      save.chips -= game.currentBet;
      persist();
    }

    game.balls = createBalls();
    game.active = true;
    lastShotWasBreak = true;
    startTurnTimer();
    game.status = selectedMode === 'two' ? 'Partida local iniciada.' : `Partida contra ${BOT_NAMES[selectedDifficulty]} iniciada.`;
    els.menuScreen.classList.add('hidden');
    els.gameScreen.classList.remove('hidden');
    updateHUD();
    draw();
    if (!animationId) animationId = requestAnimationFrame(loop);
    if (!save.tutorialSeen) {
      setTimeout(() => els.tutorialDialog?.showModal(), 250);
    }
    showToast('Partida iniciada', game.status);
    if (activePlayer().type === 'bot') scheduleBotTurn();
  }

  function updateHUD() {
    els.menuChips.textContent = save.chips;
    els.gameChips.textContent = save.chips;
    els.accountChips.textContent = save.chips;
    els.accountSelectedCue.textContent = getCueData().name;
    els.player0Name.textContent = game.players[0].name;
    els.player1Name.textContent = game.players[1].name;
    els.player0Group.textContent = groupName(game.players[0].group);
    els.player1Group.textContent = groupName(game.players[1].group);
    els.player0Chip.classList.toggle('active-turn', game.currentPlayer === 0);
    els.player1Chip.classList.toggle('active-turn', game.currentPlayer === 1);
    els.turnLabel.textContent = activePlayer().name;
    els.modeLabel.textContent = game.mode === 'two' ? '2 Jogadores' : `VS Bot • ${DIFFICULTY_NAMES[game.difficulty]}`;
    els.statusBadge.textContent = game.status;
    els.cueNameBadge.textContent = getCueData().name;
    els.player0AvatarImg.src = avatarPath(save.avatar);
    els.player1AvatarImg.src = avatarPath(game.players[1].avatar);
    if (document.activeElement !== els.playerNameInput) els.playerNameInput.value = save.settings.playerName || 'Você';
    els.volumeSlider.value = save.settings.volume;
    els.aimAssistToggle.checked = save.settings.aimAssist;
    els.fastTableToggle.checked = save.settings.fastTable;
    els.aimSensitivitySlider.value = save.settings.aimSensitivity || 100;
    updateContextTip();
    updateTurnTimer();
    renderRemainingBalls();
    renderInventories();
    renderShop();
    renderHistory();
    renderAvatars();
    renderDifficultySelection();
  }

  function renderRemainingBalls() {
    els.remainingBalls.innerHTML = '';
    if (!game.balls.length) return;
    game.balls.filter(b => b.id !== 0).forEach(ball => {
      const div = document.createElement('div');
      div.className = `ball-mini ${ball.pocketed ? 'inactive' : ''}`;
      div.style.background = ball.id !== 8 && ball.stripe
        ? `linear-gradient(180deg, ${BALL_COLORS[ball.id]} 0 28%, #ffffff 28% 72%, ${BALL_COLORS[ball.id]} 72% 100%)`
        : BALL_COLORS[ball.id];
      els.remainingBalls.appendChild(div);
    });
  }

  function loop(ts) {
    const dt = Math.min(24, ts - lastTs || 16);
    lastTs = ts;
    updatePhysics(dt);
    draw();
    updateTurnTimer();
    animationId = requestAnimationFrame(loop);
  }

  function updatePhysics(dt) {
    if (!game.active || !game.balls.length) return;
    const maxSpeed = Math.max(0.1, ...game.balls.map(b => Math.hypot(b.vx, b.vy)));
    const steps = Math.min(24, Math.max(5, Math.ceil(maxSpeed / 1.55)));
    const friction = save.settings.fastTable ? 0.994 : 0.990;
    let anyMoving = false;

    for (let s = 0; s < steps; s++) {
      game.balls.forEach(ball => {
        if (ball.pocketed) return;
        ball.x += ball.vx / steps;
        ball.y += ball.vy / steps;

        if (ball.x - ball.r < TABLE.x) { ball.x = TABLE.x + ball.r; ball.vx *= -0.94; }
        if (ball.x + ball.r > TABLE.x + TABLE.w) { ball.x = TABLE.x + TABLE.w - ball.r; ball.vx *= -0.94; }
        if (ball.y - ball.r < TABLE.y) { ball.y = TABLE.y + ball.r; ball.vy *= -0.94; }
        if (ball.y + ball.r > TABLE.y + TABLE.h) { ball.y = TABLE.y + TABLE.h - ball.r; ball.vy *= -0.94; }

        for (const pocket of POCKETS) {
          if (Math.hypot(ball.x - pocket.x, ball.y - pocket.y) < TABLE.pocketR - 5) {
            pocketBall(ball);
            break;
          }
        }
      });

      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < game.balls.length; i++) {
          const a = game.balls[i];
          if (a.pocketed) continue;
          for (let j = i + 1; j < game.balls.length; j++) {
            const b = game.balls[j];
            if (b.pocketed) continue;
            resolveCollision(a, b);
          }
        }
      }
    }

    game.balls.forEach(ball => {
      if (ball.pocketed) return;
      ball.vx *= friction;
      ball.vy *= friction;
      if (Math.abs(ball.vx) < 0.01) ball.vx = 0;
      if (Math.abs(ball.vy) < 0.01) ball.vy = 0;
      if (ball.vx || ball.vy) anyMoving = true;
    });

    if (game.shotInProgress && !anyMoving) {
      game.shotInProgress = false;
      resolveTurn();
    }
  }

  function resolveCollision(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.hypot(dx, dy);
    const minDist = a.r + b.r;
    if (!dist || dist >= minDist) return;

    const nx = dx / dist;
    const ny = dy / dist;
    const overlap = minDist - dist;
    a.x -= nx * overlap / 2;
    a.y -= ny * overlap / 2;
    b.x += nx * overlap / 2;
    b.y += ny * overlap / 2;

    const relVel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
    if (relVel >= 0) return;

    if (game.firstHit == null && (a.id === 0 || b.id === 0)) {
      game.firstHit = a.id === 0 ? b.id : a.id;
    }

    const restitution = 0.985;
    const impulse = -relVel * restitution;
    a.vx -= impulse * nx;
    a.vy -= impulse * ny;
    b.vx += impulse * nx;
    b.vy += impulse * ny;

    const tangentDamp = 0.997;
    a.vx *= tangentDamp; a.vy *= tangentDamp;
    b.vx *= tangentDamp; b.vy *= tangentDamp;
  }

  function pocketBall(ball) {
    if (ball.pocketed) return;
    ball.pocketed = true;
    ball.vx = 0;
    ball.vy = 0;
    if (ball.id === 0) {
      game.foul = true;
      game.ballInHand = true;
      game.status = 'Falta: bola branca encaçapada.';
      return;
    }
    game.pottedThisTurn.push(ball.id);
  }

  function openBallsFor(playerIndex) {
    const group = game.players[playerIndex].group;
    if (!group) return game.balls.filter(b => !b.pocketed && b.id !== 0 && b.id !== 8);
    return game.balls.filter(b => !b.pocketed && (group === 'solids' ? isSolid(b.id) : isStripe(b.id)));
  }

  function onlyEightLeft(playerIndex) {
    return openBallsFor(playerIndex).length === 0;
  }

  function resolveTurn() {
    const current = activePlayer();
    const opponent = otherPlayer();

    if (game.firstHit == null) game.foul = true;
    if (game.firstHit === 8 && !onlyEightLeft(game.currentPlayer)) game.foul = true;
    if (current.group && game.firstHit && game.firstHit !== 8) {
      const valid = current.group === 'solids' ? isSolid(game.firstHit) : isStripe(game.firstHit);
      if (!valid) game.foul = true;
    }

    if (!current.group && game.pottedThisTurn.length) {
      const first = game.pottedThisTurn.find(id => id !== 8);
      if (first) {
        current.group = isSolid(first) ? 'solids' : 'stripes';
        opponent.group = current.group === 'solids' ? 'stripes' : 'solids';
        showToast('Grupo definido', `${current.name} ficou com ${groupName(current.group)}.`);
      }
    }

    if (game.pottedThisTurn.includes(8)) {
      if (onlyEightLeft(game.currentPlayer) && !game.foul) {
        finishGame(game.currentPlayer, `${current.name} encaçapou a bola 8 legalmente.`);
      } else {
        finishGame(1 - game.currentPlayer, `${current.name} encaçapou a bola 8 antes da hora.`);
      }
      return;
    }

    let keepTurn = false;
    if (!game.foul) {
      if (!current.group) keepTurn = game.pottedThisTurn.length > 0;
      else keepTurn = game.pottedThisTurn.some(id => current.group === 'solids' ? isSolid(id) : isStripe(id));
    }

    if (game.foul) {
      game.currentPlayer = 1 - game.currentPlayer;
      game.ballInHand = true;
      game.status = 'Falta. Adversário com bola na mão.';
      showToast('Falta', 'Bola na mão para o adversário.');
    } else if (keepTurn) {
      game.status = `${current.name} continua jogando.`;
      showToast('Boa tacada', `${current.name} continua na mesa.`);
    } else {
      game.currentPlayer = 1 - game.currentPlayer;
      game.status = 'Vez do adversário.';
    }

    respotCueBallIfNeeded();
    game.firstHit = null;
    game.pottedThisTurn = [];
    game.foul = false;
    startTurnTimer();
    updateHUD();
    if (activePlayer().type === 'bot') scheduleBotTurn();
  }

  function respotCueBallIfNeeded() {
    const cue = cueBall();
    if (!cue) return;
    if (cue.pocketed) {
      cue.pocketed = false;
      cue.x = TABLE.x + TABLE.w * 0.25;
      cue.y = TABLE.y + TABLE.h / 2;
      cue.vx = 0;
      cue.vy = 0;
    }
  }

  function finishGame(winnerIndex, reason) {
    game.active = false;
    clearTimeout(game.botTimer);
    const winner = game.players[winnerIndex];
    let extra = '';

    if (game.mode === 'bot' && winnerIndex === 0) {
      const cueName = unlockBotCue(game.difficulty);
      if (cueName) extra += ` Você desbloqueou ${cueName}.`;
      if (game.currentBet > 0) {
        const reward = game.currentBet * 2 + DIFFICULTY_BONUS[game.difficulty];
        save.chips += reward;
        extra += ` Você ganhou ${reward} fichas.`;
      }
    }

    persist();
    addHistory(winner.name, `${reason}${extra}`);
    showToast(winnerIndex === 0 ? 'Vitória!' : 'Fim de jogo', `${reason}${extra}`);
    updateHUD();
    els.endTitle.textContent = `${winner.name} venceu!`;
    els.endText.textContent = `${reason}${extra}`;
    els.endDialog.showModal();
  }

  function scheduleBotTurn() {
    clearTimeout(game.botTimer);
    game.botTimer = setTimeout(botPlay, 900);
  }

  function botPlay() {
    if (!game.active || activePlayer().type !== 'bot') return;
    const cue = cueBall();
    if (game.ballInHand) placeBotCueBall();
    const newCue = cueBall();
    const candidates = onlyEightLeft(game.currentPlayer)
      ? game.balls.filter(b => !b.pocketed && b.id === 8)
      : openBallsFor(game.currentPlayer);

    if (!candidates.length) {
      fallbackBotShot();
      return;
    }

    const shot = findBotShot(newCue, candidates);
    if (!shot) {
      fallbackBotShot();
      return;
    }

    const noise = BOT_NOISE[game.difficulty] || 0.08;
    const ang = Math.atan2(shot.dir.y, shot.dir.x) + (Math.random() * 2 - 1) * noise;
    const speedBase = game.difficulty === 'easy' ? 10.2 : game.difficulty === 'medium' ? 11.2 : 12.0;
    const speed = speedBase * shot.power;
    newCue.vx = Math.cos(ang) * speed;
    newCue.vy = Math.sin(ang) * speed;
    beginShot();
  }

  function placeBotCueBall() {
    const cue = cueBall();
    const candidateXs = [0.24, 0.26, 0.28, 0.30].map(r => TABLE.x + TABLE.w * r);
    const candidateYs = [0.35, 0.5, 0.65].map(r => TABLE.y + TABLE.h * r);
    outer:
    for (const x of candidateXs) {
      for (const y of candidateYs) {
        if (isCuePlacementValid(x, y)) {
          cue.x = x; cue.y = y; cue.vx = 0; cue.vy = 0; cue.pocketed = false;
          game.ballInHand = false;
          break outer;
        }
      }
    }
  }

  function findBotShot(cue, candidates) {
    let best = null;
    for (const ball of candidates) {
      for (const pocket of POCKETS) {
        const bpdx = pocket.x - ball.x;
        const bpdy = pocket.y - ball.y;
        const len = Math.hypot(bpdx, bpdy) || 1;
        const contactX = ball.x - (bpdx / len) * (TABLE.ballR * 2);
        const contactY = ball.y - (bpdy / len) * (TABLE.ballR * 2);
        if (!isPointInTable(contactX, contactY)) continue;
        if (!isPathClear(cue.x, cue.y, contactX, contactY, [0, ball.id])) continue;
        if (!isPathClear(ball.x, ball.y, pocket.x, pocket.y, [ball.id])) continue;
        const shotDx = contactX - cue.x;
        const shotDy = contactY - cue.y;
        const shotLen = Math.hypot(shotDx, shotDy) || 1;
        const score = shotLen + len * 0.4;
        if (!best || score < best.score) {
          best = { score, dir: { x: shotDx / shotLen, y: shotDy / shotLen }, power: clamp(shotLen / 220, 0.78, 1.18) };
        }
      }
    }
    if (best) return best;

    const nearest = [...candidates].sort((a, b) => Math.hypot(cue.x - a.x, cue.y - a.y) - Math.hypot(cue.x - b.x, cue.y - b.y))[0];
    if (!nearest) return null;
    const dx = nearest.x - cue.x;
    const dy = nearest.y - cue.y;
    const d = Math.hypot(dx, dy) || 1;
    return { dir: { x: dx / d, y: dy / d }, power: clamp(d / 240, 0.7, 1.05), score: d };
  }

  function fallbackBotShot() {
    const cue = cueBall();
    const ang = Math.random() * Math.PI * 2;
    cue.vx = Math.cos(ang) * 7.8;
    cue.vy = Math.sin(ang) * 7.8;
    beginShot();
  }

  function isPointInTable(x, y) {
    return x > TABLE.x + TABLE.ballR && x < TABLE.x + TABLE.w - TABLE.ballR && y > TABLE.y + TABLE.ballR && y < TABLE.y + TABLE.h - TABLE.ballR;
  }

  function isPathClear(x1, y1, x2, y2, ignoreIds = []) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    for (const ball of game.balls) {
      if (ball.pocketed || ignoreIds.includes(ball.id)) continue;
      const t = clamp(((ball.x - x1) * dx + (ball.y - y1) * dy) / (len * len), 0, 1);
      const px = x1 + dx * t;
      const py = y1 + dy * t;
      const dist = Math.hypot(ball.x - px, ball.y - py);
      if (dist < TABLE.ballR * 1.95) return false;
    }
    return true;
  }

  function beginShot() {
    game.shotCount += 1;
    game.shotInProgress = true;
    game.aiming = false;
    game.firstHit = null;
    game.pottedThisTurn = [];
    game.foul = false;
    game.ballInHand = false;
    els.powerFill.style.height = '0%';
    els.canvasHolder?.classList.add('impact');
    setTimeout(() => els.canvasHolder?.classList.remove('impact'), 220);
  }

  function screenToCanvas(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) * (canvas.width / rect.width),
      y: (evt.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function onPointerDown(evt) {
    if (!game.active || activePlayer().type === 'bot' || isMoving()) return;
    const pos = screenToCanvas(evt);
    if (game.ballInHand) {
      if (isCuePlacementValid(pos.x, pos.y)) {
        const cue = cueBall();
        cue.x = pos.x;
        cue.y = pos.y;
        cue.vx = 0;
        cue.vy = 0;
        game.ballInHand = false;
        game.status = 'Bola reposicionada.';
        updateHUD();
      }
      return;
    }
    game.aiming = true;
    updateContextTip();
    setAimFromPointer(pos);
    updatePowerFromAim();
  }

  function onPointerMove(evt) {
    if (!game.aiming) return;
    const pos = screenToCanvas(evt);
    setAimFromPointer(pos);
    updatePowerFromAim();
    updateContextTip();
  }

  function onPointerUp() {
    if (!game.aiming || !game.active || activePlayer().type === 'bot') return;
    game.aiming = false;
    updateContextTip();
    const cue = cueBall();
    const dx = cue.x - game.aim.x;
    const dy = cue.y - game.aim.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 8) {
      els.powerFill.style.height = '0%';
      return;
    }
    const capped = Math.min(230, dist);
    const cueStats = getCueData();
    let power = (capped / 8.4) * cueStats.power;
    if (game.shotCount === 0) power *= 1.28; // quebra inicial mais forte para espalhar as bolas
    cue.vx = (dx / dist) * power;
    cue.vy = (dy / dist) * power;
    beginShot();
  }

  function setAimFromPointer(pos) {
    const cue = cueBall();
    const sens = clamp((save.settings.aimSensitivity || 100) / 100, .6, 1.5);
    game.aim.x = cue.x + (pos.x - cue.x) * sens;
    game.aim.y = cue.y + (pos.y - cue.y) * sens;
  }

  function updatePowerFromAim() {
    const cue = cueBall();
    const dx = cue.x - game.aim.x;
    const dy = cue.y - game.aim.y;
    const dist = Math.min(230, Math.hypot(dx, dy));
    game.aim.power = dist / 230;
    els.powerFill.style.height = `${game.aim.power * 100}%`;
  }

  function isCuePlacementValid(x, y) {
    if (!isPointInTable(x, y)) return false;
    return !game.balls.some(ball => !ball.pocketed && ball.id !== 0 && Math.hypot(ball.x - x, ball.y - y) < TABLE.ballR * 2 + 3);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSceneBackground();
    drawTable();
    drawAimGuide();
    drawBalls();
    if (game.active && game.aiming && activePlayer().type === 'human' && !game.ballInHand) drawCueStick();
    if (game.active && game.ballInHand) drawBallInHandHint();
  }

  function drawSceneBackground() {
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0, '#0a1622');
    g.addColorStop(1, '#04080d');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawTable() {
    const wood = ctx.createLinearGradient(TABLE.outerX, TABLE.outerY, TABLE.outerX + TABLE.outerW, TABLE.outerY + TABLE.outerH);
    wood.addColorStop(0, '#84422f');
    wood.addColorStop(.5, '#5d261c');
    wood.addColorStop(1, '#8d5036');
    roundRect(TABLE.outerX, TABLE.outerY, TABLE.outerW, TABLE.outerH, 28, wood);

    const rail = ctx.createLinearGradient(TABLE.x - 30, TABLE.y - 30, TABLE.x + TABLE.w + 30, TABLE.y + TABLE.h + 30);
    rail.addColorStop(0, '#29854a');
    rail.addColorStop(1, '#0a4d27');
    roundRect(TABLE.x - 30, TABLE.y - 30, TABLE.w + 60, TABLE.h + 60, 24, rail);

    const cloth = ctx.createLinearGradient(TABLE.x, TABLE.y, TABLE.x + TABLE.w, TABLE.y + TABLE.h);
    cloth.addColorStop(0, '#11ad56');
    cloth.addColorStop(.55, '#0b9746');
    cloth.addColorStop(1, '#087936');
    roundRect(TABLE.x, TABLE.y, TABLE.w, TABLE.h, 18, cloth);

    const shine = ctx.createRadialGradient(TABLE.x + TABLE.w * .25, TABLE.y + TABLE.h * .25, 40, TABLE.x + TABLE.w * .25, TABLE.y + TABLE.h * .25, TABLE.w * .7);
    shine.addColorStop(0, 'rgba(255,255,255,.10)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shine;
    roundRect(TABLE.x, TABLE.y, TABLE.w, TABLE.h, 18, shine, true);

    ctx.strokeStyle = 'rgba(255,255,255,.14)';
    ctx.lineWidth = 2;
    ctx.strokeRect(TABLE.x + 2, TABLE.y + 2, TABLE.w - 4, TABLE.h - 4);

    ctx.strokeStyle = 'rgba(255,255,255,.18)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(TABLE.x + TABLE.w * 0.25, TABLE.y + 18);
    ctx.lineTo(TABLE.x + TABLE.w * 0.25, TABLE.y + TABLE.h - 18);
    ctx.stroke();

    for (const p of POCKETS) {
      ctx.fillStyle = '#08090b';
      ctx.beginPath();
      ctx.arc(p.x, p.y, TABLE.pocketR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.12)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function drawBalls() {
    for (const ball of game.balls) {
      if (ball.pocketed) continue;
      const base = ball.id === 0 ? '#f8f8f8' : BALL_COLORS[ball.id];
      const grad = ctx.createRadialGradient(ball.x - ball.r * 0.38, ball.y - ball.r * 0.38, 2, ball.x, ball.y, ball.r);
      grad.addColorStop(0, lighten(base, 0.55));
      grad.addColorStop(0.45, ball.id === 0 ? '#ffffff' : base);
      grad.addColorStop(1, darken(base, 0.35));
      ctx.save();
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.clip();
      if (ball.id !== 8 && ball.stripe) {
        ctx.fillStyle = base;
        ctx.fillRect(ball.x - ball.r, ball.y - ball.r, ball.r * 2, ball.r * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ball.x - ball.r, ball.y - ball.r * 0.52, ball.r * 2, ball.r * 1.04);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = grad;
        ctx.fillRect(ball.x - ball.r, ball.y - ball.r, ball.r * 2, ball.r * 2);
      } else {
        ctx.fillStyle = grad;
        ctx.fillRect(ball.x - ball.r, ball.y - ball.r, ball.r * 2, ball.r * 2);
      }
      ctx.restore();
      ctx.strokeStyle = 'rgba(0,0,0,.26)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.stroke();

      // brilho
      ctx.fillStyle = 'rgba(255,255,255,.35)';
      ctx.beginPath();
      ctx.arc(ball.x - ball.r * .34, ball.y - ball.r * .36, ball.r * .22, 0, Math.PI * 2);
      ctx.fill();

      if (ball.id !== 0) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r * .44, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#111';
        ctx.font = `bold ${ball.r * .72}px Trebuchet MS`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ball.id, ball.x, ball.y + .5);
      }
    }
  }

  function drawAimGuide() {
    if (!game.active || !game.aiming || game.ballInHand || activePlayer().type !== 'human') return;
    const cue = cueBall();
    const dx = cue.x - game.aim.x;
    const dy = cue.y - game.aim.y;
    const len = Math.hypot(dx, dy);
    if (!len) return;
    const dirx = dx / len;
    const diry = dy / len;
    const firstBallHit = findFirstBallOnRay(cue.x, cue.y, dirx, diry);
    const wallHit = rayToWall(cue.x, cue.y, dirx, diry);
    const endPoint = firstBallHit && firstBallHit.distance < wallHit.distance ? firstBallHit.point : wallHit.point;

    ctx.save();
    ctx.setLineDash([12, 10]);
    ctx.strokeStyle = 'rgba(255,255,255,.82)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cue.x + dirx * cue.r, cue.y + diry * cue.r);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();

    if (firstBallHit && firstBallHit.distance < wallHit.distance) {
      const ball = firstBallHit.ball;
      const proj = projectTargetDirection(firstBallHit, dirx, diry);
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = 'rgba(255,234,140,.9)';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(ball.x, ball.y);
      ctx.lineTo(proj.target.x, proj.target.y);
      ctx.stroke();

      ctx.setLineDash([7, 9]);
      ctx.strokeStyle = 'rgba(120,210,255,.75)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(firstBallHit.point.x, firstBallHit.point.y);
      ctx.lineTo(proj.cue.x, proj.cue.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function projectTargetDirection(hit, dirx, diry) {
    const ball = hit.ball;
    const normalX = ball.x - hit.point.x;
    const normalY = ball.y - hit.point.y;
    const nlen = Math.hypot(normalX, normalY) || 1;
    const nx = normalX / nlen;
    const ny = normalY / nlen;

    const dot = dirx * nx + diry * ny;
    let tx = dirx - nx * dot;
    let ty = diry - ny * dot;
    const tlen = Math.hypot(tx, ty) || 1;
    tx /= tlen; ty /= tlen;

    return {
      target: { x: ball.x + nx * 165, y: ball.y + ny * 165 },
      cue: { x: hit.point.x + tx * 95, y: hit.point.y + ty * 95 }
    };
  }

  function findFirstBallOnRay(x, y, dx, dy) {
    let best = null;
    for (const ball of game.balls) {
      if (ball.pocketed || ball.id === 0) continue;
      const fx = x - ball.x;
      const fy = y - ball.y;
      const b = 2 * (fx * dx + fy * dy);
      const c = fx * fx + fy * fy - (TABLE.ballR * 2) ** 2;
      const disc = b * b - 4 * c;
      if (disc < 0) continue;
      const t = (-b - Math.sqrt(disc)) / 2;
      if (t > 0 && (!best || t < best.distance)) {
        best = { distance: t, ball, point: { x: x + dx * t, y: y + dy * t } };
      }
    }
    return best;
  }

  function rayToWall(x, y, dx, dy) {
    const candidates = [];
    if (dx > 0) candidates.push((TABLE.x + TABLE.w - TABLE.ballR - x) / dx);
    if (dx < 0) candidates.push((TABLE.x + TABLE.ballR - x) / dx);
    if (dy > 0) candidates.push((TABLE.y + TABLE.h - TABLE.ballR - y) / dy);
    if (dy < 0) candidates.push((TABLE.y + TABLE.ballR - y) / dy);
    const t = Math.min(...candidates.filter(v => v > 0));
    return { distance: t, point: { x: x + dx * t, y: y + dy * t } };
  }

  function drawCueStick() {
    const cue = cueBall();
    const dx = cue.x - game.aim.x;
    const dy = cue.y - game.aim.y;
    const len = Math.hypot(dx, dy) || 1;
    const dirx = dx / len;
    const diry = dy / len;
    const px = -diry;
    const py = dirx;
    const pull = 16 + game.aim.power * 92;
    const tipX = cue.x - dirx * (cue.r + 10 + pull);
    const tipY = cue.y - diry * (cue.r + 10 + pull);
    const buttX = tipX - dirx * 560;
    const buttY = tipY - diry * 560;
    const palette = cuePalette(getCueData().id);

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.38)';
    ctx.shadowBlur = 12;

    const grad = ctx.createLinearGradient(buttX, buttY, tipX, tipY);
    grad.addColorStop(0, palette[2]);
    grad.addColorStop(.45, palette[1]);
    grad.addColorStop(1, palette[0]);
    ctx.strokeStyle = grad;
    ctx.lineCap = 'round';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(buttX, buttY);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,.36)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(buttX + px * 1.2, buttY + py * 1.2);
    ctx.lineTo(tipX + px * 1.2, tipY + py * 1.2);
    ctx.stroke();

    ctx.strokeStyle = '#201511';
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(buttX, buttY);
    ctx.lineTo(buttX + dirx * 88, buttY + diry * 88);
    ctx.stroke();

    ctx.strokeStyle = '#ecf8ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tipX - dirx * 16, tipY - diry * 16);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();
    ctx.restore();
  }

  function cuePalette(id) {
    const cue = CUES.find(c => c.id === id);
    switch (cue?.className) {
      case 'easy': return ['#fff6d9', '#dbb65d', '#6e5227'];
      case 'medium': return ['#f7f4ff', '#8aa8ff', '#3556bb'];
      case 'hard': return ['#fff4e4', '#ff9067', '#7c2530'];
      case 'ruby': return ['#fdebe5', '#ff7272', '#861f42'];
      case 'sapphire': return ['#eff4ff', '#5cb0ff', '#3347b2'];
      case 'emerald': return ['#effff7', '#4cd29a', '#20644f'];
      case 'obsidian': return ['#fff2de', '#b1a09a', '#372f35'];
      case 'aurora': return ['#fbfffe', '#59a9ff', '#ab71ff'];
      case 'titan': return ['#fff7ec', '#d67e32', '#493221'];
      case 'royal': return ['#fff8ef', '#f6d989', '#4f347d'];
      default: return ['#f8edce', '#bf8c43', '#4f2f1d'];
    }
  }

  function drawBallInHandHint() {
    const cue = cueBall();
    ctx.save();
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = 'rgba(255,255,255,.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cue.x, cue.y, cue.r + 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function roundRect(x, y, w, h, r, fill, onlyFill = false) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (!onlyFill) ctx.stroke();
  }

  function lighten(hex, amount) {
    const rgb = hexToRgb(hex);
    const mix = c => Math.round(c + (255 - c) * amount);
    return `rgb(${mix(rgb.r)},${mix(rgb.g)},${mix(rgb.b)})`;
  }

  function darken(hex, amount) {
    const rgb = hexToRgb(hex);
    const mix = c => Math.round(c * (1 - amount));
    return `rgb(${mix(rgb.r)},${mix(rgb.g)},${mix(rgb.b)})`;
  }

  function hexToRgb(hex) {
    const value = hex.replace('#', '');
    const full = value.length === 3 ? value.split('').map(v => v + v).join('') : value;
    const num = parseInt(full, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function backToMenu() {
    resetGameState();
    els.gameScreen.classList.add('hidden');
    els.menuScreen.classList.remove('hidden');
    draw();
  }

  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    save = loadSave();
    selectedCue = 'basic';
    selectedDifficulty = 'easy';
    selectedBet = 25;
    setMenuAction('vsBot');
    updateHUD();
    renderShop();
    renderHistory();
    renderAvatars();
    renderInventories();
  }

  // events
  els.vsBotBtn.addEventListener('click', () => setMenuAction('vsBot'));
  els.betBotBtn.addEventListener('click', () => setMenuAction('betBot'));
  els.twoPlayersBtn.addEventListener('click', () => setMenuAction('two'));
  els.difficultyBtns.forEach(btn => btn.addEventListener('click', () => {
    if (btn.disabled) return;
    selectedDifficulty = btn.dataset.difficulty;
    renderDifficultySelection();
  }));
  els.betBtns.forEach(btn => btn.addEventListener('click', () => {
    selectedBet = Number(btn.dataset.bet);
    persist();
    renderDifficultySelection();
  }));
  els.startBtn.addEventListener('click', startMatch);
  els.inventoryBtn.addEventListener('click', () => els.accountDialog.showModal());
  els.accountBtn.addEventListener('click', () => els.accountDialog.showModal());
  els.gameAccountBtn.addEventListener('click', () => els.accountDialog.showModal());
  els.shopBtn.addEventListener('click', () => els.shopDialog.showModal());
  els.rulesBtn.addEventListener('click', () => els.rulesDialog.showModal());
  els.historyBtn.addEventListener('click', () => els.historyDialog.showModal());
  els.gameHistoryBtn.addEventListener('click', () => els.historyDialog.showModal());
  els.settingsBtn.addEventListener('click', () => els.settingsDialog.showModal());
  els.resetBtn.addEventListener('click', () => els.resetConfirmDialog.showModal());
  els.resetAgree.addEventListener('change', () => { els.confirmResetBtn.disabled = !els.resetAgree.checked; });
  els.confirmResetBtn.addEventListener('click', () => {
    els.resetConfirmDialog.close();
    resetProgress();
    els.resetAgree.checked = false;
    els.confirmResetBtn.disabled = true;
    showToast('Progresso resetado', 'Seu jogo voltou ao estado inicial.');
  });
  els.clearHistoryBtn.addEventListener('click', () => {
    save.history = [];
    persist();
    renderHistory();
  });
  els.backMenuBtn.addEventListener('click', backToMenu);
  document.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.close).close();
  }));
  els.tutorialOkBtn.addEventListener('click', () => { save.tutorialSeen = true; persist(); els.tutorialDialog.close(); });
  els.restartMatchBtn.addEventListener('click', () => { showToast('Partida reiniciada', 'A tecla R também reinicia a partida atual.'); startMatch(); });
  window.addEventListener('keydown', (event) => { if (event.key.toLowerCase() === 'r' && !els.gameScreen.classList.contains('hidden')) startMatch(); });
  els.playAgainBtn.addEventListener('click', () => {
    els.endDialog.close();
    startMatch();
  });
  els.endMenuBtn.addEventListener('click', () => {
    els.endDialog.close();
    backToMenu();
  });
  els.playerNameInput.addEventListener('input', () => {
    save.settings.playerName = els.playerNameInput.value.trim() || 'Você';
    persist();
    game.players[0].name = save.settings.playerName;
    els.player0Name.textContent = game.players[0].name;
    els.turnLabel.textContent = activePlayer().name;
  });
  els.volumeSlider.addEventListener('input', () => { save.settings.volume = Number(els.volumeSlider.value); persist(); });
  els.aimAssistToggle.addEventListener('change', () => { save.settings.aimAssist = els.aimAssistToggle.checked; persist(); });
  els.fastTableToggle.addEventListener('change', () => { save.settings.fastTable = els.fastTableToggle.checked; persist(); });
  els.aimSensitivitySlider.addEventListener('input', () => { save.settings.aimSensitivity = Number(els.aimSensitivitySlider.value); persist(); updateContextTip(); });
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);


  function showToast(title, message = '') {
    if (!els.toastStack) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
    els.toastStack.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 220);
    }, 3200);
  }

  function showMessage(title, message) {
    els.messageTitle.textContent = title;
    els.messageText.textContent = message;
    els.messageDialog.showModal();
  }

  function startTurnTimer() {
    game.turnStartedAt = Date.now();
    turnDeadline = Date.now() + 30000;
  }

  function updateTurnTimer() {
    if (!els.turnTimer || !game.active) {
      if (els.turnTimer) els.turnTimer.textContent = '30s';
      return;
    }
    const remain = Math.max(0, Math.ceil((turnDeadline - Date.now()) / 1000));
    els.turnTimer.textContent = `${remain}s`;
  }

  function updateContextTip() {
    if (!els.contextTip) return;
    if (!game.active) {
      els.contextTip.textContent = 'Dica: escolha um modo e comece uma partida.';
      return;
    }
    if (game.ballInHand) {
      els.contextTip.textContent = 'Bola na mão: toque em uma área livre para reposicionar a branca.';
    } else if (activePlayer().type === 'bot') {
      els.contextTip.textContent = 'O bot está calculando a tacada.';
    } else if (game.aiming) {
      els.contextTip.textContent = 'Solte para tacar. A linha pontilhada mostra a trajetória prevista.';
    } else {
      els.contextTip.textContent = 'Puxe a partir da bola branca para mirar e controlar a força.';
    }
  }

  function initialRender() {
    game.balls = createBalls();
    setMenuAction('vsBot');
    updateHUD();
    draw();
    persist();
  }

  initialRender();
})();
