"use client";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GrProjects } from "react-icons/gr";
const { Header, Sider, Content } = Layout;

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setIsLoading(true);
  }, [router, isLoading]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <GrProjects />,
              label: <Link href={"/"}>Projects</Link>,
            },
            {
              key: "2",
              icon: <UploadOutlined />,
              label: <Link href={"/auth"}>Account</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "15px 16px",

            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="w-full h-[100vh]"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardLayout;
