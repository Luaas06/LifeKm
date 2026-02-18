let age = 0;
let happiness = 100;
let health = 100;

let motherName = "";
let fatherName = "";
let birthType = "";
let zodiacSign = "";

let motherRelation = 80;
let fatherRelation = 80;

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

    const types = ["Parto normal", "Cesárea", "Prematuro"];
    birthType = types[Math.floor(Math.random() * types.length)];
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
        "Você nasceu em uma família comum.";

    document.getElementById("birthType").innerText = birthType;
    document.getElementById("motherName").innerText = motherName;
    document.getElementById("fatherName").innerText = fatherName;
    document.getElementById("zodiac").innerText = zodiacSign;
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

    if (age === 5) motherRelation += 5;
    if (age === 13) fatherRelation -= 10;
    if (age === 18) {
        motherRelation -= 5;
        fatherRelation -= 5;
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

