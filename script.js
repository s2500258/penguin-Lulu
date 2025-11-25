const tree = [
    {
        name: "/penguin-Lulu",
        level1: "..",
        level2: "..",
        level3: "..",
        index: 3,
        x: 191,
        y: 122
    },
    {
        name: "/head",
        level1: "head",
        level2: "..",
        level3: "..",
        index: 2,
        x: 111,
        y: 242
    },
    {
        name: "/trunk",
        level1: "trunk",
        level2: "..",
        level3: "..",
        index: 2,
        x: 281,
        y: 242
    },
    {
        name: "/limbs",
        level1: "limbs",
        level2: "..",
        level3: "..",
        index: 2,
        x: 467,
        y: 242
    },
    {
        name: "/left-eye",
        level1: "head",
        level2: "left-eye",
        level3: "..",
        index: 1,
        x: 100,
        y: 306
    },
    {
        name: "/right-eye",
        level1: "head",
        level2: "right-eye",
        level3: "..",
        index: 1,
        x: 100,
        y: 360
    },
    {
        name: "/beak",
        level1: "head",
        level2: "beak",
        level3: "..",
        index: 1,
        x: 100,
        y: 412
    },
    {
        name: "/belly",
        level1: "trunk",
        level2: "belly",
        level3: "..",
        index: 1,
        x: 280,
        y: 323
    },
    {
        name: "/back",
        level1: "trunk",
        level2: "back",
        level3: "..",
        index: 1,
        x: 280,
        y: 379
    },
    {
        name: "/tail",
        level1: "trunk",
        level2: "back",
        level3: "tail",
        index: 0,
        x: 323,
        y: 442
    },
    {
        name: "/wings",
        level1: "limbs",
        level2: "wings",
        level3: "..",
        index: 1,
        x: 447,
        y: 323
    },
    {
        name: "/paws",
        level1: "limbs",
        level2: "paws",
        level3: "..",
        index: 1,
        x: 447,
        y: 379
    },
    {
        name: "/left-wing",
        level1: "limbs",
        level2: "wings",
        level3: "left-wing",
        index: 0,
        x: 640,
        y: 265
    },
    {
        name: "/right-wing",
        level1: "limbs",
        level2: "wings",
        level3: "right-wing",
        index: 0,
        x: 640,
        y: 317
    },
    {
        name: "/left-paw",
        level1: "limbs",
        level2: "paws",
        level3: "left-paw",
        index: 0,
        x: 640,
        y: 388
    },
    {
        name: "/right-paw",
        level1: "limbs",
        level2: "paws",
        level3: "right-paw",
        index: 0,
        x: 640,
        y: 442
    }
];

// global variables
let currentCardIndex = 0;
const total = 5;
let score = 0;
let origin = 0;
let destination = 0;

// HTML Element References
const questionText = document.getElementById('question-text');
const interactionArea = document.getElementById('interaction-area');
const userAnswerInput = document.getElementById('user-answer');
const submitButton = document.getElementById('submit-button');
const feedbackArea = document.getElementById('feedback-area');
const resultMessage = document.getElementById('result-message');
const explanationText = document.getElementById('explanation-text');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score-display');
const questionIllustration = document.getElementById('question-illustration');
const illustrationContainer = document.getElementById('illustration-container');
const introContainer = document.getElementById('intro-container');
const startButton = document.getElementById('start-button');
const quizCard = document.getElementById('quiz-card');
const targetRectangle = document.getElementById('target-rectangle');
const originRectangle = document.getElementById('origin-rectangle');
const arrowSVG = document.getElementById('arrow-svg');
const arrowLine = document.getElementById('arrow-line');

const updateArrowPosition = (x1,y1,x2,y2) => {
        // Set the SVG line coordinates
        arrowLine.setAttribute('x1', x1);
        arrowLine.setAttribute('y1', y1);
        arrowLine.setAttribute('x2', x2);
        arrowLine.setAttribute('y2', y2);
    };

function choosingPair() {
    origin = Math.floor(Math.random() * (16));
    destination = Math.floor(Math.random() * (16));
    while (origin === destination) {
        destination = Math.floor(Math.random() * (16));
    }     
    return {origin: origin, destination: destination};
};

function loadQuestion() {
    // Hide feedback and show interaction elements
    feedbackArea.classList.add('hidden');
    interactionArea.classList.remove('hidden');    
    userAnswerInput.value = '';

    let currentPair = choosingPair();
    updateArrowPosition(tree[currentPair.destination].x,tree[currentPair.destination].y,tree[currentPair.origin].x,tree[currentPair.origin].y);
    targetRectangle.style.left = `${tree[currentPair.destination].x}px`;
    targetRectangle.style.top = `${tree[currentPair.destination].y}px`;
    originRectangle.style.left = `${tree[currentPair.origin].x}px`;
    originRectangle.style.top = `${tree[currentPair.origin].y}px`;

    questionText.textContent = `Your origin folder is "${tree[currentPair.origin].name}".
      Your destination folder is "${tree[currentPair.destination].name}".`; 

    questionIllustration.src = "images/Lulu_tree_4.png";
    questionIllustration.classList.remove('hidden'); 
  //  illustrationContainer.classList.remove('hidden'); 
    updateScoreDisplay(); 
};

function checkAnswer() {
    let correctAns = "cd ";

    if (tree[origin].level1 === tree[destination].level1) {
        if (tree[origin].level2 === tree[destination].level2) {
            if (tree[origin].index ===1 ) {
                correctAns += tree[destination].level3;
            } else {
                if (tree[destination].index ===0 ) {
                correctAns += "../"+tree[destination].level3;
                } else {
                    correctAns += "../";        
                }}}
        else {
            switch (tree[origin].index-tree[destination].index) {
                case -2:
                correctAns += "../../";
                break;
                case -1:
                correctAns += "../";
                if (tree[origin].index === 0) {
                    correctAns += "../" + tree[destination].level2;
                }
                break;
                case 0:
                if (tree[origin].index === 0) {
                    correctAns += "../../" + tree[destination].level2 + "/"+ tree[destination].level3;
                } else {
                    correctAns += "../" + tree[destination].level2;
                }
                break;
                case 1:
                 if (tree[origin].index === 2) {
                    correctAns += tree[destination].level2;
                } else {
                    correctAns += "../" + tree[destination].level2 + "/" + tree[destination].level3;
                }
                break;
                case 2:
                correctAns += tree[destination].level2 + "/" + tree[destination].level3;
                break;
            }
        }
    }
    else {
        switch (tree[origin].index) {
            case 0:
                correctAns += "../../../";
                break;
            case 1:
                correctAns += "../../";
                break;
            case 2:
                correctAns += "../";
                break;
            case 3:
                correctAns += "";
                break;    
        };
        switch (tree[destination].index) {
            case 0:
                correctAns += (tree[destination].level1) + "/" + (tree[destination].level2) + "/" + (tree[destination].level3);
                break;
            case 1:
                correctAns += (tree[destination].level1) + "/" + (tree[destination].level2);
                break;
            case 2:
                correctAns += (tree[destination].level1);
                break;
            case 3:
                correctAns += "";
                break;    
        };
    }
    console.log(correctAns);

    const userAns = userAnswerInput.value;
    
    if (userAns === correctAns) {
        score++;
        resultMessage.textContent = "✅ Correct! Great job!";
        resultMessage.style.color = 'green';
    } else {
        resultMessage.textContent = `❌ Incorrect.`;
        resultMessage.style.color = 'red';
    }
    
    explanationText.innerHTML = `Right answer: "${correctAns}"`;
    
    interactionArea.classList.add('hidden'); // Hide input/submit
    feedbackArea.classList.remove('hidden'); // Show feedback/next button
    updateScoreDisplay();
};

function nextQuestion() {
    currentCardIndex++; 
    
    if (currentCardIndex < total) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    const quizCard = document.getElementById('quiz-card');
    targetRectangle.classList.toggle('visible-highlight');
    originRectangle.classList.toggle('visible-highlight');
    arrowSVG.classList.add('visible-highlight');
    quizCard.innerHTML = `
        <h2>Game Over! 🥳</h2>
        <p>You finished all the questions.</p>
        <p>Your final score is: **${score} out of ${total}**.</p>
        <button id="again-button" onclick="location.reload()">Play Again</button>
    `;
};

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score} / ${total}`;
};

function startGame() {
    //introContainer.classList.add('hidden');
    introContainer.style.display = 'none';
    quizCard.classList.remove('hidden');
    scoreDisplay.classList.remove('hidden');
    targetRectangle.classList.toggle('visible-highlight');
    originRectangle.classList.toggle('visible-highlight');
    arrowSVG.classList.add('visible-highlight');
    loadQuestion();
};

// event handlers to buttons
submitButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', nextQuestion);

// Allow pressing ENTER to submit the answer
userAnswerInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && userAnswerInput.value.trim() !== '') {
        checkAnswer();
    }
});

startButton.addEventListener('click', startGame);
// Start the game!
//loadQuestion();