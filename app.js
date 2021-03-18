// remove the start button when clicked
$('#start').on('click', function(){
    $('#start').remove();
  game.loadQuestion();

})

// click event when you click the answer

$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})

$(document).on('click','#reset',function(){
    game.reset();
})

// Variable for questions, an array of objects 

let questions = [{
    question: "1.What does HTML stand for?",
    answers: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"],
    correctAnswer: "Hyper Text Markup Language",
    image: "assets/images/imagename"
}, {
    question: "2.What does CSS stand for?",
    answers: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"],
    correctAnswer: "Cascading Style Sheet",
    image: "assets/images/imagename",
}, {
question: "3.What does PHP stand for?",
    answers: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"],
    correctAnswer: "Hypertext Preprocessor",
    image: "assets/images/imagename",
},{
    question: "4.What does SQL stand for?",
    answers: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"],
    correctAnswer: "Structured Query Language",
    image: "assets/images/imagename",
},{
    question: "5.What does XML stand for?",
    answers: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"],
    correctAnswer: "eXtensible Markup Language",
    image: "assets/images/imagename",
}

];


var game = {
    questions:questions,
    currentQuestion:0, 
    counter:30, 
    correct:0,
    incorrect:0,
    unanswered:0,
    
    countdown: function(){
        game.counter --;
        $('#counter').html(game.counter); 
        if(game.counter<=0){
            console.log("TIME UP!")
            game.timeUp();
        }
    },
    loadQuestion: function (){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2> Time to Guess: <span id ='counter'>30</span> Seconds</h2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button id="button- '+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>Out of time!<h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else{
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html('<h2>Complete!</h2>')
        $('#subwrapper').append(" Correct: " +game.correct + '<br/>');
        $('#subwrapper').append(" Incorrect: " +game.incorrect + '<br/>');
        $('#subwrapper').append(" Unanswered: " +game.unanswered + '<br/>');
        if(game.correct==5)
             $('#subwrapper').append(" Very Strong " );
        else if(game.correct==4)
             $('#subwrapper').append(" Strong "  '<br/>');
        else if(game.correct==3)
             $('#subwrapper').append(" Good "  '<br/>');
        else if(game.correct==2)
             $('#subwrapper').append(" Bad "  '<br/>');
        else
            $('#subwrapper').append(" Poor "  '<br/>');
        $('#subwrapper').append("<button id= reset>Try again?</button>")


    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
    } else {
        game.answeredIncorrectly();
    }

    },
    answeredCorrectly: function(){
        console.log("right!")
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2> CORRECT!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else{
            setTimeout(game.nextQuestion,2*1000);
        }

    },
    answeredIncorrectly: function(){
        console.log("wrong")
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2> Wrong!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,2*1000);
        } else{
            setTimeout(game.nextQuestion,2*1000);
        }

    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();

    }

}