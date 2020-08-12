const backendUrl = "172.105.67.251:3000"

let playerID = ""
let gameID = ""
let playerCode = ""
let gameStatus = "FINISHED"
let connectionStatus = false

connectSockets()
initializeCanvas()