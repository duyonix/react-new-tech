import React from "react";
import { Form, Input, Button, Typography } from "antd";
import loginIllustrator from "@/assets/images/login-illustrator.jpg";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import IconFont from "@/components/IconFont";

const { Title } = Typography;

type Props = {
  onLogin: (values: any) => void;
  loginAzure: () => void;
};

const LoginForm = ({ onLogin, loginAzure }: Props) => {
  return (
    <>
      <img
        className="login-illustrator"
        style={{ width: "500px" }}
        src={loginIllustrator}
        alt="login-illustrator"
      />
      <Title level={3} style={{ margin: "5vh 0px 3vh 0" }}>
        Đăng nhập myVNG Dashboard
      </Title>
      <Form
        style={{ maxWidth: "400px", width: "100%" }}
        name="admin-login"
        onFinish={onLogin}
        autoComplete="off"
      >
        <Form.Item
          name="uname"
          rules={[
            {
              required: true,
              message: "Please input your username!"
            }
          ]}
        >
          <Input placeholder="Username" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          className="mt-1"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input.Password placeholder="Password" prefix={<KeyOutlined />} />
        </Form.Item>

        <Form.Item className="mt-1">
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <hr className="divider" />
        </Form.Item>
      </Form>
      <Button
        className="button-center button-with-icon mb-1"
        style={{ maxWidth: "400px", width: "100%" }}
        block
        type="primary"
        ghost
        htmlType="submit"
        onClick={loginAzure}
      >
        <IconFont type="office" size="1.571em" />
        Đăng nhập bằng Office 365
      </Button>
    </>
  );
};

export default LoginForm;
