import { Button, Col, message, Row, Select, Space, Spin } from "antd";
import {
  CloseOutlined,
  FilterOutlined,
  HddOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useAssets } from "../../state/hooks/useAssets";
import { useUnits } from "../../state/hooks/useUnits";
import { useEffect, useState } from "react";
import { assetType } from "../../types/asset";
import { AssetApi } from "../../services";
import api from "../../services/api";
import { AssetCard } from "../../components/AssetCard";

export function AssetsPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { assets } = useAssets();
  const { units } = useUnits();
  const [assetsPage, setAssetsPage] = useState<assetType[]>();

  const getAssets = () => {
    AssetApi.getAll()
      .then((res) => {
        setAssetsPage(res.data);
      })
      .catch((err) => {});
  };

  const getFilteredAssetByUnit = async (value: string) => {
    const assetsFiltered = await api.get(`/assets/?unitId=${value}`);
    return assetsFiltered;
  };

  const getFilteredAssetByStatus = async (value: string) => {
    const assetsFiltered = await api.get(`/assets/?status=${value}`);
    return assetsFiltered;
  };

  const onChangeUnits = async (value: string) => {
    setLoading(true);

    if (value) {
      const assets = await getFilteredAssetByUnit(value);
      setAssetsPage(assets.data);
      setLoading(false);
      return;
    }
    setAssetsPage(assets);
    setLoading(false);
  };

  const onChangeStatus = async (value: string) => {
    setLoading(true);
    if (value) {
      const assets = await getFilteredAssetByStatus(value);
      setAssetsPage(assets.data);
      setLoading(false);
      return;
    }
    setAssetsPage(assets);
    setLoading(false);
  };

  const unitsSelect = units.map((unit) => {
    return { value: unit.id, label: unit.name };
  });

  const statusSelect = [
    {
      value: "inAlert",
      label: "in Alert",
    },
    {
      value: "inOperation",
      label: "in Operation",
    },
    {
      value: "inDowntime",
      label: "in Downtime",
    },
  ];

  useEffect(() => {
    getAssets();
    setLoading(false);
  }, []);

  return (
    <Spin
      spinning={loading}
      style={{ position: "fixed", top: "30%", fontSize: "20px" }}
      tip="Loading"
      size="large"
    >
      <Col>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <Space align="baseline" direction="horizontal">
            <Title level={3}>
              <HddOutlined style={{ marginRight: "12px", fontSize: "24px" }} />
              Assets
            </Title>
            <Space
              direction="horizontal"
              size={20}
              style={{ marginLeft: "32px" }}
            >
              <FilterOutlined style={{ fontSize: "18px", color: "#2a4cd2" }} />
              <Select
                showSearch
                allowClear
                placeholder="Select unit"
                onChange={onChangeUnits}
                clearIcon={<CloseOutlined />}
                options={unitsSelect}
                style={{ minWidth: "180px" }}
              />
              <Select
                showSearch
                allowClear
                placeholder="Select status"
                onChange={onChangeStatus}
                clearIcon={<CloseOutlined />}
                options={statusSelect}
                style={{ minWidth: "180px" }}
              />
            </Space>
          </Space>
          <Button onClick={() => navigate("/assets/create")} type="primary">
            <PlusOutlined />
            add Asset
          </Button>
        </div>
        {/* @ts-ignore */}
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {assetsPage?.map((asset) => (
            <AssetCard
              asset={asset}
              setAssetsPage={setAssetsPage}
              setLoading={setLoading}
            />
          ))}
        </Row>
      </Col>
    </Spin>
  );
}
