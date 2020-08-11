let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let ctx = {}
let c = {}

function initializeCanvas() {

    documentWidth = getWidth()

    if (documentWidth >= 520) {
        width = 500
    }
    else {
        width = documentWidth - 20
    }
    height = width

    c = document.getElementById("mainCanvas");
    c.width = width
    c.height = height
    ctx = c.getContext("2d");

    drawGrid()

    c.addEventListener('mousedown', function(e) {
        let pos = getCursorPosition(c, e)
        clickOnCanvas(pos)
    })
    
}

function drawGrid() {
    for (let i = 0; i < 4; i++) {

        ctx.beginPath();
        ctx.moveTo(width / 3 * i, 0);
        ctx.lineTo(width / 3 * i, height);
        ctx.moveTo(0, height / 3 * i);
        ctx.lineTo(width, height / 3 * i);
        ctx.strokeStyle = "#66FCF1";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();

    }
}

function drawBoard() {
    ctx.clearRect(0, 0, width, height);
    drawGrid()
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const element = board[i][j];
            drawPlayer(element, i * width / 3, j * height / 3)
        }
        
    }
}

function drawPlayer(num, x, y) {
    if (num == playerCode) {
        x += width / 3 / 5
        y += height / 3 / 5
        offsetW = width / 3 / 5 * 3
        offsetH = height / 3 / 5 * 3
        ctx.beginPath();
        ctx.strokeStyle = "#C3073F";
        ctx.lineWidth = 10;
        ctx.moveTo(x, y)
        ctx.lineTo(x + offsetW, y + offsetH)
        ctx.moveTo(x + offsetW, y)
        ctx.lineTo(x, y + offsetH)
        ctx.stroke()
        ctx.closePath()

    }
    else if (num != 0) {
        ctx.beginPath()
        ctx.strokeStyle = "#3500D3";
        ctx.lineWidth = 10;
        ctx.arc(x + width / 3 / 2, y + height / 3 / 2, width / 3 / 5 * 3 / 2, 0, 2 * Math.PI);        
        ctx.stroke();
        ctx.closePath()
    }
}

function clickOnCanvas(pos) {
    let x_pos = Math.floor(pos.x / (width / 3))
    let y_pos = Math.floor(pos.y / (height / 3))
    if (board[x_pos][y_pos] == 0) {
        sendTurn({x: x_pos, y: y_pos})
    }    
}

function getCursorPosition(canvas, event) {

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {x: x, y: y}

}

function changeGameMenu(state) {
    if (state == "GAME START") {
        document.getElementById("resultScreen").setAttribute("style", "display: none;");
        document.getElementById("joinScreen").setAttribute("style", "display: none;");
        document.getElementById("gameInfoScreen").setAttribute("style", "");
    }
    else if (state == "GAME END") {
        document.getElementById("resultScreen").setAttribute("style", ""); 
        document.getElementById("joinScreen").setAttribute("style", "");
        document.getElementById("gameInfoScreen").setAttribute("style", "");
    }
}

function changeOpponentText(opponent) {
    if (opponent == null) {
        text = "Waiting for opponent"
        document.getElementById("turnIndicator").setAttribute("style", "display: none;")
    }
    else {
        text = `Opponent: ${opponent}`
        document.getElementById("turnIndicator").setAttribute("style", "")
    }
    document.getElementById("opponentText").innerHTML = text
}


function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }