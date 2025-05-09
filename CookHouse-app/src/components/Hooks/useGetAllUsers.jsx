import axios from "axios";
import { useEffect } from "react";

// redux features import
import { useDispatch } from "react-redux";
import { USERS_API_END_POINT } from "../../utils/constants.js";
import { setAllUsers, setLoading } from "../../redux/slices/user.slice.js";
import toast from "react-hot-toast";

const useGetAllUsers = (keyword, refreshVar) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllUsers() {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          `${USERS_API_END_POINT}/all?keyword=${keyword}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setAllUsers(response.data.users));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [keyword, refreshVar]);
};

export default useGetAllUsers;
