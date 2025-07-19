import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { AppContext } from "./AppContext";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContextProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);
  const [image, setImage] = useState("");
  const [resultImage, setResultImage] = useState(false);
  const [loadingCredits, setLoadingCredits] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const fetchCredits = async () => {
    try {
      setLoadingCredits(true);
      const token = await getToken();

      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });

      if (data.success) {
        setCredits(data.credits);
      }
    } catch (error) {
      console.log("📢 API error:", error);
      toast.error(error.message);
    } finally {
      setLoadingCredits(false);
    }
  };

  const removeBg = async (imageFile) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }

      const token = await getToken();

      setImage(imageFile);
      setResultImage(false);
      navigate("/result");

      const formdata = new FormData();
      formdata.append("image", imageFile);

      const { data } = await axios.post(
        backendUrl + "/api/image/remove-bg",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token,
          },
        }
      );

      if (data.success) {
        setResultImage(data.imageUrl);
        data.creditBalance && setCredits(data.creditBalance);
      } else {
        toast.error(data.message);
        data.creditBalance && setCredits(data.creditBalance);
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }

      console.log(image);
    } catch (error) {
      console.log("📢 API error:", error);
      toast.error(error.message);
    }
  };

  const value = {
    credits,
    setCredits,
    fetchCredits,
    backendUrl,
    image,
    setImage,
    removeBg,
    resultImage,
    setResultImage,
    loadingCredits,
    setLoadingCredits,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
