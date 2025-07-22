// Contenuto di js/mobile.js

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi principali
    const loaderContent = document.querySelector('.loader-content');
    const terminal = document.getElementById('terminal');
    const outputDiv = document.getElementById('output');
    const promptSpan = document.getElementById('prompt');
    const terminalTitle = document.getElementById('terminal-window-title');
    const versionDisplay = document.getElementById('version-display');
    const commandButtons = document.querySelectorAll('.mobile-command'); // Riferimento ai pulsanti

    // La logica di caricamento (versione, IP, data, ecc.) rimane la stessa
    // (Qui puoi copiare le funzioni loadVersion, typeLoader e showTerminal dal tuo file main.js)
    // Per semplicità, le riporto qui:

    function loadVersion() {
        fetch('version.json')
            .then(response => response.json())
            .then(data => {
                if (versionDisplay) versionDisplay.textContent = `v${data.site_version}`;
            })
            .catch(() => { if (versionDisplay) versionDisplay.textContent = 'v_error'; });
    }

    const loaderLines = [
        `<pre>
        /////////////////////////////////////////////////
        //                                             //
        //   K  E  K  K  O  T  E  C  H  .  C  O  M     //
        //                                             //
        /////////////////////////////////////////////////
</pre>`,
        '<p>Inizializzazione sessione...</p>',
        '<p>Connessione da: <span id="ip-address">ricerca...</span></p>',
        '<p>Data e ora: <span id="date-time">ricerca...</span></p>',
        '<p>Ultimo accesso: <span id="last-visit">mai</span></p>',
        '<br>',
        '<p>Caricamento completato.</p>'
    ];
    let lineIndex = 0;

    function typeLoader() {
        if (lineIndex < loaderLines.length) {
            loaderContent.innerHTML += loaderLines[lineIndex];
            if (loaderLines[lineIndex].includes('ip-address')) {
                fetch('https://api.ipify.org?format=json').then(r => r.json()).then(d => {
                    const id = `${d.ip}@kekkotech.com`;
                    document.getElementById('ip-address').textContent = d.ip;
                    if (promptSpan) promptSpan.textContent = `${id}:~$`;
                    document.title = id;
                    if (terminalTitle) terminalTitle.textContent = id;
                }).catch(() => { /* ...gestione errore... */ });
            }
            if (loaderLines[lineIndex].includes('date-time')) { /* ... */ }
            if (loaderLines[lineIndex].includes('last-visit')) { /* ... */ }
            lineIndex++;
            setTimeout(typeLoader, 400);
        } else {
            setTimeout(showTerminal, 1000);
        }
    }

    function showTerminal() {
        document.getElementById('loader').style.display = 'none';
        terminal.style.display = 'flex';
        // Non c'è un input field su cui fare focus
    }

    // CAMBIAMENTO: Logica per i pulsanti al posto dell'input
    commandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const command = this.dataset.command;
            // Mostra un prompt fittizio per coerenza
            const fakePrompt = promptSpan ? promptSpan.textContent : 'guest@kekkotech.com:~$';
            printToTerminal(`${fakePrompt} ${command}`);
            handleCommand(command);
        });
    });

    function handleCommand(command) {
        // La funzione handleCommand è identica a quella di main.js
        switch (command) {
            case 'help':
                printToTerminal('Comandi disponibili:');
                printToTerminal('- <span class="cmd">help</span>: Mostra questa lista.');
                printToTerminal('- <span class="cmd">aboutme</span>: Info su di me.');
                printToTerminal('- <span class="cmd">projects</span>: I miei progetti.');
                printToTerminal('- <span class="cmd">contacts</span>: Contattami.');
                printToTerminal('- <span class="cmd">cls</span>: Pulisce lo schermo.');
                break;
            case 'aboutme': printToTerminal('To be filled'); break;
            case 'projects': printToTerminal('To be filled'); break;
            case 'contacts': printToTerminal('Email: <a href="mailto:matteocheccacci@gmail.com">matteocheccacci@gmail.com</a>'); break;
            case 'cls': outputDiv.innerHTML = ''; break;
            default: printToTerminal(`Comando non trovato: ${command}`);
        }
    }

    function printToTerminal(message) {
        const p = document.createElement('p');
        p.innerHTML = message;
        outputDiv.appendChild(p);
        outputDiv.scrollTop = outputDiv.scrollHeight; // Scrolla in fondo
    }

    // Avvia tutto
    loadVersion();
    typeLoader();
});