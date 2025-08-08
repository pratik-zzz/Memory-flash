let gameStarted = false
let scoreEl = document.querySelector("#score")
let highScoreEl = document.querySelector("#high-score")
let userTurn = false
let startBtnEl = document.querySelector("#start-btn")
let pressSpaceEl = document.querySelector("#press-space") 

const colors = ['red', 'yellow', 'blue', 'green']
let compSeq = []
let score = 0;
let pressCount = 0;
let highScore = 0;

function btnFlash(color) {
    let btnEl = document.querySelector(`#${color}`)
    btnEl.classList.add("flash")
    setTimeout(() => {
        btnEl.classList.remove("flash")
    }, 200)
}

function btnFlashRed(color) {
    let btnEl = document.querySelector(`#${color}`)
    btnEl.classList.add("flashRed")
    setTimeout(() => {
        btnEl.classList.remove("flashRed")
    }, 200)
}

function glow(color) {
    let btnEl = document.querySelector(`#${color}`)
    btnEl.classList.add("glow")
    setTimeout(() => {
        btnEl.classList.remove("glow")
    }, 3000)
}

function compFlash() {
    userTurn = false
    let delay = 600
    for (let i = 0; i < compSeq.length; i++) {
        setTimeout(() => {
            btnFlash(compSeq[i])
        }, i * delay)
    }
    let randIndex = Math.floor(Math.random() * colors.length)
    let randColor = colors[randIndex]
    setTimeout(() => {
        btnFlash(randColor)
        userTurn = true 
    }, compSeq.length * delay)
    compSeq.push(randColor)
    console.log(`compSeq: ${compSeq}`)
}

function checkAccuracy(event) {
    let tileEl = event.currentTarget;
    let color = tileEl.id
	if (!gameStarted) return;
    if (userTurn) {
        btnFlash(color)
        if (pressCount < compSeq.length) {
            if (color === compSeq[pressCount]) {
                pressCount++
                if (pressCount === compSeq.length) {
                    levelUp()
                }
            } else {
                btnFlashRed(color)
                let correctColor = compSeq[pressCount]
                glow(correctColor)
                highScore = score
                highScoreEl.textContent = "High Score: " + highScore;
                gameStarted = false
                setTimeout(gameOver, 3000)
                scoreEl.textContent = `Game Over! Score: ${score}` 
            }
        }  
    }
}

let tilesEl = document.querySelectorAll('div.tile')
    for (let tileEl of tilesEl) {
        tileEl.addEventListener('click', checkAccuracy)
    }
    
function levelUp() {
    score += 1
    pressCount = 0
    scoreEl.textContent = `Score: ${score}`
    userTurn = false
    setTimeout(() => {
        compFlash()
    }, 2000)
}

function gameOver() {
    pressSpaceEl.style.display = "block"
    pressSpaceEl.textContent = "Press the SPACE key to restart game"
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        startGame();
    }
})

startBtnEl.addEventListener("click", () => {
    startGame()
})

function startGame() {
    if (gameStarted === false) {
        gameStarted = true
        pressSpaceEl.style.display = "none"
        startBtnEl.style.display = "none"

        score = 0
        compSeq = []
    
        scoreEl.textContent = `Score: ${score}`
        compFlash()
    }
}