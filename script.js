// const response = await fetch(`script.php`);
$.getJSON("script.php", function(result) {
  console.log(result);
  result.forEach(function(item) {
    console.log(item);
    
    const eventDiv = document.createElement('div');

    eventDiv.classList.add('event-item');
    eventDiv.innerHTML = `
        <p><strong>description : ${item.description}</strong></p>
        <p>date limite : ${item.date_fin}</p>
    `;

    // filtrage selon le statut et insertion dans le conteneur approprié
    switch (item.status) {
        case 'aFaire': {
            const eventContainer = document.getElementById('event-a-faire-container');
            eventContainer.appendChild(eventDiv);
            break;
        }
        case 'enCours': {
            const eventContainer = document.getElementById('event-en-cours-container');
            eventContainer.appendChild(eventDiv);
            break;
        }
        case 'termine': {
            const eventContainer = document.getElementById('event-termine-container');
            eventContainer.appendChild(eventDiv);
            break;
        }
        default:
            // statut inconnu — rien à faire
            break;
    }
  });
});
