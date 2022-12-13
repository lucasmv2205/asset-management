import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { AssetApi, CompanyApi, UnitApi, UserApi } from "../services";
import { useAssets } from "../state/hooks/useAssets";
import { useUnits } from "../state/hooks/useUnits";
import { useCompanies } from "../state/hooks/useCompanies";
import { useUsers } from "../state/hooks/useUsers";
import api from "../services/api";

import { Profile } from "../components/Profile";
import { NavButtons } from "../components/NavButtons";
import { HeaderContent } from "../components/HeaderContent";

const { Header, Content } = Layout;

export const PageTemplate: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { setAssets } = useAssets();
  const { setUnits, units } = useUnits();
  const { setCompanies } = useCompanies();
  const { setUser } = useUsers();
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
          <HeaderContent />
          <Profile />
        </Header>
        <NavButtons />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: "12px",
          }}
        >
          <Spin
            spinning={loading}
            style={{ position: "fixed", top: "30%", fontSize: "20px" }}
            tip="Loading"
            size="large"
          >
            <div className="content">
              <Outlet />
            </div>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
};
