let gameSeq=[];
let userSeq=[];
let btns =["yellow","red","purple","green"];
let started=false;
let level=0;
let highestScore=0;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;
        levelUp();
    }
});
function gameFlash(btn) {
    btn.classList.add("flash"); 
        setTimeout(function (){
            btn.classList.remove("flash");
        },250);
    }
    function userFlash(btn) {
        btn.classList.add("userFlash");
        setTimeout(function(){
            btn.classList.remove("userFlash");
        },250);
    }

function levelUp() {
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor =btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}
function checkAns(){
    let idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){
    if(userSeq.length==gameSeq.length){
        setTimeout(levelUp,1000);
    }
    }
    else{
        if(level>highestScore){
            highestScore=level;
        }
        h2.innerHTML=`Game Over! Your score was <b>${level}</b><br> Highest Score:<b>${highestScore}</b><br> Press any ley to start.`;
        document.querySelector("body").style.backgroundColor= "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor= btn.getAttribute("id");
    console.log(userColor);
    checkAns();
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[]
    level=0;
}