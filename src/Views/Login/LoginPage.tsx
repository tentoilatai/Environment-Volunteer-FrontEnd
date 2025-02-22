import React, { useState } from "react";
import "./LoginPage.scss";
import Logo from "../../Assets/Image/logo.png";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import NoticeError from "../../Components/Notification/ErrorAlert/NoticeError";
import Loading from "../../Components/AnimationLoading/Loading";
import useLogin from "./Hooks/useLogin";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { apiService } from "../../AxiosConfig/apiService";
import { authActions } from "../../Reduxs/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { apiLoginResponse, DataLoginType } from "../../AxiosConfig/DataType";
import { jwtDecode } from "jwt-decode";


const LoginPage: React.FC = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { validUser, validPass, isValidFields } = useLogin();
  const [showError, setShowError] = useState(false);

  const handleOnchangeUser = (e: string) => {
    setUserName(e);
  };

  const handleOnchangePassword = (e: string) => {
    setPassword(e);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      isValidFields(username, password);
      return;
    }
    if (username.trim() === "") {
      setError("Yêu cầu nhập đầy đủ tên tài khoản!");
      setShowError(true);
      setTimeout(() => {
        setError("");
        setShowError(false);
      }, 5000);
      return;
    }
    try {
      setLoading(true);
      const response = (await apiService.login({
        username: username.trim(),
        password,
      })) as unknown as apiLoginResponse<DataLoginType>;
      const token = response.data.accessToken;
      const decodedToken = jwtDecode(token);
      console.log("đây là mã giải ",decodedToken)
      const info = response.data;
      setTokenHeader(token ? token : "",);
      sessionStorage.setItem("refreshToken", response.data.refreshToken)
      dispatch(authActions.setAuth(true));
      dispatch(authActions.setInfo(info));
    } catch (error: unknown | string) { 
      // Kiểm tra kiểu dữ liệu của error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(error ? (error as unknown as string) : "Lỗi không xác định");
      }
      setShowError(true);
      setTimeout(() => {
        setError("");
        setShowError(false);
      }, 5000);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className={`Loading-cover ${loading ? "active" : ""}`}>
        {loading && (
          <div className="modal">
            <Loading />
          </div>
        )}
      </div>
      <div className={`notice-error`}>
        <NoticeError
          errorNotice={error}
          onClose={handleCloseError}
          showError={showError}
        />
      </div>
      {/* <div className="form-background"></div> */}
      <div className="form-login">
        <div className="modal-login">
          <div className="logoLogin">
          <img src={Logo} alt="logo" />
          <span>LOGIN</span>
          </div>
         
          <div className="input-area">
            <div className="input-field">
              <div className="username">
                <p>Username</p>
                <Input
                  onChange={handleOnchangeUser}
                  placeHolder="Username"
                  value={username}
                  onEnterPress={handleLogin}
                />
                <div className={`tooltip ${validUser ? "visible" : "hidden"}`}>
                  {validUser}
                </div>
              </div>
              <div className="password" style={{ position: "relative" }}>
                <p>Password</p>
                <Input
                  onChange={handleOnchangePassword}
                  placeHolder="Password"
                  value={password}
                  onEnterPress={handleLogin}
                  type="password"
                />
                <div className={`tooltip ${validPass ? "visible" : "hidden"}`}>
                  {validPass}
                </div>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <div className="btn-login">
              <Button
                onClick={handleLogin}
                label={`${loading ? "Waiting..." : "Login"}`}
                dis={loading}
              />
            </div>
            <div className="link-btn">
            <p >
              Create a new account? 
              <span onClick={()=>""}>
                Sign up
              </span>
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
