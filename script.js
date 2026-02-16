let age = 0;
let happiness = 100;
let health = 100;

function ageUp() {
    age++;

    // Eventos aleatórios que afetam status
    const randomHappiness = Math.floor(Math.random() * 10);
    const randomHealth = Math.floor(Math.random() * 8);

    happiness -= randomHappiness;
    health -= randomHealth;

    if (happiness < 0) happiness = 0;
    if (health < 0) health = 0;

    document.getElementById("age").textContent = age;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("health").textContent = health;

    generateEvent();

    if (health <= 0) {
        document.getElementById("event").innerHTML = "💀 Você morreu!";
    }
}

function generateEvent() {
    const events = [
        "Você fez um novo amigo 😊",
        "Você ficou doente 🤒",
        "Você ganhou dinheiro 💰",
        "Você brigou com alguém 😡",
        "Você teve um dia incrível 🌟"
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    document.getElementById("event").innerHTML = randomEvent;
}
