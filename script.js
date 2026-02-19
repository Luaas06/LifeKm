// ===============================
// VARIÁVEIS PRINCIPAIS
// ===============================

let age = 0;
let happiness = 100;
let health = 100;

let motherName = "";
let fatherName = "";
let birthType = "";
let zodiacSign = "";

let motherRelation = 80;
let fatherRelation = 80;

let siblings = [];
let motherAge = 0;
let fatherAge = 0;


// ===============================
// INICIAR JOGO
// ===============================

startGame();

function startGame() {
    generateParents();
    generateZodiac();
    updateBirthInfo();
    updateUI();
}


// ===============================
// GERAR PAIS
// ===============================

function generateParents() {

    const maleNames = ["Carlos", "João", "Pedro", "Lucas", "Rafael"];
    const femaleNames = ["Ana", "Maria", "Julia", "Fernanda", "Beatriz"];

    fatherName = maleNames[Math.floor(Math.random() * maleNames.length)];
    motherName = femaleNames[Math.floor(Math.random() * femaleNames.length)];

    fatherAge = Math.floor(Math.random() * 20) + 25;
    motherAge = Math.floor(Math.random() * 20) + 22;

    const types = ["Parto normal", "Cesárea", "Prematuro"];
    birthType = types[Math.floor(Math.random() * types.length)];

    generateSiblings();
}


// ===============================
// GERAR IRMÃOS INICIAIS
// ===============================

function generateSiblings() {

    siblings = [];

    const possible = Math.floor(Math.random() * 3);
    const names = ["Bruno","Marina","Felipe","Larissa","Tiago","Camila"];

    for (let i = 0; i < possible; i++) {
        siblings.push({
            name: names[Math.floor(Math.random() * names.length)],
            age: Math.floor(Math.random() * 15) + 1,
            relation: 70
        });
    }
}


// ===============================
// GERAR SIGNO
// ===============================

function generateZodiac() {

    const signs = [
        "Áries","Touro","Gêmeos","Câncer","Leão","Virgem",
        "Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"
    ];

    zodiacSign = signs[Math.floor(Math.random() * signs.length)];
}


// ===============================
// MOSTRAR INFORMAÇÕES DE NASCIMENTO
// ===============================

function updateBirthInfo() {

    document.getElementById("birthText").innerText = "Você nasceu!";
    document.getElementById("birthType").innerText = birthType;
    document.getElementById("zodiac").innerText = zodiacSign;

    updateFamilyInfo();

    if (siblings.length > 0) {
        let siblingsText = siblings
            .map(s => s.name + " (" + s.age + " anos)")
            .join(", ");

        addLifeEvent("👶 Você nasceu com irmãos: " + siblingsText + ".");
    } else {
        addLifeEvent("👶 Você nasceu sem irmãos.");
    }

    addLifeEvent("👨‍👩‍👧 Seus pais são " + motherName + " e " + fatherName + ".");
}


// ===============================
// ATUALIZAR INTERFACE
// ===============================

function updateUI() {

    document.getElementById("age").innerText = age;
    document.getElementById("happiness").innerText = happiness;
    document.getElementById("health").innerText = health;

    document.getElementById("happinessBar").style.width = happiness + "%";
    document.getElementById("healthBar").style.width = health + "%";

    document.getElementById("motherRelationText").innerText = motherRelation;
    document.getElementById("fatherRelationText").innerText = fatherRelation;

    document.getElementById("motherBar").style.width = motherRelation + "%";
    document.getElementById("fatherBar").style.width = fatherRelation + "%";

    updateFamilyInfo();
}


// ===============================
// ATUALIZAR DADOS FAMÍLIA
// ===============================

function updateFamilyInfo() {

    document.getElementById("motherName").innerText =
        motherName + " (" + motherAge + " anos)";

    document.getElementById("fatherName").innerText =
        fatherName + " (" + fatherAge + " anos)";

    const siblingsContainer = document.getElementById("siblingsContainer");

    if (siblingsContainer) {
        siblingsContainer.innerHTML = "";

        siblings.forEach(s => {
            const div = document.createElement("div");
            div.innerText = s.name + " (" + s.age + " anos)";
            siblingsContainer.appendChild(div);
        });
    }
}


// ===============================
// ENVELHECER
// ===============================

function ageUp() {

    age++;
    motherAge++;
    fatherAge++;

    siblings.forEach(s => s.age++);

    let eventOccurred = false;

    // Chance de novo irmão
    if (Math.random() < 0.3) {

        const names = ["Arthur","Helena","Miguel","Sofia","Theo","Laura"];
        let babyName = names[Math.floor(Math.random() * names.length)];

        siblings.push({
            name: babyName,
            age: 0,
            relation: 70
        });

        addLifeEvent("👶 Sua mãe teve um bebê chamado " + babyName + "!");
        eventOccurred = true;
    }

    if (!eventOccurred) {
        addLifeEvent("Nada de especial aconteceu este ano.");
    }

    limitStats();
    updateUI();
}


// ===============================
// LIMITAR STATUS 0–100
// ===============================

function limitStats() {
    happiness = Math.max(0, Math.min(100, happiness));
    health = Math.max(0, Math.min(100, health));
    motherRelation = Math.max(0, Math.min(100, motherRelation));
    fatherRelation = Math.max(0, Math.min(100, fatherRelation));
}


// ===============================
// LOG DE VIDA (ESTILO BITLIFE)
// ===============================

function addLifeEvent(text) {

    const log = document.getElementById("lifeLog");
    if (!log) return;

    let ageBlock = document.getElementById("age-" + age);

    if (!ageBlock) {

        ageBlock = document.createElement("div");
        ageBlock.id = "age-" + age;
        ageBlock.style.marginBottom = "15px";

        const title = document.createElement("h4");
        title.innerText = age + " ano" + (age > 1 ? "s" : "");
        title.style.marginBottom = "5px";

        ageBlock.appendChild(title);
        log.prepend(ageBlock);
    }

    const p = document.createElement("p");
    p.innerText = "• " + text;

    ageBlock.appendChild(p);
}


// ===============================
// MOSTRAR/OCULTAR FAMÍLIA
// ===============================

function toggleFamily() {

    const panel = document.getElementById("familyPanel");

    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
}



