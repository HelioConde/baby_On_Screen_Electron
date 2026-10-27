"use strict";
(() => {
  const KEY = "baby-on-screen-browser-demo-v1";
  const DEFAULTS = Object.freeze({ saciedade: 75, energia: 80, higiene: 80, carinho: 85 });
  const fields = ["saciedade", "energia", "higiene", "carinho"];
  const clamp = (number) => Math.max(0, Math.min(100, Math.round(number)));
  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY));
      if (!raw || typeof raw !== "object") return { ...DEFAULTS };
      const obj = {};
      for (const field of fields) obj[field] = Number.isFinite(raw[field]) ? clamp(raw[field]) : DEFAULTS[field];
      return obj;
    } catch { return { ...DEFAULTS }; }
  }
  let state = load();
  let soundEnabled = false;
  const sprite = document.getElementById("baby");
  const mood = document.getElementById("mood");
  const badge = document.getElementById("pet-status");
  const note = document.getElementById("save-info");
  const response = {
    alimentar: { text: "Humm! Muito gostoso! 🍼", pose: "alimentar", effects: { saciedade: 28, carinho: 3 }, sound: "som/feliz.mp3" },
    trocar: { text: "Tudo limpinho! ✨", pose: "trocar", effects: { higiene: 30, carinho: 4 }, sound: "som/rindo.mp3" },
    dormir: { text: "Hora de descansar! 💤", pose: "dormir", effects: { energia: 30, saciedade: -4 }, sound: "som/feliz.mp3" },
    brincar: { text: "Que diversão! 🧸", pose: "brincar", effects: { carinho: 30, energia: -5 }, sound: "som/rindo2.mp3" }
  };
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      note.textContent = "Progresso salvo somente neste navegador.";
    } catch {
      note.textContent = "Armazenamento local indisponível: o progresso pode ser perdido ao fechar a página.";
    }
  }
  function render() {
    for (const field of fields) {
      document.getElementById(field).value = state[field];
      document.getElementById(field + "-number").textContent = state[field] + "%";
    }
    const needsCare = fields.some((field) => state[field] < 35);
    badge.textContent = needsCare ? "Precisa de cuidado" : "Feliz";
    badge.classList.toggle("needs-care", needsCare);
  }
  let resetPose;
  function animatePose(pose) {
    sprite.className = "baby-pixel pose-" + pose;
    clearTimeout(resetPose);
    resetPose = setTimeout(() => { sprite.className = "baby-pixel pose-idle"; }, 1400);
  }
  function playSound(path) {
    if (!soundEnabled) return;
    const audio = new Audio("./" + path);
    audio.volume = 0.28;
    audio.play().catch(() => {});
  }
  document.querySelectorAll("button[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = response[button.dataset.action];
      if (!action) return;
      for (const [field, change] of Object.entries(action.effects)) state[field] = clamp(state[field] + change);
      animatePose(action.pose);
      mood.textContent = action.text;
      playSound(action.sound);
      persist();
      render();
    });
  });
  document.getElementById("sound-toggle").addEventListener("change", (event) => {
    soundEnabled = event.target.checked;
    note.textContent = soundEnabled ? "Sons ativados. Os áudios são reproduzidos após suas interações." : "Sons desativados. Seu progresso continua salvo neste navegador.";
  });
  document.getElementById("reset-demo").addEventListener("click", () => {
    if (!window.confirm("Restaurar os indicadores iniciais do Baby?")) return;
    state = { ...DEFAULTS };
    mood.textContent = "Vamos começar de novo! 💜";
    animatePose("idle");
    persist();
    render();
  });
  render();
})();
