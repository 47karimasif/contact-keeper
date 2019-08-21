import React,{Fragment,useContext,useEffect} from 'react'
import {ContactContext} from "../../Contexts/ContactContext"
import Contactitem from "./Contactitem"
import Spinner from "../../Components/layot/Spinner"

const Contacts = () => {
    const {contacts,filtered,getContact,loading} = useContext(ContactContext)

    useEffect(()=> {
        getContact()
        // eslint-disable-next-line
    },[])


    if(contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    }
    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <Fragment>
                {
                filtered !== null
                ? filtered.map( contact => <Contactitem key={contact._id} contact={contact} /> )
                : contacts.map( contact => <Contactitem key={contact._id} contact={contact} /> )
            }
            </Fragment>
            ) :<Spinner />}

        </Fragment>
    )
}

export default Contacts



// if using { } than apply return else for shorthand arrow syntax no need to write return as it's predefined
// {contacts.map( contact => { return <Contactitem key={contact.id} contact={contact} /> } )}
// We need the return value from contactitem. 