
import './App.css';
import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginRegistrationForm from './components/registration/LoginRegistrationForm.js';
import Home from './components/Home.js';
import Dashboard from './components/Dashboard.js';
import Users from './components/Users.js';
import Nav from './components/Nav.js';
import { Auth } from './auth/Auth';
import { Provider } from 'react-redux';
import ItemDetail from './components/items/ItemDetail';
import { createStore } from 'redux';
import { reducer } from './redux/reducer.js'
// import LoginForm from './components/registration/LoginForm.js';

export const AppContext = createContext(null);

const store = createStore(reducer);




function App() {

  const [token, setToken] = useState('')



  return (
    <div className="App">

      <AppContext.Provider value={{token, setToken}}>

        <Provider store={store}>
          {/* <Fragment> */}
          <div className="App">

            <Nav />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LoginRegistrationForm title='Login' />} />
              <Route path='/register' element={<LoginRegistrationForm title='Register' />} />
              <Route path='/users' element={<Users />} />

            
             {/* <Route path='/admin_dashboard/:user_id' element={<Auth ><Admin /></Auth>} /> */}

              <Route path='/dashboard/:user_id' element={<Auth ><Dashboard /></Auth>} />
              <Route path='/item_detail/:id' element={<Auth ><ItemDetail /></Auth>} />
            </Routes>

            <h1 className="text-3xl font-bold underline">
              Hello world!
            </h1>

          </div>
          {/* </Fragment> */}
        </Provider>

      </AppContext.Provider>

    </div>
  );
}

export default App;


