// ======================================
// VARIÁVEIS DO PERSONAGEM
// ======================================

let age = 0;
let happiness = 100;
let health = 100;
let isAlive = true;
let lastEvent = "";
let motherName = "";
let fatherName = "";
let birthType = "";

let zodiacSign = "";

// ======================================
// SISTEMA DE PAIS
// ======================================

let parent1Name = "";
let parent2Name = "";
let parent1Relationship = 100;
let parent2Relationship = 100;

// ======================================
// GERAR NASCIMENTO
// ======================================

function generateBirth() {

    age = 0;
    happiness = 100;
    health = 100;
    isAlive = true;

    
    lastEvent = "Você nasceu!";

    generateParents();
    generateZodiac();

    
    // MOSTRAR TEXTO DE NASCIMENTO
    document.getElementById("birthInfo").innerHTML =
    "Você nasceu em uma família comum.<br><br>" +
    "🍼 Tipo de nascimento: " + birthType + "<br>" +
    "👩 Mãe: " + motherName + "<br>" +
    "👨 Pai: " + fatherName + "<br>" +
    "♈ Signo: " + zodiacSign;


    updateUI();
    updateRelationshipBars();
}

// ======================================
// GERAR PAIS
// ======================================
function generateParents() {

    const maleNames = ["Carlos", "João", "Pedro", "Lucas", "Rafael", "Otavio", "Antonio", "Liam", "Leon", "Bruno", "Tito","Joel", "James"];
    const femaleNames = ["Ana", "Maria", "Julia", "Fernanda", "Beatriz", "Luna", "Alice", "Alissa", "Luana", "Bianca", "Luiza", "Kaylane"];

    fatherName = maleNames[Math.floor(Math.random() * maleNames.length)];
    motherName = femaleNames[Math.floor(Math.random() * femaleNames.length)];

    birthType = ["Parto normal", "Cesárea", "Prematuro", "Parto Natural Domiciliar" "Parto Natural"]
        [Math.floor(Math.random() * 3)];
}




// ======================================
// GERAR SIGNO
// ======================================

function generateZodiac() {

    const signs = [
        "Áries","Touro","Gêmeos","Câncer","Leão","Virgem",
        "Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"
    ];

    zodiacSign = signs[Math.floor(Math.random() * signs.length)];
}


// ======================================
// ENVELHECER
// ======================================

function ageUp() {

    if (!isAlive) return;

    age++;

    happiness -= Math.floor(Math.random() * 6);
    health -= Math.floor(Math.random() * 5);

    // Limites
    if (happiness < 0) happiness = 0;
    if (health < 0) health = 0;

    // Relação com pais diminui levemente com o tempo
    parent1Relationship -= Math.floor(Math.random() * 3);
    parent2Relationship -= Math.floor(Math.random() * 3);

    if (parent1Relationship < 0) parent1Relationship = 0;
    if (parent2Relationship < 0) parent2Relationship = 0;

    // Morte
    if (health <= 0 || age >= 120) {
        isAlive = false;
        lastEvent = "Você morreu aos " + age + " anos.";
    } else {
        lastEvent = "Você envelheceu para " + age + " anos.";
    }

    updateUI();
    updateRelationshipBars();
}

// ======================================
// ATUALIZAR TELA PRINCIPAL
// ======================================

function updateUI() {

    document.getElementById("age").innerText = age;
    document.getElementById("happiness").innerText = happiness;
    document.getElementById("health").innerText = health;
    document.getElementById("eventText").innerText = lastEvent;
    document.getElementById("zodiac").innerText = zodiacSign;

    // Atualizar barras visuais
    document.getElementById("happinessBar").style.width = happiness + "%";
    document.getElementById("healthBar").style.width = health + "%";
}

// ======================================
// ATUALIZAR RELACIONAMENTOS
// ======================================

function updateRelationshipBars() {

    document.getElementById("parent1Label").innerText =
        "Mãe: " + parent1Name;

    document.getElementById("parent2Label").innerText =
        "Pai: " + parent2Name;

    document.getElementById("parent1Bar").style.width =
        parent1Relationship + "%";

    document.getElementById("parent2Bar").style.width =
        parent2Relationship + "%";
}

// ======================================
// TELA DE RELACIONAMENTOS
// ======================================

function openRelationships() {
    document.getElementById("relationshipsScreen").style.display = "block";
}

function closeRelationships() {
    document.getElementById("relationshipsScreen").style.display = "none";
}

// ======================================
// INICIAR JOGO
// ======================================

generateBirth();
