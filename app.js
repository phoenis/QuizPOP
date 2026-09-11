import { firebaseConfig } from './firebase-config.js?v=1';

/* ============ Dati del gioco (copia dal design di riferimento) ============ */
// NB: le domande segnalate "Placeholder" vanno riviste con Mara prima del matrimonio.
const QS = [
  {k:'Su Mara', h:'Chi la conosce bene, lo sa.', t:'Qual è la cosa che Mara ama di più di Stefano?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},
  {k:'Su Mara', h:'Una questione di gusto.', t:'Qual è il piatto preferito di Mara?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},
  {k:'Su Mara', h:'Un giorno tutto suo.', t:'Se Mara potesse scegliere una sola cosa da fare per un’intera giornata libera, cosa sceglierebbe?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},
  {k:'Su Mara', h:'Un talento che ammette volentieri.', t:'Qual è la cosa che Mara pensa Stefano faccia meglio di lei?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},
  {k:'Su Mara', h:'Un colore che le somiglia.', t:'Qual è il colore preferito di Mara?', o:['Rosso','Blu','Verde','Giallo'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},
  {k:'Su Stefano', h:'Chi lo conosce bene, lo sa.', t:'Qual è la cosa che Stefano ama di più di Mara?', o:['Quando ride socchiudendo gli occhi e alzando le guanciotte','Quando si emoziona per le piccole cose e diventa incontenibile','Quando si concentra su qualcosa e fa una faccia serissima senza accorgersi','Quando racconta qualcosa che la appassiona e inizia a parlare velocissimo'], c:0, s:'Quando ride socchiudendo gli occhi e alzando le guanciotte: questo conquista Stefano.'},
  {k:'Su Stefano', h:'Una questione di gusto.', t:'Qual è il piatto preferito di Stefano?', o:['Risotto ai funghi','Zucca','Risotto','Formaggio'], c:3, s:'Il formaggio, sempre e comunque.'},
  {k:'Su Stefano', h:'Un giorno tutto suo.', t:'Se Stefano potesse scegliere una sola cosa da fare per un’intera giornata libera, cosa sceglierebbe?', o:['Trekking','Giocare in famiglia','Collezionare bilance rare','Giocare con gli amici'], c:1, s:'Giocare in famiglia: la sua giornata ideale.'},
  {k:'Su Stefano', h:'Un talento che ammette volentieri.', t:'Qual è la cosa che Stefano pensa Mara faccia meglio di lui?', o:['La lavatrice','La lavastoviglie','Organizzare le vacanze','Giocare'], c:2, s:'Organizzare le vacanze: qui Mara vince senza discussione.'},
  {k:'Su Stefano', h:'Una fede sportiva.', t:'Qual è la squadra del cuore di Stefano?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},

  {k:'Come è iniziata', h:'Si parte dall’inizio: quella sera, quegli amici.', t:'Come si sono conosciuti Mara e Stefano?', o:['Su un’app','Tramite amici in comune','Al lavoro','In palestra'], c:1, s:'Amici in comune: la cugina di Mara è amica di un amico di Stefano. Una catena che nessuno ricorda bene.'},
  {k:'Ordina le tappe', h:'Quattro momenti, un ordine giusto.', t:'Metti in ordine i primi quattro mesi.', order:['La cena in cui si conoscono','Il primo messaggio','Il primo appuntamento','Il primo viaggio insieme'], shown:[1,3,0,2], s:'Cena, messaggio (tre settimane dopo), appuntamento, viaggio.'},
  {k:'Indovina la foto', h:'Guarda bene lo sfondo.', t:'Dove è stata scattata la loro prima foto insieme?', o:['A una cena di amici','A Oporto','Alla sagra del pesce','Al mare'], c:0, photo:true, photoSrc:'assets/photos/card-04.jpg', s:'La cena in cui li hanno presentati. Sono ai due estremi del tavolo.'},
  {k:'Sfida a coppie', h:'Facile. Troppo facile?', t:'Come si chiama il gatto che si sono presi insieme?', o:['Pepe','Ravioli','Nuvola','Gino'], c:1, pair:true, s:'Ravioli. Il nome era di Mara, il gatto ha scelto Stefano.'},
  {k:'La loro vita insieme', h:'Un pensiero speciale.', t:'Qual è stato il primo regalo che si sono fatti?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},

  {k:'Ordina le tappe', h:'L’anno del matrimonio, in fila.', t:'Ordina l’anno del matrimonio.', order:['La proposta','La scelta della sala','Le prove dell’abito','Oggi'], shown:[2,0,3,1], s:'Proposta, sala, abito, oggi. In mezzo undici inviti stampati due volte.'},
  {k:'Chi ha detto cosa', h:'Detta da uno dei due. O da tutti e due.', t:'«Il vestito lo scelgo io, tu occupati della musica.»', o:['Mara','Stefano','Entrambi, insieme'], c:2, s:'Detto da entrambi, nello stesso momento, a due persone diverse.'},
  {k:'L’ultima carta', h:'Chiudiamo con i conti.', t:'Quanti anni sono passati da quella cena a oggi?', o:['4','5','7','10'], c:2, s:'Sette anni, due traslochi, un gatto e una cugina che si prende tutto il merito.'},
  {k:'Su Stefano', h:'La mattina dopo.', t:'Secondo Stefano, cosa farà Mara per prima il giorno dopo il matrimonio?', o:['Farà all’ammmore con suo marito','Farà un’abbondante colazione','Dormirà','Si sveglierà presto'], c:2, s:'Dormirà. Il resto può aspettare.'},
  {k:'La giornata di oggi', h:'Il momento più importante.', t:'Che rito è stato celebrato oggi?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera (es. civile o religioso) prima del matrimonio.'},

  // "Andiamo in viaggio": nei libretti-segnaposto ogni tavolo racconta una sua escursione e un
  // aneddoto sul luogo. Queste 5 domande vanno completate con i contenuti veri dei
  // libretti e i nomi/numeri dei tavoli — l'idea è che per rispondere si deve andare
  // a chiedere in giro, cosà gli invitati si mescolano tra tavoli diversi.
  {k:'Andiamo in viaggio', h:'Bisogna proprio chiedere in giro.', t:'A quale tavolo appartiene la prima escursione raccontata nei libretti?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — da completare con i tavoli veri.'},
  {k:'Andiamo in viaggio', h:'Un aneddoto da scoprire.', t:'Quale tavolo ha vissuto questo aneddoto sul luogo della sua escursione?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — da completare con i tavoli veri.'},
  {k:'Andiamo in viaggio', h:'Un indizio dal libretto.', t:'Indovina il tavolo giusto per questo luogo misterioso.', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — da completare con i tavoli veri.'},
  {k:'Andiamo in viaggio', h:'Chi ha fatto questa gita?', t:'Trova il tavolo che ha raccontato questa storia.', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — da completare con i tavoli veri.'},
  {k:'Andiamo in viaggio', h:'Ultimo indizio.', t:'A quale tavolo appartiene quest’ultima storia?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — da completare con i tavoli veri.'},
];
const BASE_PTS = 60, BONUS_PTS = 40, TIMER_S = 20;
// categorie da 5 domande: una medaglia se le indovini tutte, chiusa per sempre se ne sbagli anche una
const CATS = [
  {name:'Mara & Stefano', from:0, to:9, mark:'<img src="assets/mascotte/criceti-mara-ste.png" alt="">', medal:'Gli sposi', note:'Tutte e cinque su di lei'},
  {name:'La loro vita insieme', from:10, to:14, mark:'<img src="assets/mascotte/criceti-love.png" alt="">', medal:'La vita insieme', note:'Tutte e cinque sulla vita insieme'},
  {name:'Il giorno di festa', from:15, to:19, mark:'<img src="assets/mascotte/criceti-festa.png" alt="">', medal:'Il giorno del sì', note:'Tutte e cinque sul matrimonio'},
  {name:'Andiamo in viaggio', from:20, to:24, mark:'<img src="assets/mascotte/criceto-viaggio.png" alt="">', medal:'In viaggio', note:'Tutte e cinque sulle storie dei tavoli'},
];
function catOf(i){ return CATS.findIndex(c => i >= c.from && i <= c.to); }
function catState(res, c){
  let done = 0, right = 0;
  for (let i = c.from; i <= c.to; i++){ if (res[i]){ done++; if (res[i].correct) right++; } }
  const n = c.to - c.from + 1;
  return { done, right, n, earned: right === n, failed: done === n && right < n };
}
const TEAMS = ['Amici di Mara','Famiglia di Mara','Amici di Stefano','Famiglia di Stefano','Colleghi'];
const RIVALS_DEMO = [
  {id:'demo-1', name:'Zia Franca', score:1042, res:demoRes(15,3.1), team:1, avatarEmoji:'🌻'},
  {id:'demo-2', name:'Testimone Andrea', score:918, res:demoRes(14,4.4), team:2, avatarEmoji:'🦄'},
  {id:'demo-3', name:'Chiara & Davide', score:770, res:demoRes(13,6.0), team:0, avatarEmoji:'💖'},
  {id:'demo-4', name:'Nonna Rosa', score:661, res:demoRes(12,9.2), team:3, avatarEmoji:'🐨'},
  {id:'demo-5', name:'Luca T.', score:534, res:demoRes(10,5.7), team:4},
  {id:'demo-6', name:'Cugino Pietro', score:288, res:demoRes(6,0), team:2, avatarEmoji:'🐸'}
];
function demoRes(n, avg){ const r={}; for(let i=0;i<n;i++) r[i]={pts:60,bonus:20,correct:true,used:avg||5}; return r; }

const KIND_LABELS = ['Vero o falso','Chi ha detto cosa','Foto','Ordina','A coppie'];

// Album condiviso WedShoots: pagina ufficiale "download" di wedshoots.com con
// l'ID album già incorporato, pensata apposta per l'invito — dovrebbe aprire
// l'app se già installata, altrimenti mandare allo store giusto da sola.
// + codice album da mostrare/copiare a chi entra dalla versione web, + link
// diretti agli store come riserva se la pagina non reindirizzasse da sola.
const ALBUM_URL = 'https://www.wedshoots.com/it/download?albumId=ITc68bf3c0';
const ALBUM_CODE = 'ITc68bf3c0';
const WEDSHOOTS_ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.matrimonio.launcher&referrer=af_tranid%3DODMwNjM5OTQ2MDgzMDg3OTc3NA%3D%3D%26c%3DWP-IT-LANDINGS%26pid%3DWP-Android-IT';
const WEDSHOOTS_IOS_URL = 'https://apps.apple.com/IT/app/id606939610?mt=8';

// Missione fotografica personale: a ogni invitato ne viene assegnata una a
// caso, evitando (finché ce ne sono di libere) quelle già capitate ad altri.
const MISSIONS = [
  'Fai un brindisi agli sposi',
  'Fai un selfie con la sposa',
  'Fai un selfie con lo sposo',
  'Fai una foto con tutto il tuo tavolo',
  'Fai una foto con qualcuno che hai conosciuto oggi',
  'Vai dagli sposi e fai loro gli auguri',
  'Regala agli sposi un abbraccio',
  'Fai un brindisi con la persona seduta accanto a te',
  'Inizia un coro per gli sposi',
  'Fai partire un applauso per gli sposi',
  'Coinvolgi il tuo tavolo in un brindisi',
  'Convinci almeno tre persone a ballare con te',
  'Quando parte una canzone che conosci, canta a squarciagola!',
  'Organizza una foto di gruppo con almeno 6 persone',
  'Scatta una foto con qualcuno che ha il vestito del tuo stesso colore',
  'Scatta una foto con un genitore degli sposi',
  'Trova un invitato con cui condividi un ricordo e fai una foto con lui',
  'Fai una foto buffa con gli sposi',
  'Fai una foto con Enrico',
  'Fai una foto di gruppo originale',
  'Trova qualcuno che ti racconti un aneddoto sugli sposi',
  'Fai partire un hip hip urrà per gli sposi',
  'Fai ballare gli sposi',
  'Fai una foto con la persona più elegante per te',
  'Fai una dedica agli sposi',
  'Racconta agli sposi un ricordo che hai di loro',
  'Chiedi a qualcuno come ha conosciuto gli sposi',
  'Fai una dedica agli sposi',
  'Dai un bacio alla sposa',
  'Dai un bacio allo sposo',
  'Dedica una canzone agli sposi',
  'Dai un bacio ad Enrico',
  'Proponi un brindisi agli invitati',
  'Improvvisate un ballo sulla prossima canzone',
];

/* ============ Utilità ============ */
const initialsOf = n => (n.split(/[\s&]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('') || 'T').toUpperCase();
// emoji al posto di una foto profilo vera: niente caricamenti, si sceglie da
// una rosa fissa. Chi non ne sceglie una resta con le iniziali, come prima.
const AVATAR_EMOJIS = ['🐹','🐰','🦊','🐻','🐼','🐨','🦁','🐸','🦄','🐝','🦋','🌸','🌻','⭐','💖','😎','🥳','🤩','😇','🍕'];
const avatarGlyph = p => (p && p.avatarEmoji) || initialsOf((p && p.name) || 'Tu');
const numIt = n => (n||0).toFixed(1).replace('.', ',');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'g-' + Math.random().toString(36).slice(2) + Date.now());
// codice breve (niente caratteri ambigui tipo 0/O o 1/I) per ritrovare lo
// stesso profilo su un altro telefono, senza dover digitare l'id lungo.
function genTransferCode(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
// legge un documento missionPhotos gestendo anche quelli salvati prima
// dell'introduzione dei video, quando il campo si chiamava "photo" invece
// di kind/src — senza questo, le foto caricate in quel periodo sparirebbero.
function normalizeMissionMedia(d){
  if (d.kind || d.src) return { kind: d.kind, src: d.src };
  if (d.photo) return { kind: 'photo', src: d.photo };
  return { kind: undefined, src: undefined };
}
// una missione completata puo' essere una foto (dataURL, dentro Firestore) o
// un video (URL di Firebase Storage): stesso markup, tag diverso.
function renderMissionMedia(entry, cls){
  if (!entry || !entry.src) return '';
  if (entry.kind === 'video') return `<video src="${esc(entry.src)}" class="${cls}" muted playsinline controls></video>`;
  return `<img src="${esc(entry.src)}" alt="" class="${cls}">`;
}

/* ============ Stato ============ */
const state = {
  screen: 'boot',
  name: '', team: 1, avatarEmoji: '', avatarPickerOpen: false,
  sel: null,
  qi: 0, startedAt: 0, locked: false, seq: [],
  res: {}, score: 0,
  order: [],
  revealed: false,
  players: [],
  extraCards: [],
  mode: 'local',
  guestId: null,
  newCardType: 0, newCardQ: '', newCardA: '',
  heroPhoto: '',
  missions: [], // [{ index, done }] — una per ogni missione presa (anche più di una)
  missionPhotos: {}, // { [missionIndex]: dataURL } — solo le proprie, per mostrarle
  allMissionPhotos: [], // tutte le missioni di tutti, solo per il pannello sposi
  adminUids: [], // uid di chi, oltre a chi conosce l'indirizzo #sposi, vede anche
                 // un tasto scorciatoia nel proprio profilo per il pannello sposi
  transferCode: '', // codice breve per ritrovare lo stesso profilo su un altro telefono
  recoverOpen: false, recoverCode: '',
  medalCat: null, // indice in CATS della medaglia appena vinta, per renderMedal()
};
let fb = null; // firebase handles when online

function allQuestions(){ return QS.concat(state.extraCards); }
function Q(i){ return allQuestions()[i]; }

function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// l'ordine di visualizzazione delle domande e' casuale ma fisso per invitato:
// le domande gia' assegnate a una posizione non si spostano piu', anche ricaricando;
// le carte extra pubblicate dopo, essendo nuove, vengono solo aggiunte in coda.
// Se una carta extra viene cancellata dal pannello sposi, il suo indice sparisce
// da allQuestions(): lo togliamo anche dall'ordine salvato, altrimenti resterebbe
// una casella "fantasma" nella griglia di chi l'aveva gia' vista.
function ensureOrder(){
  const total = allQuestions().length;
  let changed = false;
  if (state.order.some(i => i >= total)){
    state.order = state.order.filter(i => i < total);
    changed = true;
  }
  const known = new Set(state.order);
  const missing = [];
  for (let i = 0; i < total; i++) if (!known.has(i)) missing.push(i);
  if (missing.length){
    state.order = state.order.concat(shuffle(missing));
    changed = true;
  }
  return changed;
}
function posOf(i){ return state.order.indexOf(i); }

/* ============ Persistenza locale ============ */
function loadLocalProfile(){
  try { return JSON.parse(localStorage.getItem('msquiz_profile') || 'null'); } catch { return null; }
}
function saveLocalProfile(){
  localStorage.setItem('msquiz_profile', JSON.stringify({
    guestId: state.guestId, name: state.name, team: state.team, avatarEmoji: state.avatarEmoji,
    sel: state.sel, res: state.res, score: state.score, order: state.order,
    missions: state.missions,
  }));
  localStorage.setItem('msquiz_mission_photos', JSON.stringify(state.missionPhotos));
}

/* ============ Firebase (opzionale) ============ */
const hasFirebaseConfig = !!(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey.trim());

async function initFirebase(){
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js');
  const firestore = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
  const authMod = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js');
  const storageMod = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js');
  const app = initializeApp(firebaseConfig);
  const db = firestore.getFirestore(app);
  const auth = authMod.getAuth(app);
  const storage = storageMod.getStorage(app);
  return { app, db, auth, storage, ...firestore, ...authMod, ...storageMod };
}

async function persistProgress(){
  if (!state.transferCode) state.transferCode = genTransferCode();
  if (state.mode === 'online' && fb && state.guestId) {
    const ref = fb.doc(fb.db, 'players', state.guestId);
    await fb.setDoc(ref, {
      name: state.name, team: state.team, avatarEmoji: state.avatarEmoji, sel: state.sel,
      res: state.res, score: state.score, order: state.order,
      missions: state.missions, transferCode: state.transferCode, updatedAt: fb.serverTimestamp(),
    }, { merge: true });
  } else {
    saveLocalProfile();
  }
}

// recupera lo stesso profilo su un altro telefono cercandolo per transferCode
// (mostrato nel proprio profilo) e lo clona sul dispositivo corrente: non è
// una sincronizzazione live, ma si può ripetere in qualunque momento per
// riprendere i progressi più recenti.
async function recoverProfile(){
  const code = state.recoverCode.trim().toUpperCase();
  if (!code || state.mode !== 'online' || !fb) return;
  const qs = await fb.getDocs(fb.query(fb.collection(fb.db, 'players'), fb.where('transferCode', '==', code)));
  if (qs.empty){
    alert('Nessun profilo trovato con questo codice.');
    return;
  }
  const oldId = qs.docs[0].id;
  const d = qs.docs[0].data();
  state.name = d.name || ''; state.team = d.team ?? 1; state.avatarEmoji = d.avatarEmoji || '';
  state.sel = d.sel ?? null;
  state.res = d.res || {}; state.score = d.score || 0;
  state.order = d.order || [];
  state.missions = d.missions || [];
  state.recoverOpen = false; state.recoverCode = '';
  ensureOrder();
  await persistProgress();
  // il profilo recuperato vive comunque sotto un id nuovo (l'anonimato non
  // permette di "tornare" a essere lo stesso id di prima): se quello vecchio
  // era admin, la scorciatoia al pannello sposi va riconcessa anche al nuovo.
  if (oldId !== state.guestId && state.adminUids.includes(oldId)) await addAdmin(state.guestId);
  go('hub');
}

// esce dal profilo corrente per iscriverne uno nuovo sullo stesso telefono
// (utile per provare come un altro invitato, o per passare da un account
// all'altro). In locale cancella il profilo salvato sul telefono; online
// chiude la sessione anonima cosi' la prossima e' un profilo nuovo di zecca
// — quello vecchio resta comunque recuperabile con il suo codice.
async function logout(){
  const warn = state.mode === 'online' && state.transferCode
    ? `Uscire da questo profilo? Potrai ritrovarlo in qualunque momento con il codice ${state.transferCode}.`
    : 'Uscire da questo profilo? Su questo telefono si ricomincia da zero.';
  if (!confirm(warn)) return;
  if (state.mode === 'online' && fb){
    await fb.signOut(fb.auth);
  } else {
    localStorage.removeItem('msquiz_profile');
    localStorage.removeItem('msquiz_mission_photos');
  }
  location.reload();
}

// trova la prossima domanda senza risposta seguendo l'ordine casuale dell'invitato,
// ciclicamente, a partire dalla posizione fromPos
function nextOpen(res, fromPos){
  const total = allQuestions().length;
  for (let k = 0; k < total; k++){
    const pos = ((fromPos || 0) + k) % total;
    const qi = state.order[pos];
    if (!res[qi]) return qi;
  }
  return null;
}

/* ============ Logica di gioco ============ */
// nessuna scadenza: si puo' impiegare quanto tempo si vuole. TIMER_S resta
// solo come finestra di riferimento per il bonus di velocita' (rispondere
// entro quei secondi vale di piu', oltre resta comunque il punteggio base).
function dur(){ return TIMER_S; }

function finish(idx){
  const q = Q(state.qi);
  const correct = q.order
    ? (idx === 'order' && state.seq.length === q.order.length && state.seq.every((v, i) => v === i))
    : (idx === q.c);
  const used = Math.max(0.1, (Date.now() - state.startedAt) / 1000);
  const bonus = correct ? Math.round(BONUS_PTS * Math.max(0, 1 - used / dur())) : 0;
  const pts = correct ? BASE_PTS + bonus : 0;
  state.res[state.qi] = { pts, bonus, correct, used };
  state.score += pts;
  state.locked = true;
  state.screen = 'result';
  // sempre in continuazione della sessione di domande aperta con flip(): non
  // apre una nuova voce di history, altrimenti "indietro" potrebbe tornare a
  // rivedere una domanda già risposta (vedi nota su flip()).
  replaceScreen('result');
  persistProgress();
}

function flip(){
  if (state.revealed) return;
  const i = state.sel;
  if (i === undefined || i === null || state.res[i]) return;
  // apre una nuova voce di history solo se si entra "da fuori" (dalla
  // schermata categorie): il resto della sessione (domanda dopo domanda,
  // fino a che la categoria non e' finita) sovrascrive quella stessa voce,
  // cosi' l'indietro esce dall'intera sessione invece di ripercorrere le
  // domande gia' risposte una per una.
  const continuing = state.screen === 'quiz' || state.screen === 'result';
  state.screen = 'quiz'; state.qi = i; state.startedAt = Date.now(); state.locked = false; state.seq = [];
  if (continuing) replaceScreen('quiz'); else pushScreen('quiz');
  render();
}
function pick(idx){
  if (state.locked) return;
  finish(idx);
  render();
}

// ogni cambio di schermata e' una voce nella cronologia del browser, cosi' il
// tasto "indietro" del telefono torna alla schermata precedente invece di
// uscire dall'app (vedi anche il listener 'popstate' e boot()).
function pushScreen(screen){
  try { history.pushState({ screen }, '', '#' + (screen === 'admin' ? 'sposi' : screen)); } catch {}
}
function replaceScreen(screen){
  try { history.replaceState({ screen }, '', '#' + (screen === 'admin' ? 'sposi' : screen)); } catch {}
}
function go(screen){
  state.screen = screen;
  pushScreen(screen);
  render();
}
function afterResult(){
  // resta nella stessa categoria finche' ce n'e' una domanda non ancora
  // fatta: apre subito quella, senza passare dalla schermata categorie.
  const cat = catOf(state.qi);
  const catQs = cat >= 0 ? state.order.filter(qi => catOf(qi) === cat) : [];
  const nextInCat = catQs.find(qi => !state.res[qi]);
  if (nextInCat !== undefined){
    state.sel = nextInCat;
    flip();
    return;
  }
  // categoria finita: se l'ha appena vinta (tutte e cinque giuste), prima
  // una schermata dedicata a festeggiare la medaglia.
  const c = CATS[cat];
  const st = c ? catState(state.res, c) : null;
  if (st && st.earned){
    state.medalCat = cat;
    state.screen = 'medal';
    replaceScreen('medal');
    render();
    return;
  }
  afterMedal();
}

// torna alla schermata categorie (o al finale se non resta nessuna domanda
// da nessuna parte), sovrascrivendo la sessione appena conclusa cosi' non
// resta raggiungibile all'indietro. Richiamata direttamente da afterResult()
// se non c'e' nessuna medaglia da festeggiare, o dal tasto "Continua" della
// schermata medaglia.
function afterMedal(){
  const nx = nextOpen(state.res, posOf(state.qi) + 1);
  state.sel = nx === null ? state.qi : nx;
  state.screen = nx === null ? 'finale' : 'home';
  replaceScreen(state.screen);
  render();
}

function allPlayersWithMe(){
  const board = state.players.length ? state.players.slice() : RIVALS_DEMO.slice();
  const mine = { id: state.guestId, name: state.name || 'Tu', team: state.team, avatarEmoji: state.avatarEmoji, score: state.score, me: true,
    detail: Object.keys(state.res).length + ' carte su ' + allQuestions().length };
  const already = board.some(p => p.id === state.guestId);
  return already
    ? board.map(p => p.id === state.guestId ? { ...p, ...mine } : p)
    : [...board, mine];
}

function ranked(){
  return allPlayersWithMe().sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1, avatar: avatarGlyph(p) }));
}

// squadre: media punti a persona, cosi' una squadra piccola non e' svantaggiata rispetto a una grande
function computeTeams(){
  const all = allPlayersWithMe();
  return TEAMS.map((label, i) => {
    const members = all.filter(p => p.team === i);
    const total = members.reduce((s, p) => s + (p.score || 0), 0);
    return { i, label, count: members.length, avg: members.length ? total / members.length : 0 };
  }).filter(g => g.count > 0);
}

/* ============ Rendering ============ */
const root = document.getElementById('app');

function render(){
  let html = '';
  switch (state.screen){
    case 'boot': html = renderBoot(); break;
    case 'join': html = renderJoin(); break;
    case 'hub': html = renderHub(); break;
    case 'missione': html = renderMissione(); break;
    case 'album': html = renderAlbum(); break;
    case 'home': html = renderHome(); break;
    case 'quiz': html = renderQuiz(); break;
    case 'result': html = renderResult(); break;
    case 'medal': html = renderMedal(); break;
    case 'board': html = renderBoard(); break;
    case 'profile': html = renderProfile(); break;
    case 'finale': html = renderFinale(); break;
    case 'admin': html = renderAdmin(); break;
    default: html = renderHub();
  }
  root.innerHTML = html;
}

function renderBoot(){
  return `<div class="screen" style="align-items:center;justify-content:center;text-align:center;padding:40px;">
    <div class="kicker">Mara & Stefano</div>
    <p style="font-size:14px;color:var(--neutral-700);margin-top:14px;">Un attimo…</p>
  </div>`;
}

function renderJoin(){
  const chips = TEAMS.map((t, i) => `<button class="chip ${state.team===i?'on':''}" data-action="pick-team" data-team="${i}">${esc(t)}</button>`).join('');
  const emojiChips = AVATAR_EMOJIS.map(e => `<button class="chip emoji ${state.avatarEmoji===e?'on':''}" data-action="pick-avatar" data-emoji="${e}">${e}</button>`).join('');
  return `<div class="screen screen-join">
    <div class="kicker">Il gioco</div>
    <h1 class="join-title couple-title">Mara<span class="amp-line amp">&amp;</span>Stefano</h1>
    <div class="kicker neutral join-sub">16 ottobre 2026</div>
    <p class="join-intro pretty">Venticinque carte su di noi. Rispondi quando vuoi, nell’ordine che vuoi — la classifica resta chiusa fino ai discorsi.</p>
    <div class="card join-card">
      <div class="field-block">
        <div class="field-label">Come ti chiamiamo noi</div>
        <input id="name-input" class="name-input" type="text" placeholder="Zia Franca" value="${esc(state.name)}" maxlength="40">
      </div>
      <div class="field-block">
        <div class="field-label">Da che parte stai</div>
        <div class="chips">${chips}</div>
      </div>
      <div class="field-block">
        <div class="field-label">Scegli un avatar (facoltativo)</div>
        <div class="chips">${emojiChips}</div>
      </div>
      <p class="fine-print">Serve solo per le statistiche finali.</p>
    </div>
    <img src="assets/mascotte/criceti-mara-ste.png" alt="" class="join-mascot">
    <div class="join-spacer"></div>
    <button class="btn-outline block" data-action="join">Comincia</button>
    ${state.recoverOpen ? `
      <div class="field-block">
        <div class="field-label">Codice del tuo profilo</div>
        <input id="recover-code" class="name-input" style="font-size:20px;letter-spacing:.1em;text-transform:uppercase;text-align:center;" type="text" placeholder="XXXXXX" maxlength="6" value="${esc(state.recoverCode)}">
        <button class="btn-outline block" style="margin-top:10px;" data-action="recover-profile">Recupera profilo</button>
      </div>`
      : `<button class="btn-text" style="margin-top:12px;" data-action="show-recover">Hai già un profilo? Recuperalo con un codice</button>`}
  </div>`;
}

/* <p class="hub-welcome pretty">Benvenuta, <em>${esc(state.name || 'Zia Franca')}</em>. Tutto quello che serve oggi è qui dentro.</p>
 */

function renderHub(){
  ensureOrder();
  const total = allQuestions().length;
  const done = Object.keys(state.res).length;
  return `<div class="screen screen-hub">
    <div class="hub-hero">
      ${state.heroPhoto ? `<img src="${esc(state.heroPhoto)}" alt="">` : `<img src="assets/photos/hub-hero.jpg" alt="" onerror="this.style.display='none'">`}
      ${avatarButton()}
<div class="hub-fade">
      <h1 class="profile-name">Ciao <span>${state.name}</span>!</h1>
          <span class="">Siamo contenti di averti qui con noi ♥</span>
    </div>  
    </div>
    <div class="hub-cap">
    </div>
    <div class="hub-body">
      <button class="hub-tile is-quiz" data-action="go" data-screen="home">
        <span class="wrap">
          <span class="kicker">Il gioco</span>
          <span class="title serif">Il quiz su di noi</span>
          <span class="foot">Scala la classifica, vinci un premio</span>
        </span>
        <span class="hub-quiz-ring"><span class="num tabular">${done}</span><span class="den">/${total}</span></span>
      </button>
      <div class="hub-tiles">
        <button class="hub-tile" data-action="go" data-screen="missione">
          <span class="kicker">Missione</span>
          <span class="title serif">${(() => {
            const last = state.missions[state.missions.length - 1];
            return !last ? 'Scopri la tua missione' : (last.done ? 'Fatta! Ne vuoi un\'altra?' : 'Ce l\'hai già');
          })()}</span>
          <span class="foot">Porta a termine</span>
        </button>
        <button class="hub-tile" data-action="go" data-screen="album">
          <span class="kicker">Album</span>
          <span class="title serif">Carica le tue foto</span>
          <span class="foot">WedShoots ↗</span>
        </button>
      </div>
    </div>
          <div class="hub-foot">
        <div class="names couple-title"><span>M</span><span class="couple-amp">&amp;</span><span>S</span></div>
        <div class="hero-dida">16 ottobre 2026</div>
      </div>
  </div>`;
}

/* <button class="hub-link-row" data-action="go" data-screen="board">
        <span style="flex:1;min-width:0;">
          <span class="kicker">${state.revealed ? 'Busta aperta' : 'Busta chiusa fino ai discorsi'}</span>
          <span class="title serif" style="font-size:22px;">Classifica</span>
        </span>
        <span class="arrow">→</span>
      </button> */

function renderMissione(){
  const list = state.missions;
  const cur = list[list.length - 1];
  const inProgress = cur && !cur.done;
  const done = list.filter(m => m.done);

  let body;
  if (inProgress){
    body = `<div class="card mission-card assigned">
      <div class="assigned-head">
        <div class="kicker">La tua missione</div>
        <span class="mission-pill">Solo tua</span>
      </div>
      <h1 class="mission-text pretty">${esc(MISSIONS[cur.index])}</h1>
      <p class="fine-print" style="margin-top:10px;">Nessun altro invitato ce l'ha uguale. Va bene anche un video (max 80MB).</p>
      <input id="mission-file-camera" type="file" accept="image/*,video/*" capture="environment" style="display:none;">
      <input id="mission-file-gallery" type="file" accept="image/*,video/*" style="display:none;">
      <div class="mission-photo-actions">
        <button class="btn-fill" data-action="mission-photo-pick" data-target="mission-file-camera">📷 Scatta</button>
        <button class="btn-outline" data-action="mission-photo-pick" data-target="mission-file-gallery">🖼️ Galleria</button>
      </div>
      <p class="fine-print" style="text-align:center;"><button class="btn-text" data-action="skip-mission">Non mi piace, cambiala</button></p>
    </div>
    <img src="assets/mascotte/criceti-festa.png" alt="" class="mission-mascot">`;
  } else if (!list.length){
    body = `<div class="card mission-card">
      <div class="mission-icon-circle">📷</div>
      <div class="kicker" style="margin-top:16px;">Missione speciale</div>
      <h1 style="font-size:26px;margin-top:8px;text-wrap:pretty;">Hai una missione fotografica ad aspettarti</h1>
      <p class="pretty" style="font-size:13.5px;line-height:1.55;color:var(--neutral-700);margin-top:10px;">Ne esce una a sorpresa, diversa da quella di chiunque altro stia giocando.</p>
      <button class="btn-outline block" style="margin-top:22px;" data-action="reveal-mission">Scopri la tua missione</button>
    </div>
    <img src="assets/mascotte/criceto-mara.png" alt="" class="mission-mascot">`;
  } else {
    body = `<div class="card mission-card">
      <div class="mission-icon-circle">🎉</div>
      <div class="kicker" style="margin-top:16px;">Missione speciale</div>
      <h1 style="font-size:24px;margin-top:8px;">Missione completata!</h1>
      <p class="pretty" style="font-size:13.5px;line-height:1.55;color:var(--neutral-700);margin-top:10px;">Se vuoi puoi farne un'altra, oppure fermarti qui.</p>
      <button class="btn-outline block" style="margin-top:20px;" data-action="reveal-mission">Fai un'altra missione</button>
    </div>
    <img src="assets/mascotte/criceti-festa.png" alt="" class="mission-mascot">`;
  }

  const history = done.length ? `
    <div class="section-title" style="text-align:center;">Le tue missioni fatte</div>
    <div class="mission-history">
      ${done.slice().reverse().map(m => `
        <div class="mission-history-row">
          ${renderMissionMedia(state.missionPhotos[m.index], 'mission-history-thumb')}
          <span>${esc(MISSIONS[m.index])}</span>
        </div>`).join('')}
    </div>` : '';

  return `<div class="screen screen-missione">
    <div class="topbar">
      <button class="back-fab" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path></svg></button>
      ${avatarButton()}
    </div>
    <div class="mission-wrap">
      ${body}
    </div>
    ${history}
  </div>`;
}

function renderAlbum(){
  return `<div class="screen screen-missione">
    <div class="topbar">
      <button class="back-fab" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path></svg></button>
      ${avatarButton()}
    </div>
    <div class="mission-wrap">
      <div class="card mission-card">
        <div class="mission-icon-circle"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2M8 14c0 2.76 2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5s-5 2.24-5 5m5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3s-3-1.35-3-3s1.35-3 3-3M5 6h3V4H5V1H3v3H0v2h3v3h2z"></path></svg></div>
        <div class="kicker" style="margin-top:16px;">Album condiviso</div>
        <h1 style="font-size:26px;margin-top:8px;">Le tue foto nel nostro album</h1>
        <p class="pretty" style="font-size:13.5px;line-height:1.55;color:var(--neutral-700);margin-top:10px;">Apri WedShoots e inserisci questo codice per entrare:</p>
        <div class="album-code-box">
          <span class="album-code tabular">${esc(ALBUM_CODE)}</span>
          <button class="btn-fill" style="padding:9px 14px;font-size:12.5px;" data-action="copy-album-code">Copia</button>
        </div>
        <button class="btn-outline block" style="margin-top:16px;" data-action="open-album">Apri WedShoots ↗</button>
        <p class="fine-print" style="text-align:center;">Non hai l'app? <button class="btn-text" data-action="open-album-store">Scaricala</button></p>
      </div>
      <img src="assets/mascotte/cricetino-fiore-solo.png" alt="" class="mission-mascot">
    </div>
  </div>`;
}

function renderHome(){
  if (state.revealed){
    return `<div class="screen screen-home">
      <div class="topbar end">${avatarButton()}</div>
      <div class="empty-deck full">
        <div class="glyph">✦</div>
        <h2 style="font-size:32px;">Il gioco è chiuso</h2>
        <p class="pretty">La classifica è stata svelata ai discorsi. Grazie per aver giocato!</p>
        <button class="btn-outline" data-action="go" data-screen="board">Vedi la classifica</button>
      </div>
    </div>`;
  }
  ensureOrder();
  const all = allQuestions();
  const total = all.length;
  const done = Object.keys(state.res).length;
  const remaining = total - done;
  const sel = (state.sel != null && state.sel < total) ? state.sel : state.order[0];

  // ogni categoria e' una tile colorata cliccabile, con badge di stato
  // (gioca/completato), barra di avanzamento (quante ne hai fatte, non
  // quante giuste: quello resta nelle medaglie) e il criceto della categoria.
  const catRow = (icon, name, catQs, variant) => {
    const doneN = catQs.filter(qi => state.res[qi]).length;
    const pct = catQs.length ? Math.round((doneN / catQs.length) * 100) : 0;
    const target = catQs.find(qi => !state.res[qi]) ?? catQs[0];
    const earned = catQs.length > 0 && doneN === catQs.length;
    return `<button class="cat-tile cat-tile--${variant} ${earned?'earned':''}" data-action="flip-to" data-i="${target}">
      <span class="cat-tile-text">
        <span class="cat-tile-top">
          <span class="cat-tile-badge">${earned ? '✓' : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82"></path></svg>'}</span>
          <span class="cat-tile-level">${earned ? 'Completato' : 'Gioca'}</span>
        </span>
        <span class="cat-tile-name serif">${esc(name)}</span>
        <span class="cat-tile-progress">
          <span class="bar"><span style="width:${pct}%;"></span></span>
          <span class="pct">${pct}%</span>
        </span>
      </span>
      <span class="cat-tile-deco" aria-hidden="true">${icon}</span>
    </button>`;
  };
  const catCards = CATS.map((c, idx) => {
    const catQs = state.order.filter(qi => catOf(qi) === idx);
    return catRow(c.mark, c.name, catQs, idx + 1);
  }).join('');
  const extraQs = state.order.filter(qi => catOf(qi) < 0);
  const extraCard = extraQs.length ? catRow('✦', 'Domande extra', extraQs, 'extra') : '';

  let panel;
  if (remaining === 0){
    panel = `<div class="empty-deck cal-empty">
      <img src="assets/mascotte/cricetini-cuore.png" alt="">
      <h2 style="font-size:28px;">Le hai fatte tutte</h2>
      <p class="pretty">Ora si aspettano i discorsi per sapere com’è andata.</p>
      <button class="btn-outline" data-action="go" data-screen="finale">Vedi il finale</button>
    </div>`;
  } else {
    const card = Q(sel);
    const cat = CATS[catOf(sel)];
    const label = (cat ? cat.name + ' · ' : '') + 'domanda ' + (posOf(sel) + 1);
    const r = state.res[sel];
    panel = `<div class="card-preview">
      <div class="kicker">${esc(label)}</div>
      <div class="type serif">${esc(card.k)}</div>
      <p class="hint pretty">${esc(card.h)}</p>
      ${r
        ? `<p class="done-line">Hai già risposto: ${r.pts ? '+' + r.pts : '0 punti'} · ${numIt(r.used)}s</p>`
        : `<button class="btn-outline block" style="margin-top:14px;" data-action="flip">Apri la domanda</button>`}
    </div>`;
  }

  return `<div class="screen screen-home">
    <div class="topbar">
      <button class="back-fab" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path></svg></button>
      ${avatarButton()}
    </div>
    <div class="home-header">
      <div>
        <div class="kicker">Il quiz</div>
        <h1 style="font-size:27px;">Quanto ne sai sugli sposi?</h1>
      </div>
      <div class="home-score">
        <div class="num serif tabular">${state.score}</div>
        <div class="micro">Punti</div>
      </div>
    </div>
    <div class="cat-cards">${catCards}${extraCard}</div>
    ${panel}
  </div>`;
}

function renderQuizBody(q){
  if (q.photo){
    return `<div class="photo-mat">
      <div class="ph"><img src="${esc(q.photoSrc||'')}" alt="" style="width:100%;height:100%;object-fit:cover;" onerror="this.remove()"></div>
      <div class="caption">Foto degli sposi</div>
    </div>` + renderOptions(q);
  }
  if (q.order){
    const total = q.order.length;
    const doneN = state.seq.length;
    const remaining = total - doneN;
    const helper = doneN === 0 ? 'Tocca dal primo all’ultimo'
      : remaining === 0 ? 'Ordine completo'
      : remaining === 1 ? 'Manca l’ultima'
      : `Mancano ancora ${remaining}`;
    const segs = Array.from({ length: total }, (_, k) => `<span class="order-seg ${k < doneN ? 'on' : ''}"></span>`).join('');
    const rows = q.shown.map(i => {
      const seqPos = state.seq.indexOf(i);
      const picked = seqPos >= 0;
      return `<button class="option-row" data-action="toggle-order" data-i="${i}">
        <span class="pos-badge ${picked?'picked':''} tabular">${picked ? seqPos + 1 : '–'}</span><span class="label">${esc(q.order[i])}</span>
      </button>`;
    }).join('');
    return `<div class="order-progress"><span class="order-segs">${segs}</span><span class="order-helper">${helper}</span></div>
      <div class="option-group">${rows}</div>
      <div style="flex:1;"></div>
      <div class="quiz-cta">
        <button class="btn-outline block" data-action="confirm-order" ${remaining?'disabled':''}>Conferma l’ordine</button>
        <button class="btn-text" style="align-self:center;" data-action="reset-order">Ricomincia da capo</button>
      </div>`;
  }
  let extra = '';
  if (q.pair){
    extra = `<p class="pair-note">Sfida a coppie con <em>Testimone Andrea</em> — punti solo se indovinate entrambi.</p>`;
  }
  return renderOptions(q) + extra;
}

function renderOptions(q){
  const letters = 'ABCD';
  const rows = (q.o || []).map((t, i) => `<button class="option-row" data-action="pick-option" data-idx="${i}">
    <span class="letter">${letters[i]}</span><span class="label">${esc(t)}</span>
  </button>`).join('');
  return `<div class="option-group">${rows}</div>`;
}

/*       <button class="btn-text" data-action="nav-back">Torna alle domande</button>
      <span class="counter">Domanda ${posOf(state.qi) + 1} di ${allQuestions().length}</span>
 */

function renderQuiz(){
  const q = Q(state.qi);
  const catIdx = catOf(state.qi);
  const variant = catIdx >= 0 ? catIdx + 1 : 'extra';
  const cat = CATS[catIdx];
  return `<div class="screen screen-quiz cat-tile--${variant}">
    <div class="topbar">
      <button class="back-fab" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path></svg></button>
      <span class="quiz-counter">Carta ${posOf(state.qi) + 1} / ${allQuestions().length}</span>
    </div>
    <div class="kicker">${esc(q.k)}</div>
    <h2 class="quiz-q pretty">${esc(q.t)}</h2>
    ${renderQuizBody(q)}
    <div class="quiz-footer">${cat ? cat.mark : ''}<span>Conta anche quanto ci metti. Te lo diciamo dopo.</span></div>
  </div>`;
}

function renderResult(){
  const q = Q(state.qi);
  const r = state.res[state.qi] || {};
  const board = ranked();
  const mine = board.find(p => p.me);
  const locked = !state.revealed;
  const kicker = r.correct ? 'Risposta giusta' : 'Risposta sbagliata';
  const title = r.correct ? `Giusta in ${numIt(r.used)}s` : 'Non era questa';
  const rankLine = locked
    ? 'La busta resta chiusa fino ai discorsi: nessuno sa come sta andando, nemmeno tu.'
    : (mine ? `Sei ${mine.rank}º su ${board.length} in questo momento.` : '');
  const cta = nextOpen(state.res, posOf(state.qi) + 1) !== null ? 'Prossima domanda' : 'Vedi il finale';
  const catIdx = catOf(state.qi);
  const variant = catIdx >= 0 ? catIdx + 1 : 'extra';
  return `<div class="screen screen-result cat-tile--${variant}">
    <div class="topbar">
      <button class="back-fab" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path></svg></button>
      <span class="quiz-counter">Carta ${posOf(state.qi) + 1} / ${allQuestions().length}</span>
    </div>
    <div class="result-icon">${r.correct ? '✓' : '✕'}</div>
    <div class="kicker result-kicker">${kicker}</div>
    <h2 class="result-title">${esc(title)}</h2>
    <div class="result-card">
      <p class="result-blurb pretty">${esc(q.s)}</p>
      <div class="breakdown">
        <div class="breakdown-row"><span>${r.correct ? 'Risposta giusta' : 'Risposta'}</span><span class="val tabular">${r.correct ? '+' + BASE_PTS : '0'}</span></div>
        <div class="breakdown-row"><span>Velocità${r.used ? ' · ' + numIt(r.used) + 's' : ''}</span><span class="val tabular">${r.correct ? '+' + r.bonus : '—'}</span></div>
        <div class="breakdown-row total"><span>Totale</span><span class="val tabular">${r.pts || 0}</span></div>
      </div>
    </div>
    <p class="rank-line">${esc(rankLine)}</p>
    <div class="result-cta">
      <button class="btn-outline block" data-action="after-result">${cta}</button>
      <button class="btn-text" data-action="nav-back" style="align-self:center;">Basta per ora, torno dopo</button>
    </div>
  </div>`;
}

// schermata a tutto schermo che festeggia la medaglia appena vinta (tutte e
// cinque le domande della categoria giuste), mostrata subito dopo l'ultimo
// risultato della categoria, prima di tornare alle categorie/al finale.
function renderMedal(){
  const c = CATS[state.medalCat];
  const variant = state.medalCat + 1;
  return `<div class="screen screen-medal cat-tile--${variant}">
    <div class="topbar end">
      <button class="avatar-fab" data-action="after-medal">✕</button>
    </div>
    <div class="medal-celebrate">
      <div class="medal-badge-ring">${c.mark}</div>
      <div class="kicker">Medaglia vinta</div>
      <h1 class="medal-celebrate-title pretty">Congratulazioni, sai tutto su ${esc(c.name)}!</h1>
      <div class="medal-celebrate-name serif">${esc(c.medal)}</div>
      <p class="medal-celebrate-note pretty">${esc(c.note)}</p>
    </div>
    <button class="btn-outline block" data-action="after-medal">Continua</button>
  </div>`;
}

function renderBoard(){
  const board = ranked();
  const mine = board.find(p => p.me);
  const locked = !state.revealed;
  const times = Object.values(state.res).map(x => x.used);
  const avg = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  const done = Object.keys(state.res).length;
  const teams = computeTeams();
  const personaLabel = n => n === 1 ? 'persona' : 'persone';
  if (locked){
    const unsealedOrder = allPlayersWithMe().filter(p => !p.me);
    const rows = unsealedOrder.map(p => `<div class="board-row">
      <div class="avatar">${esc(avatarGlyph(p))}</div>
      <div><div class="board-name">${esc(p.name)}</div><div class="board-detail">${esc((p.detail||'').split('·')[0].trim())}</div></div>
      <div class="board-score hidden">•••</div>
    </div>`).join('');
    const teamRows = teams.map(g => `<div class="board-row ${g.i===state.team?'me':''}">
      <div><div class="board-name">${esc(g.label)}</div><div class="board-detail">${g.count} ${personaLabel(g.count)}</div></div>
      <div class="board-score hidden">•••</div>
    </div>`).join('');
    return `<div class="screen screen-board">
      <div class="topbar end">${avatarButton()}</div>
      <div class="kicker">${board.length} invitati · punti nascosti</div>
      <h1 class="board-title">Classifica</h1>
      <p class="board-explainer pretty" style="margin-top:14px;">Nessuno vede i punti degli altri. La busta si apre quando Mara e Stefano prendono il microfono.</p>
      <div class="board-list">${rows}</div>
      <div class="you-box">
        <div class="micro">Quello che puoi vedere</div>
        <div class="big serif tabular">${state.score} punti tuoi</div>
        <div class="board-detail" style="margin-top:6px;">${done ? 'Media ' + numIt(avg) + 's su ' + done + ' carte' : 'Nessuna carta girata'}</div>
      </div>
      <div class="section-title">Squadre</div>
      <p class="rank-line" style="margin-top:0;">Media punti a persona, nascosta come il resto fino al reveal.</p>
      <div class="board-list">${teamRows}</div>
    </div>`;
  }
  const rows = board.map(p => `<div class="board-row ${p.rank===1?'top':''}">
    <div class="board-rank serif tabular">${p.rank}</div>
    <div class="avatar">${esc(p.avatar)}</div>
    <div><div class="board-name">${esc(p.name)}</div><div class="board-detail">${esc(p.detail||'')}${p.me?' · tu':''}</div></div>
    <div class="board-score serif tabular">${p.score}</div>
  </div>`).join('');
  const teamsRanked = teams.slice().sort((a, b) => b.avg - a.avg).map((g, i) => ({ ...g, rank: i + 1 }));
  const teamRows = teamsRanked.map(g => `<div class="board-row ${g.rank===1?'top':''}">
    <div class="board-rank serif tabular">${g.rank}</div>
    <div><div class="board-name">${esc(g.label)}</div><div class="board-detail">${g.count} ${personaLabel(g.count)}</div></div>
    <div class="board-score serif tabular">${Math.round(g.avg)}</div>
  </div>`).join('');
  return `<div class="screen screen-board">
    <div class="topbar end">${avatarButton()}</div>
    <div class="kicker">${board.length} invitati · busta aperta</div>
    <h1 class="board-title">Classifica</h1>
    <div class="board-list">${rows}</div>
    <div class="board-footer">A parità di punti vince chi ha risposto più in fretta.</div>
    <div class="section-title">Squadre</div>
    <p class="rank-line" style="margin-top:0;">Media punti a persona: ogni squadra pesa allo stesso modo, indipendentemente da quanti sono.</p>
    <div class="board-list">${teamRows}</div>
  </div>`;
}

function renderProfile(){
  const done = Object.keys(state.res).length;
  const total = allQuestions().length;
  const times = Object.values(state.res).map(x => x.used);
  const avg = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  const best = Object.values(state.res).filter(x => x.correct).sort((a, b) => a.used - b.used)[0];
  const name = state.name || 'Zia Franca';
  const earnedCount = CATS.filter(c => catState(state.res, c).earned).length;
  const medalCards = CATS.map((c, idx) => {
    const st = catState(state.res, c);
    const note = st.right + ' su ' + st.n + ' giuste';
    return `<div class="medal-card ${st.earned ? 'earned cat-tile--' + (idx + 1) : 'locked'}">
      ${c.mark}
      <div class="name serif">${esc(c.name)}</div>
      <div class="note">${note}</div>
    </div>`;
  }).join('');
  const extraBadges = [
    { mark: '✦', name: 'Fulmine', note: best ? 'Più veloce: ' + numIt(best.used) + 's' : 'Rispondi sotto i 4 secondi', locked: !best || best.used > 4 },
    { mark: '✷', name: 'Calendario completo', note: 'Tutte le carte del mazzo', locked: done < total },
  ];
  const badgeRows = extraBadges.map(b => `<div class="badge-row ${b.locked?'locked':''}">
    <div class="badge-glyph">${b.mark}</div>
    <div><div class="badge-name">${esc(b.name)}</div><div class="badge-note">${esc(b.note)}</div></div>
  </div>`).join('');
  const answers = allQuestions().map((x, i) => ({ i, x })).filter(o => state.res[o.i])
    .sort((a, b) => posOf(a.i) - posOf(b.i)).map(o => {
    const r = state.res[o.i];
    return `<div class="answer-row">
      <span class="num" style="color:${r.correct?'var(--accent-600)':'var(--neutral-500)'}">${posOf(o.i)+1}</span>
      <span class="title">${esc(o.x.t)}</span>
      <span class="line tabular">${r.pts?'+'+r.pts:'0'} · ${numIt(r.used)}s</span>
    </div>`;
  }).join('');
  const emojiChips = AVATAR_EMOJIS.map(e => `<button class="chip emoji ${state.avatarEmoji===e?'on':''}" data-action="pick-avatar" data-emoji="${e}">${e}</button>`).join('');
  return `<div class="screen screen-profile">
    <div class="topbar end">${avatarButton()}</div>
    <button class="avatar lg" style="margin:0 auto;" data-action="toggle-avatar-picker">${esc(avatarGlyph(state))}<span class="avatar-icon" style="display:block;margin:8px auto 0;" data-action="toggle-avatar-picker">${state.avatarPickerOpen ? '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="m227.31 73.37l-44.68-44.69a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h44.69a15.86 15.86 0 0 0 11.31-4.69L227.31 96a16 16 0 0 0 0-22.63M192 108.68L147.31 64l24-24L216 84.68Z"></path></svg>'}</span></button>
    
    ${state.avatarPickerOpen ? `<div class="chips" style="justify-content:center;margin-top:10px;">${emojiChips}
      ${state.avatarEmoji ? `<button class="chip" data-action="pick-avatar" data-emoji="">Nessuna</button>` : ''}
    </div>` : ''}
    <h1 class="profile-name">${esc(name)}</h1>
    <div class="profile-team">${esc(TEAMS[state.team])}</div>
    <div class="stat-strip">
      <div class="stat-cell"><div class="v serif tabular">${state.score}</div><div class="c">Punti</div></div>
      <div class="stat-cell"><div class="v serif tabular">${done}/${total}</div><div class="c">Carte</div></div>
      <div class="stat-cell"><div class="v serif tabular">${done?numIt(avg)+'s':'—'}</div><div class="c">Media</div></div>
    </div>
    <div class="section-title">Medaglie · ${earnedCount} su ${CATS.length}</div>
    <div class="medal-grid">${medalCards}</div>
    <div class="badge-group" style="margin-top:12px;">
    ${badgeRows}
    </div>
    <div class="section-title">Le tue risposte</div>
    ${answers || `<div class="empty-note">Ancora niente. Gira la prima carta.</div>`}
    ${state.mode === 'online' && state.transferCode ? `
      <div class="section-title">Il tuo profilo su un altro telefono</div>
      <div class="album-code-box">
        <span class="album-code tabular">${esc(state.transferCode)}</span>
        <button class="btn-outline small" data-action="copy-transfer-code">Copia codice</button>
      </div>
      <p class="fine-print">Aprendo il gioco su un altro telefono, tocca "Hai già un profilo?" e inserisci questo codice per ritrovare nome, punti e risposte.</p>` : ''}
    ${state.adminUids.includes(state.guestId) ? `<button class="btn-outline small" style="margin:20px auto 0;" data-action="go" data-screen="admin">Pannello sposi</button>` : ''}
    <button class="btn-text" style="margin:16px auto 0;" data-action="logout">Esci da questo profilo</button>
  </div>`;
}

function renderFinale(){
  const board = ranked();
  const mine = board.find(p => p.me);
  const podium = board.slice(0, 3).map(p => ({
    ...p,
    h: p.rank === 1 ? 140 : p.rank === 2 ? 96 : 76,
  }));
  const order = [1, 0, 2].filter(i => podium[i]);
  const cols = order.map(i => {
    const p = podium[i];
    return `<div class="podium-col">
      <div class="avatar" style="border-color:var(--accent-500);color:var(--accent-700);">${esc(p.avatar)}</div>
      <div class="podium-pname">${esc(p.name)}</div>
      <div class="podium-block serif ${p.rank===1?'top':''}" style="height:${p.h}px;">
        <div class="score tabular">${p.score}</div>
        <div class="rk">${p.rank}º</div>
      </div>
    </div>`;
  }).join('');
  const note = mine && mine.rank <= 3 ? 'Premio in arrivo insieme alla torta.' : 'Il podio era vicino. Colpa del cugino Pietro.';
  return `<div class="screen screen-finale">
    <div class="topbar end">${avatarButton()}</div>
    <div class="kicker finale-kicker">16 ottobre, 23:10 · si apre la busta</div>
    <h1 class="finale-title">Chi conosce<br><span class="couple-title amp">Mara &amp; Stefano</span></h1>
    <div class="podium">${cols}</div>
    <div class="you-line">
      <div class="micro">Tu</div>
      <div class="big serif tabular">${mine ? mine.rank + 'º con ' + mine.score + ' punti' : ''}</div>
      <div class="note">${note}</div>
    </div>
    <button class="btn-outline block" style="margin-top:24px;" data-action="open-board-full">Classifica completa</button>
    <div class="finale-footer">Ci vediamo a ottobre.</div>
  </div>`;
}

function renderAdmin(){
  const totalPlayers = state.players.length;
  const totalCards = allQuestions().length;
  const totalPossible = totalPlayers * totalCards;
  const totalDone = state.players.reduce((sum, p) => sum + Object.keys(p.res || {}).length, 0);
  const pct = totalPossible ? Math.round((totalDone / totalPossible) * 100) : 0;
  const items = allQuestions().map((x, i) => {
    const answers = state.players.filter(p => p.res && p.res[i]).length;
    const isExtra = i >= QS.length;
    return `<div class="admin-card-row">
      <div class="num">${i + 1}</div>
      <div style="flex:1;overflow:hidden;">
        <div class="kk">${esc(x.k)}</div>
        <div class="tt">${esc(x.t)}</div>
      </div>
      <div class="cnt">${answers} risposte</div>
      ${isExtra ? `<button class="del" data-action="delete-extra-card" data-id="${esc(x.id)}">✕</button>` : ''}
    </div>`;
  }).join('');
  const typeChips = KIND_LABELS.map((l, i) => `<button class="type-chip ${state.newCardType===i?'on':''}" data-action="admin-type" data-i="${i}">${esc(l)}</button>`).join('');
  const nameCounts = {};
  state.players.forEach(p => { const n = p.name || 'Senza nome'; nameCounts[n] = (nameCounts[n] || 0) + 1; });
  const playerRows = state.players.map(p => {
    const done = Object.keys(p.res || {}).length;
    const isAdmin = state.adminUids.includes(p.id);
    const name = p.name || 'Senza nome';
    // se ci sono omonimi, aggiunge un tag con le ultime 4 cifre dell'id per
    // distinguerli (l'id e' l'unica cosa davvero univoca: i nomi si scelgono
    // liberamente e possono ripetersi).
    const nameTag = nameCounts[name] > 1 ? ` · #${esc(p.id.slice(-4))}` : '';
    return `<div class="admin-card-row">
      <div class="avatar">${esc(avatarGlyph(p))}</div>
      <div style="flex:1;overflow:hidden;">
        <div class="tt">${esc(name)}${nameTag}</div>
        <div class="kk">${esc(TEAMS[p.team] || '')} · ${done}/${totalCards} carte · ${p.score || 0} punti</div>
      </div>
      <div class="admin-card-row-actions">
        ${isAdmin
          ? `<button class="reset-btn" data-action="remove-admin" data-id="${esc(p.id)}">Admin ✓</button>`
          : `<button class="reset-btn" data-action="add-admin" data-id="${esc(p.id)}">Rendi admin</button>`}
        <button class="reset-btn" data-action="reset-player-answers" data-id="${esc(p.id)}">Azzera</button>
        <button class="reset-btn" data-action="delete-player" data-id="${esc(p.id)}">Elimina</button>
      </div>
    </div>`;
  }).join('');
  const missionRows = state.allMissionPhotos
    .slice()
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .map(m => `<div class="mission-admin-row">
      ${renderMissionMedia({ kind: m.kind, src: m.src }, 'mission-admin-thumb')}
      <div style="flex:1;overflow:hidden;">
        <div class="tt">${esc(m.name || 'Senza nome')}</div>
        <div class="kk">${esc(MISSIONS[m.missionIndex] || '')}</div>
      </div>
    </div>`).join('');
  return `<div class="screen screen-admin">
    <div class="kicker">Solo per gli sposi</div>
    <h2 class="admin-title couple-title" style="text-align:left;">Mara <span class="amp">&amp;</span> Stefano</h2>
    <div class="admin-stats">
      <div class="stat-cell"><div class="v serif tabular">${totalPlayers}</div><div class="c">Giocano</div></div>
      <div class="stat-cell"><div class="v serif tabular">${totalCards}</div><div class="c">Domande</div></div>
      <div class="stat-cell"><div class="v serif tabular">${pct}%</div><div class="c">Completate</div></div>
    </div>
    <div class="envelope-box">
      <div class="row">
        <div><div class="micro">La busta</div><div class="big serif">${state.revealed ? 'Aperta a tutti' : 'Chiusa a tutti'}</div></div>
        <div class="lock">${state.revealed ? '🔓' : '🔒'}</div>
      </div>
      ${state.revealed
        ? `<button class="btn-dark" data-action="close-board">Riapri il gioco</button>`
        : `<button class="btn-dark" data-action="open-board">Apri il reveal adesso</button>`}
    </div>
    <div class="section-title" style="color:rgba(247,236,214,.6);">Foto di copertina</div>
    ${state.heroPhoto ? `<div class="hero-upload-box has-photo">
      <img src="${esc(state.heroPhoto)}" alt="" class="hero-upload-preview">
      <input id="admin-hero-file" type="file" accept="image/*" style="display:none;">
      <div class="hero-upload-actions">
        <button class="reset-btn" data-action="admin-hero-pick">Cambia foto</button>
        <button class="reset-btn" data-action="admin-hero-remove">Rimuovi</button>
      </div>
    </div>` : `<div class="hero-upload-box">
      <div class="hero-upload-empty">vuota</div>
      <div style="flex:1;font-size:12.5px;color:rgba(247,236,214,.7);line-height:1.45;">Nessuna foto caricata. Appare in cima alla home.</div>
      <input id="admin-hero-file" type="file" accept="image/*" style="display:none;">
      <button class="reset-btn" data-action="admin-hero-pick">Carica</button>
    </div>`}
    ${state.mode === 'online' ? `<div class="section-title" style="color:rgba(247,236,214,.6);">Invitati</div>
    <p class="fine-print" style="color:rgba(247,236,214,.6);">"Rendi admin" aggiunge un tasto scorciatoia al pannello sposi nel profilo di quella persona (oltre all'indirizzo #sposi, che resta sempre valido per tutti).</p>
    ${playerRows || `<p class="fine-print" style="color:rgba(247,236,214,.6);">Nessuno ha ancora giocato.</p>`}` : ''}
    ${state.mode === 'online' ? `<div class="section-title" style="color:rgba(247,236,214,.6);">Missioni completate</div>
    <div class="mission-admin-list">
      ${missionRows || `<p class="fine-print" style="color:rgba(247,236,214,.6);">Nessuna missione completata ancora.</p>`}
    </div>` : ''}
    <div class="section-title" style="color:rgba(247,236,214,.6);">Le domande</div>
    ${items}
    <div class="section-title" style="color:rgba(247,236,214,.6);">Nuova domanda</div>
    <div class="type-chips">${typeChips}</div>
    <input id="admin-q" class="admin-input" type="text" placeholder="Scrivi la domanda…" value="${esc(state.newCardQ)}">
    <input id="admin-a" class="admin-input" type="text" placeholder="Risposta giusta" value="${esc(state.newCardA)}">
    <button class="btn-dark" style="margin-top:20px;" data-action="admin-publish">Pubblica agli invitati</button>
  </div>`;
}

// unica scorciatoia globale rimasta dopo aver tolto la tabbar: l'avatar
// (emoji scelta, o le iniziali se non ne ha scelta una) in alto a destra apre
// il profilo; da dentro il profilo lo stesso posto mostra una "×" per tornare
// a dove si era prima.
function avatarButton(){
  if (state.screen === 'profile') return `<button class="avatar-fab" data-action="nav-back">×</button>`;
  return `<button class="avatar-fab" data-action="go" data-screen="profile">${esc(avatarGlyph(state))}</button>`;
}

/* ============ Interazione ============ */
root.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  switch (action){
    case 'pick-team': state.team = +el.dataset.team; render(); break;
    case 'pick-avatar': {
      state.avatarEmoji = el.dataset.emoji || '';
      state.avatarPickerOpen = false;
      if (state.name) persistProgress();
      render();
      break;
    }
    case 'toggle-avatar-picker': state.avatarPickerOpen = !state.avatarPickerOpen; render(); break;
    case 'join': {
      const input = document.getElementById('name-input');
      state.name = (input && input.value.trim()) || 'Zia Franca';
      persistProgress();
      go('hub');
      break;
    }
    case 'flip': flip(); break;
    case 'select-cell': state.sel = +el.dataset.i; render(); break;
    case 'flip-to': state.sel = +el.dataset.i; flip(); break;
    case 'pick-option': pick(+el.dataset.idx); break;
    case 'toggle-order': {
      const i = +el.dataset.i;
      state.seq = state.seq.includes(i) ? state.seq.filter(v => v !== i) : [...state.seq, i];
      render();
      break;
    }
    case 'confirm-order': {
      const q = Q(state.qi);
      if (!state.locked && q.order && state.seq.length === q.order.length) pick('order');
      break;
    }
    case 'reset-order': state.seq = []; render(); break;
    case 'after-result': afterResult(); break;
    case 'after-medal': afterMedal(); break;
    case 'go': go(el.dataset.screen); break;
    case 'nav-back': history.back(); break;
    case 'open-board-full': state.revealed = true; go('board'); break;
    case 'open-board': openReveal(); break;
    case 'close-board': closeReveal(); break;
    case 'admin-type': state.newCardType = +el.dataset.i; render(); break;
    case 'admin-publish': publishCard(); break;
    case 'delete-extra-card': {
      if (confirm('Eliminare questa carta extra? Non si può annullare.')) deleteExtraCard(el.dataset.id);
      break;
    }
    case 'reset-player-answers': {
      if (confirm('Azzerare tutte le risposte e i punti di questo invitato? Non si può annullare.')) resetPlayerAnswers(el.dataset.id);
      break;
    }
    case 'add-admin': addAdmin(el.dataset.id); break;
    case 'remove-admin': removeAdmin(el.dataset.id); break;
    case 'delete-player': {
      if (confirm('Eliminare questo invitato? Sparisce dalla classifica e dal gioco, non si può annullare.')) deletePlayer(el.dataset.id);
      break;
    }
    case 'open-album': window.open(ALBUM_URL, '_blank'); break;
    case 'open-album-store': {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      window.open(isIOS ? WEDSHOOTS_IOS_URL : WEDSHOOTS_ANDROID_URL, '_blank');
      break;
    }
    case 'copy-album-code': {
      if (navigator.clipboard) navigator.clipboard.writeText(ALBUM_CODE).then(() => alert('Codice copiato!')).catch(() => alert('Codice album: ' + ALBUM_CODE));
      else alert('Codice album: ' + ALBUM_CODE);
      break;
    }
    case 'copy-transfer-code': {
      if (navigator.clipboard) navigator.clipboard.writeText(state.transferCode).then(() => alert('Codice copiato!')).catch(() => alert('Codice profilo: ' + state.transferCode));
      else alert('Codice profilo: ' + state.transferCode);
      break;
    }
    case 'show-recover': state.recoverOpen = true; render(); break;
    case 'recover-profile': recoverProfile(); break;
    case 'logout': logout(); break;
    case 'reveal-mission': assignMission(); break;
    case 'mission-photo-pick': document.getElementById(el.dataset.target).click(); break;
    case 'skip-mission': {
      if (confirm('Cambiare missione? Non potrai più tornare a questa.')) skipMission();
      break;
    }
    case 'admin-hero-pick': document.getElementById('admin-hero-file').click(); break;
    case 'admin-hero-remove': {
      if (confirm('Togliere la foto di copertina? Torna il placeholder.')) removeHeroPhoto();
      break;
    }
  }
});
root.addEventListener('change', e => {
  if (e.target.id === 'admin-hero-file' && e.target.files[0]) uploadHeroPhoto(e.target.files[0]);
  if ((e.target.id === 'mission-file-camera' || e.target.id === 'mission-file-gallery') && e.target.files[0]) completeMission(e.target.files[0]);
});
root.addEventListener('input', e => {
  if (e.target.id === 'name-input') state.name = e.target.value;
  if (e.target.id === 'admin-q') state.newCardQ = e.target.value;
  if (e.target.id === 'admin-a') state.newCardA = e.target.value;
  if (e.target.id === 'recover-code') state.recoverCode = e.target.value;
});

function openReveal(){
  state.revealed = true;
  if (state.mode === 'online' && fb){
    fb.setDoc(fb.doc(fb.db, 'meta', 'state'), { revealed: true }, { merge: true });
  }
  render();
}

function closeReveal(){
  state.revealed = false;
  if (state.mode === 'online' && fb){
    fb.setDoc(fb.doc(fb.db, 'meta', 'state'), { revealed: false }, { merge: true });
  }
  render();
}

// ridimensiona e comprime l'immagine nel browser prima di salvarla: senza
// questo passaggio una foto di uno smartphone (spesso 3-5 MB) supererebbe
// il limite di 1 MB per documento di Firestore.
function fileToCompressedDataUrl(file, maxDim, quality){
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(img.src);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

async function uploadHeroPhoto(file){
  if (!file) return;
  const steps = [[1200, 0.75], [1000, 0.6], [800, 0.5], [600, 0.4]];
  let dataUrl = '';
  for (const [maxDim, quality] of steps){
    dataUrl = await fileToCompressedDataUrl(file, maxDim, quality);
    if (dataUrl.length < 700000) break;
  }
  if (dataUrl.length >= 700000){
    alert('La foto è troppo pesante anche dopo la compressione: provane una più semplice o meno ad alta risoluzione.');
    return;
  }
  state.heroPhoto = dataUrl;
  if (state.mode === 'online' && fb){
    await fb.setDoc(fb.doc(fb.db, 'meta', 'state'), { heroPhoto: dataUrl }, { merge: true });
  } else {
    localStorage.setItem('msquiz_hero_photo', dataUrl);
  }
  render();
}

async function removeHeroPhoto(){
  state.heroPhoto = '';
  if (state.mode === 'online' && fb){
    await fb.setDoc(fb.doc(fb.db, 'meta', 'state'), { heroPhoto: '' }, { merge: true });
  } else {
    localStorage.removeItem('msquiz_hero_photo');
  }
  render();
}

// evita (finche' ce ne sono di libere) le missioni gia' in mano a qualcun
// altro (via state.players, in tempo reale) o già fatte/in corso per se
// stessi. In locale (senza Firebase) non c'e' nessun altro con cui
// confrontarsi, quindi conta solo la propria lista.
function takenMissionIndexes(){
  const taken = new Set();
  for (const p of state.players){
    if (p.id === state.guestId) continue;
    (p.missions || []).forEach(m => taken.add(m.index));
  }
  state.missions.forEach(m => taken.add(m.index));
  return taken;
}

// prende una nuova missione (la prima, o un'altra dopo aver completato/
// saltato quella precedente). excludeIndex serve solo per lo "skip": evita
// di riproporre subito la stessa appena rifiutata.
async function assignMission(excludeIndex){
  const cur = state.missions[state.missions.length - 1];
  if (cur && !cur.done) return; // ce n'e' gia' una in corso
  const taken = takenMissionIndexes();
  if (excludeIndex != null) taken.add(excludeIndex);
  const free = MISSIONS.map((_, i) => i).filter(i => !taken.has(i));
  // se sono finite quelle libere (piu' invitati/missioni fatte che voci in
  // lista), si riparte da qualunque missione: da qui in poi qualche
  // doppione e' inevitabile.
  const pool = free.length ? free : MISSIONS.map((_, i) => i);
  const index = pool[Math.floor(Math.random() * pool.length)];
  state.missions = [...state.missions, { index, done: false }];
  await persistProgress();
  render();
}

async function skipMission(){
  const cur = state.missions[state.missions.length - 1];
  if (!cur || cur.done) return;
  state.missions = state.missions.slice(0, -1);
  await assignMission(cur.index);
}

const MISSION_VIDEO_MAX_BYTES = 80 * 1024 * 1024;

async function completeMission(file){
  const cur = state.missions[state.missions.length - 1];
  if (!cur || cur.done || !file) return;
  const isVideo = file.type.startsWith('video/');
  let kind, src;
  if (isVideo){
    if (file.size > MISSION_VIDEO_MAX_BYTES){
      alert('Il video è troppo pesante (max 80MB): provane uno più corto.');
      return;
    }
    if (!(state.mode === 'online' && fb)){
      alert('I video richiedono la modalità online (Firebase): in locale puoi caricare solo foto.');
      return;
    }
    const ext = (file.name.split('.').pop() || 'mp4').toLowerCase().replace(/[^a-z0-9]/g, '') || 'mp4';
    const path = `missionVideos/${state.guestId}/${cur.index}_${Date.now()}.${ext}`;
    const storageRef = fb.ref(fb.storage, path);
    await fb.uploadBytes(storageRef, file, { contentType: file.type });
    src = await fb.getDownloadURL(storageRef);
    kind = 'video';
  } else {
    const steps = [[1000, 0.7], [800, 0.55], [600, 0.4]];
    let dataUrl = '';
    for (const [maxDim, quality] of steps){
      dataUrl = await fileToCompressedDataUrl(file, maxDim, quality);
      if (dataUrl.length < 500000) break;
    }
    if (dataUrl.length >= 500000){
      alert('La foto è troppo pesante anche dopo la compressione: provane una più semplice.');
      return;
    }
    src = dataUrl;
    kind = 'photo';
  }
  cur.done = true;
  state.missionPhotos = { ...state.missionPhotos, [cur.index]: { kind, src } };
  render();
  if (state.mode === 'online' && fb){
    await fb.setDoc(fb.doc(fb.db, 'players', state.guestId), { missions: state.missions }, { merge: true });
    // foto/video in una collezione separata (non nel documento players): con più
    // missioni completate si supererebbe presto il limite di 1MB per
    // documento di Firestore se stessero tutte insieme a punteggio/risposte.
    await fb.setDoc(fb.doc(fb.db, 'missionPhotos', state.guestId + '_' + cur.index), {
      guestId: state.guestId, name: state.name, missionIndex: cur.index,
      kind, src, createdAt: fb.serverTimestamp(),
    });
  } else {
    saveLocalProfile();
  }
}

async function publishCard(){
  const t = state.newCardQ.trim(), a = state.newCardA.trim();
  if (!t || !a) return;
  const card = { k: KIND_LABELS[state.newCardType], h: 'Carta pubblicata dagli sposi.', t, o: [a, 'Nessuna delle precedenti'], c: 0, s: 'Risposta aggiunta dagli sposi durante il matrimonio.' };
  if (state.mode === 'online' && fb){
    await fb.addDoc(fb.collection(fb.db, 'extraCards'), { ...card, createdAt: fb.serverTimestamp() });
  } else {
    state.extraCards.push({ ...card, id: uuid() });
  }
  state.newCardQ = ''; state.newCardA = '';
  render();
}

async function deleteExtraCard(id){
  if (state.mode === 'online' && fb){
    await fb.deleteDoc(fb.doc(fb.db, 'extraCards', id));
  } else {
    state.extraCards = state.extraCards.filter(c => c.id !== id);
    render();
  }
}

// azzera le risposte di un invitato (utile in fase di test, per rigiocare senza
// doversi iscrivere con un nome nuovo). L'ordine delle carte resta lo stesso.
async function resetPlayerAnswers(playerId){
  if (state.mode !== 'online' || !fb) return;
  await fb.setDoc(fb.doc(fb.db, 'players', playerId), { res: {}, score: 0 }, { merge: true });
}

// toglie un invitato dalla classifica/dal gioco (utenze di prova, doppioni
// da un altro telefono mai piu' usati, ecc). Non tocca le eventuali foto/
// video delle sue missioni gia' caricate, che restano visibili nella
// galleria del pannello sposi.
async function deletePlayer(playerId){
  if (state.mode !== 'online' || !fb) return;
  if (state.adminUids.includes(playerId)) await removeAdmin(playerId);
  await fb.deleteDoc(fb.doc(fb.db, 'players', playerId));
}

// invitati con la scorciatoia al pannello sposi nel proprio profilo, oltre a
// chi conosce l'indirizzo #sposi. Restano finché qualcuno non li rimuove da
// qui: per restarci "sempre", basta non togliersi da soli dalla lista.
async function addAdmin(uid){
  if (state.adminUids.includes(uid)) return;
  state.adminUids = [...state.adminUids, uid];
  if (state.mode === 'online' && fb){
    await fb.setDoc(fb.doc(fb.db, 'meta', 'state'), { admins: state.adminUids }, { merge: true });
  } else {
    localStorage.setItem('msquiz_admins', JSON.stringify(state.adminUids));
  }
  render();
}
async function removeAdmin(uid){
  state.adminUids = state.adminUids.filter(id => id !== uid);
  if (state.mode === 'online' && fb){
    await fb.setDoc(fb.doc(fb.db, 'meta', 'state'), { admins: state.adminUids }, { merge: true });
  } else {
    localStorage.setItem('msquiz_admins', JSON.stringify(state.adminUids));
  }
  render();
}

/* ============ Avvio ============ */
async function boot(){
  if (hasFirebaseConfig){
    try {
      fb = await initFirebase();
      await new Promise(resolve => {
        fb.onAuthStateChanged(fb.auth, async user => {
          if (!user){ await fb.signInAnonymously(fb.auth); return; }
          state.mode = 'online';
          state.guestId = user.uid;
          const snap = await fb.getDoc(fb.doc(fb.db, 'players', state.guestId));
          if (snap.exists()){
            const d = snap.data();
            state.name = d.name || ''; state.team = d.team ?? 1; state.avatarEmoji = d.avatarEmoji || '';
            state.sel = d.sel ?? null;
            state.res = d.res || {}; state.score = d.score || 0;
            state.order = d.order || [];
            state.missions = d.missions || [];
            state.transferCode = d.transferCode || '';
          }
          if (!state.transferCode && state.name){ state.transferCode = genTransferCode(); persistProgress(); }
          if (ensureOrder() && state.name) persistProgress();
          fb.onSnapshot(fb.collection(fb.db, 'players'), qs => {
            state.players = qs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            render();
          });
          // solo le proprie foto missione (query filtrata sul server): con
          // molti invitati, sincronizzare le foto di tutti a tutti sarebbe
          // un inutile spreco di dati sul telefono di ciascuno.
          fb.onSnapshot(fb.query(fb.collection(fb.db, 'missionPhotos'), fb.where('guestId', '==', state.guestId)), qs => {
            const map = {};
            qs.docs.forEach(doc => { const d = doc.data(); map[d.missionIndex] = normalizeMissionMedia(d); });
            state.missionPhotos = map;
            render();
          });
          fb.onSnapshot(fb.doc(fb.db, 'meta', 'state'), doc => {
            const d = doc.exists() ? doc.data() : {};
            state.revealed = !!d.revealed;
            state.heroPhoto = d.heroPhoto || '';
            state.adminUids = d.admins || [];
            render();
          });
          fb.onSnapshot(fb.collection(fb.db, 'extraCards'), qs => {
            state.extraCards = qs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (ensureOrder() && state.name) persistProgress();
            render();
          });
          // le foto missione di TUTTI gli invitati, solo per il pannello sposi
          // (per gli invitati normali resta la query filtrata sulla propria,
          // molto più leggera — vedi sopra).
          if (location.hash === '#sposi'){
            fb.onSnapshot(fb.collection(fb.db, 'missionPhotos'), qs => {
              state.allMissionPhotos = qs.docs.map(doc => { const d = doc.data(); return { ...d, ...normalizeMissionMedia(d) }; });
              render();
            });
          }
          resolve();
        });
      });
    } catch (err) {
      console.error('Firebase non disponibile, uso la modalità locale.', err);
      state.mode = 'local';
    }
  }
  if (state.mode === 'local'){
    state.players = RIVALS_DEMO;
    const saved = loadLocalProfile();
    state.guestId = (saved && saved.guestId) || uuid();
    if (saved){
      state.name = saved.name || ''; state.team = saved.team ?? 1; state.avatarEmoji = saved.avatarEmoji || '';
      state.sel = saved.sel ?? null; state.res = saved.res || {}; state.score = saved.score || 0;
      state.order = saved.order || [];
      state.missions = saved.missions || [];
    }
    state.heroPhoto = localStorage.getItem('msquiz_hero_photo') || '';
    try { state.missionPhotos = JSON.parse(localStorage.getItem('msquiz_mission_photos') || '{}'); } catch { state.missionPhotos = {}; }
    // compatibilita' con le foto salvate quando ogni voce era ancora una
    // semplice stringa (dataURL) invece di { kind, src }.
    Object.keys(state.missionPhotos).forEach(k => {
      if (typeof state.missionPhotos[k] === 'string') state.missionPhotos[k] = { kind: 'photo', src: state.missionPhotos[k] };
    });
    try { state.adminUids = JSON.parse(localStorage.getItem('msquiz_admins') || '[]'); } catch { state.adminUids = []; }
    if (ensureOrder() && state.name) saveLocalProfile();
  }
  if (location.hash === '#sposi') state.screen = 'admin';
  else state.screen = state.name ? 'hub' : 'join';
  try { history.replaceState({ screen: state.screen }, '', '#' + (state.screen === 'admin' ? 'sposi' : state.screen)); } catch {}
  render();
}

// il tasto "indietro" del telefono ripercorre le schermate visitate, invece
// di uscire dall'app: ogni cambio di schermata e' una voce di history (vedi
// pushScreen), qui la recuperiamo quando l'utente torna indietro (o avanti).
window.addEventListener('popstate', e => {
  state.screen = (e.state && e.state.screen) || (state.name ? 'hub' : 'join');
  render();
});

boot();
