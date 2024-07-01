
/*fetch("https://trouve-mot.fr/api/categorie/19/2")
    .then((response) => response.json())
    .then((words) => console.log(words))*/

// variable qui contien l'apha avec une fonction for 
// variable pour l'index de l'apha
let btnReplay = document.querySelector('#btnReplay');
let alphabet = "abcdefghijklmnopqrstuvwxyz"
let tab = alphabet.split('')
let words = ["chat", "chien", "vague", "soleil","web","developpement","fils","peinture"]
let hiddenword;
let lives = 7
let attempts = 0
let hangmanImage = document.querySelector('#hangmanImage');
const hangmanImages = [
    './assets/imgs/pendu0.png',
    './assets/imgs/pendu1.png',
    './assets/imgs/pendu2.png',
    './assets/imgs/pendu3.png',
    './assets/imgs/pendu4.png',
    './assets/imgs/pendu5.png',
    './assets/imgs/pendu6.png',
    './assets/imgs/pendu7.png'
];
const keyboard = document.getElementById('keyboard');
const container = document.querySelector('#gameContainer');

function createKeyBoard() {
    keyboard.innerHTML = ''
    alphabet.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'keyboardbutton';
        button.dataset.letter = letter;
        button.addEventListener('click', () => {
            if (!button.classList.contains('used')) {
                let letter = getInput(button.dataset.letter);
                compare(letter);
                button.classList.add('used');
                attempts++;
                document.querySelector('.attempts').textContent = `Essais : ${attempts}`;
            }
        });
        keyboard.appendChild(button);
    });
}
addEventListener("keypress", (event) => {
    let btns = document.querySelectorAll(".keyboardbutton")
    btns.forEach(btn =>{
        if (btn.innerHTML.toLowerCase() == event.key.toLowerCase()) {
            btn.click()
        }
    })
});
function compare(letter) {
    let wordarray = chosenword.split('');
    let hiddenwordarray = hiddenword.split(' ');
    let isletterinword = false;
    for (let i = 0; i < wordarray.length; i++) {
        if (wordarray[i] === letter) {
            hiddenwordarray[i] = letter;
            isletterinword = true;
        }
    }
    if (isletterinword) {
        console.log(`La lettre ${letter} est dans le mot`);
        document.querySelector('.lives').textContent = `Vies restantes : ${lives}`;
        
    } else {
        console.log(`La lettre ${letter} n'est pas dans le mot`);
        lives--;
        document.querySelector('.lives').textContent = `Vies restantes : ${lives}`;
        updateHangmanImage();
        if (lives === 0) {
            document.querySelector('.word').textContent = chosenword;
            document.querySelector('.result').textContent = "Vous avez perdu";
            document.querySelector('.result').style.color = "red"
            disableKeyboard();
        }
    }
    hiddenword = hiddenwordarray.join(' ');
    document.querySelector('.word').textContent = hiddenword;
    console.log(`Le mot caché est : ${hiddenword}`);

    if (hiddenword === chosenword) {
        document.querySelector('.result').textContent = "Vous avez gagné";
        document.querySelector('.result').style.color = "green";
        disableKeyboard();
    }
    
}
function disableKeyboard() {
    let btns = document.querySelectorAll(".keyboardbutton");
    btns.forEach(btn => btn.disabled = true);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
chosenword = words[random(0, words.length - 1)];
console.log(`Le mot choisi est : ${chosenword}`);
function hideword(words) {
    hiddenword = words.split('').map(letter => '-').join(' ');
    console.log(`Le mot caché est : ${hiddenword}`);
    document.querySelector('.word').textContent = hiddenword;
}
function startGame() {
    chosenword = words[random(0, words.length - 1)];
    console.log(`Le mot choisi est : ${chosenword}`);
    hideword(chosenword);
    lives = 7;
    attempts = 0;
    document.querySelector('.lives').textContent = `Vies restantes : ${lives}`;
    document.querySelector('.attempts').textContent = `Essais : ${attempts}`;
    document.querySelector('.result').textContent = '';
    createKeyBoard();
    btnReplay.style.display = 'block';
    updateHangmanImage();
   
}

function replay() {
    startGame();
   
    updateHangmanImage();
}

function getInput(letter) {
    console.log(`Vous avez cliqué sur la lettre ${letter}`);
    return letter;
}
function updateHangmanImage() {
    hangmanImage.src = hangmanImages[7 - lives];
}

btnReplay.addEventListener('click', replay);
startGame();