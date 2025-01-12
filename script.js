const TableauTaches = [];
const TableauTermine = [];

function AjouterTache() {
    const saisieTache = document.getElementById('saisieTache');
    const descriptionTache = saisieTache.value.trim();

    if (descriptionTache === '') {
        alert('Veuillez entrer une description de tâche.');
        return;
    }

    TableauTaches.push(descriptionTache);
    TableauTermine.push(false);
    console.log(TableauTaches);
    AjouterTacheHTML(descriptionTache);

    saisieTache.value = '';
}

function AjouterTacheHTML(item) {
    let table = document.querySelector('table');

    if (!table) {
        table = document.createElement('table');
        const caption = document.createElement('caption');
        caption.textContent = 'Liste des tâches';
        table.appendChild(caption);

        const thead = document.createElement('thead');
        const ligneEntete = document.createElement('tr');

        const colonneCheckbox = document.createElement('th');
        colonneCheckbox.textContent = 'Terminée';
        colonneCheckbox.style.width = '10px';

        const colonneNumero = document.createElement('th');
        colonneNumero.textContent = 'Numéro';
        colonneNumero.style.width = '10px';

        const colonneLibelle = document.createElement('th');
        colonneLibelle.textContent = 'Libellé';

        const colonneAction = document.createElement('th');
        colonneAction.textContent = 'Action';

        ligneEntete.appendChild(colonneCheckbox);
        ligneEntete.appendChild(colonneNumero);
        ligneEntete.appendChild(colonneLibelle);
        ligneEntete.appendChild(colonneAction);
        thead.appendChild(ligneEntete);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        document.body.appendChild(table);
    }

    const tbody = table.querySelector('tbody');
    const ligne = document.createElement('tr');

    const celluleCheckbox = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = TableauTaches.length - 1;
    checkbox.addEventListener('change', Cocher);
    celluleCheckbox.appendChild(checkbox);

    const celluleNumero = document.createElement('td');
    celluleNumero.textContent = TableauTaches.length;
    celluleNumero.style.textAlign = 'center';

    const celluleLibelle = document.createElement('td');
    celluleLibelle.textContent = item;

    const celluleAction = document.createElement('td');
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = 'Supprimer';
    boutonSupprimer.className = 'supprimerBouton';
    boutonSupprimer.addEventListener('click', () => SupprimerTache(ligne, TableauTaches.length - 1));
    celluleAction.appendChild(boutonSupprimer);

    ligne.appendChild(celluleCheckbox);
    ligne.appendChild(celluleNumero);
    ligne.appendChild(celluleLibelle);
    ligne.appendChild(celluleAction);
    tbody.appendChild(ligne);

    console.log('Tableau trouvé (ou null) :', table);
}

function Cocher(event) {
    const identifiantCase = parseInt(event.target.id);
    TableauTermine[identifiantCase] = event.target.checked;

    const tousLesTD = document.querySelectorAll('td');
    console.log(tousLesTD);

    const texteBrut = tousLesTD[(identifiantCase * 4) + 2].innerText;

    if (event.target.checked) {
        tousLesTD[(identifiantCase * 4) + 2].innerHTML = `<span class='terminee'>${texteBrut}</span>`;
    } else {
        tousLesTD[(identifiantCase * 4) + 2].innerHTML = texteBrut;
    }
}

function SupprimerTache(ligne, index) {
    ligne.remove();
    TableauTaches.splice(index, 1);
    TableauTermine.splice(index, 1);
    console.log('Tâche supprimée :', TableauTaches);
    ReorganiserNumeros();
}

function ReorganiserNumeros() {
    const lignes = document.querySelectorAll('tbody tr');
    lignes.forEach((ligne, index) => {
        const celluleNumero = ligne.querySelector('td:nth-child(2)');
        celluleNumero.textContent = index + 1;

        const checkbox = ligne.querySelector('input[type="checkbox"]');
        checkbox.id = index;
    });
}

function FiltrerTaches(event) {
    const filtre = event.target.value;
    const lignes = document.querySelectorAll('tbody tr');

    lignes.forEach((ligne, index) => {
        const estTerminee = TableauTermine[index];

        if (filtre === 'toutes') {
            ligne.style.display = '';
        } else if (filtre === 'terminees' && estTerminee) {
            ligne.style.display = '';
        } else if (filtre === 'nonTerminees' && !estTerminee) {
            ligne.style.display = '';
        } else {
            ligne.style.display = 'none';
        }
    });
}

// document.getElementById('ajouterTacheBouton').addEventListener('click', AjouterTache);
// document.getElementById('filtrerTaches').addEventListener('change', FiltrerTaches);