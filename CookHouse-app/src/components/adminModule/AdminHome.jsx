import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import CommunitiesTable from "./CommunitiesTable";
import UsersTable from "./UsersTable";
import EventsTable from "./EventsTable";

const AdminHome = () => {
  const [feedType, setFeedType] = useState("users");

  return (
    <>
      <main className="h-full w-full max-w-full min-h-[90svh] md:min-h-screen overflow-hidden">
        <section>
          <div className="flex w-full font-semibold bg-[#ffffff] z-50 shadow-md">
            <div
              className="flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("users")}
            >
              Users
              {feedType === "users" && (
                <div className="absolute bottom-0 w-10 h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("events")}
            >
              Events
              {feedType === "events" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
            <div
              className="flex justify-center flex-1 p-3 text-slate-600 transition duration-300 relative cursor-pointer"
              onClick={() => setFeedType("communities")}
            >
              Communities
              {feedType === "communities" && (
                <div className="absolute bottom-0 w-10  h-1 rounded-full bg-indigo-600" />
              )}
            </div>
          </div>

          <div className="flex w-full mt-2 justify-center">
            {feedType === "users" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <UsersTable />
              </div>
            )}
            {feedType === "events" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <EventsTable />
              </div>
            )}
            {feedType === "communities" && (
              <div className="flex flex-col flex-nowrap min-h-full w-full max-w-full">
                <CommunitiesTable />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminHome;
