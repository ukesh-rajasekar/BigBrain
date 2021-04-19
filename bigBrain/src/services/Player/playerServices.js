import { urls } from "../../constants/urls"
import { doGet, doPost } from "../apiRequests"

export const getPlayerId = (sessionId, playerName) => {

    return doPost(`${urls.playerId}/${sessionId}`, {
        name: playerName
    }).then((res) =>  {return res.json()})
}


export const pollGameStart =(playerId) => {
    return new Promise((resolve,reject)=>{
        let gameStartPoller = setInterval(() => {
            doGet(`${urls.pollGameStart}/${playerId}/status`).then((res) =>   res.json().then((data)=>{
                console.log(data);
                if(data.started){
                    resolve(data)
                    clearInterval(gameStartPoller);
                }
            }))
        }, 1000);
    })
}
export const pollGameEnd =(playerId) => {
    return new Promise((resolve,reject)=>{
        let gameEndPoller = setInterval(() => {
            doGet(`${urls.pollGameStart}/${playerId}/status`).then((res) =>   res.json().then((data)=>{
                console.log(data);
                if(!data.started){
                    resolve(data)
                    clearInterval(gameEndPoller);
                }
            }))
        }, 1000);
    })
}