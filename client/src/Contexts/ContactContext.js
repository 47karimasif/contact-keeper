import React,{createContext,useReducer} from 'react'
import {ContactReducer} from "../reducer/ContactReducer.js"
import axios from "axios"

export const ContactContext = createContext()

const ContactContextProvider = (props) => {

    const initialState = {
        contacts:null,
        current: null,
        filtered:null
    }

    const [state,dispatch] = useReducer(ContactReducer,initialState)

    //Get Contact

    const getContact = async (contact) => {
        try{
           const res = await axios.get("api/contacts")

           dispatch({ type:"GET_CONTACT", payload:res.data })
        } catch(err) {
            dispatch({type:"CONTACT_ERROR",payload:err.response.msg})
        }
        
    }




    //Add Contact
    const addContact = async (contact) => {
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }
        try{
           const res = await axios.post("api/contacts",contact,config)

           dispatch({ type:"ADD_CONTACT", payload:res.data })
        } catch(err) {
            dispatch({type:"CONTACT_ERROR",payload:err.response.msg})
        }
        
    }
    //Update Contact
    const updateContact = async (contact) => {
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }
        try{
           const res = await axios.put(`api/contacts/${contact._id}`,contact,config)

           dispatch({ type:"UPDATE_CONTACT", payload:res.data })
        } catch(err) {
            dispatch({type:"CONTACT_ERROR",payload:err.response.msg})
        }
        
    }

    //Clear Contact
    const clearContacts = ()=>{
        dispatch({type:"CLEAR_CONTACTS"})
    }

    //Delete Contact

    const deleteContact = async (id) => {
        try{
            await axios.delete(`/api/contacts/${id}`)
            dispatch({ type:"DELETE_CONTACT",payload:id})
         } catch(err) {
             dispatch({type:"CONTACT_ERROR",payload:err.response.msg})
         }
     
    }

    //set Current Contact
    const setCurrent = (contact) => {
        dispatch({ type:"SET_CURRENT", payload:contact })
    }
    //Clear current contact
    const clearCurrent = () => {
        dispatch({ type:"CLEAR_CURRENT",})
    }
    
    //filter contact
    const filterContact = (text) => {
        dispatch({ type:"FILTER_CONTACT", payload:text })
    }
    //clear filter
    const clearFilter = () => {
        dispatch({ type:"CLEAR_FILTER",})
    }

    return (
        <ContactContext.Provider  value = {{...state,addContact,deleteContact,setCurrent,clearCurrent,updateContact,filterContact,clearFilter,getContact,clearContacts}}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactContextProvider