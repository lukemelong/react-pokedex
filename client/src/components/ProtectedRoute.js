import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Auth from  '../services/Auth'

const ProtectedRoute = ({component: Component, ...rest}) =>{
    console.log(rest)
    return (
        <Route {...rest} render={props => {
            if (Auth.isAuthenticated()) {
              return <Component {...props} {...rest} />;
            } 
            else {
              return (
                <Redirect
                  to={{
                    pathname: "/signin",
                    state: {
                      from: props.location
                    }
                  }}
                />
              );
            }
          }}
        />
      );
}

export default ProtectedRoute