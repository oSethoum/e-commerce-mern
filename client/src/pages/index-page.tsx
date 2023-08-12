import { Show } from "@/components";
import { appStore } from "@/stores";
import { Link, Outlet } from "react-router-dom";

export const IndexPage = () => {
  const { profile, clearProfile, request } = appStore((state) => ({
    profile: state.profile,
    clearProfile: state.clearProfile,
    request: state.request,
  }));

  const logout = async () => {
    const response = await request("/auth/logout", { method: "POST" });
    if (response.status == 200) {
      clearProfile();
    }
  };
  return (
    <>
      <header className="w-full flex p-2 bg-slate-800 items-center justify-between sticky top-0">
        <Link
          to="/"
          className="py-1 px-2 rounded-md text-white font-semibold uppercase hover:bg-slate-700"
        >
          SHOPPING
        </Link>
        <Show
          when={!profile}
          fallback={
            <div className="flex gap-2 align-center">
              <div className="text-white">{profile?.user.name}</div>
              <button
                className="py-1 px-1 bg-red-500 text-white rounded-md"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          }
        >
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
        </Show>
      </header>
      <Outlet />
      <footer></footer>
    </>
  );
};

export default IndexPage;
