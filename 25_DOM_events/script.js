const btn = document.querySelectorAll('button');
btn[0].addEventListener('click', () => {
    alert("you clicked me!");
});
btn[1].addEventListener('click', () => {
    alert("you clicked me too!");
});
btn[2].addEventListener('click', () => {
    alert("you clicked me!");
});
btn[3].addEventListener('click', () => {
    alert("you clicked me!");
});
const div = document.querySelector('.div');
div.addEventListener('mouseenter', () => {
    alert('mouse enter.')
});

const evtbtn = document.querySelector('.evt');
evtbtn.addEventListener('click', function (evt) {
    console.log(evt)
});
const evtInput = document.querySelector('.evtInput');
evtInput.addEventListener('keydown', function (evt) {
    console.log(evt.key, evt.code);
})
// color Exercise
const genRan = () => {
    return Math.floor(Math.random() * 255) + 1;
}
const h2 = document.querySelector('.colorexercise>h2')
const back = document.querySelector('.colorexercise')
const colorBtn = document.querySelector('.colorexercise>button');
colorBtn.addEventListener('click', () => {
    let randColor = `rgb(${genRan()},${genRan()},${genRan()})`;
    back.style.backgroundColor = randColor;
    h2.textContent = randColor;
})
// Colorize
const buttons = document.querySelectorAll('.colorize>button');
for (let button of buttons) {
    button.addEventListener('click', colorize);
}

function colorize() {
    this.style.backgroundColor = `rgb(${genRan()},${genRan()},${genRan()})`;
}

// tweet form
const tweetForm = document.querySelector('#tweetForm');
const tweetContainer = document.querySelector('#tweets');
tweetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const usernameInput = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.tweet;
    addTweet(usernameInput.value, tweetInput.value);
    usernameInput.value = '';
    tweetInput.value = '';
})

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(username);
    newTweet.append(bTag);
    newTweet.append(`- ${tweet}`);
    tweetContainer.append(newTweet);    
}

// change & input events
const changeEvent = document.querySelector('.changeEvent');
const changeH4 = document.querySelector('.changeH4');
changeEvent.addEventListener('change', (e) => {
    changeH4.textContent = changeEvent.value;
});

const inputEvent = document.querySelector('.inputEvent');
const inputH4 = document.querySelector('.inputH4');
inputEvent.addEventListener('input', (e) => {
    inputH4.textContent = inputEvent.value;
});

// Event bubbling
const stopPropH3 = document.querySelector('.stopPropH3');
const stopPropBtn = document.querySelector('.stopPropBtn');
stopPropBtn.addEventListener('click', function (e) {
    stopPropH3.style.backgroundColor = `rgb(${genRan()},${genRan()},${genRan()})`;
    e.stopPropagation();
})
stopPropH3.addEventListener('click', function () {
    stopPropH3.style.display = "none";
})
const backBtn = document.querySelector('.bringBack');
backBtn.addEventListener('click', () => {
    stopPropH3.style.display = "block";
})
// event delegation
const tweetForm2 = document.querySelector('#tweetForm2');
const tweetContainer2 = document.querySelector('#tweets2');
tweetForm2.addEventListener('submit', function (e) {
    e.preventDefault();
    const usernameInput = tweetForm2.elements.username;
    const tweetInput = tweetForm2.elements.tweet;
    addTweet2(usernameInput.value, tweetInput.value);
    usernameInput.value = '';
    tweetInput.value = '';

})
tweetContainer2.addEventListener('click', function (e) {
    console.log(e.target);
    e.target.nodeName === 'LI' && e.target.remove();
})
const addTweet2 = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(username);
    newTweet.append(bTag);
    newTweet.append(`- ${tweet}`);
    tweetContainer2.append(newTweet);    
}

