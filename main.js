const localServer = false;
var backendUrl = "https://api.matejtarca.me"

if (localServer) {
    backendUrl = "localhost:3000"
}

console.log(backendUrl)

let playerID = ""
let gameID = ""
let playerCode = ""
let gameStatus = "FINISHED"
let connectionStatus = false

connectSockets()
initializeCanvas()