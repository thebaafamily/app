import '../css/todo.css';
import React, {useState, useEffect} from "react";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
function SettingsAssignTasks(props)
{
    const [UserList, setUserList] = useState()
    const [TaskList, setTaskList] = useState()
    const [TaskCalendarList, setTaskCalendarList] = useState()

    const [enableSave, setEnableSave] = useState(false)
    
    const [user, setUser] = useState([])
    const [task, setTask] = useState([])
    const [taskCalendar, setTaskCalendar] = useState([])

    useEffect(() => {
        // https://remotestack.io/react-js-get-data-with-fetch-api-and-rest-api-tutorial/
        fetch("http://localhost:3001/users/all")
            .then(res => res.json()).then (res => 
                {
                    var userMap = []
                    res["data"].map((row) => {userMap.push({label: row["name"], value: row["id"]})})
                    setUserList(userMap)
                })
                
        fetch("http://localhost:3001/tasks/all")
            .then(res => res.json()).then (res => 
                {
                    var taskMap = []
                    res["data"].map((row) => {taskMap.push({label: row["name"], value: row["id"]})})
                    // console.log(taskMap)
                    setTaskList(taskMap)
                })

        fetch("http://localhost:3001/calendar/all")
            .then(res => res.json()).then (res => 
               {
                    var calendarMap = []
                    res["data"].map((row) => {calendarMap.push({label: row["name"], value: row["id"]})})
                    // console.log(taskMap)
                    setTaskCalendarList(calendarMap)
                })
    }, [props])

    const handleTaskAssignUserChange = (evt) =>
    {
        setUser(evt)
        const validation = Object.keys(evt).length * Object.keys(task).length * Object.keys(taskCalendar).length
        validation === 0 ?  setEnableSave(false) : setEnableSave(true)
    }

    const handleTaskAssignTaskChange = (evt) =>
    {
        setTask(evt)
        const validation = Object.keys(user).length * Object.keys(evt).length * Object.keys(taskCalendar).length
        validation === 0 ?  setEnableSave(false) : setEnableSave(true)
    }

    const handleTaskAssignCalendarChange = (evt) =>
    {
        setTaskCalendar(evt)
        const validation = Object.keys(user).length * Object.keys(task).length * Object.keys(evt).length
        validation === 0 ?  setEnableSave(false) : setEnableSave(true)
    }

    const handleTaskAssignCancel = () =>
    {
        setUser([])
        setTask([])
        setTaskCalendar([])
    }

    const handleAssignTaskSubmit = () =>
    {
        // console.log(user["value"])
        // console.log(task["value"])
        // console.log(taskCalendar)
        var taskcalendarList = []
        taskCalendar.map((row) => taskcalendarList.push(row["value"]))
        // console.log(taskcalendarList)
        fetch("http://localhost:3001/task/assign/", 
        {
            method: "POST",
            headers: {"Accept": "application/json",
                      "Content-Type": "application/json"},
            body: JSON.stringify(
                {
                    "user_id" : user["value"],
                    "task_id" : task["value"],
                    "calendar_id" : taskcalendarList
                }
            ),
        }
        ).then((res) => res.json()).then(res => {console.log(res)});
        // console.log('000')
        props.onSubmitTaskAssignment()
        // console.log('111')
        handleTaskAssignCancel()
        // console.log('222')
    }
    return(<>
                {/* <h3>Assign Tasks</h3> */}
                <div className="container">
                    <div className="row assignTaskRow">                            
                        <div className="assignTaskLabel col-md-2"> <label>User </label> </div>
                        <div className="col-md-4"> <Select defaultValue={user} onChange={(evt) => handleTaskAssignUserChange(evt)} value={user} className='asisgnTaskDropdown' options = { UserList }/> </div>
                    </div>

                    <div className="row assignTaskRow">
                        <div className="assignTaskLabel col-md-2"> <label>Task </label> </div>
                        <div className="col-md-8"> <Select defaultValue={task} onChange={(evt) => handleTaskAssignTaskChange(evt)} value={task} className='asisgnTaskDropdown' options = { TaskList }/> </div>
                    </div>

                    <div className="row assignTaskRow">
                        <div className="assignTaskLabel col-md-2"> <label>When </label> </div>
                        <div className="col-md-8"> <Select defaultValue={taskCalendar} onChange={(evt) => handleTaskAssignCalendarChange(evt)} value={taskCalendar} className='asisgnTaskDropdown' isMulti options = { TaskCalendarList }/> </div>
                    </div>

                    <div className="row assignTaskRow">
                        <div className='col-md-3'></div>
                        <button disabled = {!enableSave} onClick= {() => handleAssignTaskSubmit()} className= {enableSave ? "col-md-2 assignTaskButton enable" : "col-md-2 assignTaskButton disable" } >Save</button>
                        <div className='col-md-1'></div>
                        <button onClick = {() => handleTaskAssignCancel()} className="col-md-2 assignTaskButton enable">Cancel</button>
                        <div className='col-md-4'></div>
                    </div>
                </div>
           </>)
}

export {SettingsAssignTasks}