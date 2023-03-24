import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { useContextHook } from "../components/context/ContextAPI"

const RouteUser = ({children}) =>{
    const {user} = useContextHook()
    const [okay, setOkay] = useState(false)
     const navigate = useNavigate()

     const userAuth = async()=>{
        try {
            const {data} = await axios(`/current-user`)
            if(data.okay){
                setOkay(data.okay)
            }
            
        } catch (error) {
            navigate("/login")
        }
    }
    console.log(okay);

     useEffect(()=>{
       if(user?.token) userAuth()
     },[user?.token])

if(user.user === null){
    setTimeout(()=>{
        userAuth()
    },1000)
}

     return !okay? <span>Hello</span> : (<>{children}</> )
}

export default RouteUser