import axios from "axios";
import { useEffect } from "react";
import { COMMUNITIES_API_END_POINT } from "../../utils/constants.js";
// redux features import
import { useDispatch } from "react-redux";

import {
  setAllCommunities,
  setLoadingCommunity,
} from "../../redux/slices/community.slice.js";
import toast from "react-hot-toast";

const useGetAllCommunities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function FetchAllCommunities() {
      try {
        dispatch(setLoadingCommunity(true));
        const response = await axios.get(`${COMMUNITIES_API_END_POINT}/all`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setAllCommunities(response.data.communities));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setLoadingCommunity(false));
      }
    })();
  }, []);
};

export default useGetAllCommunities;
