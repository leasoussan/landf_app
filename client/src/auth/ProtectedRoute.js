import { useAuth } from "./AuthProvider.js";
import {  Route } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
// import RefuseAccessPage from "./RefuseAccessPage.js";

export const ProtectedRoute = ({...rest }) => {
    console.log("in ___ProtectedeROuter AUTH", ...rest);
    let { user } = useAuth();
  
    if (!user || !user.token || user.token === "") {
        console.log("IN protected routed checking user ");

       
    //   return (
    //     // component which inform the user that they must be logged in
    //     <>
    //     <Navigate to="/login" replace= {true} />.
     
        
    //     </>
    //   );
    // }
  
    // let user through if they're logged in
    // return  <Route {...rest} />;
  }
}


// return user ? <Outlet /> : <Navigate to="/login" />;