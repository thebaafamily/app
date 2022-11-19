import './App.css';
import React, {useState} from "react";
import {Header, Footer} from './components/facade/facade'
import {Countdown} from './components/countdown/countdown'
import {Todo} from './components/todo/todo'
import {Fifa} from './components/fifa/fifa'
import {MathPlay} from './components/math/math'
import {Test} from './components/test/test'

function App() {
  const [showMathZone, setMathZone] = useState(false)

  function toggleMathZone(){
    setMathZone(!showMathZone)
  }

  return (
    <>
      {/* <Test /> */}
      <div className="App">
        <header className="App-header"> </header>
        {/* <Header image={showMathZone ? 'tbf-todo.png' : 'tbf-math.png'} onMathZoneClicked={toggleMathZone} /> */}
        {/* <Countdown /> */}
        <Fifa />
        {/* {
          showMathZone ?
          <>
            <MathPlay />
          </>
          :
          <>
            <Todo />
          </>
        } */}
      </div>
      <Footer />
    </>
  );
}

export default App;
