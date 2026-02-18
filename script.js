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
let lifeLog = [];

let motherAge = 0;
let fatherAge = 0;


startGame();

function startGame() {
    generateParents();
    generateZodiac();
    updateBirthInfo();
    updateUI();
}

function generateParents() {

    const maleNames = ["Carlos", "João", "Pedro", "Lucas", "Rafael"];
    const femaleNames = ["Ana", "Maria", "Julia", "Fernanda", "Beatriz"];

    fatherName = maleNames[Math.floor(Math.random() * maleNames.length)];
    motherName = femaleNames[Math.floor(Math.random() * femaleNames.length)];

    fatherAge = Math.floor(Math.random() * 20) + 25; // 25 a 45
    motherAge = Math.floor(Math.random() * 20) + 22; // 22 a 42

    const types = ["Parto normal", "Cesárea", "Prematuro"];
    birthType = types[Math.floor(Math.random() * types.length)];

    generateSiblings();
}
function generateSiblings() {

    siblings = [];

    const possible = Math.floor(Math.random() * 3); // até 2 irmãos

    const names = ["Bruno","Marina","Felipe","Larissa","Tiago","Camila"];

    for (let i = 0; i < possible; i++) {

        siblings.push({
            name: names[Math.floor(Math.random() * names.length)],
            age: Math.floor(Math.random() * 15) + 1
        });

    }
}

function generateZodiac() {
    const signs = [
        "Áries","Touro","Gêmeos","Câncer","Leão","Virgem",
        "Libra","Escorpião","Sagitário","Capricórnio","Aquário","Peixes"
    ];
    zodiacSign = signs[Math.floor(Math.random() * signs.length)];
}

function updateBirthInfo() {

    document.getElementById("birthText").innerText =
        "Você nasceu!";

    document.getElementById("birthType").innerText = birthType;
    document.getElementById("motherName").innerText =
        motherName + " (" + motherAge + " anos)";
    document.getElementById("fatherName").innerText =
        fatherName + " (" + fatherAge + " anos)";
    document.getElementById("zodiac").innerText = zodiacSign;

    let siblingsText = "";

    if (siblings.length > 0) {
        siblings.forEach(s => {
            siblingsText += s.name + " (" + s.age + " anos), ";
        });
        siblingsText = siblingsText.slice(0, -2);
        addLifeEvent("Você nasceu com irmãos: " + siblingsText + ".");
    } else {
        addLifeEvent("Você nasceu sem irmãos.");
    }

    addLifeEvent("Seus pais são " + motherName + " e " + fatherName + ".");
}


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
}

function ageUp() {

    age++;

    happiness -= Math.floor(Math.random() * 5);
    health -= Math.floor(Math.random() * 3);

    // Eventos específicos de idade
    if (age === 5) motherRelation += 5;
    if (age === 13) fatherRelation -= 10;

    if (age === 18) {
        motherRelation -= 5;
        fatherRelation -= 5;
    }

    // Envelhecer pais
    motherAge++;
    fatherAge++;

    // Envelhecer irmãos
    siblings.forEach(s => s.age++);

    // Chance da mãe engravidar (até 45 anos)
    if (motherAge < 50 && Math.random() < 0.15) {

        const names = ["Bruno","Marina","Felipe","Larissa","Tiago","Camila","Lucas","Ana"];

        let newBaby = {
            name: names[Math.floor(Math.random() * names.length)],
            age: 0
        };

        siblings.push(newBaby);

        addLifeEvent("👶 Sua mãe teve um novo bebê chamado " + newBaby.name + "!");
    }

    updateScreen();
}


    limitStats();
    updateUI();
}

function limitStats() {
    happiness = Math.max(0, Math.min(100, happiness));
    health = Math.max(0, Math.min(100, health));
    motherRelation = Math.max(0, Math.min(100, motherRelation));
    fatherRelation = Math.max(0, Math.min(100, fatherRelation));
}

function toggleFamily() {
    const panel = document.getElementById("familyPanel");

    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
}

