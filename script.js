let age = 0;
let happiness = 100;
let health = 100;
let currentEvent = null;
let isAlive = true;

function updateStatus() {
    document.getElementById("age").textContent = age;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("health").textContent = health;
}

function ageUp() {

    if (!isAlive) return;

    age++;
    updateStatus();

    generateEvent();
}

function generateEvent() {

    const events = [

        {
            text: "📚 Você teve uma prova difícil.",
            option1: {
                text: "Estudar muito",
                effect: function() {
                    happiness -= 5;
                    health -= 2;
                }
            },
            option2: {
                text: "Descansar",
                effect: function() {
                    happiness += 5;
                    health += 2;
                }
            }
        },

        {
            text: "🍔 Você precisa escolher o que comer.",
            option1: {
                text: "Comer saudável",
                effect: function() {
                    health += 5;
                }
            },
            option2: {
                text: "Fast food",
                effect: function() {
                    happiness += 5;
                    health -= 5;
                }
            }
        },

        {
            text: "🎉 Seus amigos chamaram você para sair.",
            option1: {
                text: "Ir com eles",
                effect: function() {
                    happiness += 10;
                    health -= 3;
                }
            },
            option2: {
                text: "Ficar em casa",
                effect: function() {
                    health += 3;
                }
            }
        }

    ];

    currentEvent = events[Math.floor(Math.random() * events.length)];

    document.getElementById("event").innerHTML = `
        <p>${currentEvent.text}</p>
        <button onclick="chooseOption(1)">${currentEvent.option1.text}</button>
        <button onclick="chooseOption(2)">${currentEvent.option2.text}</button>
    `;
}

function chooseOption(option) {

    if (!isAlive) return;

    if (option === 1) {
        currentEvent.option1.effect();
    } else {
        currentEvent.option2.effect();
    }

    happiness = Math.max(0, Math.min(100, happiness));
    health = Math.max(0, Math.min(100, health));

    updateStatus();

    document.getElementById("event").innerHTML = "";

    checkDeath();
}

function checkDeath() {
    if (health <= 0) {
        isAlive = false;
        gameOver();
    }
}

function gameOver() {

    document.getElementById("ageButton").disabled = true;

    document.getElementById("event").innerHTML = `
        <h2>💀 Você morreu aos ${age} anos!</h2>
        <p>Felicidade final: ${happiness}</p>
        <button onclick="restartGame()">Recomeçar</button>
    `;
}

function restartGame() {

    age = 0;
    happiness = 100;
    health = 100;
    isAlive = true;

    updateStatus();

    document.getElementById("ageButton").disabled = false;

    document.getElementById("event").innerHTML = "";
}
