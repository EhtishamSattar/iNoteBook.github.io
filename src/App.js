import './App.css';
import {Routes,
  Route,
} from "react-router-dom";
import React,{useState} from 'react';
import Home from './Components/Home';
import About from './Components/About';
import Navbar from './Components/Navbar';
import NoteState from './Context/NotesState';
import Alert from './Components/Alert';
import SignUp from './Components/SignUp';
import Login from './Components/Login';



function App() {
  const [alert, setalert] = useState(null);

  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      typ:type
    })

    setTimeout(() => {
      setalert(null)
    }, 2000);
  }

  return (
    
    <>
      {/* wraping in the notestate context to use that  */}
      <NoteState>
        <div id="header">
        <Navbar/>
        <Alert alert={alert}/>
        </div>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
            <Route exact path="about" element={<About/>}/>
            <Route exact path="login" element={<Login showAlert={showAlert}/>}/>
            <Route exact path="signUp" element={<SignUp showAlert={showAlert}/>}/>
          </Routes>
        </div>
      </NoteState>

   </>
  );
}

export default App;
