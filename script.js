// const response = await fetch(`script.php`);
function fetchEvents () {
    $.getJSON("script.php", function(result) {
        console.log(result);
        result.forEach(function(item) {
            console.log(item);
            
            const eventDiv = document.createElement('div');

            eventDiv.classList.add('event-item');
            eventDiv.classList.add("dropzone");
            eventDiv.setAttribute('draggable', 'true');
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
                    break;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
});



/* test */  



/* drag and drop functionality */
let dragged;

const source = document.getElementById("draggable");

source.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.classList.add("dragging");
});

source.addEventListener("dragend", (event) => {
  // reset the transparency
  event.target.classList.remove("dragging");
});

/* events fired on the drop targets */
const target = document.getElementById("en-cours-column");
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
});
