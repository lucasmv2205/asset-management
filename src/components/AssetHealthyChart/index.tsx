import React from "react";
import {
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  Title,
  ColumnSeries,
} from "react-jsx-highcharts";

export function AssetHealthyChart() {
  return (
    <HighchartsChart>
      <Chart />

      <Title>Combination chart</Title>

      <XAxis categories={["Apples", "Oranges", "Pears", "Bananas", "Plums"]} />

      <YAxis>
        <ColumnSeries name="Jane" data={[3, 2, 1, 3, 4]} />
        <ColumnSeries name="John" data={[2, 3, 5, 7, 6]} />
        <ColumnSeries name="Joe" data={[4, 3, 3, 9, 0]} />
      </YAxis>
    </HighchartsChart>
  );
}
