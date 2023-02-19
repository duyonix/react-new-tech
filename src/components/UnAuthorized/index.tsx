import React, { useEffect } from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import messages from "@/constants/messages";
import { authActions } from "@/pages/auth/auth.slice";
import { useAppDispatch } from "@/hooks";

const UnAuthorized = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    toast.error(messages.PERMISSION_DENIED);
    return () => {
      dispatch(authActions.getRoles());
    };
  }, [dispatch]);

  return (
    <Result
      status="403"
      title="403"
      subTitle={messages.TITLE_PERMISSION_DENIED}
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default UnAuthorized;
