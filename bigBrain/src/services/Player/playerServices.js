import { urls } from "../../constants/urls"
import { doGet, doPost, doPut } from "../apiRequests"

export const getPlayerId = (sessionId, playerName) => {

    return doPost(`${urls.playerId}/${sessionId}`, {
        name: playerName
    }).then((res) =>  {return res.json()})
}


export const pollGameStart =(playerId) => {
    return new Promise((resolve,reject)=>{
        let gameStartPoller = setInterval(() => {
            doGet(`${urls.pollGameStart}/${playerId}/status`).then((res) =>   {
                if (res.status !== 200){
                    clearInterval(gameStartPoller)
                    return reject()
                }
                res.json().then((data)=>{
                if(data.started){
                    resolve(data)
                    clearInterval(gameStartPoller);
                }
            })})
        }, 1000);
    })
}
export const pollGameEnd =(playerId) => {
    return new Promise((resolve,reject)=>{
        let gameEndPoller = setInterval(() => {
            doGet(`${urls.pollGameStart}/${playerId}/status`).then((res) =>   res.json().then((data)=>{
                if(!data.started){
                    resolve(data)
                    clearInterval(gameEndPoller);
                }
            }))
        }, 1000);
    })
}

export const PollGetTimeSinceStarted = (playerId,questionId) => {
    return new Promise((resolve,reject)=>{
            let QuestionPoller = setInterval(() => {
                doGet(`${urls.pollGameTimeSinceStart}/${playerId}/question`).then((res) =>   res.json().then((data)=>{
                    // console.log(data.question.id, questionId);
                    if(!data.error && (data.question.id !== questionId)){
                        clearInterval(QuestionPoller);
                        resolve(data)
                        
                    }else if(data.error){
                        reject("unable to fetch question")
                        clearInterval(QuestionPoller);
                    }
                }))
        }, 1000); 
    })
}

export const getPlayerResults = (playerId) => {
    return doGet(`${urls.playerResults}/${playerId}/results`).then((res) =>  {return res.json()})
}


export const sendAnswers = (playerId,answers) => {
    console.log(answers);

    return doPut(`${urls.sendAnswers}/${playerId}/answer`,{
        answerIds: answers
    }).then((res) =>  {return res.json()})
}
