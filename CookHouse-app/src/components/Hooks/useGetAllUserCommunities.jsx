import axios from "axios";
import { useEffect } from "react";
import { COMMUNITIES_API_END_POINT } from "../../utils/constants.js";
// redux features import
import { useDispatch } from "react-redux";

import {
  setAllUserCommunities,
  setLoadingCommunity,
} from "../../redux/slices/community.slice.js";
import toast from "react-hot-toast";

const useGetAllUserCommunities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllUserCommunities() {
      try {
        dispatch(setLoadingCommunity(true));
        const response = await axios.get(`${COMMUNITIES_API_END_POINT}/user/communities`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllUserCommunities(response.data.communities));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingCommunity(false));
      }
    })();
  }, []);
};

export default useGetAllUserCommunities;
