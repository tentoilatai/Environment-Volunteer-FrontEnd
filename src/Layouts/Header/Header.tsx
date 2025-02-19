import React, { useState } from "react";
import "./Header.scss";
import LogoHeader from "../../Assets/Image/LogoText.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { authActions } from "../../Reduxs/Auth/AuthSlice";
import { apiService } from "../../AxiosConfig/apiService";
import Logout from "../../Assets/Image/logout.png";
import Account from "../../Assets/Image/account.svg";
import Loading from "../../Components/AnimationLoading/Loading";
import { useNavigate } from "react-router-dom";
import { setTokenHeader } from "../../AxiosConfig/axiosConfig";
import { apiResponse, nullData } from "../../AxiosConfig/DataType";
import ReactDOM from "react-dom";
import ConfirmForm from "../../Components/Notification/ModalNotice/ConfirmForm";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fullname = useAppSelector((state) => state.authStore.info?.fullName);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleGoHome = () => {
    navigate("/list");
  };

  const confirmPopup = () => {
    setConfirmLogout(true);
  };

  const handleLogout = async () => {
    setConfirmLogout(false);
    setLoading(true);
    try {
      const isLogout =
        (await apiService.logout()) as unknown as apiResponse<nullData>;
      setTokenHeader(null);
      if (isLogout.code === 200) {
        console.log("Đăng xuất thành công!");
        sessionStorage.removeItem("token");
      } else {
        console.log("Token không đúng!");
      }
    } catch {
      alert("Có lỗi xảy ra!");
    }
    setLoading(false);
    dispatch(authActions.setAuth(false));
  };

  return (
    <div className="header-container">
      <img className = "LogoWeb" src={LogoHeader} alt="Logo_" onClick={handleGoHome} />
      <div className="account-control">
        <div className="account-label" onClick={handleProfile}>
          <div className="UserName">
             <p>{fullname ? fullname : "No Info"}</p>
          </div>         
          {/* <img src={Account} alt="account" /> */}
          <div className="ImgAccount"></div>
        </div>
        <div className={`logout-btn ${isLoading ? "loading" : ""} `}>
          {/* <img src={Logout} alt="Logout" onClick={confirmPopup} /> */}
          <div className="logoutIcon" onClick={confirmPopup}/> 
        </div>
        {isLoading && (
          <div className={`Loading-cover ${isLoading ? "active" : ""}`}>
            {isLoading && (
              <div className="modal">
                <Loading />
              </div>
            )}
          </div>
        )}
        {ReactDOM.createPortal(
          <ConfirmForm
            isOpen={confirmLogout}
            onClose={() => setConfirmLogout(false)}
            confirm={handleLogout}
            dataType="đăng xuất"
          />,
          document.body
        )}
      </div>
    </div>
  );
};

export default Header;
