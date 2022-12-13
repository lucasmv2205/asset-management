import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, Select, Space, Spin, Typography } from "antd";
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
  CloseOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Header, Content } = Layout;

export const PageTemplate: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { setAssets } = useAssets();
  const { setUnits, units } = useUnits();
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
    setLoading(false);
  }, []);

  const unitsSelect = units.map((unit) => {
    return { value: unit.id, label: unit.name };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header
          style={{
            padding: 0,
            marginBottom: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              padding: 32,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Title
              onClick={() => navigate("/")}
              level={2}
              style={{
                color: "#fff",
                textAlign: "center",
                cursor: "pointer",
                margin: 24,
              }}
            >
              TracOS™
            </Title>

            <Select
              showSearch
              allowClear
              placeholder="Select unit"
              // onChange={onChangeUnits}
              clearIcon={<CloseOutlined />}
              options={unitsSelect}
              style={{ minWidth: "200px" }}
            />
          </div>
          <div
            style={{
              padding: 32,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Avatar src="https://github.com/lucasmv2205.png" size={64} />
            <div>
              <div>
                <Text style={{ color: "#e4e3e3", display: "block" }}>
                  Logged user
                </Text>
              </div>
              <div>
                <Text style={{ color: "#c1bcbc", display: "block" }}>
                  user.email@email.com
                </Text>
              </div>
            </div>
          </div>
        </Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12rem",
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
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: "12px",
          }}
        >
          {loading ? (
            <Spin
              style={{ position: "fixed", top: "30%", fontSize: "20px" }}
              tip="Loading"
              size="large"
            >
              <div className="content">
                <Outlet />
              </div>
            </Spin>
          ) : (
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
