/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  return question;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  console.log('correct ans',question)
  const answers = question.answer
  let correctAns = []
  answers.value.map((value, idx) => {
    if(value.isCorrectAnswer) {
      correctAns.push(value.id)
    }
  })
  return correctAns;
   // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  const answers = question.answer
  let allAns = []
  answer.value.map((value, idx) => {
      allAns.push(value.id)
  })
  return allAns; // For a single answer
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  console.log('time',question)
  return question.timeLimit.value;
};
