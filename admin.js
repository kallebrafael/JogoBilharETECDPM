const STORAGE_CANDIDATES = [
  'rei-da-mesa-save-v5',
  'rei-da-mesa-save-v4',
  'rei-da-mesa-save-v3',
  'bilharPro8.save.v2',
  'bilharPro8.save'
];

const DEFAULT_SAVE = {
  chips: 500,
  avatar: 'avatar-1.png',
  selectedCue: 'basic',
  bet: 25,
  settings: {
    volume: 55,
    aimAssist: true,
    fastTable: false,
    playerName: 'Você',
    aimSensitivity: 100
  },
  history: [],
  botUnlocks: { easy: false, medium: false, hard: false },
  shopOwned: []
};

const SHOP_CUES = ['ruby', 'sapphire', 'emerald', 'obsidian', 'aurora', 'titan', 'royal'];
const BOT_CUES = ['easy', 'medium', 'hard'];
let storageKey = detectStorageKey();
let pendingConfirm = null;

function detectStorageKey() {
  for (const key of STORAGE_CANDIDATES) {
    if (localStorage.getItem(key)) return key;
  }
  return STORAGE_CANDIDATES[0];
}

function cloneDefault() {
  return JSON.parse(JSON.stringify(DEFAULT_SAVE));
}

function normalizeSave(data) {
  return {
    ...cloneDefault(),
    ...data,
    settings: { ...cloneDefault().settings, ...(data?.settings || {}) },
    botUnlocks: { ...cloneDefault().botUnlocks, ...(data?.botUnlocks || data?.unlocked || {}) },
    shopOwned: Array.isArray(data?.shopOwned) ? data.shopOwned : [],
    history: Array.isArray(data?.history) ? data.history : []
  };
}

function loadSave() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? normalizeSave(JSON.parse(raw)) : cloneDefault();
  } catch {
    return cloneDefault();
  }
}

function saveData(data) {
  localStorage.setItem(storageKey, JSON.stringify(normalizeSave(data)));
  render();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

function confirmAction(text, callback) {
  pendingConfirm = callback;
  document.getElementById('confirmText').textContent = text;
  document.getElementById('confirmDialog').showModal();
}

function render() {
  const save = loadSave();
  document.getElementById('summaryName').textContent = save.settings.playerName || 'Você';
  document.getElementById('summaryChips').textContent = save.chips ?? 0;
  document.getElementById('summaryCue').textContent = save.selectedCue || 'basic';
  document.getElementById('summaryHistory').textContent = `${save.history.length} partidas`;
  document.getElementById('playerName').value = save.settings.playerName || 'Você';
  document.getElementById('avatarSelect').value = save.avatar || 'avatar-1.png';
  document.getElementById('chipsValue').textContent = save.chips ?? 0;
  document.getElementById('historyCount').textContent = `${save.history.length} partidas salvas`;
  document.getElementById('selectedCue').value = save.selectedCue || 'basic';
  document.getElementById('volumeInput').value = save.settings.volume ?? 55;
  document.getElementById('aimSensitivityInput').value = save.settings.aimSensitivity ?? 100;
  document.getElementById('aimAssistInput').checked = !!save.settings.aimAssist;
  document.getElementById('fastTableInput').checked = !!save.settings.fastTable;
  document.getElementById('saveOutput').value = JSON.stringify(save, null, 2);
}

function setChips(value) {
  const save = loadSave();
  save.chips = Math.max(0, Math.round(Number(value) || 0));
  saveData(save);
  showToast('Fichas atualizadas.');
}

function unlockBotCues(save) {
  save.botUnlocks = { easy: true, medium: true, hard: true };
}

function unlockShopCues(save) {
  save.shopOwned = [...new Set([...(save.shopOwned || []), ...SHOP_CUES])];
}

// Eventos
render();

document.getElementById('refreshBtn').addEventListener('click', () => {
  storageKey = detectStorageKey();
  render();
  showToast('Dados recarregados.');
});

document.getElementById('savePlayerBtn').addEventListener('click', () => {
  const save = loadSave();
  save.settings.playerName = document.getElementById('playerName').value.trim() || 'Você';
  save.avatar = document.getElementById('avatarSelect').value;
  saveData(save);
  showToast('Jogador salvo.');
});

document.querySelectorAll('[data-add-chips]').forEach(button => {
  button.addEventListener('click', () => {
    const save = loadSave();
    save.chips = Number(save.chips || 0) + Number(button.dataset.addChips);
    saveData(save);
    showToast('Fichas adicionadas.');
  });
});

document.getElementById('setChipsBtn').addEventListener('click', () => {
  const value = Number(document.getElementById('setChipsInput').value);
  if (Number.isNaN(value) || value < 0) return showToast('Digite um valor válido.');
  setChips(value);
});

document.getElementById('saveCueBtn').addEventListener('click', () => {
  const save = loadSave();
  save.selectedCue = document.getElementById('selectedCue').value;
  saveData(save);
  showToast('Taco equipado.');
});

document.getElementById('unlockBotCuesBtn').addEventListener('click', () => {
  const save = loadSave();
  unlockBotCues(save);
  saveData(save);
  showToast('Tacos do bot liberados.');
});

document.getElementById('unlockShopCuesBtn').addEventListener('click', () => {
  const save = loadSave();
  unlockShopCues(save);
  saveData(save);
  showToast('Tacos da loja liberados.');
});

document.getElementById('unlockAllCuesBtn').addEventListener('click', () => {
  const save = loadSave();
  unlockBotCues(save);
  unlockShopCues(save);
  saveData(save);
  showToast('Todos os tacos foram liberados.');
});

document.getElementById('resetCuesBtn').addEventListener('click', () => {
  confirmAction('Resetar todos os tacos e voltar ao Taco Básico?', () => {
    const save = loadSave();
    save.selectedCue = 'basic';
    save.botUnlocks = { easy: false, medium: false, hard: false };
    save.shopOwned = [];
    saveData(save);
    showToast('Tacos resetados.');
  });
});

document.getElementById('saveSettingsBtn').addEventListener('click', () => {
  const save = loadSave();
  save.settings.volume = Number(document.getElementById('volumeInput').value);
  save.settings.aimSensitivity = Number(document.getElementById('aimSensitivityInput').value);
  save.settings.aimAssist = document.getElementById('aimAssistInput').checked;
  save.settings.fastTable = document.getElementById('fastTableInput').checked;
  saveData(save);
  showToast('Configurações salvas.');
});

document.getElementById('clearHistoryBtn').addEventListener('click', () => {
  confirmAction('Limpar todo o histórico de partidas?', () => {
    const save = loadSave();
    save.history = [];
    saveData(save);
    showToast('Histórico limpo.');
  });
});

document.getElementById('addWinHistoryBtn').addEventListener('click', () => {
  const save = loadSave();
  save.history.push({
    title: 'Vitória teste',
    text: 'Registro criado pelo painel admin local.',
    time: new Date().toLocaleString('pt-BR')
  });
  saveData(save);
  showToast('Histórico teste adicionado.');
});

document.getElementById('exportSaveBtn').addEventListener('click', render);

document.getElementById('copySaveBtn').addEventListener('click', async () => {
  const text = document.getElementById('saveOutput').value;
  try {
    await navigator.clipboard.writeText(text);
    showToast('Save copiado.');
  } catch {
    showToast('Não foi possível copiar automaticamente.');
  }
});

document.getElementById('importSaveBtn').addEventListener('click', () => {
  try {
    const imported = JSON.parse(document.getElementById('saveOutput').value);
    saveData(imported);
    showToast('Save importado.');
  } catch {
    showToast('JSON inválido.');
  }
});

document.getElementById('resetAllBtn').addEventListener('click', () => {
  confirmAction('Resetar completamente o progresso local?', () => {
    localStorage.removeItem(storageKey);
    render();
    showToast('Progresso resetado.');
  });
});

document.getElementById('confirmDialog').addEventListener('close', () => {
  if (document.getElementById('confirmDialog').returnValue === 'ok' && typeof pendingConfirm === 'function') {
    pendingConfirm();
  }
  pendingConfirm = null;
});
