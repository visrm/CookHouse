const PageNotFound = () => {
  return (
    <>
      <main className="flex flex-col flex-nowrap min-h-[66vh] w-full max-w-full mx-auto text-slate-900 bg-slate-200">
        <div className="grid place-content-center text-center h-full min-h-full w-full">
          <h2 className="text-5xl sm:text-7xl font-bold">404 Error</h2>
          <p className="text-sm font-light">
            Oops!! The page you're looking for does not exist.
          </p>
        </div>
      </main>
    </>
  );
};

export default PageNotFound;
