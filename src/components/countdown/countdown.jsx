import './css/countdown.css';
import React, {useState, useEffect} from "react";
import Marquee from "react-fast-marquee";

function Countdown(props)
{
    const [countdown, setCountdown] = useState([])
    useEffect(() => {
        fetch("http://192.168.1.181:3002/countdown")
        .then(res => res.json()).then (res => 
        {
            // console.log(res["data"]); 
            setCountdown(res["data"])
        })
    }, [props])

    return (
        <>
            <Marquee speed={75} 
                     gradient={false} 
                    //  gradientColor={[0, 100, 100]} 
                    //  gradientWidth = {50}
                    //  pauseOnClick = {true}
                     pauseOnHover = {true}>
            {
                countdown.map( (cd, i) => 
                                    {
                                        // console.log(cd);
                                        return (
                                            <div key={cd.name}>
                                                <label className='cdmarquee'> {cd.name} -  {cd.daystogo} days to go</label>
                                            </div>
                                        )
                                    }
                    )
            }
            </Marquee>
        </>
    )

}
export {Countdown}