document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi principali
    const loaderContent = document.querySelector('.loader-content');
    const terminal = document.getElementById('terminal');
    const outputDiv = document.getElementById('output');
    const terminalTitle = document.getElementById('terminal-window-title');
    const commandButtons = document.querySelectorAll('.mobile-command');

    // Variabile per conservare l'identificativo dell'utente (IP o guest)
    let userIdentifier = 'guest@kekkotech.com';

    // --- LOGICA PER SIMULARE LA CHIUSURA DEL TERMINALE ---
    const closeButton = document.querySelector('.terminal-button.close');
    if (closeButton && terminal) {
        closeButton.addEventListener('click', function() {
            terminal.style.display = 'none';
            const exitMessage = document.createElement('p');
            exitMessage.style.color = '#0F0';
            exitMessage.style.textAlign = 'center';
            exitMessage.style.marginTop = '40px';
            exitMessage.textContent = '[Sessione terminata]';
            document.body.appendChild(exitMessage);
        });
    }

    const loaderLines = [
        `<pre>
        /////////////////////////////////////////////////
        //                                             //
        //   K  E  K  K  O  T  E  C  H  .  C  O  M     //
        //                                             //
        /////////////////////////////////////////////////
</pre>`,
        '<p>Avvio di KekkOS Mobile in corso...</p>',
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
                fetch('https://api.ipify.org?format=json')
                    .then(response => response.json())
                    //sono state fatte delle modifiche per mostrare un title uguale sempre. rinominare per mostrare ip@kekkotech.com
                    .then(data => {
                        ipuserIdentifier = `${data.ip}@kekkotech.com`; // Salva l'identificativo
                        userIdentifier = `KekkOS Mobile | kekkotech.com`
                        document.getElementById('ip-address').textContent = data.ip;
                        document.title = userIdentifier; // Titolo della scheda del browser
                        if (terminalTitle) terminalTitle.textContent = 'KekkOS Mobile'; // Titolo della finestra del terminale
                    })
                    .catch(() => {
                        // In caso di errore, userIdentifier rimane 'guest@kekkotech.com'
                        ipuserIdentifier = 'guest@kekkotech.com';
                        userIdentifier = `KekkOS Mobile | kekkotech.com`
                        document.getElementById('ip-address').textContent = 'non disponibile';
                        document.title = userIdentifier;
                        if (terminalTitle) terminalTitle.textContent = 'KekkOS Mobile';
                    });
            }
            if (loaderLines[lineIndex].includes('date-time')) {
                const now = new Date();
                document.getElementById('date-time').textContent = now.toLocaleString('it-IT');
            }
            if (loaderLines[lineIndex].includes('last-visit')) {
                const lastVisit = localStorage.getItem('kekkotech_last_visit');
                document.getElementById('last-visit').textContent = lastVisit || 'mai';
                localStorage.setItem('kekkotech_last_visit', new Date().toLocaleString('it-IT'));
            }

            lineIndex++;
            setTimeout(typeLoader, 400);
        } else {
            setTimeout(showTerminal, 1000);
        }
    }

    function showTerminal() {
        document.getElementById('loader').style.display = 'none';
        terminal.style.display = 'flex';
        printToTerminal('Benvenuto su kekkotech.com!')
    }

    commandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const command = this.dataset.command;
            const promptText = `${userIdentifier}:~$`; // Usa l'identificativo salvato
            printToTerminal(`${promptText} ${command}`);
            handleCommand(command);
        });
    });

    function handleCommand(command) {
        switch (command) {
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
        outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    // Avvia la sequenza di caricamento
    typeLoader();
});