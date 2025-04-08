import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <header className="sticky top-0 left-0 block w-full min-h-full md:min-h-14 bg-amber-500 z-50">
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
            <ul className="mx-1 list-none inline-flex flex-nowrap gap-2 md:gap-4 md:font-semibold">
              <li className="md:py-1">Community</li>
              <li className="md:py-1">Contact</li>
            </ul>
            <ul className="ml-2 md:ml-4 list-none inline-flex flex-nowrap gap-2 md:gap-4 md:font-semibold">
              <li className="border border-black/50 rounded-md md:px-2.5 md:py-1 px-2 bg-slate-600 text-slate-100 hover:scale-105">
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavigationBar;
