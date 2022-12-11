import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAssets } from "../../state/hooks/useAssets";

export function Home() {
  const { assets } = useAssets();

  // @ts-ignore
  const inDowntime = assets?.filter((asset) => asset.status === "inDowntime");
  // @ts-ignore
  const inAlert = assets?.filter((asset) => asset.status === "inAlert");
  // @ts-ignore
  const inOperation = assets?.filter((asset) => asset.status === "inOperation");

  const optionsStatus = {
    chart: {
      type: "pie",
      center: ["50%", "50%"],
    },
    pie: {
      shadow: false,
    },
    accessibility: {
      enabled: false,
    },
    title: {
      text: "Status",
      align: "left",
    },
    series: [
      {
        name: "status",
        colorByPoint: false,
        data: [
          {
            name: "In alert",
            y: inAlert?.length,
            color: "#b32209",
          },
          {
            name: "In operation",
            y: inOperation?.length,
            color: "#406dce",
          },
          {
            name: "In downtime",
            y: inDowntime?.length,
            color: "#b7a427",
          },
        ],
      },
    ],
  };

  const optionsHealthy = {
    chart: {
      type: "bar",
    },
    accessibility: {
      enabled: false,
    },
    title: {
      text: "Assets Healthy Chart",
      align: "left",
    },
    xAxis: {
      // @ts-ignore
      categories: assets?.map((asset: { name: any }): any => asset.name),
      title: {
        text: null,
      },
    },
    events: {
      click: function (e: any) {
        alert(e);
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Health score (%)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    series: [
      {
        // @ts-ignore
        data: assets?.map((asset: { name: any }): any => asset.healthscore),
      },
    ],
  };

  return (
    <Row gutter={[16, 16]}>
      <Col flex="wrap" className="gutter-row" span={12}>
        <HighchartsReact highcharts={Highcharts} options={optionsHealthy} />
      </Col>
      <Col flex="wrap" className="gutter-row" span={12}>
        <HighchartsReact highcharts={Highcharts} options={optionsStatus} />
      </Col>
    </Row>
  );
}
