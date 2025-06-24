import { Link } from "react-router-dom";

const CommunityCard = ({ community }) => {
  return (
    <>
      <div className="flex flex-wrap justify-between items-center p-2 sm:p-3 mx-auto md:p-6 lg:p-8 w-full max-w-[85%] glass-morph bg-[#fdfdfd] overflow-hidden">
        <Link
          to={`/community/${community?._id}`}
          className="flex flex-nowrap gap-2 sm:gap-3 w-full max-w-full h-full min-h-fit supports-[backdrop]:backdrop-blur"
        >
          {/* Community profileImg */}
          <div className="avatar h-16 sm:h-24 inline-flex">
            <div className="w-16 sm:w-24 rounded-full border border-slate-900">
              <img
                src={community?.profileImg || "/assets/avatar-placeholder.png"}
              />
            </div>
          </div>

          {/* Community Name & Description */}
          <div className="block h-full w-full max-w-[90%] sm:max-w-[75%]">
            <p className="text-slate-900 font-bold text-base sm:text-lg truncate">
              {community?.name}
            </p>
            <p className="text-slate-700 text-xs sm:text-sm truncate">
              {community?.description}
            </p>

            {/* For Development stages. To know who created it. */}
            <p className="text-xs text-slate-600">
              <span className="font-medium">Created By:</span> @
              {community?.owner?.username}
            </p>
            <p className="text-xs text-slate-600">
              <span className="font-medium">Members:</span>{" "}
              {community?.members.length + 1}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CommunityCard;
