/* ==========================================================================
   DATABASE DI PROPOSTA SPETTACOLI (EDITABILE DIRETTAMENTE QUI)
   Basato sui reali format di Lightman Digital Show e calibrato per CUE Porto Cervo
   ========================================================================== */
const EVENT_DATA = {
  eventTitle: "Summer Season Exclusive 2026",
  clientName: "CUE Porto Cervo",
  date: "Estate 2026",
  interventions: [
    {
      id: 1,
      time: "20:30 - 22:30",
      name: "Intervento 1",
      turno: "Turno 1",
      description: "Momento della serata da concordare (ad esempio welcome ospiti)",
      alternatives: {
        A: {
          name: "Farfalle Luminose Elegance",
          description: "Performers su trampoli con spettacolari ali di organza bianca giganti dotate di micro-LED a luce calda/fredda. Coreografia fluttuante adatta all'atmosfera del tramonto sardo. Outfit scenografico ad alta visibilità.",
          mediaUrl: "https://drive.google.com/file/d/1-u-G877_aB_12345/view",
          audioUrl: "https://drive.google.com/file/d/1-a-A888_zY_54321/view"
        },
        B: {
          name: "Mirror Performance Sunset",
          description: "Performer in costumi interamente ricoperti di tessere a specchio geometriche che riflettono i raggi del sole calante e i primi fari dorati del locale, creando riflessi rotanti sulla terrazza del CUE.",
          mediaUrl: "",
          audioUrl: ""
        },
        C: {
          name: "Violino Elettrico LED Live",
          description: "Violinista solista con abito d'alta moda e un violino elettrico trasparente retroilluminato a LED. Esecuzione live di cover deep house e lounge di hit mondiali.",
          mediaUrl: "",
          audioUrl: ""
        }
      }
    },
    {
      id: 2,
      time: "20:30 - 22:30",
      name: "Intervento 2",
      turno: "Turno 1",
      description: "Momento della serata da concordare (ad esempio cena)",
      alternatives: {
        A: {
          name: "Luminous Ballet & Light Stars",
          description: "Ballerine classiche che si esibiscono in coreografie moderne indossando tutù realizzati in fibra ottica ed elementi LED programmabili a tempo di musica, creando geometrie di luce al buio.",
          mediaUrl: "",
          audioUrl: ""
        },
        B: {
          name: "Laser Harp & Live Vocals",
          description: "Un performer suona un'arpa fatta interamente di raggi laser verdi e viola, mentre una cantante solista intona arie d'opera in chiave electro-pop rock. I laser reagiscono fisicamente al tocco delle dita.",
          mediaUrl: "",
          audioUrl: ""
        },
        C: {
          name: "Sand Art Storytelling Live",
          description: "Un'artista della sabbia realizza disegni in tempo reale su un tavolo luminoso. Le immagini, proiettate sugli schermi di CUE Porto Cervo, raccontano una suggestiva storia estiva sarda accompagnata da pianoforte dal vivo.",
          mediaUrl: "",
          audioUrl: ""
        }
      }
    },
    {
      id: 3,
      time: "22:30 - 00:30",
      name: "Intervento 3",
      turno: "Turno 2",
      description: "Momento della serata da concordare (ad esempio gran finale)",
      alternatives: {
        A: {
          name: "Laser Show Immersivo 3D & Mapping",
          description: "Progetto multilaser ad altissima potenza che mappa le linee geometriche dell'architettura di CUE Porto Cervo, proiettando fasci 3D sopra le teste degli ospiti e tracciando il logo dorato del club in grafica laser.",
          mediaUrl: "",
          audioUrl: ""
        },
        B: {
          name: "Fire & Light Fusion Show",
          description: "Choreografia sincronizzata di ballerini di fuoco ed effetti laser cromatici. Il calore ed energia primordiale delle fiamme si fondono con la precisione digitale dei fasci di luce Lightman.",
          mediaUrl: "",
          audioUrl: ""
        },
        C: {
          name: "Acrobati LED Air Dance",
          description: "Acrobati aerei si esibiscono su tessuti o cerchio a mezz'aria, indossando costumi luminescenti che cambiano colore in sincrono con i video-wall e le proiezioni ambientali della sala.",
          mediaUrl: "",
          audioUrl: ""
        }
      }
    },
    {
      id: 4,
      time: "22:30 - 00:30",
      name: "Intervento 4",
      turno: "Turno 2",
      description: "Momento della serata da concordare (ad esempio dj set)",
      alternatives: {
        A: {
          name: "Mirror Dancers & LED Robots",
          description: "Incursione in pista di ballerini in costumi specchiati da robot con teste laser ed effetti speciali criogenici. Interazione diretta con il pubblico per lanciare la festa.",
          mediaUrl: "",
          audioUrl: ""
        },
        B: {
          name: "Laser DJ Battle Live",
          description: "Il DJ set viene potenziato da una regia laser che segue dal vivo i BPM (battiti al minuto) del DJ, avvolgendo la pista in una gabbia di luce futuristica programmata in tempo reale.",
          mediaUrl: "",
          audioUrl: ""
        },
        C: {
          name: "Future Cyber LED Show",
          description: "Performer coperti da armature robotiche LED ad altissima densità (stile Tron) che sparano raggi laser verdi direttamente dalle dita e creano illusioni ottiche di luce tra gli ospiti.",
          mediaUrl: "",
          audioUrl: ""
        }
      }
    }
  ]
};

/* ==========================================================================
   STATO DELL'APPLICAZIONE
   ========================================================================== */
const appState = EVENT_DATA; // Dati statici e definiti via codice
let currentStep = 1; // 1 to 4
let currentAlt = "A"; // 'A', 'B', or 'C'
let isPlayingAtmosphere = false;

// Elementi DOM principali
const elEventTitle = document.getElementById("display-event-title");
const elClientName = document.getElementById("display-client-name");
const elEventDate = document.getElementById("display-event-date");
const elTimelineList = document.getElementById("timeline-list");
const elTurnoIndicator = document.getElementById("current-turno-indicator");
const elStepName = document.getElementById("current-step-name");
const elStepDesc = document.getElementById("current-step-description");
const elTabNameA = document.getElementById("tab-name-A");
const elTabNameB = document.getElementById("tab-name-B");
const elTabNameC = document.getElementById("tab-name-C");
const elAltLetter = document.getElementById("display-alt-letter");
const elAltName = document.getElementById("display-alt-name");
const elAltDesc = document.getElementById("display-alt-description");
const elMediaViewer = document.getElementById("media-viewer-container");
const elMediaTypeBadge = document.getElementById("media-type-badge");
const elNativeAudio = document.getElementById("native-audio");
const elDriveAudioContainer = document.getElementById("drive-audio-frame-container");
const elPlaySyncBtn = document.getElementById("btn-play-sync");

/* ==========================================================================
   PARSER URL GOOGLE DRIVE
   ========================================================================== */
function parseMediaUrl(url) {
  if (!url) return null;
  url = url.trim();

  let driveId = '';

  // RegEx per intercettare gli ID dei file di Google Drive
  const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const idQueryPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
  const ucPattern = /\/uc\?.*id=([a-zA-Z0-9_-]+)/;

  if (filePattern.test(url)) {
    driveId = url.match(filePattern)[1];
  } else if (idQueryPattern.test(url)) {
    driveId = url.match(idQueryPattern)[1];
  } else if (ucPattern.test(url)) {
    driveId = url.match(ucPattern)[1];
  }

  if (driveId) {
    return {
      isDrive: true,
      id: driveId,
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      imageUrl: `https://drive.google.com/uc?export=view&id=${driveId}`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${driveId}`
    };
  }

  return {
    isDrive: false,
    id: null,
    embedUrl: url,
    imageUrl: url,
    downloadUrl: url
  };
}

/* ==========================================================================
   LOGICA DI INIZIALIZZAZIONE & RENDERING
   ========================================================================== */
function initApp() {
  setupEventListeners();
  renderApp();
}

function renderApp() {
  // 1. Aggiorna Titoli Intestazione
  elEventTitle.textContent = appState.eventTitle;
  elClientName.textContent = appState.clientName;
  elEventDate.textContent = appState.date;

  // 2. Render Timeline
  renderTimeline();

  // 3. Carica dati dell'intervento attivo
  const stepData = appState.interventions.find(item => item.id === currentStep);
  if (!stepData) return;

  elTurnoIndicator.textContent = stepData.turno;
  elStepName.textContent = stepData.name;
  elStepDesc.textContent = stepData.description;

  // 4. Aggiorna nomi delle alternative sui pulsanti Tab
  elTabNameA.textContent = stepData.alternatives.A.name || "Alternativa A";
  elTabNameB.textContent = stepData.alternatives.B.name || "Alternativa B";
  elTabNameC.textContent = stepData.alternatives.C.name || "Alternativa C";

  // 5. Carica i dettagli dell'alternativa selezionata
  const altData = stepData.alternatives[currentAlt];
  elAltLetter.textContent = currentAlt;
  elAltName.textContent = altData.name || `Alternativa ${currentAlt}`;
  elAltDesc.textContent = altData.description || "Nessuna descrizione specificata per questa alternativa.";

  // 6. Carica Media (Outfit Video/Foto)
  renderMediaPanel(altData.mediaUrl);

  // 7. Carica Audio (Musica)
  renderAudioPanel(altData.audioUrl);

  // Ripristina stato di playback sincronizzato
  resetSyncPlaybackState();
}

function renderTimeline() {
  const items = elTimelineList.querySelectorAll(".timeline-item");
  items.forEach((item, index) => {
    const stepNum = index + 1;
    const stepData = appState.interventions.find(s => s.id === stepNum);

    // Aggiorna classi attive
    if (stepNum === currentStep) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }

    // Aggiorna testi del pulsante
    if (stepData) {
      item.querySelector(".timeline-time").textContent = stepData.time;
      item.querySelector(".timeline-title").textContent = stepData.name;
    }
  });
}

function renderMediaPanel(url) {
  elMediaViewer.innerHTML = "";

  if (!url) {
    elMediaViewer.innerHTML = `
      <div class="media-placeholder">
        <svg class="placeholder-icon" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
        <p>Nessun video o foto caricato per questo outfit.</p>
      </div>
    `;
    elMediaTypeBadge.textContent = "Vuoto";
    elMediaTypeBadge.style.borderColor = "rgba(255,255,255,0.1)";
    elMediaTypeBadge.style.color = "var(--text-muted)";
    elMediaTypeBadge.style.background = "transparent";
    return;
  }

  const parsed = parseMediaUrl(url);

  if (parsed.isDrive) {
    elMediaTypeBadge.textContent = "Google Drive Embed";
    elMediaTypeBadge.style.borderColor = "var(--cyan-laser)";
    elMediaTypeBadge.style.color = "var(--cyan-laser)";
    elMediaTypeBadge.style.background = "rgba(6, 182, 212, 0.1)";

    const iframe = document.createElement("iframe");
    iframe.src = parsed.embedUrl;
    iframe.className = "media-iframe";
    iframe.allow = "autoplay";
    iframe.title = "Anteprima Outfit Google Drive";
    iframe.width = "800";
    iframe.height = "450";
    iframe.setAttribute("loading", "lazy");
    elMediaViewer.appendChild(iframe);
  } else {
    const cleanUrl = url.toLowerCase().split(/[?#]/)[0];
    const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/.test(cleanUrl);
    const isVideo = /\.(mp4|webm|ogg)$/.test(cleanUrl);

    if (isImage) {
      elMediaTypeBadge.textContent = "Immagine Diretta";
      elMediaTypeBadge.style.borderColor = "var(--gold-cue)";
      elMediaTypeBadge.style.color = "var(--gold-cue)";
      elMediaTypeBadge.style.background = "rgba(212, 175, 55, 0.1)";

      const img = document.createElement("img");
      img.src = url;
      img.className = "media-img";
      img.alt = "Anteprima Outfit";
      img.width = "800";
      img.height = "450";
      img.setAttribute("loading", "lazy");
      elMediaViewer.appendChild(img);
    } else if (isVideo) {
      elMediaTypeBadge.textContent = "Video Diretto";
      elMediaTypeBadge.style.borderColor = "var(--purple-lightman)";
      elMediaTypeBadge.style.color = "var(--purple-lightman)";
      elMediaTypeBadge.style.background = "rgba(124, 58, 237, 0.1)";

      const video = document.createElement("video");
      video.src = url;
      video.className = "media-video";
      video.controls = true;
      video.playsInline = true;
      video.width = "800";
      video.height = "450";
      elMediaViewer.appendChild(video);
    } else {
      elMediaTypeBadge.textContent = "Web Link";
      elMediaTypeBadge.style.borderColor = "var(--text-muted)";
      elMediaTypeBadge.style.color = "var(--text-muted)";
      elMediaTypeBadge.style.background = "rgba(255,255,255,0.05)";

      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.className = "media-iframe";
      iframe.title = "Anteprima Contenuto Esterno";
      iframe.width = "800";
      iframe.height = "450";
      elMediaViewer.appendChild(iframe);
    }
  }
}

function renderAudioPanel(url) {
  elNativeAudio.pause();
  elNativeAudio.src = "";
  elNativeAudio.classList.add("hidden");
  elDriveAudioContainer.innerHTML = "";
  elDriveAudioContainer.style.display = "none";

  if (!url) {
    elNativeAudio.classList.remove("hidden");
    return;
  }

  const parsed = parseMediaUrl(url);

  if (parsed.isDrive) {
    elNativeAudio.src = parsed.downloadUrl;
    elNativeAudio.classList.remove("hidden");

    const iframe = document.createElement("iframe");
    iframe.src = parsed.embedUrl;
    iframe.title = "Anteprima Audio Google Drive";
    elDriveAudioContainer.appendChild(iframe);
  } else {
    elNativeAudio.src = url;
    elNativeAudio.classList.remove("hidden");
  }
}

/* ==========================================================================
   GESTIONE PLAYBACK SINCRONIZZATO
   ========================================================================== */
function resetSyncPlaybackState() {
  isPlayingAtmosphere = false;
  elPlaySyncBtn.classList.remove("btn-primary");
  elPlaySyncBtn.classList.add("btn-primary");
  elPlaySyncBtn.querySelector(".play-icon").classList.remove("hidden");
  elPlaySyncBtn.querySelector(".pause-icon").classList.add("hidden");
  elPlaySyncBtn.querySelector("span").textContent = "Prova l'Atmosfera (Play Audio+Video)";
}

function toggleAtmospherePlayback() {
  const videoElement = elMediaViewer.querySelector("video");
  const iframeElement = elMediaViewer.querySelector("iframe");

  if (!isPlayingAtmosphere) {
    isPlayingAtmosphere = true;
    elPlaySyncBtn.querySelector(".play-icon").classList.add("hidden");
    elPlaySyncBtn.querySelector(".pause-icon").classList.remove("hidden");
    elPlaySyncBtn.querySelector("span").textContent = "Pausa Atmosfera";
    elPlaySyncBtn.style.boxShadow = "0 0 15px var(--purple-glow)";

    if (elNativeAudio.src) {
      elNativeAudio.play().catch(err => {
        console.warn("Impossibile avviare automaticamente l'audio nativo.", err);
      });
    }

    if (videoElement) {
      videoElement.play().catch(err => console.warn("Impossibile avviare il video nativo", err));
    } else if (iframeElement) {
      showNotification("Avviata la musica! Fai clic su 'Play' all'interno del lettore video di Drive per sincronizzare le immagini.");
    }

  } else {
    isPlayingAtmosphere = false;
    elPlaySyncBtn.querySelector(".play-icon").classList.remove("hidden");
    elPlaySyncBtn.querySelector(".pause-icon").classList.add("hidden");
    elPlaySyncBtn.querySelector("span").textContent = "Prova l'Atmosfera (Play Audio+Video)";
    elPlaySyncBtn.style.boxShadow = "";

    elNativeAudio.pause();

    if (videoElement) {
      videoElement.pause();
    }
  }
}

function showNotification(message) {
  const existingToast = document.querySelector(".toast-notification");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%) translateY(100px)",
    background: "rgba(13, 11, 20, 0.95)",
    border: "1px solid var(--gold-cue)",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px var(--gold-glow)",
    zIndex: "9999",
    transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    textAlign: "center",
    maxWidth: "90%",
    pointerEvents: "none"
  });

  document.body.appendChild(toast);
  toast.offsetHeight;
  toast.style.transform = "translateX(-50%) translateY(0)";

  setTimeout(() => {
    toast.style.transform = "translateX(-50%) translateY(100px)";
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

/* ==========================================================================
   SETUP DEGLI EVENT LISTENERS
   ========================================================================== */
function setupEventListeners() {

  // Eventi Timeline
  const timelineItems = elTimelineList.querySelectorAll(".timeline-item");
  timelineItems.forEach(item => {
    item.querySelector("button").addEventListener("click", () => {
      currentStep = parseInt(item.getAttribute("data-step"));
      renderApp();
    });
  });

  // Eventi Tab Alternative (A, B, C)
  const tabContainer = document.querySelector(".tab-container");
  const tabBtns = tabContainer.querySelectorAll(".tab-btn");

  tabBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      currentAlt = btn.getAttribute("data-alt");

      tabContainer.querySelector(".tab-slider").style.setProperty("--active-index", index);
      renderApp();
    });
  });

  // Bottone Play Sincronizzato
  elPlaySyncBtn.addEventListener("click", toggleAtmospherePlayback);

  // Scorciatoie da tastiera (Navigazione veloce per il presentatore)
  document.addEventListener("keydown", (e) => {
    // Tasti 1, 2, 3, 4 per cambiare Intervento
    if (e.key >= "1" && e.key <= "4") {
      currentStep = parseInt(e.key);
      renderApp();
    }

    // Tasti a, b, c per cambiare alternativa
    const key = e.key.toUpperCase();
    if (key === "A" || key === "B" || key === "C") {
      currentAlt = key;
      const btn = document.querySelector(`.tab-btn[data-alt="${key}"]`);
      if (btn) btn.click();
    }

    // Tasto Spazio per avviare/fermare l'atmosfera
    if (e.key === " ") {
      e.preventDefault();
      toggleAtmospherePlayback();
    }
  });
}

/* ==========================================================================
   AVVIO APPLICAZIONE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", initApp);
