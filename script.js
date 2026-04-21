const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const startBtn = document.getElementById("start-btn");

canvas.width = 400;
canvas.height = 600;

let score = 0;
let gameRunning = false;
let player = { x: 180, y: 530, width: 40, height: 40, color: "#00f2ff" };
let obstacles = [];

function createObstacle() {
    const size = Math.random() * 30 + 20;
    obstacles.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: 3 + Math.random() * 4
    });
}

function update() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 畫玩家
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 處理障礙物
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let o = obstacles[i];
        o.y += o.speed;
        
        ctx.fillStyle = "#ff007b";
        ctx.shadowColor = "#ff007b";
        ctx.fillRect(o.x, o.y, o.width, o.height);

        // 碰撞檢測
        if (player.x < o.x + o.width && player.x + player.width > o.x &&
            player.y < o.y + o.height && player.y + player.height > o.y) {
            gameRunning = false;
            alert("遊戲結束！得分：" + score);
            location.reload();
        }

        if (o.y > canvas.height) {
            obstacles.splice(i, 1);
            score++;
            scoreElement.innerText = score;
        }
    }

    if (Math.random() < 0.05) createObstacle();
    requestAnimationFrame(update);
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) player.x -= 25;
    if (e.key === "ArrowRight" && player.x < canvas.width - player.width) player.x += 25;
});

startBtn.addEventListener("click", () => {
    document.getElementById("ui").style.display = "none";
    gameRunning = true;
    update();
});
