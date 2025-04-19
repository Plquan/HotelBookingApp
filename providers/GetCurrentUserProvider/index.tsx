import { AppDispatch } from "@/stores";
import { authAction } from "@/stores/authStore/authReducer";
import { getAccessToken } from "@/utils/functions/accessToken";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetCurrentUserProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) return;
        dispatch(authAction.getCurrentUser());
      
    };
    checkToken();
  }, [dispatch]);

  return children;
};

export default GetCurrentUserProvider;