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
      label: <Link href="/dashboard">Tổng quan</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link href="/dashboard/profile">Người dùng</Link>,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: <Link href="/dashboard/settings">Cài đặt</Link>,
    },
  ];

  return (
    <Flex gap="middle" wrap>
      <Layout
        className="rounded-[8px] overflow-hidden w-[calc(50%-8px)] max-w-[calc(50%-8px)]"
        style={{ minHeight: "100vh" }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width="200px"
          className="text-center line-height-[120px] text-white"
          style={{ minHeight: "100vh" }}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Button
              type="primary"
              onClick={() => {
                router.push("/");
              }}
            >
              Logout
            </Button>
          </Header>
          <Content
            className="flex-1 min-h-[calc(100vh-128px)] text-center text-white leading-[120px]"
            style={{ padding: "16px" }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
}
