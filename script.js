// ===================================
// VARIÁVEIS DO PERSONAGEM
// ===================================

let age = 0;
let happiness = 100;
let health = 100;
let isAlive = true;
let lastEvent = "";

// ===================================
// SISTEMA DE PAIS
// ===================================

let parent1Type = "Mãe";
let parent2Type = "Pai";
let hasSecondParent = true;

let parent1Relationship = 100;
let parent2Relationship = 100;

// ===================================
// GERAR NASCIMENTO
// ===================================

function generateBirth() {

    age = 0;
    happiness = 100;
    health = 100;
    isAlive = true;

    parent1Relationship = 100;
    parent2Relationship = 100;

    updateUI();
    updateRelationshipBars();
}

// ===================================
// ENVELHECER
// ===================================

function ageUp() {

    if (!isAlive) return;

    age++;

    happiness -= Math.floor(Math.random() * 5);
    health -= Math.floor(Math.random() * 4);

    if (health <= 0 || age >= 120) {
        isAlive = false;
        lastEvent = "Você morreu.";
    }

    updateUI();
    updateRelationshipBars();
}

// ===================================
// ATUALIZAR UI
// ===================================

function updateUI() {

    document.getElementById("age").innerText = age;
    document.getElementById("happiness").innerText = happiness;
    document.getElementById("health").innerText = health;
    document.getElementById("eventText").innerText = lastEvent;

    document.getElementById("parent1Label").innerText = parent1Type;

    if (hasSecondParent) {
        document.getElementById("parent2Section").style.display = "block";
        document.getElementById("parent2Label").innerText = parent2Type;
    } else {
        document.getElementById("parent2Section").style.display = "none";
    }
}

// ===================================
// ATUALIZAR BARRAS DE RELAÇÃO
// ===================================

function updateRelationshipBars() {

    document.getElementById("parent1Bar").style.width =
        parent1Relationship + "%";

    if (hasSecondParent) {
        document.getElementById("parent2Bar").style.width =
            parent2Relationship + "%";
    }
}

// ===================================
// INICIAR AUTOMATICAMENTE
// ===================================

generateBirth();
