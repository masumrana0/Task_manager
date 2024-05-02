import React, { useState } from "react";
import { Form, Input, Button, List, message, Spin } from "antd";
import { useStateStore } from "@/Zustand/store";

const { TextArea } = Input;

interface FormData {
  projectName: string;
  email: string;
  projectDetails: string;
}

const CreateProject: React.FC = () => {
  const { setCreateModalToggle } = useStateStore();
  const [form] = Form.useForm();
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: FormData) => {
    console.log("Received values:", values);
    if (teamMembers.length === 0) {
      message.error("Please add at least one team member");
      return;
    }
    setLoading(true);
    // Simulating an asynchronous operation (e.g., submitting data to a server)
    setTimeout(() => {
      setLoading(false);
      // Show success message
      setCreateModalToggle();
      form.resetFields();
      setTeamMembers([]);
      message.success("Project created successfully!");
    }, 2000);
  };

  // adď email with validation
  const handleAddMember = () => {
    form.validateFields(["email"]).then(({ email }) => {
      // Regular expression for validating email addresses
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);
      if (!isValidEmail) {
        message.error("Please enter a valid email");
        return;
      }

      if (teamMembers.includes(email)) {
        message.error("Email already exists in team members");
        return;
      }

      setTeamMembers([...teamMembers, email]);
      form.resetFields(["email"]);
    });
  };

  // handle remove email
  const handleDeleteMember = (email: string) => {
    setTeamMembers(teamMembers.filter((member) => member !== email));
  };

  // Custom validator to check if email is required based on teamMembers state
  const validateEmail = () => ({
    validator(_: any, value: string) {
      if (teamMembers.length === 0 && !value) {
        return Promise.reject(new Error("Please add at least one team member"));
      }
      return Promise.resolve();
    },
  });

  return (
    <div style={{ padding: "20px" }}>
      <Spin spinning={loading} tip="Submitting..." size="large">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Project Name"
            name="projectName"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Add Team Member"
            name="email"
            rules={[validateEmail()]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Button type="primary" onClick={handleAddMember}>
            Add
          </Button>
          {/* addeďteam member's list */}
          <List
            style={{ marginTop: "10px" }}
            size="small"
            dataSource={teamMembers}
            renderItem={(item) => (
              <List.Item
                actions={[
                  // eslint-disable-next-line react/jsx-key
                  <Button type="link" onClick={() => handleDeleteMember(item)}>
                    Remove
                  </Button>,
                ]}
              >
                {item}
              </List.Item>
            )}
          />

          <Form.Item
            label="Project Details"
            name="projectDetails"
            rules={[
              { required: true, message: "Please enter project details" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
};

export default CreateProject;
