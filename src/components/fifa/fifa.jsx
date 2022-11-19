import './css/fifa.css';
import React, {useState} from "react";

import { Tabs } from './tabs';
import { Groups } from './groups';
import {Itinerary} from './itinerary'
import {Points} from './points'

function Fifa(props)
{
    const [selectedGroup, setSelectedGroup] = useState(-1)
    const [tabs, setTabs] = useState(['Itinerary', 'Points Table'])
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const [groups, setGroups] = useState()

    function handleTabChange(currentTab){
        setSelectedTab(currentTab)
    }

    function handleGroupChange(currentGroup){
        if (selectedGroup === Number(currentGroup))
            setSelectedGroup(-1)
        else
            setSelectedGroup(Number(currentGroup))
    }

    return (
        <>
            {/* {console.log(groups)} */}
            <div className='fifaContainer'>
                <div className="fifaHeader fifaHeaderLabel" >
                    FIFA 2022
                </div>
                <Groups setGroups={setGroups} selectedGroup={selectedGroup} handleGroupChange={handleGroupChange}/>
                <Tabs tabs={tabs} selectedTab={selectedTab} handleTabChange={handleTabChange}/>
                {(selectedTab === 'Itinerary') ?
                    <Itinerary selectedGroup={selectedGroup}/>
                    :
                    <Points groups={groups} selectedGroup={selectedGroup}/>
                }
            </div>
        </>

    )
}


export {Fifa}
