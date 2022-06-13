import './App.css';
import React, {useState} from "react";
import {Header, Footer} from './components/app/app'
import {Users, Tasks} from './components/todo/todo'
import {Settings} from './components/todo/settings/settingsmain'
import {Popup} from './components/todo/popup'
import {Countdown} from './components/countdown/countdown'

function App() {
  const [user, setUser] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [showTaskAssigned, setShowTaskAssigned] = useState(false)

  function handleUserChange(currentUser){
    setUser(currentUser)
  }

  function toggleSettings(){
    setShowSettings(!showSettings)
    setShowTaskAssigned(false)
    // console.log(showSettings)
  }

  function toggleTaskAssigned(){
    setShowTaskAssigned(!showTaskAssigned)
  }

  return (
    <>
      <div className="App">
        <header className="App-header"> </header>
        <Header value={user} onSettingsClicked={toggleSettings}/>
        <Countdown />
        {/* <div className='App'> */}
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
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
