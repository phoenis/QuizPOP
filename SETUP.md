# Quiz di Mara & Stefano — guida rapida

## Cosa c'è nel progetto
- `index.html`, `style.css`, `app.js` — l'app (nessun build, nessuna dipendenza da installare).
- `firebase-config.js` — le chiavi del progetto Firebase (da compilare, vedi sotto).
- `firestore.rules` — le regole di sicurezza (database) da incollare nella console Firebase.
- `storage.rules` — le regole di sicurezza (foto/video) da incollare nella console Firebase.
- `assets/photos/` — dove mettere le foto vere (vedi sotto).
- `assets/fonts/` — i file del font Formata (licenza acquistata, non ridistribuirli altrove).

## Font
Tutto il testo usa **Formata** (font a pagamento, già incluso in `assets/fonts/`).
Il titolo "Mara & Stefano" usa invece **Alice**, un font gratuito di Google Fonts
caricato via `<link>` in `index.html` — non richiede nessun file locale.

## La home
Dopo l'iscrizione l'invitato arriva su una home con la vostra foto, la card del
quiz, "Missione speciale" e "Carica le tue foto" (album condiviso). Non c'è una
barra di navigazione fissa: si torna al profilo con le iniziali in alto a
destra, e dentro "Le domande" c'è una freccia in alto a sinistra per tornare
alla home.
- **Foto di copertina**: metti il file in `assets/photos/hub-hero.jpg`, oppure
  caricala direttamente dal pannello `#sposi` (vedi sotto). Finché non c'è
  nessuna delle due, l'app mostra lo sfondo neutro.
- **Album condiviso**: "Carica le tue foto" apre una schermata con il codice
  dell'album WedShoots (`ALBUM_CODE` in `app.js`, con tasto "copia") e un
  pulsante che apre `ALBUM_URL` — la pagina ufficiale `wedshoots.com/it/download`
  con l'ID album incorporato, pensata da WedShoots stessa per aprire l'app se
  già installata o mandare allo store se no. ⚠️ Da verificare su un telefono
  vero prima del matrimonio: se quella pagina non reindirizzasse come
  previsto, c'è comunque il link "Scaricala" sotto che manda direttamente allo
  store giusto (Android/iOS rilevato automaticamente,
  `WEDSHOOTS_ANDROID_URL`/`WEDSHOOTS_IOS_URL` in `app.js`).
- **Missione speciale**: ogni invitato scopre una missione fotografica a
  sorpresa (tipo "Fai un selfie con la sposa"), diversa da quella di chiunque
  altro stia già giocando finché ce ne sono di libere — con più invitati che
  missioni, da lì in poi qualche doppione può capitare. L'elenco è in `app.js`,
  cerca `MISSIONS`. Per completarla si carica una **foto** (compressa nel
  telefono prima di salvarla, come la foto di copertina) oppure un **video**
  (max 80MB, caricato così com'è su Firebase Storage — i video non richiedono
  la modalità online funzionino, in locale/demo si può caricare solo foto);
  si può anche "cambiarla" se non piace, o farne un'altra dopo aver completato
  la prima — a piacere.
  ⚠️ Questa funzione usa una collezione Firestore (`missionPhotos`) e, per i
  video, anche **Firebase Storage**: se attivate online dopo aver già
  seguito questa guida una volta, ricordatevi di rifare anche il punto 3 con
  `firestore.rules` aggiornato e di attivare Storage con `storage.rules`
  (punto 4 qui sotto) — altrimenti il caricamento darà errore di permessi.

- **Cambiare telefono**: ogni telefono ha un'identità propria (nessun login),
  quindi normalmente aprendo il gioco su un secondo telefono si parte da zero.
  Nel profilo (solo in modalità online) c'è un codice breve — "il tuo profilo
  su un altro telefono" — da inserire sul nuovo telefono toccando "Hai già un
  profilo?" nella schermata iniziale: copia lì nome, punti e risposte. Non è
  una sincronizzazione in tempo reale: si può ripetere quando serve per
  riprendere i progressi più recenti.

Finché `firebase-config.js` resta vuoto, l'app gira in **modalità locale**: ottima per
provarla, ma i punteggi restano solo sul telefono di chi gioca e non sono condivisi.
Appena inserisci le chiavi Firebase, l'app passa da sola alla **modalità online**
con classifica condivisa tra tutti gli invitati.

## Provarla in locale
I moduli JavaScript dell'app richiedono un piccolo server (non funziona aprendo
`index.html` col doppio click). Con Node installato:

```bash
npx serve .
```

e apri l'indirizzo che stampa (es. http://localhost:3000).

## Attivare la classifica condivisa (Firebase — gratuito)
1. Vai su https://console.firebase.google.com e crea un nuovo progetto (es. "maraestefano-quiz").
2. Nel menu a sinistra apri **Build → Firestore Database** → Crea database → scegli una
   regione europea (es. `eur3`) → parti in modalità produzione.
3. Sempre in Firestore, vai su **Regole** e incolla il contenuto del file `firestore.rules`
   di questo progetto, poi Pubblica.
4. Nel menu a sinistra apri **Build → Storage** → Inizia → scegli la stessa regione
   Firestore del punto 2 → parti in modalità produzione. Poi vai su **Regole** e
   incolla il contenuto del file `storage.rules` di questo progetto, poi Pubblica.
   (Serve solo per i video delle missioni: se non vi interessa quella funzione
   potete saltare questo punto, le foto funzionano comunque solo con Firestore.)
5. Nel menu **Build → Authentication** → scheda "Sign-in method" → abilita **Anonimo**.
   (Serve solo per distinguere un invitato dall'altro, nessuno vede login o password.)
6. Nelle impostazioni del progetto (icona ingranaggio in alto) → "Le tue app" → aggiungi
   una **app Web** (icona `</>`). Dagli un nome qualsiasi e registra.
7. Firebase mostra un oggetto `firebaseConfig`: copia i valori dentro
   [firebase-config.js](firebase-config.js), sostituendo le stringhe vuote.
8. Ricarica la pagina: se le chiavi sono corrette l'app è già in modalità online.

Non serve nessun server da mantenere: Firestore/Storage sono servizi gestiti da
Google, e le chiavi in `firebase-config.js` sono pensate per stare in chiaro in
un sito pubblico (la sicurezza vera è nelle regole dei punti 3 e 4).

## Pannello sposi
Si raggiunge visitando l'indirizzo del sito con `#sposi` in fondo, ad esempio:
`https://maraestefano.it/quiz/#sposi`

Non c'è una password: l'unica protezione è che nessuno conosce quell'indirizzo,
quindi non condividetelo con gli invitati.

In più, dal pannello (sezione "Invitati", solo in modalità online) potete dare
a persone specifiche una **scorciatoia** al pannello sposi direttamente nel
loro profilo (tasto "Pannello sposi" in fondo), così non devono ricordarsi
l'indirizzo con `#sposi`: basta toccare "Rendi admin" accanto al loro nome
(devono aver già giocato almeno una volta, per esistere nella lista). "Togli"
la revoca in qualunque momento. Per restarci "sempre" (es. voi due), basta non
togliervi mai da soli dalla lista — l'indirizzo `#sposi` resta comunque valido
per tutti in ogni caso, come riserva.

Da lì potete:
- vedere quanti invitati stanno giocando e la percentuale di completamento,
- **aprire il reveal** (la classifica si sblocca in tempo reale su tutti i telefoni),
- pubblicare una carta extra al volo durante il weekend (diventa visibile a tutti
  gli invitati che non l'hanno ancora fatta). Nota: il form prende solo "domanda" +
  "risposta giusta" — genera una carta a due opzioni (la risposta giusta e un
  distrattore generico), non tutti e sette i tipi di domanda complessi.
- vedere tutte le **missioni fotografiche completate** da chiunque (foto, testo
  della missione e nome di chi l'ha fatta), sezione "Missioni completate" —
  visibile solo in modalità online, ordinata dalla più recente.

## Foto vere
Quando è pronta, basta metterla in `assets/` con questo nome esatto
(già collegato nel codice, nessuna modifica da fare):
- `assets/photos/card-04.jpg` — foto della domanda "dove è stata scattata la prima foto insieme"

Finché il file non c'è, l'app mostra automaticamente il placeholder grigio
("Foto degli sposi").

## Mettere il quiz online sul tuo hosting Aruba
Il sito è completamente statico: quando è pronto, carica via FTP l'intero contenuto
di questa cartella (tranne `.git`, `.claude`, `SETUP.md`, `firestore.rules`,
`storage.rules`) in una
sottocartella del tuo spazio Aruba, es. `/quiz/` così sarà raggiungibile su
`maraestefano.it/quiz/`. Nessun database o linguaggio server richiesto sul tuo hosting:
tutto il gioco parla direttamente con Firebase dal browser dell'invitato.

## Note tecniche
- Nessuna scadenza sulle domande: si può rispondere con tutta calma. Rispondere
  entro 20 secondi (mai mostrati a schermo) dà comunque un piccolo bonus di
  punti in più, che si riduce con il passare del tempo ma non toglie mai il
  punteggio base della domanda.
- Le 25 domande sono divise in 5 categorie da 5 ("Mara", "Stefano", "La loro vita
  insieme", "La giornata di oggi", "I tavoli"), mostrate come 5 card nella
  schermata "Le domande" (una per categoria, con dentro le sue 5 caselle). Le
  categorie danno anche una medaglia nel profilo se le indovini tutte e cinque.
- Ogni invitato vede le domande in un ordine casuale, deciso alla prima apertura
  del gioco sul suo telefono e poi fissato per sempre (ricaricando la pagina
  l'ordine non cambia). Le carte extra pubblicate dagli sposi durante l'evento
  si aggiungono in fondo al mazzo di ciascuno, senza toccare l'ordine già visto.
- Diverse domande nell'array `QS` sono ancora un placeholder (risposte "Da
  completare"): le 4 originali "Su Mara", una in più per "Su Stefano" e per
  "La loro vita insieme", una per "La giornata di oggi", e tutte e 5 quelle
  della categoria "I tavoli" (che vanno completate con i contenuti veri dei
  libretti-segnaposto dei tavoli, una volta pronti) — modificatele in
  `app.js` prima del matrimonio.
- Se un invitato ricarica la pagina a metà di una domanda, torna al mazzo — il
  cronometro di quella domanda continua comunque a correre in background (uscire
  non è un modo per "congelare" il tempo).
