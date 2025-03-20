const border = document.getElementById("border");
const ctx = border.getContext("2d");
const topB = document.getElementById("top");
const botB = document.getElementById("bot");
const leftB = document.getElementById("left");
const rightB = document.getElementById("right");
const step = 20;

let box = { x: 50, y: 50, width: 100, height: 100, color: "blue" };  
let ball = { x: Math.random() * (border.width - 50) + 25, y: Math.random() * (border.height - 50) + 25, radius: 25, angle: Math.PI / 4, 
    speed: 4, dx: 0, dy: 0 };
let triangle = { x: 250, y: 450, size: 50, color: "yellow",speed: 0,  gravity: 1,  jumpPower: -24,  isJumping: false };

border.width = 500;
border.height = 500;


function ballSpeed() {
    ball.dx = ball.speed * Math.cos(ball.angle);
    ball.dy = ball.speed * Math.sin(ball.angle);
}


function draw() {
    ctx.clearRect(0, 0, border.width, border.height); 

  
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "red";
    ctx.fill();

   
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);

    ctx.fillStyle = triangle.color;
    ctx.beginPath();
    ctx.moveTo(triangle.x, triangle.y); 
    ctx.lineTo(triangle.x - triangle.size / 2, triangle.y + triangle.size); 
    ctx.lineTo(triangle.x + triangle.size / 2, triangle.y + triangle.size); 
    ctx.closePath();
    ctx.fill(); 
}


function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

   
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > border.width) {
        ball.dx = -ball.dx;  
    }

 
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > border.height) {
        ball.dy = -ball.dy;  
    }


    if (
        ball.x + ball.radius > box.x &&    
        ball.x - ball.radius < box.x + box.width && 
        ball.y + ball.radius > box.y &&    
        ball.y - ball.radius < box.y + box.height 
    ) {
       
        box.color = "red";
    } else {
       
        box.color = "blue";
    }
}

function updateTriangle() {
    if (triangle.isJumping) {
        triangle.speed = triangle.jumpPower;
        triangle.isJumping = false;
    }

    triangle.speed += triangle.gravity;
    triangle.y += triangle.speed;

    if (triangle.y > 450) {
        triangle.y = 450;
        triangle.speed = 0;
    }
}

function animate() {
    moveBall();  
    updateTriangle();
    draw();  
    requestAnimationFrame(animate); 
}


topB.onclick = moveTop;
botB.onclick = moveBot;
leftB.onclick = moveLeft;
rightB.onclick = moveRight;


document.addEventListener("keydown", function(event) {
    if (event.key === " " && triangle.y === 450) {
        triangle.isJumping = true; 
    }

    
    switch (event.key) {
        case "ArrowUp":
            if (box.y > 0) box.y -= 20;
            break;
        case "ArrowDown":
            if (box.y + box.height < border.height) box.y += 20;
            break;
        case "ArrowLeft":
            if (box.x > 0) box.x -= 20;
            break;
        case "ArrowRight":
            if (box.x + box.width < border.width) box.x += 20;
            break;
    }
});



function moveTop() {
    if (box.y > 0) box.y -= step;  
    draw();  
}

function moveBot() {
    if (box.y + box.height < border.height) box.y += step;  
    draw(); 
}

function moveLeft() {
    if (box.x > 0) box.x -= step; 
    draw();  
}

function moveRight() {
    if (box.x + box.width < border.width) box.x += step;  
    draw();  
}



ballSpeed(); 
animate();  
