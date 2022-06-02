import '../css/todo.css';
import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import * as Icon from 'react-bootstrap-icons';

function DisplayTasks (props) 
{
    const[metadata, setMetadata] = useState([])
    useEffect(() => {
        fetch("http://192.168.1.181:3001/todo/metadata")
            .then(res => res.json()).then (res => 
                { setMetadata(res["data"])
                })

    }, [props])

    return(
            <>
                {/* {console.log(metadata)} */}
                <Table className = 'displayTasksTable' striped bordered hover size="sm">
                    <thead>
                        <tr className='displayTaskCalenderHeaderRow'>
                            <th className='displayTaskCalenderHeaderLabel'>Name</th>
                            <th className='displayTaskCalenderHeaderLabel'>Task</th>
                            <th className='displayTaskCalenderHeaderLabel'>Calendar</th>
                            {/* <th className='displayTaskCalenderHeaderLabel'>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {metadata.map((item) => {
                                                // console.log(item["recurrence_pattern"])
                                                return(<tr key={item["uid"]}>
                                                        <td label className='displayTaskCalenderLabel'>{item["user_name"]}</td>
                                                        <td label className='displayTaskCalenderLabel'>{item["task_name"]}</td>
                                                        <td label className='displayTaskCalenderLabel'>{ item["recurrence_pattern"].map((item) => {
                                                            return (
                                                                        <label key={item.toString()} className='displayTaskCalenderLabel'> {item.toString()} </label>
                                                                    )
                                                        }) }</td>
                                                        {/* <td label className='displayTaskCalenderLabel'><Icon.PencilSquare/> <Icon.CalendarX /> </td> */}
                                                       </tr>
                                                      )
                            })}
                    </tbody>
                </Table>
            </>
          )

}

export {DisplayTasks}