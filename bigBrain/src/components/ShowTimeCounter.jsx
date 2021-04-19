import React,{useState, useEffect} from 'react'

export default function ShowTimeCounter({startTime, timeLimit, handleTimeout}) {
    console.log(startTime, timeLimit);
    const [count, setCounter] = useState(Number(timeLimit))
    useEffect(() => {
        const counter = setInterval(() => {
            const now = new Date()
            const time_now = now.getTime()
            const start = new Date(startTime)
            const time_start = start.getTime() 
            const time = Math.floor((time_now-time_start)/1000);
            if((timeLimit - time )< 0){
                handleTimeout()
                clearInterval(counter)
            }else{
                setCounter(time)

            }
            }, 1000);
        return () => {
            clearInterval(counter)
        }
    }, [count])
   
    return (
        <div>
            {timeLimit - count}
        </div>
    )
}
