import { doGet, doPut, doDelete } from './apiService'
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
  return doGet(urls.gameByID + `/${id}`).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      console.error('failed to get game')
    }
  })
}

export const updateGameQuestions = (id, newGamedata) => {
  return doPut(urls.updateGame + `/${id}`, newGamedata).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      console.log(res)
      console.error('failed to update game')
    }
  })
}

export const deleteGameById = (id) => {
  return doDelete(urls.updateGame + `/${id}`).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      console.log(res)
      console.error('failed to update game')
    }
  })
}
