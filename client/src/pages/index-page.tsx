import { Link, Outlet } from "react-router-dom";

export const IndexPage = () => {
  return (
    <>
      <header className="w-full flex p-2 bg-slate-800 items-center justify-between">
        <Link
          to="/"
          className="py-1 px-2 rounded-md text-white font-semibold uppercase hover:bg-slate-700"
        >
          SHOPPING
        </Link>
        <nav className="flex gap-2 ">
          <Link
            to="/register"
            className="py-1 px-2 rounded-md text-white font-semibold uppercase hover:bg-slate-700"
          >
            register
          </Link>
          <Link
            to="/login"
            className="py-1 px-2 rounded-md text-white font-semibold uppercase hover:bg-slate-700"
          >
            login
          </Link>
        </nav>
      </header>
      <Outlet />
      <footer className=""></footer>
    </>
  );
};

export default IndexPage;
