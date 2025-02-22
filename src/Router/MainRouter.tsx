import React, { useEffect, useState } from "react";
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
  dataType,
  DataLoginType,
  apiLoginResponse,
} from "../AxiosConfig/DataType";
import { Client } from "@stomp/stompjs";
import ReactDOM from "react-dom";
import Notification from "../Components/NotifiicationForm";

const MainRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [initCheckLogin, setInitCheckLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const isAuth = useAppSelector((state) => state.authStore.isAuth);
  const { routerMain, routerLogin } = routerManage();

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
  const [connected, setConnected] = useState(false);
  const senderName = useAppSelector((state) => state.authStore.info?.fullName);

  // useEffect(() => {
  //   const client = new Client({
  //     brokerURL: "ws://172.16.193.123:8080/ws",
  //     // reconnectDelay: 5000, // tự động kết nối lại sau 5s mất kết nối
  //     heartbeatIncoming: 4000, // Heartbeat settings
  //     heartbeatOutgoing: 4000,
  //     debug: (str) => console.log(str), // Debugging logs (optional)

  //     onConnect: () => {
  //       console.log("Connected to WebSocket server");

  //       // Subscribe to a topic (e.g., /topic/notifications/{senderName})
  //       client.subscribe(`/topic/notifications/${senderName}`, (message) => {
  //         if (message) {
  //           const data = message.body;
  //           console.log("Message received:", data);
  //           setNotice(data);
  //           setIsFormVisible(true);
  //         }
  //       });

  //       // Example of sending a message to the server
  //       client.publish({
  //         destination: "/user-defined", // Backend's endpoint to handle sending messages
  //         body: JSON.stringify({ sender: senderName, type: "JOIN" }),
  //       });

  //       setConnected(true);
  //     },

  //     onDisconnect: () => {
  //       console.log("WebSocket disconnected");
  //       setConnected(false);
  //     },

  //     onStompError: (frame) => {
  //       console.error("Broker reported error:", frame.headers["message"]);
  //       console.error("Additional details:", frame.body);
  //     },
  //   });

  //   // Activate the WebSocket connection only if `isAuth` is true
  //   if (isAuth) {
  //     client.activate();
  //     console.log("WebSocket activated");
  //   }

  //   // Cleanup function to deactivate the WebSocket connection
  //   return () => {
  //     console.log("Cleaning up WebSocket...");
  //     client.deactivate(); // Disconnect when the component unmounts or dependencies change
  //   };
  // }, [senderName, isAuth]); // Added `isAuth` as a dependency

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
    <div className="main-container">
      <div className={`Loading-cover ${loading ? "active" : ""}`}>
        {loading && (
          <div className="modal">
            <Loading />
          </div>
        )}
      </div>

      {!initCheckLogin ? (
        isAuth ? (
          <>
            <Header />
            <div className="content">
              <div className="menu">
                <Menu />
              </div>
              <div className="main">
                <Routes>
                  {routerMain.map((route, i) => (
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
