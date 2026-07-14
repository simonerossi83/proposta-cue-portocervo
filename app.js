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
      name: "Intervento 1",
      turno: "Turno 1",
      description: "Momento della serata da concordare (dalle 20:30 alle 00:30)",
      alternatives: {
        A: {
          name: "Diamond Ventagli",
          description: "Performance elegante e luminosa con magnifici ventagli giganti, perfetti per creare un'atmosfera magica a inizio serata.",
          mediaUrl: ["Serata A/1/VENTAGLI (4).JPG", "Serata A/1/VENTAGLI (8).JPG"],
          audioUrl: "Serata A/1/01 - DIAMOND VENTAGLI.mp3"
        },
        B: {
          name: "Michael Jackson Dance",
          description: "Un'esibizione energica e iconica dedicata al Re del Pop, con coreografie spettacolari e costumi a tema.",
          mediaUrl: ["Serata B/1/MICHAEL JACKSON  (1).JPG", "Serata B/1/MICHAEL JACKSON  (2).JPG"],
          audioUrl: "Serata B/1/01 - MICHEAL JACKSON.MP3"
        }
      }
    },
    {
      id: 2,
      name: "Intervento 2",
      turno: "Turno 1",
      description: "Momento della serata da concordare (dalle 20:30 alle 00:30)",
      alternatives: {
        A: {
          name: "Sfere Luminose",
          description: "Una performance ipnotica con sfere luminose che disegnano scie di luce nel buio, ideale per accompagnare la cena.",
          mediaUrl: ["Serata A/2/SFERE LUMINOSE .PNG", "Serata A/2/SFERE LUMINOSE .jpg"],
          audioUrl: "Serata A/2/02 - SFERE LUMINOSE.mp3"
        },
        B: {
          name: "Singin' in the Rain",
          description: "Rivisitazione moderna del grande classico, un'esibizione teatrale e coinvolgente con coreografie sotto la 'pioggia'.",
          mediaUrl: ["Serata B/2/SINGING (1).JPG", "Serata B/2/SINGING (3).PNG"],
          audioUrl: "Serata B/2/02 - SINGIN IN THE RAIN.mp3"
        }
      }
    },
    {
      id: 3,
      name: "Intervento 3",
      turno: "Turno 2",
      description: "Momento della serata da concordare (dalle 20:30 alle 00:30)",
      alternatives: {
        A: {
          name: "Burlesque Show",
          description: "Uno spettacolo seducente e di gran classe, in perfetto stile Burlesque, per accendere l'energia della seconda parte della serata.",
          mediaUrl: ["Serata A/3/BURLESQUE (1).JPG"],
          audioUrl: "Serata A/3/03 - BURLESQUE SHOW ME HOW.mp3"
        },
        B: {
          name: "Candyman & Womanizer",
          description: "Performance pop esplosiva sulle note dei più grandi successi anni 2000, con costumi coloratissimi e coreografie dinamiche.",
          mediaUrl: ["Serata B/3/CANDYMAN (3).JPG", "Serata B/3/CANDYMAN (4).JPG"],
          audioUrl: "Serata B/3/03 - CANDYMAN - WOMANIZER.mp3"
        }
      }
    },
    {
      id: 4,
      name: "Intervento 4",
      turno: "Turno 2",
      description: "Momento della serata da concordare (dalle 20:30 alle 00:30)",
      alternatives: {
        A: {
          name: "Gigi D'Alessio - Mon Amour",
          description: "Gran finale travolgente con note pop e animazione carica di energia positiva, perfetto per scatenare il pubblico.",
          mediaUrl: ["Serata A/4/GIGI D_ALESSIO (1).PNG", "Serata A/4/GIGI D_ALESSIO (3).PNG"],
          audioUrl: "Serata A/4/04 - GIGI D_ALESSIO - MON AMOUR.mp3"
        },
        B: {
          name: "Magalehna - Samba Do Brasil",
          description: "Conclusione della serata con ritmi brasiliani incandescenti. Un'esplosione di piume, colori e samba pura per far ballare tutti.",
          mediaUrl: ["Serata B/4/MAGALEHNA (1).JPG", "Serata B/4/MAGALEHNA (2).PNG"],
          audioUrl: "Serata B/4/04 - MAGALEHNA - SAMBA DO BRASIL.MP3"
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

  elStepName.textContent = stepData.name;
  elStepDesc.textContent = stepData.description;

  // 4. Nomi delle Serate statici sui Tab

  // 5. Carica i dettagli dell'alternativa selezionata
  const altData = stepData.alternatives[currentAlt];
  elAltLetter.textContent = currentAlt;
  elAltName.textContent = altData.name || `Alternativa ${currentAlt}`;
  elAltDesc.textContent = altData.description || "Nessuna descrizione specificata per questa alternativa.";

  // 6. Carica Media (Outfit Video/Foto)
  renderMediaPanel(altData.mediaUrl);

  // 7. Carica Audio (Musica)
  renderAudioPanel(altData.audioUrl);
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
      item.querySelector(".timeline-title").textContent = stepData.name;
    }
  });
}

function renderMediaPanel(urlOrUrls) {
  elMediaViewer.innerHTML = "";

  if (!urlOrUrls || (Array.isArray(urlOrUrls) && urlOrUrls.length === 0)) {
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

  const urls = Array.isArray(urlOrUrls) ? urlOrUrls : [urlOrUrls];

  if (urls.length > 1) {
    elMediaTypeBadge.textContent = "Galleria Immagini";
    elMediaTypeBadge.style.borderColor = "var(--gold-cue)";
    elMediaTypeBadge.style.color = "var(--gold-cue)";
    elMediaTypeBadge.style.background = "rgba(212, 175, 55, 0.1)";
  }

  urls.forEach((url, index) => {
    const parsed = parseMediaUrl(url);

    if (parsed.isDrive) {
      if (urls.length === 1) {
        elMediaTypeBadge.textContent = "Google Drive Embed";
        elMediaTypeBadge.style.borderColor = "var(--cyan-laser)";
        elMediaTypeBadge.style.color = "var(--cyan-laser)";
        elMediaTypeBadge.style.background = "rgba(6, 182, 212, 0.1)";
      }

      const iframe = document.createElement("iframe");
      iframe.src = parsed.embedUrl;
      iframe.className = "media-iframe";
      iframe.allow = "autoplay";
      iframe.title = "Anteprima Outfit Google Drive";
      iframe.width = "800";
      iframe.height = "450";
      iframe.setAttribute("loading", "lazy");
      if (urls.length > 1) {
        iframe.style.flex = "1";
        iframe.style.width = "50%";
      }
      elMediaViewer.appendChild(iframe);
    } else {
      const cleanUrl = url.toLowerCase().split(/[?#]/)[0];
      const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/.test(cleanUrl);
      const isVideo = /\.(mp4|webm|ogg)$/.test(cleanUrl);

      if (urls.length === 1) {
        if (isImage) {
          elMediaTypeBadge.textContent = "Immagine Diretta";
          elMediaTypeBadge.style.borderColor = "var(--gold-cue)";
          elMediaTypeBadge.style.color = "var(--gold-cue)";
          elMediaTypeBadge.style.background = "rgba(212, 175, 55, 0.1)";
        } else if (isVideo) {
          elMediaTypeBadge.textContent = "Video Diretto";
          elMediaTypeBadge.style.borderColor = "var(--purple-lightman)";
          elMediaTypeBadge.style.color = "var(--purple-lightman)";
          elMediaTypeBadge.style.background = "rgba(124, 58, 237, 0.1)";
        }
      }

      if (isImage) {
        const img = document.createElement("img");
        img.src = url;
        img.className = "media-img";
        img.alt = "Anteprima Outfit";
        img.width = "800";
        img.height = "450";
        img.setAttribute("loading", "lazy");
        if (urls.length > 1) {
          img.style.flex = "1";
          img.style.width = "50%";
        }
        elMediaViewer.appendChild(img);
      } else if (isVideo) {
        const video = document.createElement("video");
        video.src = url;
        video.className = "media-video";
        video.controls = true;
        video.playsInline = true;
        video.width = "800";
        video.height = "450";
        if (urls.length > 1) {
          video.style.flex = "1";
          video.style.width = "50%";
        }
        elMediaViewer.appendChild(video);
      } else {
        if (urls.length === 1) {
          elMediaTypeBadge.textContent = "Web Link";
          elMediaTypeBadge.style.borderColor = "var(--text-muted)";
          elMediaTypeBadge.style.color = "var(--text-muted)";
          elMediaTypeBadge.style.background = "rgba(255,255,255,0.05)";
        }

        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.className = "media-iframe";
        iframe.title = "Anteprima Contenuto Esterno";
        iframe.width = "800";
        iframe.height = "450";
        if (urls.length > 1) {
          iframe.style.flex = "1";
          iframe.style.width = "50%";
        }
        elMediaViewer.appendChild(iframe);
      }
    }
  });
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
   (Funzioni di Sync rimosse)
   ========================================================================== */

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

  // Scorciatoie da tastiera (Navigazione veloce per il presentatore)
  document.addEventListener("keydown", (e) => {
    // Tasti 1, 2, 3, 4 per cambiare Intervento
    if (e.key >= "1" && e.key <= "4") {
      currentStep = parseInt(e.key);
      renderApp();
    }

    // Tasti a, b per cambiare Serata
    const key = e.key.toUpperCase();
    if (key === "A" || key === "B") {
      currentAlt = key;
      const btn = document.querySelector(`.tab-btn[data-alt="${key}"]`);
      if (btn) btn.click();
    }
  });
}

/* ==========================================================================
   AVVIO APPLICAZIONE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", initApp);
