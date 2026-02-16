// ===============================
// VARIÁVEIS DO PERSONAGEM
// ===============================

let age = 0;
let happiness = 100;
let health = 100;
let isAlive = true;

// ===============================
// GERAR NASCIMENTO
// ===============================

function generateBirth() {

    let birthDay = Math.floor(Math.random() * 28) + 1;
    let birthMonth = Math.floor(Math.random() * 12) + 1;
    let birthYear = 2026;

    const zodiacSigns = [
        "Capricórnio", "Aquário", "Peixes", "Áries",
        "Touro", "Gêmeos", "Câncer", "Leão",
        "Virgem", "Libra", "Escorpião", "Sagitário"
    ];

    let zodiac = zodiacSigns[birthMonth - 1];

    const familyTypes = [
        "Você nasceu em uma família com mãe e pai 👨‍👩‍👧",
        "Você nasceu em uma família com duas mães 👩‍👩‍👧",
        "Você nasceu em uma família com dois pais 👨‍👨‍👦",
        "Você nasceu com uma mãe solteira 👩",
        "Você nasceu com um pai solteiro 👨"
    ];

    const birthTypes = [
        "Seu nascimento foi natural.",
        "Você nasceu por fertilização in vitro.",
        "Você foi adotado.",
        "Você nasceu de uma gravidez acidental."
    ];

    let familyType = familyTypes[Math.floor(Math.random() * familyTypes.length)];
    let birthType = birthTypes[Math.floor(Math.random() * birthTypes.length)];

    document.getElementById("birthInfo").innerHTML =
        `${familyType}<br>
         ${birthType}<br>
         📅 Data de nascimento: ${birthDay}/${birthMonth}/${birthYear}<br>
         ♈ Signo: ${zodiac}`;
}

// ===============================
// ATUALIZAR BARRAS
// ===============================

function updateBars() {
    document.getElementById("happinessBar").style.width = happiness + "%";
    document.getElementById("healthBar").style.width = health + "%";
}

// ===============================
// GERAR EVENTOS
// ===============================

function generateEvent() {

    const events = [
        "Você fez um novo amigo 😊",
        "Você ficou doente 🤒",
        "Você ganhou dinheiro 💰",
        "Você brigou com alguém 😡",
        "Você teve um dia incrível 🌟"
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    document.getElementById("event").innerHTML = randomEvent;
}

// ===============================
// ENVELHECER
// ===============================

function ageUp() {

    if (!isAlive) return;

    age++;

    let randomHappiness = Math.floor(Math.random() * 10);
    let randomHealth = Math.floor(Math.random() * 8);

    happiness -= randomHappiness;
    health -= randomHealth;

    if (happiness < 0) happiness = 0;
    if (health < 0) health = 0;

    document.getElementById("age").textContent = age;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("health").textContent = health;

    updateBars();
    generateEvent();

    if (health <= 0) {
        document.getElementById("event").innerHTML = "💀 Você morreu!";
        isAlive = false;
    }
}

// ===============================
// INICIAR JOGO
// ===============================

window.onload = function () {
    generateBirth();
    updateBars();
};

