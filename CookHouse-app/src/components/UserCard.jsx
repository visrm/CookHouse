import { Link } from "react-router-dom";

const UserCard = ({ user }) => {

  return (
    <>
      <div className="flex py-2 px-4 w-full min-h-fit">
        <Link
          to={`/profile/${user?.username}`}
          className="flex gap-2 item-start"
        >
          <div className="avatar h-10 hidden md:inline-flex">
            <div className="w-10 rounded-full border border-slate-900">
              <img
                src={
                  user?.profile?.profileImg || "/assets/avatar-placeholder.png"
                }
              />
            </div>
          </div>
          <div className="flex justify-between flex-1">
            <div className="hidden md:block">
              <p className="text-slate-900 font-bold text-sm w-20 truncate">
                {user?.fullname}
              </p>
              <p className="text-slate-700 text-xs">@{user?.username}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default UserCard;
