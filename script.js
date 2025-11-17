// const response = await fetch(`script.php`);
function fetchEvents () {
    $.getJSON("script.php", function(result) {
        console.log(result);
        result.forEach(function(item) {
            //console.log(item);
            
            const eventDiv = document.createElement('div');

            eventDiv.classList.add('event-item');
            eventDiv.setAttribute('draggable', 'true');
            eventDiv.innerHTML = `
                <span style='display: none'>${item.id}</span>
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
                    break;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
});


/* drag and drop */

let dragged = null;

let test = document.querySelectorAll('.content-body > div');

test.forEach(element => {
    console.log(element);
    const source = document.getElementById(element.id);
    const cible = document.getElementById(element.id);
    
    // DRAG START
    source.addEventListener("dragstart", (e) => {
        dragged = e.target;
        e.target.classList.add("dragging");
    });
    
    // DRAG END
    source.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging");
    });
    
    // DRAG OVER (obligatoire pour autoriser le drop)
    cible.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    
    // DROP
    cible.addEventListener("drop", (e) => {
        e.preventDefault();

        const form = document.createElement('form');
        form.method = 'GET';
        form.action = '/toDoList/script.php';
        
        // récupérer l'id depuis le span caché et déterminer le nouveau statut selon la cible
        const movedId = dragged?.querySelector('span')?.textContent?.trim() ?? dragged?.dataset?.id ?? dragged?.id ?? '';

        const containerId = e.currentTarget.id;
        let status = '';
        if (containerId.includes('a-faire')) {
            status = 'aFaire';
        } else if (containerId.includes('en-cours')) {
            status = 'enCours';
        } else if (containerId.includes('termine')) {
            status = 'termine';
        }

        // déplacer visuellement l'élément
        e.currentTarget.appendChild(dragged);

        // exposer des variables utilisées ensuite pour construire le form
        const taskId = movedId;
        const id = window.userId ?? document.body.dataset.userId ?? '';
        
        form.innerHTML = `
            <input type="hidden" name="taskId" value="${taskId}">
            <input type="hidden" name="taskStatus" value="${status}">
        `;

        document.body.appendChild(form);
        form.submit();
        //$("#content-body").load("script.php");
    });
});

