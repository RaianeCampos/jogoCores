const cores = ["Azul", "Vermelha", "Amarela", "Verde", "Rosa", "Laranja", "Marrom"];
const coresHex = {
    "Azul": "#0000FF",
    "Vermelha": "#FF0000",
    "Amarela": "#FFFF00",
    "Verde": "#008000",
    "Rosa": "#FFC0CB",
    "Laranja": "#FFA500",
    "Marrom": "#A52A2A"
};

let pontos = 0;
let rodadas = 0;
let corAtual = "";
let cronometro;

const corDescElement = document.getElementById("corDescricao");
const coresOp = document.getElementById("coresOp");
const pontosElement = document.getElementById("pontos");
const rodadasElement = document.getElementById("rodadas");
const iniciarBtn = document.getElementById("iniciarBtn");

iniciarBtn.addEventListener("click", iniciarJogo);

function iniciarJogo() {
    pontos = 0;
    rodadas = 0;
    pontosElement.textContent = pontos;
    rodadasElement.textContent = rodadas;
    iniciarBtn.style.display = "none";
    proxRodada();
}

function getCorRandom() {
    return cores[Math.floor(Math.random() * cores.length)];
}

function sortCores() {
    const coresRandom = cores.slice();
    for (let i = coresRandom.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [coresRandom[i], coresRandom[j]] = [coresRandom[j], coresRandom[i]];
    }
    return coresRandom;
}

function controleRodada() {
    if (cronometro) clearTimeout(cronometro);
    corAtual = getCorRandom();
    corDescElement.textContent = `Clique na cor: ${corAtual}`;
    
    const sortCor = sortCores();
    coresOp.innerHTML = "";
    sortCor.forEach(color => {
        const corBtn = document.createElement("div");
        corBtn.classList.add("corBtn");
        corBtn.style.backgroundColor = coresHex[color];
        
        corBtn.addEventListener("click", () => checarCor(color));
        coresOp.appendChild(corBtn);
    });

    cronometro = setTimeout(() => {
        if (rodadas <= 10) {
            proxRodada();
        }
    }, 2000);
}

function checarCor(selectedColor) {
    if (selectedColor === corAtual) {
        pontos++;
    }
    pontosElement.textContent = pontos;
    if (rodadas <= 10) {
        proxRodada();
    }
}

function proxRodada() {
    if (rodadas < 10) {
        rodadas++;
        rodadasElement.textContent = rodadas;
        controleRodada();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    corDescElement.textContent = `Fim do jogo! Pontuação final: ${pontos}`;
    coresOp.innerHTML = "";
    iniciarBtn.style.display = "inline-block";
}

