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
    </main>
</body>