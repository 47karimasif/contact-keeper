import React,{useContext,useEffect} from 'react'
import Contact from "../contacts/Contacts"
import ContactForm from "../contacts/ContactForm"
import ContactFilter from "../contacts/ContactFilter"
import {AuthContext} from "../../Contexts/AuthContext"

const Home = () => {
    const {LoadUser} = useContext(AuthContext)

    // it means when home component will load Loaduser will run and isAuthenticiated will be set true and for loading of other page it will be false
    useEffect(()=>{
        LoadUser()
        // eslint-disable-next-line
    },[])
    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contact />
            </div>
        </div>
    )
}

export default Home
