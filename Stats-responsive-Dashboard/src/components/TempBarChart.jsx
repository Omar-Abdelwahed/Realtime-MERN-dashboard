import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect } from "react";
import { tokens } from "../theme";
import { observer } from 'mobx-react';
import dataModel from 'model/aquastats.model';

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dataModel.fetchData();
    const interval = setInterval(() => dataModel.fetchData(), 10000); // fetch data every 10 seconds

    return () => clearInterval(interval); // clean up interval on component unmount
  }, []);

  const customTooltip = ({ id, value, indexValue }) => (
    <div
      style={{
        background: colors.main,
        padding: "12px 16px",
        border: `1px solid ${colors.grey[200]}`,
        borderRadius: "4px",
        color: 'white',
      }}
    >
      <strong>{id}</strong>: {value}
      <br />
      <strong>Date and Time</strong>: {indexValue}
    </div>
  );

  return (
    <ResponsiveBar
      data={dataModel.aquastatsdata.map(item => ({
        dateTime: `${item.date} ${item.time}`,
        temperature: item.temperature,
      }))}
      keys={["temperature"]} // Display only temperature
      indexBy="dateTime"
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.main,
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date and Time",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Temperature",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [{ on: "hover", style: { itemOpacity: 1 } }],
        },
      ]}
      tooltip={customTooltip}
      role="application"
      barAriaLabel={e => `${e.id}: ${e.formattedValue} at ${e.indexValue}`}
    />
  );
};

export default observer(BarChart);