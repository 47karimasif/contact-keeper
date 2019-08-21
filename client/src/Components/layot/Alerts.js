import React,{useContext} from 'react'
import {AlertContext} from "../../Contexts/AlertContext"

const Alerts = () => {
    const {alerts} = useContext(AlertContext)
    return (
        //shorthand syntax of arrow function
        alerts.length > 0 && alerts.map(alert =>
            (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"/>{alert.msg}
            </div>
            )
        )
    )
}

export default Alerts
