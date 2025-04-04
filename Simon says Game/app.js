let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purple" ];
let started = false;
let level = 0;
let h2 = document.querySelector('h2');

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("game stated");
        started = true;
        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText =  `Level  ${level}`;
    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randomBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
}


function checkAns(idx) {
    // console.log("`current level :",level);
    

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        h2.innerHTML =  `Game Over! Your Score was <b>${level}</b>. <br>Press any key to start game.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    console.log(this);
    userFlash(btn);

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}