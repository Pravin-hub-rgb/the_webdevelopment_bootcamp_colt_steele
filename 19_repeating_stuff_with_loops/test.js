// console.log('hiiii')
//     let num = parseInt(prompt("Enter any max number"));

//     const randomNum=Math.floor(Math.random()*num)+1;
//     console.log(randomNum);
//     let guessNum = parseInt(prompt("Guess the number"));

//     let numOfGuess=0;
// while(true){

//     if(guessNum===randomNum ) {
//         numOfGuess++;
//         break;
//     }
//     else if(guessNum<randomNum){
//         numOfGuess++;
//         guessNum=parseInt(prompt(`too low`));
//     }else{
//         numOfGuess++;
//         guessNum=parseInt(prompt(`too high`));
//     }
// }
// prompt(`Your total number of guesses are ${numOfGuess}`);


// colt code
// let maximum=parseInt(prompt("Enter the maximum number"));
// while(!maximum){
//     maximum=parseInt(prompt("Enter a valid number"));
// }
// const target = Math.floor(Math.random()*maximum)+1;


// let guess = prompt("Enter your first guess!");
// let attempts=1;
// while(parseInt(guess)!==target){
//     attempts++;
//     if(guess ==='q') break;
//     if(guess>target){
//         guess=prompt("Too high! Enter a new guess:");
//     }else{
//         guess=prompt("Too low! Enter a new guess:");
//     }
// }
// if(guess==='q'){
//     console.log("ok, you quit!");
// } else{

//     console.log(`you got it! It took you ${attempts}`)
// }


// {
//     let guess = 0;
//     let ranNum = Math.floor(Math.random() * 20) + 1;
//     console.log(ranNum);
//     let num = prompt('Enter a number');
//     num = parseInt(num);

//     while (ranNum != num) {

//         if (ranNum < num) {
//             num = prompt("Enter number less than that");
//             console.log(ranNum);
//             guess++;
//         } else {
//             num = prompt("Its greater than that");
//             console.log(ranNum);
//             guess++;
//         }
//     }

//     console.log("You guessed correct !! ");
//     console.log(`It took you ${guess} guesses`);
//     console.log("out side the loop");

// }

