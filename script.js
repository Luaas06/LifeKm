// ===============================
// VARIÁVEIS PRINCIPAIS
// ===============================

let age = 0;
let happiness = 100;
let health = 100;

let birthData = {};
let siblings = [];


// ===============================
// INICIAR JOGO
// ===============================

startGame();

function startGame() {
    generateBirth();
    generateSiblings();
    updateUI();
}


// ===============================
// GERAR NASCIMENTO COMPLETO
// ===============================

function generateBirth() {

    const birthTypes = [
        "Parto normal",
        "Cesárea",
        "Prematuro",
        "Fertilização in vitro",
        "Barriga de aluguel",
        "Barriga solidária",
        "Adoção"
    ];

    const familyTypes = [
        "mae_pai",
        "duas_maes",
        "dois_pais",
        "mae_solteira",
        "pai_solteiro"
    ];

    const maleNames = ["Carlos","João","Pedro","Lucas","Rafael"];
    const femaleNames = ["Ana","Maria","Julia","Fernanda","Beatriz"];

    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomYear = 2005 + Math.floor(Math.random() * 15);

    const familyType = familyTypes[Math.floor(Math.random() * familyTypes.length)];

    let motherName = femaleNames[Math.floor(Math.random() * femaleNames.length)];
    let fatherName = maleNames[Math.floor(Math.random() * maleNames.length)];

    let motherAge = Math.floor(Math.random() * 20) + 18;
    let fatherAge = Math.floor(Math.random() * 20) + 18;

    birthData = {
        day: randomDay,
        month: randomMonth,
        year: randomYear,
        birthType: birthTypes[Math.floor(Math.random() * birthTypes.length)],
        zodiac: generateZodiac(randomMonth),
        familyType,
        motherName,
        fatherName,
        motherAge,
        fatherAge
    };

    renderBirthInfo();
    addInitialFamilyLog();
}


// ===============================
// SIGNO
// ===============================

function generateZodiac(month) {

    const signs = [
        "Capricórnio","Aquário","Peixes","Áries","Touro","Gêmeos",
        "Câncer","Leão","Virgem","Libra","Escorpião","Sagitário"
    ];

    return signs[month - 1];
}


// ===============================
// MOSTRAR NASCIMENTO NA TELA
// ===============================

function renderBirthInfo() {

    const container = document.getElementById("birthInfo");

    let familyText = "";

    switch(birthData.familyType) {
        case "mae_pai":
            familyText = `👨‍👩‍👧 Pais: ${birthData.motherName} e ${birthData.fatherName}`;
            break;
        case "duas_maes":
            familyText = `👩‍👩‍👦 Duas mães: ${birthData.motherName} e ${birthData.fatherName}`;
            break;
        case "dois_pais":
            familyText = `👨‍👨‍👦 Dois pais: ${birthData.motherName} e ${birthData.fatherName}`;
            break;
        case "mae_solteira":
            familyText = `👩 Mãe solteira: ${birthData.motherName}`;
            break;
        case "pai_solteiro":
            familyText = `👨 Pai solteiro: ${birthData.fatherName}`;
            break;
    }

    let teenText = "";

    if (birthData.motherAge < 20 && birthData.fatherAge < 20) {
        teenText = "👶 Ambos eram adolescentes.";
    } else if (birthData.motherAge < 20) {
        teenText = "👩 Sua mãe era adolescente.";
    } else if (birthData.fatherAge < 20) {
        teenText = "👨 Seu pai era adolescente.";
    }

    container.innerHTML = `
        📅 ${birthData.day}/${birthData.month}/${birthData.year} <br>
        ♈ ${birthData.zodiac} <br>
        👶 ${birthData.birthType} <br>
        ${familyText} <br>
        ${teenText}
    `;
}


// ===============================
// IRMÃOS
// ===============================

function generateSiblings() {

    const possible = Math.floor(Math.random() * 3);
    const names = ["Bruno","Marina","Felipe","Larissa","Tiago","Camila"];

    for (let i = 0; i < possible; i++) {
        siblings.push({
            name: names[Math.floor(Math.random() * names.length)],
            age: Math.floor(Math.random() * 15) + 1
        });
    }
}


// ===============================
// ENVELHECER
// ===============================

function ageUp() {

    age++;
    siblings.forEach(s => s.age++);

    document.getElementById("ageDisplay").innerText = age + " anos";

    let eventOccurred = false;

    if (Math.random() < 0.3) {

        const names = ["Arthur","Helena","Miguel","Sofia","Theo","Laura"];
        let babyName = names[Math.floor(Math.random() * names.length)];

        siblings.push({
            name: babyName,
            age: 0
        });

        addLifeEvent("👶 Sua mãe teve um bebê chamado " + babyName + "!");
        eventOccurred = true;
    }

    if (!eventOccurred) {
        addLifeEvent("Nada de especial aconteceu este ano.");
    }

    updateUI();
}


// ===============================
// LOG ESTILO BITLIFE
// ===============================

function addLifeEvent(text) {

    const log = document.getElementById("lifeLog");

    let ageBlock = document.getElementById("age-" + age);

    if (!ageBlock) {

        ageBlock = document.createElement("div");
        ageBlock.id = "age-" + age;
        ageBlock.style.marginBottom = "15px";

        const title = document.createElement("h4");
        title.innerText = age + " ano" + (age !== 1 ? "s" : "");
        title.style.marginBottom = "5px";

        ageBlock.appendChild(title);
        log.prepend(ageBlock);
    }

    const p = document.createElement("p");
    p.innerText = "• " + text;

    ageBlock.appendChild(p);
}


// ===============================
// LOG INICIAL
// ===============================

function addInitialFamilyLog() {

    if (siblings.length > 0) {
        let siblingsText = siblings
            .map(s => s.name + " (" + s.age + " anos)")
            .join(", ");

        addLifeEvent("👶 Você nasceu com irmãos: " + siblingsText + ".");
    } else {
        addLifeEvent("👶 Você nasceu sem irmãos.");
    }
}


// ===============================
// ATUALIZAR STATUS
// ===============================

function updateUI() {

    document.getElementById("happinessBar").style.width = happiness + "%";
    document.getElementById("healthBar").style.width = health + "%";
}




