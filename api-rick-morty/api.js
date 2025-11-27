// URL base de la API de Rick and Morty
const API_URL = 'https://rickandmortyapi.com/api/character';

// Obtener referencias a los elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const container = document.getElementById('container');

// Función para obtener personajes de la API
async function fetchCharacters(name = '') {
    try {
        // Mostrar mensaje de carga
        container.innerHTML = '<div class="loading">Cargando personajes...</div>';

        // Construir URL con parámetro de búsqueda si existe
        const url = name ? `${API_URL}?name=${encodeURIComponent(name)}` : API_URL;

        // Realizar petición a la API
        const response = await fetch(url);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('No se encontraron personajes');
        }

        // Convertir respuesta a JSON
        const data = await response.json();

        // Mostrar los personajes
        displayCharacters(data.results);

    } catch (error) {
        // Mostrar mensaje de error
        container.innerHTML = `<div class="error">❌ ${error.message}. Intenta con otro nombre.</div>`;
    }
}

// Función para mostrar los personajes en el DOM
function displayCharacters(characters) {
    // Limpiar el contenedor
    container.innerHTML = '';

    // Verificar si hay personajes
    if (!characters || characters.length === 0) {
        container.innerHTML = '<div class="error">No se encontraron personajes</div>';
        return;
    }

    // Crear una tarjeta para cada personaje
    characters.forEach(character => {
        const card = createCharacterCard(character);
        container.appendChild(card);
    });
}

// Función para crear una tarjeta de personaje
function createCharacterCard(character) {
    // Crear elemento de tarjeta
    const card = document.createElement('div');
    card.className = 'character-card';

    // Determinar la clase de estado
    const statusClass = character.status.toLowerCase();

    // Construir el HTML de la tarjeta
    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <div class="character-info">
            <div class="character-name">${character.name}</div>
            <div class="character-detail">
                <strong>Estado:</strong>
                <span class="status ${statusClass}">${character.status}</span>
            </div>
            <div class="character-detail">
                <strong>Especie:</strong> ${character.species}
            </div>
            <div class="character-detail">
                <strong>Ubicación:</strong> ${character.location.name}
            </div>
        </div>
    `;

    return card;
}

// Event listener para el botón de búsqueda
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    fetchCharacters(searchTerm);
});

// Event listener para buscar al presionar Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        fetchCharacters(searchTerm);
    }
});

// Cargar personajes iniciales al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters();
});
