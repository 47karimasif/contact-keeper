import React,{useEffect,useContext} from 'react'
import {ContactContext} from "../../Contexts/ContactContext"
import {AuthContext} from "../../Contexts/AuthContext"


const About = (props) => {
    const {clearFilter} = useContext(ContactContext)
    const {token} =useContext(AuthContext)
    useEffect(() => {
        if(token) {
            props.history.push("/")   //WHEN LOGGED IN U CAN'T ACESS THE GUEST LINK BCZ ON LOGGING IN TOKEN WILL BE THERE ONEVERY PAGE UNTILL WE LOGOUT
        }
        clearFilter()
    })
    return (
        <div>
            <h1>About this page</h1>
            <p className="my-1">
                This is a full stack React app for keeping contacts
            </p>
            {/* <p className="bg-dark p">
                <strong>Version: </strong>1.0.0
            </p> */}
            <h4 className="my-1">Created by : Asif karim</h4>
        </div>
    )
}

export default About
