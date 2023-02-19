import React, { useEffect } from "react";
import qs from "query-string";
import { Row } from "antd";
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import { authActions } from "../auth.slice";
import AzureInstance from "@/utils/configAzure";
import { toast } from "react-toastify";
import messages from "@/constants/messages";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@/hooks";

const Login = () => {
  const instance = new AzureInstance();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { code, expired } = qs.parse(location.search);
    if (code) {
      dispatch(authActions.login(code));
    }
    if (expired) {
      toast.error(messages.SESSION_EXPIRE);
    }
  }, [dispatch, location.search]);

  const loginAzure = () => {
    instance.loginByAzureAD();
  };

  const onLogin = async (values: any) => {
    dispatch(authActions.login(values));
  };

  return (
    <div
      className="login-page"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Row
        justify="center"
        align="middle"
        style={{ flexDirection: "column", flex: 1 }}
      >
        <LoginForm onLogin={onLogin} loginAzure={loginAzure} />
      </Row>
      <Row className="bg-primary color-white px-4 py-3 mt-auto">
        <Footer />
      </Row>
    </div>
  );
};

export default Login;
