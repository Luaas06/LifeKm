// ===============================
// VARIÁVEIS PRINCIPAIS
// ===============================

let age = 0;
let happiness = 100;
let health = 100;

let zodiacSign = "";
let birthType = "";

// Pais
let mother = {};
let father = {};

// Avós
let maternalGrandparents = [];
let paternalGrandparents = [];

// Tios
let maternalUncles = [];
let paternalUncles = [];

// Irmãos
let siblings = [];

// Primos
let cousins = [];


// ===============================
// INICIAR JOGO
// ===============================

startGame();

function startGame() {
    generateBirth();
    generateFamilyTree();
    updateUI();
}


// ===============================
// NASCIMENTO
// ===============================

function generateBirth() {

    const types = [
        "Parto normal",
        "Cesárea",
        "Prematuro",
        "Fertilização in vitro",
        "Barriga solidária"
    ];

    birthType = types[Math.floor(Math.random() * types.length)];

    const signs = [
        "Áries","Touro","Gêmeos","Câncer","Leão","Virgem",
        "Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"
    ];

    zodiacSign = signs[Math.floor(Math.random() * signs.length)];
}


// ===============================
// GERAR ÁRVORE GENEALÓGICA
// ===============================

function generateFamilyTree() {

    const maleNames = ["Carlos","João","Pedro","Lucas","Rafael","Miguel","Arthur"];
    const femaleNames = ["Ana","Maria","Julia","Fernanda","Beatriz","Helena","Laura"];

    // Pais
    mother = {
        name: femaleNames[Math.floor(Math.random() * femaleNames.length)],
        age: Math.floor(Math.random() * 20) + 22
    };

    father = {
        name: maleNames[Math.floor(Math.random() * maleNames.length)],
        age: Math.floor(Math.random() * 20) + 25
    };

    // Avós
    maternalGrandparents = [
        { name: femaleNames[Math.floor(Math.random()*femaleNames.length)], age: mother.age + 25 },
        { name: maleNames[Math.floor(Math.random()*maleNames.length)], age: mother.age + 28 }
    ];

    paternalGrandparents = [
        { name: femaleNames[Math.floor(Math.random()*femaleNames.length)], age: father.age + 24 },
        { name: maleNames[Math.floor(Math.random()*maleNames.length)], age: father.age + 27 }
    ];

    // Tios
    maternalUncles = generateRelatives(2, femaleNames, maleNames, mother.age - 5);
    paternalUncles = generateRelatives(2, femaleNames, maleNames, father.age - 5);

    // Irmãos
    siblings = generateRelatives(Math.floor(Math.random()*3), femaleNames, maleNames, 15);

    // Primos
    cousins = generateRelatives(Math.floor(Math.random()*4), femaleNames, maleNames, 18);

    addLifeEvent("👶 Você nasceu! (" + birthType + ")");
    addLifeEvent("♈ Seu signo é " + zodiacSign + ".");
}


// ===============================
// GERAR PARENTES GENÉRICOS
// ===============================

function generateRelatives(max, femaleNames, maleNames, maxAge) {

    let arr = [];

    for (let i = 0; i < max; i++) {

        const isFemale = Math.random() < 0.5;

        arr.push({
            name: isFemale
                ? femaleNames[Math.floor(Math.random()*femaleNames.length)]
                : maleNames[Math.floor(Math.random()*maleNames.length)],
            age: Math.floor(Math.random()*maxAge) + 1
        });
    }

    return arr;
}


// ===============================
// ENVELHECER
// ===============================

function ageUp() {

    age++;

    mother.age++;
    father.age++;

    maternalGrandparents.forEach(g => g.age++);
    paternalGrandparents.forEach(g => g.age++);

    maternalUncles.forEach(u => u.age++);
    paternalUncles.forEach(u => u.age++);

    siblings.forEach(s => s.age++);
    cousins.forEach(c => c.age++);

    // Chance de novo irmão
    if (Math.random() < 0.25) {
        const baby = generateRelatives(1, ["Sofia","Helena"], ["Miguel","Theo"], 1)[0];
        baby.age = 0;
        siblings.push(baby);
        addLifeEvent("👶 Sua mãe teve um bebê chamado " + baby.name + "!");
    }

    // Chance de primo novo
    if (Math.random() < 0.20) {
        const baby = generateRelatives(1, ["Laura","Maria"], ["Arthur","Enzo"], 1)[0];
        baby.age = 0;
        cousins.push(baby);
        addLifeEvent("👶 Um novo primo nasceu: " + baby.name + "!");
    }

    updateUI();
}


// ===============================
// ATUALIZAR INTERFACE
// ===============================

function updateUI() {

    const ageDisplay = document.getElementById("ageDisplay");
    if (ageDisplay) ageDisplay.innerText = age + " anos";

    const familyPanel = document.getElementById("familyPanel");
    if (!familyPanel) return;

    familyPanel.innerHTML = `
        <h3>👨 Pais</h3>
        Mãe: ${mother.name} (${mother.age})<br>
        Pai: ${father.name} (${father.age})

        <h3>👵 Avós Maternos</h3>
        ${maternalGrandparents.map(g => g.name + " (" + g.age + ")").join("<br>")}

        <h3>👴 Avós Paternos</h3>
        ${paternalGrandparents.map(g => g.name + " (" + g.age + ")").join("<br>")}

        <h3>👩‍👦 Tios Maternos</h3>
        ${maternalUncles.map(u => u.name + " (" + u.age + ")").join("<br>") || "Nenhum"}

        <h3>👨‍👦 Tios Paternos</h3>
        ${paternalUncles.map(u => u.name + " (" + u.age + ")").join("<br>") || "Nenhum"}

        <h3>👧 Irmãos</h3>
        ${siblings.map(s => s.name + " (" + s.age + ")").join("<br>") || "Nenhum"}

        <h3>👦 Primos</h3>
        ${cousins.map(c => c.name + " (" + c.age + ")").join("<br>") || "Nenhum"}
    `;
}


// ===============================
// LOG DE VIDA
// ===============================

function addLifeEvent(text) {

    const log = document.getElementById("lifeLog");
    if (!log) return;

    let ageBlock = document.getElementById("age-" + age);

    if (!ageBlock) {

        ageBlock = document.createElement("div");
        ageBlock.id = "age-" + age;

        const title = document.createElement("h4");
        title.innerText = age + " ano" + (age > 1 ? "s" : "");

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

    if (!panel) return;

    panel.style.display =
        panel.style.display === "none" ? "block" : "none";
}




