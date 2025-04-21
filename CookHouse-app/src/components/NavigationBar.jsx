import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbCirclePlus, TbEye, TbSettings } from "react-icons/tb";

const NavigationBar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <header className="sticky top-0 left-0 block w-full max-w-full min-h-full md:min-h-14 bg-amber-500 z-[1000]">
        <nav className="p-2 md:p-4 border shadow-md border-black/25 flex flex-row flex-nowrap justify-between text-sm font-sans bg-white/25">
          {/* AppName with Logo(optional) (to be aligned to the left) */}
          <div className="inline-flex self-start">
            <Link to="/">
              <span className="font-semibold md:font-bold text-lg md:text-xl font-sans">
                CookHouse
              </span>
            </Link>
          </div>

          {/* Nav Links (to be aligned to the right) */}
          <div className="inline-flex justify-evenly self-end">
            <div className="dropdown dropdown-end dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm text-sm bg-transparent border-0 md:font-semibold"
              >
                Community
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-amber-200 rounded-box z-1 mt-4 md:mt-6 w-56 px-2 shadow-sm"
              >
                <li>
                  <Link to="/community/create">
                    <TbCirclePlus className="h-5 w-5" />
                    Create Community
                  </Link>
                </li>

                <li>
                  <Link to="/community/manage">
                    <TbSettings className="h-5 w-5" />
                    Manage Community
                  </Link>
                </li>
                <li>
                  <Link to="/community/explore">
                    <TbEye className="h-5 w-5" />
                    Explore Communities
                  </Link>
                </li>
              </ul>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm text-sm bg-transparent border-0 md:font-semibold"
              >
                Contacts
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-amber-200 rounded-box z-1 mt-5 w-48 p-2 shadow-sm"
              >
                <li>
                  <a>Item 1</a>
                </li>
              </ul>
            </div>

            {!user && (
              <ul className="ml-2 md:ml-4 list-none inline-flex flex-nowrap gap-2 md:gap-4 md:font-semibold">
                <li className="border border-black/50 rounded-md md:px-3 md:py-1 px-2 bg-slate-200 hover:scale-105">
                  <Link to="/login">Login</Link>
                </li>
                <li className="border border-black/50 rounded-md md:px-2.5 md:py-1 px-2 bg-slate-600 text-slate-100 hover:scale-105">
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
