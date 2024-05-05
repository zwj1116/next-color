"use client"
// list

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons"
import "styles/tailwind.css";
import { createFromIconfontCN } from '@ant-design/icons';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import type { MenuProps } from "antd"
import { Button, Flex, Layout, Menu, theme } from "antd"
import { useRouter } from 'next/navigation'
import React, { useState } from "react"
import { MANAGE_MENU } from '../../config/menu';

const { Header, Content, Sider } = Layout

const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4516776_2pm02x89mdt.js', // 在 iconfont.cn 上生成
});

const items2: MenuProps["items"] = MANAGE_MENU.map((item) => {
  const obj = {
    key: item.key,
    icon: <MyIcon type={'icon-'+item.icon} />,
    label: item.label,

    children: (item?.children || []).map((child) => {
      return {
        key: child.key,
        label: child.label,
      }
    }),
  } as any;
  if (!obj.children.length) {
    delete obj.children;
  }
  return obj;
})



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)

const menuClick = (e: any) => {
  router.push(e.key)
}

  return (
    <>
    <html lang="en">
      <body>
        <AntdRegistry>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          {/* <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          /> */}
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
              defaultSelectedKeys={["colorManage", 'colorManageList']}
              defaultOpenKeys={["colorManage"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
              onClick={ menuClick }
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
                </Flex>
              </Header>
              <Layout style={{ padding: "0 24px 24px" }} className="overflow-y-auto overflow-x-hidden">
                <Content
                  style={{
                    padding: 12,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                  className="overflow-y-auto overflow-x-hidden"
                >
                  {children}
                </Content>
              </Layout>
            </Flex>
          </Layout>
        </Layout>
      </Layout>
      </AntdRegistry>
      </body>
    </html>
    </>
  )
}
