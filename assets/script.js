//functions 
function buildQuiz (questions, quizContainer, resultsContainer, submitButton){
    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;

        for (var i=0; i<questions.length; i++) {
            answers = [];

            for (letter in questions[i].answers){
                answers.push(
                    '<label>' 
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer){
        var answerContainers = quizContainer.querySelectorAll('.answers');

        var userAnswer = '';
        var numCorrect = 0;

        for(var i=0; i<questions.length; i++){
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;
                answerContainers[i].style.color = 'lightgreen';
            }
            else {
                answerContainers[i].style.color = 'red';
            }
        }
        
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    showQuestions(questions, quizContainer);

    submitButton.onclick = function() {
        showResults(questions, quizContainer, resultsContainer);
    }
};

function showResults () {

};

// variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const questions =[
    {
        question: "Where should a JavaScript file be linked in an HTML file?",
        answers: {
            a: "At the top",
            b: "In the body of the HTML",
            c: "After all of the content in the body of the HTML"
        },
        correctAnswer: "c"
    },
    {
        question: "How do you make a comment in a JavaScript file?",
        answers: {
            a: "// comments",
            b: "* comments *",
            c: "<!-- comments ---!>"
        },
        correctAnswer: "a",
    },
    {
        question: "An array in JavaScript can hold which of the following?",
        answers: {
            a: "Numbers only",
            b: "Strings",
            c: "other arrays",
            d: "All of the Above"
        },
        correctAnswer: "d",
    },
];

buildQuiz (questions, quizContainer, resultsContainer, submitButton);

// submitButton.addEventListener('click', showResults);