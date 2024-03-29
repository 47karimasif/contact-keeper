import React,{useContext,useRef,useEffect} from 'react'
import {ContactContext} from "../../Contexts/ContactContext"

const ContactFilter = () => {
    const {filterContact,clearFilter,filtered} = useContext(ContactContext)
    
    const text = useRef("")

    useEffect (() => {
        if(filtered === null) {
            text.current.value = ""
        }
    })
 
    const onChange = e => {
        e.preventDefault();
        if(text.current.value !== "") {
            filterContact(e.target.value)
        } else {
            clearFilter()
        }
    }


    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts.." onChange={onChange} />
        </form>
        
    )
}

export default ContactFilter
