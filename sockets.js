function joinGame() {
    playerID = document.getElementById("inputUsername").value
    if (playerID != "") {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                result = JSON.parse(xhr.responseText);
                gameID = result.gameID
                playerCode = result.playerCode
                if (result.message == "OK" || result.message == "IN GAME") {
                    changeGameMenu("GAME START")
                    changeOpponentText(result.opponent)
                    sendObj({
                        playerID: playerID,
                        gameID: gameID,
                        playerCode: playerCode,
                        type: "JOIN"
                    })
                }
            }
        }

        xhr.open("POST", backendUrl + "/get_game", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            playerID: playerID
        }));
    }    
}

function connectSockets() {
    ws = new WebSocket("wss://api.matejtarca.me/websocket/")

    ws.onopen = function(event) {
        setConnectionStatus(true)
    }

    ws.onerror = function(event) {
        setConnectionStatus(false)
    }

    ws.onmessage = function(event) {
        messageHandler(JSON.parse(event.data))
    }
}

function setConnectionStatus(status) {
    connectionStatus = status
    if (status) {
        document.getElementById('connectingStatusIcon').innerHTML = "cloud_done"
        document.getElementById('connectingStatus').innerHTML = "Connected"
        document.getElementById('connectingStatusContent').classList.remove("red")
        document.getElementById('connectingStatusContent').classList.add("green")
    }
    else {
        document.getElementById('connectingStatusIcon').innerHTML = "cloud_off"
        document.getElementById('connectingStatus').innerHTML = "Connection error"
        document.getElementById('connectingStatusContent').classList.remove("green")
        document.getElementById('connectingStatusContent').classList.add("red")
    }
}

function sendObj(data) {
    if (ws.readyState == ws.OPEN) {
        ws.send(JSON.stringify(data))
        return "OK"
    }
    else {
        setConnectionStatus(false)
        return "Connection error"
    }
    
}

function messageHandler(data) {
    if (data.type == 'UPDATE') {
        let boardArr = data.boardState.split(',')
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = boardArr[i + j * 3]
                drawBoard()
            }            
        }
        if (data.turn == playerCode) {
            document.getElementById("turnIndicator").innerHTML = "Your turn"
        }
        else {
            document.getElementById("turnIndicator").innerHTML = "Waiting for opponent move"
        }
    }
    else if (data.type == 'FINISHED') {
        let boardArr = data.boardState.split(',')
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = boardArr[i + j * 3]
                drawBoard()
            }            
        }
        let text = ""
        if (data.result == "0") {
            text = "It was a draw!"
        }
        else if (data.result == playerCode.toString()) {
            text = "You won!"
        }
        else {
            text = "You lost"
        }

        document.getElementById("resultText").innerHTML = text
        changeGameMenu("GAME END")
    }
    else if (data.type == 'OPPONENT FOUND') {
        changeOpponentText(data.opponent)
    }
}

function sendTurn(turn) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            result = JSON.parse(xhr.responseText);
        }
    }

    xhr.open("POST", backendUrl + "/make_turn", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        playerID: playerID,
        x: turn.x,
        y: turn.y
    }));
}