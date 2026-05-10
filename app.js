let gameOrder=[];
let userOrder=[];

let started=false;
let gameCol=['green','red','yellow','blue']
let level=0;
let Score=0
let highScoreValue = 0;


function startGame(){

    if(started == false){

        started = true;

        levelUp();
    }
}


/* keyboard */

document.addEventListener(
    "keydown",
    startGame
);


/* mobile touch */
document.querySelector(".container")
    .addEventListener(
        "touchstart",
        startGame
);


/* mouse click */

document.querySelector(".container")
    .addEventListener(
        "click",
        startGame
);



function btnFlash(btn){
    btn.classList.add("game-style");
     setTimeout(()=>{
       btn.classList.remove("game-style");
    },250);
}

function levelUp(){

    userOrder = [];

    level++;

    let p = document.querySelector("p");

    p.innerText = `Level ${level}`;

    let randomIdx =
        Math.floor(Math.random() * gameCol.length);

    let randomColor =
        gameCol[randomIdx];

    let randomBtn =
        document.querySelector(`#${randomColor}`);

    gameOrder.push(randomColor);

    btnFlash(randomBtn);
}

function checkAns(idx){
    if(userOrder[idx]===gameOrder[idx]){
        if(userOrder.length==gameOrder.length){
            setTimeout(levelUp,1500);
        }
        
    } else {
       
        let p = document.querySelector("p");

        p.innerHTML =
            `Game Over! 
            <b>Your Level was: ${level-1}</b><br>
            Tap or Press Any Key to Restart`;


        

        let timer = function(){
            document.querySelector("body").classList.toggle("red");
        };

        
        let id = setInterval(timer, 200);


        setTimeout(function(){
            clearInterval(id);
            document.querySelector("body").classList.remove("red");
        }, 1200);
       highScore();
        reset();

    }
}

function btnPress(){
   if(started==true){
    let btn=this;
    btnFlash(btn);

    let userCol=btn.getAttribute('id');
   
    userOrder.push(userCol);
    

    checkAns(userOrder.length-1);
   }

}

let allBtns=document.querySelectorAll('.btn');
for(let btn of allBtns){
    btn.addEventListener('click',btnPress);
}


function highScore(){

    if(level > highScoreValue){

        highScoreValue = level;
    }

    let score = document.querySelector("#score");

    score.innerText = highScoreValue;
}



function reset(){
    started=false;
    userOrder=[];
    gameOrder=[];
    highScore();
    level=0;
}
