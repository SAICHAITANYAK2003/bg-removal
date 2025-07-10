import { useAuth } from "@clerk/clerk-react";
import { AppContext } from "./AppContext";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContextProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { getToken } = useAuth();

  const loadCredits = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setCredits(data.credits);
        console.log(data.credits);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    credits,
    setCredits,
    loadCredits,
    backendUrl,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
