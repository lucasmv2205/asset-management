import { Alert, Button, Card, Col, Image, Row, Space, Statistic } from "antd";
import { EditOutlined, ZoomInOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useAssets } from "../../state/hooks/useAssets";
import { useUnits } from "../../state/hooks/useUnits";
import { useCompanies } from "../../state/hooks/useCompanies";
import { useUsers } from "../../state/hooks/useUsers";

export function AssetsPage() {
  const navigate = useNavigate();
  const { assets } = useAssets();
  const { units } = useUnits();
  const { companies } = useCompanies();
  const { users } = useUsers();

  console.log("assets", assets);
  console.log("units", units);
  console.log("companies", companies);
  console.log("users", users);

  return (
    <>
      <Title level={3}>Assets</Title>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {/* @ts-ignore */}
        {assets?.map((asset) => (
          <Col
            style={{ padding: "8px" }}
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
              <Title level={4}>Model: {asset.model}</Title>
              <Row gutter={[12, 12]}>
                <Space size={1} direction="horizontal">
                  <Image
                    style={{ borderRadius: "12px" }}
                    width={200}
                    height={200}
                    src={asset.image}
                  />

                  <Space
                    style={{ padding: "16px" }}
                    size={25}
                    direction="vertical"
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
                        style={{ textAlign: "center", fontWeight: "bold" }}
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
                    size={50}
                    style={{ padding: "12px" }}
                    direction="horizontal"
                    wrap
                  >
                    <Title level={5}>
                      <Statistic
                        title="last Uptime At"
                        value={new Date(
                          asset.metrics.lastUptimeAt
                        ).toLocaleDateString("en-us")}
                        valueStyle={{ color: "#000000" }}
                      />
                    </Title>

                    <Title level={5}>
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
                    </Title>
                  </Space>

                  <Space
                    size={50}
                    style={{ padding: "12px" }}
                    direction="horizontal"
                    wrap
                  >
                    <Title level={5}>
                      <Statistic
                        title="total Collects Uptime"
                        value={asset.metrics.totalCollectsUptime}
                        valueStyle={{ color: "#000000" }}
                        suffix="times"
                      />
                    </Title>

                    <Title level={5}>
                      <Statistic
                        title="total Uptime"
                        value={asset.metrics.totalUptime.toFixed(2)}
                        precision={2}
                        valueStyle={{ color: "#000000" }}
                        suffix="hours"
                      />
                    </Title>
                  </Space>
                </Space>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
