import React, {useState,useContext,useEffect} from 'react'
import {ContactContext} from "../../Contexts/ContactContext"


const ContactForm = () => {
    
    const {addContact,current,clearCurrent,updateContact} = useContext(ContactContext)
    
    useEffect(()=>{
        if(current !== null) {
            setcontact(current)
        } else {
            setcontact({
                name:"",
                email:"",
                phone:"",
                type:"personal"
            })
        }
    },[current])


    const [contact, setcontact] = useState({
        name:"",
        email:"",
        phone:"",
        type:"personal"
    })

    const {name,email,phone,type} = contact
    //e.target.name will be name or email or phone or type depending on which box is targeted or typed
    //e.target.value is the value which is being typed in those box
    const onChange = (e)=>{
        setcontact({...contact, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(current === null){
            addContact(contact)
            setcontact({
                name:"",
                email:"",
                phone:"",
                type:"personal"
            })
        } else {
            updateContact(contact)
        }
        clearAll()
        
        
    }

    const clearAll = () =>{
        clearCurrent()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-promary">{current ? "Edit Contact" : "Add Contact"}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="text" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === "personal"} onChange={onChange}/> Personal{" "}
            <input type="radio" name="type" value="professional" checked={type === "professional"} onChange={onChange}/> professional
            <div>
                <input type="submit" value={current ? "Edit Contact" : "Add Contact"} className="btn btn-primary btn-block" />
            </div>
            {current &&
            <div>
                <button className='btn btn-light btn-block' onClick={clearAll}>
                    Clear
                </button>
            </div>
            }
        </form>
    )
}

export default ContactForm
