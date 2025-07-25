const gameBoard = document.getElementById('game-board');
const boardSize = 600;
const blockSize = 25;
let snake = [
    { x: 100, y: 100 },
    { x: 80, y: 100 },
    { x: 60, y: 100 }
];
let direction = 'RIGHT';
let food = { x: 200, y: 200 };
let gameInterval;

let score = 0;
let niveau = 1;
let best_score = 0;

let vitesse = 200;

// Fonction pour dessiner le serpent
function drawSnake() {
    gameBoard.innerHTML = ''; // Efface tout sur le plateau
    snake.forEach(segment => {
        const snakeBlock = document.createElement('div');
        snakeBlock.classList.add('snake-block');
        snakeBlock.style.left = `${segment.x}px`;
        snakeBlock.style.top = `${segment.y}px`;
        gameBoard.appendChild(snakeBlock);
    });
}

// Fonction pour dessiner la nourriture
function drawFood() {
    const foodBlock = document.createElement('div');
    foodBlock.classList.add('food');
    foodBlock.style.left = `${food.x}px`;
    foodBlock.style.top = `${food.y}px`;
    gameBoard.appendChild(foodBlock);
}

// Fonction pour déplacer le serpent
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= blockSize;
    if (direction === 'DOWN') head.y += blockSize;
    if (direction === 'LEFT') head.x -= blockSize;
    if (direction === 'RIGHT') head.x += blockSize;

    snake.unshift(head); // Ajouter la nouvelle tête du serpent

  // Si la tête touche la nourriture
    if (head.x === food.x && head.y === food.y) {
        generateFood(); // Créer une nouvelle nourriture
        score += 1; // Augmenter le score
        updateScore(); // Mettre à jour l'affichage du score
    } else {
        snake.pop(); // Enlever la dernière partie du serpent (le "queue")
    }
}

// Vérifie les collisions avec les bords ou avec le corps du serpent
function checkCollisions() {
    const head = snake[0];

  // Collision avec les bords
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        clearInterval(gameInterval); // Arrête le jeu
        if (score > best_score) {
            best_score = score;
            document.getElementById("best_score").innerHTML = `Best score : ${best_score}`;
        }
    }

  // Collision avec le corps du serpent
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(gameInterval); // Arrête le jeu
            if (score > best_score) {
                best_score = score;
                document.getElementById("best_score").innerHTML = `Best score : ${best_score}`;
            }
        }
    }

}

// Génère une nouvelle position de nourriture
function generateFood() {
    const min = 50;  // 50px de marge
    const max = boardSize - blockSize - 50;  // Pour laisser 50px de marge sur les côtés

    // On génère une position aléatoire qui respecte le "grid" (multiples de blockSize)
    food.x = Math.floor(Math.random() * ((max - min) / blockSize)) * blockSize + min;
    food.y = Math.floor(Math.random() * ((max - min) / blockSize)) * blockSize + min;
}

function changeBackgroundColor() {
    const colorMap = [
        "#282828", // Niveau 1 (gris foncé)
        "#000057", // Niveau 2 (bleu foncé)
        "#004f00", // Niveau 3 (vert foncé)
        "#ffff00", // Niveau 4 (jaune)
        "#ff00b3", // Niveau 5 (rose)
        "#00ff00", // Niveau 6 (vert clair)
        "#00ccff", // Niveau 7 (bleu clair)
        "#ffcc00", // Niveau 8 (jaune clair)
        "#6600cc", // Niveau 9 (violet)
        "#ff3300",  // Niveau 10 (rouge)
        "#ff000080",
        "#ff4848",
        "#ff8400",
        "#ff0051",
        "#ff0000"
    ];

    // Change la couleur en fonction du niveau, avec un maximum de 10 niveaux
    document.body.style.backgroundColor = colorMap[Math.min(niveau - 1, colorMap.length - 1)];
}

// Met à jour le texte du score dans la balise <h2>
function updateScore() {
    document.getElementById("score").innerHTML = `Score : ${score}`;
    document.getElementById("niveau").innerHTML = `Level : ${niveau}`;

    if (score >= 5 * niveau) {
        niveau += 1;
        vitesse = Math.max(50, 200 - (niveau - 1) * 20);  // Réduire la vitesse, mais garder une valeur minimale
        changeBackgroundColor();

        if (niveau === 2) {
            document.getElementById("titres_txt").innerHTML = `Bravo, c'est un bon début.`;
        }
        if (niveau === 3) {
            document.getElementById("titres_txt").innerHTML = `Tu t'améliore.`;
        }
        if (niveau === 4) {
            document.getElementById("titres_txt").innerHTML = `un de plus, c'est mieux.`;
        }
        if (niveau === 5) {
            document.getElementById("titres_txt").innerHTML = `C'est de mieux en mieux...`;
        }
        if (niveau === 6) {
            document.getElementById("titres_txt").innerHTML = `ça à l'aire facile.`;
        }
        if (niveau === 7) {
            document.getElementById("titres_txt").innerHTML = `WOW, tu enchaines !!!`;
        }
        if (niveau === 8) {
            document.getElementById("titres_txt").innerHTML = `C'est bien mais j'ai déja vu mieux.`;
        }
        if (niveau === 9) {
            document.getElementById("titres_txt").innerHTML = `C'est que de la chance.`;
        }
        if (niveau === 10) {
            document.getElementById("titres_txt").innerHTML = `Déja niveau 10, BRAVO !`;
        }
        if (niveau === 11) {
            document.getElementById("titres_txt").innerHTML = `Un de plus.`;
        }
        if (niveau === 12) {
            document.getElementById("titres_txt").innerHTML = `C'est de mieux en mieux.`;
        }
        if (niveau === 13) {
            document.getElementById("titres_txt").innerHTML = `Tu es très fort(e) !`;
        }
        if (niveau === 14) {
            document.getElementById("titres_txt").innerHTML = `Tu n'as pas l'aire impressionné(e) .`;
        }
        if (niveau >= 15) {
            document.getElementById("titres_txt").innerHTML = `Tu es sans doute l'un(e) des meilleurs(es) .`;
        }

    }
}

// Contrôle du serpent avec les touches du clavier
document.addEventListener('keydown', (event) => {
    if (event.key === 'z' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 's' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'q' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'd' && direction !== 'LEFT') direction = 'RIGHT';
});

// Fonction principale du jeu
function gameLoop() {
    moveSnake();
    checkCollisions();
    drawSnake();
    drawFood();
}

// Démarrer le jeu
function startGame() {
    generateFood(); // Crée la première nourriture
    gameInterval = setInterval(gameLoop, 200); // Met à jour le jeu toutes les 100 ms
}

function start() {
    // Réinitialiser la position du serpent à son état initial
    snake = [
        { x: 100, y: 100 },
        { x: 80, y: 100 },
        { x: 60, y: 100 }
    ];
    direction = 'RIGHT';  // Réinitialiser la direction
    score = 0;            // Réinitialiser le score
    niveau = 1
    vitesse = 200;
    document.getElementById('score').innerHTML = `Score : ${score}`;  // Afficher le score réinitialisé
    document.getElementById('niveau').innerHTML = `Niveau : ${niveau}`;  // Afficher le score réinitialisé
    document.getElementById("titres_txt").innerHTML = `C'est parti !!!`;
    document.body.style.backgroundColor = "#282828";

    // Relancer le jeu
    clearInterval(gameInterval);
    
    startGame();
}

