import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import Conversations from "../Conversations.jsx";
import MessageContainer from "../MessageContainer.jsx";
import useGetExcludingAuthUsers from "../Hooks/useGetExcludingAuthUsers.jsx";

const ChatsHome = () => {
  useGetExcludingAuthUsers();
  const { loading, excludingAuthUser } = useSelector((store) => store.users);
  const { LoadingMessages } = useSelector((store) => store.users);

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
