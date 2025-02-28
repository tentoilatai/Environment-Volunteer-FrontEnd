import { Navigate } from "react-router-dom";
import LoginPage from "../Views/Login/LoginPage";
import SignUpPage from "../Views/Login/signup";
import ComingSoon from "../Views/ComingSoon/ComingSoon";
import { useAppSelector } from "../store";
import ErrorPage from "../Views/Error/error-page";
import ListProject from "../Views/AdminScreen/ProjectManagement/ListProject";
import Home from "../Views/UserScreen/Home/Home";
import Welcome from "../Views/Welcome/Welcome";
const routerManage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const role = useAppSelector((state) => state.authStore.info?.fullName);// này là role không phải fullname

  const routerAdmin = [
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Navigate to={"/Welcome"} />,
    },
    {
      path: "/signup",
      element: <Navigate to={"/ListProject"} />,
    },
    {
      path: "/MyProject",
      element: <ComingSoon />,
    },
    {
      path: "/comingsoon",
      element: <ComingSoon />,
    },
    {
      path: "/list-project",
      element: <ListProject />,
    },
    {
      path: "/Welcome",
      element: <Welcome />,
    }
  ];
  const routerUser = [
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Navigate to={"/Home"} />,
    },
    {
      path: "/signup",
      element: <Navigate to={"/comingsoon"} />,
    },
    {
      path: "/comingsoon",
      element: <ComingSoon />,
    },
    ,
    {
      path: "/Home",
      element: <Home />,
    }
  ];

  const routerLogin = [
    {
      path: "*",
      element: <Navigate to={"/login"} />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    }
  ];

  return { routerLogin, routerAdmin, routerUser };
};

export default routerManage;
