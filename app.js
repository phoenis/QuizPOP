import { firebaseConfig } from './firebase-config.js?v=1';

/* ============ Dati del gioco (copia dal design di riferimento) ============ */
// NB: le 4 domande "Su Mara" sono un placeholder da rivedere con Mara prima del matrimonio.
const QS = [
  {k:'Su Mara', h:'Chi la conosce bene, lo sa.', t:'Qual è la cosa che Mara ama di più di Stefano?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},
  {k:'Su Mara', h:'Una questione di gusto.', t:'Qual è il piatto preferito di Mara?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},
  {k:'Su Mara', h:'Un giorno tutto suo.', t:'Se Mara potesse scegliere una sola cosa da fare per un’intera giornata libera, cosa sceglierebbe?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},
  {k:'Su Mara', h:'Un talento che ammette volentieri.', t:'Qual è la cosa che Mara pensa Stefano faccia meglio di lei?', o:['Da completare 1','Da completare 2','Da completare 3','Da completare 4'], c:0, s:'Placeholder — sostituire con la risposta vera prima del matrimonio.'},

  {k:'Su Stefano', h:'Chi lo conosce bene, lo sa.', t:'Qual è la cosa che Stefano ama di più di Mara?', o:['Quando ride socchiudendo gli occhi e alzando le guanciotte','Quando si emoziona per le piccole cose e diventa incontenibile','Quando si concentra su qualcosa e fa una faccia serissima senza accorgersi','Quando racconta qualcosa che la appassiona e inizia a parlare velocissimo'], c:0, s:'Quando ride socchiudendo gli occhi e alzando le guanciotte: questo conquista Stefano.'},
  {k:'Su Stefano', h:'Una questione di gusto.', t:'Qual è il piatto preferito di Stefano?', o:['Risotto ai funghi','Zucca','Risotto','Formaggio'], c:3, s:'Il formaggio, sempre e comunque.'},
  {k:'Su Stefano', h:'Un giorno tutto suo.', t:'Se Stefano potesse scegliere una sola cosa da fare per un’intera giornata libera, cosa sceglierebbe?', o:['Trekking','Giocare in famiglia','Collezionare bilance rare','Giocare con gli amici'], c:1, s:'Giocare in famiglia: la sua giornata ideale.'},
  {k:'Su Stefano', h:'Un talento che ammette volentieri.', t:'Qual è la cosa che Stefano pensa Mara faccia meglio di lui?', o:['La lavatrice','La lavastoviglie','Organizzare le vacanze','Giocare'], c:2, s:'Organizzare le vacanze: qui Mara vince senza discussione.'},

  {k:'Come è iniziata', h:'Si parte dall’inizio: quella sera, quegli amici.', t:'Come si sono conosciuti Mara e Stefano?', o:['Su un’app','Tramite amici in comune','Al lavoro','In palestra'], c:1, s:'Amici in comune: la cugina di Mara è amica di un amico di Stefano. Una catena che nessuno ricorda bene.'},
  {k:'Ordina le tappe', h:'Quattro momenti, un ordine giusto.', t:'Metti in ordine i primi quattro mesi.', order:['La cena in cui si conoscono','Il primo messaggio','Il primo appuntamento','Il primo viaggio insieme'], shown:[1,3,0,2], s:'Cena, messaggio (tre settimane dopo), appuntamento, viaggio.'},
  {k:'Indovina la foto', h:'Guarda bene lo sfondo.', t:'Dove è stata scattata la loro prima foto insieme?', o:['A una cena di amici','A Oporto','Alla sagra del pesce','Al mare'], c:0, photo:true, photoSrc:'assets/photos/card-04.jpg', s:'La cena in cui li hanno presentati. Sono ai due estremi del tavolo.'},
  {k:'Sfida a coppie', h:'Facile. Troppo facile?', t:'Come si chiama il gatto che si sono presi insieme?', o:['Pepe','Ravioli','Nuvola','Gino'], c:1, pair:true, s:'Ravioli. Il nome era di Mara, il gatto ha scelto Stefano.'},

  {k:'Ordina le tappe', h:'L’anno del matrimonio, in fila.', t:'Ordina l’anno del matrimonio.', order:['La proposta','La scelta della sala','Le prove dell’abito','Oggi'], shown:[2,0,3,1], s:'Proposta, sala, abito, oggi. In mezzo undici inviti stampati due volte.'},
  {k:'Chi ha detto cosa', h:'Detta da uno dei due. O da tutti e due.', t:'«Il vestito lo scelgo io, tu occupati della musica.»', o:['Mara','Stefano','Entrambi, insieme'], c:2, s:'Detto da entrambi, nello stesso momento, a due persone diverse.'},
  {k:'L’ultima carta', h:'Chiudiamo con i conti.', t:'Quanti anni sono passati da quella cena a oggi?', o:['4','5','7','10'], c:2, s:'Sette anni, due traslochi, un gatto e una cugina che si prende tutto il merito.'},
  {k:'Su Stefano', h:'La mattina dopo.', t:'Secondo Stefano, cosa farà Mara per prima il giorno dopo il matrimonio?', o:['Farà all’ammmore con suo marito','Farà un’abbondante colazione','Dormirà','Si sveglierà presto'], c:2, s:'Dormirà. Il resto può aspettare.'}
];
const BASE_PTS = 60, BONUS_PTS = 40, DAILY = 9, TIMER_S = 20;
// categorie da 4 domande: una medaglia se le indovini tutte, chiusa per sempre se ne sbagli anche una
const CATS = [
  {name:'Mara', from:0, to:3, mark:'❖', medal:'Esperta di Mara', note:'Tutte e quattro su di lei'},
  {name:'Stefano', from:4, to:7, mark:'✤', medal:'Esperto di Stefano', note:'Tutte e quattro su di lui'},
  {name:'La loro vita insieme', from:8, to:11, mark:'✱', medal:'Casa nostra', note:'Tutte e quattro sulla vita insieme'},
  {name:'La giornata di oggi', from:12, to:15, mark:'✾', medal:'Il giorno del sì', note:'Tutte e quattro sul matrimonio'},
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
  {id:'demo-1', name:'Zia Franca', score:1042, res:demoRes(15,3.1), team:1},
  {id:'demo-2', name:'Testimone Andrea', score:918, res:demoRes(14,4.4), team:2},
  {id:'demo-3', name:'Chiara & Davide', score:770, res:demoRes(13,6.0), team:0},
  {id:'demo-4', name:'Nonna Rosa', score:661, res:demoRes(12,9.2), team:3},
  {id:'demo-5', name:'Luca T.', score:534, res:demoRes(10,5.7), team:4},
  {id:'demo-6', name:'Cugino Pietro', score:288, res:demoRes(6,0), team:2}
];
function demoRes(n, avg){ const r={}; for(let i=0;i<n;i++) r[i]={pts:60,bonus:20,correct:true,used:avg||5,multi:1}; return r; }

const KIND_LABELS = ['Vero o falso','Chi ha detto cosa','Foto','Ordina','A coppie','Del giorno'];

// TODO: incolla qui il link del vostro album condiviso (Google Foto, Dropbox...) quando c'è.
const ALBUM_URL = '';

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
const numIt = n => (n||0).toFixed(1).replace('.', ',');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'g-' + Math.random().toString(36).slice(2) + Date.now());

/* ============ Stato ============ */
const state = {
  screen: 'boot',
  name: '', team: 1,
  sel: null,
  qi: 0, left: 0, locked: false, seq: [],
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
};
let tickHandle = null;
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
    guestId: state.guestId, name: state.name, team: state.team,
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
  if (state.mode === 'online' && fb && state.guestId) {
    const ref = fb.doc(fb.db, 'players', state.guestId);
    await fb.setDoc(ref, {
      name: state.name, team: state.team, sel: state.sel,
      res: state.res, score: state.score, order: state.order,
      missions: state.missions, updatedAt: fb.serverTimestamp(),
    }, { merge: true });
  } else {
    saveLocalProfile();
  }
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
function dur(){ return TIMER_S; }

function finish(idx){
  const q = Q(state.qi);
  const correct = q.order
    ? (idx === 'order' && state.seq.length === q.order.length && state.seq.every((v, i) => v === i))
    : (idx !== null && idx === q.c);
  const multi = state.qi === DAILY ? 2 : 1;
  const bonus = correct ? Math.round(BONUS_PTS * (state.left / dur())) : 0;
  const pts = correct ? (BASE_PTS + bonus) * multi : 0;
  state.res[state.qi] = { pts, bonus, correct, used: Math.max(0.1, dur() - state.left), multi, timeout: idx === null };
  state.score += pts;
  state.locked = true;
  state.screen = 'result';
  // sempre in continuazione della sessione di domande aperta con flip(): non
  // apre una nuova voce di history, altrimenti "indietro" potrebbe tornare a
  // rivedere una domanda già risposta (vedi nota su flip()).
  replaceScreen('result');
  persistProgress();
}

function tick(){
  state.left = Math.max(0, state.left - 0.1);
  if (state.left <= 0){
    clearInterval(tickHandle); tickHandle = null;
    finish(null);
    render();
  }
}

function flip(){
  if (state.revealed) return;
  const i = state.sel;
  if (i === undefined || i === null || state.res[i]) return;
  clearInterval(tickHandle);
  // apre una nuova voce di history solo se si entra "da fuori" (dalla
  // schermata categorie): il resto della sessione (domanda dopo domanda,
  // fino a che la categoria non e' finita) sovrascrive quella stessa voce,
  // cosi' l'indietro esce dall'intera sessione invece di ripercorrere le
  // domande gia' risposte una per una.
  const continuing = state.screen === 'quiz' || state.screen === 'result';
  state.screen = 'quiz'; state.qi = i; state.left = dur(); state.locked = false; state.seq = [];
  if (continuing) replaceScreen('quiz'); else pushScreen('quiz');
  tickHandle = setInterval(tick, 100);
  render();
}
function pick(idx){
  if (state.locked) return;
  clearInterval(tickHandle); tickHandle = null;
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
  clearInterval(tickHandle); tickHandle = null;
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
  // categoria finita: torna alla schermata categorie (o al finale se non
  // resta nessuna domanda da nessuna parte), sovrascrivendo la sessione
  // appena conclusa cosi' non resta raggiungibile all'indietro.
  const nx = nextOpen(state.res, posOf(state.qi) + 1);
  state.sel = nx === null ? state.qi : nx;
  clearInterval(tickHandle); tickHandle = null;
  state.screen = nx === null ? 'finale' : 'home';
  replaceScreen(state.screen);
  render();
}

function allPlayersWithMe(){
  const board = state.players.length ? state.players.slice() : RIVALS_DEMO.slice();
  const mine = { id: state.guestId, name: state.name || 'Tu', team: state.team, score: state.score, me: true,
    detail: Object.keys(state.res).length + ' carte su ' + allQuestions().length };
  const already = board.some(p => p.id === state.guestId);
  return already
    ? board.map(p => p.id === state.guestId ? { ...p, ...mine } : p)
    : [...board, mine];
}

function ranked(){
  return allPlayersWithMe().sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1, initials: initialsOf(p.name || 'Tu') }));
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
    case 'home': html = renderHome(); break;
    case 'quiz': html = renderQuiz(); break;
    case 'result': html = renderResult(); break;
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
    <div class="rule sm"></div>
    <p style="font-size:14px;color:var(--neutral-700)">Un attimo…</p>
  </div>`;
}

function renderJoin(){
  const chips = TEAMS.map((t, i) => `<button class="chip ${state.team===i?'on':''}" data-action="pick-team" data-team="${i}">${esc(t)}</button>`).join('');
  return `<div class="screen screen-join">
    <div class="kicker">Il gioco</div>
    <h1 class="join-title couple-title">Mara<span class="amp-line amp">&amp;</span>Stefano</h1>
    <div class="kicker neutral join-sub">16 ottobre 2026 · Villa Calini</div>
    <hr class="rule">
    <p class="join-intro pretty">Sedici domande su di noi, in un calendario. Rispondi quando vuoi e nell’ordine che vuoi — la classifica resta chiusa fino ai discorsi.</p>
    <div class="field-block">
      <div class="field-label">Come ti chiamiamo noi</div>
      <input id="name-input" class="name-input" type="text" placeholder="Zia Franca" value="${esc(state.name)}" maxlength="40">
    </div>
    <div class="field-block">
      <div class="field-label">Da che parte stai</div>
      <div class="chips">${chips}</div>
    </div>
    <div class="join-spacer"></div>
    <button class="btn-outline block" data-action="join" style="margin-top:14px;">Comincia</button>
    <p class="fine-print">Niente codici, niente password. La squadra serve solo per le statistiche finali.</p>
  </div>`;
}

/* <p class="hub-welcome pretty">Benvenuta, <em>${esc(state.name || 'Zia Franca')}</em>. Tutto quello che serve oggi è qui dentro.</p>
 */

function renderHub(){
  ensureOrder();
  const total = allQuestions().length;
  const done = Object.keys(state.res).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return `<div class="screen screen-hub">
    ${avatarButton()}
    <div class="hub-hero">
      <img src="${esc(state.heroPhoto || 'assets/photos/hub-hero.jpg')}" alt="" onerror="this.remove()">
      <div class="fade"></div>
      <div class="cap">
        <div class="kicker">16 ottobre 2026 · Villa Calini</div>
        <div class="names couple-title">Mara <span class="amp">&amp;</span> Stefano</div>
      </div>
    </div>
    <div class="hub-body">
      
      <button class="hub-quiz-card" data-action="go" data-screen="home">
        <span style="flex:1;min-width:0;">
          <span class="kicker">Il gioco</span>
          <span class="title serif">Il quiz su di noi</span>
          <span class="sub">Scala la classifica e vinci un premio!</span>
          <span class="hub-progress">
            <span class="bar"><span style="width:${pct}%;"></span></span>
            <span class="frac tabular">${done}/${total}</span>
          </span>
        </span>
        <img src="assets/mascotte/cricetino-fiore-solo.png" alt="">
      </button>

      <div class="hub-tiles">
        <button class="hub-tile" data-action="go" data-screen="missione">
          <span class="kicker">Missione speciale</span>
          <span class="title serif">Scopri la tua<br>missione</span>
          <span class="foot">${(() => {
            const last = state.missions[state.missions.length - 1];
            return !last ? 'Tocca per scoprirla' : (last.done ? 'Fatta! Ne vuoi un\'altra?' : 'Ce l\'hai già');
          })()}</span>
        </button>
        <button class="hub-tile" data-action="open-album">
          <span class="kicker">Album condiviso</span>
          <span class="title serif">Carica le<br>tue foto</span>
          <span class="foot">WedShoots ↗</span>
        </button>
      </div>
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
    body = `<h1 class="mission-text pretty">${esc(MISSIONS[cur.index])}</h1>
      <p class="fine-print">Finché ce ne sono di libere, nessun altro invitato ce l'ha uguale.</p>
      <input id="mission-file" type="file" accept="image/*" capture="environment" style="display:none;">
      <button class="btn-outline block" style="margin-top:20px;" data-action="mission-photo-pick">Carica la foto e completa</button>
      <button class="btn-text" style="margin-top:12px;" data-action="skip-mission">Non mi piace, cambiala</button>`;
  } else if (!list.length){
    body = `<h1 style="font-size:26px;">Hai una missione fotografica ad aspettarti</h1>
      <p class="pretty" style="font-size:14px;line-height:1.6;color:var(--neutral-800);">Ne esce una a sorpresa, diversa da quella di chiunque altro stia giocando (finché ce ne sono di libere).</p>
      <button class="btn-outline block" style="margin-top:20px;" data-action="reveal-mission">Scopri la tua missione</button>`;
  } else {
    body = `<h1 style="font-size:24px;">Missione completata!</h1>
      <p class="pretty" style="font-size:14px;line-height:1.6;color:var(--neutral-800);">Se vuoi puoi farne un'altra, oppure fermarti qui.</p>
      <button class="btn-outline block" style="margin-top:16px;" data-action="reveal-mission">Fai un'altra missione</button>`;
  }

  const history = done.length ? `
    <div class="section-title" style="text-align:center;">Le tue missioni fatte</div>
    <div class="mission-history">
      ${done.slice().reverse().map(m => `
        <div class="mission-history-row">
          ${state.missionPhotos[m.index] ? `<img src="${esc(state.missionPhotos[m.index])}" alt="" class="mission-history-thumb">` : ''}
          <span>${esc(MISSIONS[m.index])}</span>
        </div>`).join('')}
    </div>` : '';

  return `<div class="screen screen-missione">
    <button class="btn-text" data-action="nav-back">← Torna alla home</button>
    <div class="mission-wrap">
      <div class="mission-glyph">📸</div>
      <div class="kicker">Missione speciale</div>
      ${body}
    </div>
    ${history}
  </div>`;
}

function renderHome(){
  if (state.revealed){
    return `<div class="screen screen-home">
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

  // ogni categoria e' una riga cliccabile con l'anello di percentuale
  // (quante ne hai fatte, non quante giuste: quello resta nelle medaglie).
  const catRow = (icon, name, sub, catQs, extraClass) => {
    const doneN = catQs.filter(qi => state.res[qi]).length;
    const pct = catQs.length ? Math.round((doneN / catQs.length) * 100) : 0;
    const target = catQs.find(qi => !state.res[qi]) ?? catQs[0];
    return `<button class="cat-row ${extraClass||''}" data-action="flip-to" data-i="${target}">
      <span class="cat-row-icon">${icon}</span>
      <span class="cat-row-info">
        <span class="cat-row-name serif">${esc(name)}</span>
        <span class="cat-row-sub">${esc(sub)}</span>
      </span>
      <span class="cat-row-ring" style="--pct:${pct};"><span class="cat-row-pct tabular">${pct}%</span></span>
    </button>`;
  };
  const catCards = CATS.map((c, idx) => {
    const st = catState(state.res, c);
    const catQs = state.order.filter(qi => catOf(qi) === idx);
    const sub = st.earned ? st.n + ' domande · ' + c.medal : st.n + ' domande';
    return catRow(c.mark, c.name, sub, catQs, st.earned ? 'earned' : '');
  }).join('');
  const extraQs = state.order.filter(qi => catOf(qi) < 0);
  const extraCard = extraQs.length ? catRow('✦', 'Domande extra', extraQs.length + ' domande · pubblicate dagli sposi', extraQs) : '';

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
    const label = (cat ? cat.name + ' · ' : '') + 'domanda ' + (posOf(sel) + 1) + (sel === DAILY ? ' · vale doppio' : '');
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
    <button class="back-fab" data-action="nav-back">←</button>
    ${avatarButton()}
    <div class="home-header">
      <div>
        <div class="kicker">${remaining > 0 ? 'Ne restano ' + remaining : 'Tutte fatte'}</div>
        <h1 style="font-size:30px;">Le domande</h1>
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
    const rows = q.shown.map(i => {
      const picked = state.seq.includes(i);
      const pos = state.seq.indexOf(i) >= 0 ? String(state.seq.indexOf(i) + 1) : '·';
      return `<button class="option-row ${picked?'picked':''}" data-action="toggle-order" data-i="${i}">
        <span class="pos serif tabular">${pos}</span><span class="label">${esc(q.order[i])}</span>
      </button>`;
    }).join('');
    const incomplete = state.seq.length !== q.order.length;
    return `<p class="order-helper">Tocca nell’ordine giusto, dal primo all’ultimo.</p>
      ${rows}
      <button class="btn-outline block" style="margin-top:20px;" data-action="confirm-order" ${incomplete?'disabled':''}>Conferma l’ordine</button>
      <button class="btn-text" style="margin-top:10px;" data-action="reset-order">Ricomincia da capo</button>`;
  }
  let extra = '';
  if (q.pair){
    extra = `<p class="pair-note">Sfida a coppie con <em>Testimone Andrea</em> — punti solo se indovinate entrambi.</p>`;
  }
  return renderOptions(q) + extra;
}

function renderOptions(q){
  const letters = 'ABCD';
  return (q.o || []).map((t, i) => `<button class="option-row" data-action="pick-option" data-idx="${i}">
    <span class="letter">${letters[i]}</span><span class="label">${esc(t)}</span>
  </button>`).join('');
}

function renderQuiz(){
  const q = Q(state.qi);
  return `<div class="screen screen-quiz">
    <div class="quiz-topbar">
      <button class="btn-text" data-action="nav-back">Torna alle domande</button>
      <span class="counter">Domanda ${posOf(state.qi) + 1} di ${allQuestions().length}</span>
    </div>
    <div class="kicker" style="margin-top:14px;">${esc(q.k)}</div>
    <h2 class="quiz-q pretty">${esc(q.t)}</h2>
    <hr class="rule sm">
    ${renderQuizBody(q)}
    <div class="quiz-footer">Conta anche quanto ci metti. Te lo diciamo dopo.</div>
  </div>`;
}

function renderResult(){
  const q = Q(state.qi);
  const r = state.res[state.qi] || {};
  const board = ranked();
  const mine = board.find(p => p.me);
  const locked = !state.revealed;
  const kicker = r.correct ? 'Risposta giusta' : (r.timeout ? 'Tempo scaduto' : 'Risposta sbagliata');
  const title = r.correct ? `Giusta in ${numIt(r.used)}s` : (r.timeout ? 'Carta scaduta' : 'Non era questa');
  const ink = r.correct ? 'var(--accent-600)' : 'var(--neutral-600)';
  const rankLine = locked
    ? 'La busta resta chiusa fino ai discorsi: nessuno sa come sta andando, nemmeno tu.'
    : (mine ? `Sei ${mine.rank}º su ${board.length} in questo momento.` : '');
  const cta = nextOpen(state.res, posOf(state.qi) + 1) !== null ? 'Prossima domanda' : 'Vedi il finale';
  const myCat = CATS[catOf(state.qi)];
  const myCatSt = myCat ? catState(state.res, myCat) : null;
  const medalWon = !!(r.correct && myCatSt && myCatSt.earned);
  return `<div class="screen screen-result">
    <div class="kicker result-kicker">${kicker}</div>
    <div class="result-pts serif tabular" style="color:${ink}">${r.pts ? '+' + r.pts : '0'}</div>
    ${r.correct ? `<img src="assets/mascotte/cricetino-fiore-solo.png" alt="" class="result-mascot">` : ''}
    <h2 class="result-title">${esc(title)}</h2>
    <hr class="rule sm">
    <p class="result-blurb pretty">${esc(q.s)}</p>
    ${medalWon ? `<div class="medal-won">
      <span class="medal-mark">${esc(myCat.mark)}</span>
      <span class="medal-text">
        <span class="kicker">Medaglia vinta</span>
        <span class="medal-name serif">${esc(myCat.medal)}</span>
        <span class="medal-note">${esc(myCat.note)}</span>
      </span>
    </div>` : ''}
    <div class="breakdown">
      <div class="breakdown-row"><span>${r.correct ? 'Risposta giusta' : 'Risposta'}</span><span class="val tabular">${r.correct ? '+' + BASE_PTS : '0'}</span></div>
      <div class="breakdown-row"><span>Velocità${r.used ? ' · ' + numIt(r.used) + 's' : ''}</span><span class="val tabular" style="color:var(--accent-700)">${r.correct ? '+' + r.bonus : '—'}</span></div>
      ${r.multi === 2 ? `<div class="breakdown-row"><span>Domanda del giorno</span><span class="val tabular">×2</span></div>` : ''}
      <div class="breakdown-row total"><span>Totale</span><span class="val tabular">${r.pts || 0}</span></div>
    </div>
    <p class="rank-line">${esc(rankLine)}</p>
    <div class="result-spacer"></div>
    <div class="result-cta">
      <button class="btn-outline block" data-action="after-result">${cta}</button>
      <button class="btn-text" data-action="nav-back" style="align-self:center;">Basta per ora, torno dopo</button>
    </div>
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
      <div class="avatar">${esc(initialsOf(p.name || 'Tu'))}</div>
      <div><div class="board-name">${esc(p.name)}</div><div class="board-detail">${esc((p.detail||'').split('·')[0].trim())}</div></div>
      <div class="board-score">•••</div>
    </div>`).join('');
    const teamRows = teams.map(g => `<div class="board-row ${g.i===state.team?'me':''}">
      <div><div class="board-name">${esc(g.label)}</div><div class="board-detail">${g.count} ${personaLabel(g.count)}</div></div>
      <div class="board-score">•••</div>
    </div>`).join('');
    return `<div class="screen screen-board">
      ${avatarButton()}
      <div class="kicker">${board.length} invitati · punti nascosti</div>
      <h1 class="board-title">Classifica</h1>
      <hr class="rule sm" style="margin-left:0;">
      <p class="board-explainer pretty">Nessuno vede i punti degli altri. La busta si apre quando Mara e Stefano prendono il microfono.</p>
      <div style="margin-top:8px;">${rows}</div>
      <div class="you-box">
        <div class="micro">Quello che puoi vedere</div>
        <div class="big serif tabular">${state.score} punti tuoi</div>
        <div class="board-detail" style="margin-top:6px;">${done ? 'Media ' + numIt(avg) + 's su ' + done + ' carte' : 'Nessuna carta girata'}</div>
      </div>
      <div class="section-title">Squadre</div>
      <p class="rank-line" style="margin-top:0;">Media punti a persona, nascosta come il resto fino al reveal.</p>
      <div style="margin-top:8px;">${teamRows}</div>
    </div>`;
  }
  const rows = board.map(p => `<div class="board-row ${p.me?'me':''}">
    <div class="board-rank serif tabular">${p.rank}</div>
    <div><div class="board-name">${esc(p.name)}</div><div class="board-detail">${esc(p.detail||'')}</div></div>
    <div class="board-score open serif tabular">${p.score}</div>
  </div>`).join('');
  const teamsRanked = teams.slice().sort((a, b) => b.avg - a.avg).map((g, i) => ({ ...g, rank: i + 1 }));
  const teamRows = teamsRanked.map(g => `<div class="board-row ${g.i===state.team?'me':''}">
    <div class="board-rank serif tabular">${g.rank}</div>
    <div><div class="board-name">${esc(g.label)}</div><div class="board-detail">${g.count} ${personaLabel(g.count)}</div></div>
    <div class="board-score open serif tabular">${Math.round(g.avg)}</div>
  </div>`).join('');
  return `<div class="screen screen-board">
    ${avatarButton()}
    <div class="kicker">${board.length} invitati · busta aperta</div>
    <h1 class="board-title">Classifica</h1>
    <hr class="rule sm" style="margin-left:0;">
    <div style="margin-top:8px;">${rows}</div>
    <div class="board-footer">A parità di punti vince chi ha risposto più in fretta.</div>
    <div class="section-title">Squadre</div>
    <p class="rank-line" style="margin-top:0;">Media punti a persona: ogni squadra pesa allo stesso modo, indipendentemente da quanti sono.</p>
    <div style="margin-top:8px;">${teamRows}</div>
  </div>`;
}

function renderProfile(){
  const done = Object.keys(state.res).length;
  const total = allQuestions().length;
  const times = Object.values(state.res).map(x => x.used);
  const avg = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  const best = Object.values(state.res).filter(x => x.correct).sort((a, b) => a.used - b.used)[0];
  const name = state.name || 'Zia Franca';
  const badges = [
    ...CATS.map(c => {
      const st = catState(state.res, c);
      return {
        mark: c.mark, name: c.medal,
        note: st.earned ? c.note : (st.failed ? 'Categoria chiusa: ' + st.right + '/' + st.n + ' giuste' : c.name + ' · ' + st.right + '/' + st.n + ' giuste'),
        locked: !st.earned,
      };
    }),
    { mark: '✦', name: 'Fulmine', note: best ? 'Più veloce: ' + numIt(best.used) + 's' : 'Rispondi sotto i 4 secondi', locked: !best || best.used > 4 },
    { mark: '✧', name: 'Domanda del giorno', note: 'Hai aperto la domanda del giorno', locked: !state.res[DAILY] },
    { mark: '✷', name: 'Calendario completo', note: 'Tutte le carte del mazzo', locked: done < total },
  ];
  const badgeRows = badges.map(b => `<div class="badge-row ${b.locked?'locked':''}">
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
  return `<div class="screen screen-profile">
    ${avatarButton()}
    <div class="avatar lg" style="margin:0 auto;">${initialsOf(name)}</div>
    <h1 class="profile-name">${esc(name)}</h1>
    <div class="profile-team">${esc(TEAMS[state.team])} · tavolo 4</div>
    <div class="stat-strip">
      <div class="stat-cell"><div class="v serif tabular">${state.score}</div><div class="c">Punti</div></div>
      <div class="stat-cell"><div class="v serif tabular">${done}/${total}</div><div class="c">Carte</div></div>
      <div class="stat-cell"><div class="v serif tabular">${done?numIt(avg)+'s':'—'}</div><div class="c">Media</div></div>
    </div>
    <div class="section-title">Medaglie</div>
    ${badgeRows}
    <div class="section-title">Le tue risposte</div>
    ${answers || `<div class="empty-note">Ancora niente. Gira la prima carta.</div>`}
  </div>`;
}

function renderFinale(){
  const board = ranked();
  const mine = board.find(p => p.me);
  const podium = board.slice(0, 3).map(p => ({
    ...p,
    h: p.rank === 1 ? 112 : p.rank === 2 ? 84 : 64,
    fill: p.rank === 1 ? 'var(--accent-600)' : 'transparent',
    ink: p.rank === 1 ? '#fdf6e4' : '#3a2f22',
  }));
  const order = [1, 0, 2].filter(i => podium[i]);
  const cols = order.map(i => {
    const p = podium[i];
    return `<div class="podium-col">
      <div class="avatar" style="border-color:var(--accent-500);color:var(--accent-700);">${esc(p.initials)}</div>
      <div class="podium-pname">${esc(p.name)}</div>
      <div class="podium-block serif" style="height:${p.h}px;background:${p.fill};color:${p.ink}">
        <div class="score tabular">${p.score}</div>
        <div class="rk">${p.rank}º</div>
      </div>
    </div>`;
  }).join('');
  const note = mine && mine.rank <= 3 ? 'Premio in arrivo insieme alla torta.' : 'Il podio era vicino. Colpa del cugino Pietro.';
  return `<div class="screen screen-finale">
    <div class="kicker">16 ottobre, 23:10 · si apre la busta</div>
    <h1 class="finale-title">Chi conosce<br><span class="amp">Mara & Stefano</span></h1>
    <hr class="rule sm">
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
  const playerRows = state.players.map(p => {
    const done = Object.keys(p.res || {}).length;
    return `<div class="admin-card-row">
      <div style="flex:1;overflow:hidden;">
        <div class="tt">${esc(p.name || 'Senza nome')}</div>
        <div class="kk">${esc(TEAMS[p.team] || '')} · ${done}/${totalCards} carte · ${p.score || 0} punti</div>
      </div>
      <button class="reset-btn" data-action="reset-player-answers" data-id="${esc(p.id)}">Azzera</button>
    </div>`;
  }).join('');
  return `<div class="screen screen-admin">
    <div class="kicker">Solo per gli sposi</div>
    <h2 class="admin-title couple-title" style="text-align:left;">Mara <span class="amp">&amp;</span> Stefano</h2>
    <hr class="rule sm" style="margin-left:0;">
    <div class="admin-stats">
      <div class="stat-cell"><div class="v serif tabular">${totalPlayers}</div><div class="c">Giocano</div></div>
      <div class="stat-cell"><div class="v serif tabular">${totalCards}</div><div class="c">Domande</div></div>
      <div class="stat-cell"><div class="v serif tabular">${pct}%</div><div class="c">Completate</div></div>
    </div>
    <div class="envelope-box">
      <div class="micro">La busta</div>
      <div class="big serif">${state.revealed ? 'Aperta a tutti' : 'Chiusa a tutti'}</div>
      ${state.revealed
        ? `<button class="btn-outline" data-action="close-board">Riapri il gioco</button>`
        : `<button class="btn-dark" data-action="open-board">Apri il reveal adesso</button>`}
    </div>
    <div class="section-title" style="color:rgba(247,236,214,.6);">Foto di copertina</div>
    <div class="hero-upload-box">
      ${state.heroPhoto ? `<img src="${esc(state.heroPhoto)}" alt="" class="hero-upload-preview">` : `<div class="hero-upload-empty">Nessuna foto caricata</div>`}
      <input id="admin-hero-file" type="file" accept="image/*" style="display:none;">
      <div class="hero-upload-actions">
        <button class="reset-btn" data-action="admin-hero-pick">${state.heroPhoto ? 'Cambia foto' : 'Carica foto'}</button>
        ${state.heroPhoto ? `<button class="reset-btn" data-action="admin-hero-remove">Rimuovi</button>` : ''}
      </div>
    </div>
    ${state.mode === 'online' ? `<div class="section-title" style="color:rgba(247,236,214,.6);">Invitati</div>
    ${playerRows || `<p class="fine-print" style="color:rgba(247,236,214,.6);">Nessuno ha ancora giocato.</p>`}` : ''}
    <div class="section-title" style="color:rgba(247,236,214,.6);">Le domande</div>
    ${items}
    <div class="section-title" style="color:rgba(247,236,214,.6);">Nuova domanda</div>
    <div class="type-chips">${typeChips}</div>
    <input id="admin-q" class="admin-input" type="text" placeholder="Scrivi la domanda…" value="${esc(state.newCardQ)}">
    <input id="admin-a" class="admin-input" type="text" placeholder="Risposta giusta" value="${esc(state.newCardA)}">
    <button class="btn-dark" style="margin-top:20px;" data-action="admin-publish">Pubblica agli invitati</button>
  </div>`;
}

// unica scorciatoia globale rimasta dopo aver tolto la tabbar: le iniziali
// dell'invitato in alto a destra aprono il profilo; da dentro il profilo lo
// stesso posto mostra una "×" per tornare a dove si era prima.
function avatarButton(){
  if (state.screen === 'profile') return `<button class="avatar-fab" data-action="nav-back">×</button>`;
  return `<button class="avatar-fab" data-action="go" data-screen="profile">${esc(initialsOf(state.name || 'Tu'))}</button>`;
}

/* ============ Interazione ============ */
root.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  switch (action){
    case 'pick-team': state.team = +el.dataset.team; render(); break;
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
    case 'open-album': {
      if (ALBUM_URL) window.open(ALBUM_URL, '_blank');
      else alert('Il link dell\'album non è ancora stato impostato (ALBUM_URL in app.js).');
      break;
    }
    case 'reveal-mission': assignMission(); break;
    case 'mission-photo-pick': document.getElementById('mission-file').click(); break;
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
  if (e.target.id === 'mission-file' && e.target.files[0]) completeMission(e.target.files[0]);
});
root.addEventListener('input', e => {
  if (e.target.id === 'name-input') state.name = e.target.value;
  if (e.target.id === 'admin-q') state.newCardQ = e.target.value;
  if (e.target.id === 'admin-a') state.newCardA = e.target.value;
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
    alert('La foto è troppo pesante anche dopo la compressione: provane una più semplice.');
    return;
  }
  cur.done = true;
  state.missionPhotos = { ...state.missionPhotos, [cur.index]: dataUrl };
  render();
  if (state.mode === 'online' && fb){
    await fb.setDoc(fb.doc(fb.db, 'players', state.guestId), { missions: state.missions }, { merge: true });
    // foto in una collezione separata (non nel documento players): con più
    // missioni completate si supererebbe presto il limite di 1MB per
    // documento di Firestore se stessero tutte insieme a punteggio/risposte.
    await fb.setDoc(fb.doc(fb.db, 'missionPhotos', state.guestId + '_' + cur.index), {
      guestId: state.guestId, name: state.name, missionIndex: cur.index,
      photo: dataUrl, createdAt: fb.serverTimestamp(),
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
            state.name = d.name || ''; state.team = d.team ?? 1;
            state.sel = d.sel ?? null;
            state.res = d.res || {}; state.score = d.score || 0;
            state.order = d.order || [];
            state.missions = d.missions || [];
          }
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
            qs.docs.forEach(doc => { const d = doc.data(); map[d.missionIndex] = d.photo; });
            state.missionPhotos = map;
            render();
          });
          fb.onSnapshot(fb.doc(fb.db, 'meta', 'state'), doc => {
            const d = doc.exists() ? doc.data() : {};
            state.revealed = !!d.revealed;
            state.heroPhoto = d.heroPhoto || '';
            render();
          });
          fb.onSnapshot(fb.collection(fb.db, 'extraCards'), qs => {
            state.extraCards = qs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (ensureOrder() && state.name) persistProgress();
            render();
          });
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
      state.name = saved.name || ''; state.team = saved.team ?? 1;
      state.sel = saved.sel ?? null; state.res = saved.res || {}; state.score = saved.score || 0;
      state.order = saved.order || [];
      state.missions = saved.missions || [];
    }
    state.heroPhoto = localStorage.getItem('msquiz_hero_photo') || '';
    try { state.missionPhotos = JSON.parse(localStorage.getItem('msquiz_mission_photos') || '{}'); } catch { state.missionPhotos = {}; }
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
  clearInterval(tickHandle); tickHandle = null;
  state.screen = (e.state && e.state.screen) || (state.name ? 'hub' : 'join');
  render();
});

boot();
