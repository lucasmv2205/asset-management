import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  message,
  Popconfirm,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { assetType } from "../../types/asset";
import {
  EditOutlined,
  ZoomInOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UnitContent } from "./UnitContent";
import { CompanyContent } from "./CompanyContent";
import { useAssets } from "../../state/hooks/useAssets";

const { Text } = Typography;

interface AssetCardProps {
  asset: assetType;
  setAssetsPage: any;
  setLoading: any;
}

export function AssetCard({
  asset,
  setAssetsPage,
  setLoading,
}: AssetCardProps) {
  const navigate = useNavigate();
  const { deleteAsset } = useAssets();

  const confirmDeleteAsset = (id: string) => {
    setLoading(true);

    deleteAsset(id)
      .then((filteredAssets) => {
        message.success("Asset deleted");
        // @ts-ignore
        setAssetsPage(filteredAssets);
      })
      .catch(() => {
        message.error("Error deleting asset");
      });
    setLoading(false);
  };

  const cancel = () => {
    message.error("Asset was preserved");
  };

  return (
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
              <Button onClick={() => navigate(`${asset.id}`)} type="primary">
                <ZoomInOutlined />
                Details
              </Button>
              <Button onClick={() => navigate(`/assets/${asset.id}/edit`)}>
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
                value={new Date(asset.metrics.lastUptimeAt).toLocaleDateString(
                  "en-us"
                )}
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
                  asset.status === "inAlert" ? "In Alert" : "In Downtime"
                }
                type={asset.status === "inAlert" ? "warning" : "info"}
                showIcon
              />
            )}
          </Space>
        </Row>
      </Card>
    </Col>
  );
}
