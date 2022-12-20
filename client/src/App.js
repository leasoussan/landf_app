
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, createContext } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import LoginRegistrationForm from './components/LoginRegistrationForm.js';
import Home from './components/Home.js';
import Dashboard from './components/Dashboard.js';
import Users from './components/Users.js';
import Nav from './components/Nav.js';
import { Auth } from './auth/Auth';

import {Provider} from 'react-redux'

import {reducer} from './redux/reducer.js'
export const AppContext = createContext(null)




function App() {
  const [token, setToken] = useState('')
  return (
    <div className="App">
      <BrowserRouter>
    <AppContext.Provider value={{token, setToken}}>
      <div className="App">
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginRegistrationForm title='Login'/>}/>
          <Route path='/register' element={<LoginRegistrationForm title='Register'/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/dash' element={<Auth ><Dashboard/></Auth>}/>
        </Routes>
      </div>
    </AppContext.Provider>
    </BrowserRouter>



    </div>
  );
}

export default App;
