// ===============================
// VARIÁVEIS DO PERSONAGEM
// ===============================

let age = 0;
let happiness = 100;
let health = 100;
let isAlive = true;
let lastEvent = "";

let parent1Type = "Mãe";
let parent2Type = "Pai";
let hasSecondParent = true;

let parent1Relationship = 0;
let parent2Relationship = 0;


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

    // DEFINIR TIPOS DE PAIS

    if (familyType.includes("mãe solteira")) {
        parent1Type = "Mãe";
        hasSecondParent = false;
    }

    else if (familyType.includes("pai solteiro")) {
        parent1Type = "Pai";
        hasSecondParent = false;
    }

    else if (familyType.includes("duas mães")) {
        parent1Type = "Mãe";
        parent2Type = "Mãe";
        hasSecondParent = true;
    }

    else if (familyType.includes("dois pais")) {
        parent1Type = "Pai";
        parent2Type = "Pai";
        hasSecondParent = true;
    }

    else {
        parent1Type = "Mãe";
        parent2Type = "Pai";
        hasSecondParent = true;
    }

    // RELACIONAMENTOS INICIAIS
    parent1Relationship = Math.floor(Math.random() * 41) + 60;

    if (hasSecondParent) {
        parent2Relationship = Math.floor(Math.random() * 41) + 60;
    } else {
        parent2Relationship = 0;
    }

    document.getElementById("birthInfo").innerHTML =
        `${familyType}<br>
         ${birthType}<br>
         📅 Data de nascimento: ${birthDay}/${birthMonth}/${birthYear}<br>
         ♈ Signo: ${zodiac}`;
}


// ===============================
// ATUALIZAR BARRAS PRINCIPAIS
// ===============================

function updateBars() {
    document.getElementById("happinessBar").style.width = happiness + "%";
    document.getElementById("healthBar").style.width = health + "%";
}


// ===============================
// ATUALIZAR BARRAS DE RELACIONAMENTO
// ===============================

function updateRelationshipBars() {

    document.getElementById("parent1Bar").style.width = parent1Relationship + "%";

    if (hasSecondParent) {
        document.getElementById("parent2Bar").style.width = parent2Relationship + "%";
    }
}


// ===============================
// GERAR EVENTOS
// ===============================

function generateEvent() {

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

    happiness = Math.max(0, Math.min(100, happiness));
    health = Math.max(0, Math.min(100, health));

    document.getElementById("event").innerText = event.text;
}


// ===============================
// ENVELHECER
// ===============================

function ageUp() {

    if (!isAlive) return;

    age++;

    generateEvent();

    // MUDAR RELACIONAMENTOS A CADA ANO
    let randomChange1 = Math.floor(Math.random() * 11) - 5;
    parent1Relationship += randomChange1;

    if (hasSecondParent) {
        let randomChange2 = Math.floor(Math.random() * 11) - 5;
        parent2Relationship += randomChange2;
    }

    parent1Relationship = Math.max(0, Math.min(100, parent1Relationship));
    parent2Relationship = Math.max(0, Math.min(100, parent2Relationship));

    if (health <= 0) {
        isAlive = false;
        document.getElementById("event").innerHTML = "💀 Você morreu!";
    }

    document.getElementById("age").textContent = age;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("health").textContent = health;

    updateBars();
    updateRelationshipBars();
}


// ===============================
// ABRIR / FECHAR RELACIONAMENTOS
// ===============================

function openRelationships() {

    document.getElementById("relationshipsScreen").style.display = "block";

    document.getElementById("parent1Label").textContent = parent1Type;
    document.getElementById("parent1Bar").style.width = parent1Relationship + "%";

    if (hasSecondParent) {
        document.getElementById("parent2Section").style.display = "block";
        document.getElementById("parent2Label").textContent = parent2Type;
        document.getElementById("parent2Bar").style.width = parent2Relationship + "%";
    } else {
        document.getElementById("parent2Section").style.display = "none";
    }
}

function closeRelationships() {
    document.getElementById("relationshipsScreen").style.display = "none";
}


// ===============================
// INICIAR JOGO
// ===============================

window.onload = function () {
    generateBirth();
    updateBars();
    updateRelationshipBars();
};



