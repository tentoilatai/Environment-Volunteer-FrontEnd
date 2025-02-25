import { Navigate } from "react-router-dom";
import LoginPage from "../Views/Login/LoginPage";
import ComingSoon from "../Views/ComingSoon/ComingSoon";
import UploadXLSX from "../Components/UploadField/UploadFile";
import { useAppSelector } from "../store";
import ErrorPage from "../Views/Error/error-page";
import ListProject from "../Views/AdminScreen/ProjectManagement/ListProject";
import Home from "../Views/UserScreen/Home/Home";
const routerManage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const role = useAppSelector((state) => state.authStore.info?.fullName);

  const routerMain = [
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/login",
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
      path: "/ListProject",
      element: <ListProject />,
    },
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
      element: <LoginPage />,
    }
  ];

  return { routerLogin, routerMain };
};

export default routerManage;
