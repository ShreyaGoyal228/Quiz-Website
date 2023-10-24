const startBtn=document.querySelector(".start-btn");
const popupInfo=document.querySelector('.popup-info');
const main=document.querySelector('.main');
const exitBtn=document.querySelector('.exit-btn');
const contBtn=document.querySelector('.cont-btn');
const quizSection=document.querySelector('.quiz-section');
const quizBox=document.querySelector('.quiz-box');
const resultBox=document.querySelector('.result-box');
const tryBtn=document.querySelector('.tryAgain-btn');
const goHomeBtn=document.querySelector('.goHome-btn');

startBtn.addEventListener('click',()=>{
   popupInfo.classList.add('active');
});
startBtn.addEventListener('click',()=>{
  main.classList.add('active');
});
exitBtn.addEventListener('click',()=>{
  popupInfo.classList.remove('active');
  main.classList.remove('active');
});

contBtn.addEventListener('click',()=>{
 quizSection.classList.add('active');
 popupInfo.classList.remove('active');
 main.classList.remove('active');
 quizBox.classList.add('active');
 showQuestion(0);
});
tryBtn.addEventListener('click',()=>{
  quizBox.classList.add('active');
  resultBox.classList.remove('active');
  score=0;
  const quizScore=document.querySelector('.quiz-score');
  quizScore.innerHTML=`Score : ${score} / ${questions.length}`;
   questionCount=0;
  showQuestion(0);
});
goHomeBtn.addEventListener('click',()=>{
  resultBox.classList.remove('active');
  quizBox.classList.remove('active');
  quizSection.classList.remove('active');
  score=0;
  const quizScore=document.querySelector('.quiz-score');
  quizScore.innerHTML=`Score : ${score} / ${questions.length}`;
   questionCount=0;
  showQuestion(0);

});
let questionCount=0;
let score=0;
const nextBtn=document.querySelector('.next-btn');
const optionList=document.querySelector('.option-list');
const questionTotal=document.querySelector('.question-total');
nextBtn.addEventListener('click',()=>{
  if(questionCount<questions.length-1)
  {
   questionCount++;
   showQuestion(questionCount);
  }
  else{
    console.log('Questions Completed');
    showResultBox();
  }
});
function showQuestion(index)
{
  const quizQuestion=document.querySelector('.quiz-question');

  quizQuestion.innerHTML=`${questions[index].num}. ${questions[index].question}`;
  let optionTag=`<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div>`;
  optionList.innerHTML=optionTag;

  let numberTag=` <span class="question-total">${questions[index].num} of ${questions.length} Questions</span>`;
  questionTotal.innerHTML=numberTag;

  nextBtn.classList.add('disable');
  const option=document.querySelectorAll('.option');
  for(let i=0;i<option.length;i++)
  {
    option[i].setAttribute('onclick','optionSelected(this)');
  }
}

function optionSelected(answer)
{ nextBtn.classList.remove('disable');
  let useranswer=answer.textContent;
  let correctanswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;
  const quizScore=document.querySelector('.quiz-score');
  if(useranswer == correctanswer)
  { answer.classList.add('correct');
    score++;
    quizScore.innerHTML=`Score : ${score} / ${questions.length}`;
  }
  else{
    answer.classList.add('incorrect');
    //if incorrect answer than autoselect correct one
    for(let i=0;i<allOptions;i++)
    {
      if(optionList.children[i].textContent==correctanswer)
       optionList.children[i].setAttribute('class','option correct');
    }
  }
  //if user has selected one than disable all other options
  for(let i=0; i< allOptions ; i++)
  {
    optionList.children[i].classList.add('disabled');
  }
}
function showResultBox()
{
  resultBox.classList.add('active');
  quizBox.classList.remove('active');

  const scoreValue=document.querySelector('.score-text');
  scoreValue.textContent=`Your score ${score} out of ${questions.length} `;

  const progressValue=document.querySelector('.progress-value');
  // progressValue.textContent=`${(score/questions.length)*100} %`;

  const circularProgress=document.querySelector('.circular-progress');
  let progressStartValue=-1;
  let progressEndValue=(score/questions.length)*100;
  let progress= setInterval(()=>{
    progressStartValue++;
    //  console.log(progressStartValue);
    progressValue.textContent= `${progressStartValue}%`;
    circularProgress.style.background=`conic-gradient(#1ca7ed ${3.6*progressStartValue}deg, rgba(255,255,255,.1) 0deg)`;
    if(progressStartValue==progressEndValue)
    {
      clearInterval(progress);
    }
  },20);
}


