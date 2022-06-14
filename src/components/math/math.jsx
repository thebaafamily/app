import './css/math.css';
import React, {useEffect, useState} from "react";

function Add (props)
{
    const [number1, setNumber1] = useState(Math.trunc(Math.random() * 100))
    const [number2, setNumber2] = useState(Math.trunc(Math.random() * 100))

    const [sum, setSum] = useState('')
    const [result, setResult] = useState("Wrong")
    const [resultCode, setResultCode] = useState(false)
    const [showResult, setShowResult] = useState(false)

    const handleSumChange = (evt) => {
        evt.preventDefault()
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex
        if (evt.target.value === '' || re.test(evt.target.value)) {
            let sum = evt.target.value
            setSum(sum)
        }
        
    }

    const checkResult = (evt) => {
        evt.preventDefault()
        if (number1 + number2 == sum)
        {
            setResult("Right")
            setResultCode(true)
        }
        setShowResult(true)
    }

    return (
        <>
            {/* <form onSubmit={checkResult}> */}
            <div>
                <label name="number1" value={number1} className='lbl addNumber1'> {number1} </label>
                <label className='lbl operator'> + </label>
                <label name="number2" value={number2} className='lbl addNumber2'> {number2} </label>
                <label className='lbl equalTo'> = </label>
                <input type="text" className='txtBox' name = "sum" value={sum} onChange={(evt) => handleSumChange(evt)}/>
            </div>
            {
                !showResult ?
                    <button type="submit" className='btnAdd' onClick={checkResult}> Check </button>
                :
                    resultCode ? <label className='lbl addResult addCorrectAnswer' > {result} </label> 
                               : <label className='lbl addResult addIncorrectAnswer' > {result} </label>
            }
            {/* </form> */}
        </>
    )
}

function MathPlay (props)
{
    const [gameType, setGameType] = useState(0)
    useEffect(() => {
        setGameType(Math.trunc(Math.random() * 5))
        // setGameType(gameType + 1)
    }, [])

    return (
            <>
                {/* {console.log(gameType)} */}
                <div className='mathContainer'>
                    {/* Let us play! */}
                    <Add />
                </div>
            </>
    
        )

    // const [gameType, setGameType] = useState(0)
    // useEffect(() => {

    //     setGameType(Math.trunc(Math.random() * 5))
    
    // return (
    //         <>
    //             {console.log(gameType)}
    //             <div className='mathContainer'>
    //                 Let us play!
    //             </div>
    //         </>
    
    //     )
    // }, [props])
}

export {MathPlay}