import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

import reducer from "../reducer/reducer";
import {
  HANDLE_CHANGE,
  HANDLE_REGISTRATION,
  HANDLE_LOGIN,
  RELOAD,
} from "../action/action";
// React toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Axios
import axios from "axios";

const getUser = () => {
  return localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
};

const initialState = {
  user: getUser(),
  token: "",
  name: "",
  email: "",
  password: "",
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.user);

  const navigate = useNavigate();

  // axios interceptors
  const token = state?.user?.token ? state.user.token : "";
  axios.defaults.baseURL = import.meta.env.VITE_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, password, email } = state;
    dispatch({ type: HANDLE_REGISTRATION, payload: { name, password, email } });
    try {
      const { data } = await axios.post(`/register`, { name, password, email });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast("Registration successful");
      navigate("/dashbord");
    } catch (error) {
      toast(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { password, email } = state;
    dispatch({ type: HANDLE_LOGIN, payload: { password, email } });
    try {
      const { data } = await axios.post(`/login`, { password, email });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast(error.response.data.err);
      console.log(error.response.data.err);
    }
  };

  function handleLogout() {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("userInfo");
    navigate("/login");
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);
    if (userInfo) {
      dispatch({ type: RELOAD, payload: userInfo });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleRegister,
        handleChange,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useContextHook = () => {
  return useContext(UserContext);
};

export { UserProvider };
