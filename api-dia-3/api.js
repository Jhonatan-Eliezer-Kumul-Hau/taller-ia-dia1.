// Función para obtener datos del Pokémon desde la PokeAPI
function obtenerPokemonAPI(nombrePokemon) {
    // Mostrar loading
    mostrarLoading(true);
    ocultarError();
    ocultarCard();

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            mostrarPokemon(data);
            mostrarLoading(false);
        })
        .catch(error => {
            console.error('Error al obtener el Pokémon:', error.message);
            mostrarError('No se encontró el Pokémon. Intenta con otro nombre o número.');
            mostrarLoading(false);
        });
}

// Función para mostrar los datos del Pokémon en la tarjeta
function mostrarPokemon(pokemon) {
    // Mostrar la tarjeta
    const card = document.getElementById('pokemonCard');
    card.classList.add('show');

    // Imagen del Pokémon
    const imagen = document.getElementById('pokemonImage');
    imagen.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    imagen.alt = pokemon.name;

    // Nombre del Pokémon
    const nombre = document.getElementById('pokemonName');
    nombre.textContent = pokemon.name;

    // ID del Pokémon
    const id = document.getElementById('pokemonId');
    id.textContent = `#${String(pokemon.id).padStart(3, '0')}`;

    // Tipos del Pokémon
    const tiposContainer = document.getElementById('pokemonTypes');
    tiposContainer.innerHTML = '';
    pokemon.types.forEach(typeInfo => {
        const typeBadge = document.createElement('span');
        typeBadge.className = `type-badge type-${typeInfo.type.name}`;
        typeBadge.textContent = typeInfo.type.name;
        tiposContainer.appendChild(typeBadge);
    });

    // Estadísticas del Pokémon
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = '';
    pokemon.stats.forEach(statInfo => {
        const statRow = document.createElement('div');
        statRow.className = 'stat-row';

        const statName = document.createElement('div');
        statName.className = 'stat-name';
        statName.textContent = statInfo.stat.name.replace('-', ' ');

        const statValue = document.createElement('div');
        statValue.className = 'stat-value';
        statValue.textContent = statInfo.base_stat;

        const statBarContainer = document.createElement('div');
        statBarContainer.className = 'stat-bar-container';

        const statBar = document.createElement('div');
        statBar.className = 'stat-bar';
        // Calcular el porcentaje (máximo típico es 255)
        const percentage = (statInfo.base_stat / 255) * 100;
        setTimeout(() => {
            statBar.style.width = `${percentage}%`;
        }, 100);

        statBarContainer.appendChild(statBar);
        statRow.appendChild(statName);
        statRow.appendChild(statValue);
        statRow.appendChild(statBarContainer);
        statsContainer.appendChild(statRow);
    });

    // Altura (convertir de decímetros a metros)
    const altura = document.getElementById('pokemonHeight');
    altura.textContent = `${(pokemon.height / 10).toFixed(1)} m`;

    // Peso (convertir de hectogramos a kilogramos)
    const peso = document.getElementById('pokemonWeight');
    peso.textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;

    // Experiencia base
    const experiencia = document.getElementById('pokemonExperience');
    experiencia.textContent = pokemon.base_experience;

    // Habilidades
    const habilidades = document.getElementById('pokemonAbilities');
    const habilidadesTexto = pokemon.abilities
        .map(ability => ability.ability.name)
        .join(', ');
    habilidades.textContent = habilidadesTexto;
}

// Función para mostrar/ocultar el loading
function mostrarLoading(mostrar) {
    const loading = document.getElementById('loading');
    if (mostrar) {
        loading.classList.add('show');
    } else {
        loading.classList.remove('show');
    }
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = mensaje;
    errorDiv.classList.add('show');
}

// Función para ocultar errores
function ocultarError() {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.classList.remove('show');
}

// Función para ocultar la tarjeta
function ocultarCard() {
    const card = document.getElementById('pokemonCard');
    card.classList.remove('show');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    // Buscar al hacer clic en el botón
    searchButton.addEventListener('click', () => {
        const pokemonName = searchInput.value.trim();
        if (pokemonName) {
            obtenerPokemonAPI(pokemonName);
        } else {
            mostrarError('Por favor, ingresa un nombre o número de Pokémon.');
        }
    });

    // Buscar al presionar Enter en el input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const pokemonName = searchInput.value.trim();
            if (pokemonName) {
                obtenerPokemonAPI(pokemonName);
            } else {
                mostrarError('Por favor, ingresa un nombre o número de Pokémon.');
            }
        }
    });

    // Limpiar error al escribir
    searchInput.addEventListener('input', () => {
        ocultarError();
    });
});
