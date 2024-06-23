import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { tokens } from "../theme";
import { observer } from 'mobx-react';
import dataModel from 'model/aquastats.model';

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dataModel.fetchData();
    const interval = setInterval(() => dataModel.fetchData(), 15000); // fetch data every 15 seconds

    return () => clearInterval(interval); // clean up interval on component unmount
  }, []);

  const customTooltip = ({ point }) => (
    <div
      style={{
        background: colors.main,
        padding: "12px 16px",
        border: `1px solid ${colors.grey[200]}`,
        borderRadius: "4px",
        color: 'white', // Set text color to white
      }}
    >
      <strong>Time:</strong> {point.data.xFormatted}<br />
      <strong>{point.serieId}:</strong> {point.data.yFormatted}
    </div>
  );

  return (
    <ResponsiveLine
      data={[
        {
          id: "Pressure",
          data: dataModel.aquastatsdata.map(item => ({
            x: `${item.date} ${item.time}`,
            y: item.pressure,
          })),
        },
      ]}
      axisBottom={null}
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
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date and Time",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Pressure",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={customTooltip}
    />
  );
};

export default observer(LineChart);