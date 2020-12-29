//10/31/20 (only in concole)

let arr = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

//playing custom rounds of games
function game(){
    //asking how many rounds player wants to play
    let rounds = +prompt("How many rounds do you want to play?");
    //ask for valid integer input
    while(isNaN(rounds) || !Number.isInteger(rounds)){
        rounds = +prompt("Please enter a valid INTEGER for rounds: ");
    }

    for(i = 1; i <= rounds; i++){
        //asking player what to play
        player = prompt("Enter rock, paper, or scissors: ").toLowerCase();
        //if there's invalid input, ask again
        while(!arr.includes(player)){
            player = prompt("Please enter a valid input (rock, paper, or scissors): ").toLowerCase();
        }

        //show results
        console.log(`Round: ${i}/${rounds}`);
        console.log(playRound(player, computerPlay()));
        console.log(`----------`);
        console.log(`[Score] (You) ${playerScore} : ${computerScore} (Computer)`);
    }

    //final result
    console.log(`               ------------Final Result------------`);
    console.log("               |                                  |");
    console.log("               |                                  |");
    if(playerScore > computerScore){
        console.log(`               |            You WIN!!!            |`);
    }
    else if(playerScore < computerScore){
        console.log(`               |           You LOSE!!!            |`);
    }
    else{
        console.log(`               |           You TIE!!!             |`);
    }
    console.log("               |                                  |");
    console.log("               |                                  |");
    console.log(`               ------------------------------------`);

    //ask if the user wants to play again
    let playAgain = prompt("Do you want to play again? Y/N: ").toLowerCase();
    //ask for valid input 
    while(playAgain !== "y" && playAgain !== "n"){
        playAgain = prompt("Please, answer in 'Y' or 'N'. Do you want to play again? Y/N: ").toLowerCase();
    }
    if(playAgain === "y"){
        //reset game
        playerScore = 0;
        computerScore = 0;
        game();
    }
}


//playing game aginst computer
function playRound(playerSelection, computerSelection){
    //tie condition
    if(playerSelection === computerSelection){
        return `It's a TIE! Both played ${playerSelection}.`;
    }
    //win condition
    else if(playerSelection === "paper" && computerSelection === "rock" || playerSelection === "rock" && computerSelection === "scissors" || playerSelection === "scissors" && computerSelection === "paper"){
        playerScore++;
        return `You WIN! You played ${playerSelection}, which beats computer's ${computerSelection}.`;
    }
    //lose condition
    else{
        computerScore++;
        return `You LOSE! Computer played ${computerSelection}, which beats your ${playerSelection}.`;
    }
}


//random pick from computer
function computerPlay(){
    return arr[Math.floor(Math.random()*arr.length)];
}


game();