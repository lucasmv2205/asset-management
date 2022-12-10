import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { AssetApi, CompanyApi, UnitApi, UserApi } from "../services";
import { useAssets } from "../state/hooks/useAssets";
import { useUnits } from "../state/hooks/useUnits";
import { useCompanies } from "../state/hooks/useCompanies";
import { useUsers } from "../state/hooks/useUsers";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const PageTemplate: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { setAssets } = useAssets();
  const { setUnits } = useUnits();
  const { setCompanies } = useCompanies();
  const { setUser } = useUsers();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getAssets = () => {
    AssetApi.getAll()
      .then((res) => {
        setAssets(res.data);
      })
      .catch((err) => {});
  };

  const getUnits = () => {
    UnitApi.getAll()
      .then((res) => {
        setUnits(res.data);
      })
      .catch((err) => {});
  };

  const getCompanies = () => {
    CompanyApi.getAll()
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {});
  };

  const getUsers = () => {
    UserApi.getAll()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAssets();
    getUnits();
    getCompanies();
    getUsers();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
          }}
        >
          {!collapsed && (
            <Title
              onClick={() => navigate("/")}
              level={3}
              style={{ color: "#fff", textAlign: "center", cursor: "pointer" }}
            >
              TracOS™
            </Title>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: (
                <Button
                  style={{ color: "#fff" }}
                  type="link"
                  onClick={() => navigate("/assets")}
                >
                  Assets
                </Button>
              ),
            },
          ]}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: colorBgContainer, marginBottom: 16 }}
        ></Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
