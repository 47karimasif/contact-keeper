import React,{useState,useContext,useEffect} from 'react'
import {AuthContext} from "../../Contexts/AuthContext"
import {AlertContext} from "../../Contexts/AlertContext"

const Login = (props) => {

    const {setAlert} = useContext(AlertContext)
    const {Login,error,ClearErrors,isAuthenticiated,token} = useContext(AuthContext)

    useEffect(()=>{

        if(isAuthenticiated)
        {
            return props.history.push("/")
        }
        if(token) {
            props.history.push("/") 
        }

        if(error=== "Invalid Credentials") {
            setAlert(error,"danger")
            ClearErrors()  //this is done to remove the invalid Credentials error from state
        }
        // eslint-disable-next-line
    },[ error,isAuthenticiated,props.history])


    const [user,setUser] = useState ({
        email:"",
        password:"",
 
    })

    const {email,password} = user

    const onChange = (e)=>{
        setUser({
            ...user,
            [e.target.name] :e.target.value
        })
    }
    const onSubmit =(e) =>{
        e.preventDefault()
        if(email==="" || password==="") {
            setAlert("Please fill in all fields","danger")
        }
        else {
            Login({
                email,
                password
            })
        }

    }

    return (
        <div className="form-container">
            <h1>
                Account <span className = "text-primary">Login</span>
            </h1>
            <form onSubmit= { onSubmit} >
                <div className="form-group">
                    <label htmlFor="email">Email</label>    
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>    
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Login