
// Test Question
let question1 = new QuestionTemplate(
    "If press too hard on your pallet knife you have a(n)...", 
    [
        {   text:"Awful Mistake",
            correct: false
        },
        {
            text: "Happy Accident",
            correct: true
        },
        {
            text:"Happy Little Tree",
            correct:false
        },
        {
            text:"Problem",
            correct:false
        }
    ],
    "./assets/images/happyAccident.jpg");
let question2 = new QuestionTemplate(
    "After you dip your brush in paint oderless paint thinner you... ", 
    [
        {   text:"Beat the hell out of it",
            correct: false
        },
        {
            text: "Shake it out",
            correct: false
        },
        {
            text:"Beat the devil out of it",
            correct:true
        },
        {
            text:"Beat it up",
            correct:false
        }
    ],
    "./assets/images/beatTheDevil.gif");

let question3 = new QuestionTemplate(
    "Which is not a color Bob commonly uses?", 
    [
        {   text:"Khorne Red",
            correct: true
        },
        {
            text: "Van Dyke Brown",
            correct: false
        },
        {
            text:"Phthalo Blue",
            correct:false
        },
        {
            text:"Sap Green",
            correct:false
        }
    ],
    "./assets/images/paints.jpg");
let question4 = new QuestionTemplate(
    "What was the name of Bob's pocket squirrel pal?", 
    [
        {   text:"Green Been",
            correct: false
        },
        {
            text: "Peapod",
            correct: true
        },
        {
            text:"Rocky",
            correct:false
        },
        {
            text:"Nutter Butter",
            correct:false
        }
    ],
    "./assets/images/peapod.jpg"
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
        $('.timer-container').css('display','block');
        $('.question-container').css('display','block');
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

    $(document.body).on('click','.nc',function(){
        game.incorrectAnwers++
        game.incorrectMessage(question.activeQuestion);
    });

    $(document.body).on('click','.end-button',function(){
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
        $('<div>').addClass("end-message").text('Happy Painting and God Bless...').appendTo('.question-container');
        $('<p>').addClass("end-stat").text('Correct Answers: ' + this.correctAnswers).appendTo('.question-container');
        $('<p>').addClass("end-stat").text('Incorrect Answers: ' + this.incorrectAnwers).appendTo('.question-container');
        $('<p>').addClass("end-stat").text('Unanswered: ' + this.unanswered).appendTo('.question-container');
        $('<button>').addClass("end-button").text('Start Over').appendTo('.question-container');
     },
     displayQuestion: function  (qstObj){
        $('.question-container').empty();
        let questionText = $('<h3>')
        questionText.addClass('question-text')
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
     correctMessage: function(qstObj){
        timer.stopTimer();
        $('.question-container').empty();
        $('<h3>').text('It\'s Your World').addClass('correct-message').appendTo('.question-container');
        this.showImage(qstObj);
        if(question.quizArray.length>0){
        setTimeout(function() {
            question.generateRandomQuestion()
        }, 4000);
        }
        else{
            setTimeout(function() {
                game.endGame()
            }, 4000); 
            
        } 
    },
    
    incorrectMessage:function(qstObj){
        timer.stopTimer();
        let correctAnswer = qstObj.answerArray.find(function(element){
            return element.correct === true;
        })
        .text;
        $('.question-container').empty();
        $('<h3>').text('Keep Trying').addClass('correct-message').appendTo('.question-container');
        $('<p>').text("The Correct Answer was: "+ correctAnswer).appendTo('.question-container');
        this.showImage(qstObj);
        console.log(correctAnswer);
        if(question.quizArray.length>0){
            setTimeout(function() {
                question.generateRandomQuestion()
            }, 4000);
            }
            else{
                setTimeout(function() {
                    game.endGame()
                }, 4000); 
                
            } 
    },

     showImage:function(qst){
        let questionImage =$('<img>');
        questionImage.attr("src",qst.questionImage);
        questionImage.addClass("question-img");
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

    time: 30,
    timerRunning: false,
    timeout: false,

    resetQuestionTime: function(){
        this.time = 30;
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

    questionArray:[question1, question2,question3,question4],
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