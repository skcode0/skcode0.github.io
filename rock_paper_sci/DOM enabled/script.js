// can play via DOM
//finished: 11/6/20

let images = document.querySelectorAll("img");

function game(){
    images.forEach(img => {
        img.addEventListener("click", (e) =>{
            playRound(e.target.id, computerPlay());
        })
    });
}

//playing game aginst computer
let loggerList = document.getElementById("loggerList");
let myScore = document.getElementById("update-myScore");
let compScore = document.getElementById("update-compScore");
let displayRounds = document.getElementById("round");
let myScoreBG = document.querySelector(".myScore");
let compScoreBG = document.querySelector(".compScore");
let playerScore = 0;
let computerScore = 0;
let round = 0;

function playRound(playerSelection, computerSelection){
    
    li = document.createElement("li");
    li.style.fontSize = "1.3rem";
    round++;
    displayRounds.textContent = round;
    //tie condition
    if(playerSelection === computerSelection){
        li.textContent = `${round}. It's a TIE! Both played ${playerSelection}.`;
        li.style.backgroundColor = "grey";
    }
    //win condition
    else if(playerSelection === "paper" && computerSelection === "rock" || playerSelection === "rock" && computerSelection === "scissors" || playerSelection === "scissors" && computerSelection === "paper"){
        playerScore++;
        myScore.textContent = playerScore;
        li.textContent = `${round}. You WIN! You played ${playerSelection}, which beats computer's ${computerSelection}.`;
        li.style.backgroundColor = "green";
    }
    //lose condition
    else{
        computerScore++;
        compScore.textContent = computerScore;
        li.textContent = `${round}. You LOSE! Computer played ${computerSelection}, which beats your ${playerSelection}.`;
        li.style.backgroundColor = "#EF1616";
    }
    loggerList.appendChild(li);

}

//random pick from computer
let arr = ["rock", "paper", "scissors"];

function computerPlay(){
    return arr[Math.floor(Math.random()*arr.length)];
}

game();