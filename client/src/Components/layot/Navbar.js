 import React,{Fragment,useContext} from 'react'
 import PropTypes from "prop-types"
 import {Link} from "react-router-dom"
 import {AuthContext} from "../../Contexts/AuthContext"
 import {ContactContext} from "../../Contexts/ContactContext"

 const Navbar = ({title,icon}) => {

    const {isAuthenticiated,Logout,user} = useContext(AuthContext)
    const {clearContacts} = useContext(ContactContext)

    const OnLogout = ()=>{
        Logout()
        clearContacts()
    }

    const authLinks =(
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a href="#!" onClick={OnLogout}>
                    <i className="fas fa-sign-out-alt"><span className="hide-sm">Logout</span>
                    </i>
                </a>
            </li>
        </Fragment>
    ) 

    const guestLinks =(
        <Fragment>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )

     return (
         <div className="navbar bg-primary">
            <h1>
                <i className={icon} />  {title} 
            </h1>
            <ul> 
                {isAuthenticiated ? authLinks : guestLinks}
            </ul>
         </div>
     )
 }

 // eslint-disable-next-line react/no-typos
 Navbar.propTypes = {
     title:PropTypes.string.isRequired,
     icon:PropTypes.string,
 }
 Navbar.defaultProps = {
     title:"Contact Keeper",
     icon:"fas fa-id-card-alt"
 }
 
 export default Navbar
 