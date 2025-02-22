import { useState } from "react";

const useLogin = () => {
  const [validUser, setValidUser] = useState("");
  const [validPass, setValidPass] = useState("");

  const isValidFields = (username: string, password: string) => {
    if (!username) {
      setValidUser("Please enter account name!");
      setTimeout(() => setValidUser(""), 3000);
      return;
    }
    if (!password) {
      setValidPass("Please enter password!");
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
