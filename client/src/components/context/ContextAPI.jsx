import React, { createContext, useReducer, useContext, useEffect, useCallback,} from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

import reducer from "../reducer/reducer"
import { HANDLE_CHANGE, HANDLE_SUBMIT, HANDLE_LOGIN, RELOAD} from "../action/action"
// React toastify
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Axios
import axios from "axios"

const initialState = {
  user: {},
    name:"",
    email:"",
    password:"",
    forgottenPassword:"",
}


const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const navigate = useNavigate()

    const setLocalStorage = (set)=>{
      return localStorage.setItem("userInfo", JSON.stringify(set))
    }
    const getLocalStorage = ()=>{
      let userInfo = localStorage.getItem("userInfo")
      console.log(userInfo);
      if(userInfo){
        return JSON.parse(userInfo)
      }
      return {}
    }
 
    const handleChange = async(e)=>{
       const {name, value} = e.target
        dispatch({type:HANDLE_CHANGE, payload:{name, value}})
    }

    const handleRegister = async(e)=>{
      e.preventDefault()
      const {name,password, email} = state;
      dispatch({type:HANDLE_SUBMIT, payload:{name,password, email}})
        try {
         const {data} = await axios.post(`${import.meta.env.VITE_URL}/register`,{name, password, email})
        console.log(data);
        setLocalStorage(data)
        toast("Registration successful")
        navigate("/")
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
         setLocalStorage(data)
        console.log(data);
        toast("Login successful")
        navigate("/")
       } catch (error) {
        toast(error.response.data.err)
        console.log(error.response.data.err);
       }
       
    }

    function handleLogout(){
      dispatch({type:"LOG_OUT"})
      localStorage.removeItem("userInfo")
      navigate("/login")
    }

    useEffect(()=>{
      dispatch({type:RELOAD, payload: getLocalStorage()})
    },[])

    return (
      <UserContext.Provider value={
        {...state,
          handleRegister, 
            handleChange,
            handleLogin,
            handleLogout
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