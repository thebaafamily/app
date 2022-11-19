import './css/math.css';
import React, {useEffect, useState} from "react";

function MathResult(props)
{
    useEffect(() => {
        
    }, [props])
    return(
        <>
            
            <div className='mathResults'> You've scored {props.rank} 
            {/* <button> Play Again </button> */}
            <img className="mathRestartGame" src="/tbf-math-restart.png" alt="Restart" onClick={props.restartGame}></img>
            </div>
        </>
    )
}

function MathTimer(props)
{
    const [timer, setTimer] = useState(props.timeWindow)
    // const [timer, setTimer] = useState(30)
    const [ti, setTi] = useState()
    const startTimer = () => {
        setTimer(timer - 1)
    }

    const setupTimer = () => {
        setTi(setInterval(startTimer, 1000))
    }

    const stopTimer = () => {
        clearInterval(ti)
        setTimer(props.timeWindow)
    }

    useEffect(() => {
        // setTimer(props.timeWindow)
        console.log("isGameActive", props.isGameActive, timer)

        setupTimer()
        // return () => {
        //     clearInterval(ti)
        // }

        // setTimer(props.timeWindow)
        // if (props.isGameActive)
        // {
        //     const interval = setInterval( () => {
        //         if (timer > 0)
        //         {
        //             setTimer(timer - 1)
        //         }
        //         // else
        //         // {
        //         //     console.log("Invoking Handle Timer")
        //         //     props.handleTimer()
        //         //     // setTimer(props.timeWindow)
        //         // }
        //     }, [1000])
        //     if (timer === 0)
        //     {
        //         clearInterval(interval)
        //         props.handleTimer()
        //     }
        //}
    }, [props.isGameActive]);

    return (<>
                {timer}
            </>)

}

function MathRank(props)
{
    const [rank, setRank] = useState(props.rank)
    useEffect(() => {
        setRank(props.rank)
    }, [props])

    return (<>
                {rank}
            </>)
}

function MathProblem (props)
{
    const [number1, setNumber1] = useState(0)
    const [number2, setNumber2] = useState(0)
    const [mathOperator, setMathOperator] = useState('')
    const [answer, setAnswer] = useState('')

    useEffect(() => {
        setMathOperator(props.mathOperator)
        if(mathOperator == '+')
        {
            setNumber1(Math.trunc(Math.random() * 100))
            setNumber2(Math.trunc(Math.random() * 100))
        }
        else if (mathOperator == '*')
        {
            setNumber1(2 + Math.trunc(Math.random() * 11))
            setNumber2(2 + Math.trunc(Math.random() * 11))
        }
        setAnswer('')
    }, [props])


    const handleAnswerChange = (evt) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (evt.target.value === '' || re.test(evt.target.value)) {
            let answer = evt.target.value
            setAnswer(answer)
        }
    }

    const checkResult = (evt) => {
        if (mathOperator == '+'){
            if (number1 + number2 == answer){
                props.handleScore(1)
            }
            else{
                props.handleScore(-1)
            }
        }
        else if (mathOperator == '*'){
            if (number1 * number2 == answer){
                props.handleScore(1)
            }
            else{
                props.handleScore(-1)
            }
        }
    }

    const handleKeyDown = (evt) => {
        if (evt.key == 'Enter')
            checkResult(evt)
    }

    return (
        <>
            <div>
                <label name="number1" value={number1} className='lbl mathNumber1'> {number1} </label>
                <label className='lbl operator'> {mathOperator} </label>
                <label name="number2" value={number2} className='lbl mathNumber2'> {number2} </label>
                <label className='lbl equalTo'> = </label>
                <input type="text" className='txtBox' name = "answer" value={answer} onChange={(evt) => handleAnswerChange(evt)} onKeyDown={(evt) => handleKeyDown(evt)} />
            </div>
        </>
    )
}

function MathPlay (props)
{
    const [timeWindow, setTimeWindow] = useState(5)
    const [gameType, setGameType] = useState(0)
    const [rank, setRank] = useState(0)
    const [isGameActive, setIsGameActive] = useState(true)

    useEffect(() => {
        console.log("Invoked MathPlay")
        setGameType(0)
        setGameType(Math.trunc(Math.random() * 5))
        setRank(0)
        setIsGameActive(true)        
    }, [props])

    const handleScore = (score) => {
        setRank(rank + score)
    }

    const handleTimer = () => {
        console.log('setting IsGameActive to false')
        setIsGameActive(false)
    }

    const restartGame = () => {
        setTimeWindow(5)
        console.log("TimeWindow is now ", timeWindow)
        setIsGameActive(true)
    }

    return (
            <>
                <div className='mathContainer'>
                    <div className="mathPane">
                        <span className="mathSidePane mathLeftPane">
                            <MathTimer isGameActive={isGameActive} timeWindow={timeWindow} handleTimer={handleTimer}/>
                        </span>
                        <span className="mathCenterPane">
                            {
                                isGameActive ?
                                    <MathProblem mathOperator={'*'} handleScore={(score) => handleScore(score)}/>
                                :
                                    <MathResult rank={rank} restartGame={restartGame}/>
                            }
                        </span>
                        <span className="mathSidePane mathRightPane">
                            <MathRank rank={rank}/>
                        </span>
                    </div>
                    
                </div>
            </>
    
        )
}

export {MathPlay}