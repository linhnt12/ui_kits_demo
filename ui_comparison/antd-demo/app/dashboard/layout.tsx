"use client";

import { Button, Flex, Layout, Menu } from "antd";
import { useState } from "react";
import Link from "next/link";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: <Link href="/dashboard/settings">Settings</Link>,
    },
  ];

  return (
    <Flex gap="middle" wrap>
      <Layout className="overflow-hidden w-[calc(50%-8px)] " >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width="200px"
          className="text-center text-white h-full"
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Header className="flex justify-end items-center">
            <Button
              type="primary"
              onClick={() => {
                router.push("/");
              }}
            >
              Logout
            </Button>
          </Header>
          <Content style={{ height: "calc(100vh - 64px)", padding: 16 }} className="text-center text-white">
            {children}
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
}
