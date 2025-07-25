import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbCirclePlus, TbEye, TbSettings } from "react-icons/tb";

const NavigationBar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <header className="sticky top-0 left-0 block w-full max-w-full min-h-full md:min-h-14 bg-amber-500 z-[1000]">
        <nav className="p-2 md:p-4 border shadow-md border-black/25 flex flex-row flex-nowrap justify-between text-sm font-sans bg-white/25 transition-all duration-300">
          {/* AppName with Logo(optional) (to be aligned to the left) */}
          <div className="inline-flex self-start">
            <Link to="/">
              <span className="font-semibold md:font-bold text-lg md:text-xl font-sans hover:scale-105">
                CookHouse
              </span>
            </Link>
          </div>

          {/* Nav Links (to be aligned to the right) */}
          <div className="inline-flex items-center justify-end gap-0.5 w-full max-w-full">
            {user && user?.role == "user" && (
              <div className="dropdown dropdown-end dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm text-xs sm:text-sm bg-transparent border-0 md:font-semibold"
                >
                  Community
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-amber-200 rounded-box z-1 mt-4 md:mt-6 w-56 px-2 shadow-sm"
                >
                  <li>
                    <Link to="/create-community">
                      <TbCirclePlus className="h-5 w-5" />
                      Create Community
                    </Link>
                  </li>

                  {user?.profile.communities.length > 0 && (
                    <li>
                      <Link to="/manage-community">
                        <TbSettings className="h-5 w-5" />
                        Manage Community
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link to="/explore-community">
                      <TbEye className="h-5 w-5" />
                      Explore Communities
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {user && user?.role == "user" && (
              <div>
                <Link to="/contact">
                  <div className="btn btn-sm text-xs sm:text-sm bg-transparent border-0 md:font-semibold">
                    Contact
                  </div>
                </Link>
              </div>
            )}

            {!user && (
              <ul className="ml-2 md:ml-4 list-none inline-flex flex-nowrap gap-2 md:gap-4 md:font-semibold">
                <li className="btn btn-xs sm:btn-sm border border-black/50 rounded-md bg-slate-200 hover:scale-105">
                  <Link to="/login">Login</Link>
                </li>
                <li className="btn btn-xs sm:btn-sm border border-black/50 rounded-md bg-slate-600 text-slate-100 hover:scale-105">
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavigationBar;
