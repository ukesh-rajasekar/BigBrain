import { urls } from "../../constants/urls"
import { doDelete, doPut } from "../apiRequests"
import { fetchQuizData } from "../games/gameService"

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


export const updateQuestion = (gameId, newGamedata) => {
   return doPut(urls.updateGame + `/${gameId}`, newGamedata).then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      console.log(res)
      console.error('failed to update game')
    }
  })
}

export const getQuestionFromIds = (gameId, quesId) => {
 return new Promise((resolve,reject)=>fetchQuizData(gameId).then((data) => {
    console.log(data);
    data.questions.map((value, index) => {
      if (quesId === value.id) {
        return resolve(value)
      } else return null
    })
  })) 

}

export const updateGameQuestionOfId = (gameId, quesId, newGamedata) => {
  return new Promise((resolve,reject)=>fetchQuizData(gameId).then((data) => {
    console.log(data);
    data.questions.map((value, index) => {
      if (quesId === value.id) {
        data.questions[index] = newGamedata
        updateQuestion(gameId, data).then((res) => {
          if (JSON.stringify(res) === '{}') {
            
            return resolve(data)
          } else {
            reject("Failed while updating the value")
          }
        })
      } else return null
    })
  })) 
}