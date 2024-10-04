let face0 = "url(images/d1.png)"

let face1 = "url(images/d2.png)"

let face2 = "url(images/d3.png)"

let face3 = "url(images/d4.png)"

let face4 = "url(images/d5.png)" 

let face5 = "url(images/d6.png)"

let run = false
let gameOver = false
let regex =  /^[a-öA-Ö]+$/

const players = []

let currentPlayer = null
let currentPlayerIndex = 0

let currentTurnPoints = 0

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
    run = true
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
    if (! run) {
        document.getElementById("error-message").innerHTML = "Valitse pelaajat ensin"
        return;
    } else {
        document.getElementById("error-message").innerHTML = ""
    }

    // get random number from 0 to 5
    let randomdie = Math.round(Math.random()*5)

    // change face of die
    if (randomdie == 0) {
        document.getElementById("die").style.backgroundImage = face0;

        currentTurnPoints = 0
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
    
    else if (randomdie == 1) {
        document.getElementById("die").style.backgroundImage = face1

        currentTurnPoints += 2
    }

    else if (randomdie == 2) {
        document.getElementById("die").style.backgroundImage = face2

        currentTurnPoints += 3
    }

    else if (randomdie == 3) {
        document.getElementById("die").style.backgroundImage = face3

        currentTurnPoints += 4
    }

    else if (randomdie == 4) {
        document.getElementById("die").style.backgroundImage = face4

        currentTurnPoints += 5
    }

    else if (randomdie == 5) {
        document.getElementById("die").style.backgroundImage = face5

        currentTurnPoints += 6
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
    if (currentPlayer.value >= 100) {

        gameOver = true

        document.getElementById("above-die-text").innerHTML = `Pelaaja ${currentPlayer.key} voitti!`
        document.getElementById("restart-game-button").innerHTML = '<button class="restart-button" onclick="restartGame()">Aloita alusta</button>'
        return
    }

    currentTurnPoints = 0

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