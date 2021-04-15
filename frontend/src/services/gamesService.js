import { doGet } from './apiService'
import { urls } from './links'

export const fetchAllGames = () => {
  return doGet(urls.allGames).then((res) => {
    if (res.status === 200) {
      res.json().then(async (data) => {
        const promises = []
        for (const [, quiz] of Object.entries(data.quizzes)) {
          promises.push(fetchQuizData(quiz.id))
        }
        Promise.allSettled(promises).then((values) => console.log(values))
      })
    } else {
      console.error('failed to get games')
    }
  }).then((d) => console.log('d', d))
}

export const fetchQuizData = async (id) => {
//   return Promise.resolve(12)
  return doGet(urls.gameByID + `/${id}`).then((res) => {
    if (res.status === 200) {
      res.json().then((data) => {
        console.log(data);
        Promise.resolve(data);
      })
    } else {
      console.error('failed to get game')
    }
  })
}
