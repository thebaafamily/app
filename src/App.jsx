import './App.css';
import React, {useState} from "react";
import {Header, Footer} from './components/facade/facade'
import {Countdown} from './components/countdown/countdown'
import {Todo} from './components/todo/todo'
import {Math} from './components/math/math'

function App() {
  // const [user, setUser] = useState(0)
  // const [showSettings, setShowSettings] = useState(false)
  const [showKidZone, setKidZone] = useState(false)
  // const [showTaskAssigned, setShowTaskAssigned] = useState(false)

  // function handleUserChange(currentUser){
  //   setUser(currentUser)
  // }

  // function toggleSettings(){
  //   setShowSettings(!showSettings)
  //   // setShowTaskAssigned(false)
  //   // console.log(showSettings)
  // }

  function toggleKidZone(){
    setKidZone(!showKidZone)
  }

  // function toggleTaskAssigned(){
  //   setShowTaskAssigned(!showTaskAssigned)
  // }

  return (
    <>
      <div className="App">
        <header className="App-header"> </header>
        <Header onKidZoneClicked={toggleKidZone} />
        <Countdown />
        <Todo />
      </div>
      <Footer />
    </>
  );
}

export default App;
