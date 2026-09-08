import { firebaseConfig } from './firebase-config.js?v=1';

/* ============ Dati del gioco (copia dal design di riferimento) ============ */
const QS = [
  {k:'Come è iniziata', h:'Si parte dall’inizio: quella sera, quegli amici.', t:'Come si sono conosciuti Mara e Stefano?', o:['Su un’app','Tramite amici in comune','Al lavoro','In palestra'], c:1, s:'Amici in comune: la cugina di Mara è amica di un amico di Stefano. Una catena che nessuno ricorda bene.'},
  {k:'Vero o falso', h:'Una sola risposta, e non è quella che pensi.', t:'La prima volta si sono parlati per più di dieci minuti.', o:['Vero','Falso'], c:1, s:'Falso. Due frasi e un ciao, poi tre settimane di silenzio.'},
  {k:'Chi ha detto cosa', h:'Una frase vera, detta davvero. Da chi?', t:'«Chiedi tu il suo numero, io non me la sento.»', o:['Mara','Stefano','La cugina di Mara'], c:1, s:'Stefano, alla cugina di Mara, che ha fatto tutto lei.'},
  {k:'Indovina la foto', h:'Guarda bene lo sfondo.', t:'Dove è stata scattata la loro prima foto insieme?', o:['A una cena di amici','A Oporto','Alla sagra del pesce','Al mare'], c:0, photo:true, photoSrc:'assets/photos/card-04.jpg', s:'La cena in cui li hanno presentati. Sono ai due estremi del tavolo.'},
  {k:'Ordina le tappe', h:'Quattro momenti, un ordine giusto.', t:'Metti in ordine i primi quattro mesi.', order:['La cena in cui si conoscono','Il primo messaggio','Il primo appuntamento','Il primo viaggio insieme'], shown:[1,3,0,2], s:'Cena, messaggio (tre settimane dopo), appuntamento, viaggio.'},
  {k:'Messaggio vocale', h:'Sette secondi di voce. Alza il volume.', t:'Chi sta parlando in questo messaggio vocale?', o:['Mara','Stefano','La mamma di Mara','Il testimone'], c:2, audio:true, audioSrc:'assets/audio/card-06.mp3', s:'La mamma di Mara, il giorno della proposta. Urla più lei degli sposi.'},
  {k:'Numeri', h:'Una cifra sola. Fidati dell’istinto.', t:'Quanti mesi dal primo appuntamento alla convivenza?', o:['3','9','16','28'], c:1, s:'Nove mesi. Le scommesse degli amici dicevano ventotto.'},
  {k:'Sfida a coppie', h:'Punti solo se indovinate entrambi.', t:'Chi dei due ha detto per primo agli amici che era una cosa seria?', o:['Mara','Stefano'], c:0, pair:true, s:'Mara, a tutto il gruppo, in un messaggio scritto alle due di notte.'},
  {k:'Vero o falso', h:'Attenzione: qui si offende qualcuno.', t:'Stefano cucina meglio di Mara.', o:['Vero','Falso'], c:0, s:'Vero, e Mara lo ammette solo senza testimoni. Oggi ce ne sono ottanta.'},
  {k:'Indovina la foto', h:'Un viaggio, una città. Quale?', t:'In che città è stato questo viaggio?', o:['Napoli','Oporto','Berlino','Palermo'], c:1, photo:true, photoSrc:'assets/photos/card-10.jpg', s:'Oporto. Hanno litigato per una mappa di carta e non si sono parlati fino a cena.'},
  {k:'Ordina le tappe', h:'L’anno del matrimonio, in fila.', t:'Ordina l’anno del matrimonio.', order:['La proposta','La scelta della sala','Le prove dell’abito','Oggi'], shown:[2,0,3,1], s:'Proposta, sala, abito, oggi. In mezzo undici inviti stampati due volte.'},
  {k:'Chi ha detto cosa', h:'Detta da uno dei due. O da tutti e due.', t:'«Il vestito lo scelgo io, tu occupati della musica.»', o:['Mara','Stefano','Entrambi, insieme'], c:2, s:'Detto da entrambi, nello stesso momento, a due persone diverse.'},
  {k:'Messaggio vocale', h:'Una promessa del 2021. Mantenuta? No.', t:'Che cosa promette Stefano in questo vocale?', o:['Di non russare più','Di imparare a stirare','Di portarla a Oporto ogni anno','Di non toccare il termostato'], c:3, audio:true, audioSrc:'assets/audio/card-13.mp3', s:'Il termostato. Promessa infranta lo stesso inverno.'},
  {k:'Sfida a coppie', h:'Facile. Troppo facile?', t:'Come si chiama il gatto che si sono presi insieme?', o:['Pepe','Ravioli','Nuvola','Gino'], c:1, pair:true, s:'Ravioli. Il nome era di Mara, il gatto ha scelto Stefano.'},
  {k:'L’ultima carta', h:'Chiudiamo con i conti.', t:'Quanti anni sono passati da quella cena a oggi?', o:['4','5','7','10'], c:2, s:'Sette anni, due traslochi, un gatto e una cugina che si prende tutto il merito.'},
  {k:'Su Stefano', h:'Chi lo conosce bene, lo sa.', t:'Qual è la cosa che Stefano ama di più di Mara?', o:['Quando ride socchiudendo gli occhi e alzando le guanciotte','Quando si emoziona per le piccole cose e diventa incontenibile','Quando si concentra su qualcosa e fa una faccia serissima senza accorgersi','Quando racconta qualcosa che la appassiona e inizia a parlare velocissimo'], c:0, s:'Quando ride socchiudendo gli occhi e alzando le guanciotte: questo conquista Stefano.'},
  {k:'Su Stefano', h:'Una questione di gusto.', t:'Qual è il piatto preferito di Stefano?', o:['Risotto ai funghi','Zucca','Risotto','Formaggio'], c:3, s:'Il formaggio, sempre e comunque.'},
  {k:'Su Stefano', h:'Un giorno tutto suo.', t:'Se Stefano potesse scegliere una sola cosa da fare per un’intera giornata libera, cosa sceglierebbe?', o:['Trekking','Giocare in famiglia','Collezionare bilance rare','Giocare con gli amici'], c:1, s:'Giocare in famiglia: la sua giornata ideale.'},
  {k:'Su Stefano', h:'Un talento che ammette volentieri.', t:'Qual è la cosa che Stefano pensa Mara faccia meglio di lui?', o:['La lavatrice','La lavastoviglie','Organizzare le vacanze','Giocare'], c:2, s:'Organizzare le vacanze: qui Mara vince senza discussione.'},
  {k:'Su Stefano', h:'La mattina dopo.', t:'Secondo Stefano, cosa farà Mara per prima il giorno dopo il matrimonio?', o:['Farà all’ammmore con suo marito','Farà un’abbondante colazione','Dormirà','Si sveglierà presto'], c:2, s:'Dormirà. Il resto può aspettare.'}
];
const BASE_PTS = 60, BONUS_PTS = 40, DAILY = 4, TIMER_S = 20;
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

const KIND_LABELS = ['Vero o falso','Chi ha detto cosa','Foto','Ordina','Vocale','A coppie','Del giorno'];

/* ============ Utilità ============ */
const initialsOf = n => (n.split(/[\s&]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('') || 'T').toUpperCase();
const numIt = n => (n||0).toFixed(1).replace('.', ',');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'g-' + Math.random().toString(36).slice(2) + Date.now());

/* ============ Stato ============ */
const state = {
  screen: 'boot',
  name: '', team: 1,
  deck: QS.map((_, i) => i),
  qi: 0, left: 0, locked: false, seq: [],
  res: {}, score: 0,
  revealed: false,
  players: [],
  extraCards: [],
  mode: 'local',
  guestId: null,
  newCardType: 0, newCardQ: '', newCardA: '',
};
let tickHandle = null;
let fb = null; // firebase handles when online

function allQuestions(){ return QS.concat(state.extraCards); }
function Q(i){ return allQuestions()[i]; }

/* ============ Persistenza locale ============ */
function loadLocalProfile(){
  try { return JSON.parse(localStorage.getItem('msquiz_profile') || 'null'); } catch { return null; }
}
function saveLocalProfile(){
  localStorage.setItem('msquiz_profile', JSON.stringify({
    guestId: state.guestId, name: state.name, team: state.team,
    deck: state.deck, res: state.res, score: state.score,
  }));
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
      name: state.name, team: state.team, deck: state.deck,
      res: state.res, score: state.score, updatedAt: fb.serverTimestamp(),
    }, { merge: true });
  } else {
    saveLocalProfile();
  }
}

function reconcileDeck(){
  const total = allQuestions().length;
  for (let i = 0; i < total; i++){
    if (!state.deck.includes(i) && !(i in state.res)) state.deck.push(i);
  }
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
  const i = state.deck[0];
  if (i === undefined) return;
  clearInterval(tickHandle);
  state.screen = 'quiz'; state.qi = i; state.left = dur(); state.locked = false; state.seq = [];
  tickHandle = setInterval(tick, 100);
  render();
}
function skip(){ state.deck = [...state.deck.slice(1), state.deck[0]]; render(); }
function pick(idx){
  if (state.locked) return;
  clearInterval(tickHandle); tickHandle = null;
  finish(idx);
  render();
}
function goHomeWithoutStoppingTimer(){ state.screen = 'home'; render(); }
function go(screen){ clearInterval(tickHandle); tickHandle = null; state.screen = screen; render(); }
function afterResult(){
  state.deck = state.deck.filter(v => v !== state.qi);
  state.screen = state.deck.length ? 'home' : 'finale';
  render();
}

function ranked(){
  const board = state.players.length ? state.players.slice() : RIVALS_DEMO.slice();
  const mine = { id: state.guestId, name: state.name || 'Tu', score: state.score, me: true,
    detail: Object.keys(state.res).length + ' carte su ' + allQuestions().length };
  const already = board.some(p => p.id === state.guestId);
  const all = already ? board.map(p => p.id === state.guestId ? { ...p, me: true, name: state.name || p.name, score: state.score } : p)
                       : [...board, mine];
  return all.sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1, initials: initialsOf(p.name || 'Tu') }));
}

/* ============ Rendering ============ */
const root = document.getElementById('app');

function render(){
  let html = '';
  switch (state.screen){
    case 'boot': html = renderBoot(); break;
    case 'join': html = renderJoin(); break;
    case 'home': html = renderHome(); break;
    case 'quiz': html = renderQuiz(); break;
    case 'result': html = renderResult(); break;
    case 'board': html = renderBoard(); break;
    case 'profile': html = renderProfile(); break;
    case 'finale': html = renderFinale(); break;
    case 'admin': html = renderAdmin(); break;
    default: html = renderHome();
  }
  const showTabs = ['home', 'board', 'profile'].includes(state.screen);
  root.innerHTML = html + (showTabs ? renderTabs() : '');
}

function renderBoot(){
  return `<div class="screen" style="align-items:center;justify-content:center;text-align:center;padding:40px;">
    <div class="kicker">Mara &amp; Stefano</div>
    <div class="rule sm"></div>
    <p style="font-size:14px;color:var(--neutral-700)">Un attimo…</p>
  </div>`;
}

function renderJoin(){
  const chips = TEAMS.map((t, i) => `<button class="chip ${state.team===i?'on':''}" data-action="pick-team" data-team="${i}">${esc(t)}</button>`).join('');
  return `<div class="screen screen-join">
    <div class="kicker">Il gioco degli invitati</div>
    <h1 class="join-title">Mara<span class="amp-line amp">&amp;</span>Stefano</h1>
    <div class="kicker neutral join-sub">16 ottobre 2026 · Villa Calini</div>
    <hr class="rule">
    <p class="join-intro pretty">Quindici domande su di noi, una carta alla volta. Rispondi quando vuoi — la classifica resta chiusa fino ai discorsi.</p>
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

function renderHome(){
  if (state.revealed){
    return `<div class="screen screen-home">
      <div class="empty-deck" style="flex:1;">
        <div class="glyph">✦</div>
        <h2 style="font-size:32px;">Il gioco è chiuso</h2>
        <p class="pretty">La classifica è stata svelata ai discorsi. Grazie per aver giocato!</p>
        <button class="btn-outline" data-action="go" data-screen="board">Vedi la classifica</button>
      </div>
    </div>`;
  }
  const top = state.deck[0];
  const card = top === undefined ? null : Q(top);
  if (!card){
    return `<div class="screen screen-home">
      <div class="empty-deck" style="flex:1;">
        <div class="glyph">✦</div>
        <h2 style="font-size:32px;">Mazzo finito</h2>
        <p class="pretty">Tutte e quindici. Ora si aspettano i discorsi per sapere com’è andata.</p>
        <button class="btn-outline" data-action="go" data-screen="finale">Vedi il finale</button>
      </div>
    </div>`;
  }
  const isDaily = top === DAILY;
  return `<div class="screen screen-home">
    <div class="home-header">
      <div>
        <div class="kicker">Ne restano ${state.deck.length}</div>
        <h1 style="font-size:30px;">Il mazzo</h1>
      </div>
      <div class="home-score">
        <div class="num serif tabular">${state.score}</div>
        <div class="micro">Punti</div>
      </div>
    </div>
    <div class="stage">
      <div class="deck-layer deck-back"></div>
      <div class="deck-layer deck-mid"></div>
      <div class="deck-layer deck-top">
        <div class="kicker" style="color:var(--cream);opacity:.9;">${esc(card.k)}</div>
        <div class="hairline"></div>
        <div class="card-n serif tabular">${top + 1}<sup>di ${allQuestions().length}</sup></div>
        <div class="spacer"></div>
        <p class="hint pretty">${esc(card.h)}</p>
        ${isDaily ? '<div class="pill">Del giorno · vale doppio</div>' : ''}
        <button class="flip-btn serif" data-action="flip">Gira la carta</button>
      </div>
      <div class="deck-actions">
        <button class="btn-outline small" style="flex:1;" data-action="skip">Salta, ci penso</button>
        <span class="note">${state.deck.length > 1 ? 'torna in fondo' : 'è l’ultima'}</span>
      </div>
    </div>
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
  if (q.audio){
    const bars = [60,95,45,80,35,70,50].map((h,i)=>`<span style="height:${h}%;animation-delay:${i*0.12}s"></span>`).join('');
    return `<div class="audio-row">
      <button class="audio-play" data-action="play-audio"><svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-600)"><polygon points="5,3 21,12 5,21"/></svg></button>
      <div class="audio-wave">${bars}</div>
      <div class="audio-dur tabular">0:07</div>
      <audio id="q-audio" src="${esc(q.audioSrc||'')}" preload="none" style="display:none;"></audio>
    </div>` + renderOptions(q);
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
      <button class="btn-text" data-action="rimetti">Rimetti nel mazzo</button>
      <span class="counter">Carta ${state.qi + 1} di ${allQuestions().length}</span>
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
  const cta = state.deck.filter(v => v !== state.qi).length ? 'Carta successiva' : 'Vedi il finale';
  return `<div class="screen screen-result">
    <div class="kicker result-kicker">${kicker}</div>
    <div class="result-pts serif tabular" style="color:${ink}">${r.pts ? '+' + r.pts : '0'}</div>
    <h2 class="result-title">${esc(title)}</h2>
    <hr class="rule sm">
    <p class="result-blurb pretty">${esc(q.s)}</p>
    <div class="breakdown">
      <div class="breakdown-row"><span>${r.correct ? 'Risposta giusta' : 'Risposta'}</span><span class="val tabular">${r.correct ? '+' + BASE_PTS : '0'}</span></div>
      <div class="breakdown-row"><span>Velocità${r.used ? ' · ' + numIt(r.used) + 's' : ''}</span><span class="val tabular" style="color:var(--accent-700)">${r.correct ? '+' + r.bonus : '—'}</span></div>
      ${r.multi === 2 ? `<div class="breakdown-row"><span>Carta del giorno</span><span class="val tabular">×2</span></div>` : ''}
      <div class="breakdown-row total"><span>Totale</span><span class="val tabular">${r.pts || 0}</span></div>
    </div>
    <p class="rank-line">${esc(rankLine)}</p>
    <div class="result-spacer"></div>
    <div class="result-cta">
      <button class="btn-outline block" data-action="after-result">${cta}</button>
      <button class="btn-text" data-action="go" data-screen="home" style="align-self:center;">Basta per ora, torno dopo</button>
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
  if (locked){
    const rows = board.filter(p => !p.me).map(p => `<div class="board-row">
      <div class="avatar">${esc(p.initials)}</div>
      <div><div class="board-name">${esc(p.name)}</div><div class="board-detail">${esc((p.detail||'').split('·')[0].trim())}</div></div>
      <div class="board-score">•••</div>
    </div>`).join('');
    return `<div class="screen screen-board">
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
    </div>`;
  }
  const rows = board.map(p => `<div class="board-row ${p.me?'me':''}">
    <div class="board-rank serif tabular">${p.rank}</div>
    <div><div class="board-name">${esc(p.name)}</div><div class="board-detail">${esc(p.detail||'')}</div></div>
    <div class="board-score open serif tabular">${p.score}</div>
  </div>`).join('');
  return `<div class="screen screen-board">
    <div class="kicker">${board.length} invitati · busta aperta</div>
    <h1 class="board-title">Classifica</h1>
    <hr class="rule sm" style="margin-left:0;">
    <div style="margin-top:8px;">${rows}</div>
    <div class="board-footer">A parità di punti vince chi ha risposto più in fretta.</div>
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
    { mark: '✦', name: 'Fulmine', note: best ? 'Più veloce: ' + numIt(best.used) + 's' : 'Rispondi sotto i 4 secondi', locked: !best || best.used > 4 },
    { mark: '✧', name: 'Carta del giorno', note: 'Hai girato la carta del giorno', locked: !state.res[DAILY] },
    { mark: '✷', name: 'Mazzo completo', note: 'Tutte e quindici le carte', locked: done < QS.length },
  ];
  const badgeRows = badges.map(b => `<div class="badge-row ${b.locked?'locked':''}">
    <div class="badge-glyph">${b.mark}</div>
    <div><div class="badge-name">${esc(b.name)}</div><div class="badge-note">${esc(b.note)}</div></div>
  </div>`).join('');
  const answers = allQuestions().map((x, i) => ({ i, x })).filter(o => state.res[o.i]).map(o => {
    const r = state.res[o.i];
    return `<div class="answer-row">
      <span class="num" style="color:${r.correct?'var(--accent-600)':'var(--neutral-500)'}">${o.i+1}</span>
      <span class="title">${esc(o.x.t)}</span>
      <span class="line tabular">${r.pts?'+'+r.pts:'0'} · ${numIt(r.used)}s</span>
    </div>`;
  }).join('');
  return `<div class="screen screen-profile">
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
    <h1 class="finale-title">Chi conosce<br><span class="amp">Mara &amp; Stefano</span></h1>
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
    return `<div class="admin-card-row">
      <div class="num">${i + 1}</div>
      <div style="flex:1;overflow:hidden;">
        <div class="kk">${esc(x.k)}</div>
        <div class="tt">${esc(x.t)}</div>
      </div>
      <div class="cnt">${answers} risposte</div>
    </div>`;
  }).join('');
  const typeChips = KIND_LABELS.map((l, i) => `<button class="type-chip ${state.newCardType===i?'on':''}" data-action="admin-type" data-i="${i}">${esc(l)}</button>`).join('');
  return `<div class="screen screen-admin">
    <div class="kicker">Solo per gli sposi</div>
    <h2 class="admin-title" style="text-align:left;">Mara <span class="amp">&amp;</span> Stefano</h2>
    <hr class="rule sm" style="margin-left:0;">
    <div class="admin-stats">
      <div class="stat-cell"><div class="v serif tabular">${totalPlayers}</div><div class="c">Giocano</div></div>
      <div class="stat-cell"><div class="v serif tabular">${totalCards}</div><div class="c">Carte</div></div>
      <div class="stat-cell"><div class="v serif tabular">${pct}%</div><div class="c">Completate</div></div>
    </div>
    <div class="envelope-box">
      <div class="micro">La busta</div>
      <div class="big serif">${state.revealed ? 'Aperta a tutti' : 'Chiusa a tutti'}</div>
      ${state.revealed
        ? `<button class="btn-outline" data-action="close-board">Riapri il gioco</button>`
        : `<button class="btn-dark" data-action="open-board">Apri il reveal adesso</button>`}
    </div>
    <div class="section-title" style="color:rgba(247,236,214,.6);">Le carte</div>
    ${items}
    <div class="section-title" style="color:rgba(247,236,214,.6);">Nuova carta</div>
    <div class="type-chips">${typeChips}</div>
    <input id="admin-q" class="admin-input" type="text" placeholder="Scrivi la domanda…" value="${esc(state.newCardQ)}">
    <input id="admin-a" class="admin-input" type="text" placeholder="Risposta giusta" value="${esc(state.newCardA)}">
    <button class="btn-dark" style="margin-top:20px;" data-action="admin-publish">Pubblica agli invitati</button>
  </div>`;
}

function renderTabs(){
  const icon = {
    home: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="3" width="16" height="6" rx="1.5"/><rect x="4" y="11" width="16" height="6" rx="1.5"/><rect x="4" y="19" width="16" height="2" rx="1"/></svg>`,
    board: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="20" x2="20" y2="20"/><rect x="6" y="12" width="3" height="8"/><rect x="11" y="7" width="3" height="13"/><rect x="16" y="10" width="3" height="10"/></svg>`,
    profile: `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`,
  };
  const tabs = [
    { id: 'home', label: 'Mazzo' },
    { id: 'board', label: 'Busta' },
    { id: 'profile', label: 'Profilo' },
  ];
  return `<div class="tabbar">${tabs.map(t => `<button class="tab ${state.screen===t.id?'active':''}" data-action="go" data-screen="${t.id}">${icon[t.id]}<span class="lbl">${t.label}</span></button>`).join('')}</div>`;
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
      go('home');
      break;
    }
    case 'flip': flip(); break;
    case 'skip': skip(); break;
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
    case 'play-audio': {
      const audio = document.getElementById('q-audio');
      if (audio && audio.src) audio.play().catch(() => {});
      break;
    }
    case 'rimetti': goHomeWithoutStoppingTimer(); break;
    case 'after-result': afterResult(); break;
    case 'go': go(el.dataset.screen); break;
    case 'open-board-full': state.revealed = true; go('board'); break;
    case 'open-board': openReveal(); break;
    case 'close-board': closeReveal(); break;
    case 'admin-type': state.newCardType = +el.dataset.i; render(); break;
    case 'admin-publish': publishCard(); break;
  }
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

async function publishCard(){
  const t = state.newCardQ.trim(), a = state.newCardA.trim();
  if (!t || !a) return;
  const card = { k: KIND_LABELS[state.newCardType], h: 'Carta pubblicata dagli sposi.', t, o: [a, 'Nessuna delle precedenti'], c: 0, s: 'Risposta aggiunta dagli sposi durante il matrimonio.' };
  if (state.mode === 'online' && fb){
    await fb.addDoc(fb.collection(fb.db, 'extraCards'), { ...card, createdAt: fb.serverTimestamp() });
  } else {
    state.extraCards.push(card);
    reconcileDeck();
  }
  state.newCardQ = ''; state.newCardA = '';
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
            state.name = d.name || ''; state.team = d.team ?? 1;
            state.deck = d.deck || QS.map((_, i) => i);
            state.res = d.res || {}; state.score = d.score || 0;
          }
          fb.onSnapshot(fb.collection(fb.db, 'players'), qs => {
            state.players = qs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            render();
          });
          fb.onSnapshot(fb.doc(fb.db, 'meta', 'state'), doc => {
            state.revealed = !!(doc.exists() && doc.data().revealed);
            render();
          });
          fb.onSnapshot(fb.collection(fb.db, 'extraCards'), qs => {
            state.extraCards = qs.docs.map(doc => doc.data());
            reconcileDeck();
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
      state.deck = saved.deck || state.deck; state.res = saved.res || {}; state.score = saved.score || 0;
    }
  }
  if (location.hash === '#sposi') state.screen = 'admin';
  else state.screen = state.name ? 'home' : 'join';
  render();
}
boot();
