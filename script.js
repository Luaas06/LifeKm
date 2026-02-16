// =============================
// VARIÁVEIS PRINCIPAIS
// =============================
let age = 0;
let happiness = 100;
let health = 100;
let isAlive = true;

// =============================
// SISTEMA DE NASCIMENTO
// =============================

let birthDay = Math.floor(Math.random() * 28) + 1;
let birthMonth = Math.floor(Math.random() * 12) + 1;

function getZodiac(day, month) {
    const zodiacSigns = [
        "Capricórnio", "Aquário", "Peixes", "Áries",
        "Touro", "Gêmeos", "Câncer", "Leão",
        "Virgem", "Libra", "Escorpião", "Sagitário"
    ];
    return zodiacSigns[month - 1];
}

let zodiac = getZodiac(birthDay, birthMonth);

// Tipos de família modernos
const familyTypes = [
    "Você nasceu em uma família com mãe e pai.",
    "Você nasceu em uma família com duas mães.",
    "Você nasceu em uma família com dois pais.",
    "Você nasceu com uma mãe solteira.",
    "Você nasceu com um pai solteiro."
];

let familyType = familyTypes[Math.floor(Math.random() * familyTypes.length)];

// Tipos de concepção
const birthTypes = [
    "Seu nascimento foi natural.",
    "Você nasceu por fertilização in vitro.",
    "Você foi adotado.",
    "Você nasceu de uma gravidez acidental."
];

let birthType = birthTypes[Math.floor(Math.random() * birthTypes.length)];

document.getElementById("birthInfo").innerHTML =
    `${familyType}<br>
     ${birthType}<br>
     📅 Data de nascimento: ${birthDay}/${birthMonth}<br>
     ♈ Signo: ${zodiac}`;


// =============================
// ENVELHECER
// =============================

function ageUp() {

    if (!isAlive) return;

    age++;

    const randomHappiness = Math.floor(Math.random() * 10);
    const randomHealth = Math.floor(Math.random() * 8);

    happiness -= randomHappiness;
    health -= randomHealth;

    if (happiness < 0) happiness = 0;
    if (health < 0) health = 0;

    updateStatus();
    generateEvent();

    if (health <= 0) {
        isAlive = false;
        document.getElementById("event").innerHTML = "💀 Você morreu!";
    }
}


// =============================
// EVENTOS
// =============================

function generateEvent() {

    if (!isAlive) return;

    const events = [
        "Você fez um novo amigo 😊",
        "Você ficou doente 🤒",
        "Seus pais discutiram 😢",
        "Você teve um dia incrível 🌟",
        "Você aprendeu algo novo 📚"
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    document.getElementById("event").innerHTML = randomEvent;
}


// =============================
// ATUALIZAR STATUS
// =============================

function updateStatus() {
    document.getElementById("age").textContent = age;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("health").textContent = health;

    document.getElementById("happinessBar").style.width = happiness + "%";
    document.getElementById("healthBar").style.width = health + "%";
}

updateStatus();
