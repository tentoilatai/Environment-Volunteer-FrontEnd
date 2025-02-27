import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routerManage from "./RouterManage";
import Header from "../Layouts/Header/Header";
import Menu from "../Layouts/Menu/Menu";
import "./MainRouter.scss";
import { useAppDispatch, useAppSelector } from "../store";
import { authActions } from "../Reduxs/Auth/AuthSlice";
import { apiService } from "../AxiosConfig/apiService";
import { setTokenHeader } from "../AxiosConfig/axiosConfig";
import Loading from "../Components/AnimationLoading/Loading";
import {
  DataLoginType,
  apiLoginResponse,
} from "../AxiosConfig/DataType";
import ReactDOM from "react-dom";
import Notification from "../Components/NotifiicationForm";
import { jwtDecode } from "jwt-decode";
import { profileActions } from "../Reduxs/UserInfor/ProfileSlice";


const MainRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [initCheckLogin, setInitCheckLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const isAuth = useAppSelector((state) => state.authStore.isAuth);
  const { routerAdmin, routerLogin, routerUser } = routerManage();
  
  const isMenuOpen = useAppSelector((state) => state.statusMenuStore.status);

  const fetchingAuth = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    setTokenHeader(refreshToken);

    if (refreshToken) {
      try {
        setLoading(true);
        const response =
          (await apiService.refresh({
            refreshToken: refreshToken
          })) as unknown as apiLoginResponse<DataLoginType>;
        if (response.statusCode === "Success") {
          dispatch(authActions.setAuth(true));
          dispatch(authActions.setInfo(response.data));
          console.log("data sau refresh ",response.data)



          const info = response.data;
          const token = response.data.accessToken;
          const decodedToken = jwtDecode<{ unique_name: string; userId: string }>(token);
          console.log("đây là mã giải ", decodedToken.unique_name);
          
          setTokenHeader(token ? token : "",);
          dispatch(authActions.setRole(response.data.fullName))
                dispatch(profileActions.setUnique_name(response.data.fullName))
                
               
                sessionStorage.setItem("refreshToken", response.data.refreshToken)
                dispatch(authActions.setAuth(true));
                dispatch(authActions.setInfo(info));
        } else {
          dispatch(authActions.setAuth(false));
        }
      } catch (error) {
        dispatch(authActions.setAuth(false));
        setTokenHeader(null);
      } finally {
        setLoading(false);
        setInitCheckLogin(false);
      }
    } else {
      setLoading(false);
      setInitCheckLogin(false);
    }
  };

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [notice, setNotice] = useState("");
  const role = useAppSelector((state) => state.authStore.role);

  const [isFixed, setIsFixed] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mainElement = mainRef.current;
    
    if (!mainElement) return;
  
    const handleScroll = () => {
      console.log("Scroll position:", mainElement.scrollTop);
      if (mainElement.scrollTop > 55) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
  
    mainElement.addEventListener("scroll", handleScroll);
    
    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  
  
  useEffect(() => {
    fetchingAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuth) {
      // Actions after login
    }
  }, [isAuth]);

  return (
    <div className="main-container" ref={mainRef}>
      <div className={`Loading-cover ${loading ? "active" : ""}`}>
        {loading && (
          <div className="modal">
            <Loading />
          </div>
        )}
      </div>

      {!initCheckLogin ? (
        isAuth ? (
          role === "admin" ? <>
            <Header  />
            <div className="content" >
              <div className={`menu ${isFixed ? "fixed-menu" : ""}`}>
                <Menu />
              </div>

              <div className={`main ${isFixed ? "fixed-main" : ""}`}>
                <Routes>
                  {routerAdmin.map((route, i) => (
                    <Route {...route} key={i} />
                  ))}
                </Routes>
              </div>
            </div>
          </> :  <>
            <Header />
            <div className="content">
            <div className={`menu ${isFixed ? "fixed-menu" : ""}`}>
                <Menu />
              </div>
              <div className={`main ${isFixed ? (isMenuOpen ? "fixed-main menuopen" : "fixed-main menuclosed") : ""}`}>
                <Routes>
                  {routerUser.map((route, i) => (
                    <Route {...route} key={i} />
                  ))}
                </Routes>
              </div>
            </div>
          </>


          
         
        ) : (
          <Routes>
            {routerLogin.map((route, i) => (
              <Route {...route} key={i} />
            ))}
          </Routes>
        )
      ) : (
        <></>
      )}
      {ReactDOM.createPortal(
        <Notification
          isOpen={isFormVisible}
          onClose={() => setIsFormVisible(false)}
          Notification={notice}
        />,
        document.body,
      )}
    </div>
  );
};

export default MainRouter;
