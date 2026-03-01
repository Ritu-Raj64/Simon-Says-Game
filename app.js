let gameOrder=[];
let userOrder=[];

let started=false;
let gameCol=['green','red','yellow','blue']
let level=0;
let Score=0

document.addEventListener('keypress',function(){
    if(started==false){
        started=true;
        levelUp();
    }

});

function btnFlash(btn){
    btn.classList.add("class","game-style");
     setTimeout(()=>{
       btn.classList.remove("class","game-style")
    },250);
}

function levelUp(){
    userOrder=[];
    Score++;
    level++;
    p=document.querySelector('p');
    p.innerText=`level ${level}`;

    let randomIdx=Math.floor(Math.random()*gameCol.length);
    console.log(randomIdx)
    let randomBtn =document.querySelector(`#${gameCol[randomIdx]}`);
     gameOrder.push(gameCol[randomIdx])
     console.log(gameOrder)
    btnFlash(randomBtn);
      
}

function checkAns(idx){
    if(userOrder[idx]===gameOrder[idx]){
        if(userOrder.length==gameOrder.length){
            setTimeout(levelUp,1500);
        }
        
    } else {
        p=document.querySelector('p');
        p.innerHTML=`Game Over! <b>Your Score is: ${level-1}</b>, Press any Key to restart the game. `;
        

        timer = function(){
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
    btn=this;
    btnFlash(btn);

    userCol=btn.getAttribute('id');
    console.log(userCol);
    userOrder.push(userCol);
    console.log(userOrder);

    checkAns(userOrder.length-1);

}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function highScore(){

    if(level>=Score){
        Score=level-1;
    }
    let score=document.querySelector("#score");
    score.innerText=Score;
}

function reset(){
    started=false;
    userOrder=[];
    gameOrder=[];
    highScore();
    level=0;
}
