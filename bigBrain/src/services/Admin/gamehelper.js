import { urls } from '../../constants/urls';
import { doDelete, doPut } from '../apiRequests';
import { fetchQuizData } from '../games/gameService';
import { getCopy } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
export const updateGameQuestions = (id, newGamedata) => {
  return doPut(urls.updateGame + `/${id}`, newGamedata).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.log(res);
      console.error('failed to update game');
    }
  });
};

export const deleteGameById = (id) => {
  return doDelete(urls.updateGame + `/${id}`).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.log(res);
      console.error('failed to update game');
    }
  });
};

export const updateQuestion = (gameId, newGamedata) => {
  return doPut(urls.updateGame + `/${gameId}`, newGamedata).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.log(res);
      console.error('failed to update game');
    }
  });
};

export const getQuestionFromIds = (gameId, quesId) => {
  return new Promise((resolve, reject) =>
    fetchQuizData(gameId).then((data) => {
      console.log(data);
      data.questions.map((value, index) => {
        if (quesId === value.id) {
          return resolve(value);
        } else return null;
      });
    })
  );
};

export const updateGameQuestionOfId = (gameId, quesId, newGamedata) => {
  return new Promise((resolve, reject) =>
    fetchQuizData(gameId).then((data) => {
      console.log(data);
      data.questions.map((value, index) => {
        if (quesId === value.id) {
          data.questions[index] = newGamedata;
          updateQuestion(gameId, data).then((res) => {
            if (JSON.stringify(res) === '{}') {
              return resolve(data);
            } else {
              reject(new Error('Failed while updating the value'));
            }
          });
        } else return null;
        return null;
      });
    })
  );
};

export const addQuestions = (gameId, questions) => {
  const newQues = getCopy(questions);
  const newQuestions = newQues.map((question, idx) => {
    question.id = uuidv4();
    const answers = question?.answer?.value.map((answer, idx) => {
      answer.id = uuidv4();
      return answer;
    });
    question.answer.value = answers;
    return question;
  });

  updateGameQuestions(gameId, {
    questions: [...newQuestions],
    thumbnail: '',
  }).then((data) => {
    if (JSON.stringify(data) === '{}') {
      console.log('Questions Added');
    }
  });
};
