import { doGet } from './apiService'
import { urls } from './links'

export const fetchAllGames = async () => {
  return doGet(urls.allGames).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      console.error('failed to get games')
    }
  })
}
export const fetchAllGamesByIds = (ids) => {
  const promises = []
  for (const id of ids) {
    promises.push(fetchQuizData(id))
  }
  return Promise.allSettled(promises)
}
export const fetchQuizData = async (id) => {
//   return Promise.resolve(12)
  console.log('game service')
  return doGet(urls.gameByID + `/${id}`).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      console.error('failed to get game')
    }
  })
}
