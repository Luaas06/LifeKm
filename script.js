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

document.addEventListener("DOMContentLoaded", function(){

    startGame();

    // Botão Envelhecer
    const ageBtn = document.getElementById("ageButton");
    if(ageBtn){
        ageBtn.addEventListener("click", ageUp);
    }

    // Botão Família
    const familyBtn = document.getElementById("familyButton");
    if(familyBtn){
        familyBtn.addEventListener("click", toggleFamily);
    }

    // Botão Escola
    const schoolBtn = document.getElementById("schoolButton");
    if(schoolBtn){
        schoolBtn.addEventListener("click", function(){
            alert("Abrir sistema escolar");
        });
    }

    // Botão Finanças
    const financeBtn = document.getElementById("financeButton");
    if(financeBtn){
        financeBtn.addEventListener("click", function(){
            alert("Abrir finanças");
        });
    }

    // Botão Atividades
    const activitiesBtn = document.getElementById("activitiesButton");
    if(activitiesBtn){
        activitiesBtn.addEventListener("click", function(){
            alert("Abrir atividades");
        });
    }

});
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
        "Barriga de aluguel",
        "Fertilização in vitro",
        "Barriga solidária",
        "Adoção"
    ];

    const familyTypes = [
        "mae_pai",
        "duas_maes",
        "dois_pais",
        "mae_solteira",
        "pai_solteiro",
        "Mae_adolescente",
        "Pai_adolescente",
        "Pais_adolescentes"
    ];

    const maleNames = ["Carlos","João","Pedro","Lucas","Rafael","Miguel","Caetano","Antonio","Arlindo","Bruno"];
    const femaleNames = ["Ana","Maria","Julia","Fernanda","Beatriz","Helena","Alice","Luna","Kaylane","Ruby"];

    const randomDay = Math.floor(Math.random()*28)+1;
    const randomMonth = Math.floor(Math.random()*12)+1;
    const randomYear = 2005 + Math.floor(Math.random()*15);

    const familyType = familyTypes[Math.floor(Math.random()*familyTypes.length)];

    let p1Name = femaleNames[Math.floor(Math.random()*femaleNames.length)];
    let p2Name = maleNames[Math.floor(Math.random()*maleNames.length)];

    let p1Age;
    let p2Age;

    // Idades corretas
    function adultAge() {
        return Math.floor(Math.random()*15) + 20; // 20–34
    }

    function teenAge() {
        return Math.floor(Math.random()*6) + 14; // 14–19
    }

    // Resetar pais
    parent1 = null;
    parent2 = null;

    switch(familyType){

        case "mae_pai":
            p1Age = adultAge();
            p2Age = adultAge();
            parent1 = { name: p1Name, age: p1Age, relationship: 80 };
            parent2 = { name: p2Name, age: p2Age, relationship: 80 };
            break;

        case "duas_maes":
            p1Age = adultAge();
            p2Age = adultAge();
            parent1 = { name: p1Name, age: p1Age, relationship: 80 };
            parent2 = { name: femaleNames[Math.floor(Math.random()*femaleNames.length)], age: p2Age, relationship: 80 };
            break;

        case "dois_pais":
            p1Age = adultAge();
            p2Age = adultAge();
            parent1 = { name: maleNames[Math.floor(Math.random()*maleNames.length)], age: p1Age, relationship: 80 };
            parent2 = { name: p2Name, age: p2Age, relationship: 80 };
            break;

        case "mae_solteira":
            p1Age = adultAge();
            parent1 = { name: p1Name, age: p1Age, relationship: 80 };
            break;

        case "pai_solteiro":
            p2Age = adultAge();
            parent2 = { name: p2Name, age: p2Age, relationship: 80 };
            break;

        case "Mae_adolescente":
            p1Age = teenAge();
            parent1 = { name: p1Name, age: p1Age, relationship: 80 };
            break;

        case "Pai_adolescente":
            p2Age = teenAge();
            parent2 = { name: p2Name, age: p2Age, relationship: 80 };
            break;

        case "Pais_adolescentes":
            p1Age = teenAge();
            p2Age = teenAge();
            parent1 = { name: p1Name, age: p1Age, relationship: 80 };
            parent2 = { name: p2Name, age: p2Age, relationship: 80 };
            break;
    }

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

    case "Mae_adolescente":
        familyText = `👩 Mãe adolescente: ${parent1.name}`;
        break;

    case "Pai_adolescente":
        familyText = `👨 Pai adolescente: ${parent2.name}`;
        break;

    case "Pais_adolescentes":
        familyText = `👨‍👩‍👧 Pais adolescentes: ${parent1.name} e ${parent2.name}`;
        break;
}
   
        

    container.innerHTML = `
        📅 ${birthData.day}/${birthData.month}/${birthData.year}<br>
        ♈ ${birthData.zodiac}<br>
        👶 ${birthData.birthType}<br>
        ${familyText}
    `;
}


// ===============================
// GERAR ÁRVORE GENEALÓGICA
// ===============================

function generateFamilyTree(){

    const male = ["Miguel","Arthur","Theo","Enzo","Rafael","Antonio","Arlo","Liam","Benjamim","Leon","Gael","Heitor"];
    const female = ["Laura","Helena","Sofia","Marina","Beatriz","Catarina","Bianca","Kally","Julia","Aylla","Zoe","Maria Clara"];

    maternalGrandparents = [];
    paternalGrandparents = [];

    if(parent1){
        maternalGrandparents = [
            {name: female[Math.floor(Math.random()*female.length)], age: parent1.age + 25, relationship: 70},
            {name: male[Math.floor(Math.random()*male.length)], age: parent1.age + 28, relationship: 70}
        ];
        maternalUncles = generateRelatives(2, female, male, parent1.age - 5);
    }

    if(parent2){
        paternalGrandparents = [
            {name: female[Math.floor(Math.random()*female.length)], age: parent2.age + 24, relationship: 70},
            {name: male[Math.floor(Math.random()*male.length)], age: parent2.age + 27, relationship: 70}
        ];
        paternalUncles = generateRelatives(2, female, male, parent2.age - 5);
    }

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
            age: Math.floor(Math.random()*maxAge)+1,
            relationship: Math.floor(Math.random()*51)+50 // 50 a 100
        });
    }
    return arr;
}



// ===============================
// ESCOLA
// ===============================

function updateSchool(){

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

    if(previousStage !== schoolStage && schoolStage !== "Nenhuma"){
        addLifeEvent("🎒 Você começou a " + schoolStage + ".");
    }
}


// ===============================
// ENVELHECER
// ===============================

function ageUp(){

    age++;

    if(parent1) parent1.age++;
    if(parent2) parent2.age++;

    maternalGrandparents.forEach(g=>g.age++);
    paternalGrandparents.forEach(g=>g.age++);
    maternalUncles.forEach(u=>u.age++);
    paternalUncles.forEach(u=>u.age++);
    siblings.forEach(s=>s.age++);
    cousins.forEach(c=>c.age++);

    updateSchool();
    maybeHaveSibling();
    addLifeEvent("Nada de especial aconteceu este ano.");

    const ageDisplay = document.getElementById("ageDisplay");
    if(ageDisplay){
        ageDisplay.innerText = age + " anos";
    }

    updateUI();
}
// ===============================
// FUNÇÃO BARRA DE RELACIONAMENTO
// ===============================

function createRelationshipBar(value){
    return `
        <div style="background:#ddd;border-radius:10px;width:100%;height:8px;margin:3px 0;">
            <div style="
                width:${value}%;
                height:100%;
                background:${value>70 ? '#4CAF50' : value>40 ? '#FFC107' : '#F44336'};
                border-radius:10px;">
            </div>
        </div>
    `;
}

// ===============================
// ATUALIZAR FAMÍLIA
// ===============================
function updateUI(){

    const panel = document.getElementById("familyPanel");
    if(!panel) return;

    panel.innerHTML = `
       <h3>👨 Pais</h3>
${parent1 ? `
    ${parent1.name} (${parent1.age})
    ${createRelationshipBar(parent1.relationship)}
` : ""}

${parent2 ? `
    ${parent2.name} (${parent2.age})
    ${createRelationshipBar(parent2.relationship)}
` : ""}
        <h3>👵 Avós Maternos</h3>
        ${maternalGrandparents.map(g=>`
            ${g.name} (${g.age})
            ${createRelationshipBar(g.relationship)}
        `).join("")}

        <h3>👴 Avós Paternos</h3>
        ${paternalGrandparents.map(g=>`
            ${g.name} (${g.age})
            ${createRelationshipBar(g.relationship)}
        `).join("")}

        <h3>👧 Irmãos</h3>
        ${siblings.length ?
    siblings.map((s,index)=>`
        <div style="margin-bottom:8px;cursor:pointer;"
             onclick="interactSibling(${index})">
            ${s.name} (${s.age})
            ${createRelationshipBar(s.relationship)}
        </div>
    `).join("")
    : "Nenhum"}

        <h3>👦 Primos</h3>
        ${cousins.length ?
            cousins.map(c=>`
                ${c.name} (${c.age})
                ${createRelationshipBar(c.relationship)}
            `).join("")
            : "Nenhum"}
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
let selectedSiblingIndex = null;

function interactSibling(index){
    selectedSiblingIndex = index;
    document.getElementById("modalTitle").innerText =
        "Interagir com " + siblings[index].name;
    document.getElementById("familyModal").style.display = "flex";
}

function chooseSiblingAction(action){

    const sibling = siblings[selectedSiblingIndex];

    switch(action){
        case 1:
            sibling.relationship += 10;
            addLifeEvent("❤️ Você passou tempo com " + sibling.name + ".");
            break;
        case 2:
            sibling.relationship += 5;
            addLifeEvent("😊 Você elogiou " + sibling.name + ".");
            break;
        case 3:
            sibling.relationship -= 15;
            addLifeEvent("😡 Você discutiu com " + sibling.name + ".");
            break;
    }

    if(sibling.relationship > 100) sibling.relationship = 100;
    if(sibling.relationship < 0) sibling.relationship = 0;

    closeFamilyModal();
    updateUI();
}

function closeFamilyModal(){
    document.getElementById("familyModal").style.display = "none";
}


function maybeHaveSibling(){

    // 25% de chance por ano
    if(Math.random() < 0.25 && age < 18){

        const male = ["Miguel","Arthur","Theo","Enzo","Rafael"];
        const female = ["Laura","Helena","Sofia","Marina","Beatriz"];

        const isFemale = Math.random() < 0.5;

        const newSibling = {
            name: isFemale ?
                female[Math.floor(Math.random()*female.length)] :
                male[Math.floor(Math.random()*male.length)],
            age: 0,
            relationship: 70
        };

        siblings.push(newSibling);

        addLifeEvent("👶 Você ganhou um novo irmão(a): " + newSibling.name + "!");
    }
}

// ===============================
// EVENTOS
// ===============================

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


