import './css/fifa.css';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';

function Itinerary(props)
{
    const [ItineraryData, setItineraryData] = useState([])
    const [goalList, setGoalList] = useState([{"i": -1, "c": -1, "g": -1}])
    // const [goals, setGoals] = useState([{"i": -1, "g1": -1, "g2": -1}])
    const [goals, setGoals] = useState([{}])

    useEffect( () => {
        fetch("http://192.168.1.101:3003/itinerary/" + props.selectedGroup)
            .then(res => res.json()).then( res => {
                setItineraryData(res["data"])

                // const g1 = res["data"].map(item => ({"i": item["itineraryid"], "c": 1, "g": item["g1"]}))
                // const g2 = res["data"].map(item => ({"i": item["itineraryid"], "c": 2, "g": item["g2"]}))
                // var gl = []
                // gl = gl.concat(g1).concat(g2)
                // setGoalList(gl)

                const g = res["data"].map(item => ({"i": item["itineraryid"], "g1": item["g1"], "g2": item["g2"]}))
                // console.log("useEffect g", g)
                var goal = []
                goal = goal.concat(g)
                setGoals(goal)
            })
    }, [props])

    // useEffect( () => {
    //     fetch("http://localhost:3003/itinerary/" + props.selectedGroup)
    //         .then(res => res.json()).then( res => {
    //             setItineraryData(res["data"])

    //             // const g1 = res["data"].map(item => ({"i": item["itineraryid"], "c": 1, "g": item["g1"]}))
    //             // const g2 = res["data"].map(item => ({"i": item["itineraryid"], "c": 2, "g": item["g2"]}))
    //             // var gl = []
    //             // gl = gl.concat(g1).concat(g2)
    //             // setGoalList(gl)

    //             const g = res["data"].map(item => ({"i": item["itineraryid"], "g1": item["g1"], "g2": item["g2"]}))
    //             // console.log("useEffect g", g)
    //             var goal = []
    //             goal = goal.concat(g)
    //             setGoals(goal)
    //         })
    // }, [props])

    function handleGoalUpdate(evt) {
        console.log(evt.target.id)
        const i = Number(evt.target.id)
        console.log("goals: ", goals)
        // const g = goals.filter(g => {return (g["i"] === item["itineraryid"] && g["g1"] >= 0 && g["g2"] >= 0)})
        const goalItem = goals.filter((item) => {
            return item["i"] === i
        })
        console.log(goalItem)
        fetch("http://localhost:3003/score",
            {
                method : "PUT",
                headers : {"Accept": "application/json",
                        "Content-Type" : "application/json"},
                body: JSON.stringify(
                    {"data" : goalItem[0]}
                )
            }
        ).then((res) => res.json()).then(res => setItineraryData(res["data"]))

    }

    function handleGoalChange(evt, i, c){
        
        const g = Number(evt.target.value)
        // console.log(i, c, g)
        const newGoals = goals.map(item => {
            if (item["i"] === i){
                // console.log(item)
                if (c == 1)
                    return {"i": item["i"], "g1": g, "g2": item["g2"]}
                else 
                    return {"i": item["i"], "g1": item["g1"], "g2": g}
            }
            return item
        })
        // console.log("newGoals", newGoals)
        setGoals(newGoals)
        
        // console.log(i, c, g)
        // let lgoals = [...goals]
        // let lgoal = (lgoals.filter(g => g["i"]===i))
        // if (c === 1){
        //     lgoal["g1"] = g
        // }
        // else{
        //     lgoal["g2"] = g
        // }
        // lgoals
        // console.log(lgoal)
        // const hasVal = goalList.some(item => {
        //     if (item["i"] === i && item["c"] === c){
        //         return true
        //     }
        //     return false
        // })
        // if (hasVal){
        //     setGoalList(goalList.map(item => {
        //         return (item["i"] === i && item["c"] === c) ? {"i": i, "c": c, "g": g} : item
        //     }))
        // }
        // else{
        //     const item = {"i": i, "c": c, "g": g}
        //     const newItem = goalList.concat(item)
        //     setGoalList(newItem)
        // }
    }

    return(
        <>            
            <Table className = 'displayFifaTable'>
                <thead className='displayFifaTableHead'>
                    <tr className='displayFifaHeaderRow'>
                        <th className='displayFifaHeaderLabel'>Date</th>
                        <th className='displayFifaHeaderLabel'>Venue</th>
                        <th className='displayFifaHeaderLabel'>Game</th>
                        <th className='displayFifaHeaderLabel'>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {ItineraryData.map((item) => {
                                            const eg1 = goals.filter(g => {return (g["i"] === item["itineraryid"] && g["g1"] >= 0)}) 
                                            const eg2 = goals.filter(g => {return (g["i"] === item["itineraryid"] && g["g2"] >= 0)}) 
                                            const e = (eg1.length > 0 && eg2.length) ? true : false
                                            const g1 = (eg1.length > 0) ? eg1[0].g1 : ""
                                            const g2 = (eg2.length > 0) ? eg2[0].g2 : ""
                                            const et = (item["tenseid"] ==0)? true : false
                                            const etcss = (item["tenseid"] < 0)? 'displayFifaRowLabel displayFifaRowLabelPast' : (item["tenseid"] == 0) ?'displayFifaRowLabel displayFifaRowLabelPresent' : 'displayFifaRowLabel displayFifaRowLabelFuture'
                                            
                                            // console.log(item["tenseid"])

                                            return(
                                                
                                                <tr bgcolor = {item["primarycolor"]} key={item["itineraryid"]}>
                                                    <td className={etcss}>{item["fdate"]}</td>
                                                    <td className={etcss}>{item["venuename"]}</td>
                                                    <td className={etcss}>{item["countryname"]} {item["flag"]} vs {item["countryname_c2"]} {item["flag_c2"]}</td>
                                                    <td className={etcss}>
                                                        {/* <span className='displayFifaGoalSpan'> */}
                                                            <input disabled = {!et} className='displayFifaGoal' value={g1} placeholder={item["tla"]} onChange={(evt) => handleGoalChange(evt, item["itineraryid"], 1)}></input>
                                                            {/* <input className='displayFifaGoal' value={(item["g1"] >= 0) ? item["g1"] : ""} placeholder={item["tla"]} onChange={(evt) => handleGoalChange(evt, item["itineraryid"], 1)}></input> */}
                                                        {/* </span> */}
                                                        {/* <span className='displayFifaGoalSpan'> */}
                                                            <input disabled = {!et} className='displayFifaGoal' value={g2} placeholder={item["tla_c2"]} onChange={(evt) => handleGoalChange(evt, item["itineraryid"], 2)}></input>
                                                            {/* <input className='displayFifaGoal' value={(item["g2"] >= 0) ? item["g2"] : ""} placeholder={item["tla_c2"]} onChange={(evt) => handleGoalChange(evt, item["itineraryid"], 2)}></input> */}
                                                        {/* </span> */}
                                                        {/* <span className='displayFifaGoalSpan'> */}
                                                            <button disabled = {!e} id={item["itineraryid"]} className= { (e && et) ? 'displayFifaGoalButton displayFifaGoalButtonEnable' : 'displayFifaGoalButton displayFifaGoalButtonDisable'} onClick={(evt, key) =>  handleGoalUpdate(evt, key)}>+</button>
                                                            {/* <button id={item["itineraryid"]} className= 'displayFifaGoalButton displayFifaGoalButtonEnable' onClick={(evt, key) =>  handleGoalUpdate(evt, key)}>+</button> */}
                                                            {/* <button id={item["itineraryid"]} className='displayFifaGoalButton displayFifaGoalButtonEnable' onClick={(evt, key) =>  handleGoalUpdate(evt, key)}>+</button> */}
                                                        {/* </span> */}
                                                    </td>
                                                </tr>
                                            )
                        })}
                </tbody>
            </Table>
      </>
    )
}

export {Itinerary}