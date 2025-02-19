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
      const info = response.data;
      setTokenHeader(token ? token : "");
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
      <div className = "form-background"></div>
      <div className="form-login">
       <div className="modal-login"> 
       <img src={Logo} alt="logo" />
        <div className="input-area">
          <div className="input-field">
            <div className="username">
              <p>Username</p>
              <Input
                onChange={handleOnchangeUser}
                placeHolder="LDAP/Email"
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
                placeHolder="Mật khẩu"
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
        <div className="btn-login">
          <Button
            onClick={handleLogin}
            label={`${loading ? "Waiting..." : "Login"}`}
            dis={loading}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
