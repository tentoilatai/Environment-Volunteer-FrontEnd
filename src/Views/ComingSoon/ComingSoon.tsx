import React from "react";
import "./ComingSoon.scss";
import Button from "../../Components/Button/Button";

const ComingSoon = () => {
  const handleOnPress = () => {
    return alert("success!");
  };
  return (
    <div className="coming-soon-container">
      <h1 className="title">Coming Soon</h1>
      <p className="description">
        Một điều gì đó tuyệt vời sắp tới. Hãy quay lại sau nhé!
      </p>
      <div className="subscribe-section">
        <input
          type="email"
          placeholder="Nhập email của bạn"
          className="email-input"
        />
        <Button
          label="Đăng ký"
          onClick={handleOnPress}
          className="subscribe-button"
        />
      </div>
    </div>
  );
};

export default ComingSoon;
