import React, {useState} from 'react'
import { getCopy } from '../../services/helpers';

export default function ShowAnswers({type,answers, handleAnwserChange}) {
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const handleUpdates = (targetValue, id) => {
        console.log(targetValue, id, selectedAnswers);
        if(targetValue){
            if(type.value === 'multiple-choice'){
                setSelectedAnswers(getCopy([...selectedAnswers, id]))
                handleAnwserChange(getCopy([...selectedAnswers, id]))
            }else{
                setSelectedAnswers(getCopy([id]))
                handleAnwserChange(getCopy([id]))
            }
        }else{
            const temp = selectedAnswers
            const index = temp.indexOf(id);
            console.log(index);
            if (index > -1) {
                temp.splice(index, 1);
            }
            setSelectedAnswers(getCopy(temp))
            handleAnwserChange(getCopy(temp))
        }
        console.log(selectedAnswers);
        
    }
    if(type.value === 'multiple-choice'){
        return(
            <div>
                <form >
                    
              {answers.value.map((choice, idx)=>{
                  return <div key ={idx}>
                  <label htmlFor={idx}>{choice.answer}</label>
                  <input type="checkbox" name={idx} id={choice.id} onChange={(e)=>handleUpdates(e.target.checked, choice.id)}/>
                  </div>
              })}  
                </form>
        </div>
        )
    }
    return (
        <div>
              <form >
              {answers.value.map((choice, idx)=>{
                  return <div key ={idx}>
                  <label htmlFor={idx}>{choice.answer}</label>
                  <input type="radio" 
                  name={idx} 
                  id={choice.id} 
                  value={choice.id}
                  checked={choice.id === selectedAnswers[0]}
                  onChange={(e)=>handleUpdates(e.target.checked, choice.id)}/>
                  </div>
              })}  
              </form>
        </div>
    )
}
