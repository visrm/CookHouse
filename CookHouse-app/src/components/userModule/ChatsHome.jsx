import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExcludingAuthUser,
  setLoading,
} from "../../redux/slices/user.slice.js";
import { USERS_API_END_POINT } from "../../utils/constants.js";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import Conversations from "../Conversations.jsx";
import MessageContainer from "../MessageContainer.jsx";

const ChatsHome = () => {
  const dispatch = useDispatch();
  const { loading, excludingAuthUser } = useSelector((store) => store.users);
  const { LoadingMessages, selectedConversation } = useSelector(
    (store) => store.users
  );

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

  return (
    <>
      <main className="h-full w-full max-w-full min-h-[90svh] md:min-h-screen">
        <section className="grid grid-cols-12 h-screen w-full">
          {loading && (
            <div className="grid col-span-4 md:col-span-3 lg:col-span-2">
              <LoadingSpinner size="lg" />
            </div>
          )}
          {!loading && excludingAuthUser && (
            <div className="grid col-span-4 md:col-span-3 lg:col-span-2">
              <Conversations />
            </div>
          )}

          <div className="grid col-span-8 md:col-span-9 lg:col-span-10 border-l border-slate-300">
            {!LoadingMessages && <MessageContainer />}
          </div>
        </section>
      </main>
    </>
  );
};

export default ChatsHome;
