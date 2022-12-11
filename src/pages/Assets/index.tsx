import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  Row,
  Select,
  Space,
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
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useAssets } from "../../state/hooks/useAssets";
import { useUnits } from "../../state/hooks/useUnits";
import { useEffect, useState } from "react";
import { useCompanies } from "../../state/hooks/useCompanies";
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
  const navigate = useNavigate();
  const { assets } = useAssets();
  const { units } = useUnits();
  const [assetsPage, setAssetsPage] = useState<any[]>();

  useEffect(() => {
    setAssetsPage(assets);
  }, []);

  const getFilteredAssetByUnit = (value: string) => {
    const filteredAssets = assets.filter((asset) => asset.unitId === value);
    return filteredAssets;
  };

  const getFilteredAssetByStatus = (value: string) => {
    const filteredAssets = assets.filter((asset) => asset.status === value);
    return filteredAssets;
  };

  const onChangeUnits = (value: string) => {
    if (value) {
      setAssetsPage(getFilteredAssetByUnit(value));
    } else {
      setAssetsPage(assets);
    }
  };

  const onChangeStatus = (value: string) => {
    if (value) {
      setAssetsPage(getFilteredAssetByStatus(value));
    } else {
      setAssetsPage(assets);
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

  return (
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
        <Title level={3}>Assets</Title>
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
              title={asset.name}
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
                <Space wrap size={30} align="center" direction="horizontal">
                  <Image
                    style={{ borderRadius: "12px" }}
                    width={200}
                    height={200}
                    src={asset.image}
                  />

                  <Space
                    style={{ padding: "16px", width: "90%" }}
                    size={25}
                    direction="vertical"
                    wrap
                  >
                    <Space size={3}>
                      <Col>
                        <Button
                          onClick={() => navigate(`${asset.id}`)}
                          type="primary"
                        >
                          <ZoomInOutlined />
                          Details
                        </Button>
                      </Col>
                      <Col>
                        <Button>
                          <EditOutlined />
                          Edit
                        </Button>
                      </Col>
                    </Space>
                    {asset.status !== "inOperation" && (
                      <Alert
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          width: "100%",
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
                </Space>

                <Space wrap>
                  <Space
                    size={30}
                    style={{ padding: "12px" }}
                    direction="horizontal"
                    wrap
                  >
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
                      // valueStyle={{ color: "#003e86" }}
                      valueStyle={
                        asset.healthscore > 75
                          ? { color: "#25a00d" }
                          : { color: "#dd3838" }
                      }
                      suffix="%"
                    />
                  </Space>

                  <Space
                    size={30}
                    style={{ padding: "12px" }}
                    direction="horizontal"
                    wrap
                  >
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
                  align="baseline"
                  style={{ fontSize: "18px", marginLeft: "16px" }}
                >
                  Sensors:
                  <Space>
                    {asset.sensors.map((sensor: string) => (
                      <div>
                        <Text style={{ fontSize: "16px" }} code>
                          {sensor}
                        </Text>
                      </div>
                    ))}
                  </Space>
                </Space>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
}
