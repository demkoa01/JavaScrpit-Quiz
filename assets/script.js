// array with questions, answer options & correct answer
let questions = [
    {
    numb: 1,
    question: "How do you comment out code in a JavaScript file?",
    answer: "Use // comment",
    options: [
      "Use % comment %",
      "Use <-- comment -->",
      "Use // comment",
      "Use /* comment */"
    ]
  },
    {
    numb: 2,
    question: "Where should a JavaScript file be linked in the HTML file?",
    answer: "Within the body, after all content",
    options: [
      "Wherever, it doesn't matter where the JavaScript file is linked",
      "It shouldn't be in the HTML file, it should be in the CSS file",
      "At the top of the HMTL file",
      "Within the body, after all content"
    ]
  },
    {
    numb: 3,
    question: "An array in JavaScript can hold which of the following?",
    answer: "All of the above",
    options: [
      "Only strings of text",
      "Other Arrays",
      "Only Numbers",
      "All of the above"
    ]
  },
    {
    numb: 4,
    question: "True or False: The JavaScript file itself must contain the <script> tag?",
    answer: "False",
    options: [
      "True",
      "False"
    ]
  },
];

// variables
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const scoreAreaEl = document.querySelector('#scoreArea');
const inNameEl = document.querySelector('#inName');
const buttonDivEl = document.querySelector('#saveButton');
const highScoreEl = document.querySelector('#highScores');
const scorePageEl = document.querySelector('#userScore');

// if startQuiz button clicked, show the rules box
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}

// if exitQuiz button clicked, go back to start page/refresh
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}

// if continueQuiz button clicked, continue to questions
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(45); //calling startTimer function
};

// variables for time & keeping track of questions
let timeValue =  45;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked, go back to the first question
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    //reset all variables for time & question counting
    timeValue = 45; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count);
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine);
    startTimer(timeValue);
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}

// if quitQuiz button clicked, exit and go back to the 'Start Quiz' button page
quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if 'next question' button clicked, move on to the next question of the quiz
next_btn.onclick = ()=>{
    // if not on the last question
    if(que_count < questions.length - 1){
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter);
        clearInterval(counterLine); 
        startTimer(timeValue);
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }
    // if at the last question, show the results
    else{
        clearInterval(counter);
        clearInterval(counterLine); 
        showResult(); 
    }
}

// getting questions and options from array above
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; // find correct answer from array above
    const allOptions = option_list.children.length; 
    
    // if the user got the correct answer
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log(timeValue);
    }
    // if the user didnt get the correct answer
    else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        // show the user what the correct answer was 
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){  
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
            }
        }
       // return timeValue;
    }

    // dont let the user pick a new answer after they have already picked one whether correct or incorrect
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    console.log(userScore); // show user end score in console
    
    // display the number the user got correct
    let scoreTag = '<span>Congrats! You got <p>'+ userScore +'</p> correct!</span>';
    scoreText.innerHTML = scoreTag; 

    initTextEl = document.createElement("input"); 
    initTextEl.setAttribute("id", "initails-input"); 
    initTextEl.setAttribute("type", "text"); 
    initTextEl.setAttribute("name", "iniatials"); 
    initTextEl.setAttribute("placeholder", "Enter Initials here"); 
      
    inNameEl.appendChild(initTextEl);


    // create save button element
    saveButtonEl = document.createElement("button");
    saveButtonEl.setAttribute("id" , "save-btn");
    saveButtonEl.setAttribute("class" ,"save-btn");
    saveButtonEl.setAttribute("type" , "submit");
    saveButtonEl.textContent = "Save Score";

    inNameEl.appendChild(saveButtonEl);

    inNameEl.addEventListener("submit", viewHighScores);
}

function viewHighScores (e) { 
  e.preventDefault();
    var name = document.querySelector("#initails-input").value;
    savedInit(name);
    
    scorePageEl.replaceWith(highScoreEl)
    loadSaveScores();
  
}

//function to save task in local storage 
var savedScore = function() {
    localStorage.setItem("userScore", JSON.stringify(userScore));
}
var savedInit = function(initails) {
    localStorage.setItem("initails", JSON.stringify(initails));
}

// gets tasks from local storage and load them
function loadSaveScores() {
    // get tasks items from local stroage
    var savedScore = localStorage.getItem("userScore");
    var savedInit = localStorage.getItem("initails");

    savedScore  = JSON.parse(savedScore);
    savedInit = JSON.parse(savedInit);
}   

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        // time should decrease by 1 second as long as user has not answered yet
        timeCount.textContent = time; 
        time--;

        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
             const allOptions = option_list.children.length; //getting all option items
             let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
    return time;
}

