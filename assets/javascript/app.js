
// Test Question
var question1 = new Question(
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


let questionArray =[question1];



//Game Logic
$(document).ready(function(){
    //Generate the start screen
    startGame();
    $('.start-button').on('click', function(){
        $('.start-button').remove();
        generateQuestion(questionArray[0]); //change this to be dynamic
    });
    console.log(questionArray[0]);
});




function generateQuestion(question){
    let questionText = $('<h3>')
    questionText.addClass("question-text")
    questionText.text(question.questionText);
    questionText.appendTo('.container');
    question.answerArray.forEach(function(value, index){
        //loop through and make a <p> for each answer. Attach true or false as a class with if else statement
       
        let answerText=$('<p>');
        answerText.text(value.text);
        if(value.correct){
            answerText.addClass("cr");
        }
        else{
            answerText.addClass("nc");
        }
        answerText.appendTo('.container');
    });


    //startTimer() <-- need to add this
}


function startGame(){
   let startButton = $('<button>');
   startButton.text('Start');
   startButton.addClass('start-button');
   startButton.appendTo(".container");

}



//Question constructor
function Question(questionText, answerArray, questionImage){
    this.questionText = questionText;
    this.answerArray=answerArray;
    this.questionImage = questionImage;
}






