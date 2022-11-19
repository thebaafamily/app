import './css/fifa.css';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';

function Points(props)
{
    const [points, setPoints] = useState([])
    
    useEffect( () => {
        fetch("http://192.168.1.101:3003/points/" + props.selectedGroup)
            .then(res => res.json()).then( res => 
                {
                    setPoints(res["data"])
                    res["data"].map((item) => {
                        const p = res["data"].map(item => ({"groupid": item["groupid"], "data": item}))
                        var points = []
                        points = points.concat(p)
                        setPoints(points)
                    })
                }
            )
    }, [props])

    // useEffect( () => {
    //     fetch("http://localhost:3003/points/" + props.selectedGroup)
    //         .then(res => res.json()).then( res => 
    //             {
    //                 setPoints(res["data"])
    //                 res["data"].map((item) => {
    //                     const p = res["data"].map(item => ({"groupid": item["groupid"], "data": item}))
    //                     var points = []
    //                     points = points.concat(p)
    //                     setPoints(points)
    //                 })
    //             }
    //         )
    // }, [props])

    return(
            <div className='pointsContainer'>
            {/* {console.log(points.length, points,)} */}
            {(points.length > 0)?
            <>
                {
                    <>
                    {/* {console.log(props.selectedGroup)} */}
                    <Table className = 'displayFifaPointsTable'>
                        <thead className='displayFifaPointsTableHead'>
                            <tr className='displayFifaPointsHeaderRow'>
                                <th className='displayFifaPointsHeaderLabel'>Country</th>
                                <th className='displayFifaPointsHeaderLabel'>Played</th>
                                <th className='displayFifaPointsHeaderLabel'>Won</th>
                                <th className='displayFifaPointsHeaderLabel'>Lost</th>
                                <th className='displayFifaPointsHeaderLabel'>Draw</th>
                                <th className='displayFifaPointsHeaderLabel'>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {points.map((p) => {
                                // console.log(p["data"]["countryname"])
                                return (
                                    <tr bgcolor = {p["data"]["primarycolor"]} key={p["data"]["countryid"]}>
                                        <td className='displayFifaPointsRowLabel'>{p["data"]["tla"]} {p["data"]["flag"]}</td>
                                        <td className='displayFifaPointsRowLabel'>{p["data"]["played"]}</td>
                                        <td className='displayFifaPointsRowLabel'>{p["data"]["won"]}</td>
                                        <td className='displayFifaPointsRowLabel'>{p["data"]["lost"]}</td>
                                        <td className='displayFifaPointsRowLabel'>{p["data"]["draw"]}</td>
                                        <td className='displayFifaPointsRowLabel'>{p["data"]["points"]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </>
                    
                }
            </>
            :
            <></>
            }
            </div>
    )

}
export {Points}