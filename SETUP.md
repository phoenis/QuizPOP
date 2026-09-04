# Quiz di Mara & Stefano — guida rapida

## Cosa c'è nel progetto
- `index.html`, `style.css`, `app.js` — l'app (nessun build, nessuna dipendenza da installare).
- `firebase-config.js` — le chiavi del progetto Firebase (da compilare, vedi sotto).
- `firestore.rules` — le regole di sicurezza da incollare nella console Firebase.
- `assets/photos/`, `assets/audio/` — dove mettere le foto e i vocali veri (vedi sotto).

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

La parola d'ordine di default è **`sposi2026`** — per cambiarla, apri `app.js` e modifica
la riga `const ADMIN_PASSPHRASE = 'sposi2026';` in cima al file.

Da lì potete:
- vedere quanti invitati stanno giocando e la percentuale di completamento,
- **aprire il reveal** (la classifica si sblocca in tempo reale su tutti i telefoni),
- pubblicare una carta extra al volo durante il weekend (diventa visibile a tutti
  gli invitati che non l'hanno ancora fatta). Nota: il form prende solo "domanda" +
  "risposta giusta" — genera una carta a due opzioni (la risposta giusta e un
  distrattore generico), non tutti e sette i tipi di domanda complessi.

## Foto e vocali veri
Quando li avete pronti, basta metterli in `assets/` con questi nomi esatti
(già collegati nel codice, nessuna modifica da fare):
- `assets/photos/card-04.jpg` — foto della carta 4 ("dove è stata scattata la prima foto")
- `assets/photos/card-10.jpg` — foto della carta 10 (il viaggio)
- `assets/audio/card-06.mp3` — vocale della carta 6 (chi sta parlando)
- `assets/audio/card-13.mp3` — vocale della carta 13 (la promessa)

Finché questi file non ci sono, l'app mostra automaticamente il placeholder grigio
("Foto degli sposi") e il tasto play semplicemente non riproduce nulla.

## Mettere il quiz online sul tuo hosting Aruba
Il sito è completamente statico: quando è pronto, carica via FTP l'intero contenuto
di questa cartella (tranne `.git`, `.claude`, `SETUP.md`, `firestore.rules`) in una
sottocartella del tuo spazio Aruba, es. `/quiz/` così sarà raggiungibile su
`maraestefano.it/quiz/`. Nessun database o linguaggio server richiesto sul tuo hosting:
tutto il gioco parla direttamente con Firebase dal browser dell'invitato.

## Note tecniche
- Il timer (20 secondi) non è mai mostrato durante la domanda, come da progetto.
- La "carta del giorno" (×2 punti) è fissa: è sempre la 5ª carta del mazzo
  ("Ordina le tappe · i primi quattro mesi"), non cambia in base al giorno reale.
  Se preferite un'altra carta, cambiate `DAILY` in `app.js`.
- Se un invitato ricarica la pagina a metà di una domanda, torna al mazzo — il
  cronometro di quella domanda continua comunque a correre in background (uscire
  non è un modo per "congelare" il tempo).
