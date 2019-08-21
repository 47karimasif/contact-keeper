import React,{useContext} from 'react'
import {Route,Redirect} from "react-router-dom"
import {AuthContext} from"../../Contexts/AuthContext"

const PrivateRoute = ({component:Component, ...rest}) => {
    
    const {isAuthenticiated,loading} = useContext(AuthContext)
    
    return (

            <Route {...rest} render={ props => !isAuthenticiated && !loading ?  (
                <Redirect to="/login" />
            ) : (
                <Component {...props} />
            )}
            />

    )
}

export default PrivateRoute

// if you try to open a private routing without logging in than it will redirect to login page
// if logged in than it will show the component at that route