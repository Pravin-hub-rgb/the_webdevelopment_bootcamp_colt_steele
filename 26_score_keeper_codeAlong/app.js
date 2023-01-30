const spanOneScore=document.querySelector('.oneScore');
const spanTwoScore=document.querySelector('.twoScore');
const playingTo=document.querySelector('#playingTo');
const btnOne=document.querySelector('.playerOne');
const btnTwo=document.querySelector('.playerTwo');
const btnReset=document.querySelector('.reset');

// events
let playingToVal=4;
playingTo.addEventListener('input',function(){
    playingToVal=parseInt(playingTo.value);
})
btnOne.addEventListener('click',()=>{
    if(parseInt(spanOneScore.textContent)===playingToVal){
        spanOneScore.style.color='green';
        spanTwoScore.style.color='red';
        btnOne.disabled=true;
        btnTwo.disabled=true;
    }else{
    spanOneScore.textContent++;
    }
})
btnTwo.addEventListener('click',()=>{
    if(parseInt(spanTwoScore.textContent)===playingToVal){
        spanTwoScore.style.color='green';        
        spanOneScore.style.color='red';
        btnOne.disabled=true;
        btnTwo.disabled=true;
    }else{
    spanTwoScore.textContent++;
    }
})
btnReset.addEventListener('click',()=>{
    spanOneScore.textContent=0;
    spanTwoScore.textContent=0;
    spanOneScore.style.color='black';
        spanTwoScore.style.color='black';
    btnOne.disabled=false;
        btnTwo.disabled=false;
})

