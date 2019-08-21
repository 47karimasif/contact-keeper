import React,{createContext,useReducer} from 'react'
import uuid from "uuid"
import {AlertReducer} from "../reducer/AlertReducer"


export const AlertContext = createContext()


const AlertContextProvider = (props) => {

    const initialState = []

    const [state,dispatch] = useReducer(AlertReducer,initialState)

    // setAlert
    const setAlert =(msg,type) =>{
        const id=uuid.v4()
        dispatch({
            type:"SET_ALERT",
            payload:{msg,type,id} 
        })
        setTimeout(()=>{
            dispatch({type:"REMOVE_ALERT",payload:id })
        },5000)
    }

    return (
        <AlertContext.Provider value ={{alerts:state,setAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertContextProvider