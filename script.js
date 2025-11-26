const langSelect = document.getElementById("lang");

const cpu = document.getElementById("cpu");
const gpu = document.getElementById("gpu");
const ram = document.getElementById("ram");
const res = document.getElementById("resolution");
const game = document.getElementById("game");
const profileMode = document.getElementById("profileMode");

const cpuLabel = document.getElementById("cpuLabel");
const gpuLabel = document.getElementById("gpuLabel");
const ramLabel = document.getElementById("ramLabel");
const summarySubtitle = document.getElementById("summarySubtitle");
const outputMain = document.getElementById("outputMain");
const fpsRange = document.getElementById("fpsRange");
const tagRow = document.getElementById("tagRow");
const settingsList = document.getElementById("settingsList");
const tipsBox = document.getElementById("tipsBox");
const upgradeBox = document.getElementById("upgradeBox");
const gameLabelHint = document.getElementById("gameLabelHint");

const badge = document.getElementById("badge");
const subtitle = document.getElementById("subtitle");
const livePillText = document.getElementById("livePillText");
const cardInputTitle = document.getElementById("cardInputTitle");
const cardInputSubtitle = document.getElementById("cardInputSubtitle");
const labelGame = document.getElementById("labelGame");
const labelCpu = document.getElementById("labelCpu");
const labelGpu = document.getElementById("labelGpu");
const labelRam = document.getElementById("labelRam");
const labelProfile = document.getElementById("labelProfile");
const profileHelper = document.getElementById("profileHelper");
const labelRes = document.getElementById("labelRes");
const resHelper = document.getElementById("resHelper");
const cpuLow = document.getElementById("cpuLow");
const cpuHigh = document.getElementById("cpuHigh");
const gpuLow = document.getElementById("gpuLow");
const gpuHigh = document.getElementById("gpuHigh");
const btnText = document.getElementById("btnText");
const cardOutputTitle = document.getElementById("cardOutputTitle");
const fpsLabel = document.getElementById("fpsLabel");
const gfxSetupTitle = document.getElementById("gfxSetupTitle");
const footerLeft = document.getElementById("footerLeft");
const footerRight = document.getElementById("footerRight");

const i18n = {
  de: {
    badge: "Game Settings Optimizer",
    subtitle: "Wähle deine Hardware, dein Spiel und deine Auflösung – GSOpt schlägt dir ein balanciertes Grafik-Setup vor.",
    livePill: "Live-Empfehlung basierend auf deinem Setup",
    cardInputTitle: "Dein Setup",
    cardInputSubtitle: "Grobe Einschätzung – du kannst später feintunen.",
    labelGame: "Spiel",
    labelCpu: "CPU-Leistung",
    labelGpu: "GPU-Leistung",
    labelRam: "RAM",
    labelProfile: "Priorität",
    profileHelper: "Performance vs. Qualität",
    labelRes: "Auflösung",
    resHelper: "Native Monitorauflösung",
    cpuLow: "Büro / sehr alt",
    cpuHigh: "High-End",
    gpuLow: "Einsteiger",
    gpuHigh: "Enthusiast",
    btnText: "Optimale Settings berechnen",
    cardOutputTitle: "Empfohlene Settings",
    summaryIdle: "Wähle dein Setup und klicke auf „Berechnen“.",
    fpsLabel: "Erwartete FPS:",
    gfxSetupTitle: "Grafik-Setup:",
    footerLeft: "Hinweis: GSOpt v0.3 – Schätzungen basieren auf Erfahrungswerten und typischen Setups.",
    footerRight: "Später: exakte GPU-/CPU-Modelle, Benchmarks & Feintuning-Profile.",
    tipLabel: "Tipp:",
    profilePrefix: "Profil",
    powerScore: "Power-Score"
  },
  en: {
    badge: "Game Settings Optimizer",
    subtitle: "Select your hardware, game, and resolution – GSOpt suggests a balanced graphics setup for you.",
    livePill: "Live recommendation based on your setup",
    cardInputTitle: "Your setup",
    cardInputSubtitle: "Rough estimate – you can fine-tune later.",
    labelGame: "Game",
    labelCpu: "CPU performance",
    labelGpu: "GPU performance",
    labelRam: "RAM",
    labelProfile: "Priority",
    profileHelper: "Performance vs. quality",
    labelRes: "Resolution",
    resHelper: "Native monitor resolution",
    cpuLow: "Office / very old",
    cpuHigh: "High-end",
    gpuLow: "Entry level",
    gpuHigh: "Enthusiast",
    btnText: "Calculate optimal settings",
    cardOutputTitle: "Recommended settings",
    summaryIdle: "Select your setup and click “Calculate”.",
    fpsLabel: "Estimated FPS:",
    gfxSetupTitle: "Graphics setup:",
    footerLeft: "Note: GSOpt v0.3 – Estimates are based on typical setups and experience.",
    footerRight: "Coming later: exact GPU/CPU models, benchmarks & fine-tuning profiles.",
    tipLabel: "Tip:",
    profilePrefix: "Profile",
    powerScore: "Power score"
  }
};

function mapCpuLabel(v, lang) {
  const val = Number(v);
  if (lang === "en") {
    if (val <= 1) return "Very weak / old";
    if (val === 2) return "Entry-level gaming (i3/Ryzen 3)";
    if (val === 3) return "Mid-range gaming CPU";
    if (val === 4) return "Strong gaming CPU (i7/Ryzen 7)";
    return "High-end / current flagship";
  } else {
    if (val <= 1) return "Sehr schwach / alt";
    if (val === 2) return "Einsteiger-Gaming (i3/Ryzen 3)";
    if (val === 3) return "Mittlerer Gaming-CPU";
    if (val === 4) return "Starker Gaming-CPU (i7/Ryzen 7)";
    return "High-End / aktuelles Topmodell";
  }
}

function mapGpuLabel(v, lang) {
  const val = Number(v);
  if (lang === "en") {
    if (val <= 1) return "iGPU / very old card";
    if (val === 2) return "Entry GPU (e.g. GTX 1650)";
    if (val === 3) return "Mid-range GPU (e.g. RTX 3060)";
    if (val === 4) return "Upper mid-range (e.g. RTX 4070)";
    return "High-end (RTX 4080/4090, RX 7900)";
  } else {
    if (val <= 1) return "iGPU / sehr alte Karte";
    if (val === 2) return "Einsteiger-GPU (z.B. GTX 1650)";
    if (val === 3) return "Mittelklasse-GPU (z.B. RTX 3060)";
    if (val === 4) return "Oberklasse (z.B. RTX 4070)";
    return "High-End (RTX 4080/4090, RX 7900)";
  }
}

function mapRamLabel(v, lang) {
  if (lang === "en") {
    if (v === "8") return "8 GB (minimum)";
    if (v === "16") return "16 GB";
    return "32+ GB";
  } else {
    if (v === "8") return "8 GB (Minimum)";
    if (v === "16") return "16 GB";
    return "32+ GB";
  }
}

function calcPowerScore() {
  const cpuScore = Number(cpu.value) * 12;
  const gpuScore = Number(gpu.value) * 16;
  const ramVal = Number(ram.value);
  const ramScore = ramVal <= 8 ? 0 : (ramVal === 16 ? 8 : 14);
  const resVal = Number(res.value);
  const resPenalty = resVal === 1080 ? 0 : (resVal === 1440 ? 12 : 24);
  return cpuScore + gpuScore + ramScore - resPenalty;
}

function getUpgradeAdvice(cpuVal, gpuVal, ramVal, resVal, lang) {
  const cpuScore = Number(cpuVal) * 12;
  const gpuScore = Number(gpuVal) * 16;
  const ramNum   = Number(ramVal);

  const tCpu = "CPU";
  const tGpu = "GPU";
  const tRam = "RAM";

  let bottleneck = tGpu;
  let explainKey = "gpu";

  if (cpuScore < gpuScore - 10) {
    bottleneck = tCpu;
    explainKey = "cpu";
  }

  if (ramNum === 8) {
    bottleneck = tRam;
    explainKey = "ram";
  }

  const resLabel = resVal === 1080 ? "1080p" : (resVal === 1440 ? "1440p" : "4K");

  if (lang === "en") {
    if (explainKey === "cpu") {
      return `Bottleneck: ${bottleneck}. For smoother FPS, a stronger 6–8 core CPU (e.g. recent Ryzen 5 / Intel i5) is ideal, especially in CPU-heavy games and at lower resolutions like ${resLabel}.`;
    }
    if (explainKey === "ram") {
      return `Bottleneck: ${bottleneck}. 8 GB is the bare minimum. Upgrading to 16 GB or 32 GB can noticeably reduce stutters and background loading in modern games.`;
    }
    return `Bottleneck: ${bottleneck}. For your settings and ${resLabel}, a current mid-range GPU (e.g. RTX 3060/4060 or RX 6600/7600 class) is a good target if you want clearly higher FPS.`;
  } else {
    if (explainKey === "cpu") {
      return `Limitierend: ${bottleneck}. Für stabilere FPS lohnt sich eine stärkere 6–8-Kern-CPU (z.B. aktuelle Ryzen 5 / Intel i5), vor allem in CPU-lastigen Games und bei niedrigeren Auflösungen wie ${resLabel}.`;
    }
    if (explainKey === "ram") {
      return `Limitierend: ${bottleneck}. 8 GB sind das absolute Minimum. Ein Upgrade auf 16 GB oder 32 GB reduziert Ruckler und Nachlader deutlich in modernen Spielen.`;
    }
    return `Limitierend: ${bottleneck}. Für dein Setup und ${resLabel} ist eine aktuelle Mittelklasse-GPU (z.B. RTX 3060/4060 oder RX 6600/7600) ein guter Zielpunkt, wenn du deutlich mehr FPS möchtest.`;
  }
}

function getGameProfile(gameId, powerScore, resolution, mode, lang) {
  const resLabel = resolution === 1080 ? "1080p" : (resolution === 1440 ? "1440p" : "4K");

  const base = {
    preset: lang === "en" ? "Balanced" : "Ausbalanciert",
    fps: "60–90",
    tags: [],
    settings: [],
    tips: ""
  };

  function clampFps(txtLow, txtMid, txtHigh) {
    if (powerScore < 40) return txtLow;
    if (powerScore < 70) return txtMid;
    return txtHigh;
  }

  switch (gameId) {
    case "valorant":
      base.preset =
        powerScore >= 55
          ? (lang === "en" ? "Competitive Low/Medium" : "Competitive Low/Medium")
          : (lang === "en" ? "Low for maximum FPS" : "Low für maximale FPS");
      base.fps = clampFps("80–140", "140–220", "220–400+");
      base.tags = [
        lang === "en" ? "eSports focus" : "eSports-Fokus",
        resLabel,
        powerScore >= 55
          ? (lang === "en" ? "120+ Hz recommended" : "120+ Hz sinnvoll")
          : (lang === "en" ? "60–75 Hz okay" : "60–75 Hz okay")
      ];
      base.settings = lang === "en" ? [
        "Textures: Medium",
        "Shadows: Off or Low",
        "Anti-Aliasing: MSAA 2x or FXAA",
        "V-Sync: Off (avoid input lag)",
        "FPS limit slightly above monitor refresh rate"
      ] : [
        "Texturen: Mittel",
        "Schatten: Aus oder Niedrig",
        "Anti-Aliasing: MSAA 2x oder FXAA",
        "V-Sync: Aus (Input-Lag vermeiden)",
        "FPS-Limit knapp über Monitor-Refresh"
      ];
      base.tips = lang === "en"
        ? "Valorant is CPU-sensitive. Close background programs, minimize in-game overlays (Discord, GeForce Experience), and set the Windows power plan to “High performance”."
        : "Valorant ist CPU-sensitiv. Hintergrundprogramme schließen, Ingame-Overlay (z.B. Discord, GeForce Experience) minimieren und Windows-Energieplan auf „Höchstleistung“ stellen.";
      break;

    case "fortnite":
      base.preset =
        powerScore < 45
          ? (lang === "en" ? "Performance mode / Low" : "Performance Mode / Low")
          : powerScore < 70
          ? (lang === "en" ? "Medium / Competitive" : "Mittel / Competitive")
          : (lang === "en" ? "High with FSR / TSR" : "Hoch mit FSR / TSR");
      base.fps = clampFps("60–90", "90–140", "140–200+");
      base.tags = [
        "Unreal Engine",
        resLabel,
        powerScore >= 70
          ? (lang === "en" ? "TSR Quality" : "TSR Quality")
          : (lang === "en" ? "Resolution scale 85–90%" : "Resolution Scale 85–90%")
      ];
      base.settings = lang === "en" ? [
        "View Distance: High (important for gameplay)",
        "Shadows: Off or Low",
        "Effects / Post-processing: Low",
        "Anti-Aliasing / TSR: Medium",
        "Enable Nanite / Lumen only with strong GPUs"
      ] : [
        "View Distance: Hoch (Gameplay-Relevanz)",
        "Shadows: Aus oder Niedrig",
        "Effects / Post-Processing: Niedrig",
        "Anti-Aliasing / TSR: Mittel",
        "Nanite / Lumen nur mit starker GPU aktivieren"
      ];
      base.tips = lang === "en"
        ? "Performance Mode can give a massive FPS boost. Only use DirectX 12 if it’s stable. Keep drivers up to date and use Fortnite’s internal FPS limit."
        : "Im Performance Mode gewinnt man viele FPS. Außerdem: DirectX 12 nur nutzen, wenn stabil. Treiber aktuell halten und Fortnite-eigenes FPS-Limit nutzen.";
      break;

    case "warzone":
      base.preset =
        powerScore < 45
          ? (lang === "en" ? "Optimized Low/Medium" : "Optimiert Low/Medium")
          : powerScore < 70
          ? (lang === "en" ? "Balanced" : "Balanced")
          : (lang === "en" ? "High + Upscaling (DLSS/FSR Balanced)" : "High + Upscaling (DLSS/FSR Balanced)");
      base.fps = clampFps("60–80", "80–120", "120–160+");
      base.tags = [
        lang === "en" ? "Warzone 2 / MWII engine" : "Warzone 2 / MWII Engine",
        resLabel,
        lang === "en" ? "Keep an eye on VRAM" : "VRAM im Auge behalten"
      ];
      base.settings = lang === "en" ? [
        "Textures: Medium (depends on VRAM)",
        "Shadows / Spot Cache: Low–Medium",
        "Particle Quality: Low",
        "DLSS/FSR: Performance or Balanced at 1440p/4K",
        "Field of View (FOV): personal preference, 100–110 for competitive play"
      ] : [
        "Texturen: Mittel (VRAM abhängig)",
        "Shadows / Spot Cache: Niedrig–Mittel",
        "Particle Quality: Niedrig",
        "DLSS/FSR: Performance oder Balanced bei 1440p/4K",
        "Field of View (FOV): nach Geschmack, 100–110 für Comp"
      ];
      base.tips = lang === "en"
        ? "Warzone is very VRAM heavy. Watch the VRAM indicator and lower texture quality if needed. Enable shader cache in your GPU driver and turn on Windows Game Mode."
        : "Warzone ist VRAM-hungrig. VRAM-Anzeige im Menü beobachten und Texturen ggf. senken. Disk-Shader-Cache in den Grafiktreibern aktivieren und Windows Game Mode einschalten.";
      break;

    case "minecraft":
      base.preset =
        powerScore < 40
          ? (lang === "en" ? "Vanilla without shaders" : "Vanilla ohne Shader")
          : powerScore < 70
          ? (lang === "en" ? "Vanilla + light shaders" : "Vanilla + leichte Shader")
          : (lang === "en" ? "Shaders + high view distance" : "Shader + hohe Sichtweite");
      base.fps = clampFps("80–160", "160–240", "240–400+");
      base.tags = [
        lang === "en" ? "CPU + RAM heavy" : "CPU + RAM relevant",
        resLabel,
        powerScore >= 70
          ? (lang === "en" ? "Shaders possible" : "Shader möglich")
          : (lang === "en" ? "Use performance modpacks" : "Performance-Modpacks nutzen")
      ];
      base.settings = lang === "en" ? [
        "Render Distance: 8–12 chunks (low/mid), 16+ on strong setups",
        "Simulation Distance: slightly lower than render distance",
        "V-Sync optional, set FPS limit",
        "For mods: use Sodium, Lithium, Starlight etc.",
        "Only enable heavy shaders with a strong GPU"
      ] : [
        "Render Distance: 8–12 Chunks (Low/Mid), 16+ bei starkem Setup",
        "Simulation Distance: etwas niedriger als Render Distance",
        "V-Sync nach Geschmack, FPS-Limit setzen",
        "Bei Mods: Sodium, Lithium, Starlight etc. nutzen",
        "Shader nur mit starker GPU aktivieren"
      ];
      base.tips = lang === "en"
        ? "Minecraft benefits from more RAM allocation (but don’t overdo it). Keep Java and your mod loader up to date. For FPS boosts, use Fabric + performance mods."
        : "Minecraft profitiert stark von mehr RAM-Zuweisung (aber nicht übertreiben). Java-Version und Modloader aktuell halten. Für FPS-Boost: Fabric + Performance-Mods verwenden.";
      break;

    case "arcraiders":
      base.preset =
        powerScore < 45
          ? (lang === "en" ? "Low/Medium, performance focus" : "Low/Medium Fokus Performance")
          : powerScore < 70
          ? (lang === "en" ? "Balanced with upscaling" : "Balanced mit Upscaling")
          : (lang === "en" ? "High at 1080p/1440p, Balanced at 4K" : "High bei 1080p/1440p, Balanced bei 4K");
      base.fps = clampFps("50–70", "70–100", "100–130+");
      base.tags = [
        lang === "en" ? "Cinematic shooter" : "Cinematic Shooter",
        resLabel,
        lang === "en" ? "Upscaling recommended" : "Upscaling empfohlen"
      ];
      base.settings = lang === "en" ? [
        "Textures: High if VRAM ≥ 8 GB",
        "Shadows: Medium",
        "Ambient Occlusion: Medium",
        "Motion Blur: Off (preference)",
        "DLSS/FSR: Balanced at 1440p/4K"
      ] : [
        "Texturen: Hoch, wenn VRAM ≥ 8 GB",
        "Shadows: Mittel",
        "Ambient Occlusion: Mittel",
        "Motion Blur: Aus (Geschmackssache)",
        "DLSS/FSR: Balanced bei 1440p/4K"
      ];
      base.tips = lang === "en"
        ? "For new titles: install day-one patches and the latest GPU drivers. Disable Motion Blur, Film Grain and Chromatic Aberration for clearer visuals and often more performance."
        : "Für neue Titel oft: Day-1-Patch + neueste GPU-Treiber installieren. In den Grafikoptionen Motion Blur, Film Grain und Chromatic Aberration deaktivieren, um Klarheit und Performance zu verbessern.";
      break;

    default:
      base.preset = lang === "en" ? "Balanced" : "Ausbalanciert";
      base.fps = "60–90";
      base.tags = [resLabel, lang === "en" ? "Standard profile" : "Standard-Profil"];
      base.settings = lang === "en" ? [
        "Textures: Medium",
        "Shadows: Low–Medium",
        "Post-processing: Low",
        "Anti-Aliasing: Medium",
        "V-Sync: Off, FPS cap slightly above refresh rate"
      ] : [
        "Texturen: Mittel",
        "Schatten: Niedrig–Mittel",
        "Post-Processing: Niedrig",
        "Anti-Aliasing: Mittel",
        "V-Sync: Aus, FPS-Limit knapp über Hertz-Zahl"
      ];
      base.tips = lang === "en"
        ? "Use this profile as a starting point and fine-tune in-game based on how it feels."
        : "Nutze dieses Profil als Ausgangspunkt und passe es im Spiel nach Gefühl an.";
  }

  if (mode === "performance") {
    base.tags.push(lang === "en" ? "Performance mode" : "Performance-Modus");
    base.settings.unshift(
      lang === "en"
        ? "Lower shadows, post-processing and effects by one step."
        : "Reduziere Schatten-, Post-Processing- und Effekte-Qualität um eine Stufe."
    );
    if (!base.preset.toLowerCase().includes("performance") && !base.preset.toLowerCase().includes("fps")) {
      base.preset += lang === "en" ? " (FPS focused)" : " (FPS-fokussiert)";
    }
  } else if (mode === "quality") {
    base.tags.push(lang === "en" ? "Quality mode" : "Quality-Modus");
    base.settings.unshift(
      lang === "en"
        ? "If FPS are fine: increase texture and effects quality by one step."
        : "Falls FPS ausreichen: erhöhe Textur- und Effektqualität um eine Stufe."
    );
    if (!base.preset.toLowerCase().includes("quality") && !base.preset.toLowerCase().includes("hoch")) {
      base.preset += lang === "en" ? " (quality focus)" : " (Qualitätsfokus)";
    }
  } else {
    base.tags.push(lang === "en" ? "Balanced" : "Balanced");
  }

  return base;
}

function applyLanguage(lang) {
  const t = i18n[lang];
  badge.textContent = t.badge;
  subtitle.textContent = t.subtitle;
  livePillText.textContent = t.livePill;

  cardInputTitle.textContent = t.cardInputTitle;
  cardInputSubtitle.textContent = t.cardInputSubtitle;
  labelGame.textContent = t.labelGame;
  labelCpu.textContent = t.labelCpu;
  labelGpu.textContent = t.labelGpu;
  labelRam.textContent = t.labelRam;
  labelProfile.textContent = t.labelProfile;
  profileHelper.textContent = t.profileHelper;
  labelRes.textContent = t.labelRes;
  resHelper.textContent = t.resHelper;
  cpuLow.textContent = t.cpuLow;
  cpuHigh.textContent = t.cpuHigh;
  gpuLow.textContent = t.gpuLow;
  gpuHigh.textContent = t.gpuHigh;
  btnText.textContent = t.btnText;
  cardOutputTitle.textContent = t.cardOutputTitle;
  fpsLabel.textContent = t.fpsLabel;
  gfxSetupTitle.textContent = t.gfxSetupTitle;
  footerLeft.textContent = t.footerLeft;
  footerRight.textContent = t.footerRight;

  if (lang === "en") {
    profileMode.options[0].textContent = "Balanced";
    profileMode.options[1].textContent = "Maximum FPS";
    profileMode.options[2].textContent = "Maximum quality";
  } else {
    profileMode.options[0].textContent = "Ausbalanciert";
    profileMode.options[1].textContent = "Maximale FPS";
    profileMode.options[2].textContent = "Maximale Grafikqualität";
  }

  const gameMap = {
    "valorant": "Valorant",
    "fortnite": "Fortnite",
    "warzone": "Warzone",
    "minecraft": "Minecraft",
    "arcraiders": "Arc Raiders"
  };
  gameLabelHint.textContent = gameMap[game.value];

  if (outputMain.style.display === "none") {
    summarySubtitle.textContent = t.summaryIdle;
  }

  cpuLabel.textContent = mapCpuLabel(cpu.value, lang);
  gpuLabel.textContent = mapGpuLabel(gpu.value, lang);
  ramLabel.textContent = mapRamLabel(ram.value, lang);

  if (outputMain.style.display !== "none") {
    const power = calcPowerScore();
    const gameId = game.value;
    const resolution = Number(res.value);
    const mode = profileMode.value;
    const profile = getGameProfile(gameId, power, resolution, mode, lang);

    fpsRange.textContent = profile.fps;
    summarySubtitle.textContent = `${t.profilePrefix}: ${profile.preset} · ${t.powerScore}: ${power}`;

    tagRow.innerHTML = "";
    profile.tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      tagRow.appendChild(span);
    });

    settingsList.innerHTML = "";
    profile.settings.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      settingsList.appendChild(li);
    });

    tipsBox.innerHTML = `<strong>${t.tipLabel}</strong> ${profile.tips}`;

    const upgradeText = getUpgradeAdvice(cpu.value, gpu.value, ram.value, resolution, lang);
    upgradeBox.textContent = upgradeText;
  }
}

cpu.addEventListener("input", () => {
  cpuLabel.textContent = mapCpuLabel(cpu.value, langSelect.value);
});

gpu.addEventListener("input", () => {
  gpuLabel.textContent = mapGpuLabel(gpu.value, langSelect.value);
});

ram.addEventListener("change", () => {
  ramLabel.textContent = mapRamLabel(ram.value, langSelect.value);
});

game.addEventListener("change", () => {
  const gameMap = {
    "valorant": "Valorant",
    "fortnite": "Fortnite",
    "warzone": "Warzone",
    "minecraft": "Minecraft",
    "arcraiders": "Arc Raiders"
  };
  gameLabelHint.textContent = gameMap[game.value];
});

langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  document.documentElement.lang = lang === "en" ? "en" : "de";
  applyLanguage(lang);
});

document.getElementById("calcBtn").addEventListener("click", () => {
  const lang = langSelect.value;
  const t = i18n[lang];

  const power = calcPowerScore();
  const gameId = game.value;
  const resolution = Number(res.value);
  const mode = profileMode.value;

  const profile = getGameProfile(gameId, power, resolution, mode, lang);

  fpsRange.textContent = profile.fps;
  summarySubtitle.textContent = `${t.profilePrefix}: ${profile.preset} · ${t.powerScore}: ${power}`;

  tagRow.innerHTML = "";
  profile.tags.forEach(text => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = text;
    tagRow.appendChild(span);
  });

  settingsList.innerHTML = "";
  profile.settings.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    settingsList.appendChild(li);
  });

  tipsBox.innerHTML = `<strong>${t.tipLabel}</strong> ${profile.tips}`;

  const upgradeText = getUpgradeAdvice(cpu.value, gpu.value, ram.value, resolution, lang);
  upgradeBox.textContent = upgradeText;

  outputMain.style.display = "flex";
});

// Init defaults
applyLanguage("de");
