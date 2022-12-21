
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, createContext } from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginRegistrationForm from './components/LoginRegistrationForm.js';
import Home from './components/Home.js';
import Dashboard from './components/Dashboard.js';
import Users from './components/Users.js';
import Nav from './components/Nav.js';
import { Auth } from './auth/Auth';
import { Provider } from 'react-redux';
export const AppContext = createContext(null)

function App() {

  const [token, setToken] = useState('')


  return (
    <div className="App">
   
    <AppContext.Provider value={{token, setToken}}>
  
      <div className="App">
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginRegistrationForm title='Login'/>}/>
          <Route path='/register' element={<LoginRegistrationForm title='Register'/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/dashboard/:user_id' element={<Auth ><Dashboard  /></Auth>}/>
        </Routes>
      </div>
 
    </AppContext.Provider>



    </div>
  );
}

export default App;


