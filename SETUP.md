# Quiz di Mara & Stefano — guida rapida

## Cosa c'è nel progetto
- `index.html`, `style.css`, `app.js` — l'app (nessun build, nessuna dipendenza da installare).
- `firebase-config.js` — le chiavi del progetto Firebase (da compilare, vedi sotto).
- `firestore.rules` — le regole di sicurezza da incollare nella console Firebase.
- `assets/photos/` — dove mettere le foto vere (vedi sotto).

## La home
Dopo l'iscrizione l'invitato arriva su una home con la vostra foto, la card del
quiz, "Programma e menù" e "Carica le tue foto" (album condiviso). Da qui si
naviga anche con la barra in basso (Home, Domande, Busta, Profilo).
- **Foto di copertina**: metti il file in `assets/photos/hub-hero.jpg`. Finché
  non c'è, l'app mostra lo sfondo neutro senza foto.
- **Album condiviso**: apri `app.js`, cerca `ALBUM_URL` (vicino all'inizio del
  file) e incolla lì il link del vostro album (Google Foto, Dropbox...). Finché
  è vuoto, il tasto "Carica le tue foto" avvisa che il link non è stato ancora
  impostato.
- **Programma e menù**: sempre in `app.js`, cerca `PROGRAMMA` (l'orario della
  cerimonia c'è già) e `MENU_NOTE` — aggiungete gli altri orari della giornata
  e, se volete, il testo del menù.

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
7. Ricarica la pagina: se le chiavi sono corrette l'app è già in modalità online.

Non serve nessun server da mantenere: Firestore è un database gestito da Google,
e le chiavi in `firebase-config.js` sono pensate per stare in chiaro in un sito
pubblico (la sicurezza vera è nelle regole del punto 3).

## Pannello sposi
Si raggiunge visitando l'indirizzo del sito con `#sposi` in fondo, ad esempio:
`https://maraestefano.it/quiz/#sposi`

Non c'è una password: l'unica protezione è che nessuno conosce quell'indirizzo,
quindi non condividetelo con gli invitati.

Da lì potete:
- vedere quanti invitati stanno giocando e la percentuale di completamento,
- **aprire il reveal** (la classifica si sblocca in tempo reale su tutti i telefoni),
- pubblicare una carta extra al volo durante il weekend (diventa visibile a tutti
  gli invitati che non l'hanno ancora fatta). Nota: il form prende solo "domanda" +
  "risposta giusta" — genera una carta a due opzioni (la risposta giusta e un
  distrattore generico), non tutti e sette i tipi di domanda complessi.

## Foto vere
Quando è pronta, basta metterla in `assets/` con questo nome esatto
(già collegato nel codice, nessuna modifica da fare):
- `assets/photos/card-04.jpg` — foto della domanda "dove è stata scattata la prima foto insieme"

Finché il file non c'è, l'app mostra automaticamente il placeholder grigio
("Foto degli sposi").

## Mettere il quiz online sul tuo hosting Aruba
Il sito è completamente statico: quando è pronto, carica via FTP l'intero contenuto
di questa cartella (tranne `.git`, `.claude`, `SETUP.md`, `firestore.rules`) in una
sottocartella del tuo spazio Aruba, es. `/quiz/` così sarà raggiungibile su
`maraestefano.it/quiz/`. Nessun database o linguaggio server richiesto sul tuo hosting:
tutto il gioco parla direttamente con Firebase dal browser dell'invitato.

## Note tecniche
- Il timer (20 secondi) non è mai mostrato durante la domanda, come da progetto.
- Le 16 domande sono divise in 4 categorie da 4 ("Mara", "Stefano", "La loro vita
  insieme", "La giornata di oggi"), mostrate come 4 card nella schermata "Le
  domande" (una per categoria, con dentro le sue 4 caselle). Le categorie danno
  anche una medaglia nel profilo se le indovini tutte e quattro.
- Ogni invitato vede le domande in un ordine casuale, deciso alla prima apertura
  del gioco sul suo telefono e poi fissato per sempre (ricaricando la pagina
  l'ordine non cambia). Le carte extra pubblicate dagli sposi durante l'evento
  si aggiungono in fondo al mazzo di ciascuno, senza toccare l'ordine già visto.
- La "carta del giorno" (×2 punti) è fissa per contenuto ("Ordina le tappe · i
  primi quattro mesi"), non per posizione: essendo l'ordine casuale, può comparire
  in un punto diverso del mazzo di ogni invitato. Se preferite un'altra domanda,
  cambiate `DAILY` in `app.js` (è l'indice della domanda nell'array `QS`).
- Le 4 domande "Su Mara" nell'array `QS` sono un placeholder (risposte "Da
  completare") in attesa dei contenuti veri — modificatele in `app.js` prima
  del matrimonio.
- Se un invitato ricarica la pagina a metà di una domanda, torna al mazzo — il
  cronometro di quella domanda continua comunque a correre in background (uscire
  non è un modo per "congelare" il tempo).
