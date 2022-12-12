import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Statistic,
  Typography,
} from "antd";
import {
  BankOutlined,
  BranchesOutlined,
  EditOutlined,
  ZoomInOutlined,
  CloseOutlined,
  FilterOutlined,
  HddOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useAssets } from "../../state/hooks/useAssets";
import { useUnits } from "../../state/hooks/useUnits";
import { useEffect, useState } from "react";
import { useCompanies } from "../../state/hooks/useCompanies";
import { assetType } from "../../types/asset";
import { AssetApi } from "../../services";
import api from "../../services/api";
const { Text } = Typography;

function UnitContent({ unitId }: any) {
  const { units } = useUnits();
  const [unit] = units.filter((unit) => unit.id === unitId);
  return (
    <Title
      level={5}
      style={{ display: "flex", gap: "8px", alignItems: "center" }}
    >
      <BranchesOutlined />
      {unit?.name}
    </Title>
  );
}

function CompanyContent({ companyId }: any) {
  const { companies } = useCompanies();
  const [company] = companies.filter((company) => company.id === companyId);

  return (
    <Title
      level={5}
      style={{ display: "flex", gap: "8px", alignItems: "center" }}
    >
      <BankOutlined />
      {company?.name}
    </Title>
  );
}

export function AssetsPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { deleteAsset } = useAssets();
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
    }
  };

  const onChangeStatus = async (value: string) => {
    setLoading(true);
    if (value) {
      const assets = await getFilteredAssetByStatus(value);
      setAssetsPage(assets.data);
      setLoading(false);
    }
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

  const confirmDeleteAsset = (id: string) => {
    setLoading(true);

    deleteAsset(id)
      .then((filteredAssets) => {
        message.success("Asset deleted");
        // @ts-ignore
        setAssetsPage(filteredAssets);
      })
      .catch((err) => {
        message.error("Error deleting asset");
      });
    setLoading(false);
  };

  useEffect(() => {
    getAssets();
    setLoading(false);
  }, []);

  const cancel = () => {
    message.error("Asset was preserved");
  };

  return (
    <Spin
      spinning={loading}
      style={{ position: "fixed", top: "30%", fontSize: "20px" }}
      tip="Loading"
      size="large"
    >
      <Col>
        <Space
          align="baseline"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <Title level={3}>
            <HddOutlined style={{ marginRight: "12px", fontSize: "24px" }} />
            Assets
          </Title>
          <Space
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "12px",
              marginLeft: "32px",
            }}
            align="center"
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
          <Space
            style={{
              marginLeft: "32px",
            }}
          >
            <Button onClick={() => navigate("/assets/create")} type="primary">
              <PlusOutlined />
              add Asset
            </Button>
          </Space>
        </Space>
        {/* @ts-ignore */}
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {assetsPage?.map((asset) => (
            <Col
              style={{
                padding: "18px",
              }}
              className="gutter-row"
              span={12}
              key={asset.id}
            >
              <Card
                style={{
                  backgroundColor: "#f1f1f1",
                }}
                title={
                  <Space
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    align="baseline"
                    wrap
                  >
                    <Title level={4}>{asset.name}</Title>
                    <Space size={20} wrap>
                      <Button
                        onClick={() => navigate(`${asset.id}`)}
                        type="primary"
                      >
                        <ZoomInOutlined />
                        Details
                      </Button>
                      <Button
                        onClick={() => navigate(`/assets/${asset.id}/edit`)}
                      >
                        <EditOutlined />
                        Edit
                      </Button>
                      <Button danger type="primary">
                        <Popconfirm
                          title="Are you sure to delete this asset?"
                          onConfirm={() => confirmDeleteAsset(asset.id)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined />
                          Delete
                        </Popconfirm>
                      </Button>
                    </Space>
                  </Space>
                }
                bordered={false}
              >
                <Title style={{ fontWeight: "normal" }} level={4}>
                  Location:
                </Title>
                <Space
                  style={{ marginLeft: "32px", paddingBottom: "12px" }}
                  wrap
                  align="center"
                  size={20}
                  direction="horizontal"
                >
                  <CompanyContent companyId={asset.companyId} />
                  <UnitContent unitId={asset.unitId} />
                </Space>
                <Title level={4}>Model: {asset.model}</Title>
                <Row gutter={[12, 12]}>
                  <Space wrap size={35} direction="horizontal">
                    <Image
                      style={{ borderRadius: "12px" }}
                      width={200}
                      height={200}
                      src={asset.image}
                    />

                    <Space wrap size={25} direction="vertical">
                      <Statistic
                        title="last Uptime At"
                        value={new Date(
                          asset.metrics.lastUptimeAt
                        ).toLocaleDateString("en-us")}
                        valueStyle={{ color: "#000000" }}
                      />
                      <Statistic
                        title="health score"
                        value={asset.healthscore}
                        precision={2}
                        valueStyle={
                          asset.healthscore > 75
                            ? { color: "#25a00d" }
                            : { color: "#dd3838" }
                        }
                        suffix="%"
                      />
                    </Space>

                    <Space wrap size={25} direction="vertical">
                      <Statistic
                        title="total Collects Uptime"
                        value={asset.metrics.totalCollectsUptime}
                        valueStyle={{ color: "#000000" }}
                        suffix="times"
                      />

                      <Statistic
                        title="total Uptime"
                        value={asset.metrics.totalUptime.toFixed(2)}
                        precision={2}
                        valueStyle={{ color: "#000000" }}
                        suffix="hours"
                      />
                    </Space>
                  </Space>

                  <Space
                    align="center"
                    size={30}
                    wrap
                    style={{ fontSize: "18px", marginLeft: "16px" }}
                  >
                    <Space>
                      Sensors:
                      <Space>
                        {asset.sensors.map((sensor: string) => (
                          <div key={sensor}>
                            <Text style={{ fontSize: "16px" }} code>
                              {sensor}
                            </Text>
                          </div>
                        ))}
                      </Space>
                    </Space>
                    {asset.status !== "inOperation" && (
                      <Alert
                        style={{
                          textAlign: "center",
                        }}
                        description={
                          asset.status === "inAlert"
                            ? "In Alert"
                            : "In Downtime"
                        }
                        type={asset.status === "inAlert" ? "warning" : "info"}
                        showIcon
                      />
                    )}
                  </Space>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Spin>
  );
}
