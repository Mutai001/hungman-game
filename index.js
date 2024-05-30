const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const notificationContainer = document.getElementById('notification-container');
const popupContainer = document.getElementById('popup-container');
const finalMessageElement = document.getElementById('final-message');
const playButton = document.getElementById('play-button');
const hangmanCanvas = document.getElementById('hangman').getContext('2d');
const keys = document.querySelectorAll('.key');

const words = ['javascript', 'hangman', 'coding', 'developer', 'algorithm'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctLetters = [];
let wrongLetters = [];
const maxWrongAttempts = 6;

// Show the hidden word
function displayWord() {
    wordElement.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `
            )
            .join('')}
    `;
    
    const innerWord = wordElement.innerText.replace(/\n/g, '');
    
    if (innerWord === selectedWord) {
        finalMessageElement.innerText = 'Congratulations! You won!';
        popupContainer.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLetters() {
    wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
    `;
    
    drawHangman();
    
    if (wrongLetters.length === maxWrongAttempts) {
        finalMessageElement.innerText = 'Unfortunately, you lost!';
        popupContainer.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notificationContainer.classList.add('show');
    setTimeout(() => {
        notificationContainer.classList.remove('show');
    }, 2000);
}

// Draw the hangman
function drawHangman() {
    const errors = wrongLetters.length;
    
    // Head
    if (errors > 0) {
        hangmanCanvas.beginPath();
        hangmanCanvas.arc(100, 50, 20, 0, Math.PI * 2);
        hangmanCanvas.stroke();
    }
    
    // Body
    if (errors > 1) {
        hangmanCanvas.beginPath();
        hangmanCanvas.moveTo(100, 70);
        hangmanCanvas.lineTo(100, 140);
        hangmanCanvas.stroke();
    }
    
    // Left arm
    if (errors > 2) {
        hangmanCanvas.beginPath();
        hangmanCanvas.moveTo(100, 90);
        hangmanCanvas.lineTo(60, 100);
        hangmanCanvas.stroke();
    }
    
    // Right arm
    if (errors > 3) {
        hangmanCanvas.beginPath();
        hangmanCanvas.moveTo(100, 90);
        hangmanCanvas.lineTo(140, 100);
        hangmanCanvas.stroke();
    }
    
    // Left leg
    if (errors > 4) {
        hangmanCanvas.beginPath();
        hangmanCanvas.moveTo(100, 140);
        hangmanCanvas.lineTo(80, 180);
        hangmanCanvas.stroke();
    }
    
    // Right leg
    if (errors > 5) {
        hangmanCanvas.beginPath();
        hangmanCanvas.moveTo(100, 140);
        hangmanCanvas.lineTo(120, 180);
        hangmanCanvas.stroke();
    }
}

// Handle keypress
function handleKeypress(e) {
    const letter = e.target.getAttribute('data-key').toLowerCase();
    
    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        } else {
            showNotification();
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLetters();
        } else {
            showNotification();
        }
    }
}

// Restart game
function restartGame() {
    correctLetters = [];
    wrongLetters = [];
    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    displayWord();
    updateWrongLetters();
    popupContainer.style.display = 'none';
    hangmanCanvas.clearRect(0, 0, hangmanCanvas.canvas.width, hangmanCanvas.canvas.height);
}

// Event listeners
keys.forEach(key => key.addEventListener('click', handleKeypress));
playButton.addEventListener('click', restartGame);

// Initial call
displayWord();