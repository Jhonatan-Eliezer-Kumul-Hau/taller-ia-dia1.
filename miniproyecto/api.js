// Dog API Base URL
const API_BASE_URL = 'https://dog.ceo/api';

// DOM Elements
const searchInput = document.getElementById('searchinput');
const searchBtn = document.getElementById('SearchBtn');
const container = document.getElementById('container');

// Function to show loading message
function showLoading() {
    container.innerHTML = '<div class="loading">🐕 Cargando perros adorables...</div>';
}

// Function to show error message
function showError(message) {
    container.innerHTML = `<div class="error">❌ ${message}</div>`;
}

// Function to create a dog card
function createDogCard(imageUrl, breedName, dogName = null) {
    const card = document.createElement('div');
    card.className = 'dog-card';

    const displayName = dogName || '<span class="no-data">---</span>';
    const displayBreed = breedName || '<span class="no-data">---</span>';

    card.innerHTML = `
        <img src="${imageUrl}" alt="${breedName || 'Perro'}">
        <div class="dog-info">
            <h3 class="dog-name">Nombre: ${displayName}</h3>
            <p class="dog-breed">Raza: ${displayBreed}</p>
        </div>
    `;

    return card;
}

// Function to fetch all breeds from API
async function fetchAllBreeds() {
    try {
        const response = await fetch(`${API_BASE_URL}/breeds/list/all`);
        const data = await response.json();

        if (data.status === 'success') {
            return data.message;
        }
        return {};
    } catch (error) {
        console.error('Error fetching breeds:', error);
        return {};
    }
}

// Function to search breeds by first letter or full name
async function searchBreedsByLetter(searchTerm) {
    showLoading();

    try {
        const allBreeds = await fetchAllBreeds();
        const searchLower = searchTerm.toLowerCase().trim();

        // Filter breeds that start with the search term or match exactly
        const matchingBreeds = Object.keys(allBreeds).filter(breed => {
            return breed.startsWith(searchLower);
        });

        if (matchingBreeds.length === 0) {
            showError(`No se encontraron razas que comiencen con "${searchTerm}". Intenta con otra letra.`);
            return;
        }

        // Fetch images from matching breeds (limit to first 6 breeds to avoid too many requests)
        const breedsToFetch = matchingBreeds.slice(0, 6);
        const imagePromises = breedsToFetch.map(async (breed) => {
            try {
                const response = await fetch(`${API_BASE_URL}/breed/${breed}/images/random/2`);
                const data = await response.json();

                if (data.status === 'success') {
                    return data.message.map(imageUrl => ({
                        imageUrl,
                        breedName: breed
                    }));
                }
                return [];
            } catch (error) {
                console.error(`Error fetching ${breed}:`, error);
                return [];
            }
        });

        const results = await Promise.all(imagePromises);
        const dogs = results.flat();

        if (dogs.length === 0) {
            showError('No se pudieron cargar imágenes. Intenta de nuevo.');
            return;
        }

        displayDogsArray(dogs);
    } catch (error) {
        showError('Error al buscar razas. Por favor, intenta de nuevo.');
        console.error('Error:', error);
    }
}

// Function to fetch random dogs (mixed breeds)
async function fetchRandomDogs() {
    showLoading();

    try {
        // Get multiple random images
        const promises = [];
        for (let i = 0; i < 12; i++) {
            promises.push(fetch(`${API_BASE_URL}/breeds/image/random`));
        }

        const responses = await Promise.all(promises);
        const dataPromises = responses.map(response => response.json());
        const results = await Promise.all(dataPromises);

        const dogs = results.map(result => {
            if (result.status === 'success') {
                // Extract breed name from URL
                const urlParts = result.message.split('/');
                const breedIndex = urlParts.indexOf('breeds') + 1;
                let breedName = urlParts[breedIndex];

                // Handle sub-breeds (e.g., "bulldog-french" -> "French Bulldog")
                if (breedName.includes('-')) {
                    const parts = breedName.split('-');
                    breedName = `${parts[1]} ${parts[0]}`;
                }

                return {
                    imageUrl: result.message,
                    breedName: breedName
                };
            }
            return null;
        }).filter(dog => dog !== null);

        displayDogsArray(dogs);
    } catch (error) {
        showError('Error al cargar las imágenes. Por favor, intenta de nuevo.');
        console.error('Error:', error);
    }
}

// Function to display dogs from random search
function displayDogsArray(dogs) {
    container.innerHTML = '';

    if (dogs.length === 0) {
        showError('No se pudieron cargar las imágenes.');
        return;
    }

    dogs.forEach(dog => {
        const card = createDogCard(dog.imageUrl, dog.breedName);
        container.appendChild(card);
    });
}

// Function to handle search
function handleSearch() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        // If search is empty, show random dogs
        fetchRandomDogs();
    } else {
        // Search for breeds starting with the letter(s)
        searchBreedsByLetter(searchTerm);
    }
}

// Event Listeners
searchBtn.addEventListener('click', handleSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Load random dogs on page load
window.addEventListener('DOMContentLoaded', () => {
    fetchRandomDogs();
});
