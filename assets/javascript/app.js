
// Test Question
var question1 = new QuestionTemplate(
    "Test Question", 
    [
        {   text:"This is answer 1",
            correct: false
        },
        {
            text: "This is answer 2, The right answer",
            correct: true
        },
        {
            text:"this is answer 3",
            correct:false
        },
        {
            text:"this is answer 4",
            correct:false
        }
    ],
    "https://orig00.deviantart.net/71b6/f/2016/040/9/6/profile_picture_by_disse86-d9r3n1i.jpg"
);
var question2 = new QuestionTemplate(
    "Test Question 2", 
    [
        {   text:"This is answer 1 of question 2",
            correct: false
        },
        {
            text: "This is answer 2 of question 2 ",
            correct: false
        },
        {
            text:"this is answer 3 of question 2. The right answer ",
            correct:true
        },
        {
            text:"this is answer 4 of question 2",
            correct:false
        }
    ],
    "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg"
);



//Game Logic
$(document).ready(function(){
    //Generate the start screen
    let currentQuestion;
    game.startGame();
    $('.start-button').on('click', function(){
        $('.start-button').remove();
        question.generateRandomQuestion();
        //show timer
        $('.timer-container').css('display','block')
        //start timer
        if(!timer.timeout){
              timer.questionCountdown();
        }
    });



    $(document.body).on('click', '.cr', function(){
        game.correctAnswers ++;
        game.correctMessage(question.activeQuestion);
        console.log('Correct Answers:',); 
    });

    $(document.body).on('click','.end-button',function(){
        console.log("GameOVER");
        game.startGame();
        $('.start-button').remove();
        question.generateRandomQuestion();
    });
});

//controls setup, Score Properties, and display methdods for the game.
let game = {
    correctAnswers: 0,
    incorrectAnwers: 0,
    unanswered: 0,
     startGame: function(){
        let startButton = $('<button>');
        startButton.text('Start');
        startButton.addClass('start-button');
        startButton.appendTo(".container");
        question.setQuizArray();
     }, 
     endGame:function(){
        $('.question-container').empty();
        $('<div>').addClass("end-message").text('All Done!').appendTo('.question-container');
        $('<p>').addClass("end-stat").text('Correct Answers: ' + this.correctAnswers).appendTo('.question-container');
        $('<p>').addClass("end-stat").text('Incorrect Answers: ' + this.incorrectAnwers).appendTo('.question-container');
        $('<p>').addClass("end-stat").text('Unanswered: ' + this.unanswered).appendTo('.question-container');
        $('<button>').addClass("end-button").text('Start Over').appendTo('.question-container');
     },
     displayQuestion: function  (qstObj){
        $('.question-container').empty();
        let questionText = $('<h3>')
        questionText.addClass('.question-text')
        questionText.text(qstObj.questionText);
        questionText.appendTo('.question-container');
        qstObj.answerArray.forEach(function(value, index){
            //loop through and make a <p> for each answer. Attach true or false as a class with if else statement
            let answerText=$('<p>');
            answerText.text(value.text);
            if(value.correct){
                answerText.addClass('cr');
            }
            else{
                answerText.addClass('nc');
            }
            answerText.appendTo('.question-container');
        });
        timer.resetQuestionTime();
        timer.questionCountdown();
    },
     correctMessage: function(qst){
        timer.stopTimer();
        $('.question-container').empty();
        $('<h3>').text('Correct!!!').addClass('correct-message').appendTo('.question-container');
        this.showImage(qst);
        if(question.quizArray.length>0){
        setTimeout(function() {
            question.generateRandomQuestion()
        }, 4000);
        }
        else{
            this.endGame();
        }   
    },
    
     showImage:function(qst){
        let questionImage =$('<img>');
        questionImage.attr("src",qst.questionImage);
        questionImage.appendTo(".question-container");
    },

    displayTimeout: function(){
        timer.stopTimer();
        this.unanswered++;
        if(question.quizArray.length>0){ 
            question.generateRandomQuestion()}
       else {
           game.endGame()}
    }

}

// controls timer functionality for the game
let timer = {

    time: 10,
    timerRunning: false,
    timeout: false,

    resetQuestionTime: function(){
        this.time = 5;
        this.timerRunning = false;
        $(".timer-container span").text(timer.time);
    },

    questionCountdown: function(){
        if(!this.timerRunning){
            interval= setInterval(timer.countdown, 1000)
            this.timerRunning= true;
        }
    },

    countdown:function(){
        if(timer.time > 0){ 
            timer.time--;
            $(".timer-container span").text(timer.time);
        }
       else timer.setTimeout();
    },
    setTimeout: function() {
        this.timerRunning = false;
        // this.timeout = true;
        game.displayTimeout();
    },
    stopTimer: function(){
        clearInterval(interval);
        this.timerRunning = false
    }

}

//controls question generation and question functionality for the game
let question = {

    questionArray:[question1, question2],
    quizArray: [],
    activeQuestion:{} ,

    //copies questionArray into quizArray
    setQuizArray: function(){
        this.quizArray = this.questionArray.slice(0);
    },

    //generates a random number between 0 and array length (exclusive), chooses a question at random, and removes it from array
    generateRandomQuestion:function(){
        let randomIndex = Math.floor(Math.random()*(this.quizArray.length));
        this.activeQuestion = this.quizArray[randomIndex];
        console.log("active ?", this.activeQuestion);
        this.quizArray.splice(randomIndex,1);
        game.displayQuestion(this.activeQuestion);
    }

}






//Question constructor
function QuestionTemplate(questionText, answerArray, questionImage){
    this.questionText = questionText;
    this.answerArray=answerArray;
    this.questionImage = questionImage;
}