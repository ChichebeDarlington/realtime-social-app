import React, { createContext, useReducer, useContext } from "react";

const UserContext = createContext();
import reducer from "../reducer/reducer"
import { HANDLE_CHANGE, HANDLE_SUBMIT, HANDLE_LOGIN} from "../action/action"
// React toastify
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Axios
import axios from "axios"

const initialState = {
  user:{},
    name:"",
    email:"",
    password:"",
    forgottenPassword:"",
    redirect:false,
}

const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    
    const handleChange = async(e)=>{
       const {name, value} = e.target
       console.log(name);
       console.log(value);
        dispatch({type:HANDLE_CHANGE, payload:{name, value}})
    }

    const handleRegister = async(e)=>{
      e.preventDefault()
      const {name,password, email} = state;
      dispatch({type:HANDLE_SUBMIT, payload:{name,password, email}})
        try {
         const {data} = await axios.post(`${import.meta.env.VITE_URL}/register`,{name, password, email})
        console.log(data);
       } catch (error) {
        toast(error.response.data.msg)
        console.log(error.response.data.msg);
       }
    }

    const handleLogin = async(e)=>{
      e.preventDefault()
      const {password, email} = state;
      dispatch({type:HANDLE_LOGIN, payload:{password, email}})
        try {
         const {data} = await axios.post(`${import.meta.env.VITE_URL}/login`,{password, email})
        console.log(data);
        history("/")
       } catch (error) {
        toast(error.response.data.err)
        console.log(error.response.data.err);
       }
       
    }


    return (
      <UserContext.Provider value={
        {...state,
          handleRegister, 
            handleChange,
            handleLogin
        }
        }>
        {children}
      </UserContext.Provider>
    );
  };

export const useContextHook = ()=>{
    return useContext(UserContext)
}

  export { UserProvider };