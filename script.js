const questions = [
    {
        question:"Which is largest animal in the world?",
        answers: [
            { text : "shark", correct:false},
            { text : "Blue Whale", correct:true},
            { text : "Elephant", correct:false },
            { text : "Giraffe", correct:false },
        ]
    },
    {
        question:"The one who speaks a lot?",
        answers: [
            {text : "Thick skin", correct:false },
            {text : "Percipient", correct:false},
            {text : "Garrulous", correct:true },
            {text : "Reticent", correct:false },
        ]

    },
    {
        question:"synonym of the word Precarious?",
        answers: [
            {text : "Fun", correct:false },
            {text : "Dark", correct:false},
            {text : "Dangerous", correct:true },
            {text : "Aplomb", correct:false },
        ]
    },
    {
        question:"Meaning of the word Nostradamus?",
        answers: [
            {text : "Talkative", correct:false },
            {text : "Kind", correct:false},
            {text : "Prediliction", correct:false },
            {text : "Astrologer", correct:true},
        ]
    },
    {
        question:"Meaning of Conspicuous?",
        answers: [
            {text : "Easily Seen", correct:true},
            {text : "Wisdom", correct:false},
            {text : "Gratitude", correct:false },
            {text : "Affluent", correct:false },
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "   + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", SelectAnswer);

    });

}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstElementChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function SelectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function ShowScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();

    }else{
        ShowScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})

startQuiz();




