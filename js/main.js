document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const terminal = document.getElementById('terminal');
    const ipAddressSpan = document.getElementById('ip-address');
    const dateTimeSpan = document.getElementById('date-time');
    const lastVisitSpan = document.getElementById('last-visit');
    const outputDiv = document.getElementById('output');
    const inputField = document.getElementById('input');

    // --- Schermata di Caricamento ---

    // 1. Ottieni l'indirizzo IP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            ipAddressSpan.textContent = data.ip;
        })
        .catch(error => {
            console.error("Errore nel recupero dell'IP:", error);
            ipAddressSpan.textContent = 'non disponibile';
        });

    // 2. Ottieni data e ora del browser
    const now = new Date();
    dateTimeSpan.textContent = now.toLocaleString('it-IT');

    // 3. Gestisci l'ultimo accesso con localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    if (lastVisit) {
        lastVisitSpan.textContent = lastVisit;
    }
    localStorage.setItem('lastVisit', now.toLocaleString('it-IT'));

    // Nascondi il loader e mostra il terminale dopo un ritardo
    setTimeout(() => {
        loader.classList.add('hidden');
        terminal.classList.remove('hidden');
        inputField.focus();
        printToTerminal('Benvenuto su kekkotech!');
        printToTerminal('Digita "aiuto" per la lista dei comandi.');
    }, 4000); // 4 secondi di ritardo

    // --- Logica del Terminale ---

    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = inputField.value.trim().toLowerCase();
            printToTerminal(`kekkotech@github.io:~$ ${command}`);
            handleCommand(command);
            inputField.value = '';
        }
    });

    function handleCommand(command) {
        switch (command) {
            case 'aiuto':
                printToTerminal('Comandi disponibili:');
                printToTerminal('- aiuto: Mostra questa lista.');
                printToTerminal('- chi-sono: Informazioni su di me.');
                printToTerminal('- progetti: I miei progetti principali.');
                printToTerminal('- contatti: Come contattarmi.');
                printToTerminal('- pulisci: Pulisce la schermata.');
                break;
            case 'chi-sono':
                printToTerminal('Sono kekkotech, uno sviluppatore appassionato di...');
                // Aggiungi qui la tua descrizione
                break;
            case 'progetti':
                printToTerminal('Ecco alcuni dei miei progetti:');
                printToTerminal('<a href="https://github.com/tuo-username/progetto1" target="_blank">Progetto 1</a>');
                printToTerminal('<a href="https://github.com/tuo-username/progetto2" target="_blank">Progetto 2</a>');
                break;
            case 'contatti':
                printToTerminal('Email: tua-email@esempio.com');
                printToTerminal('GitHub: <a href="https://github.com/tuo-username" target="_blank">tuo-username</a>');
                break;
            case 'pulisci':
                outputDiv.innerHTML = '';
                break;
            default:
                printToTerminal(`Comando non trovato: ${command}`);
        }
    }

    function printToTerminal(message) {
        const p = document.createElement('p');
        p.innerHTML = message;
        outputDiv.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight; // Scrolla in fondo
    }
});