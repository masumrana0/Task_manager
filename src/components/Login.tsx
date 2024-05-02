import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useStateStore } from "@/Zustand/store";
import { useRouter } from "next/navigation";

const Login = () => {
  const { setAuthState } = useStateStore();
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    if (values) {
      message.success("User successfully logged in!");
      router.back();
    }
  };

  const handleChangeAuthState = () => {
    setAuthState();
  };

  return (
    <div className="bg-gray-100 md:p-11 p-5 lg:w-[30rem] lg:mx-0 md:mx-10 mx-5 rounded">
      <h3 className="text-center mb-5 font-bold text-2xl">Login</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button mr-2 w-full"
          >
            Log in
          </Button>
          <div className="text-center mt-1">
            Or <a onClick={handleChangeAuthState}>register now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
