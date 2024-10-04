let face0 = "url(images/d1.png)"

let face1 = "url(images/d2.png)"

let face2 = "url(images/d3.png)"

let face3 = "url(images/d4.png)"

let face4 = "url(images/d5.png)" 

let face5 = "url(images/d6.png)"

let playersChosen = false
let gameOver = false

let regex =  /^[a-öA-Ö]+$/

const players = []

let currentPlayer = null
let currentPlayerIndex = 0

let currentTurnPoints = 0

let doublesInARow = 0

function addPlayer() {
    if (document.getElementById("player-name").value == "") {
        return;
    }

    document.getElementById("players-text").innerHTML = "Pelaajat:"

    // test if name has only letters
    if (! regex.test(document.getElementById("player-name").value)) {
        document.getElementById("error-message").innerHTML = "Nimessä tulee olla vain kirjaimia"
        return;
    } else {
        document.getElementById("error-message").innerHTML = ""
    }

    players.push({
        key: document.getElementById("player-name").value,
        value: 0
    })
    displayPlayers()
}

function displayPlayers() {
    document.getElementById("display-players").innerHTML = ""
    for (let player of players) {
        document.getElementById("display-players").innerHTML += `${player.key} pisteet: ${player.value} <br>`
    }
}

function startGame() {
    if (players.length < 2) {
        document.getElementById("error-message").innerHTML = "Lisää vähintään kaksi pelaajaa"
        return;
    } else {
        document.getElementById("error-message").innerHTML = ""
    }

    currentPlayer = players[currentPlayerIndex]
    
    document.getElementById("add-players").innerHTML = ""
    playersChosen = true
    displayPlayerTurn(currentPlayer.key)
}

function displayPlayerTurn(player) {
    document.getElementById("above-die-text").innerHTML = `Pelaajan ${player} vuoro`
}

function throwdie() {

    if (gameOver) {
        return
    }

    // check if at least two players
    if (! playersChosen) {
        document.getElementById("error-message").innerHTML = "Valitse pelaajat ensin"
        return;
    } else {
        document.getElementById("error-message").innerHTML = ""
    }

    // get random number from 0 to 5
    let randomdie1 = Math.round(Math.random()*5)
    let randomdie2 = Math.round(Math.random()*5)

    const faceNumber = {
        0: face0,
        1: face1,
        2: face2,
        3: face3,
        4: face4,
        5: face5
    }

    // change face of die
    document.getElementById("die-1").style.backgroundImage = faceNumber[randomdie1]
    document.getElementById("die-2").style.backgroundImage = faceNumber[randomdie2]
    
    if (randomdie1 == 0 && randomdie2 == 0) {
        doublesInARow += 1

        currentTurnPoints += 25
    }

    else if (randomdie1 == 0 || randomdie2 == 0) {
        currentTurnPoints = 0
        doublesInARow = 0
        if (currentPlayerIndex == (players.length - 1)) {
            currentPlayerIndex = 0
            currentPlayer = players[currentPlayerIndex]
        } else {
            currentPlayerIndex += 1
            currentPlayer = players[currentPlayerIndex]
        }
        displayTurnPoints()
        displayPlayerTurn(currentPlayer.key)

        return;
    }
    
    else if (randomdie1 == 1 && randomdie2 == 1) {
        currentTurnPoints += 8
        doublesInARow += 1

    }

    else if (randomdie1 == 2 && randomdie2 == 2) {
        currentTurnPoints += 12
        doublesInARow += 1

    }

    else if (randomdie1 == 3 && randomdie2 == 3) {
        currentTurnPoints += 16
        doublesInARow += 1

    }

    else if (randomdie1 == 4 && randomdie2 == 4) {
        currentTurnPoints += 20
        doublesInARow += 1

    }

    else if (randomdie1 == 5 && randomdie2 == 5) {
        currentTurnPoints += 24
        doublesInARow += 1

    }

    else {
        doublesInARow = 0
        currentTurnPoints += (randomdie1 + 1 + randomdie2 + 1)
    }

    if (doublesInARow == 3) {
        endTurn()
    }

    displayTurnPoints()
}

function displayTurnPoints() {
    document.getElementById("turn-points").innerHTML = `Pisteet <br> ${currentTurnPoints}`
}

function endTurn() {

    if (gameOver) {
        return
    }

    currentPlayer.value += currentTurnPoints
    displayPlayers()

    doublesInARow = 0

    if (currentPlayer.value >= 100) {
        
        gameOver = true

        document.getElementById("above-die-text").innerHTML = `Pelaaja ${currentPlayer.key} voitti!`
        document.getElementById("restart-game-button").innerHTML = '<button class="restart-button" onclick="restartGame()">Aloita alusta</button>'
        return
    }

    currentTurnPoints = 0

    // change current player
    if (currentPlayerIndex == (players.length - 1)) { 
        currentPlayerIndex = 0
        currentPlayer = players[currentPlayerIndex]
    } else {
        currentPlayerIndex += 1
        currentPlayer = players[currentPlayerIndex]
    }

    displayTurnPoints()
    displayPlayerTurn(currentPlayer.key)
}

function restartGame() {
    location.reload()
}