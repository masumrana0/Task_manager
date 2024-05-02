"use client";
import { useStateStore } from "@/Zustand/store";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

const Register = () => {
  const { authState, setAuthState } = useStateStore();
  const router = useRouter();
  const handleCancel = () => {
    setAuthState();
    router.back();
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    if (values) {
      message.success("User successfully  register!");
    }
  };

  return (
    <div className="p-5">
      <h3 className="text-center mb-5 font-bold text-2xl">Register</h3>
      <Form
        name="register"
        className="register-form w-[25rem]"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item name="lastName">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
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
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button mr-2 w-full"
          >
            Register
          </Button>
          <div className="text-center mt-1">
            <h3> Or</h3>
            already have an account please <a onClick={handleCancel}>Login</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
