// --- REDIRECT PER UTENTI MOBILE ---
(function() {
    // Espressione regolare per rilevare i dispositivi mobili più comuni
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Se rileva un mobile, reindirizza alla pagina mobile.html
        window.location.href = "mobile.html";
    }
})();


// --- CODICE PER LA VERSIONE DESKTOP ---
document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi principali
    const loaderContent = document.querySelector('.loader-content');
    const terminal = document.getElementById('terminal');
    const inputField = document.getElementById('input');
    const outputDiv = document.getElementById('output');
    const promptSpan = document.getElementById('prompt');
    const terminalTitle = document.getElementById('terminal-window-title');

    // --- LOGICA PER SIMULARE LA CHIUSURA DEL TERMINALE ---
    const closeButton = document.querySelector('.terminal-button.close');
    if (closeButton && terminal) {
        closeButton.addEventListener('click', function() {
            terminal.style.display = 'none';
            const exitMessage = document.createElement('p');
            exitMessage.style.color = '#0F0';
            exitMessage.style.textAlign = 'center';
            exitMessage.style.marginTop = '40px';
            exitMessage.textContent = '[Session stopped]';
            document.body.appendChild(exitMessage);
        });
    }

    //Loading screen
    const loaderLines = [
        `<pre>
        /////////////////////////////////////////////////
        //                                             //
        //   K  E  K  K  O  T  E  C  H  .  C  O  M     //
        //                                             //
        /////////////////////////////////////////////////
</pre>`,
        '<p>KekkOS is starting...</p>',
        '<p>Session initialization...</p>',
        '<p>Connection from: <span id="ip-address">loading...</span></p>',
        '<p>Date and time: <span id="date-time">loading...</span></p>',
        '<p>Last visit: <span id="last-visit">never</span></p>',
        '<br>',
        '<p>Loading completed.</p>'
    ];

    let lineIndex = 0;

    //function loading screen
    function typeLoader() {
        if (lineIndex < loaderLines.length) {
            loaderContent.innerHTML += loaderLines[lineIndex];

            // Aggiorna dinamicamente il contenuto
            if (loaderLines[lineIndex].includes('ip-address')) {
                fetch('https://api.ipify.org?format=json')
                    .then(response => response.json())
                    .then(data => {
                        const promptIdentifier = `${data.ip}@kekkotech.com`;
                        document.getElementById('ip-address').textContent = data.ip;
                        if (promptSpan) promptSpan.textContent = `${promptIdentifier}:~$`;
                        if (terminalTitle) terminalTitle.textContent = 'KekkOS';
                        document.title = 'kekkotech';
                    }).catch(() => {
                        const promptIdentifier = 'guest@kekkotech.com';
                        document.getElementById('ip-address').textContent = 'non disponibile';
                        if (promptSpan) promptSpan.textContent = `${promptIdentifier}:~$`;
                        if (terminalTitle) terminalTitle.textContent = 'KekkOS';
                        document.title = 'kekkotech';
                    });
            }
            if (loaderLines[lineIndex].includes('date-time')) {
                const now = new Date();
                document.getElementById('date-time').textContent = now.toLocaleString('it-IT');
            }
            if (loaderLines[lineIndex].includes('last-visit')) {
                const lastVisit = localStorage.getItem('kekkotech_last_visit');
                document.getElementById('last-visit').textContent = lastVisit || 'mai';
                localStorage.setItem('kekkotech_last_visit', new Date().toLocaleString('EN'));
            }

            lineIndex++;
            setTimeout(typeLoader, 400);
        } else {
            setTimeout(showTerminal, 1000);
        }
    }

    function showTerminal() {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
        terminal.style.display = 'flex';
        inputField.focus();
        printToTerminal('Welcome on kekkotech.com!');
        printToTerminal('Type "help" to show the command list.');

        // --- Comando tramite URL ---
        const urlParams = new URLSearchParams(window.location.search);
        const commandFromUrl = urlParams.get('cmd');
        if (commandFromUrl) {
            printToTerminal(`${promptSpan.textContent} ${commandFromUrl}`);
            handleCommand(commandFromUrl);
        }
    }

    // --- Logica del Terminale ---
    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = inputField.value.trim().toLowerCase();
            if (command) {
                printToTerminal(`${promptSpan.textContent} ${command}`);
                handleCommand(command);
            }
            inputField.value = '';
        }
    });

    function handleCommand(command) {
        switch (command) {
            case 'help':
                printToTerminal('Commands:');
                printToTerminal('- <span class="cmd">help</span>: Shows this list.');
                printToTerminal('- <span class="cmd">aboutme</span>: Informations about me.');
                printToTerminal('- <span class="cmd">projects</span>: My principal projects.');
                printToTerminal('- <span class="cmd">contacts</span>: Contact me.');
                printToTerminal('- <span class="cmd">status</span>: Service status.');
                printToTerminal('- <span class="cmd">language</span>')
                printToTerminal('- <span class="cmd">cls</span>: Clean the screen.');
                break;
            case 'aboutme':
                printToTerminal('To be filled');
                break;
            
            case 'language':
                printToTerminal('Loading languages from: resources.services.kekkotech.com...');
                fetch('https://resources.services.kekkotech.com/languages/list.js')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(text => {
                        // Eseguiamo il codice JS per avere accesso alla variabile languageList
                        const languageList = eval(text + '; languageList');

                        if (languageList && languageList.length > 0) {
                            printToTerminal('Languages:');
                            languageList.forEach(language => {
                                printToTerminal('----------------------------------------');
                                printToTerminal(`Language: <span class="cmd">${language.lang}</span>`);
                                // Aggiungi un link cliccabile se l'Link non è "404"
                                if (project.info && project.info !== '404') {
                                    printToTerminal(`Link: <a href="${language.link}" target="_blank">Click here</a>`);
                                }
                            });
                            printToTerminal('----------------------------------------');
                        } else {
                            printToTerminal('No language found.');
                        }
                    })
                    .catch(error => {
                        printToTerminal(`Error while loading the languages list: ${error.message}.`);
                        printToTerminal('Check the console for further details.');
                        console.error(error);
                    });
                break;
                

            case 'projects':
                printToTerminal('Loading projects from: resources.services.kekkotech.com...');
                fetch('https://resources.services.kekkotech.com/downloads.kekkotech.com/project-list.js')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(text => {
                        // Eseguiamo il codice JS per avere accesso alla variabile projectList
                        const projectList = eval(text + '; projectList');

                        if (projectList && projectList.length > 0) {
                            printToTerminal('Projects:');
                            projectList.forEach(project => {
                                printToTerminal('----------------------------------------');
                                printToTerminal(`Name: <span class="cmd">${project.name}</span> (v${project.version})`);
                                printToTerminal(`Description: ${project.description}`);
                                printToTerminal(`Authors: ${project.authors}`);
                                // Aggiungi un link cliccabile se l'Link non è "404"
                                if (project.info && project.info !== '404') {
                                    printToTerminal(`Link: <a href="${project.info}" target="_blank">Click here</a>`);
                                }
                            });
                            printToTerminal('----------------------------------------');
                        } else {
                            printToTerminal('No projects found.');
                        }
                    })
                    .catch(error => {
                        printToTerminal(`Error while loading the projects list: ${error.message}.`);
                        printToTerminal('Check the console for further details.');
                        console.error(error);
                    });
                break;

            case 'status':
                const sites = ["kekkotech.com", "kekkotech.it","downloads.kekkotech.com", "resources.services.kekkotech.com"];
                printToTerminal("Verifying the services status...");

                const fetchPromises = sites.map(site => {
                    const statusPromise = fetch(`https://${site}/js/status.json`)
                        .then(response => {
                            if (!response.ok) {
                                return { status: 'offline' };
                            }
                            return response.json();
                        })
                        .then(data => ({
                            status: data.status
                        }))
                        .catch(error => ({
                            status: 'offline'
                        }));

                    const motdPromise = fetch(`https://resources.services.kekkotech.com/${site}/motd.json`)
                        .then(response => {
                            if (!response.ok) {
                                return { motd: '404 no MOTD data.' };
                            }
                            return response.json();
                        })
                        .catch(error => ({
                            motd: 'Error while loading MOTD.'
                        }));

                    return Promise.all([statusPromise, motdPromise])
                        .then(([statusResult, motdResult]) => ({
                            site: site,
                            status: statusResult.status,
                            motd: motdResult.motd
                        }));
                });

                Promise.all(fetchPromises)
                    .then(results => {
                        results.forEach(result => {
                            const output = `- Status of ${result.site}: ${result.status}. MOTD: ${result.motd}`;
                            printToTerminal(output);
                        });
                        printToTerminal("Check completed.");
                    })
                    .catch(error => {
                        printToTerminal(`Error.`);
                        console.error(error);
                    });
                break;

            case 'contacts': {
                printToTerminal('Email: <a href="mailto:matteocheccacci@gmail.com">matteocheccacci@gmail.com</a>');
                printToTerminal('Instagram: <a href="https://instagram.com/matteo.checcacci">@matteo.checcacci</a>');
                break;
            }
            case 'cls':
                outputDiv.innerHTML = '';
                break;
            default:
                printToTerminal(`Command not found: ${command}`);
        }
    }

    function printToTerminal(message) {
        const p = document.createElement('p');
        p.innerHTML = message;
        outputDiv.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Avvia la sequenza di caricamento
    typeLoader();
});
