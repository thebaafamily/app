import './css/fifa.css';
import React, {useState, useEffect} from "react";

function Tabs(props)
{

    function handleTabChange(evt){
        // console.log(evt.target.id)
        props.handleTabChange(evt.target.id)
    }
    return (
        <>
        <div className='fifaTabMain'>
            {props.tabs.map((tab) => {
                // console.log(tab)
                let cn = 'fifaTabButton'
                if (props.selectedTab === tab)
                {
                    cn = 'fifaTabButton fifaTabButtonSelected'
                }
                return (
                    <button key={tab}
                            id={tab}
                            className={cn}
                            onClick= {(evt) => handleTabChange(evt)}
                    >
                        {tab}
                    </button>
                )
                })
            }
            </div>
        </>
    )
}

export {Tabs}

