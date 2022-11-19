import './css/fifa.css';
import React, {useState, useEffect} from "react";


function Groups(props)
{
    const [GroupData, setGroupData] = useState([])
    
    useEffect( () => {
        fetch("http://192.168.1.101:3003/groups")
            .then(res => res.json()).then(res => {
                                                    setGroupData(res["data"])
                                                    props.setGroups(res["data"])
                                                })
    }, [])

    // useEffect( () => {
    //     fetch("http://localhost:3003/groups")
    //         .then(res => res.json()).then(res => {
    //                                                 setGroupData(res["data"])
    //                                                 props.setGroups(res["data"])
    //                                             })
    // }, [])

    function handleGroupChange(evt){
        props.handleGroupChange(evt.target.id)
    }

    return (
        <>
            {GroupData.map ((item) => {
                // console.log(item)
                // console.log(props.selectedGroup, item)
                let bgc = item['primarycolor']
                let cn = 'displayFifaGroupSpan'
                if (props.selectedGroup === Number(item['groupid']))
                {
                    // bgc = item['primarycolor'] + '70'
                    cn = 'displayFifaGroupSpan displayFifaGroupSpanSelected'
                }
                return(
                    <button key={item["groupid"]} 
                            id={item['groupid']}
                            style={{"backgroundColor" : bgc}} 
                            className={cn}
                            onClick={(evt) => handleGroupChange(evt)}>
                        {item["groupname"]}
                    </button>
            )})}
        </>
    )
}

export {Groups}