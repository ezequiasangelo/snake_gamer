let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = []; //criar cobra como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
    color: "#BC3939" // Cor inicial da comida
}

function getRandomColor() {
    // Gera uma cor hexadecimal aleatória
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function criarBG() {
    // Cria um gradiente linear para o fundo
    let gradient = context.createLinearGradient(0, 0, 16*box, 0);
    gradient.addColorStop(0, "black");

    // Define o gradiente como o estilo de preenchimento do contexto
    context.fillStyle = gradient;

    // Desenha o fundo do canvas com o gradiente
    context.fillRect(0, 0, 16*box, 16*box);

    // Desenha a grade de quadradinhos
    for(let i = 0; i < 16; i++) {
        for(let j = 0; j < 16; j++) {
            // Escolhe uma cor mais clara para os quadradinhos
            context.fillStyle = "black";
            context.fillRect(i * box, j * box, box, box);
            
            // Desenha as bordas dos quadrados
            context.strokeStyle = "rgba(255, 255, 255, 0.3)";
            context.strokeRect(i * box, j * box, box, box);
        }
    }
}


function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        // Defina a cor de preenchimento da cobra
        context.fillStyle = "#17B874";
        
        // Desenhe retângulos com cantos arredondados
        drawRoundedRect(context, snake[i].x, snake[i].y, box, box, 8);
    }
}

// Função para desenhar um retângulo com bordas arredondadas
function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

function drawFood() {
    // Define a cor da comida
    context.fillStyle = food.color;

    // Desenha um círculo no lugar da comida
    context.beginPath();
    context.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
    context.fill();
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        // Gera uma nova posição e cor para a comida
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        food.color = getRandomColor(); // Muda a cor da comida
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100);
