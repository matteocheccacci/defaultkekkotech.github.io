// File: /js/content.js
const siteContent = {
  help: `Elenco dei comandi disponibili:
  ---------------------------------
  cls        : Pulisce lo schermo e mostra il messaggio iniziale.
  about      : Scopri qualcosa in più su questo sito.
  projects   : Visualizza e scarica i progetti realizzati.
  contacts   : Mostra le informazioni di contatto.
  rickroll   : ???
  reviews     : Guarda le recensioni dei giochi.
  lavachicken: ????
  ---------------------------------`,

  // 'cls' content is now used as the boot message
  cls: `Benvenuto su kekkotech.com! 
Digita 'help' per la lista dei comandi.`,

  homemobile: `Benvenuto su kekkotech.com!
Tocca un comando per esplorare.`, // Keep for mobile version

  about: `Questo sito è un esperimento per replicare un'interfaccia a riga di comando nel browser.
Esplora le sezioni usando i comandi disponibili.`,

  // projects content is now handled dynamically in the HTML script
  // using the projectList from list.js. We can remove this static entry.
  // projects: `...`, // REMOVE this static entry

  contacts: `--- Contatti ---
Email: <a href='mailto:matteo@example.com'>matteo@example.com</a>
Instagram: <a href='https://instagram.com/matteo.checcacci' target='_blank'>@matteo.checcacci</a>
--------------`
};
