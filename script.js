let gameStarted = false
let scoreEl = document.querySelector("#score")
let highScoreEl = document.querySelector("#high-score")
let userTurn = false
let startBtnEl = document.querySelector("#start-btn")
let pressSpaceEl = document.querySelector("#press-space") 
let howToPageEl = document.querySelector("#how-to-page")
let howToBtnEl = document.querySelector("#how-to-btn")
let tilesContainerEl = document.querySelector("#tiles-container")
let isHowToOn = false
let tileEls = document.querySelectorAll(".tile")

scoreEl.style.visibility = "hidden"
highScoreEl.style.visibility = "hidden"

const colors = ['red', 'yellow', 'blue', 'green']
let compSeq = []	
let score = 0;
let pressCount = 0;
let highScore = 0;

function btnFlash(color) {
    let btnEl = document.querySelector(`#${color}`)
    let flashDuration = 200
    let capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1)
    btnEl.classList.add(`flash${capitalizedColor}`)
    setTimeout(() => {
        btnEl.classList.remove(`flash${capitalizedColor}`)
    }, flashDuration)
}

function enlarge(color) {
    let btnEl = document.querySelector(`#${color}`)
    btnEl.classList.add("enlarge")
    setTimeout(() => {
        btnEl.classList.remove("enlarge")
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
        for (let tileEl of tileEls) {
            tileEl.classList.add("cursor-pointer")
        }
    }, compSeq.length * delay)
    compSeq.push(randColor)
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
                if (navigator.vibrate) {
                    navigator.vibrate(300)
                }
                let correctColor = compSeq[pressCount]
                enlarge(correctColor)
                highScore = score
                highScoreEl.textContent = "High Score: " + highScore;
                gameStarted = false
                gameOver()
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
    for (let tileEl of tileEls) {
        tileEl.classList.remove("cursor-pointer")
    }
    setTimeout(() => {
        compFlash()
    }, 2000)
}

function gameOver() {
    howToBtnEl.style.visibility = "visible"
    if (window.innerWidth <= 900) {
        startBtnEl.style.visibility = "visible"
    } else {
        pressSpaceEl.textContent = "Game Over! Press the SPACE key to restart game"
        pressSpaceEl.style.visibility = "visible"
    }
    for (let tileEl of tileEls) {
        tileEl.classList.remove("cursor-pointer")
    }
}

setInterval(() => {
    scoreEl.textContent = `Score: ${score}`
    highScoreEl.textContent = `High Score: ${highScore}`
}, 100)

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        startGame();
    }
})

startBtnEl.addEventListener("click", () => {
    startGame()
})

howToBtnEl.addEventListener("click", () => {
    if (isHowToOn) {
        isHowToOn = false
        howToPageEl.style.visibility = "hidden"
        howToBtnEl.firstElementChild.textContent = "?"
        scoreEl.style.visibility = "visible"
        highScoreEl.style.visibility = "visible"
        startBtnEl.style.visibility = "visible"
        pressSpaceEl.style.visibility = "visible"
        tilesContainerEl.style.visibility = "visible"
    } else {
        isHowToOn = true
        howToPageEl.style.visibility = "visible"
        howToBtnEl.firstElementChild.textContent = "X"
        scoreEl.style.visibility = "hidden"
        highScoreEl.style.visibility = "hidden"
        startBtnEl.style.visibility = "hidden"
        pressSpaceEl.style.visibility = "hidden"
        tilesContainerEl.style.visibility = "hidden"
    }
})

function startGame() {
    if (gameStarted === false) {

        gameStarted = true
        pressSpaceEl.style.visibility = "hidden"
        startBtnEl.style.visibility = "hidden"
        howToBtnEl.style.visibility = "hidden"
        scoreEl.style.visibility = "visible"
        highScoreEl.style.visibility = "visible"

        pressCount = 0
        score = 0
        compSeq = []
    
        scoreEl.textContent = `Score: ${score}`

        for (let tileEl of tileEls) {
            tileEl.classList.add("cursor-pointer")
        }

        compFlash()
    }
}