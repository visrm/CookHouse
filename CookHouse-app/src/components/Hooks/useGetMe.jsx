import axios from "axios";
import { useEffect } from "react";
import { AUTH_API_END_POINT } from "../../utils/constants.js";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../redux/slices/auth.slice.js";

const useGetMe = (refreshVar) => {

  const dispatch = useDispatch();
  useEffect(() => {
    async function FetchUserInfo() {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${AUTH_API_END_POINT}/me`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setUser(response.data.user));
        }
      } catch (error) {
        console.error(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    }
    FetchUserInfo();
  }, [refreshVar]);
};

export default useGetMe;
