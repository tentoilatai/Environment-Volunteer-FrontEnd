import { useState } from "react";

const useLogin = () => {
  const [validUser, setValidUser] = useState("");
  const [validPass, setValidPass] = useState("");

  const isValidFields = (username: string, password: string) => {
    if (!username) {
      setValidUser("Vui lòng nhập tên tài khoản!");
      setTimeout(() => setValidUser(""), 3000);
      return;
    }
    if (!password) {
      setValidPass("Vui lòng nhập mật khẩu!");
      setTimeout(() => setValidPass(""), 3000);
      return;
    }
  };

  return {
    validUser,
    validPass,
    isValidFields,
  };
};

export default useLogin;
