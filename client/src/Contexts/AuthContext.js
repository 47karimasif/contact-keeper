import React,{createContext,useReducer} from 'react'
import axios from "axios"
import {AuthReducer} from "../reducer/AuthReducer"
import setAuthToken from "../../src/utils/setAuthToken"

export const AuthContext = createContext()



const AuthContextProvider = (props) => {

    const initialState = {
        token:localStorage.getItem("token"),
        isAuthenticiated:null,
        loading:true,
        user:null,
        error:null,
    }

    const [state,dispatch] = useReducer(AuthReducer,initialState)


    // load user
    const LoadUser = async()=>{
         //load token into global headers
         if(localStorage.token)  //check if there is a token in localstorage or not
         {
             setAuthToken(localStorage.token)
         }
         try{
             const res = await axios.get("/api/auth ")
             dispatch ({
                 type:"USER_LOADED",
                 payload:res.data
             })
         } catch(err) {   
             dispatch({type:"AUTH_ERROR"})
         }
    }

    //register user
    const Register= async (formData) => {
        const config ={
            headers: {
                "Content-Type":"application/json"
            }
        }
        try{
            const res =await axios.post("/api/users",formData,config)
            dispatch({
                type:"REGISTER_SUCCESS",
                payload:res.data
            })
            LoadUser()
        } catch(err){  
            dispatch({
                type:"REGISTER_FAIL",
                payload:err.response.data.msg
            })
        }
    }

    //login user
    const Login= async (formData) => {
        const config ={
            headers: {
                "Content-Type":"application/json"
            }
        }
        try{
            const res =await axios.post("/api/auth",formData,config)
            dispatch({
                type:"LOGIN_SUCCESS",
                payload:res.data
            })
            LoadUser()
        } catch(err){  
            dispatch({
                type:"LOGIN_FAIL",
                payload:err.response.data.msg
            })
        }
    }

    //logout
    const Logout = ()=>{
        dispatch({type:"LOGOUT"})
    }

    //clear errors
    const ClearErrors = ()=>{
        dispatch({type:"CLEAR_ERRORS"})
    }
    return (
        <AuthContext.Provider value ={{...state,Register,ClearErrors,LoadUser,Login,Logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
