// const response = await fetch(`script.php`);
function fetchEvents () {
    $.getJSON("script.php", function(result) {
        console.log(result);
        result.forEach(function(item) {
            //console.log(item);
            
            const eventDiv = document.createElement('div');
            if (item.date_fin === null) {item.date_fin = ''};

            eventDiv.classList.add('event-item');
            eventDiv.setAttribute('draggable', 'true');
            eventDiv.innerHTML = `
                <span style='display: none'>${item.id}</span>
                <div style='display: flex; justify-content: space-between; align-items: center;'>
                    <p><strong>${item.description}</strong></p>
                    <button class='settings-button' name='settings-button' data-task-id='${item.id}' style='font-size: 22px; cursor: pointer;'>⚙</button>
                </div>
                <p>${item.date_fin}</p>
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



// ouvrir button settings
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.settings-button');
    if (!btn) return;

    // obtenir id de l'event
    const taskId = btn.dataset.taskId ?? btn.closest('.event-item')?.querySelector('span')?.textContent?.trim() ?? '';
    // obtenir date de l'event
    const taskDate = btn.closest('.event-item')?.querySelectorAll('p')[1]?.textContent?.trim() ?? '';
    // obtenir description de l'event
    const taskDescription = btn.closest('.event-item')?.querySelectorAll('p')[0]?.textContent?.trim() ?? '';
    console.log('settings clicked', { taskId, button: btn, taskDate, taskDescription });

    const modal = document.getElementById("settings-modal");
    const rect = btn.getBoundingClientRect();

    // gérer positionnement modale
    const offsetX = -35;
    const offsetY = 80;

    modal.style.position = 'absolute'; // ou 'fixed' selon ton besoin
    modal.style.top  = (rect.bottom + window.scrollY + offsetY) + "px";
    modal.style.left = (rect.left   + window.scrollX + offsetX) + "px";
    modal.style.display = "flex";


    // configurer bouton suppression
    const deleteBtn = document.getElementById("delete-event");
    deleteBtn.onclick = function() {
        // validation avant suppression
        const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
        if (!confirmDelete) {
            return;
        }
        
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = '/toDoList/script.php';

        form.innerHTML = `
            <input type="hidden" name="deleteTaskId" value="${taskId}">
        `;

        document.body.appendChild(form);
        form.submit();
    }

    // configurer bouton mise à jour
    const updateBtn = document.getElementById("update-event");
    updateBtn.onclick = function() {
        const updateModal = document.getElementById("update-modal");
        updateModal.style.display = "flex";

        const updateForm = document.getElementById("update-form");
        updateForm.elements["update-event-id"].value = taskId;
        updateForm.elements["update-event-title"].value = taskDescription;
        updateForm.elements["update-event-date"].value = taskDate;
    }
});


// fermer modale au clic en dehors
window.addEventListener('click', function(e) {
    const modal = document.getElementById("settings-modal");
    if (e.target.closest('.settings-button') || e.target.closest('#settings-modal')) {
        return;
    }
    modal.style.display = "none";
});

//fermer modale lorsque echap est pressée
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const settingsModal = document.getElementById("settings-modal");
        settingsModal.style.display = "none";

        const updateModal = document.getElementById("update-modal");
        updateModal.style.display = "none";
    }
});


// fermer modale update au clic sur croix
const closeUpdateModalBtn = document.getElementById('update-modal-close');
closeUpdateModalBtn.addEventListener('click', function() {
    const updateModal = document.getElementById("update-modal");
    updateModal.style.display = "none";
}); 

const checkboxDateForm = document.getElementById('update-set-time-limit');
checkboxDateForm.addEventListener('change', function() {
    const dateInput = document.getElementById('update-event-date');
    if (this.checked) {
        dateInput.disabled = true;
        dateInput.style.backgroundColor = '#e0e0e0';
        console.log('checkbox checked');
    } else {
        dateInput.disabled = false;
        dateInput.style.backgroundColor = '';
        console.log('checkbox unchecked');
    }
});
