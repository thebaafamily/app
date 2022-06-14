import './App.css';
import React, {useState} from "react";
import {Header, Footer} from './components/facade/facade'
import {Countdown} from './components/countdown/countdown'
import {Todo} from './components/todo/todo'
import {MathPlay} from './components/math/math'

function App() {
  const [showMathZone, setMathZone] = useState(false)

  function toggleMathZone(){
    setMathZone(!showMathZone)
  }

  return (
    <>
      <div className="App">
        <header className="App-header"> </header>
        <Header image={showMathZone ? 'tbf-todo.png' : 'tbf-math.png'} onMathZoneClicked={toggleMathZone} />
        <Countdown />
        {
          showMathZone ?
          <>
            <MathPlay />
          </>
          :
          <>
            <Todo />
          </>
        }
      </div>
      <Footer />
    </>
  );
}

export default App;
