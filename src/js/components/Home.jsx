// import React, { useState } from "react";
// import '../../styles/index.css'
// //include images into your bundle

// //create your first component
// const Home = () => {
// 	const [ color, setColor ] = useState("red");
//   const [isAutoChange, setIsAutoChange] = useState(false);
  
//   const handleAutoChange = () => {
//     setIsAutoChange(!isAutoChange);
//   };

//   useEffect(() => {
//     let intervalId;
    
//     if (isAutoChange) {
//       intervalId = setInterval(() => {
//         setColor(prevColor => {
//           if (prevColor === "red") return "green";
//           if (prevColor === "green") return "yellow";
//           if (prevColor === "yellow") return "red";
//           return prevColor;
//         });
//       }, 3000); 
//     }

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//       };
//     }, [isAutoChange]);

// 	  return (
//         <div className="traffic-light">
//           <div className="stick"></div>
//           <div className={`light red ${color === "red" ? "active" :"null"}`}
//           onClick={() =>setColor("red")}></div>
//           <div className={`light yellow ${color === "yellow" ? "active" :"null"}`}
//           onClick={() =>setColor("yellow")}></div>
//           <div className={`light green ${color === "green" ? "active" :"null"}`}
//           onClick={() =>setColor("green")}></div>
//           <button className={`button btn ${isAutoChange ? "btn-primary" : "btn-secondary"}`} onClick={handleAutoChange}>Cambio Automático</button>
//         </div>
//       );
//     };

// export default Home;



// import React, { useState, useEffect } from "react";
// import '../../styles/index.css'; // Asumo que los estlos están en este archivo

// const Home = () => {
//   const [color, setColor] = useState("red");
//   const [isAutoChange, setIsAutoChange] = useState(false);
//   const [buttonText, setButtonText] = useState("Cambio Automático");

//   // Función para cambiar al siguiente color
//   const changeToNextColor = () => {
//     setColor(prevColor => {
//       if (prevColor === "red") return "green";
//       if (prevColor === "green") return "yellow";
//       return "red";
//     });
//   };

//   // Función para manejar el cambio automático
//   const handleAutoChange = () => {
//     if (!isAutoChange) {
//       // Si se está activando, comenzar inmediatamente el cambio
//       changeToNextColor();
//     }
//     setIsAutoChange(!isAutoChange);
//   };

//   // Efecto para el cambio automático
//   useEffect(() => {
//     let intervalId;
    
//     if (isAutoChange) {
//       intervalId = setInterval(() => {
//         changeToNextColor();
//       }, 2000); // Cambia cada 2 segundos (ajustable)
//     }

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [isAutoChange]);

//   return (
//     <div className="traffic-container">
//       <div className="traffic-light">
//         <div className="stick"></div>
//         <div 
//           className={`light red ${color === "red" ? "active" :"null"}`} onClick={() =>setColor("red")}></div>
//         <div 
//          className={`light yellow ${color === "yellow" ? "active" :"null"}`} onClick={() =>setColor("yellow")}></div>
//         <div 
//           className={`light green ${color === "green" ? "active" :"null"}`} onClick={() =>setColor("green")}></div>
//       </div>
//       <div 
//           className={`light purple ${color === "purple" ? "active" :"null"}`} onClick={() =>setColor("purple")}></div>
//       <button 
//         className={`traffic-button ${isAutoChange ? "active-button" : ""}`} 
//         onClick={handleAutoChange}>
//         {isAutoChange ? "DETENER" : "AUTO"}
//       </button>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import '../../styles/index.css'; // Asumo que los estlos están en este archivo

const Home = () => {
  const [color, setColor] = useState("red");
  const [isAutoChange, setIsAutoChange] = useState(false);
  const [showPurple, setShowPurple] = useState(false);
  const colors = ["red", "yellow", "green", ...(showPurple ? ["purple"] : [])];

  // Función para cambiar al siguiente color
  const changeToNextColor = () => {
    setColor(prevColor => {
      const currentIndex = colors.indexOf(prevColor);
      const nextIndex = (currentIndex + 1) % colors.length;
      return colors[nextIndex];
    });
  };

  // Función para manejar el cambio automático
  const handleAutoChange = () => {
    if (!isAutoChange) {
      changeToNextColor();
    }
    setIsAutoChange(!isAutoChange);
  };

  // Función para alternar la luz púrpura
  const togglePurpleLight = () => {
    setShowPurple(!showPurple);
    // Si el color actual es púrpura y lo estamos quitando, volver a rojo
    if (color === "purple" && !showPurple) {
      setColor("red");
    }
  };

  // Efecto para el cambio automático
  useEffect(() => {
    let intervalId;
    
    if (isAutoChange) {
      intervalId = setInterval(() => {
        changeToNextColor();
      }, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoChange, colors]); 

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
      <div className="button-container">
        <button 
          className={`traffic-button ${isAutoChange ? "active-button" : ""}`} 
          onClick={handleAutoChange}
        >
          {isAutoChange ? "DETENER" : "AUTO"}
        </button>
        <button 
          className={`add-button ${showPurple ? "remove-button" : ""}`} 
          onClick={togglePurpleLight}
        >
          {showPurple ? "Quitar Púrpura" : "Añadir Púrpura"}
        </button>
      </div>
    </div>
  );
};

export default Home;