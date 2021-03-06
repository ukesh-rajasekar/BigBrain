import { doGet } from '../apiRequests';
import { urls } from '../../constants/urls';

export const fetchAllGames = () => {
  return doGet(urls.allGames).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.error('failed to get games');
    }
  });
};
export const fetchAllGamesByIds = (ids) => {
  const promises = [];
  for (const id of ids) {
    promises.push(fetchQuizData(id));
  }
  return Promise.allSettled(promises);
};
export const fetchQuizData = (id) => {
  //   return Promise.resolve(12)
  return doGet(urls.gameByID + `/${id}`).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.error('failed to get game');
    }
  });
};

export const fetchGameResult = (sessionId) => {
  return doGet(`${urls.gameResults}/${sessionId}/results`).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.error('failed to get games results');
    }
  });
};
