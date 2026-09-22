import { firebaseConfig } from './firebase-config.js?v=1';

/* ============ Dati del gioco (copia dal design di riferimento) ============ */
const QS = [
  {k:'Su Mara', h:'Non parte mai senza.', t:'Qual è una cosa che Mara non rinuncerebbe mai a portarsi in viaggio?', o:['Un libro','La macchina fotografica','Tappi per le orecchie','Il power bank'], c:2, s:'Tappi per le orecchie: non si sa mai chi russa nella stanza accanto.'},
  {k:'Su Stefano', h:'Una piccola stranezza, presa con affetto.', t:'Quale tra queste è una piccola mania di Stefano?', o:['Riordinare il frigo per colore','Andare dal fruttivendolo','Controllare tre volte la scadenza del latte','Cronometrare la doccia'], c:1, s:'Andare dal fruttivendolo: un rito quasi quotidiano.'},
  {k:'Su di loro', h:'Chi si butta, chi pianifica.', t:'Chi dei due è più probabile che inizi un nuovo progetto senza sapere ancora esattamente come finirà?', o:['Mara','Stefano','Nessuno dei due, pianificano sempre tutto','Entrambi, a turno'], c:0, s:'Mara: si lancia e poi si organizza strada facendo.'},
  {k:'Su Stefano', h:'Una questione di gusto.', t:'Qual è il cibo preferito di Stefano?', o:['Pizza','Formaggio','Risotto ai funghi','Zucca'], c:1, s:'Il formaggio, sempre e comunque.'},
  {k:'Su Mara', h:'Un pomeriggio perfetto.', t:'Quale attività potrebbe convincere Mara a passare un intero pomeriggio senza guardare l’orologio?', o:['Una maratona di serie tv','Lavoretti con il fai da te','Fare shopping','Una lunga corsa'], c:1, s:'Lavoretti con il fai da te: il tempo vola, sempre.'},
  {k:'Su Stefano', h:'Non è proprio il suo forte.', t:'Quale delle seguenti cose Stefano non farebbe mai spontaneamente?', o:['Cucinare','Ballare','Guardare una partita','Fare un pisolino'], c:1, s:'Ballare: solo se strettamente necessario (tipo al matrimonio).'},
  {k:'Su Stefano', h:'Chi lo conosce bene, lo sa.', t:'Qual è la cosa che Stefano ama di più di Mara?', o:['Quando ride socchiudendo gli occhi e alzando le guanciotte','Quando si emoziona per le piccole cose e diventa incontenibile','Quando si concentra su qualcosa e fa una faccia serissima senza accorgersi','Quando racconta qualcosa che la appassiona e inizia a parlare velocissimo'], c:0, s:'Quando ride socchiudendo gli occhi e alzando le guanciotte: questo conquista Stefano.'},
  {k:'Su Mara', h:'Un colore che le somiglia.', t:'Qual è il colore preferito di Mara?', o:['Rosso','Blu','Verde','Il giallo'], c:3, s:'Il giallo, senza dubbi.'},
  {k:'Su Mara', h:'Chi la conosce bene, lo sa.', t:'Qual è la cosa che Mara ama di più di Stefano?', o:['La sua pazienza','La sua risata','Il suo modo di cucinare','Come organizza le vacanze'], c:1, s:'La sua risata: contagiosa, sempre.'},
  {k:'Su Mara', h:'Una questione di gusto.', t:'Qual è il piatto preferito di Mara?', o:['Lasagne','Risotto ai funghi','Polpette al sugo','Parmigiana'], c:2, s:'Polpette al sugo, come le fa la mamma.'},

  {k:'La loro vita insieme', h:'La frase che ha rotto il ghiaccio.', t:'Come ha fatto Ste a conquistare il cuore di Mara?', o:['Con la battuta su POP fa il criceto','La barzelletta della banana nell’orecchio','Il trucco di magia con la moneta nel braccio','La spiegazione sul perché si scuote la bustina di zucchero'], c:0, s:'POP fa il criceto: e 1000 altri da fare con il microonde.'},
  {k:'La loro vita insieme', h:'Chi tarda di più.', t:'Chi dei due ci mette più tempo a prepararsi prima di uscire?', o:['Mara','Ste','Nessuno dei due, sono velocissimi','Dipende dall’occasione'], c:1, s:'Ste: qualche minuto in più, ogni volta.'},
  {k:'La loro vita insieme', h:'Al ristorante succede sempre così.', t:'Chi dei due è più facile che dica «non lo voglio» e poi finisce per mangiare metà di quello dell’altro?', o:['Mara','Ste','Entrambi, a turno','Nessuno dei due'], c:1, s:'Ste: lo dice convinto, poi cambia idea a metà pasto.'},
  {k:'Come è iniziata', h:'Si parte dall’inizio: quella sera, quegli amici.', t:'Come si sono conosciuti Mara e Stefano?', o:["Ad un'associazione ludica",'Online','Al compleanno di Elisa','In montagna'], c:2, s:'Al compleanno di Elisa: una serata che ha cambiato tutto.'},
  {k:'La loro vita insieme', h:'Prima di tutti gli altri viaggi.', t:'Quale di questi è stato il primo viaggio fatto da soli?', o:['Toscana','Abruzzo','Francia','Perù'], c:0, s:'Toscana: il primo di tanti.'},

  {k:'Il giorno di festa', h:'Un ricordo blu che resterà per sempre.', t:'A cosa servirà la cianotipia fatta durante il rito?', o:['Da appendere in salotto','Copertina per l’album di nozze','Da regalare ai testimoni','Segnalibro per gli invitati'], c:1, s:'Copertina per l’album di nozze: un ricordo del giorno del sì.'},
  {k:'Il giorno di festa', h:'Parole scelte con cura.', t:'Chi ha letto la dedica d’amore?', o:['Il papà dello sposo','La mamma della sposa','La testimone dello sposo','La cugina della sposa'], c:1, s:'La mamma della sposa.'},
  {k:'Il giorno di festa', h:'Amore è anche questo.', t:'Ste ama Mara nonostante?', o:['Non sappia cucinare','Metta a soqquadro casa per ogni nuova passione','Sia sempre in ritardo','Non guardi mai le partite con lui'], c:1, s:'Metta a soqquadro casa per ogni nuova passione: e ne ha sempre una nuova.'},
  {k:'Il giorno di festa', h:'Un colpo d’occhio sulla sala.', t:'Quanti tavoli ci sono?', o:['7','8','9','10'], c:2, s:'9 tavoli, ognuno con un nome di viaggio.'},
  {k:'Il giorno di festa', h:'Il posto giusto per dirsi sì.', t:'Come si chiama la villa in cui siamo?', o:['Villa Calini','Villa Fiorita','Villa degli Ulivi','Villa Serena'], c:0, s:'Villa Calini.'},

  // "Andiamo in viaggio": nei libretti-segnaposto ogni tavolo racconta una sua escursione e un
  // aneddoto sul luogo — l'idea è che per rispondere si deve andare a chiedere in giro,
  // così gli invitati si mescolano tra tavoli diversi.
  {k:'Andiamo in viaggio', h:'Bisogna proprio chiedere in giro.', t:'Dov’eravamo?', o:['Machu Picchu','Étretat','Tirino','Etna'], c:1, s:'Étretat: il tavolo lo racconta nel suo libretto.'},
  {k:'Andiamo in viaggio', h:'Un sapore da non dimenticare.', t:'Dove hanno mangiato il pane e salamina più buono di sempre?', o:['Parco della Majella','XII Apostoli','Tuckett','Le Mont-Saint-Michel'], c:2, s:'Tuckett: chiedete al loro tavolo per i dettagli.'},
  {k:'Andiamo in viaggio', h:'Due ruote, tanta salita.', t:'In quale occasione Mara e Stefano hanno provato le bici elettriche?', o:['Machu Picchu','Calanchi di Atri','Etna','Le Mont-Saint-Michel'], c:1, s:'Calanchi di Atri: un giro in bici elettrica tra i calanchi.'},
  {k:'Andiamo in viaggio', h:'Un intruso tra le mete.', t:'Quale di queste destinazioni NON compare nei viaggi raccontati nei libretti dei tavoli?', o:['Forte di Fenestrelle','Palcoyo','XII Apostoli','Le Mont-Saint-Michel'], c:0, s:'Forte di Fenestrelle non fa parte dei viaggi raccontati ai tavoli.'},
  {k:'Andiamo in viaggio', h:'Quattro viaggi, un ordine giusto.', t:'Mettete in ordine cronologico i viaggi di Mara e Stefano.', order:['Toscana','Abruzzo','Francia','Perù'], shown:[2,0,3,1], s:'Toscana, Abruzzo, Francia, Perù: in questo ordine.'},
];
const BASE_PTS = 60, BONUS_PTS = 40, TIMER_S = 20;
// una medaglia per categoria a chi risponde a tutte le sue domande, giuste o
// sbagliate che siano: cosi' la puo' vincere chiunque, non solo chi indovina.
const CATS = [
  {name:'Mara & Stefano', from:0, to:9, mark:'<img src="assets/mascotte/criceti-mara-ste.png" alt="">', medal:'Gli sposi', note:'Hai risposto a tutte e 10 le domande su di loro'},
  {name:'La loro vita insieme', from:10, to:14, mark:'<img src="assets/mascotte/criceti-love.png" alt="">', medal:'La vita insieme', note:'Hai risposto a tutte e 5 le domande sulla vita insieme'},
  {name:'Il giorno di festa', from:15, to:19, mark:'<img src="assets/mascotte/criceti-festa.png" alt="">', medal:'Il giorno del sì', note:'Hai risposto a tutte e 5 le domande sul matrimonio'},
  {name:'Andiamo in viaggio', from:20, to:24, mark:'<img src="assets/mascotte/criceto-viaggio.png" alt="">', medal:'In viaggio', note:'Hai risposto a tutte e 5 le domande sulle storie dei tavoli'},
];
function catOf(i){ return CATS.findIndex(c => i >= c.from && i <= c.to); }
function catState(res, c){
  let done = 0, right = 0;
  for (let i = c.from; i <= c.to; i++){ if (res[i]){ done++; if (res[i].correct) right++; } }
  const n = c.to - c.from + 1;
  return { done, right, n, earned: done === n };
}
const TEAMS = ['Machu Picchu','Palcoyo','Étretat','Tirino','Etna','Parco della Majella','Tuckett','XII Apostoli','Le Mont-Saint-Michel','Calanchi'];
const RIVALS_DEMO = [
  {id:'demo-1', name:'Zia Franca', score:1042, res:demoRes(15,3.1), team:1, avatarEmoji:'🌻'},
  {id:'demo-2', name:'Testimone Andrea', score:918, res:demoRes(14,4.4), team:2, avatarEmoji:'🦄'},
  {id:'demo-3', name:'Chiara & Davide', score:770, res:demoRes(13,6.0), team:0, avatarEmoji:'💖'},
  {id:'demo-4', name:'Nonna Rosa', score:661, res:demoRes(12,9.2), team:3, avatarEmoji:'🐨'},
  {id:'demo-5', name:'Luca T.', score:534, res:demoRes(10,5.7), team:4},
  {id:'demo-6', name:'Cugino Pietro', score:288, res:demoRes(6,0), team:2, avatarEmoji:'🐸'}
];
function demoRes(n, avg){ const r={}; for(let i=0;i<n;i++) r[i]={pts:60,bonus:20,correct:true,used:avg||5}; return r; }

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
  'Qualcuno che balla con un bicchiere in mano',
  'La pista da ballo',
  'Il tavolo più "scatenato" della serata',
  'Una foto al fotografo ufficiale mentre lavora',
  'Una foto al deejay',
  'Una foto ad un cameriere',
  'Una persona che canta',
  'Gli sposi che ridono',
  'Le mani intrecciate degli sposi',
  'Una persona commossa',
  'Il primo ballo',
  'Un abbraccio tra due generazioni diverse',
  'Un bacio',
  'Una piccola mano',
  'Qualcuno che scrive',
  'Qualcuno che si fa una foto',
  'Qualcuno che tiene in braccio un bambino',
  'Ricrea una foto di una nostra escursione',
  'Un piatto del menù, come fosse una cartolina',
  'Il centrotavola più bello',
  'La consegna delle bomboniere',
  'Un dettaglio autunnale (foglia, zucca, colore rust) nella location',
  'Un giardino',
  'La persona che ti piace com’è vestita',
  'Un selfie con lo sposo',
  'Un selfie con la sposa',
  'Un selfie con le testimoni',
  'Un selfie con un genitore degli sposi',
  'Un selfie di gruppo',
  'Un selfie con la persona a cui vuoi più bene',
  'Una foto buffa',
  'Qualcuno che fa un brindisi',
  'Un selfie con tutto il tuo tavolo',
  'Un abbraccio',
  'Un applauso',
  'Un selfie con qualcuno vestito del tuo stesso colore',
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
// solo la miniatura: il tocco per aprirla a schermo intero (renderLightbox())
// e' sull'intera riga che la contiene, vedi renderMissione()/renderAdmin().
function renderMissionMedia(entry, cls){
  if (!entry || !entry.src) return '';
  return `<img src="${esc(entry.src)}" alt="" class="${cls}">`;
}

/* ============ Stato ============ */
const state = {
  screen: 'boot',
  name: '', team: 1, avatarEmoji: '', avatarPickerOpen: false, joinError: false,
  sel: null,
  qi: 0, startedAt: 0, locked: false, seq: [],
  res: {}, score: 0,
  order: [],
  revealed: false,
  peekCategories: false, // scavalca localmente state.revealed per rivedere le categorie dopo il reveal, vedi 'peek-categories'
  boardTab: 'ospiti', // 'ospiti' | 'squadre': quale tab e' aperta in renderBoard(), vedi 'board-tab'
  players: [],
  extraCards: [],
  mode: 'local',
  guestId: null,
  heroPhoto: '',
  missions: [], // [{ index, done }] — una per ogni missione presa (anche più di una)
  missionPhotos: {}, // { [missionIndex]: dataURL } — solo le proprie, per mostrarle
  allMissionPhotos: [], // tutte le missioni di tutti, solo per il pannello sposi
  adminUids: [], // uid di chi, oltre a chi conosce l'indirizzo #sposi, vede anche
                 // un tasto scorciatoia nel proprio profilo per il pannello sposi
  transferCode: '', // codice breve per ritrovare lo stesso profilo su un altro telefono
  recoverCode: '',
  medalCat: null, // indice in CATS della medaglia appena vinta, per renderMedal()
  lightbox: null, // posizione aperta dentro lightboxGallery, o null se chiusa
  lightboxGallery: [], // [{ kind, src, name, mission }] della lista mostrata sullo schermo corrente
  adminModal: null, // 'invitati' | 'missioni' | 'domande' | null: quale lista e' aperta a tutto schermo nel pannello sposi
  adminModalContent: {}, // { invitati, missioni, domande }: html completo di ogni lista, ricalcolato a ogni renderAdmin()
  dialog: null, // { kind: 'alert'|'confirm', message, onConfirm? } al posto di alert()/confirm() nativi, vedi openAlert()/openConfirm()
  copiedFlash: null, // 'album' | 'transfer' | null: quale bottone "Copia" mostra "Copiato!" al momento, vedi flashCopied()
  downloadingPhotos: false, // true mentre si prepara lo zip di downloadAllMissionPhotos()
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
  const app = initializeApp(firebaseConfig);
  const db = firestore.getFirestore(app);
  const auth = authMod.getAuth(app);
  return { app, db, auth, ...firestore, ...authMod };
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

// codici riservati per Mara e Stefano: al primo utilizzo creano il loro
// profilo speciale (nome e icona fissi, protetto da "Elimina" nel pannello
// sposi — vedi isSpecialProfile() — e gia' admin, vedi addAdmin() qui sotto);
// da li' in poi si comportano come un transferCode normale, recuperando
// quello stesso profilo (con lo stesso accesso admin) su ogni telefono.
const SPECIAL_PROFILES = {
  'POPSPOSA123!': { name: 'Mara', avatarEmoji: '👰🏻‍♀️' },
  'POPSPOSO123!': { name: 'Stefano', avatarEmoji: '🤵🏻' },
};
const isSpecialProfile = p => !!(p && SPECIAL_PROFILES[(p.transferCode || '').toUpperCase()]);

// recupera lo stesso profilo su un altro telefono cercandolo per transferCode
// (mostrato nel proprio profilo) e lo clona sul dispositivo corrente: non è
// una sincronizzazione live, ma si può ripetere in qualunque momento per
// riprendere i progressi più recenti.
async function recoverProfile(){
  const code = state.recoverCode.trim().toUpperCase();
  if (!code || state.mode !== 'online' || !fb) return;
  const qs = await fb.getDocs(fb.query(fb.collection(fb.db, 'players'), fb.where('transferCode', '==', code)));
  if (qs.empty){
    const special = SPECIAL_PROFILES[code];
    if (special){
      state.name = special.name; state.team = 1; state.avatarEmoji = special.avatarEmoji;
      state.sel = null; state.res = {}; state.score = 0; state.order = []; state.missions = [];
      state.transferCode = code;
      state.recoverCode = '';
      ensureOrder();
      await persistProgress();
      await addAdmin(state.guestId);
      go('hub');
      return;
    }
    openAlert('Nessun profilo trovato con questo codice.');
    return;
  }
  const oldId = qs.docs[0].id;
  const d = qs.docs[0].data();
  state.name = d.name || ''; state.team = d.team ?? 1; state.avatarEmoji = d.avatarEmoji || '';
  state.sel = d.sel ?? null;
  state.res = d.res || {}; state.score = d.score || 0;
  state.order = d.order || [];
  state.missions = d.missions || [];
  // il codice va copiato anche lui: altrimenti persistProgress() qui sotto,
  // trovando state.transferCode vuoto su questo id nuovo, ne genera uno
  // casuale e lo sovrascrive — perdendo per sempre un codice fisso come
  // quelli riservati di Mara e Stefano (vedi SPECIAL_PROFILES).
  state.transferCode = d.transferCode || '';
  state.recoverCode = '';
  ensureOrder();
  await persistProgress();
  // il profilo recuperato vive comunque sotto un id nuovo (l'anonimato non
  // permette di "tornare" a essere lo stesso id di prima): si riconcede
  // l'eventuale accesso admin al nuovo id e si cancella il vecchio, che a
  // questo punto è solo un doppione dello stesso invitato nell'elenco.
  if (oldId !== state.guestId){
    if (state.adminUids.includes(oldId)){
      await addAdmin(state.guestId);
      await removeAdmin(oldId);
    }
    await fb.deleteDoc(fb.doc(fb.db, 'players', oldId));
  }
  go('hub');
}

// esce dal profilo corrente per iscriverne uno nuovo sullo stesso telefono
// (utile per provare come un altro invitato, o per passare da un account
// all'altro). In locale cancella il profilo salvato sul telefono; online
// chiude la sessione anonima cosi' la prossima e' un profilo nuovo di zecca
// — quello vecchio resta comunque recuperabile con il suo codice.
function logout(){
  const warn = state.mode === 'online' && state.transferCode
    ? `Uscire da questo profilo? Potrai ritrovarlo in qualunque momento con il codice ${state.transferCode}.`
    : 'Uscire da questo profilo? Su questo telefono si ricomincia da zero.';
  openConfirm(warn, async () => {
    if (state.mode === 'online' && fb){
      await fb.signOut(fb.auth);
    } else {
      localStorage.removeItem('msquiz_profile');
      localStorage.removeItem('msquiz_mission_photos');
    }
    location.reload();
  });
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
// hasAppHistory diventa true al primo pushScreen(): solo da quel momento in
// poi e' garantito che ci sia davvero una schermata precedente nella
// cronologia del tab (vedi 'close-admin', che altrimenti con un link diretto
// #sposi userebbe history.back() per uscire dall'app invece che dal pannello).
let hasAppHistory = false;
function pushScreen(screen){
  try { history.pushState({ screen }, '', '#' + (screen === 'admin' ? 'sposi' : screen)); hasAppHistory = true; } catch {}
}
function replaceScreen(screen){
  try { history.replaceState({ screen }, '', '#' + (screen === 'admin' ? 'sposi' : screen)); } catch {}
}
function go(screen){
  state.screen = screen;
  pushScreen(screen);
  render();
}

// lightbox/modale "mostra tutti"/dialog non cambiano state.screen, quindi
// senza questo il tasto "indietro" del telefono le ignorerebbe del tutto e
// navigherebbe alla schermata precedente lasciandole aperte sopra. Ogni
// apertura registra una voce di history (vedi pushOverlayHistory, invocata
// da chi apre l'overlay); il popstate risultante — sia che arrivi dal back
// del device sia da un nostro history.back() per richiudere una voce dopo
// una chiusura via bottone — chiude l'overlay piu' recente invece di
// cambiare schermata (vedi il listener 'popstate' piu' sotto). E' un
// contatore (non un booleano) perche' gli overlay possono annidarsi: es. si
// apre la modale "mostra tutti" e poi, da li' dentro, una foto missione.
let overlayHistoryDepth = 0;
let suppressNextPopstate = false;
function pushOverlayHistory(){
  try { history.pushState({ overlay: true }, ''); overlayHistoryDepth++; } catch {}
}
// da chiamare quando si chiude un overlay toccando la X/lo sfondo/un
// bottone (non il tasto indietro): tiene bilanciata la cronologia senza
// far scattare una navigazione di schermata quando il popstate arriva.
function closeOverlayHistory(){
  if (overlayHistoryDepth > 0){
    suppressNextPopstate = true;
    overlayHistoryDepth--;
    history.back();
  }
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
  // categoria finita: se l'ha appena vinta (almeno l'80% giuste), prima
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
let lastScreen = null; // per resettare lo scroll solo quando cambia davvero schermata, non ad ogni render()

// riporta la pagina in cima: serve perché root.innerHTML viene rimpiazzato ad
// ogni render() (vedi sotto), ma lo scroll della finestra/di #app non si
// resetta da solo — altrimenti aprendo una nuova schermata (o una modale)
// dopo aver scrollato in fondo alla precedente, ci si ritroverebbe già in
// fondo anche lì. #app scrolla lui stesso solo da desktop in su (vedi
// style.css, @media min-width:481px); da mobile scrolla la finestra.
function resetScroll(){
  root.scrollTop = 0;
  window.scrollTo(0, 0);
}

// quando una modale/il lightbox si apre sopra la schermata corrente (senza
// cambiarla), salva qui la posizione di scroll da ripristinare alla chiusura
// — altrimenti richiudendola ci si ritroverebbe in cima invece che dove si
// era rimasti. E' una pila (non una singola posizione) cosi' funziona anche
// annidato: es. si apre "mostra tutti" e poi, da li' dentro, una foto missione.
let scrollStack = [];
function saveScroll(){
  scrollStack.push({ y: window.scrollY, rootTop: root.scrollTop });
}
function restoreScroll(){
  const s = scrollStack.pop();
  if (s){ root.scrollTop = s.rootTop; window.scrollTo(0, s.y); }
}

// sostituisce alert()/confirm() nativi (fuori stile, bloccanti) con una
// modale coerente col resto dell'app. openAlert mostra solo un messaggio con
// "OK"; openConfirm mostra "Annulla"/"Conferma" ed esegue onConfirm solo se
// si conferma — a differenza di confirm(), non è bloccante: chi chiama non
// riceve un valore, l'azione parte in modo asincrono dal click su "Conferma".
function openAlert(message){
  state.dialog = { kind: 'alert', message };
  pushOverlayHistory();
  render();
}
function openConfirm(message, onConfirm){
  state.dialog = { kind: 'confirm', message, onConfirm };
  pushOverlayHistory();
  render();
}
// feedback breve sul bottone stesso ("Copiato!" + classe verde per 1s) invece
// di aprire una modale — usato dopo aver copiato un codice negli appunti.
function flashCopied(key){
  state.copiedFlash = key;
  render();
  setTimeout(() => {
    if (state.copiedFlash === key){ state.copiedFlash = null; render(); }
  }, 1000);
}

function renderDialog(){
  const d = state.dialog;
  if (!d) return '';
  const isConfirm = d.kind === 'confirm';
  return `<div class="dialog-overlay" data-action="dialog-cancel">
    <div class="dialog-card" data-action="dialog-noop">
      <p class="dialog-message pretty">${esc(d.message)}</p>
      <div class="dialog-actions">
        ${isConfirm ? `<div class="button-alone"><button class="btn-text" data-action="dialog-cancel">Annulla</button></div>` : ''}
        <button class="button is-fill" data-action="dialog-confirm">${isConfirm ? 'Conferma' : 'OK'}</button>
      </div>
    </div>
  </div>`;
}

function render(){
  let html = '';
  switch (state.screen){
    case 'boot': html = renderBoot(); break;
    case 'join': html = renderJoin(); break;
    case 'code': html = renderRecoverCode(); break;
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
  const screenChanged = state.screen !== lastScreen;
  lastScreen = state.screen;
  root.innerHTML = html + (state.adminModal ? renderAdminModal() : '') + (state.lightbox != null ? renderLightbox() : '') + (state.dialog ? renderDialog() : '');
  if (screenChanged) resetScroll();
}

// foto missione a schermo intero: si apre toccando una miniatura (vedi
// renderMissionMedia()), si chiude toccando lo sfondo scuro o la ×. Se la
// lista ha più di un elemento si può scorrere avanti/indietro, con nome e
// missione come didascalia.
function renderLightbox(){
  const items = state.lightboxGallery || [];
  const item = items[state.lightbox];
  if (!item) return '';
  const media = `<img src="${esc(item.src)}" alt="" data-action="lightbox-noop">`;
  const many = items.length > 1;
  return `<div class="lightbox" data-action="close-lightbox">
    <button class="lightbox-close" data-action="close-lightbox">✕</button>
    ${many ? `<button class="lightbox-nav prev" data-action="lightbox-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"></path></svg></button>` : ''}
    ${media}
    ${many ? `<button class="lightbox-nav next" data-action="lightbox-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"></path></svg></button>` : ''}
    <div class="lightbox-caption" data-action="lightbox-noop">
      <strong>${esc(item.name || 'Senza nome')}</strong>
      <span>${esc(item.mission || '')}</span>
      ${many ? `<span class="lightbox-count tabular">${state.lightbox + 1} / ${items.length}</span>` : ''}
    </div>
  </div>`;
}

function renderBoot(){
  return `<div class="screen">
    <div class="kicker">Mara & Stefano</div>
    <p>Un attimo…</p>
  </div>`;
}

function renderJoin(){
  const chips = TEAMS.map((t, i) => `<button class="chip ${state.team===i?'on':''}" data-action="pick-team" data-team="${i}">${esc(t)}</button>`).join('');
  const emojiChips = AVATAR_EMOJIS.map(e => `<button class="chip emoji ${state.avatarEmoji===e?'on':''}" data-action="pick-avatar" data-emoji="${e}">${e}</button>`).join('');
  return `<div class="screen screen-join">
    <h1 class="join-title couple-title">Mara<span class="amp-line amp">&amp;</span>Stefano</h1>
    <div class="kicker neutral join-sub">16 ottobre 2026</div>
    <p class="join-intro pretty">Divertiti insieme a noi, siamo qui per festeggiare!</p>
    <div class="card join-card">
      <div class="field-block">
        <div class="field-label">Come ti chiami?</div>
        <input id="name-input" class="name-input ${state.joinError?'error':''}" type="text" placeholder="Il tuo nome" value="${esc(state.name)}" maxlength="40">
        ${state.joinError ? `<div class="field-error">Scrivi il tuo nome per continuare</div>` : ''}
      </div>
      <div class="field-block">
        <div class="field-label">Scegli un avatar (facoltativo)</div>
        <div class="chips">${emojiChips}</div>
      </div>
             <div class="field-block">
        <div class="field-label">Che escursione hai intrapreso?</div>
        <div class="chips">${chips}</div>
      </div>
    </div>
    <div class="join-spacer"></div>
    <div class="result-cta">
      <button class="button is-outline" data-action="join">Comincia</button>
    </div>
    <img src="assets/mascotte/criceti.png" alt="" class="join-mascot">
  </div>`;
}

// schermata minima raggiungibile solo da .../#code (vedi boot()): a chi ha
// gia' un profilo (o il codice riservato di Mara/Stefano, vedi
// SPECIAL_PROFILES) serve solo il campo del codice, non tutto il modulo
// d'iscrizione di renderJoin().
function renderRecoverCode(){
  return `<div class="screen screen-join">
    <h1 class="join-title couple-title">Mara<span class="amp-line amp">&amp;</span>Stefano</h1>
    <div class="kicker neutral join-sub">Recupera il tuo profilo</div>
    <div class="card join-card">
      <div class="field-block">
        <div class="field-label">Codice del tuo profilo</div>
        <input id="recover-code" class="name-input" type="text" placeholder="Codice" maxlength="20" value="${esc(state.recoverCode)}">
      </div>
    </div>
    <div class="join-spacer"></div>
    <div class="result-cta">
      <button class="button is-outline" data-action="recover-profile">Recupera profilo</button>
    </div>
    <img src="assets/mascotte/criceti.png" alt="" class="join-mascot">
  </div>`;
}

function renderHub(){
  ensureOrder();
  const total = allQuestions().length;
  const done = Object.keys(state.res).length;
  return `<div class="screen screen-hub">
    <div class="topbar home">
          <div class="hub-foot">
        <div class="names couple-title"><span class="letter-span">M</span><span class="couple-amp">&amp;</span><span class="letter-span">S</span></div>
        <div class="hero-dida">16 ottobre 2026</div>
      </div>
      ${avatarButton()}</div><div class="hub-hero">
      ${state.heroPhoto ? `<img src="${esc(state.heroPhoto)}" alt="">` : `<img src="assets/photos/hub-hero.jpg" alt="" onerror="this.remove()">`}
      <div class="home-fade-menu"></div> 
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
          <span class="kicker">Il quiz</span>
          <span class="title serif">${state.revealed ? 'La classifica è aperta!' : 'Quanto ne sai sugli sposi?'}</span>
          <span class="foot">${state.revealed ? 'Scopri chi ha vinto' : 'Scala la classifica, vinci un premio'}</span>
        </span>
        <span class="hub-quiz-ring">${state.revealed
          ? `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--bx" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M21 4h-3V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 4.31 1.799 6.91 4.819 7.012A6 6 0 0 0 11 17.91V20H9v2h6v-2h-2v-2.09a6.01 6.01 0 0 0 4.181-2.898C20.201 14.91 22 12.31 22 8V5a1 1 0 0 0-1-1M4 8V6h2v6.83C4.216 12.078 4 9.299 4 8m8 8c-2.206 0-4-1.794-4-4V4h8v8c0 2.206-1.794 4-4 4m6-3.17V6h2v2c0 1.299-.216 4.078-2 4.83"></path></svg>`
          : `<span class="num tabular">${done}</span><span class="den">/${total}</span>`}</span>
      </button>
      <div class="hub-tiles">
        <button class="hub-tile" data-action="go" data-screen="missione">
          <span class="kicker">Missione</span>
          <span class="title serif">${(() => {
            const last = state.missions[state.missions.length - 1];
            return !last ? 'Scopri la tua missione' : (last.done ? 'Fatta! Ne vuoi un\'altra?' : esc(MISSIONS[last.index]));
          })()}</span>
          <span class="foot">Scatta la foto</span>
        </button>
        <button class="hub-tile" data-action="go" data-screen="album">
          <span class="kicker">Album</span>
          <span class="title serif">Carica le tue foto</span>
          <span class="foot">WedShoots ↗</span>
        </button>
      </div>
    </div>
  </div>`;
}

function renderMissione(){
  const list = state.missions;
  const cur = list[list.length - 1];
  const inProgress = cur && !cur.done;
  const done = list.filter(m => m.done);

  let body;
  if (inProgress){
    body = `
      
    <div class="card is-centered">
        <div class="kicker">La tua missione</div>
      <h1 class="mission-text pretty">${esc(MISSIONS[cur.index])}</h1>
      <input id="mission-file-camera" type="file" accept="image/*" capture="environment" hidden>
      <input id="mission-file-gallery" type="file" accept="image/*" hidden>
      <div class="result-cta">
        <button class="button is-fill" data-action="mission-photo-pick" data-target="mission-file-camera">📷 Scatta</button>
        <button class="button is-outline" data-action="mission-photo-pick" data-target="mission-file-gallery">🖼️ Galleria</button>
      <p class="fine-print"><a href="" data-action="skip-mission">Non mi piace, cambia</a></p>
      </div>
    </div>`;
  } else if (!list.length){
    body = `<div class="card is-centered">
      <div class="mission-icon-circle">📷</div>
      <h1>Hai una missione fotografica ad aspettarti</h1>
      <p class="sub-text pretty">Ne esce una a sorpresa, diversa da quella di chiunque altro stia giocando.</p>
      <div class="result-cta">
        <button class="button is-outline" data-action="reveal-mission">Scopri la tua missione</button>
      </div>
    </div>
    <img src="assets/mascotte/criceto-missione.png" alt="" class="mission-mascot">`;
  } else {
    body = `<div class="card is-centered">
      <div class="mission-icon-circle">🎉</div>
      <h1>Missione completata!</h1>
      <p class="sub-text pretty" >Vuoi giocare ancora? </p>
      <div class="result-cta">
      <button class="button is-outline" data-action="reveal-mission">Fai un'altra missione</button>
      </div>
    </div>`;
  }

  const missionGallery = [];
  const historyRows = done.slice().reverse().map(m => {
    const entry = state.missionPhotos[m.index];
    let mediaHtml = '', rowAttr = '';
    if (entry && entry.src){
      missionGallery.push({ kind: entry.kind, src: entry.src, name: state.name, mission: MISSIONS[m.index] });
      const idx = missionGallery.length - 1;
      mediaHtml = renderMissionMedia(entry, 'mission-history-thumb');
      rowAttr = ` data-action="open-lightbox" data-index="${idx}"`;
    }
    return `<div class="mission-history-row"${rowAttr}>${mediaHtml}<span>${esc(MISSIONS[m.index])}</span></div>`;
  }).join('');
  state.lightboxGallery = missionGallery;
  const history = done.length ? `
    <div class="section-title">Missioni completate: ${done.length}</div>
    <div class="mission-history">${historyRows}</div>` : '';

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
      <div class="card is-centered">
        <div class="kicker">Album condiviso</div>
        <h1>Le tue foto nel nostro album</h1>
        <p class="sub-text pretty">Apri WedShoots e inserisci questo codice per entrare:</p>
        <div class="album-code-box">
          <span class="album-code tabular">${esc(ALBUM_CODE)}</span>
          <button class="button is-fill${state.copiedFlash==='album'?' is-copied':''}" data-action="copy-album-code">${state.copiedFlash==='album'?'Copiato!':'Copia'}</button>
        </div>
        <div class="result-cta">
          <button class="button is-outline" data-action="open-album">Apri WedShoots ↗</button>
        </div>
          <p class="fine-print">Non hai l'app? <a href="" data-action="open-album-store">Scaricala</a></p>
      </div>
      <img src="assets/mascotte/cricetino-fiore-solo.png" alt="" class="mission-mascot">
    </div>
  </div>`;
}

function renderHome(){
  if (state.revealed && !state.peekCategories){
    return `<div class="screen screen-finale">
          <div class="topbar">
      <button class="back-fab" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path></svg></button>
      ${avatarButton()}
    </div>
      ${renderClassificaFinale(`<button class="button is-outline" data-action="peek-categories">Torna alle categorie</button>`)}
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
      <div class="hover"></div>
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
    panel = `<div class="card is-dashed is-finished">
      <div class="mission-icon-circle">🎉</div>
      <h2>Hai risposto a tutto</h2>
      <p class="sub-text pretty">${state.revealed ? 'Puoi tornare a vedere la classifica quando vuoi.' : 'Per sapere chi ha vinto ti tocca aspettare, <br>si scopre il vincitore dopo il dolce!'}</p>
      ${state.revealed ? `<button class="button is-outline" data-action="peek-categories">Vedi la classifica</button>` : ''}
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
        : `<button class="button is-outline block" data-action="flip">Apri la domanda</button>`}
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
        <h1>Quanto ne sai sugli sposi?</h1>
      </div>
      <div class="home-score">
        <div class="num serif tabular">${state.score}</div>
        <div class="micro">Punti</div>
      </div>
    </div>
    ${remaining === 0 ? panel : ''}
    <div class="cat-cards">${catCards}${extraCard}</div>
    ${remaining !== 0 ? panel : ''}
  </div>`;
}

function renderQuizBody(q){
  if (q.photo){
    return `<div class="photo-mat">
      <div class="ph"><img src="${esc(q.photoSrc||'')}" alt="" onerror="this.remove()"></div>
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
      <div class="result-cta">
        <button class="button is-fill is-negative" data-action="confirm-order" ${remaining?'disabled':''}>Conferma l’ordine</button>
        <div class="button-alone"><button class="btn-text" data-action="reset-order">Ricomincia da capo</button></div>
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
    ? 'La classifica resta chiusa fino ai discorsi: nessuno sa come sta andando, nemmeno tu.'
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
      <button class="button is-fill is-negative" data-action="after-result">${cta}</button>
      <div class="button-alone"><button class="btn-text" data-action="nav-back">Basta per ora, torno dopo</button></div>
    </div>
  </div>`;
}

// schermata a tutto schermo che festeggia la medaglia appena vinta (almeno
// l'80% delle domande della categoria giuste), mostrata subito dopo l'ultimo
// risultato della categoria, prima di tornare alle categorie/al finale.
function renderMedal(){
  const c = CATS[state.medalCat];
  const variant = state.medalCat + 1;
  return `<div class="screen screen-medal cat-tile--${variant}">
    <div class="topbar">
      <button class="menu-hamburger" data-action="after-medal"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path></svg></button>
    </div>
    <div class="medal-celebrate">
      <div class="medal-badge-ring">${c.mark}</div>
      <div class="kicker">Medaglia vinta</div>
      <h1 class="medal-celebrate-title pretty">Congratulazioni, sai tutto su ${esc(c.name)}!</h1>
      <div class="medal-celebrate-name serif">${esc(c.medal)}</div>
      <p class="medal-celebrate-note pretty">${esc(c.note)}</p>
    </div>
    <button class="button is-outline block" data-action="after-medal">Continua</button>
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
  const tab = state.boardTab === 'squadre' ? 'squadre' : 'ospiti';
  const tabs = `<div class="board-tabs">
    <button class="board-tab ${tab==='ospiti'?'active':''}" data-action="board-tab" data-tab="ospiti">Ospiti</button>
    <button class="board-tab ${tab==='squadre'?'active':''}" data-action="board-tab" data-tab="squadre">Squadre</button>
  </div>`;
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
    return `<div class="screen">
      ${avatarButton()}
      <div class="kicker">${board.length} partecipanti</div>
      <h1 class="board-title">Classifica</h1>
      <p class="board-explainer pretty">Nessuno vede i punti degli altri. La classifica si apre quando Mara e Stefano prendono il microfono.</p>
      <div class="you-box">
        <div class="micro">Quello che puoi vedere</div>
        <div class="big serif tabular">${state.score} punti tuoi</div>
        <div class="board-detail">${done ? 'Media ' + numIt(avg) + 's su ' + done + ' carte' : 'Nessuna carta girata'}</div>
      </div>
      ${tabs}
      ${tab === 'ospiti'
        ? `<div class="board-list">${rows}</div>`
        : `<p class="rank-line">Media punti a persona, nascosta come il resto fino al reveal.</p>
           <div class="board-list">${teamRows}</div>`}
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
  return `<div class="screen screen-finale">
    <div class="topbar">
      <button class="back-fab" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path></svg></button>
      ${avatarButton()}
    </div>
    <div class="kicker">Classifica completa</div>
    <h1 class="couple-title">Classifica</h1>
    ${tabs}
    ${tab === 'ospiti'
      ? `<div class="board-list">${rows}</div>
      <div class="sub-text pretty">A parità di punti vince chi ha risposto più in fretta.</div>
         `
      : `<div class="board-list">${teamRows}</div>
      <p class="sub-text pretty">Media punti a persona: ogni squadra pesa allo stesso modo, indipendentemente dal numero di partecipanti!</p>
      `}
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
  const badgeCards = extraBadges.map(b => `<div class="medal-card ${b.locked ? 'locked' : 'earned'}">
    <div class="glyph-mark">${b.mark}</div>
    <div class="name serif">${esc(b.name)}</div>
    <div class="note">${esc(b.note)}</div>
  </div>`).join('');
  const answers = allQuestions().map((x, i) => ({ i, x })).filter(o => state.res[o.i])
    .sort((a, b) => posOf(a.i) - posOf(b.i)).map(o => {
    const r = state.res[o.i];
    return `<div class="answer-row">
      <span class="num${r.correct?' is-correct':''}">${posOf(o.i)+1}</span>
      <span class="title">${esc(o.x.t)}</span>
      <span class="line tabular">${r.pts?'+'+r.pts:'0'} · ${numIt(r.used)}s</span>
    </div>`;
  }).join('');
  const emojiChips = AVATAR_EMOJIS.map(e => `<button class="chip emoji ${state.avatarEmoji===e?'on':''}" data-action="pick-avatar" data-emoji="${e}">${e}</button>`).join('');
  return `<div class="screen screen-profile">
    <div class="topbar">${avatarButton()}</div>
    <button class="avatar lg" data-action="toggle-avatar-picker">${esc(avatarGlyph(state))}<span class="avatar-icon" data-action="toggle-avatar-picker">${state.avatarPickerOpen ? '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="m227.31 73.37l-44.68-44.69a16 16 0 0 0-22.63 0L36.69 152A15.86 15.86 0 0 0 32 163.31V208a16 16 0 0 0 16 16h44.69a15.86 15.86 0 0 0 11.31-4.69L227.31 96a16 16 0 0 0 0-22.63M192 108.68L147.31 64l24-24L216 84.68Z"></path></svg>'}</span></button>

    ${state.avatarPickerOpen ? `<div class="chips">${emojiChips}
      ${state.avatarEmoji ? `<button class="chip" data-action="pick-avatar" data-emoji="">Nessuna</button>` : ''}
    </div>` : ''}
    <h1 class="profile-name">${esc(name)}</h1>
    <div class="profile-team">Tavolo ${esc(TEAMS[state.team])}</div>
    ${state.adminUids.includes(state.guestId) ? `<div class="result-cta"><button class="button is-outline" data-action="go" data-screen="admin">Pannello sposi</button></div>` : ''}
    <div class="stat-strip">
      <div class="stat-cell"><div class="v serif tabular">${state.score}</div><div class="c">Punti</div></div>
      <div class="stat-cell"><div class="v serif tabular">${done}/${total}</div><div class="c">Carte</div></div>
      <div class="stat-cell"><div class="v serif tabular">${done?numIt(avg)+'s':'—'}</div><div class="c">Media</div></div>
    </div>
    <div class="section-title">Medaglie · ${earnedCount} su ${CATS.length}</div>
    <div class="medal-grid">${medalCards}</div>
    <div class="section-title">Altri traguardi</div>
    <div class="medal-grid">${badgeCards}</div>
    <div class="section-title">Le tue risposte</div>
    ${answers || `<div class="empty-note">Ancora niente. Gira la prima carta.</div>`}
    ${state.mode === 'online' && state.transferCode ? `
      <div class="section-title">Il tuo profilo su un altro telefono</div>
      <div class="album-code-box">
        <span class="album-code tabular">${esc(state.transferCode)}</span>
        <button class="button is-outline small${state.copiedFlash==='transfer'?' is-copied':''}" data-action="copy-transfer-code">${state.copiedFlash==='transfer'?'Copiato!':'Copia codice'}</button>
      </div>
      <p class="fine-print">Aprendo il gioco su un altro telefono, tocca "Hai già un profilo?" e inserisci questo codice per ritrovare nome, punti e risposte.</p>` : ''}
    <div class="button-alone"><button class="button is-outline is-esci" data-action="logout">Esci da questo profilo</button></div>
  </div>`;
}

// podio + posizione personale a classifica aperta: condiviso da renderFinale()
// (subito dopo l'ultima domanda) e da renderHome() (quando si torna sul quiz
// dall'hub a classifica gia' aperta) — backButton e' l'unica cosa che cambia
// tra i due punti d'ingresso: dove porta il tasto per uscire da qui.
function renderClassificaFinale(backButton){
  const board = ranked();
  const mine = board.find(p => p.me);
  const podium = board.slice(0, 3);
  const order = [1, 0, 2].filter(i => podium[i]);
  const cols = order.map(i => {
    const p = podium[i];
    return `<div class="podium-col">
      <div class="avatar">${esc(p.avatar)}</div>
      <div class="podium-pname">${esc(p.name)}</div>
      <div class="podium-block serif rank-${p.rank} ${p.rank===1?'top':''}">
        <div class="score tabular">${p.score}</div>
        <div class="rk">${p.rank}º</div>
      </div>
    </div>`;
  }).join('');
  const note = mine && mine.rank <= 3 ? 'Premio in arrivo insieme alla torta.' : 'Mannaggia, è andata male!';
  const teams = computeTeams();
  const winningTeam = teams.length ? teams.slice().sort((a, b) => b.avg - a.avg)[0] : null;
  return `
    <div class="kicker">Il podio</div>
    <h1 class="couple-title">Chi ne sa di più?</h1>
    <div class="podium">${cols}</div>
    ${winningTeam ? `<div class="winner-team">
      <span class="micro">Squadra vincitrice</span>
      <span class="winner-team-name serif">${esc(winningTeam.label)}</span>
    </div>` : ''}
    <div class="card is-dashed">
      <div class="kicker">Tu</div>
      <h2>${mine ? mine.rank + 'º con ' + mine.score + ' punti' : ''}</h2>
      <div class="sub-text pretty">${note}</div>
          <button class="button is-outline" data-action="open-board-full">Classifica completa</button>
    </div>
  `;
}

function renderFinale(){
  if (!state.revealed){
    return `<div class="screen screen-finale">
          <div class="topbar">
      <button class="back-fab" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path></svg></button>
      ${avatarButton()}
    </div>
      <div class="empty-deck full">
        <img src="assets/mascotte/cricetini-cuore.png" alt="">
        <h2>Le hai fatte tutte!</h2>
        <p class="pretty">I risultati si vedranno dopo il taglio della torta, quando verrà annunciato il vincitore.</p>
        <button class="button is-outline" data-action="go" data-screen="home">Torna alle categorie</button>
      </div>
    </div>`;
  }
  return `<div class="screen screen-finale">
    <div class="topbar">
      <button class="back-fab" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"></path></svg></button>
      ${avatarButton()}
    </div>
    ${renderClassificaFinale(`<button class="button is-outline" data-action="go" data-screen="home">Torna alle categorie</button>`)}
  </div>`;
}

// tutte le foto missione (non solo le proprie), solo per il pannello
// sposi: si attiva la prima volta che si entra davvero in questa schermata,
// che sia con l'indirizzo #sposi o con la scorciatoia dal profilo — invece
// di dipendere da un controllo fatto una volta sola all'avvio dell'app, che
// mancava proprio nel secondo caso.
let adminMissionsSubStarted = false;
function ensureAdminMissionsSub(){
  if (adminMissionsSubStarted || state.mode !== 'online' || !fb) return;
  adminMissionsSubStarted = true;
  fb.onSnapshot(fb.collection(fb.db, 'missionPhotos'), qs => {
    state.allMissionPhotos = qs.docs.map(doc => { const d = doc.data(); return { ...d, ...normalizeMissionMedia(d) }; });
    render();
  });
}

const ADMIN_MODAL_TITLES = { invitati: 'Tutti gli invitati', missioni: 'Tutte le missioni completate', domande: 'Tutte le domande' };

// salva l'html completo di una lista per la modale a schermo intero (vedi
// renderAdminModal()), aperta toccando il box con l'icona corrispondente
// invece di allungare la pagina con l'anteprima delle righe.
function storeAdminList(key, rowsArr, emptyLabel){
  state.adminModalContent[key] = rowsArr.join('') || `<p class="fine-print">${emptyLabel}</p>`;
}

function renderAdmin(){
  ensureAdminMissionsSub();
  const totalPlayers = state.players.length;
  const totalCards = allQuestions().length;
  const totalPossible = totalPlayers * totalCards;
  const totalDone = state.players.reduce((sum, p) => sum + Object.keys(p.res || {}).length, 0);
  const pct = totalPossible ? Math.round((totalDone / totalPossible) * 100) : 0;
  const questionRows = allQuestions().map((x, i) => {
    const answers = state.players.filter(p => p.res && p.res[i]).length;
    const correct = state.players.filter(p => p.res && p.res[i] && p.res[i].correct).length;
    const correctPct = answers ? Math.round((correct / answers) * 100) : null;
    return `<div class="admin-card-row">
      <div class="admin-card-content">
        <div class="num">${i + 1}</div>
        <div>
          <div class="kk">${esc(x.k)}</div>
          <div class="tt">${esc(x.t)}</div>
        </div>
      </div>
      <div class="cnt">${answers} risposte${correctPct != null ? ` · ${correctPct}% giuste` : ''}</div>
    </div>`;
  });
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
      <div class="admin-card-content">
        <div class="avatar">${esc(avatarGlyph(p))}</div>
        <div>
          <div class="tt">${esc(name)}${nameTag}</div>
          <div class="kk">${esc(TEAMS[p.team] || '')} · ${done}/${totalCards} carte · ${p.score || 0} punti</div>
        </div>
      </div>
      <div class="admin-card-row-actions">
        ${isAdmin
          ? `<button class="reset-btn" data-action="remove-admin" data-id="${esc(p.id)}">Admin ✓</button>`
          : `<button class="reset-btn" data-action="add-admin" data-id="${esc(p.id)}">Rendi admin</button>`}
        <button class="reset-btn" data-action="reset-player-answers" data-id="${esc(p.id)}">Azzera</button>
        ${isSpecialProfile(p) ? '' : `<button class="reset-btn" data-action="delete-player" data-id="${esc(p.id)}">Elimina</button>`}
      </div>
    </div>`;
  });
  const adminMissionGallery = [];
  const missionRows = state.allMissionPhotos
    .slice()
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .map(m => {
      let mediaHtml = '', rowAttr = '';
      if (m.src){
        adminMissionGallery.push({ kind: m.kind, src: m.src, name: m.name, mission: MISSIONS[m.missionIndex] });
        const idx = adminMissionGallery.length - 1;
        mediaHtml = renderMissionMedia({ kind: m.kind, src: m.src }, 'mission-admin-thumb');
        rowAttr = ` data-action="open-lightbox" data-index="${idx}"`;
      }
      return `<div class="mission-admin-row"${rowAttr}>
      ${mediaHtml}
      <div>
        <div class="tt">${esc(m.name || 'Senza nome')}</div>
        <div class="kk">${esc(MISSIONS[m.missionIndex] || '')}</div>
      </div>
    </div>`;
    });
  state.lightboxGallery = adminMissionGallery;
  storeAdminList('invitati', playerRows, 'Nessuno ha ancora giocato.');
  storeAdminList('missioni', missionRows, 'Nessuna missione completata ancora.');
  storeAdminList('domande', questionRows, 'Nessuna domanda.');
  return `<div class="screen screen-admin">
  <div class="topbar">  
  ${avatarButton()}
  </div>
    <div class="kicker">Pannello sposi</div>
    <h2 class="admin-title couple-title">Mara <span class="amp">&amp;</span> Stefano</h2>
    <div class="admin-stats">
      <div class="stat-cell"><div class="v serif tabular">${totalPlayers}</div><div class="c">Giocano</div></div>
      <div class="stat-cell"><div class="v serif tabular">${totalCards}</div><div class="c">Domande</div></div>
      <div class="stat-cell"><div class="v serif tabular">${pct}%</div><div class="c">Completate</div></div>
    </div>
    <div class="envelope-box">
      <div class="row">
        <div><div class="micro">Il quiz</div><div class="big serif">${state.revealed ? 'Chiuso' : 'Aperto'}</div></div>
        <div class="lock">${state.revealed ? '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M208 76h-28V56a52 52 0 0 0-104 0v20H48a20 20 0 0 0-20 20v112a20 20 0 0 0 20 20h160a20 20 0 0 0 20-20V96a20 20 0 0 0-20-20M100 56a28 28 0 0 1 56 0v20h-56Zm104 148H52V100h152Z"></path></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M208 76H100V56a28 28 0 0 1 28-28c13.51 0 25.65 9.62 28.24 22.39a12 12 0 1 0 23.52-4.78C174.87 21.5 153.1 4 128 4a52.06 52.06 0 0 0-52 52v20H48a20 20 0 0 0-20 20v112a20 20 0 0 0 20 20h160a20 20 0 0 0 20-20V96a20 20 0 0 0-20-20m-4 128H52V100h152Z"></path></svg>'}</div>
      </div>
      ${state.revealed
        ? `<button class="btn-dark" data-action="close-board">Riapri il gioco</button>`
        : `<button class="btn-dark" data-action="open-board">Chiudi e mostra la classifica</button>`}
    </div>
    <div class="section-title">Impostazioni</div>
    ${state.heroPhoto ? `<div class="hero-upload-box has-photo">
      <img src="${esc(state.heroPhoto)}" alt="" class="hero-upload-preview">
      <input id="admin-hero-file" type="file" accept="image/*" hidden>
      <div class="hero-upload-actions">
        <button class="reset-btn" data-action="admin-hero-pick">Cambia foto</button>
        <button class="reset-btn" data-action="admin-hero-remove">Rimuovi</button>
      </div>
    </div>` : `<div class="hero-upload-box">
      <div class="hero-upload-empty">vuota</div>
      <div>Nessuna foto caricata. Appare in cima alla home.</div>
      <input id="admin-hero-file" type="file" accept="image/*" hidden>
      <button class="reset-btn" data-action="admin-hero-pick">Carica</button>
    </div>`}
    <div class="admin-link-grid">
      ${state.mode === 'online' ? `<button class="admin-link-box" data-action="open-admin-modal" data-target="invitati">
        <span class="admin-link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M234.38 210a123.36 123.36 0 0 0-60.78-53.23a76 76 0 1 0-91.2 0A123.36 123.36 0 0 0 21.62 210a12 12 0 1 0 20.77 12c18.12-31.32 50.12-50 85.61-50s67.49 18.69 85.61 50a12 12 0 0 0 20.77-12M76 96a52 52 0 1 1 52 52a52.06 52.06 0 0 1-52-52"></path></svg></span>
        <span class="admin-link-count tabular">${totalPlayers}</span>
        <span class="admin-link-label">Invitati</span>
      </button>` : ''}
      ${state.mode === 'online' ? `<button class="admin-link-box" data-action="open-admin-modal" data-target="missioni">
        <span class="admin-link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"></path></svg></span>
        <span class="admin-link-count tabular">${missionRows.length}</span>
        <span class="admin-link-label">Missioni</span>
      </button>` : ''}
      <button class="admin-link-box" data-action="open-admin-modal" data-target="domande">
        <span class="admin-link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M7.92 7.54c-.8-.34-1.14-1.33-.66-2.05C8.23 4.05 9.85 3 11.99 3c2.35 0 3.96 1.07 4.78 2.41c.7 1.15 1.11 3.3.03 4.9c-1.2 1.77-2.35 2.31-2.97 3.45c-.15.27-.24.49-.3.94c-.09.73-.69 1.3-1.43 1.3c-.87 0-1.58-.75-1.48-1.62c.06-.51.18-1.04.46-1.54c.77-1.39 2.25-2.21 3.11-3.44c.91-1.29.4-3.7-2.18-3.7c-1.17 0-1.93.61-2.4 1.34c-.35.57-1.08.75-1.69.5M14 20c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2"></path></svg></span>
        <span class="admin-link-count tabular">${totalCards}</span>
        <span class="admin-link-label">Domande</span>
      </button>
    </div>
  </div>`;
}

// lista completa (invitati/missioni/domande) a schermo intero: si apre dal
// bottone "Mostra tutti" di renderAdmin(), che ha gia' salvato l'html di ogni
// riga in state.adminModalContent cosi' anteprima e modale restano identiche.
function renderAdminModal(){
  const key = state.adminModal;
  if (!key) return '';
  const missionPhotoCount = state.allMissionPhotos.filter(m => m.src).length;
  return `<div class="admin-modal" data-action="close-admin-modal">
    <div class="admin-modal-sheet" data-action="lightbox-noop">
      <div class="admin-modal-head">
        <div class="section-title">${esc(ADMIN_MODAL_TITLES[key] || '')}</div>
        <button class="admin-modal-close" data-action="close-admin-modal">✕</button>
      </div>
      ${key === 'missioni' && missionPhotoCount ? `<div class="button-alone"><button class="btn-text" data-action="download-mission-photos" ${state.downloadingPhotos ? 'disabled' : ''}>${state.downloadingPhotos ? 'Preparazione dello zip…' : `Scarica tutte le foto (${missionPhotoCount})`}</button></div>
      <div class="button-alone"><button class="btn-text" data-action="reset-all-missions">Svuota tutte le missioni</button></div>` : ''}
      <div class="admin-modal-body">${state.adminModalContent[key] || ''}</div>
    </div>
  </div>`;
}

// unica scorciatoia globale rimasta dopo aver tolto la tabbar: l'avatar
// (emoji scelta, o le iniziali se non ne ha scelta una) in alto a destra apre
// il profilo; da dentro il profilo lo stesso posto mostra una "×" per tornare
// a dove si era prima.
function avatarButton(){
  if (state.screen === 'profile') return `<button class="menu-hamburger" data-action="nav-back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path></svg></button>`;
  // il pannello sposi si raggiunge quasi sempre con il link diretto #sposi (senza
  // una schermata precedente nella cronologia del browser): la X qui non puo'
  // fare nav-back come nel profilo, altrimenti si esce dall'app. Chiude sempre
  // esplicitamente sull'hub (vedi 'close-admin').
  if (state.screen === 'admin') return `<button class="menu-hamburger" data-action="close-admin"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path></svg></button>`;
  return `<button class="menu-hamburger" data-action="go" data-screen="profile"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--carbon" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="currentColor"></circle><circle cx="16" cy="16" r="2" fill="currentColor"></circle><circle cx="16" cy="24" r="2" fill="currentColor"></circle></svg></button>`;
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
    case 'open-lightbox': saveScroll(); pushOverlayHistory(); state.lightbox = +el.dataset.index; render(); resetScroll(); break;
    case 'close-lightbox': state.lightbox = null; render(); restoreScroll(); closeOverlayHistory(); break;
    case 'lightbox-prev': {
      const n = state.lightboxGallery.length;
      state.lightbox = (state.lightbox - 1 + n) % n;
      render();
      break;
    }
    case 'lightbox-next': {
      const n = state.lightboxGallery.length;
      state.lightbox = (state.lightbox + 1) % n;
      render();
      break;
    }
    case 'lightbox-noop': break;
    case 'dialog-confirm': {
      const cb = state.dialog && state.dialog.onConfirm;
      state.dialog = null;
      cb && cb();
      render();
      closeOverlayHistory();
      break;
    }
    case 'dialog-cancel': state.dialog = null; render(); closeOverlayHistory(); break;
    case 'dialog-noop': break;
    case 'join': {
      const input = document.getElementById('name-input');
      const name = (input && input.value.trim()) || '';
      if (!name){
        state.joinError = true;
        render();
        document.getElementById('name-input')?.focus();
        break;
      }
      state.joinError = false;
      state.name = name;
      persistProgress();
      go('hub');
      break;
    }
    case 'flip': flip(); break;
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
    case 'close-admin': {
      // se c'e' davvero una schermata precedente (es. si e' arrivati qui dal
      // tasto "Pannello sposi" nel profilo), ci si torna; altrimenti (link
      // diretto #sposi, senza cronologia precedente) si esce esplicitamente
      // sull'hub/join, vedi hasAppHistory sopra.
      if (hasAppHistory) history.back();
      else go(state.name ? 'hub' : 'join');
      break;
    }
    case 'open-board-full': state.revealed = true; go('board'); break;
    case 'open-board': openReveal(); break;
    case 'close-board': closeReveal(); break;
    case 'peek-categories': state.peekCategories = !state.peekCategories; render(); break;
    case 'board-tab': state.boardTab = el.dataset.tab; render(); break;
    case 'open-admin-modal': saveScroll(); pushOverlayHistory(); state.adminModal = el.dataset.target; render(); resetScroll(); break;
    case 'close-admin-modal': state.adminModal = null; render(); restoreScroll(); closeOverlayHistory(); break;
    case 'reset-player-answers': {
      openConfirm('Azzerare tutte le risposte e i punti di questo invitato? Non si può annullare.', () => resetPlayerAnswers(el.dataset.id));
      break;
    }
    case 'add-admin': addAdmin(el.dataset.id); break;
    case 'remove-admin': removeAdmin(el.dataset.id); break;
    case 'delete-player': {
      openConfirm('Eliminare questo invitato? Sparisce dalla classifica e dal gioco, non si può annullare.', () => deletePlayer(el.dataset.id));
      break;
    }
    case 'open-album': window.open(ALBUM_URL, '_blank'); break;
    case 'open-album-store': {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      window.open(isIOS ? WEDSHOOTS_IOS_URL : WEDSHOOTS_ANDROID_URL, '_blank');
      break;
    }
    case 'copy-album-code': {
      if (navigator.clipboard) navigator.clipboard.writeText(ALBUM_CODE).then(() => flashCopied('album')).catch(() => openAlert('Codice album: ' + ALBUM_CODE));
      else openAlert('Codice album: ' + ALBUM_CODE);
      break;
    }
    case 'copy-transfer-code': {
      if (navigator.clipboard) navigator.clipboard.writeText(state.transferCode).then(() => flashCopied('transfer')).catch(() => openAlert('Codice profilo: ' + state.transferCode));
      else openAlert('Codice profilo: ' + state.transferCode);
      break;
    }
    case 'recover-profile': recoverProfile(); break;
    case 'logout': logout(); break;
    case 'reveal-mission': assignMission(); break;
    case 'mission-photo-pick': document.getElementById(el.dataset.target).click(); break;
    case 'skip-mission': {
      openConfirm('Cambiare missione? Non potrai più tornare a questa.', skipMission);
      break;
    }
    case 'admin-hero-pick': document.getElementById('admin-hero-file').click(); break;
    case 'admin-hero-remove': {
      openConfirm('Togliere la foto di copertina? Torna il placeholder.', removeHeroPhoto);
      break;
    }
    case 'download-mission-photos': downloadAllMissionPhotos(); break;
    case 'reset-all-missions': {
      openConfirm('Svuotare tutte le missioni fatte? Cancella le foto caricate da ogni invitato e li fa ripartire da capo con una nuova missione. Non si può annullare.', () => resetAllMissions());
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
    openAlert('La foto è troppo pesante anche dopo la compressione: provane una più semplice o meno ad alta risoluzione.');
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

async function completeMission(file){
  const cur = state.missions[state.missions.length - 1];
  if (!cur || cur.done || !file) return;
  const steps = [[1000, 0.7], [800, 0.55], [600, 0.4]];
  let dataUrl = '';
  for (const [maxDim, quality] of steps){
    dataUrl = await fileToCompressedDataUrl(file, maxDim, quality);
    if (dataUrl.length < 500000) break;
  }
  if (dataUrl.length >= 500000){
    openAlert('La foto è troppo pesante anche dopo la compressione: provane una più semplice.');
    return;
  }
  const kind = 'photo', src = dataUrl;
  cur.done = true;
  state.missionPhotos = { ...state.missionPhotos, [cur.index]: { kind, src } };
  render();
  if (state.mode === 'online' && fb){
    await fb.setDoc(fb.doc(fb.db, 'players', state.guestId), { missions: state.missions }, { merge: true });
    // foto in una collezione separata (non nel documento players): con più
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

// azzera le risposte di un invitato (utile in fase di test, per rigiocare senza
// doversi iscrivere con un nome nuovo). L'ordine delle carte resta lo stesso.
async function resetPlayerAnswers(playerId){
  if (state.mode !== 'online' || !fb) return;
  await fb.setDoc(fb.doc(fb.db, 'players', playerId), { res: {}, score: 0 }, { merge: true });
}

// svuota le missioni fatte da tutti: cancella ogni foto missione caricata
// finora e azzera il progresso missioni di ciascun invitato (utile per
// ripulire i test prima del matrimonio). Le risposte al quiz non c'entrano.
async function resetAllMissions(){
  if (state.mode !== 'online' || !fb) return;
  const qs = await fb.getDocs(fb.collection(fb.db, 'missionPhotos'));
  await Promise.all(qs.docs.map(d => fb.deleteDoc(fb.doc(fb.db, 'missionPhotos', d.id))));
  await Promise.all(state.players.map(p => fb.setDoc(fb.doc(fb.db, 'players', p.id), { missions: [] }, { merge: true })));
  if (state.missions.length || Object.keys(state.missionPhotos).length){
    state.missions = []; state.missionPhotos = {};
    await persistProgress();
  }
}

// toglie un invitato dalla classifica/dal gioco (utenze di prova, doppioni
// da un altro telefono mai piu' usati, ecc). Non tocca le eventuali foto
// delle sue missioni gia' caricate, che restano visibili nella galleria
// del pannello sposi.
async function deletePlayer(playerId){
  if (state.mode !== 'online' || !fb) return;
  if (isSpecialProfile(state.players.find(p => p.id === playerId))) return;
  if (state.adminUids.includes(playerId)) await removeAdmin(playerId);
  await fb.deleteDoc(fb.doc(fb.db, 'players', playerId));
}

// impacchetta in uno zip tutte le foto missione di tutti gli invitati e lo
// scarica in un colpo solo: JSZip si carica al volo solo quando serve (come
// i moduli Firebase), per non appesantire il caricamento iniziale dell'app.
async function downloadAllMissionPhotos(){
  const photos = state.allMissionPhotos.filter(m => m.kind === 'photo' && m.src);
  if (!photos.length) return;
  state.downloadingPhotos = true;
  render();
  try {
    const { default: JSZip } = await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm');
    const zip = new JSZip();
    const usedNames = new Set();
    photos.forEach(m => {
      const guest = (m.name || 'Senza nome').replace(/[\\/:*?"<>|]/g, '').trim() || 'Senza nome';
      const mission = (MISSIONS[m.missionIndex] || 'missione').slice(0, 50).replace(/[\\/:*?"<>|]/g, '').trim();
      const base = `${guest} - ${mission}`.trim();
      let filename = `${base}.jpg`, n = 2;
      while (usedNames.has(filename)){ filename = `${base} (${n}).jpg`; n++; }
      usedNames.add(filename);
      zip.file(filename, m.src.split(',')[1] || '', { base64: true });
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'foto-missioni-mara-stefano.zip';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  } catch (err){
    openAlert('Non sono riuscito a preparare lo zip: riprova, o controlla la connessione.');
  } finally {
    state.downloadingPhotos = false;
    render();
  }
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
      // qualunque errore qui dentro (rete, permessi Firebase mal
      // configurati, ecc.) deve far ripiegare in modalità locale — senza
      // questo try/catch un errore nella callback di onAuthStateChanged
      // lascerebbe la promise sospesa per sempre e il gioco bloccato su una
      // schermata bianca invece che su una rete di sicurezza funzionante.
      await new Promise((resolve, reject) => {
        fb.onAuthStateChanged(fb.auth, async user => {
          try {
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
            // molto più leggera — vedi sopra). Non parte qui: si attiva al volo
            // la prima volta che si entra davvero nel pannello sposi (vedi
            // ensureAdminMissionsSub(), richiamata da renderAdmin()), cosi'
            // funziona sia arrivandoci con l'indirizzo #sposi sia con la
            // scorciatoia dal profilo — che imposta l'indirizzo solo dopo.
            resolve();
          } catch (err) {
            reject(err);
          }
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
  else if (location.hash === '#code') state.screen = 'code';
  else state.screen = state.name ? 'hub' : 'join';
  try { history.replaceState({ screen: state.screen }, '', '#' + (state.screen === 'admin' ? 'sposi' : state.screen)); } catch {}
  render();
}

// il tasto "indietro" del telefono ripercorre le schermate visitate, invece
// di uscire dall'app: ogni cambio di schermata e' una voce di history (vedi
// pushScreen), qui la recuperiamo quando l'utente torna indietro (o avanti).
// Se pero' c'e' un overlay aperto (lightbox/modale "mostra tutti"/dialog),
// il back chiude solo quello (il piu' recente) e basta — vedi
// pushOverlayHistory/closeOverlayHistory piu' sopra. Il back su un dialog
// di conferma equivale sempre ad "Annulla": non esegue mai onConfirm.
window.addEventListener('popstate', e => {
  if (suppressNextPopstate){ suppressNextPopstate = false; return; }
  if (state.dialog){ state.dialog = null; overlayHistoryDepth--; render(); return; }
  if (state.lightbox != null){ state.lightbox = null; overlayHistoryDepth--; restoreScroll(); render(); return; }
  if (state.adminModal){ state.adminModal = null; overlayHistoryDepth--; restoreScroll(); render(); return; }
  state.screen = (e.state && e.state.screen) || (state.name ? 'hub' : 'join');
  render();
});

boot();
