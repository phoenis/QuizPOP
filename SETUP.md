# Quiz di Mara & Stefano — guida rapida

## Cosa c'è nel progetto
- `index.html`, `style.css`, `app.js` — l'app (nessun build, nessuna dipendenza da installare).
- `firebase-config.js` — le chiavi del progetto Firebase (da compilare, vedi sotto).
- `firestore.rules` — le regole di sicurezza (database) da incollare nella console Firebase.
- `assets/photos/` — dove mettere le foto vere (vedi sotto).
- `assets/fonts/` — i file del font Formata (licenza acquistata, non ridistribuirli altrove).

## Font
Tutto il testo usa **Formata** (font a pagamento, già incluso in `assets/fonts/`).
Il titolo "Mara & Stefano" usa invece **Alice**, un font gratuito di Google Fonts
caricato via `<link>` in `index.html` — non richiede nessun file locale.

## La home
Dopo l'iscrizione l'invitato arriva su una home con la vostra foto, la card del
quiz, "Missione speciale" e "Carica le tue foto" (album condiviso). Non c'è una
barra di navigazione fissa: si torna al profilo con l'avatar in alto a destra,
e dentro "Le domande" c'è una freccia in alto a sinistra per tornare alla home.
- **Avatar**: invece di caricare una foto profilo vera, ogni invitato può
  scegliere un'emoji da una rosa fissa (facoltativo, in iscrizione o dopo dal
  profilo, tasto "Cambia avatar"). Chi non ne sceglie una resta con le
  iniziali del nome, come prima. Compare ovunque prima c'erano le iniziali:
  angolo in alto a destra, profilo, classifica, podio finale. Aprendo il
  cambio avatar dal profilo si può anche cambiare tavolo, senza dover
  riscrivere nome o uscire dal profilo.
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
- **Missione speciale**: ogni invitato scopre una missione a sorpresa (tipo
  "Fai un selfie con la sposa"), diversa da quella di chiunque altro stia già
  giocando finché ce ne sono di libere — con più invitati che missioni, da lì
  in poi qualche doppione può capitare. L'elenco è in `app.js`, cerca
  `MISSIONS`. Per completarla si carica una **foto** (compressa nel telefono
  prima di salvarla, come la foto di copertina). Alcune missioni non si
  prestano bene a una foto (es. "Fai un brindisi", "Un abbraccio"): quelle
  hanno `photo: false` accanto al testo in `MISSIONS`, e solo per quelle
  compare anche il tasto "L'ho fatta, senza foto" per segnarle fatte senza
  allegare nulla (la foto resta comunque possibile, se la si vuole fare lo
  stesso). Per aggiungerne altre, basta mettere `photo: false` sulla voce
  giusta in `MISSIONS`. Si può anche "cambiarla" se non piace, o farne
  un'altra dopo aver completato la prima — a piacere.
  ⚠️ Questa funzione usa una collezione Firestore (`missionPhotos`): se
  attivate online dopo aver già seguito questa guida una volta, ricordatevi
  di rifare anche il punto 3 con `firestore.rules` aggiornato, altrimenti il
  caricamento darà errore di permessi.

- **Cambiare telefono**: ogni telefono ha un'identità propria (nessun login),
  quindi normalmente aprendo il gioco su un secondo telefono si parte da zero.
  Nel profilo (solo per chi ha accesso admin, vedi "Pannello sposi" più sotto,
  e solo in modalità online) c'è un codice breve — "il tuo profilo su un
  altro telefono" — da inserire sul nuovo telefono all'indirizzo `.../#code`
  (niente link visibile nella schermata iniziale: come `#sposi`, lo conosce
  solo chi ha l'indirizzo): sposta lì nome, punti e risposte (il telefono di
  prima smette di essere quell'invitato nella classifica e nel pannello
  sposi, così non compare due volte). Non è una sincronizzazione in tempo
  reale: si può ripetere quando serve per riprendere i progressi più recenti
  da un telefono diverso. Un invitato normale non vede questo codice né può
  cambiare telefono da solo — se serve aiutarlo, potete recuperare il suo
  profilo voi dal pannello sposi.
- **Uscire da un profilo**: solo voi due (Mara e Stefano) vedete, in fondo al
  profilo, "Esci da questo profilo" — libera il telefono per iscrivere
  qualcun altro (o voi stessi con un altro nome, per fare una prova). Il
  profilo lasciato non si cancella: resta recuperabile con il suo codice
  (vedi sopra). Non è visibile a un invitato normale né ai due testimoni,
  pur essendo anche loro admin: senza un codice visibile per rientrare, uscire
  per sbaglio lo lascerebbe fuori dal proprio profilo.
- **I vostri profili riservati** (solo in modalità online): oltre ai codici
  normali generati per ogni invitato, ce ne sono quattro riservati e sempre
  validi, per voi due e i due testimoni — `SPECIAL_PROFILES` in `app.js`:
  - Mara: `Sposa!` (icona 👰🏻‍♀️)
  - Stefano: `Sposo!` (icona 🤵🏻)
  - Elisa: `TestimoneSposa` (icona 🎤)
  - Giulia: `TestimoneSposo` (icona 🐶)

  Andando su `.../#code` e inserendo uno di questi codici (anche su un
  telefono nuovo) si crea — la prima volta — o si ritrova — le volte dopo —
  sempre lo stesso profilo, con nome e icona già impostati e già con la
  scorciatoia al pannello sposi nel proprio profilo (non serve più
  ricordarsi l'indirizzo `#sposi`). Questi quattro profili non compaiono con
  il tasto "Elimina" nel pannello sposi (non si possono cancellare per
  sbaglio) e non entrano mai in classifica, né singola né a squadre — possono
  comunque rispondere alle domande e fare le missioni fotografiche come
  chiunque altro, semplicemente il loro punteggio non conta per la gara.

  I codici di Mara e Stefano erano in origine `POPSposa123!` e
  `POPSposo123!`: sono stati cambiati (settembre 2026) in `Sposa!` e
  `Sposo!`. Chi aveva già attivato il proprio profilo con il codice vecchio
  resta riconosciuto come profilo riservato senza bisogno di fare nulla
  (vedi `LEGACY_SPECIAL_CODES` in `app.js`) — ma il codice vecchio resta
  legato a quel profilo per il recupero su un altro telefono: per far
  funzionare anche lì il nuovo codice `Sposa!`/`Sposo!`, bisogna aprire
  Firebase Console → Firestore Database → collezione `players`, trovare il
  documento con `name` uguale a "Mara" (o "Stefano") e modificare a mano il
  campo `transferCode` sostituendo il valore vecchio con quello nuovo, in
  maiuscolo (`SPOSA!` o `SPOSO!` — l'app confronta i codici sempre in
  maiuscolo). Se preferite non farlo, il profilo vecchio continua a
  funzionare perfettamente con il codice vecchio; il nuovo codice, finché
  non modificate quel campo, creerebbe invece un profilo nuovo e vuoto.

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
4. Nel menu **Build → Authentication** → scheda "Sign-in method" → abilita **Anonimo**.
   (Serve solo per distinguere un invitato dall'altro, nessuno vede login o password.)
5. Nelle impostazioni del progetto (icona ingranaggio in alto) → "Le tue app" → aggiungi
   una **app Web** (icona `</>`). Dagli un nome qualsiasi e registra.
6. Firebase mostra un oggetto `firebaseConfig`: copia i valori dentro
   [firebase-config.js](firebase-config.js), sostituendo le stringhe vuote.
7. ⚠️ **Passo facile da dimenticare, e che blocca tutto in silenzio se saltato**:
   la chiave API creata da Firebase ha di default una restrizione sui referrer
   HTTP (il dominio da cui arriva la richiesta) — finché il tuo dominio non è
   nella lista, il sito caricato lì non riesce ad autenticarsi e l'app
   ripiega da sola in "modalità locale" senza dirlo chiaramente: sembra
   funzionare (si può comunque creare un profilo, ma resta solo su quel
   telefono), finché non si prova qualcosa che richiede davvero il collegamento
   — per esempio recuperare un profilo con un codice, che a quel punto non fa
   nulla. Se apri la console del browser (F12) su quella pagina e vedi un
   errore tipo `auth/requests-from-referer-https://tuodominio.it-are-blocked`,
   è esattamente questo. Per sistemarlo:
   1. Vai su https://console.cloud.google.com/apis/credentials (stesso
      progetto Firebase, verifica in alto).
   2. Apri la chiave "Browser key (auto created by Firebase)" (quella che
      inizia uguale al valore `apiKey` in `firebase-config.js`).
   3. Sotto "Restrizioni applicazione" → "Referrer HTTP (siti web)", aggiungi
      il tuo dominio, sia con sia senza `www`, con l'asterisco finale:
      `https://tuodominio.it/*` e `https://www.tuodominio.it/*`.
   4. Salva — puoi impiegare qualche minuto prima che valga davvero.

   (Nota: questa è una impostazione diversa dai "Domini autorizzati" dentro
   Firebase Authentication, che invece riguarda altri tipi di accesso, non
   quello anonimo usato qui — non serve toccarla per questo problema.)
8. Ricarica la pagina: se le chiavi sono corrette e il dominio è tra i
   referrer consentiti, l'app è già in modalità online.

Non serve nessun server da mantenere: Firestore è un servizio gestito da
Google, e le chiavi in `firebase-config.js` sono pensate per stare in chiaro in
un sito pubblico (la sicurezza vera è nelle regole del punto 3).

**Come capire se sei davvero in modalità online** (utile per un test veloce
dopo aver caricato il sito): entra con uno dei codici riservati (es. il tuo,
`Sposa!`) e apri il profilo — se in fondo vedi la sezione "Il tuo
profilo su un altro telefono" con un codice, sei online; se non la vedi
affatto, quasi certamente sei ancora in modalità locale e va ricontrollato
il punto 7 qui sopra. (Quella sezione è visibile solo a chi ha accesso admin,
come i profili riservati — un invitato normale non la vede mai, online o no.)

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
  con un tasto **"Elimina"** per togliere del tutto un invitato (utenze di
  prova, doppioni da un altro telefono mai più usati...) — non si può
  annullare. ⚠️ Novità: se avete già attivato Firebase online, ricordatevi di
  aggiornare le regole (punto 3) con il contenuto aggiornato di
  `firestore.rules`, altrimenti "Elimina" darà errore di permessi.
- **aprire il reveal** (la classifica si sblocca in tempo reale su tutti i telefoni),
- pubblicare una carta extra al volo durante il weekend (diventa visibile a tutti
  gli invitati che non l'hanno ancora fatta). Nota: il form prende solo "domanda" +
  "risposta giusta" — genera una carta a due opzioni (la risposta giusta e un
  distrattore generico), non tutti e sette i tipi di domanda complessi.
- vedere tutte le **missioni fotografiche completate** da chiunque (foto, testo
  della missione e nome di chi l'ha fatta), sezione "Missioni completate" —
  visibile solo in modalità online, ordinata dalla più recente. Da lì anche
  **"Svuota tutte le missioni"**: cancella tutte le foto caricate finora e fa
  ripartire ogni invitato da capo con una nuova missione a sorpresa — utile
  per ripulire i test prima del matrimonio. Non si può annullare. ⚠️ Serve
  anche qui `firestore.rules` aggiornato (punto 3), altrimenti darà errore di
  permessi.

## Foto vere
Quando è pronta, basta metterla in `assets/` con questo nome esatto
(già collegato nel codice, nessuna modifica da fare):
- `assets/photos/dove-eravamo.jpg` — foto della domanda "Dov'eravamo?" (categoria "Andiamo in viaggio")

Finché il file non c'è, l'app mostra automaticamente il placeholder grigio
("Foto del viaggio").

## Mettere il quiz online sul tuo hosting Aruba
Il sito è completamente statico: quando è pronto, carica via FTP l'intero contenuto
di questa cartella (tranne `.git`, `.claude`, `SETUP.md`, `firestore.rules`) in una
sottocartella del tuo spazio Aruba, es. `/quiz/` così sarà raggiungibile su
`maraestefano.it/quiz/`. Nessun database o linguaggio server richiesto sul tuo hosting:
tutto il gioco parla direttamente con Firebase dal browser dell'invitato.

## Note tecniche
- Nessuna scadenza sulle domande: si può rispondere con tutta calma. In alto,
  accanto al numero della carta, i secondi trascorsi corrono solo come
  riferimento (non è un conto alla rovescia): rispondere entro 20 secondi dà
  comunque un piccolo bonus di punti in più, che si riduce con il passare del
  tempo ma non toglie mai il punteggio base della domanda.
- Le 25 domande sono divise in 4 categorie ("Mara & Stefano" da 10, "La loro
  vita insieme", "Il giorno di festa" e "Andiamo in viaggio" da 5 ciascuna),
  mostrate come 4 card nella schermata "Le domande" (una per categoria, con
  dentro le sue caselle). Le categorie danno anche una medaglia nel profilo a
  chi risponde a tutte le sue domande, giuste o sbagliate che siano.
- Ogni invitato vede le domande in un ordine casuale, deciso alla prima apertura
  del gioco sul suo telefono e poi fissato per sempre (ricaricando la pagina
  l'ordine non cambia). Le carte extra pubblicate dagli sposi durante l'evento
  si aggiungono in fondo al mazzo di ciascuno, senza toccare l'ordine già visto.
- Se un invitato ricarica la pagina a metà di una domanda, torna al mazzo — il
  cronometro di quella domanda continua comunque a correre in background (uscire
  non è un modo per "congelare" il tempo).
