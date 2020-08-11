const backendUrl = "192.168.0.108:3000"

let playerID = ""
let gameID = ""
let playerCode = ""
let gameStatus = "FINISHED"
let connectionStatus = false

connectSockets()
initializeCanvas()