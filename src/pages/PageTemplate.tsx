import React, { useEffect } from "react";
import { Button } from "antd";
import { Layout, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { AssetApi, CompanyApi, UnitApi, UserApi } from "../services";
import { useAssets } from "../state/hooks/useAssets";
import { useUnits } from "../state/hooks/useUnits";
import { useCompanies } from "../state/hooks/useCompanies";
import { useUsers } from "../state/hooks/useUsers";
import {
  GroupOutlined,
  BranchesOutlined,
  UsergroupAddOutlined,
  HddOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export const PageTemplate: React.FC = () => {
  // const { setAssets } = useAssets();
  const { setUnits } = useUnits();
  const { setCompanies } = useCompanies();
  const { setUser } = useUsers();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const getAssets = () => {
  //   AssetApi.getAll()
  //     .then((res) => {
  //       setAssets(res.data);
  //     })
  //     .catch((err) => {});
  // };

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
    // getAssets();
    getUnits();
    getCompanies();
    getUsers();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            marginBottom: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Title
              onClick={() => navigate("/")}
              level={3}
              style={{
                color: "#000",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              TracOS™
            </Title>
          </div>
          <div
            style={{
              height: 32,
              margin: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            <div>
              <Button
                style={{ fontSize: "18px" }}
                onClick={() => navigate("/assets")}
                type="link"
              >
                <HddOutlined />
                Assets
              </Button>
            </div>
            <div>
              <Button
                style={{ fontSize: "18px" }}
                onClick={() => navigate("/units")}
                type="link"
              >
                <BranchesOutlined />
                Units
              </Button>
            </div>
            <div>
              <Button
                style={{ fontSize: "18px" }}
                onClick={() => navigate("/companies")}
                type="link"
              >
                <GroupOutlined />
                Companies
              </Button>
            </div>
            <div>
              <Button
                style={{ fontSize: "18px" }}
                onClick={() => navigate("/users")}
                type="link"
              >
                <UsergroupAddOutlined />
                Users
              </Button>
            </div>
          </div>
        </Header>
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
      </Layout>
    </Layout>
  );
};
