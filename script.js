// ===============================
// VARIÁVEIS PRINCIPAIS
// ===============================

let age = 0;
let birthData = {};

let parent1 = {};
let parent2 = {};

let maternalGrandparents = [];
let paternalGrandparents = [];

let maternalUncles = [];
let paternalUncles = [];

let siblings = [];
let cousins = [];
let schoolStage = "Nenhuma"; 

// ===============================
// INICIAR JOGO
// ===============================

startGame();

function startGame() {
    generateBirth();
    generateFamilyTree();
    renderBirthInfo();
    updateUI();
}


// ===============================
// NASCIMENTO COMPLETO
// ===============================

function generateBirth() {

    const birthTypes = [
        "Parto normal",
        "Cesárea",
        "Prematuro",
        "Fertilização in vitro",
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

    const maleNames = ["Carlos","João","Pedro","Lucas","Rafael","Miguel"];
    const femaleNames = ["Ana","Maria","Julia","Fernanda","Beatriz","Helena"];

    const randomDay = Math.floor(Math.random()*28)+1;
    const randomMonth = Math.floor(Math.random()*12)+1;
    const randomYear = 2005 + Math.floor(Math.random()*15);

    const familyType = familyTypes[Math.floor(Math.random()*familyTypes.length)];

    let p1Name = femaleNames[Math.floor(Math.random()*femaleNames.length)];
    let p2Name = maleNames[Math.floor(Math.random()*maleNames.length)];

    let p1Age = Math.floor(Math.random()*20)+18;
    let p2Age = Math.floor(Math.random()*20)+18;

    parent1 = { name: p1Name, age: p1Age };
    parent2 = { name: p2Name, age: p2Age };

    birthData = {
        day: randomDay,
        month: randomMonth,
        year: randomYear,
        birthType: birthTypes[Math.floor(Math.random()*birthTypes.length)],
        zodiac: generateZodiac(randomMonth),
        familyType
    };
}


// ===============================
// SIGNO
// ===============================

function generateZodiac(month) {
    const signs = [
        "Capricórnio","Aquário","Peixes","Áries","Touro","Gêmeos",
        "Câncer","Leão","Virgem","Libra","Escorpião","Sagitário"
    ];
    return signs[month-1];
}


// ===============================
// MOSTRAR NASCIMENTO
// ===============================

function renderBirthInfo() {

    const container = document.getElementById("birthInfo");
    if (!container) return;

    let familyText = "";

    switch(birthData.familyType){
        case "mae_pai":
            familyText = `👨‍👩‍👧 Pais: ${parent1.name} e ${parent2.name}`;
            break;
        case "duas_maes":
            familyText = `👩‍👩‍👦 Duas mães: ${parent1.name} e ${parent2.name}`;
            break;
        case "dois_pais":
            familyText = `👨‍👨‍👦 Dois pais: ${parent1.name} e ${parent2.name}`;
            break;
        case "mae_solteira":
            familyText = `👩 Mãe solteira: ${parent1.name}`;
            break;
        case "pai_solteiro":
            familyText = `👨 Pai solteiro: ${parent2.name}`;
            break;
    }

    let teenText = "";
    if(parent1.age < 20 && parent2.age < 20){
        teenText = "👶 Ambos eram adolescentes.";
    } else if(parent1.age < 20){
        teenText = "👩 Um dos pais era adolescente.";
    } else if(parent2.age < 20){
        teenText = "👨 Um dos pais era adolescente.";
    }

    container.innerHTML = `
        📅 ${birthData.day}/${birthData.month}/${birthData.year}<br>
        ♈ ${birthData.zodiac}<br>
        👶 ${birthData.birthType}<br>
        ${familyText}<br>
        ${teenText}
    `;
}


// ===============================
// GERAR ÁRVORE GENEALÓGICA
// ===============================

function generateFamilyTree(){

    const male = ["Miguel","Arthur","Theo","Enzo","Rafael"];
    const female = ["Laura","Helena","Sofia","Marina","Beatriz"];

    // Avós
    maternalGrandparents = [
        {name: female[Math.floor(Math.random()*female.length)], age: parent1.age + 25},
        {name: male[Math.floor(Math.random()*male.length)], age: parent1.age + 28}
    ];

    paternalGrandparents = [
        {name: female[Math.floor(Math.random()*female.length)], age: parent2.age + 24},
        {name: male[Math.floor(Math.random()*male.length)], age: parent2.age + 27}
    ];

    maternalUncles = generateRelatives(2, female, male, parent1.age - 5);
    paternalUncles = generateRelatives(2, female, male, parent2.age - 5);

    siblings = generateRelatives(Math.floor(Math.random()*3), female, male, 15);
    cousins = generateRelatives(Math.floor(Math.random()*4), female, male, 18);
}


// ===============================
// GERAR PARENTES
// ===============================

function generateRelatives(max, femaleNames, maleNames, maxAge){
    let arr = [];
    for(let i=0;i<max;i++){
        const isFemale = Math.random()<0.5;
        arr.push({
            name: isFemale ?
                femaleNames[Math.floor(Math.random()*femaleNames.length)] :
                maleNames[Math.floor(Math.random()*maleNames.length)],
            age: Math.floor(Math.random()*maxAge)+1
        });
    }
    return arr;
}

function updateSchool(){
//function updateSchool(){

    let previousStage = schoolStage;

    if(age >= 4 && age <= 5){
        schoolStage = "Pré-escola";
    }
    else if(age >= 6 && age <= 14){
        schoolStage = "Ensino Fundamental";
    }
    else if(age >= 15 && age <= 17){
        schoolStage = "Ensino Médio";
    }
    else{
        schoolStage = "Nenhuma";
    }

    // Só registra evento se mudou de fase
    if(previousStage !== schoolStage && schoolStage !== "Nenhuma"){
        addLifeEvent("🎒 Você começou a " + schoolStage + ".");
    }
} 
===============================
// ENVELHECER
// ===============================
function ageUp(){

    age++;

    parent1.age++;
    parent2.age++;

    maternalGrandparents.forEach(g=>g.age++);
    paternalGrandparents.forEach(g=>g.age++);
    maternalUncles.forEach(u=>u.age++);
    paternalUncles.forEach(u=>u.age++);
    siblings.forEach(s=>s.age++);
    cousins.forEach(c=>c.age++);

    updateSchool();

    // Evento padrão se nada importante acontecer
    addLifeEvent("Nada de especial aconteceu este ano.");

    document.getElementById("ageDisplay").innerText = age + " anos";

    updateUI();
}


// ===============================
// ATUALIZAR FAMÍLIA
// ===============================

function updateUI(){

    const panel = document.getElementById("familyPanel");
    if(!panel) return;

    panel.innerHTML = `
        <h3>👨 Pais</h3>
        ${parent1.name} (${parent1.age})<br>
        ${parent2.name} (${parent2.age})

        <h3>👵 Avós Maternos</h3>
        ${maternalGrandparents.map(g=>g.name+" ("+g.age+")").join("<br>")}

        <h3>👴 Avós Paternos</h3>
        ${paternalGrandparents.map(g=>g.name+" ("+g.age+")").join("<br>")}

        <h3>👧 Irmãos</h3>
        ${siblings.length ? siblings.map(s=>s.name+" ("+s.age+")").join("<br>") : "Nenhum"}

        <h3>👦 Primos</h3>
        ${cousins.length ? cousins.map(c=>c.name+" ("+c.age+")").join("<br>") : "Nenhum"}
    `;
}


// ===============================
// MOSTRAR/OCULTAR FAMÍLIA
// ===============================

function toggleFamily(){
    const panel = document.getElementById("familyPanel");
    if(!panel) return;
    panel.style.display =
        panel.style.display === "none" ? "block" : "none";
}

function addLifeEvent(text){

    const log = document.getElementById("lifeLog");
    if(!log) return;

    let ageBlock = document.getElementById("age-" + age);

    if(!ageBlock){
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


