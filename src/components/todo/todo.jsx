import './css/todo.css';
import React, {useState, useEffect} from "react";
import {Settings} from './settings/settingsmain'
import {Popup} from './popup'
// import Select from 'react-select';

function Todo(props)
{
    const [user, setUser] = useState(0)
    const [showSettings, setShowSettings] = useState(false)
    const [showTaskAssigned, setShowTaskAssigned] = useState(false)

    function handleUserChange(currentUser){
        setUser(currentUser)
    }
    const handleSettingsClick = () => 
    {
        setShowSettings(!showSettings)
    }
    
    function toggleTaskAssigned(){
        setShowTaskAssigned(!showTaskAssigned)
    }

    return(
        <>
            <div className='tasksContainer'>
                <div className="tasksheader">
                    <span className="tasksSide"> </span>
            
                    <div className='tasksLabel'> tasks </div>

                    <span className="tasksSide">
                        <img className="tasksSettingImage" src="/settings.png" alt="Kid Zone" onClick={handleSettingsClick}></img>
                    </span>
                </div>
                {showSettings ?
                    <>
                        <Settings init={true} onSubmitTaskAssignment={toggleTaskAssigned}/>
                            {showTaskAssigned && <Popup
                                          content={<>
                                                    <p>Task Assigned</p>
                                                  </>}
                                          handleClose={toggleTaskAssigned}
                                        />
                            }
                    </>
                :
                    <>
                        <Users value={user} onUserChange={handleUserChange}/> 
                        <Tasks value={user}/>
                    </>
                }
            </div>
      </>
    )
}

function Users(props)
{
    const [Users, setUsers] = useState([])
    useEffect(() => {
        // https://remotestack.io/react-js-get-data-with-fetch-api-and-rest-api-tutorial/
        fetch("http://192.168.1.181:3001/users")
            .then(res => res.json()).then (res => 
                {
                    // console.log(res["data"]); 
                    setUsers(res["data"])
                })
    }, [props])

    const handleUserTaskClick = (i, userName) => 
    {
        props.onUserChange(i)
    }
    return (
        <>
            <div>
                <div id="userOuterContainer">
                    {Users.map( (item, i) => 
                                {return (
                                    (i===props.value)?
                                        <button onClick={() => handleUserTaskClick(i, item.name)} className='userInnerContainer userTab userTabEnabled' key={i} > {item.name} </button>
                                    :
                                        <button onClick={() => handleUserTaskClick(i, item.name)} className='userInnerContainer userTab userTabDisabled' key={i} > {item.name} </button>
                                    )
                                }
                              )
                    }
                </div>
            </div>
        </>
    )
}

function Tasks(props)
{
    const [UserTasks, setTasks] = useState([])

    useEffect(() => {
        fetch("http://192.168.1.181:3001/tasks/userid/" + props.value)
            .then(res => res.json()).then (res => 
                {
                    // console.log("raw res", res)
                    // console.log("raw res[data]", res["data"])
                    setTasks(res["data"])
                })
    }, [props])

    async function handleTaskClick(task, action)
    {
        // https://www.bezkoder.com/react-fetch-example/
        let url = 'forward'
        if (action === -1)
        {
            url = 'backward'
        }
        try 
        {
            await fetch("http://192.168.1.181:3001/tasks/" + url + "/" + task.uid, 
                        {
                            method: "PUT",
                            headers: {"Content-Type": "application/json"},
                            body: task,
                        }
                        ).then((res) => res.json()).then(res => {setTasks(res["data"])});
          } 
          catch (err) 
          {
            console.log(err.message);
          }
    }

    return (
        <>
            {/* <div className='tasksContainer'> */}
                {/* {console.log(UserTasks)} */}
                {
                UserTasks.map( (task, i) => 
                                {
                                    return (
                                        <div key={task.uid}>
                                            {
                                                (task.status_id === 0)?
                                                    <div key={task.uid}> 
                                                        <span className='taskButton'></span>
                                                        <span className = "task notstarted" > {task.task_name}</span>
                                                        <button onClick = {() => handleTaskClick(task, 1)} className = "taskButton action start" > &gt; </button>
                                                    </div>
                                                : (task.status_id === 1)?
                                                    <div key={task.uid}>
                                                        <button onClick = {() => handleTaskClick(task, -1)} className = "taskButton back" > &lt; </button>
                                                        <span className = "task inprogress" > {task.task_name}</span>
                                                        <button onClick = {() => handleTaskClick(task, 1)} className = "taskButton done" > &gt; </button>
                                                    </div>
                                                    :
                                                        <div key={task.uid}>
                                                            <button onClick = {() => handleTaskClick(task, -1)} className = "taskButton start" > &lt; </button>
                                                            <div className = "task completed" > {task.task_name}</div>
                                                            <span className='taskButton'></span>
                                                        </div>
                                            }
                                        </div>
                                    )
                                    // console.log(taskId + task.task)
                                    // console.log(i)
                                    // console.log(task)
                                    // console.log(task.uid)
                                    // console.log("item", item)
                                    // console.log(item.user_id)
                                    // console.log(item.user_name)
                                    // console.log(item.task)
                                    // console.log(item.recurrence_pattern)
                                }
                              )
                    }
            {/* </div> */}
        </>
    )
}


export {Todo, Users, Tasks}
