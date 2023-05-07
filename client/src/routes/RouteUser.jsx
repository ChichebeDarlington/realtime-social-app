import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContextHook } from "../components/context/ContextAPI";

const RouteUser = ({ children }) => {
  const { user } = useContextHook();
  const [okay, setOkay] = useState(false);
  const navigate = useNavigate();

  console.log(user);

  const userAuth = async () => {
    try {
      const { data } = await axios(`/current-user`);
      console.log(data);

      if (data.okay) {
        setOkay(data.okay);
      }
    } catch (error) {
      navigate("/login");
    }
  };
  console.log(okay);

  useEffect(() => {
    if (user?.token) userAuth();
  }, [user?.token]);

  if (user === null) {
    setTimeout(() => {
      userAuth();
    }, 1000);
  }

  return okay ? <> {children} </> : <span>Hello</span>;
};

export default RouteUser;
