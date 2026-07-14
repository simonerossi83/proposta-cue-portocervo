# Lightman Show Planner & Presenter

Un'applicazione web interattiva e pronta all'uso creata per **Lightman Digital Show** per presentare proposte artistiche esclusive al club **CUE Porto Cervo**.

Questo strumento consente di illustrare ai clienti la scaletta artistica di un evento divisa in **4 interventi principali**, proponendo per ciascuno **3 alternative** di costume/show con relative tracce musicali e video ospitati su Google Drive.

---

## Come Avviare l'Applicazione

L'applicazione è interamente *single-page* e non richiede installazioni, database esterni o server web per funzionare:

1. Apri la cartella `/Users/simonerossi/.gemini/antigravity/scratch/show-planner/`.
2. Fai doppio clic sul file **`index.html`** per aprirlo direttamente in qualsiasi browser (Google Chrome, Safari, Firefox, Edge).
3. (Opzionale) Se desideri ospitarlo online, puoi caricare questi file gratuitamente su piattaforme come **Netlify**, **Vercel** o **GitHub Pages** per inviare il link interattivo direttamente al cliente.

---

## Guida all'Uso di Google Drive per Video e Musica

L'applicazione converte automaticamente i link di condivisione di Google Drive in formati adatti alla riproduzione immediata (embed). Per assicurarti che funzioni correttamente, segui questi passaggi:

### 1. Impostare la Condivisione su Google Drive (FONDAMENTALE)
I file musicali (audio) e i video dei costumi devono essere accessibili pubblicamente affinché il browser possa caricarli:
1. Su Google Drive, fai click destro sul file (video o audio).
2. Seleziona **Condividi** (Share) -> **Condividi**.
3. Sotto la voce *Accesso generale*, cambia da *Limitato* a **Chiunque abbia il link** (Anyone with the link).
4. Imposta il ruolo come **Visualizzatore** (Viewer).
5. Fai clic su **Copia link**.

### 2. Inserire i Link nel Configuratore
1. All'interno dell'applicazione, fai clic in alto su **Configura Proposta**.
2. Espandi l'intervento che desideri modificare.
3. Incolla il link copiato da Drive nei relativi campi:
   - *Link Google Drive Video/Foto* (per l'outfit).
   - *Link Google Drive Musica* (per la traccia audio).
4. Fai clic su **Salva Proposta** in fondo.

*L'applicazione rileverà l'ID del file di Drive ed eseguirà la conversione automatica per l'iframe e per lo streaming nativo in tempo reale.*

---

## Funzionalità Chiave per la Presentazione al Cliente

### 1. Prova l'Atmosfera (Play Audio + Video)
Sotto l'anteprima visiva trovi il pulsante **"Prova l'Atmosfera"**. Cliccandolo, l'app avvierà contemporaneamente la riproduzione della traccia audio e del video.
*Nota di sicurezza dei browser:* A causa delle restrizioni di sicurezza di Google Drive, gli iframe esterni non possono essere avviati direttamente tramite comandi JavaScript. Se usi un video di Drive, la musica partirà automaticamente, e l'app ti suggerirà con un piccolo avviso pop-up di cliccare sul tasto "Play" all'interno del riquadro video di Drive per sincronizzare l'esperienza.

### 2. Scorciatoie da Tastiera per il Presentatore
Mentre presenti lo show su un monitor o proiettore, puoi controllare l'interfaccia con la tastiera per un effetto fluido e professionale senza dover muovere continuamente il mouse:
- **Tasti `1`, `2`, `3`, `4`**: Passa istantaneamente all'intervento corrispondente della serata.
- **Tasti `A`, `B`, `C`** (o `a`, `b`, `c`): Cambia l'alternativa di spettacolo attiva per quell'intervento.
- **Tasto `Barra Spaziatrice`**: Avvia o metti in pausa l'audio e il video in sincrono.

### 3. Esportazione e Importazione JSON (Salva i tuoi Eventi)
- Le modifiche che apporti vengono salvate in automatico nella memoria locale del tuo browser (LocalStorage).
- Cliccando su **Esporta JSON**, puoi scaricare un file con l'intera configurazione creata (es. `PropostaSpettacolo_CUE_Porto_Cervo.json`).
- Cliccando su **Importa JSON**, puoi caricare istantaneamente il file salvato in precedenza. Questo ti consente di preparare proposte diverse per clienti diversi e caricarle in pochi secondi prima dell'incontro.
