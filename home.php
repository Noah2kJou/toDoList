<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js" defer></script>
</head>
<body>
    <header>
        <h1>To do</h1>
    </header>
    <main>
        <div id="main-container" class="main-container">
            <div id="content-header" class="content-header">
                <form action="script.php" method="GET">
                    <input type="text" id="new-event-title" name="new-event-title" placeholder="Titre de l'événement" required>

                    <label for="set-time-limit">Définir une limite de temps</label>
                    <input type="checkbox" id="set-time-limit" name="set-time-limit">

                    <input type="datetime-local" id="new-event-date" name="new-event-date">
                    <button type="submit" id="add-event-button" class="add-event-button">+ Ajouter un événement</button>
                </form>
            </div>
            <div id="content-body" class="content-body">
                <div id="a-faire-column" class="a-faire-column">
                    <h2>A faire</h2>
                    <span>--------------------------------</span>
                    <div id="event-a-faire-container" class="event-a-faire-container">
                        <!-- les événements à faire -->
                    </div>
                </div>
                <div id="en-cours-column" class="en-cours-column">
                    <h2>En cours</h2>
                    <span>--------------------------------</span>
                    <div id="event-en-cours-container" class="event-en-cours-container">
                        <!-- les événements en cours -->
                    </div>
                </div>
                <div id="termine-column" class="termine-column">
                    <h2>Terminé</h2>
                    <span>--------------------------------</span>
                    <div id="event-termine-container" class="event-termine-container">
                        <!-- les événements terminés -->
                    </div>  
                </div>
            </div>
        </div>
        <div id="settings-modal" class="settings-modal">
            <button id="update-event" class="update-event">Modifier</button>
            <button id="delete-event" class="delete-event">Supprimer</button>
        </div>
        <div id="update-modal" class="update-modal" style="display: none;">
            <button id="update-modal-close" class="update-modal-close" style="position: absolute; top: 10px; right: 10px;">X</button>
            <form id="update-form" class="update-form" action="script.php" method="GET">
                <label for="update-event-title">Modifier le titre de l'événement :</label>
                <input type="text" id="update-event-title" name="update-event-title" required>

                <input type="datetime-local" id="update-event-date" name="update-event-date">

                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <label for="update-set-time-limit">Retirer la limite de temps</label>
                    <input type="checkbox" id="update-set-time-limit" name="update-set-time-limit">
                </div>

                <input type="hidden" id="update-event-id" name="update-event-id">

                <button type="submit" id="submit-update-button" class="submit-update-button">Enregistrer les modifications</button>
            </form>
        </div>

    </main>
</body>