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

let lastEvent = "";

function generateEvent(age) {

    let events = [];

    if (age <= 2) {
        events = [
            { text: "Você aprendeu a engatinhar 🍼", happiness: 5, health: 0 },
            { text: "Você chorou a noite inteira 😭", happiness: -5, health: -2 },
            { text: "Você falou sua primeira palavra 👶", happiness: 10, health: 0 }
        ];
    }

    else if (age <= 12) {
        events = [
            { text: "Você fez um novo amigo 🧒", happiness: 8, health: 0 },
            { text: "Você ficou doente 🤒", happiness: -5, health: -10 },
            { text: "Você ganhou um brinquedo 🎁", happiness: 6, health: 0 },
            { text: "Você tirou nota baixa 📉", happiness: -6, health: 0 }
        ];
    }

    else if (age <= 17) {
        events = [
            { text: "Você teve sua primeira paixão ❤️", happiness: 12, health: 0 },
            { text: "Você brigou com um amigo 😡", happiness: -8, health: 0 },
            { text: "Você começou a praticar esportes 🏀", happiness: 5, health: 5 }
        ];
    }

    else {
        events = [
            { text: "Você conseguiu um emprego 💼", happiness: 10, health: 0 },
            { text: "Você ficou estressado no trabalho 😩", happiness: -8, health: -5 },
            { text: "Você começou um relacionamento 💕", happiness: 15, health: 0 }
        ];
    }

    let event;

    do {
        event = events[Math.floor(Math.random() * events.length)];
    } while (event.text === lastEvent);

    lastEvent = event.text;

    happiness += event.happiness;
    health += event.health;

    if (happiness > 100) happiness = 100;
    if (health > 100) health = 100;
    if (happiness < 0) happiness = 0;
    if (health < 0) health = 0;

    document.getElementById("eventText").innerText = event.text;
}



// ===============================
// ENVELHECER
// ===============================

function ageUp() {

    if (!isAlive) return;

    age++;

    generateEvent(age);

    if (health <= 0) {
        isAlive = false;
        document.getElementById("event").innerHTML = "💀 Você morreu!";
    }

    document.getElementById("age").textContent = age;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("health").textContent = health;

    updateBars();
}


// ===============================
// INICIAR JOGO
// ===============================

window.onload = function () {
    generateBirth();
    updateBars();
};

