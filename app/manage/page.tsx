"use client"
// list

import {
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Breadcrumb, Button, Flex, Layout, Menu, theme } from "antd"
import React, { useState } from "react"

const { Header, Content, Sider } = Layout

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}))

const items2: MenuProps["items"] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1)

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1
      return {
        key: subKey,
        label: `option${subKey}`,
      }
    }),
  }
})

export default function Page() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Layout style={{ height: "calc(100vh - 64px)" }}>
          <Sider
            width={200}
            style={{ background: colorBgContainer }}
            collapsed={collapsed}
            className="overflow-y-auto overflow-x-hidden"
            breakpoint="lg"
            collapsedWidth="64"
            onCollapse={(collapsed) => {
              setCollapsed(collapsed)
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout>
            <Flex gap="middle" vertical className="h-full">
              <Header style={{ padding: 0, background: colorBgContainer }}>
                <Flex gap="middle" align="center">
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
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                  </Breadcrumb>
                </Flex>
              </Header>
              <Layout style={{ padding: "0 24px 24px" }} className="overflow-y-auto overflow-x-hidden">
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  Content
                </Content>
              </Layout>
            </Flex>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}
