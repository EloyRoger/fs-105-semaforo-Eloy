

// const TRAFFIC_LIGHT = ["red","yellow","green","purple"]

// const Home = () => {
//     const [ color, setColor] =useState(0);
//     const onNextColor = () => { 
//         const nexColor = color + 1;
//         if (newColor === TRAFFIC_LIGHT.length){
//             setColor(0)
//             return;
//         }
//         setColor(newColor)
//     }
// }

import { useState, useEffect } from 'react';
import '../../styles/TrafficLight.css';

const Home = () => {
  const [color, setColor] = useState("red");
  const [showPurple, setShowPurple] = useState(false);
  const [isAutoCycling, setIsAutoCycling] = useState(false);

  // Cambiar al siguiente color
  const changeToNextColor = () => {
    if (color === "red") setColor("yellow");
    else if (color === "yellow") setColor("green");
    else if (color === "green") setColor(showPurple ? "purple" : "red");
    else if (color === "purple") setColor("red");
  };

  // Mostrar/ocultar purple
  const togglePurple = () => {
    setShowPurple(!showPurple);
    if (color === "purple") setColor("red");
  };

  // Activar/desactivar ciclo automático
  const toggleAutoCycle = () => {
    setIsAutoCycling(!isAutoCycling);
  };

  // Efecto para el ciclo automático
  useEffect(() => {
    let interval;
    if (isAutoCycling) {
      interval = setInterval(changeToNextColor, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoCycling, color, showPurple]);

  return (
    <div className="traffic-container">
      <div className="traffic-light">
        <div className="stick"></div>
        <div 
          className={`light red ${color === "red" ? "active" : ""}`}
          onClick={() => setColor("red")}
        ></div>
        <div 
          className={`light yellow ${color === "yellow" ? "active" : ""}`}
          onClick={() => setColor("yellow")}
        ></div>
        <div 
          className={`light green ${color === "green" ? "active" : ""}`}
          onClick={() => setColor("green")}
        ></div>
        {showPurple && (
          <div 
            className={`light purple ${color === "purple" ? "active" : ""}`}
            onClick={() => setColor("purple")}
          ></div>
        )}
      </div>
      
      <div className="controls">
        <button onClick={changeToNextColor}>Next Color</button>
        <button 
          className={`purple-btn ${showPurple ? "active" : ""}`}
          onClick={togglePurple}
        >
          {showPurple ? "Hide Purple" : "Show Purple"}
        </button>
        <button 
          className={`auto-btn ${isAutoCycling ? "active" : ""}`}
          onClick={toggleAutoCycle}
        >
          {isAutoCycling ? "Stop Auto Cycle" : "Start Auto Cycle"}
        </button>
      </div>
    </div>
  );
};

export default Home;