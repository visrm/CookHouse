import axios from "axios";
import { Link } from "react-router-dom";
import { COMMUNITIES_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";

const CommunityCard = ({ community }) => {
  const handleJoinUnjoin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.get(
        `${COMMUNITIES_API_END_POINT}/join/${community?._id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload()
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex flex-wrap justify-between items-center p-2 sm:p-3 mx-auto md:p-6 lg:p-8 w-full max-w-[85%] rounded-sm md:rounded-md bg-[#fdfdfd] border border-slate-200">
        <Link
          to={`/community/${community?._id}`}
          className="flex flex-nowrap gap-2 sm:gap-3 w-full max-w-[85%] h-full min-h-fit"
        >
          {/* Community profileImg */}
          <div className="avatar h-20 inline-flex">
            <div className="w-20 rounded-full border border-slate-900">
              <img
                src={community?.profileImg || "/assets/avatar-placeholder.png"}
              />
            </div>
          </div>

          {/* Community Name & Description */}
          <div className="block h-full w-full max-w-[75%]">
            <p className="text-slate-900 font-bold text-lg truncate">
              {community?.name}
            </p>
            <p className="text-slate-700 text-sm truncate">
              {community?.description}
            </p>

            {/* For Development stages only. To know who created it. */}
            <p className="text-sm md:text-xs text-slate-500">
              creator: @{community?.owner?.username}
            </p>
          </div>
        </Link>
        <div className="btn flex w-fit ml-auto" onClick={handleJoinUnjoin}>
          JOIN
        </div>
      </div>
    </>
  );
};

export default CommunityCard;
