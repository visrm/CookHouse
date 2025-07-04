import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../LoadingSpinner.jsx";
import Conversations from "./Conversations.jsx";
import MessageContainer from "./MessageContainer.jsx";
import useGetExcludingAuthUsers from "../../Hooks/useGetExcludingAuthUsers.jsx";
import { setSelectedConversation } from "../../../redux/slices/chat.slice.js";
import { useState } from "react";
import toast from "react-hot-toast";

const ChatsHome = () => {
  const [search, setSearch] = useState("");

  useGetExcludingAuthUsers();
  const { loading, excludingAuthUser } = useSelector((store) => store.users);
  const { LoadingMessages } = useSelector((store) => store.users);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = excludingAuthUser.filter(
      (c) =>
        c.fullname.toLowerCase().includes(search.toLowerCase()) ||
        c.username.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation.length === 1) {
      dispatch(setSelectedConversation(...conversation));
      // console.log(...conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <>
      <main className="h-full w-full max-w-full min-h-[90svh] md:min-h-screen overflow-hidden transition-all duration-300">
        <section className="grid grid-cols-12 h-screen w-full max-w-full">
          {loading && (
            <div className="grid col-span-4 md:col-span-3 lg:col-span-2 bg-[#fafafa]">
              <LoadingSpinner size="lg" />
            </div>
          )}
          {!loading && excludingAuthUser && (
            <div className="grid col-span-4 md:col-span-3 lg:col-span-2 bg-[#fafafa]">
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-wrap items-center gap-2 w-full max-w-full py-1.5 px-1"
                  id="seach-conversations-form"
                >
                  <input
                    name="conversation"
                    id="conversation"
                    type="text"
                    placeholder="Search…"
                    className="input input-xs sm:input-sm focus:outline-0 rounded-full text-sm bg-[#fdfdfd] text-slate-600 w-24 sm:w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
                <Conversations />
              </div>
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
