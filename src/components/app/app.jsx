


import './css/app.css';
import React, {useState, useEffect} from "react";

function Header(props)
{
    useEffect(() => {
    })

    const handleSettingsClick = () => 
    {
        props.onSettingsClicked()
    }
    return (
        <>
            <div className="headerContainer">
                <div className="header">
                    <span className="headerSide">
                    </span>
                    <span className="headerTitle">
                        <h1>the baa family </h1>
                    </span>
                    <span className="headerSide">
                        <img className="headerSettingImage" src="/settings.png" alt="Settings" onClick={handleSettingsClick}></img>
                    </span>
                </div>
            </div>
        </>
    )
}


function Footer(props)
{
    useEffect(() => {

    })
    return (
        <>
            <div className='footer'>
                <div className='footerText'>
                    the baa family
                </div>
            </div>
        </>
    )
}

export {Header, Footer}