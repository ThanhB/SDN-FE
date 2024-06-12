import useAuth from "../hooks/useAuthen.js";
import { useEffect } from "react";
import { Error404, Loading, ScrollToTop, Unauthorized } from "../component";
import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes, useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/index.jsx";
import Authentication from "../page/Authentication.jsx";
import SignUp from "../page/SignUp.jsx";
import AdminLayout from "../layout/admin.jsx";

export const Home = lazy(() => import("../page/HomePage.jsx"));
export const WatchDetail = lazy(() => import("../page/watchDetailPage.jsx"));
export const SearchPage = lazy(() => import("../page/SearchPage.jsx"));
export const DashboardPage = lazy(() => import("../page/DashboardPage.jsx"));
export const UserProfile = lazy(() => import("../page/UserProfile.jsx"));
export const User = lazy(() => import("../page/admin/Userview.jsx"));


const checkAccess = (isAdmin) => {
  return isAdmin === true;
};

export const Router = () => {
  const { isAuthenticated, infoUser } = useAuth();
  const hasAccess = checkAccess(infoUser?.isAdmin);

  const routes = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/home" /> : <Authentication />,
    },
    {
      element: isAuthenticated ? (
        <DashboardLayout>
          <ScrollToTop>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </ScrollToTop>
        </DashboardLayout>
      ) : (
        <Navigate to="/" />
      ),
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/watch/:id",
          element: <WatchDetail />,
        },
        {
          path: "/user/profile/:id",
          element: <UserProfile />,
        },
        {
          path: "/watch/search/:searchValue",
          element: <SearchPage />,
        },
        { element: <Error404 />, path: "*" },
      ],
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/admin",
      element: isAuthenticated ? (
        hasAccess ? (
          <AdminLayout>
            <ScrollToTop>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </ScrollToTop>
          </AdminLayout>
        ) : (
          <Unauthorized />
        )
      ) : (
        <Navigate to="/" />
      ),
      children: [
        {
          path: "/admin/dashboard",
          element: <DashboardPage />,
        },
        {path: "/admin/member/view", element: <User />},
        { element: <Error404 />, path: "*" },
      ],
    },
  ]);

  return routes;
};
