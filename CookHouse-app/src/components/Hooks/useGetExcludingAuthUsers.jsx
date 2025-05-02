import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { USERS_API_END_POINT } from "../../utils/constants.js";
import { setExcludingAuthUser, setLoading } from "../../redux/slices/user.slice.js";


const useGetExcludingAuthUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        (async function FetchAllExcludingAuthUser() {
          try {
            dispatch(setLoading(true));
            const response = await axios.get(`${USERS_API_END_POINT}/explore`, {
              withCredentials: true,
            });
            if (response.data.success) {
              dispatch(setExcludingAuthUser(response.data.users));
            }
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            dispatch(setLoading(false));
          }
        })();
      }, []);
}

export default useGetExcludingAuthUsers
