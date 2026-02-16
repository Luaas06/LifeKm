function ageUp() {

    if (health <= 0) {
        return;
    }

    age++;

    document.getElementById("age").textContent = age;

    generateEvent();

    if (health <= 0) {
        gameOver();
    }
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
                text: "Ignorar e descansar",
                effect: function() {
                    happiness += 5;
                    health += 2;
                }
            }
        },

        {
            text: "🍔 Você quer escolher o que comer.",
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

    if (option === 1) {
        currentEvent.option1.effect();
    } else {
        currentEvent.option2.effect();
    }

    // Limitar valores
    if (happiness < 0) happiness = 0;
    if (health < 0) health = 0;
    if (happiness > 100) happiness = 100;
    if (health > 100) health = 100;

    document.getElementById("happiness").textContent = happiness;
    document.getElementById("health").textContent = health;

    document.getElementById("event").innerHTML = "";
}
function gameOver() {

    document.querySelector("button").disabled = true;

    document.getElementById("event").innerHTML = `
        <h2>💀 Você morreu aos ${age} anos!</h2>
        <p>Felicidade final: ${happiness}</p>
        <p>Saúde final: ${health}</p>
        <button onclick="restartGame()">Recomeçar</button>
    `;
}

function restartGame() {
    age = 0;
    happiness = 100;
    health = 100;

    document.getElementById("age").textContent = age;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("health").textContent = health;

    document.querySelector("button").disabled = false;

    document.getElementById("event").innerHTML = "";
}

