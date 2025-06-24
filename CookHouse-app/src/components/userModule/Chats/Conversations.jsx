import { useSelector } from "react-redux";
import Conversation from "../../Conversation";
import LoadingSpinner from "../../LoadingSpinner";

const Conversations = () => {
  const { loading, excludingAuthUser } = useSelector((store) => store.users);

  return (
    <>
      <div className="mb-1 sm:mb-2 flex flex-col items-start overflow-scroll-y bg-indigo-50 w-full max-w-full">
        {loading && (
          <div className="block text-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {!loading && excludingAuthUser.length === 0 && (
          <div className="block text-center text-sm p-2 sm:p-4">
            No Conversations found.
          </div>
        )}
        {!loading &&
          excludingAuthUser.length !== 0 &&
          excludingAuthUser.map((user, idx) => {
            return (
              <Conversation
                user={user}
                key={user?._id}
                lastIdx={idx === excludingAuthUser.length - 1}
              />
            );
          })}
      </div>
    </>
  );
};

export default Conversations;
