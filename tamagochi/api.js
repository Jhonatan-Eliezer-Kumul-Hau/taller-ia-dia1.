// Estado del Tamagotchi
let tacoState = {
    name: "Taco",
    hunger: 50,      // 0-100 (más alto = más hambriento)
    energy: 50,      // 0-100 (más alto = más energía)
    happiness: 50    // 0-100 (más alto = más feliz)
};

// Referencias a elementos del DOM
const hungerBar = document.getElementById('hunger-bar');
const energyBar = document.getElementById('energy-bar');
const happinessBar = document.getElementById('happiness-bar');

const hungerValue = document.getElementById('hunger-value');
const energyValue = document.getElementById('energy-value');
const happinessValue = document.getElementById('happiness-value');

const petThought = document.getElementById('pet-thought');
const catEmoji = document.querySelector('.cat-emoji');

const feedBtn = document.getElementById('feed-btn');
const sleepBtn = document.getElementById('sleep-btn');
const playBtn = document.getElementById('play-btn');

// Función para actualizar la interfaz
function updateUI() {
    // Actualizar barras de estado
    hungerBar.style.width = tacoState.hunger + '%';
    energyBar.style.width = tacoState.energy + '%';
    happinessBar.style.width = tacoState.happiness + '%';

    // Actualizar valores numéricos
    hungerValue.textContent = tacoState.hunger;
    energyValue.textContent = tacoState.energy;
    happinessValue.textContent = tacoState.energy;

    // Actualizar pensamiento de Taco
    updateThought();
}

// Función para determinar qué piensa Taco
function updateThought() {
    let thought = "";
    let emoji = "🐱";

    // Prioridad: hambre > energía > felicidad
    if (tacoState.hunger > 70) {
        thought = "¡Tengo hambre! 🍖";
        emoji = "😿";
    } else if (tacoState.energy < 30) {
        thought = "Estoy cansado... 😴";
        emoji = "😪";
    } else if (tacoState.happiness > 70) {
        thought = "¡Estoy feliz! 💖";
        emoji = "😺";
    } else if (tacoState.happiness < 30) {
        thought = "Estoy aburrido... 😔";
        emoji = "😿";
    } else if (tacoState.hunger < 30 && tacoState.energy > 70) {
        thought = "¡Me siento genial! ✨";
        emoji = "😸";
    } else {
        thought = "Todo está bien 😊";
        emoji = "🐱";
    }

    petThought.textContent = thought;
    catEmoji.textContent = emoji;
}

// Función para alimentar a Taco
function feedTaco() {
    tacoState.hunger = Math.max(0, tacoState.hunger - 30);
    tacoState.happiness = Math.min(100, tacoState.happiness + 10);
    tacoState.energy = Math.max(0, tacoState.energy - 5);

    showFeedback("¡Ñam ñam! 🍖", "feed");
    updateUI();
}

// Función para hacer dormir a Taco
function sleepTaco() {
    tacoState.energy = Math.min(100, tacoState.energy + 40);
    tacoState.hunger = Math.min(100, tacoState.hunger + 15);
    tacoState.happiness = Math.max(0, tacoState.happiness - 5);

    showFeedback("Zzz... 😴", "sleep");
    updateUI();
}

// Función para jugar con Taco
function playTaco() {
    tacoState.happiness = Math.min(100, tacoState.happiness + 30);
    tacoState.energy = Math.max(0, tacoState.energy - 20);
    tacoState.hunger = Math.min(100, tacoState.hunger + 10);

    showFeedback("¡Weee! 🎾", "play");
    updateUI();
}

// Función para mostrar feedback visual
function showFeedback(message, type) {
    const container = document.getElementById('container');
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.textContent = message;
    feedback.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 15px 30px;
        border-radius: 15px;
        font-weight: 600;
        font-size: 1.2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: fadeInOut 1.5s ease;
    `;

    // Agregar estilos de animación si no existen
    if (!document.getElementById('feedback-animation')) {
        const style = document.createElement('style');
        style.id = 'feedback-animation';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }

    container.style.position = 'relative';
    container.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 1500);
}

// Función para simular el paso del tiempo
function simulateTime() {
    // Cada 5 segundos, Taco tiene más hambre y menos energía
    tacoState.hunger = Math.min(100, tacoState.hunger + 2);
    tacoState.energy = Math.max(0, tacoState.energy - 1);
    tacoState.happiness = Math.max(0, tacoState.happiness - 1);

    updateUI();
}

// Event listeners para los botones
feedBtn.addEventListener('click', feedTaco);
sleepBtn.addEventListener('click', sleepTaco);
playBtn.addEventListener('click', playTaco);

// Inicializar la interfaz
updateUI();

// Simular el paso del tiempo cada 5 segundos
setInterval(simulateTime, 5000);
