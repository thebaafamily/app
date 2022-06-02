import { useEffect, useState } from 'react';
import '../css/todo.css';

import { SettingsAssignTasks } from './assigntasks';
import { DisplayTasks } from './displaytasks';

function Settings(props)
{
    const [selectedTab, setSelectedTab] = useState(0)
    const [settingsTab, setSettingsTab] = useState([
                                                    {"id" : 0, "name" : "Assign Tasks"},
                                                    {"id" : 1, "name" : "Show All Tasks"}
                                                   ]
                                                  )

    useEffect(() => {
        setSettingsTab([
                        {"id" : 0, "name" : "Assign Tasks"},
                        {"id" : 1, "name" : "Show All Tasks"}
                        ])
    },[props])

    const onSubmitTaskAssignment= () => {
        props.onSubmitTaskAssignment()
    }

    const handleSettingsTabClick = (i) => {
        setSelectedTab(i)
    } 
    return (
        <>
            <div className='settings'>
                <div id="settingsOuterContainer">
                {settingsTab.map( (item, i) => 
                                {
                                    // console.log(i, ", ", item["id"], ", ", item["name"], ", ", selectedTab)
                                    return (
                                            (item["id"]===selectedTab)?
                                                <button onClick={() => handleSettingsTabClick(i)} className='settingsInnerContainer settingsTab settingsTabEnabled' key={i} > {item["name"]} </button>
                                                :
                                                <button onClick={() => handleSettingsTabClick(i)} className='settingsInnerContainer settingsTab settingsTabDisabled' key={i} > {item["name"]} </button>
                                            )
                                }
                              )
                    }
                </div>
                { 
                    (settingsTab[selectedTab]["name"] === settingsTab[0]["name"]) ?
                        <>
                            <SettingsAssignTasks onSubmitTaskAssignment={onSubmitTaskAssignment}/>
                        </>
                    :
                        <>
                            <DisplayTasks />
                        </>
                }
            </div>
        </>
    )
}

export {Settings}